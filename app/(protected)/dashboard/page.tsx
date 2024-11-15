import { MetricsCard } from "@/components/dashboard/metrics_card";
import { RecentActivity } from "@/components/dashboard/recent_activity";

function DashboardPage() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <MetricsCard />
            <RecentActivity />
        </div>
    )
}


export default DashboardPage