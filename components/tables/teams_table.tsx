'use client'
import { UserRole } from "@/types/userWithRoles";
import { Role, TeamRole } from "@prisma/client"
import { useState } from "react";
import InviteUserPopup from "../popups/invite_user_popup";
import { useAuth } from "@/contexts/auth_context";
import axios from "axios";
import { toast } from "sonner";
import apiClient from "@/utils/api_client";



export function TeamRolesTable() {

    const [selectedTeamRole, setSelectedTeamRole] = useState<TeamRole | null>(null)

    const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false)

    const { user } = useAuth()

    const handleInvite = async (email: string, role: Role) => {

        if (!selectedTeamRole) return

        console.log(`Inviting ${email} with role ${role}`);

        const teamId = selectedTeamRole.teamId
        // Fetch team details (name)
        const teamRes = await apiClient.get(`/teams?teamId=${teamId}`)
        const team = teamRes.data

        // Ask server to initiate invite and return a signed link
        let inviteLink = ''
        try {
            const initRes = await apiClient.post(`/invite/initiate`, { email, teamId, role })
            inviteLink = initRes.data?.inviteLink
        } catch (e: any) {
            const status = e?.response?.status
            if (status === 403) {
                toast.error('Team member limit reached', {
                    description: 'Upgrade your plan to invite more users.',
                    action: { label: 'View Pricing', onClick: () => (window.location.href = '/pricing') },
                })
            } else {
                toast.error('Failed to initiate invite')
            }
            return
        }

        const webhook = process.env.NEXT_PUBLIC_INVITE_WEBHOOK ?? ''
        await axios.post(webhook, {
            email,
            teamName: team.name,
            inviterName: user?.name,
            role,
            url: inviteLink,
        }, { headers: { 'Content-Type': 'application/json' } })
        toast.success('Invite sent')
    }

    if (!user) return <></>


    return (
        <>
            <table className="w-full border-collapse border border-gray-300 bg-white">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Team Name</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {user.roles.map((role: UserRole) => (
                        <tr key={role.id}>
                            <td className="border px-4 py-2"> {role.team.name}</td>
                            <td className="border px-4 py-2">{role.role}</td>
                            <td className="px-6 py-4 text-right">
                                {role.role == Role.ADMIN || role.role == Role.OWNER && <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => {
                                        setSelectedTeamRole(role)
                                        setIsInvitePopupOpen(true)
                                    }}
                                >Invite</button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <InviteUserPopup
                isOpen={isInvitePopupOpen}
                onClose={() => setIsInvitePopupOpen(false)}
                onInvite={handleInvite}
            />
        </>


    );
}

