'use server'

import { getCounts, getRecentContacts, getRecentEmails, getRecentLeads, getRecentOpportunities, getRecentTasks } from "@/db/dashboard";
import { DashboardResponse, Totals } from "@/types/dashBoard_types";

export async function fetchDashboardData(teamId: string) {

    const counts: Totals = await getCounts(teamId);
    const [recentContacts, recentLeads, recentOpportunities, recentTasks, recentEmails] = await Promise.all([
        getRecentContacts(teamId),
        getRecentLeads(teamId),
        getRecentOpportunities(teamId),
        getRecentTasks(teamId),
        getRecentEmails(teamId)
    ]);

    const res: DashboardResponse = {
        totals: counts,
        contacts: recentContacts,
        leads: recentLeads,
        opportunities: recentOpportunities,
        tasks: recentTasks,
        emails: recentEmails,
    }

    return res
}
