'use client'
import { Role } from "@prisma/client"
import { useState } from "react"
interface InviteUserPopupProps {
    isOpen: boolean
    onClose: () => void
    onInvite: (email: string, role: Role) => void
}

export default function InviteUserPopup({ isOpen, onClose, onInvite }: InviteUserPopupProps) {
    const [email, setEmail] = useState("")
    const [role, setRole] = useState<Role>(Role.MEMBER)
    const roles = [Role.OWNER, Role.ADMIN, Role.MEMBER]

    if (!isOpen) return null

    const handleInvite = () => {
        if (!email) {
            alert("Please enter a valid email address.");
            return;
        }
        onInvite(email, role)
        setEmail("")
        setRole("MEMBER")
        onClose()
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4">Invite User</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter user's email"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium mb-1">
                        Role
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value as Role)}
                        className="w-full px-4 py-2 border rounded-md"
                    >
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleInvite}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Send Invite
                    </button>
                </div>
            </div>
        </div>
    )
}

