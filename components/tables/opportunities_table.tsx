// import { dummyOpportunities } from '@/data/opportunities';
import { Opportunity } from '@prisma/client';

export function OpportunitiesTable({ opportunities }: { opportunities: Opportunity[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Title</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Description</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Value</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Status</th>
                        <th className="px-6 py-3 border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {opportunities.map((opportunity) => (
                        <tr key={opportunity.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.description}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.value}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.status}</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-blue-600 hover:text-blue-800">Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
