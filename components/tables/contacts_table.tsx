import { dummyContacts } from '@/data/contacts';

export function ContactsTable() {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Name</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Email</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Phone</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Company</th>
                        <th className="px-6 py-3 border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {dummyContacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-800">{contact.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{contact.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{contact.phone}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{contact.company}</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-blue-600 hover:text-blue-800">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
