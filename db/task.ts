import { TaskPriority, TaskStatus } from '@prisma/client';
import db from './db';

export const createTask = async (data: {
    title: string;
    description?: string;
    dueDate?: string;
    status: TaskStatus;
    priority: TaskPriority
    teamId: string;
}) => {
    return db.task.create({
        data,
    })
}

export const getTasksByTeam = async (teamId: string) => {
    return db.task.findMany({
        where: { teamId },
    })
}

export const updateTask = async (id: string, data: Partial<{
    title: string;
    description?: string;
    dueDate?: string;
    status: TaskStatus;
    priority: TaskPriority
    teamId: string;
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
