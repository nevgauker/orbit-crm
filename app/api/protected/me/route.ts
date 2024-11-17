import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // const token = authHeader.split(" ")[1]

    try {
        // Validate token and fetch user (replace with your auth logic)
        const user = { id: "123", name: "John Doe", email: "john@example.com" } // Replace with actual user fetching logic
        return NextResponse.json(user)
    } catch {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
}
