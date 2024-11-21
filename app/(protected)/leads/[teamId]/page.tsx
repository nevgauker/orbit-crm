'use client'
import { LeadsTable } from "@/components/tables/leads_table";
import apiClient from "@/utils/api_client";
import { Lead } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const LeadsPage = ({ params }: { params: { teamId: string } }) => {
    const { teamId } = params
    const [leads, setLeads] = useState<Lead[]>([])
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        // Fetch all contacts when the component loads
        const fetchLeads = async () => {
            try {
                const response = await apiClient.get(`/leads?teamId=${teamId}`)
                setLeads(response.data);
                setFilteredLeads(response.data); // Initialize filtered contacts with all data
            } catch (error) {
                console.error('Error fetching contacts:', error)
            }
        };

        fetchLeads();
    }, []);
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Leads</h1>
                <Link
                    href={`/leads/create/${teamId}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Create Lead
                </Link>
            </div>
            <p className="text-gray-600 mb-6">
                Track and manage your leads here. View, qualify, or mark leads as lost.
            </p>

            {leads.length > 0 ? <LeadsTable leads={filteredLeads} /> : <p>No leads found.</p>}

        </div>
    )
}


export default LeadsPage