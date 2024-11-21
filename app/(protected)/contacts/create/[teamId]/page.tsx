'use client'
import { ContactForm, ContactFormValues } from '@/components/forms/contact_form'
import { useRouter } from 'next/navigation'
import apiClient from '@/utils/api_client';
import { useAuth } from '@/contexts/auth_context';
import { useState } from 'react';
import ActivityLoader from '@/components/activity_loader';

const CreateContactPage = ({ params }: { params: { teamId: string } }) => {
    const router = useRouter()
    const { user } = useAuth()
    const { teamId } = params
    const [loading, setLoading] = useState(false)

    const handleContactSubmit = async (data: ContactFormValues) => {

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
            await apiClient.post('/contacts', payload);

            // Redirect to the contacts list after successful submission
            router.push(`/contacts/${teamId}`);
        } catch (error) {
            console.error('Error creating contact:', error);
            setLoading(false)
            // Optionally show an error message to the user
        }
    }

    return (
        <div className="p-6">
            {loading ? <ActivityLoader /> :
                <>
                    <h1 className="text-2xl font-bold mb-6">Create Contact</h1>
                    <ContactForm onSubmit={handleContactSubmit} />

                </>
            }
        </div>
    )
};

export default CreateContactPage

