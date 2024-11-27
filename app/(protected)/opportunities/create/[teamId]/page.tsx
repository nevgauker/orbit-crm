'use client'
import { useRouter } from 'next/navigation'
import apiClient from '@/utils/api_client';
import { useAuth } from '@/contexts/auth_context';
import { useEffect, useState } from 'react';
import ActivityLoader from '@/components/activity_loader';
import OpportunityCreateForm, { OpportunityFormValues } from '@/components/forms/opportunity_form';
import { Lead } from '@prisma/client';

const CreateOpportunityPage = ({ params }: { params: { teamId: string } }) => {
    const router = useRouter()
    const { user } = useAuth()
    const { teamId } = params
    const [loading, setLoading] = useState(false)
    const [leads, setLeads] = useState<Lead[]>([])



    useEffect(() => {
        // Fetch all contacts when the component loads
        const fetchLeads = async () => {
            try {
                const response = await apiClient.get(`/leads?teamId=${teamId}`)
                setLeads(response.data);
            } catch (error) {
                console.error('Error fetching leads:', error)
            }
        };

        fetchLeads();
    }, []);

    const handleContactSubmit = async (data: OpportunityFormValues) => {

        setLoading(true)
        if (!user?.id) {
            console.log("User not authenticated. Please sign in.")
            return
        }
        try {

            const payload = {
                ...data,
                teamId, // Add ownerId from context
            };
            // Make a POST request to the API route to create the contact
            await apiClient.post('/opportunities', payload);

            // Redirect to the contacts list after successful submission
            router.push(`/opportunities/${teamId}`);
        } catch (error) {
            console.error('Error creating task:', error);
            setLoading(false)
            // Optionally show an error message to the user
        }
    }

    return (
        <div className="p-6">
            {loading ? <ActivityLoader /> :
                <>
                    <h1 className="text-2xl font-bold mb-6">Create Contact</h1>
                    <OpportunityCreateForm onSubmit={handleContactSubmit} teamId={teamId} leads={leads} />

                </>
            }
        </div>
    )
};

export default CreateOpportunityPage


