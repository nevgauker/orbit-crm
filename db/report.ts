import db from "@/db/db";
import { LeadStatus, OpportunityStatus, TaskStatus } from "@prisma/client";

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

