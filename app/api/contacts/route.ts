
import { createContact, getContactsByTeam } from '@/db/contact'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const newContact = await createContact(
            data,
        )
        return NextResponse.json(newContact, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        // Extract teamId from the URL params
        const { searchParams } = new URL(request.url)
        const teamId = searchParams.get("teamId")

        if (!teamId) {
            return new Response(JSON.stringify({ error: "teamId is required" }), { status: 400 });
        }
        // Fetch contacts for the team using ownerId (which should be a team identifier)
        const contacts = await getContactsByTeam(teamId)

        return NextResponse.json(contacts)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
    }
}

