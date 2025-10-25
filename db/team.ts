import db from "@/db/db";

export const createTeam = async ({ name, ownerId }: { name: string, ownerId: string }) => {
    return await db.team.create({
        data: { name, ownerId },
    });
};

export const getTeamById = async (id: string) => {
    return db.team.findUnique({ where: { id } })
}
