
import { createContact, getContactsByTeam } from '@/db/contact'
import { NextResponse } from 'next/server'
import { assertTeamMembership, getAuthUserId } from '@/utils/authorization'

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const data = await req.json()
        await assertTeamMembership(userId, data?.teamId)
        const newContact = await createContact(data)
        return NextResponse.json(newContact, { status: 201 })
    } catch (error) {
        if (error instanceof Response) return error
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

