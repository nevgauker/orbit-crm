import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";
import db from "@/db/db";

export async function getAuthUserId(req: Request): Promise<string> {
  const authHeader = req.headers.get("Authorization") || req.headers.get("authorization");
  const forwarded = req.headers.get("x-access-token");

  const token = forwarded || (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined);
  if (!token) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const decoded = await verifyToken(token);
  if (!decoded?.userId) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return decoded.userId;
}

export async function assertTeamMembership(userId: string, teamId: string) {
  if (!teamId) {
    throw new Response(JSON.stringify({ error: "teamId is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const membership = await db.teamRole.findFirst({ where: { userId, teamId } });
  if (!membership) {
    throw new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
  return membership;
}

