import { dummyKPIs } from '@/data/reports';

export function KPISection() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyKPIs.map((kpi, index) => (
                <div key={index} className="p-4 bg-white rounded-md shadow">
                    <h3 className="text-gray-600 text-sm font-medium">{kpi.label}</h3>
                    <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
                </div>
            ))}
        </div>
    )
}
