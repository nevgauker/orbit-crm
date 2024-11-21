// data/contact.ts
import db from './db';

export const createContact = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    teamId: string;
}) => {
    return db.contact.create({
        data,
    })
}

export const getContactsByTeam = async (teamId: string) => {
    return db.contact.findMany({
        where: { teamId },
    })
}

export const updateContact = async (id: string, data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
}>) => {
    return db.contact.update({
        where: { id },
        data,
    })
};

export const deleteContact = async (id: string) => {
    return db.contact.delete({
        where: { id },
    })
}
