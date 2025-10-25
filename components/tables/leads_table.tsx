"use client";
import { Lead } from "@prisma/client"


export function LeadsTable({
    leads,
    canEdit = true,
    canDelete = false,
    onEdit,
    onDelete,
}: {
    leads: Lead[]
    canEdit?: boolean
    canDelete?: boolean
    onEdit?: (lead: Lead) => void
    onDelete?: (id: string) => void
}) {
    return (

        <table className="w-full border-collapse border border-gray-300 bg-white">
            <thead>
                <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {leads.map((lead: Lead) => (
                    <tr key={lead.id}>
                        <td className="border px-4 py-2"> {lead.firstName} {lead.lastName}</td>
                        <td className="border px-4 py-2">{lead.email}</td>
                        <td className="border px-4 py-2">{lead.status}</td>
                        <td className="border px-4 py-2">{lead.phone || "N/A"}</td>
                        <td className="border px-4 py-2 space-x-2">
                            {canEdit && (
                                <button className="text-blue-600 hover:text-blue-800" onClick={() => onEdit && onEdit(lead)}>Edit</button>
                            )}
                            {canDelete && (
                                <button className="text-red-600 hover:text-red-800" onClick={() => onDelete && onDelete(lead.id)}>Delete</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

