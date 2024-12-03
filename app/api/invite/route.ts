import { createTeamRole } from "@/db/team_role";
import { getUserByEmail } from "@/db/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, teamId, role } = body;

        if (!email || !teamId || !role) {
            return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
        }

        // Check if the user exists
        const user = await getUserByEmail(email);

        if (user) {
            // User exists: Create TeamRole and redirect to dashboard
            await createTeamRole({
                userId: user.id,
                teamId,
                role,
            });

            return NextResponse.json({
                message: "User added to the team.",
                redirectUrl: `/dashboard?teamId=${teamId}`,
            });
        } else {
            // User does not exist: Redirect to sign-up with callback
            const callbackUrl = `/api/invite/callback?email=${encodeURIComponent(
                email
            )}&teamId=${teamId}&role=${role}`;

            return NextResponse.json({
                message: "User not found. Redirecting to sign-up.",
                redirectUrl: `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`,
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error handling invite:", error);
            return NextResponse.json(
                { message: "Internal Server Error", error: error.message },
                { status: 500 }
            );
        }

        console.error("Unexpected error type:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
