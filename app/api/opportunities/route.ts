import { createOpportunity, getOpportunitiesByTeam } from "@/db/opportunity";
import { NextResponse } from "next/server";
import { assertTeamMembership, getAuthUserId } from "@/utils/authorization";
import { z } from "zod";

const opportunitySchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    value: z.number().int().nonnegative().default(0),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'WON', 'LOST']).default('OPEN'),
    teamId: z.string().min(1),
    leadId: z.string().min(1),
})

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const json = await req.json();
        const data = opportunitySchema.parse(json)
        await assertTeamMembership(userId, data.teamId)
        const newOpportunity = await createOpportunity(data)
        return NextResponse.json(newOpportunity, { status: 201 });
    } catch (error) {
        if (error instanceof Response) return error
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
        }
        console.log(error)
        return NextResponse.json({ error: 'Failed to create opportunity' }, { status: 500 });
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
        const leads = await getOpportunitiesByTeam(teamId)
        return NextResponse.json(leads)
    } catch (error) {
        if (error instanceof Response) return error
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch Opportunities' }, { status: 500 });
    }
}
