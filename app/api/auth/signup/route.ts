import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { createUser, getUserByEmail } from "@/db/user"
import { createTeam } from "@/db/team"
import { createTeamRole } from "@/db/team_role"
import { Role } from "@prisma/client"

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        // Check if user already exists
        const existingUser = await getUserByEmail(email); // Use the data layer to find user
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create the user
        const newUser = await createUser({ name, email, password: hashedPassword })

        // Create a new team for the user
        const newTeam = await createTeam({
            name: `${name}'s Team`, // Default team name
            ownerId: newUser.id
        });

        // Assign the user the ADMIN role in the new team
        await createTeamRole({
            userId: newUser.id,
            teamId: newTeam.id,
            role: Role.OWNER, // Assign ADMIN role
        })

        return NextResponse.json({
            message: "User and team created successfully",
            user: newUser,
            team: newTeam,
        }, { status: 201 });
    } catch (error) {
        console.error("Error in sign-up:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
