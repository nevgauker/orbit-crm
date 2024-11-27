import { OpportunityStatus } from '@prisma/client';
import db from './db';

//opportunity

export const createOpportunity = async (data: {
    title: string
    description?: string
    value: number
    status: OpportunityStatus
    teamId: string
    leadId: string
}) => {
    return db.opportunity.create({
        data,
    })
}

export const getOpportunitiesByTeam = async (teamId: string) => {
    return db.opportunity.findMany({
        where: { teamId },
    })
}

export const updateOpportunity = async (id: string, data: Partial<{
    title: string
    description?: string
    value: number
    status: OpportunityStatus
    leadId: string
    ownerId: string
}>) => {
    return db.opportunity.update({
        where: { id },
        data
    })
}

export const deleteOpportunity = async (id: string) => {
    return db.opportunity.delete({
        where: { id },
    })
}
