'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import apiClient from '@/utils/api_client';
import { ContactsTable } from '@/components/tables/contacts_table';
import { Contact } from '@prisma/client';

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

    useEffect(() => {
        // Fetch all contacts when the component loads
        const fetchContacts = async () => {
            try {
                const response = await apiClient.get(`/contacts?teamId=${teamId}`)
                setContacts(response.data);
                setFilteredContacts(response.data); // Initialize filtered contacts with all data
            } catch (error) {
                console.error('Error fetching contacts:', error)
            }
        };

        fetchContacts();
    }, []);

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
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Contacts</h1>
                <Link
                    href={`/contacts/create/${teamId}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Create Contact
                </Link>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email, phone, or company..."
                    className="border px-4 py-2 w-full mb-2"
                />
                <div className="flex gap-2">
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                    <button
                        onClick={handleClear}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {filteredContacts.length > 0 ? (
                <ContactsTable contacts={filteredContacts} />
            ) : (
                <p>No contacts found.</p>
            )}
        </div>
    )
}

export default ContactsPage
