import { Role } from '@prisma/client';
import db from "@/db/db";

export const createTeam = async ({ name, ownerId }: { name: string, ownerId: string }) => {
    return await db.team.create({
        data: { name, ownerId },
    });
};

export const getTeamById = async (id: string) => {

    const teams = await db.team.findMany()

    const users = await db.user.findMany({
        include: {
            roles: {
                include: {
                    team: true,
                }
            }
        }
    })

    const team = await db.team.findUnique({ where: { id } })
    return team
}
