import { UserType } from "@prisma/client";

export type PlanLimits = {
  maxTeamsPerUser: number | null; // null = unlimited
  maxUsersPerTeam: number | null; // null = unlimited
};

const LIMITS: Record<UserType, PlanLimits> = {
  FREE: { maxTeamsPerUser: 1, maxUsersPerTeam: 1 },
  PRO: { maxTeamsPerUser: 5, maxUsersPerTeam: 5 },
  ENTERPRISE: { maxTeamsPerUser: null, maxUsersPerTeam: null },
};

export function getLimits(userType: UserType): PlanLimits {
  return LIMITS[userType] ?? LIMITS.FREE;
}

export function isWithinLimit(current: number, allowed: number | null): boolean {
  if (allowed === null) return true;
  return current < allowed;
}

