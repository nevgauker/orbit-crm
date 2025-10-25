import { createLead, getLeadsByTeam } from '@/db/lead';
import { NextResponse } from 'next/server';
import { assertTeamMembership, getAuthUserId } from '@/utils/authorization'
import { z } from 'zod'

const leadSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'LOST']).default('NEW'),
    teamId: z.string().min(1),
})

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const json = await req.json();
        const data = leadSchema.parse(json)
        await assertTeamMembership(userId, data.teamId)
        const newLead = await createLead(data)
        return NextResponse.json(newLead, { status: 201 });
    } catch (error) {
        if (error instanceof Response) return error
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
        }
        console.log(error)
        return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
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
        const leads = await getLeadsByTeam(teamId)
        return NextResponse.json(leads)
    } catch (error) {
        if (error instanceof Response) return error
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}

