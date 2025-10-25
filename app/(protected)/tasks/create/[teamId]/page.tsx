'use client'
import { useRouter } from 'next/navigation'
import apiClient from '@/utils/api_client';
import { useAuth } from '@/contexts/auth_context';
import { useState } from 'react';
import ActivityLoader from '@/components/activity_loader';
import TaskCreateForm, { TaskFormValues } from '@/components/forms/task_form';

const CreateTaskPage = ({ params }: { params: { teamId: string } }) => {
    const router = useRouter()
    const { user } = useAuth()
    const { teamId } = params
    const [loading, setLoading] = useState(false)

    const handleContactSubmit = async (data: TaskFormValues) => {

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
            await apiClient.post('/tasks', payload);

            // Redirect to the contacts list after successful submission
            router.push(`/tasks/${teamId}`);
        } catch (error) {
            console.error('Error creating task:', error);
            setLoading(false)
            // Optionally show an error message to the user
        }
    }

    return (
        <div className="p-6">
            {loading ? <ActivityLoader /> : (
                <>
                    <h1 className="text-2xl font-bold mb-6">Create Task</h1>
                    <TaskCreateForm onSubmit={handleContactSubmit} teamId={teamId} />
                </>
            )}
        </div>
    )
};

export default CreateTaskPage


