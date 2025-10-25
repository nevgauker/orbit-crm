'use client'
import ActivityLoader from "@/components/activity_loader";
import OpportunitiesDataTable from "@/components/tables/opportunities_datatable";
import apiClient from "@/utils/api_client";
import { Lead, Opportunity, Role } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth_context";
import Modal from "@/components/popups/modal";
import OpportunityCreateForm, { OpportunityFormValues } from "@/components/forms/opportunity_form";

const OpportunitiesPage = ({ params }: { params: { teamId: string } }) => {
    const { teamId } = params
    const [opportunities, setOpportunities] = useState<Opportunity[]>([])
    const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editing, setEditing] = useState<Opportunity | null>(null)
    const [leads, setLeads] = useState<Lead[]>([])

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [oppRes, leadsRes] = await Promise.all([
                    apiClient.get(`/opportunities?teamId=${teamId}`),
                    apiClient.get(`/leads?teamId=${teamId}`),
                ])
                setOpportunities(oppRes.data)
                setFilteredOpportunities(oppRes.data)
                setLeads(leadsRes.data)
            } catch (error) {
                console.error('Error fetching opportunities/leads:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchAll()
    }, [teamId])

    // DataTable handles filtering; keep filteredOpportunities in sync with source

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
                const handleEdit = (op: Opportunity) => {
                    setEditing(op)
                    setIsEditOpen(true)
                }
                return (
                    <OpportunitiesDataTable
                        data={filteredOpportunities}
                        canDelete={canDelete}
                        canEdit={true}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                )
            })()}
            <Modal isOpen={isEditOpen} title="Edit Opportunity" onClose={() => setIsEditOpen(false)}>
                {editing && (
                    <OpportunityCreateForm
                        leads={leads}
                        teamId={teamId}
                        initialValues={{
                            title: editing.title,
                            description: editing.description ?? '',
                            value: editing.value,
                            status: editing.status as any,
                            leadId: (editing as any).leadId ?? '',
                            teamId,
                        }}
                        submitLabel="Update Opportunity"
                        onSubmit={async (vals: OpportunityFormValues) => {
                            const { data } = await apiClient.patch<Opportunity>('/opportunities', { id: editing.id, ...vals })
                            setOpportunities(prev => prev.map(o => o.id === editing.id ? data : o))
                            setFilteredOpportunities(prev => prev.map(o => o.id === editing.id ? data : o))
                            setIsEditOpen(false)
                            setEditing(null)
                        }}
                    />
                )}
            </Modal>
        </div>
    );
}

export default OpportunitiesPage


