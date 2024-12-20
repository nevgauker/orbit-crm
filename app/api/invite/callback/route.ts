import { createTeamRole } from "@/db/team_role";
import { getUserByEmail } from "@/db/user";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    const teamId = url.searchParams.get("teamId");
    const role = url.searchParams.get("role");

    if (!email || !teamId || !role) {
        return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    try {
        // Ensure the user now exists
        const user = await getUserByEmail(email);

        if (!user) {
            return NextResponse.json({ message: "User not found after sign-up." }, { status: 400 });
        }

        // Add the user to the team
        await createTeamRole({
            userId: user.id,
            teamId,
            role: role as Role, // Ensure the role value is a valid `Role` enum
        });

        return NextResponse.redirect(`/dashboard?teamId=${teamId}`);
    } catch (error) {
        // Use a more specific type for error handling
        if (error instanceof Error) {
            console.error("Error handling invite callback:", error);
            return NextResponse.json(
                { message: "Internal Server Error", error: error.message },
                { status: 500 }
            );
        }

        // Fallback for unexpected errors
        console.error("Unexpected error type:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
