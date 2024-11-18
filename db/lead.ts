import { LeadStatus } from '@prisma/client';
import db from './db';


export const createLead = async ({
    firstName,
    lastName,
    email,
    phone,
    status = LeadStatus.NEW,
    ownerId,
}: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    status?: LeadStatus
    ownerId: string
}) => {
    return db.lead.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            status,
            ownerId,
        },
    })
}

//include all sources , form example googleForm
export const getAllLeads = async () => {
    return db.lead.findMany({})
}

export const getLeadsByUser = async (ownerId: string) => {
    return db.lead.findMany({
        where: { ownerId },
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
        where: { id },
        data
    })
}

export const deleteLead = async (id: string) => {
    return db.lead.delete({
        where: { id },
    })
}
