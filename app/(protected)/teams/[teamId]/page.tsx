'use client'

import { TeamRolesTable } from "@/components/tables/teams_table";
import { useAuth } from "@/contexts/auth_context";


const TeamsPage = ({ params }: { params: { teamId: string } }) => {
    const { user } = useAuth();
    const { teamId } = params

    //TBD Only for user and owner
    if (!user) return <></>

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Opportunities</h1>
            <p className="text-gray-600 mb-6">
                Manage your sales opportunities here. Track their stages, values, and expected close dates.
            </p>

            <div className="bg-white p-4 shadow rounded-md">
                <TeamRolesTable roles={user.roles} />
            </div>
        </div>
    );
}

export default TeamsPage


