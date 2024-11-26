'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteAll() {
    try {

        await prisma.team.deleteMany();
        await prisma.teamRole.deleteMany();
        await prisma.user.deleteMany();
        await prisma.contact.deleteMany();
        await prisma.lead.deleteMany();
        await prisma.email.deleteMany();
        await prisma.opportunity.deleteMany();
        await prisma.report.deleteMany()
        await prisma.task.deleteMany();

        console.log('All data deleted.');
    } catch (error) {
        console.error('Error deleting data:', error);
    } finally {
        await prisma.$disconnect();
    }
}