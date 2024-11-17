import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const newLead = await db.lead.create({
            data,
        });
        return NextResponse.json(newLead, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const leads = await db.lead.findMany();
        return NextResponse.json(leads);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}

