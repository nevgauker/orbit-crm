
import { createContact, getContactsByTeam } from '@/db/contact'
import { NextResponse } from 'next/server'
import { assertTeamMembership, getAuthUserId } from '@/utils/authorization'
import { z } from 'zod'
import db from '@/db/db'
import { updateContact, deleteContact } from '@/db/contact'

const contactSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().optional(),
    teamId: z.string().min(1),
})

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const json = await req.json()
        const data = contactSchema.parse(json)
        await assertTeamMembership(userId, data?.teamId)
        const newContact = await createContact(data)
        return NextResponse.json(newContact, { status: 201 })
    } catch (error) {
        if (error instanceof Response) return error
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
        }
        console.log(error)
        return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        const userId = await getAuthUserId(request)
        const { searchParams } = new URL(request.url)
        const teamId = searchParams.get("teamId")
        if (!teamId) {
            return new Response(JSON.stringify({ error: "teamId is required" }), { status: 400 })
        }
        await assertTeamMembership(userId, teamId)
        const contacts = await getContactsByTeam(teamId)
        return NextResponse.json(contacts)
    } catch (error) {
        if (error instanceof Response) return error
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
    }
}

const contactUpdateSchema = z.object({
    id: z.string().min(1),
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
})

export async function PATCH(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const json = await req.json()
        const data = contactUpdateSchema.parse(json)
        const existing = await db.contact.findUnique({ where: { id: data.id } })
        if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        await assertTeamMembership(userId, existing.teamId)
        const { id, ...fields } = data
        const updated = await updateContact(id, fields)
        return NextResponse.json(updated)
    } catch (error) {
        if (error instanceof Response) return error
        if (error instanceof z.ZodError) return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
        console.log(error)
        return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
    }
}

const contactDeleteSchema = z.object({ id: z.string().min(1) })

export async function DELETE(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const json = await req.json()
        const { id } = contactDeleteSchema.parse(json)
        const existing = await db.contact.findUnique({ where: { id } })
        if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        await assertTeamMembership(userId, existing.teamId)
        await deleteContact(id)
        return NextResponse.json({ success: true })
    } catch (error) {
        if (error instanceof Response) return error
        if (error instanceof z.ZodError) return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
        console.log(error)
        return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
    }
}

