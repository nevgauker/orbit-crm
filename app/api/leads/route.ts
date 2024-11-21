import { createLead, getLeadsByTeam } from '@/db/lead';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const newLead = await createLead(data)
        return NextResponse.json(newLead, { status: 201 });
    } catch (error) {
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
        const leads = await getLeadsByTeam(teamId)
        return NextResponse.json(leads)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}

