'use client'
import ActivityLoader from "@/components/activity_loader";
import { SearchBar } from "@/components/search_bar";
import { LeadsTable } from "@/components/tables/leads_table";
import apiClient from "@/utils/api_client";
import { Lead, Role } from "@prisma/client";
import { useAuth } from "@/contexts/auth_context";
import Link from "next/link";
import { useEffect, useState } from "react";

const LeadsPage = ({ params }: { params: { teamId: string } }) => {
    const { teamId } = params
    const [leads, setLeads] = useState<Lead[]>([])
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()


    useEffect(() => {
        // Fetch all contacts when the component loads
        const fetchLeads = async () => {
            try {
                const response = await apiClient.get(`/leads?teamId=${teamId}`)
                setLeads(response.data);
                setFilteredLeads(response.data); // Initialize filtered contacts with all data
            } catch (error) {
                console.error('Error fetching contacts:', error)
            } finally {
                setLoading(false)
            }
        };

        fetchLeads();
    }, [teamId]);
    const handleSearch = () => {
        const filtered = leads.filter(
            (lead) =>
                lead.firstName.toLowerCase().includes(search.toLowerCase()) ||
                lead.lastName.toLowerCase().includes(search.toLowerCase()) ||
                lead.email.toLowerCase().includes(search.toLowerCase()) ||
                (lead.phone && lead.phone.toLowerCase().includes(search.toLowerCase()))
        )
        setFilteredLeads(filtered);
    }

    const handleClear = () => {
        setSearch('');
        setFilteredLeads(leads); // Reset to all data
    }


    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-bold">Leads</h1>
                    <p className="text-gray-600 mb-6">
                        Track and manage your leads here. View, qualify, or mark leads as lost.
                    </p>
                </div>
                <Link
                    href={`/leads/create/${teamId}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Create Lead
                </Link>
            </div>
            <SearchBar
                search={search}
                placeholder='Search by first name, last name, email, or phone...'
                setSearch={setSearch}
                handleSearch={handleSearch}
                handleClear={handleClear}
            />
            {(() => {
                if (loading) return <ActivityLoader />
                const role = user?.roles.find(r => r.teamId === teamId)?.role
                const canDelete = role === Role.ADMIN || role === Role.OWNER
                const handleDelete = async (id: string) => {
                    if (!confirm('Delete this lead?')) return
                    await apiClient.delete('/leads', { data: { id } })
                    setLeads(prev => prev.filter(l => l.id !== id))
                    setFilteredLeads(prev => prev.filter(l => l.id !== id))
                }
                const handleEdit = async (lead: Lead) => {
                    const firstName = prompt('First name', lead.firstName) ?? lead.firstName
                    const lastName = prompt('Last name', lead.lastName) ?? lead.lastName
                    const email = prompt('Email', lead.email) ?? lead.email
                    const phone = prompt('Phone', lead.phone ?? '') || undefined
                    const status = prompt('Status (NEW, CONTACTED, QUALIFIED, LOST)', lead.status) as any ?? lead.status
                    const { data } = await apiClient.patch<Lead>('/leads', { id: lead.id, firstName, lastName, email, phone, status })
                    setLeads(prev => prev.map(l => l.id === lead.id ? data : l))
                    setFilteredLeads(prev => prev.map(l => l.id === lead.id ? data : l))
                }
                return leads.length > 0 ? (
                    <LeadsTable leads={filteredLeads} canDelete={canDelete} canEdit={true} onDelete={handleDelete} onEdit={handleEdit} />
                ) : (
                    <p>No leads found.</p>
                )
            })()}
        </div>
    )
}


export default LeadsPage
