'use client'

import { TeamRolesTable } from "@/components/tables/teams_table"
import Link from "next/link";
//webhook structure
//https://hook.eu2.make.com/yfdjoqxo5hk2ftl9fhsckc2l6qou1sji?email=baba@gmail.com&inviterName=baba&teamName=aaaa&url=https://www.google.com
//INVITE_WEBHOOK

const TeamsPage = () => {

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Teams</h1>
                    <p className="text-gray-600 mb-6">
                        Manage your teams here and invite users.
                    </p>
                </div>
                <Link
                    href={`/teams/create/`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Create Team
                </Link>
            </div>
            <div className="bg-white p-4 shadow rounded-md">
                <TeamRolesTable />
            </div>
        </div>
    );
}

export default TeamsPage


