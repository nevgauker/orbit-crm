"use client";
import { Opportunity } from '@prisma/client';

export function OpportunitiesTable({
    opportunities,
    canEdit = true,
    canDelete = false,
    onEdit,
    onDelete,
}: {
    opportunities: Opportunity[]
    canEdit?: boolean
    canDelete?: boolean
    onEdit?: (opportunity: Opportunity) => void
    onDelete?: (id: string) => void
}) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Title</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Description</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Value</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Status</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {opportunities.map((opportunity) => (
                        <tr key={opportunity.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.description}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.value}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.status}</td>
                            <td className="px-6 py-4 text-sm text-gray-800 space-x-2">
                                {canEdit && (
                                    <button className="text-blue-600 hover:text-blue-800" onClick={() => onEdit && onEdit(opportunity)}>Edit</button>
                                )}
                                {canDelete && (
                                    <button className="text-red-600 hover:text-red-800" onClick={() => onDelete && onDelete(opportunity.id)}>Delete</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
