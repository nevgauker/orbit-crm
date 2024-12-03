import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    if (process.env.NODE_ENV !== "development") {
        return NextResponse.json(
            { success: false, error: "This endpoint is available only in development mode." },
            { status: 403 }
        );
    }

    try {
        // Test database connection
        await prisma.$connect();
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
