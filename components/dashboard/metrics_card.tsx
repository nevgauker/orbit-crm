// import { metrics } from '@/data/dashboard';
import { Totals } from '@/types/dashBoard_types';

export function MetricsCard({ totals }: { totals: Totals }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium">Total Contacts</h3>
                <p className="text-2xl font-bold text-gray-800">{totals.contacts}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium">Total Leads</h3>
                <p className="text-2xl font-bold text-gray-800">
                    {totals.leads}
                    {/* {Object.values(totals.leads).reduce((a, b) => a + b, 0)}  use when count by status */}
                </p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium">Total Opportunities</h3>
                <p className="text-2xl font-bold text-gray-800">
                    {totals.opportunities}
                    {/* {Object.values(totals.opportunities).reduce((a, b) => a + b, 0)}use when count by status */}
                </p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium">Total Tasks</h3>
                <p className="text-2xl font-bold text-gray-800">
                    {totals.tasks}
                    {/* {Object.values(totals.tasks).reduce((a, b) => a + b, 0)}use when count by status */}
                </p>
            </div>
        </div>
    )
}
