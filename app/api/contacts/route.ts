
import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const newContact = await db.contact.create({
            data,
        })
        return NextResponse.json(newContact, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const contacts = await db.contact.findMany();
        return NextResponse.json(contacts)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
    }
}

