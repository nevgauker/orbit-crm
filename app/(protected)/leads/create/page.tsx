'use client'
import { LeadForm } from '@/components/forms/lead_rom'
import { createLead } from '@/db/lead'
import { useRouter } from 'next/navigation'

const CreateLeadPage = () => {
    const router = useRouter()

    const handleLeadSubmit = async (data: any) => {
        await createLead(data); // Call data-layer function
        router.push('/leads'); // Redirect to leads list
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create Lead</h1>
            <LeadForm onSubmit={handleLeadSubmit} />
        </div>
    )
}

export default CreateLeadPage
