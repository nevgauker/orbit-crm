'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import apiClient from '@/utils/api_client';
import { ContactsTable } from '@/components/tables/contacts_table';
import { Contact, Role } from '@prisma/client';
import { useAuth } from '@/contexts/auth_context';
import { SearchBar } from '@/components/search_bar';
import ActivityLoader from '@/components/activity_loader';

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
    const [search, setSearch] = useState('')
    const { teamId } = params
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch all contacts when the component loads
        const fetchContacts = async () => {
            try {
                const response = await apiClient.get(`/contacts?teamId=${teamId}`)
                setContacts(response.data);
                setFilteredContacts(response.data); // Initialize filtered contacts with all data
            } catch (error) {
                console.error('Error fetching contacts:', error)
            } finally {
                setLoading(false)
            }
        };
            
        fetchContacts();
    }, [teamId]);

    const handleSearch = () => {
        const filtered = contacts.filter(
            (contact) =>
                contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
                contact.lastName.toLowerCase().includes(search.toLowerCase()) ||
                contact.email.toLowerCase().includes(search.toLowerCase()) ||
                (contact.phone && contact.phone.toLowerCase().includes(search.toLowerCase())) ||
                (contact.company && contact.company.toLowerCase().includes(search.toLowerCase()))
        )
        setFilteredContacts(filtered);
    }

    const handleClear = () => {
        setSearch('');
        setFilteredContacts(contacts); // Reset to all data
    }

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
            <SearchBar
                search={search}
                placeholder='Search by name, email, phone, or company...'
                setSearch={setSearch}
                handleSearch={handleSearch}
                handleClear={handleClear}
            />
            {(() => {
                if (loading) return <ActivityLoader />
                const role = user?.roles.find(r => r.teamId === teamId)?.role
                const canDelete = role === Role.ADMIN || role === Role.OWNER
                const handleDelete = async (id: string) => {
                    if (!confirm('Delete this contact?')) return
                    await apiClient.delete('/contacts', { data: { id } })
                    setContacts(prev => prev.filter(c => c.id !== id))
                    setFilteredContacts(prev => prev.filter(c => c.id !== id))
                }
                const handleEdit = async (contact: Contact) => {
                    const firstName = prompt('First name', contact.firstName) ?? contact.firstName
                    const lastName = prompt('Last name', contact.lastName) ?? contact.lastName
                    const email = prompt('Email', contact.email) ?? contact.email
                    const phone = prompt('Phone', contact.phone ?? '') || undefined
                    const company = prompt('Company', contact.company ?? '') || undefined
                    const { data } = await apiClient.patch<Contact>('/contacts', { id: contact.id, firstName, lastName, email, phone, company })
                    setContacts(prev => prev.map(c => c.id === contact.id ? data : c))
                    setFilteredContacts(prev => prev.map(c => c.id === contact.id ? data : c))
                }
                return filteredContacts.length > 0 ? (
                    <ContactsTable contacts={filteredContacts} canDelete={canDelete} canEdit={true} onDelete={handleDelete} onEdit={handleEdit} />
                ) : (
                    <p>No contacts found.</p>
                )
            })()}
        </div>
    )
}

export default ContactsPage
