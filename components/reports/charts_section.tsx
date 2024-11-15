// import { dummyChartData } from '@/data/reports';

export function ChartsSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Opportunities Chart */}
            <div className="p-4 bg-white rounded-md shadow">
                <h3 className="text-gray-600 text-sm font-medium mb-4">Opportunities Over Time</h3>
                <div className="h-48 flex items-center justify-center text-gray-500">
                    {/* Replace this with a chart library like Chart.js */}
                    <p>Chart Placeholder (Opportunities)</p>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="p-4 bg-white rounded-md shadow">
                <h3 className="text-gray-600 text-sm font-medium mb-4">Revenue Growth</h3>
                <div className="h-48 flex items-center justify-center text-gray-500">
                    {/* Replace this with a chart library like Chart.js */}
                    <p>Chart Placeholder (Revenue)</p>
                </div>
            </div>
        </div>
    )
}
