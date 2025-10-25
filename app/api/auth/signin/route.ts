import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { requireEnv } from "@/utils/env";
import db from "@/db/db";

const JWT_SECRET = requireEnv("JWT_SECRET"); // Strong secret required

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Find the user
        const user = await db.user.findUnique({
            where: { email }, include: {
                roles: {
                    include: {
                        team: true
                    }
                }
            }
        });
        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "24h", // Token expiration
        })

        const teamId = user.roles[0].team.id

        return NextResponse.json({ message: "Sign-in successful", token, teamId }, { status: 200 });
    } catch (error) {
        console.error("Error in sign-in:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
