import { getTeamById } from "@/db/team";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        // Extract teamId from the URL params
        const { searchParams } = new URL(request.url)
        const teamId = searchParams.get("teamId")

        if (!teamId) {
            return new Response(JSON.stringify({ error: "teamId is required" }), { status: 400 });
        }
        // Fetch contacts for the team using ownerId (which should be a team identifier)
        const team = await getTeamById(teamId)

        return NextResponse.json(team)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
    }
}