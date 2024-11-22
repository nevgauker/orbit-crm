import { Contact } from '@prisma/client';

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
    return (
        <table className="w-full border-collapse border border-gray-300 bg-white">
            <thead>
                <tr>
                    <th className="border px-4 py-2">First Name</th>
                    <th className="border px-4 py-2">Last Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Company</th>
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
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
