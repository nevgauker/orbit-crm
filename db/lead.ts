import { LeadStatus } from '@prisma/client';
import db from './db';


export const createLead = async (data: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    status: LeadStatus
    ownerId: string
}) => {
    return db.lead.create({
        data,
    })
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
