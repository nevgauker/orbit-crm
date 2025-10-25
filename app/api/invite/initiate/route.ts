import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { z } from "zod";
import db from "@/db/db";
import { getAuthUserId, assertTeamMembership } from "@/utils/authorization";
import { getLimits, isWithinLimit } from "@/utils/limits";
import jwt from "jsonwebtoken";

const schema = z.object({
  email: z.string().email(),
  teamId: z.string().min(1),
  role: z.nativeEnum(Role),
});

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    const inviterId = await getAuthUserId(req as unknown as Request);
    const json = await req.json();
    const { email, teamId, role } = schema.parse(json);

    // Inviter must be a member and have ADMIN or OWNER role
    const inviterRole = await db.teamRole.findFirst({ where: { userId: inviterId, teamId } });
    if (!inviterRole || (inviterRole.role !== Role.ADMIN && inviterRole.role !== Role.OWNER)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Plan-based limit: users per team (based on team owner's plan)
    const team = await db.team.findUnique({ where: { id: teamId }, include: { owner: true } });
    if (!team) return NextResponse.json({ message: "Team not found." }, { status: 404 });
    const memberCount = await db.teamRole.count({ where: { teamId } });
    const teamLimits = getLimits(team.owner.userType);
    if (!isWithinLimit(memberCount, teamLimits.maxUsersPerTeam)) {
      return NextResponse.json({ message: "Team member limit reached for this plan." }, { status: 403 });
    }

    // Create a signed invite token
    const payload = { email, teamId, role, inviterId };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const inviteLink = `${baseUrl}/invite?token=${encodeURIComponent(token)}`;

    return NextResponse.json({ inviteLink }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid payload", details: error.errors }, { status: 400 });
    }
    if (error instanceof Response) return error;
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

