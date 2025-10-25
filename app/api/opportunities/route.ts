import { createOpportunity, getOpportunitiesByTeam } from "@/db/opportunity";
import { NextResponse } from "next/server";
import { assertTeamMembership, assertTeamRole, getAuthUserId } from "@/utils/authorization";
import { Role } from "@prisma/client";
import { z } from "zod";
import db from "@/db/db";
import { updateOpportunity, deleteOpportunity } from "@/db/opportunity";

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

const opportunityUpdateSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    value: z.number().int().nonnegative().optional(),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'WON', 'LOST']).optional(),
    leadId: z.string().min(1).optional(),
})

export async function PATCH(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const json = await req.json()
        const data = opportunityUpdateSchema.parse(json)
        const existing = await db.opportunity.findUnique({ where: { id: data.id } })
        if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        await assertTeamMembership(userId, existing.teamId)
        const { id, ...fields } = data
        const updated = await updateOpportunity(id, fields)
        return NextResponse.json(updated)
    } catch (error) {
        if (error instanceof Response) return error
        if (error instanceof z.ZodError) return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
        console.log(error)
        return NextResponse.json({ error: 'Failed to update opportunity' }, { status: 500 })
    }
}

const opportunityDeleteSchema = z.object({ id: z.string().min(1) })

export async function DELETE(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const json = await req.json()
        const { id } = opportunityDeleteSchema.parse(json)
        const existing = await db.opportunity.findUnique({ where: { id } })
        if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        await assertTeamRole(userId, existing.teamId, [Role.ADMIN, Role.OWNER])
        await deleteOpportunity(id)
        return NextResponse.json({ success: true })
    } catch (error) {
        if (error instanceof Response) return error
        if (error instanceof z.ZodError) return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
        console.log(error)
        return NextResponse.json({ error: 'Failed to delete opportunity' }, { status: 500 })
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
