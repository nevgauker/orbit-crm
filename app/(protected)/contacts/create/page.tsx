'use client'
import { ContactForm } from '@/components/forms/contact_form'
import { useRouter } from 'next/navigation'
import axios from 'axios';

const CreateContactPage = () => {
    const router = useRouter()

    const handleContactSubmit = async (data: any) => {
        try {
            // Make a POST request to the API route to create the contact
            await axios.post('/api/contacts', data);

            // Redirect to the contacts list after successful submission
            router.push('/contacts');
        } catch (error) {
            console.error('Error creating contact:', error);
            // Optionally show an error message to the user
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create Contact</h1>
            <ContactForm onSubmit={handleContactSubmit} />
        </div>
    )
};

export default CreateContactPage
