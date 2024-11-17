import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import db from "@/db/db"

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        // Check if user already exists
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 })
    } catch (error) {
        console.error("Error in sign-up:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
