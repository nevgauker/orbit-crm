import { createTeam, getTeamById } from "@/db/team";
import { NextResponse } from "next/server";
import { getAuthUserId, assertTeamMembership } from "@/utils/authorization";
import { createTeamRole } from "@/db/team_role";
import { Role } from "@prisma/client";
import db from "@/db/db";
import { getLimits, isWithinLimit } from "@/utils/limits";
import { z } from "zod";

const teamCreateSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
})

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const json = await req.json();
        const { name } = teamCreateSchema.parse(json)
        // Enforce plan-based team count limit
        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
        const limits = getLimits(user.userType)
        if (limits.maxTeamsPerUser !== null) {
            const currentTeamsCount = await db.team.count({ where: { ownerId: userId } })
            if (!isWithinLimit(currentTeamsCount, limits.maxTeamsPerUser)) {
                return NextResponse.json({ error: 'Team limit reached for your plan' }, { status: 403 })
            }
        }

        // Derive owner from authenticated user
        const newTeam = await createTeam({ name, ownerId: userId })
        // Create OWNER role for the creator
        await createTeamRole({ userId, teamId: newTeam.id, role: Role.OWNER })
        return NextResponse.json(newTeam, { status: 201 });
    } catch (error) {
        if (error instanceof Response) return error
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
        }
        console.log(error)
        return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const teamId = searchParams.get("teamId")
        if (!teamId) {
            return new Response(JSON.stringify({ error: "teamId is required" }), { status: 400 });
        }
        const userId = await getAuthUserId(request)
        await assertTeamMembership(userId, teamId)
        const team = await getTeamById(teamId)
        return NextResponse.json(team)
    } catch (error) {
        if (error instanceof Response) return error
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 })
    }
}
