import db from "@/db/db";
import { Role } from "@prisma/client";

export const createTeamRole = async ({
    userId,
    teamId,
    role,
}: {
    userId: string;
    teamId: string;
    role: Role
}) => {
    return await db.teamRole.create({
        data: { userId, teamId, role },
    });
};
