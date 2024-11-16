import { TaskStatus } from '@prisma/client';
import db from './db';

export const createTask = async (data: {
    title: string;
    description?: string;
    dueDate: string;
    status: TaskStatus;
    ownerId: string;
}) => {
    return db.task.create({
        data,
    })
}

export const getTasksByUser = async (ownerId: string) => {
    return db.task.findMany({
        where: { ownerId },
    });
}

export const updateTask = async (id: string, data: Partial<{
    title: string;
    description?: string;
    dueDate: string;
    status: TaskStatus;
    ownerId: string;
}>) => {
    return db.task.update({
        where: { id },
        data,
    })
}

export const deleteTask = async (id: string) => {
    return db.task.delete({
        where: { id },
    })
}
