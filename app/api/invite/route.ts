import { createTeamRole } from "@/db/team_role";
import { getUserByEmail } from "@/db/user";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import { getLimits, isWithinLimit } from "@/utils/limits";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { z } from "zod";
import { requireEnv } from "@/utils/env";

const JWT_SECRET = requireEnv("JWT_SECRET");

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const token = body?.token as string | undefined;
        if (!token) return NextResponse.json({ message: "Missing token." }, { status: 400 });

        let decoded: any;
        try {
            decoded = jwt.verify(token, JWT_SECRET) as { email: string; teamId: string; role: Role };
        } catch {
            return NextResponse.json({ message: "Invalid or expired invite token." }, { status: 400 });
        }

        const { email, teamId, role } = decoded;

        // Plan-based users-per-team limit based on team owner's plan
        const team = await db.team.findUnique({ where: { id: teamId }, include: { owner: true } })
        if (!team) return NextResponse.json({ message: "Team not found." }, { status: 404 })
        const memberCount = await db.teamRole.count({ where: { teamId } })
        const teamLimits = getLimits(team.owner.userType)
        if (!isWithinLimit(memberCount, teamLimits.maxUsersPerTeam)) {
            return NextResponse.json({ message: "Team member limit reached for this plan." }, { status: 403 })
        }

        // Check if the user exists
        const user = await getUserByEmail(email);
        if (user) {
            await createTeamRole({ userId: user.id, teamId, role });
            return NextResponse.json({ message: "User added to the team.", redirectUrl: `/dashboard/${teamId}` });
        } else {
            const callbackUrl = `/api/invite/callback?email=${encodeURIComponent(email)}&teamId=${teamId}&role=${role}`;
            return NextResponse.json({ message: "User not found. Redirecting to sign-up.", redirectUrl: `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}` });
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error handling invite:", error);
            return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
        }
        console.error("Unexpected error type:", error);
        return NextResponse.json({ message: "Internal Server Error", error: "An unexpected error occurred." }, { status: 500 });
    }
}
