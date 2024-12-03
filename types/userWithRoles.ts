import { Role, UserType } from "@prisma/client";

// Team type
interface Team {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
}

// Role type (includes nested team)
export interface UserRole {
    id: string;
    role: Role; // Enum for role values (OWNER, ADMIN, MEMBER, etc.)
    createdAt: Date;
    userId: string;
    teamId: string;
    team: Team;
}

// User type (includes roles)
interface UserWithRoles {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    userType: UserType
    roles: UserRole[]; // Array of roles with nested team
}

// The user can be null if not found
export type UserResult = UserWithRoles | null;
