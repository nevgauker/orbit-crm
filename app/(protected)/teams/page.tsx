'use client'

import { deleteAll } from "@/actions/delete_users"
import { generateInviteLink } from "@/actions/generate_invite_link"
import { TeamRolesTable } from "@/components/tables/teams_table"
import { useAuth } from "@/contexts/auth_context"
import { Role, Team } from "@prisma/client"
import axios from "axios"
import { useState } from "react"
//webhook structure
//https://hook.eu2.make.com/yfdjoqxo5hk2ftl9fhsckc2l6qou1sji?email=baba@gmail.com&inviterName=baba&teamName=aaaa&url=https://www.google.com
//INVITE_WEBHOOK

const TeamsPage = () => {


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <button onClick={() => {

                deleteAll()
            }}
            > delete all</button>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Opportunities</h1>
            <p className="text-gray-600 mb-6">
                Manage your sales opportunities here. Track their stages, values, and expected close dates.
            </p>

            <div className="bg-white p-4 shadow rounded-md">
                <TeamRolesTable />
            </div>
        </div>
    );
}

export default TeamsPage


