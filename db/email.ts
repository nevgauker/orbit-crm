// data/contact.ts
import db from './db';

export const createEmail = async (data: {
    sender: string;
    recipient: string;
    subject: string;
    receivedAt: string
    body: string;
    ownerId: string;
}) => {
    return db.email.create({
        data,
    })
}

export const getContactsByUser = async (ownerId: string) => {
    return db.email.findMany({
        where: { ownerId },
    })
}

export const updateContact = async (id: string, data: Partial<{
    sender: string;
    recipient: string;
    subject: string;
    receivedAt: string
    body: string;
    ownerId: string;
}>) => {
    return db.email.update({
        where: { id },
        data,
    })
};

export const deleteContact = async (id: string) => {
    return db.email.delete({
        where: { id },
    })
}
