'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteUsers() {
    try {
        await prisma.user.deleteMany();
        console.log('All data deleted.');
    } catch (error) {
        console.error('Error deleting data:', error);
    } finally {
        await prisma.$disconnect();
    }
}