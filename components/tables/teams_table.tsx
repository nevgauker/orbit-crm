import { UserRole } from "@/types/userWithRoles";
import { Team, TeamRole } from "@prisma/client"



export function TeamRolesTable({ roles }: { roles: UserRole[] }) {
    return (

        <table className="w-full border-collapse border border-gray-300 bg-white">
            <thead>
                <tr>
                    <th className="border px-4 py-2">Team Name</th>
                    <th className="border px-4 py-2">Role</th>
                    <th className="border px-4 py-2">Actions</th>

                </tr>
            </thead>
            <tbody>
                {roles.map((role: UserRole) => (
                    <tr key={role.id}>
                        <td className="border px-4 py-2"> {role.team.name}</td>
                        <td className="border px-4 py-2">{role.role}</td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-blue-600 hover:text-blue-800">Invite</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

