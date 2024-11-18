import jwt, { JwtPayload } from "jsonwebtoken";

export interface TokenPayload extends JwtPayload {
    userId: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function verifyToken(token: string): Promise<TokenPayload> {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error);
        throw new Error("Invalid token")
    }
}



