'use client'
import { LeadForm, LeadFormValues } from '@/components/forms/lead_rom'
import { useAuth } from '@/contexts/auth_context'
import apiClient from '@/utils/api_client'
import { useRouter } from 'next/navigation'

const CreateLeadPage = () => {
    const router = useRouter()
    const { user } = useAuth()


    const handleLeadSubmit = async (data: LeadFormValues) => {

        if (!user?.id) {
            console.log("User not authenticated. Please sign in.")
            return
        }

        try {
            const payload = {
                ...data,
                ownerId: user.id, // Add ownerId from context
            };
            // Make a POST request to the API route to create the contact
            await apiClient.post('/leads', payload);

            // Redirect to the contacts list after successful submission
            router.push('/leads');
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
