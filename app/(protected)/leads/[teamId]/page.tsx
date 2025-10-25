'use client'
import ActivityLoader from "@/components/activity_loader";
import TableSkeleton from "@/components/tables/table_skeleton";
import EmptyState from "@/components/empty_state";
import { UserPlus } from "lucide-react";
import LeadsDataTable from "@/components/tables/leads_datatable";
import apiClient from "@/utils/api_client";
import { Lead, Role } from "@prisma/client";
import { useAuth } from "@/contexts/auth_context";
import Modal from "@/components/popups/modal";
import { LeadForm } from "@/components/forms/lead_form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LeadsPage = ({ params }: { params: { teamId: string } }) => {
    const { teamId } = params
    const [leads, setLeads] = useState<Lead[]>([])
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editing, setEditing] = useState<Lead | null>(null)
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
            {(() => {
                if (loading) return <TableSkeleton columns={6} rows={6} />
                const role = user?.roles.find(r => r.teamId === teamId)?.role
                const canDelete = role === Role.ADMIN || role === Role.OWNER
                const handleDelete = async (id: string) => {
                    if (!confirm('Delete this lead?')) return
                    try {
                        await apiClient.delete('/leads', { data: { id } })
                        setLeads(prev => prev.filter(l => l.id !== id))
                        setFilteredLeads(prev => prev.filter(l => l.id !== id))
                        toast.success('Lead deleted')
                    } catch (e) {
                        console.error(e)
                        toast.error('Failed to delete lead')
                    }
                }
                const handleEdit = (lead: Lead) => {
                    setEditing(lead)
                    setIsEditOpen(true)
                }
                return filteredLeads.length > 0 ? (
                    <LeadsDataTable data={filteredLeads} canDelete={canDelete} canEdit={true} onDelete={handleDelete} onEdit={handleEdit} />
                ) : (
                    <EmptyState
                        icon={<UserPlus size={18} />}
                        title="No leads yet"
                        description="Create a lead to start building your pipeline."
                        action={{ href: `/leads/create/${teamId}`, label: 'Create Lead' }}
                    />
                )
            })()}
            <Modal isOpen={isEditOpen} title="Edit Lead" onClose={() => setIsEditOpen(false)}>
                {editing && (
                    <LeadForm
                        initialValues={{
                            firstName: editing.firstName,
                            lastName: editing.lastName,
                            email: editing.email,
                            phone: editing.phone ?? '',
                            status: editing.status,
                        }}
                        submitLabel="Update Lead"
                        onSubmit={async (vals) => {
                            try {
                                const { data } = await apiClient.patch<Lead>('/leads', { id: editing.id, ...vals })
                                setLeads(prev => prev.map(l => l.id === editing.id ? data : l))
                                setFilteredLeads(prev => prev.map(l => l.id === editing.id ? data : l))
                                toast.success('Lead updated')
                                setIsEditOpen(false)
                                setEditing(null)
                            } catch (e) {
                                console.error(e)
                                toast.error('Failed to update lead')
                            }
                        }}
                    />
                )}
            </Modal>
        </div>
    )
}


export default LeadsPage
