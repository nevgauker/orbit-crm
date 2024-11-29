'use client';

import { useState } from 'react';
import { UserRole } from '@/types/userWithRoles';
import { useAuth } from '@/contexts/auth_context';
import { useRouter } from 'next/navigation';

export default function TeamSwitcher() {
    const router = useRouter()
    const { user, currentTeam, setCurrentTeam } = useAuth()
    const roles = user?.roles
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(user?.roles[currentTeam] ?? null);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (!roles) return
        // const teamId = event.target.value;
        const teamId = event.target.value;
        const selectedRole = roles.find((role) => role.teamId === teamId);
        if (selectedRole) {
            setSelectedRole(selectedRole)


            const selectedRoleIndex = roles.findIndex((role) => role.teamId === teamId);
            setCurrentTeam(selectedRoleIndex)

            const currentPath = window.location.pathname
            const arr = currentPath.split('/')
            arr[arr.length - 1] = teamId;

            // Join the array back into a string
            const updatedPath = arr.join('/');
            router.push(updatedPath)

        }
    };
    if (!roles) return <></>
    return (
        <div className="relative inline-block space-y-2">
            <select
                id="team-switcher"
                value={selectedRole?.teamId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="" disabled>
                    Select a team
                </option>
                {roles.map((role) => (
                    <option key={role.teamId} value={role.teamId}>
                        {role.team.name} ({role.role})
                    </option>
                ))}
            </select>
        </div>
    );
}
