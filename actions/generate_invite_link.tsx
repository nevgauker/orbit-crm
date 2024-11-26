'use server'

import { Role } from "@prisma/client";

export async function generateInviteLink(email: string, teamId: string, role: Role, inviterName: string): Promise<string> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"; // Ensure this is defined in `.env`
    const token = encodeURIComponent(
        Buffer.from(`${email}:${teamId}:${role}:${inviterName}`).toString("base64") // Encode the data for safety
    );
    return `${baseUrl}/invite?token=${token}`
}