import db from "@/db/db";
import { getUserById } from "@/db/user";
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

        const userResult = await getUserById((await decoded).userId)

        if (!userResult) {
            throw new Error("User not found");
        }

        return NextResponse.json(userResult);
    } catch (error) {
        console.error("Error authenticating user:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
}
