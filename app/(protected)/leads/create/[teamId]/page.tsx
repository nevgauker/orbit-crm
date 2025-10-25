'use client'
import { LeadForm, LeadFormValues } from '@/components/forms/lead_form'
import { useAuth } from '@/contexts/auth_context'
import apiClient from '@/utils/api_client'
import { useRouter } from 'next/navigation'

const CreateLeadPage = ({ params }: { params: { teamId: string } }) => {
    const router = useRouter()
    const { user } = useAuth()
    const { teamId } = params


    const handleLeadSubmit = async (data: LeadFormValues) => {

        if (!user?.id) {
            console.log("User not authenticated. Please sign in.")
            return
        }

        try {
            const payload = {
                ...data,
                teamId, // Add team id from params
            };
            // Make a POST request to the API route to create the contact
            await apiClient.post('/leads', payload);

            // Redirect to the contacts list after successful submission
            router.push(`/leads/${teamId}`);
        } catch (error) {
            console.error('Error creating contact:', error);
            // Optionally show an error message to the user
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create Lead</h1>
            <LeadForm onSubmit={handleLeadSubmit} />
        </div>
    )
}

export default CreateLeadPage
