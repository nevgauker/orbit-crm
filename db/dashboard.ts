import db from "@/db/db";

// Fetch the total counts
export const getCounts = async (teamId: string) => {
    const [contacts, leads, opportunities, tasks] = await Promise.all([
        db.contact.count({ where: { teamId } }),
        db.lead.count({ where: { teamId } }),
        db.opportunity.count({ where: { teamId } }),
        db.task.count({ where: { teamId } }),
    ]);

    return { contacts, leads, opportunities, tasks };
}

// Fetch the 2 most recent contacts
export const getRecentContacts = async (teamId: string) => {
    return db.contact.findMany({
        orderBy: { createdAt: "desc" },
        where: { teamId },
        take: 2,
    });
}

// Fetch the 2 most recent leads
export const getRecentLeads = async (teamId: string) => {
    return db.lead.findMany({
        orderBy: { createdAt: "desc" },
        where: { teamId },
        take: 2,
    })
}

// Fetch the 2 most recent opportunities
export const getRecentOpportunities = async (teamId: string) => {
    return db.opportunity.findMany({
        orderBy: { createdAt: "desc" },
        where: { teamId },
        take: 2,
    })
}

// Fetch the 2 most recent tasks
export const getRecentTasks = async (teamId: string) => {
    return db.task.findMany({
        orderBy: { createdAt: "desc" },
        where: { teamId },
        take: 2,
    })
}
// Fetch the 2 most recent tasks
export const getRecentEmails = async (teamId: string) => {
    return db.email.findMany({
        orderBy: { createdAt: "desc" },
        where: { teamId },
        take: 2,
    })
}
