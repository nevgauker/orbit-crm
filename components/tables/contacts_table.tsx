"use client";
import { Contact } from '@prisma/client';

export function ContactsTable({
    contacts,
    canEdit = true,
    canDelete = false,
    onEdit,
    onDelete,
}: {
    contacts: Contact[]
    canEdit?: boolean
    canDelete?: boolean
    onEdit?: (contact: Contact) => void
    onDelete?: (id: string) => void
}) {
    return (
        <table className="w-full border-collapse border border-gray-300 bg-white">
            <thead>
                <tr>
                    <th className="border px-4 py-2">First Name</th>
                    <th className="border px-4 py-2">Last Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Company</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact: Contact) => (
                    <tr key={contact.id}>
                        <td className="border px-4 py-2">{contact.firstName}</td>
                        <td className="border px-4 py-2">{contact.lastName}</td>
                        <td className="border px-4 py-2">{contact.email}</td>
                        <td className="border px-4 py-2">{contact.phone || '-'}</td>
                        <td className="border px-4 py-2">{contact.company || '-'}</td>
                        <td className="border px-4 py-2 space-x-2">
                            {canEdit && (
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => onEdit && onEdit(contact)}
                                >
                                    Edit
                                </button>
                            )}
                            {canDelete && (
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => onDelete && onDelete(contact.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
