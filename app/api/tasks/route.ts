import { createTask, getTasksByTeam } from "@/db/task";
import { NextResponse } from "next/server";
import { assertTeamMembership, getAuthUserId } from "@/utils/authorization";

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const data = await req.json();
        await assertTeamMembership(userId, data?.teamId)
        const newTask = await createTask(data)
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        if (error instanceof Response) return error
        console.log(error)
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get("teamId")
    if (!teamId) {
        return new Response(JSON.stringify({ error: "teamId is required" }), { status: 400 });
    }
    try {
        const userId = await getAuthUserId(request)
        await assertTeamMembership(userId, teamId)
        const leads = await getTasksByTeam(teamId)
        return NextResponse.json(leads)
    } catch (error) {
        if (error instanceof Response) return error
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
