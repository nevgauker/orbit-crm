import { dummyOpportunities } from '@/data/opportunities';

export function OpportunitiesTable() {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Name</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Company</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Value</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Stage</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Close Date</th>
                        <th className="px-6 py-3 border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {dummyOpportunities.map((opportunity) => (
                        <tr key={opportunity.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.company}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.value}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.stage}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{opportunity.closeDate}</td>
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
