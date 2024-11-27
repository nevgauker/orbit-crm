'use client'
import { OpportunitiesTable } from "@/components/tables/opportunities_table";
import apiClient from "@/utils/api_client";
import { Opportunity } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const OpportunitiesPage = ({ params }: { params: { teamId: string } }) => {
    const { teamId } = params
    const [opportunities, setOpportunities] = useState<Opportunity[]>([])
    const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        // Fetch all contacts when the component loads
        const fetchOpportunities = async () => {
            try {
                const response = await apiClient.get(`/opportunities?teamId=${teamId}`)
                setOpportunities(response.data);
                setFilteredOpportunities(response.data); // Initialize filtered contacts with all data
            } catch (error) {
                console.error('Error fetching opportunities:', error)
            }
        };

        fetchOpportunities();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Opportunities</h1>
                    <p className="text-gray-600 mb-6">
                        Manage your sales opportunities here. Track their stages, values, and expected close dates.
                    </p>
                </div>

                <Link
                    href={`/opportunities/create/${teamId}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Create Opportunity
                </Link>            </div>

            {opportunities.length > 0 ? <OpportunitiesTable opportunities={filteredOpportunities} />
                : <p>No opportunities found.</p>}

        </div>
    );
}

export default OpportunitiesPage


