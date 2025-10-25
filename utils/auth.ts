import jwt, { JwtPayload } from "jsonwebtoken";
import { requireEnv } from "@/utils/env";

export interface TokenPayload extends JwtPayload {
    userId: string;
}

const JWT_SECRET = requireEnv("JWT_SECRET");

export async function verifyToken(token: string): Promise<TokenPayload> {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error);
        throw new Error("Invalid token")
    }
}



