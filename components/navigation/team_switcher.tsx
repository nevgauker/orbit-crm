'use client';

import { useState, useEffect } from 'react';
import { UserRole } from '@/types/userWithRoles';

interface TeamSwitcherProps {
    userRoles: UserRole[]; // Array of user roles including team info
    currentTeamId: string;
    onSwitchTeam: (teamId: string) => void; // Callback when the team is switched
}

export default function TeamSwitcher({ userRoles, currentTeamId, onSwitchTeam }: TeamSwitcherProps) {
    const [selectedTeam, setSelectedTeam] = useState(currentTeamId);

    useEffect(() => {
        setSelectedTeam(currentTeamId);
    }, [currentTeamId]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const teamId = event.target.value;
        setSelectedTeam(teamId);
        onSwitchTeam(teamId);
    };

    return (
        <div className="relative inline-block">
            <label htmlFor="team-switcher" className="block text-sm font-medium text-gray-700 mb-2">
                Switch Team
            </label>
            <select
                id="team-switcher"
                value={selectedTeam}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                {userRoles.map((role) => (
                    <option key={role.teamId} value={role.teamId}>
                        {role.team.name} ({role.role})
                    </option>
                ))}
            </select>
        </div>
    );
}
