// data/contact.ts
import db from './db';

export const createContact = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    ownerId: string;
}) => {
    return db.contact.create({
        data,
    })
}

export const getContactsByUser = async (ownerId: string) => {
    return db.contact.findMany({
        where: { ownerId },
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
