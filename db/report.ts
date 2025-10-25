import db from "@/db/db";
import { LeadStatus, OpportunityStatus, TaskStatus } from "@prisma/client";
import { addMonths, format, startOfMonth } from "date-fns";

export async function getKpis(teamId: string) {
  const [totalContacts, totalLeads, qualifiedLeads, openOpps, wonOpps, revenueWon, openTasks] = await Promise.all([
    db.contact.count({ where: { teamId } }),
    db.lead.count({ where: { teamId } }),
    db.lead.count({ where: { teamId, status: LeadStatus.QUALIFIED } }),
    db.opportunity.count({ where: { teamId, status: { in: [OpportunityStatus.OPEN, OpportunityStatus.IN_PROGRESS] } } }),
    db.opportunity.count({ where: { teamId, status: OpportunityStatus.WON } }),
    db.opportunity.aggregate({ _sum: { value: true }, where: { teamId, status: OpportunityStatus.WON } }),
    db.task.count({ where: { teamId, status: { in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.OVERDUE] } } }),
  ]);

  return {
    totalContacts,
    totalLeads,
    qualifiedLeads,
    openOpps,
    wonOpps,
    revenueWon: revenueWon._sum.value ?? 0,
    openTasks,
  };
}

export async function getMonthlyStats(teamId: string, months: number = 6) {
  const end = startOfMonth(new Date());
  const labels: string[] = [];
  const monthStarts: Date[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const m = addMonths(end, -i);
    monthStarts.push(m);
    labels.push(format(m, "MMM yyyy"));
  }

  // Fetch opportunities for the window
  const windowStart = monthStarts[0];
  const opportunities = await db.opportunity.findMany({
    where: { teamId, createdAt: { gte: windowStart } },
  });

  const counts: number[] = new Array(months).fill(0);
  const revenue: number[] = new Array(months).fill(0);

  for (const o of opportunities) {
    const monthIndex = monthStarts.findIndex((m) => o.createdAt >= m && o.createdAt < addMonths(m, 1));
    if (monthIndex >= 0) {
      counts[monthIndex] += 1;
      if (o.status === OpportunityStatus.WON) revenue[monthIndex] += o.value;
    }
  }

  return {
    labels,
    opportunitiesPerMonth: counts,
    revenuePerMonth: revenue,
  };
}
