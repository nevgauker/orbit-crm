'use client'
import ActivityLoader from "@/components/activity_loader";
import { SearchBar } from "@/components/search_bar";
import { OpportunitiesTable } from "@/components/tables/opportunities_table";
import apiClient from "@/utils/api_client";
import { Opportunity, Role } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth_context";

const OpportunitiesPage = ({ params }: { params: { teamId: string } }) => {
    const { teamId } = params
    const [opportunities, setOpportunities] = useState<Opportunity[]>([])
    const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()

    useEffect(() => {
        // Fetch all contacts when the component loads
        const fetchOpportunities = async () => {
            try {
                const response = await apiClient.get(`/opportunities?teamId=${teamId}`)
                setOpportunities(response.data);
                setFilteredOpportunities(response.data); // Initialize filtered contacts with all data
            } catch (error) {
                console.error('Error fetching opportunities:', error)
            } finally {
                setLoading(false)
            }
        };

        fetchOpportunities();
    }, [teamId])

    const handleSearch = () => {
        const filtered = opportunities.filter(
            (opportunity) =>
                opportunity.title.toLowerCase().includes(search.toLowerCase()) ||
                (opportunity.description && opportunity.description.toLowerCase().includes(search.toLowerCase()))
        )
        setFilteredOpportunities(filtered);
    }

    const handleClear = () => {
        setSearch('');
        setFilteredOpportunities(opportunities); // Reset to all data
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Opportunities</h1>
                    <p className="text-gray-600 mb-6">
                        Manage your sales opportunities here. Track their stages, values, and expected close dates.
                    </p>
                </div>

                <Link
                    href={`/opportunities/create/${teamId}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Create Opportunity
                </Link>
            </div>
            <SearchBar
                search={search}
                placeholder='Search by title, or description...'
                setSearch={setSearch}
                handleSearch={handleSearch}
                handleClear={handleClear}
            />
            {(() => {
                if (loading) return <ActivityLoader />
                const role = user?.roles.find(r => r.teamId === teamId)?.role
                const canDelete = role === Role.ADMIN || role === Role.OWNER
                const handleDelete = async (id: string) => {
                    if (!confirm('Delete this opportunity?')) return
                    await apiClient.delete('/opportunities', { data: { id } })
                    setOpportunities(prev => prev.filter(o => o.id !== id))
                    setFilteredOpportunities(prev => prev.filter(o => o.id !== id))
                }
                const handleEdit = async (op: Opportunity) => {
                    const title = prompt('Title', op.title) ?? op.title
                    const description = prompt('Description', op.description ?? '') || undefined
                    const valueStr = prompt('Value', String(op.value)) ?? String(op.value)
                    const value = Number(valueStr) || op.value
                    const status = prompt('Status (OPEN, IN_PROGRESS, WON, LOST)', op.status) as any ?? op.status
                    const { data } = await apiClient.patch<Opportunity>('/opportunities', { id: op.id, title, description, value, status })
                    setOpportunities(prev => prev.map(o => o.id === op.id ? data : o))
                    setFilteredOpportunities(prev => prev.map(o => o.id === op.id ? data : o))
                }
                return opportunities.length > 0 ? (
                    <OpportunitiesTable opportunities={filteredOpportunities} canDelete={canDelete} canEdit={true} onDelete={handleDelete} onEdit={handleEdit} />
                ) : (
                    <p>No opportunities found.</p>
                )
            })()}
        </div>
    );
}

export default OpportunitiesPage


