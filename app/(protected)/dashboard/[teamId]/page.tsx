import { fetchDashboardData } from "@/actions/dashboard_data";
import { MetricsCard } from "@/components/dashboard/metrics_card";
import { RecentActivity } from "@/components/dashboard/recent_activity";
import TeamSwitcher from "@/components/navigation/team_switcher";

const DashboardPage = async ({ params }: { params: { teamId: string } }) => {
    const { teamId } = params

    const dashboardData = await fetchDashboardData(teamId)
    const { contacts, leads, opportunities, tasks, emails } = dashboardData
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <MetricsCard totals={dashboardData.totals} />
            <RecentActivity
                contacts={contacts}
                leads={leads}
                opportunities={opportunities}
                tasks={tasks}
                emails={emails} />
        </div>
    )
}


export default DashboardPage