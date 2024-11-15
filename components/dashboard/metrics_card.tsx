import { metrics } from '@/data/dashboard';

export function MetricsCard() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium">Total Contacts</h3>
                <p className="text-2xl font-bold text-gray-800">{metrics.totalContacts}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium">Total Leads</h3>
                <p className="text-2xl font-bold text-gray-800">
                    {Object.values(metrics.totalLeads).reduce((a, b) => a + b, 0)}
                </p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium">Total Opportunities</h3>
                <p className="text-2xl font-bold text-gray-800">
                    {Object.values(metrics.totalOpportunities).reduce((a, b) => a + b, 0)}
                </p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium">Total Tasks</h3>
                <p className="text-2xl font-bold text-gray-800">
                    {Object.values(metrics.totalTasks).reduce((a, b) => a + b, 0)}
                </p>
            </div>
        </div>
    )
}
