import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import db from "@/db/db";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Use a strong secret in production

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Find the user
        const user = await db.user.findUnique({ where: { email } });
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
            expiresIn: "1h", // Token expiration
        })

        return NextResponse.json({ message: "Sign-in successful", token }, { status: 200 });
    } catch (error) {
        console.error("Error in sign-in:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
