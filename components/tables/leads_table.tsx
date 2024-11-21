import { Lead } from "@prisma/client";


export function LeadsTable({ leads }: { leads: Lead[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
                <thead className="bg-gray-100">
                    <tr>
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Name</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Email</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Status</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Phone</th>
                            <th className="px-6 py-3 border-b"></th>
                        </tr>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-800">
                                {lead.firstName} {lead.lastName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800">{lead.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{lead.status}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{lead.phone || "N/A"}</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-blue-600 hover:text-blue-800">Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

