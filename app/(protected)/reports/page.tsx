import { ChartsSection } from "@/components/reports/charts_section";
import { KPISection } from "@/components/reports/kpi_section";

function ReportsPage() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Reports</h1>
            <p className="text-gray-600 mb-6">
                Get insights into your CRM data with key metrics and trends.
            </p>

            {/* KPI Section */}
            <KPISection />

            {/* Charts Section */}
            <ChartsSection />
        </div>
    )
}

export default ReportsPage