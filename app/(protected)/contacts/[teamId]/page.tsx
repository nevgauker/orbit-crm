'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import apiClient from '@/utils/api_client';
import ContactsDataTable from '@/components/tables/contacts_datatable';
import { Contact, Role } from '@prisma/client';
import { useAuth } from '@/contexts/auth_context';
import Modal from '@/components/popups/modal';
import { ContactForm } from '@/components/forms/contact_form';
import { toast } from 'sonner';
import ActivityLoader from '@/components/activity_loader';
import TableSkeleton from '@/components/tables/table_skeleton';
import EmptyState from '@/components/empty_state';
import { UsersRound } from 'lucide-react';

// interface Contact {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone?: string;
//     company?: string;
// }

const ContactsPage = ({ params }: { params: { teamId: string } }) => {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
    const { teamId } = params
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editing, setEditing] = useState<Contact | null>(null)

    useEffect(() => {
        // Fetch all contacts when the component loads
        const fetchContacts = async () => {
            try {
                const response = await apiClient.get(`/contacts?teamId=${teamId}`)
                setContacts(response.data);
                setFilteredContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error)
            } finally {
                setLoading(false)
            }
        };
            
        fetchContacts();
    }, [teamId]);

    // DataTable handles search/filter internally; keep filteredContacts in sync with source

    return (
        <div className="p-6">
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-bold">Contacts</h1>
                    <p className="text-gray-600 mb-6">
                        Manage your contacts list.
                    </p>
                </div>

                <Link
                    href={`/contacts/create/${teamId}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Create Contact
                </Link>
            </div>
            {(() => {
                if (loading) return <TableSkeleton columns={6} rows={6} />
                const role = user?.roles.find(r => r.teamId === teamId)?.role
                const canDelete = role === Role.ADMIN || role === Role.OWNER
                const handleDelete = async (id: string) => {
                    if (!confirm('Delete this contact?')) return
                    try {
                        await apiClient.delete('/contacts', { data: { id } })
                        setContacts(prev => prev.filter(c => c.id !== id))
                        setFilteredContacts(prev => prev.filter(c => c.id !== id))
                        toast.success('Contact deleted')
                    } catch (e) {
                        console.error(e)
                        toast.error('Failed to delete contact')
                    }
                }
                const handleEdit = (contact: Contact) => {
                    setEditing(contact)
                    setIsEditOpen(true)
                }
                return filteredContacts.length > 0 ? (
                    <ContactsDataTable
                        data={filteredContacts}
                        canDelete={canDelete}
                        canEdit={true}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ) : (
                    <EmptyState
                        icon={<UsersRound size={18} />}
                        title="No contacts yet"
                        description="Get started by creating your first contact."
                        action={{ href: `/contacts/create/${teamId}`, label: 'Create Contact' }}
                    />
                )
            })()}
            <Modal isOpen={isEditOpen} title="Edit Contact" onClose={() => setIsEditOpen(false)}>
                {editing && (
                    <ContactForm
                        initialValues={{
                            firstName: editing.firstName,
                            lastName: editing.lastName,
                            email: editing.email,
                            phone: editing.phone ?? '',
                            company: editing.company ?? '',
                        }}
                        submitLabel="Update Contact"
                        onSubmit={async (vals) => {
                            try {
                                const { data } = await apiClient.patch<Contact>('/contacts', { id: editing.id, ...vals })
                                setContacts(prev => prev.map(c => c.id === editing.id ? data : c))
                                setFilteredContacts(prev => prev.map(c => c.id === editing.id ? data : c))
                                toast.success('Contact updated')
                                setIsEditOpen(false)
                                setEditing(null)
                            } catch (e) {
                                console.error(e)
                                toast.error('Failed to update contact')
                            }
                        }}
                    />
                )}
            </Modal>
        </div>
    )
}

export default ContactsPage
