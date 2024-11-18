import { createLead, getAllLeads } from '@/db/lead';
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

export async function GET() {
    try {
        const leads = await getAllLeads()
        return NextResponse.json(leads)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}

