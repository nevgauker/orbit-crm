import db from "@/db/db";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verify the token and extract the payload (e.g., userId)
        const decoded = verifyToken(token);
        if (!decoded || !(await decoded).userId) {
            throw new Error("Invalid token");
        }

        // Fetch the user from the database
        const user = await db.user.findUnique({
            where: { id: (await decoded).userId },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error authenticating user:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
}
