import { createTeam, getTeamById } from "@/db/team";
import { NextResponse } from "next/server";
import { getAuthUserId, assertTeamMembership } from "@/utils/authorization";
import { createTeamRole } from "@/db/team_role";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const body = await req.json();
        const { name } = body ?? {}
        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 })
        }
        // Derive owner from authenticated user
        const newTeam = await createTeam({ name, ownerId: userId })
        // Create OWNER role for the creator
        await createTeamRole({ userId, teamId: newTeam.id, role: Role.OWNER })
        return NextResponse.json(newTeam, { status: 201 });
    } catch (error) {
        if (error instanceof Response) return error
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
