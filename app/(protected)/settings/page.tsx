'use client'
import { useAuth } from "@/contexts/auth_context"

function SettingsPage() {

    const { user } = useAuth()
    console.log(user)
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

            {/* Profile Settings Section */}
            <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="John Doe"
                            value={user?.name}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="john.doe@example.com"
                            value={user?.email}
                        />
                    </div>
                </div>
            </section>

            {/* Notification Settings Section */}
            <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            id="email-notifications"
                        />
                        <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-700">
                            Receive email notifications
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            id="sms-notifications"
                        />
                        <label htmlFor="sms-notifications" className="ml-2 text-sm text-gray-700">
                            Receive SMS notifications
                        </label>
                    </div>
                </div>
            </section>
            {/* Account Permissions Section */}
            <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Teams</h2>
                <div className="space-y-4">
                    <ul>
                        {user?.roles.map((role) => <div className="flex space-x-2">
                            <div>{role.role}</div>
                            <div>{role.team.name}</div>
                        </div>)}


                    </ul>
                </div>
            </section>

            {/* Account Management Section */}
            <section className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Management</h2>
                <div className="space-y-4">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                        Delete Account
                    </button>
                </div>
            </section>
        </div>
    )
}

export default SettingsPage