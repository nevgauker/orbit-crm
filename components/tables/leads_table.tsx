import { Lead } from "@prisma/client"


export function LeadsTable({ leads }: { leads: Lead[] }) {
    return (

        <table className="w-full border-collapse border border-gray-300 bg-white">
            <thead>
                <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Phone</th>
                </tr>
            </thead>
            <tbody>
                {leads.map((lead: Lead) => (
                    <tr key={lead.id}>
                        <td className="border px-4 py-2"> {lead.firstName} {lead.lastName}</td>
                        <td className="border px-4 py-2">{lead.email}</td>
                        <td className="border px-4 py-2">{lead.status}</td>
                        <td className="border px-4 py-2">{lead.phone || "N/A"}</td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-blue-600 hover:text-blue-800">Details</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

