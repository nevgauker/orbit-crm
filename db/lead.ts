import { Team } from '@prisma/client';
import { LeadStatus } from '@prisma/client';
import db from './db';


export const createLead = async ({
    firstName,
    lastName,
    email,
    phone,
    status = LeadStatus.NEW,
    teamId,
}: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    status?: LeadStatus
    teamId: string
}) => {
    return db.lead.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            status,
            teamId,
        },
    })
}

export const getLeadsByTeam = async (teamId: string) => {
    return db.lead.findMany({
        where: { teamId },
    })
}


export const updateLead = async (id: string, data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    status: LeadStatus;
}>) => {
    return db.lead.update({
        where: {
            id
        },
        data
    })
}

export const deleteLead = async (id: string) => {
    return db.lead.delete({
        where: { id },
    })
}
