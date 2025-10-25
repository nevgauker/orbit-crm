'use client'
import ActivityLoader from "@/components/activity_loader";
import TasksDataTable from "@/components/tables/tasks_datatable";
import apiClient from "@/utils/api_client";
import { Role, Task } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth_context";
import Modal from "@/components/popups/modal";
import TaskCreateForm, { TaskFormValues } from "@/components/forms/task_form";


const TasksPage = ({ params }: { params: { teamId: string } }) => {

    const { teamId } = params
    const [tasks, setTasks] = useState<Task[]>([])
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editing, setEditing] = useState<Task | null>(null)


    useEffect(() => {
        // Fetch all contacts when the component loads
        const fetchTasks = async () => {
            try {
                const response = await apiClient.get(`/tasks?teamId=${teamId}`)
                setTasks(response.data);
                setFilteredTasks(response.data); // Initialize filtered contacts with all data
            } catch (error) {
                console.error('Error fetching contacts:', error)
            } finally {
                setLoading(false)
            }
        };

        fetchTasks();
    }, [teamId]);

    // DataTable handles filtering; keep filteredTasks in sync with source

    return (
        <div className="p-6">
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h1>
                    <p className="text-gray-600 mb-6">
                        View and manage your tasks here. Track due dates, priorities, and statuses.
                    </p>
                </div>

                <Link
                    href={`/tasks/create/${teamId}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Create Task
                </Link>
            </div>
            <div className="bg-white p-4 shadow rounded-md">
                {(() => {
                    if (loading) return <ActivityLoader />
                    const role = user?.roles.find(r => r.teamId === teamId)?.role
                    const canDelete = role === Role.ADMIN || role === Role.OWNER
                    const handleDelete = async (id: string) => {
                        if (!confirm('Delete this task?')) return
                        await apiClient.delete('/tasks', { data: { id } })
                        setTasks(prev => prev.filter(t => t.id !== id))
                        setFilteredTasks(prev => prev.filter(t => t.id !== id))
                    }
                    const handleEdit = (task: Task) => {
                        setEditing(task)
                        setIsEditOpen(true)
                    }
                    return (
                        <TasksDataTable
                            data={filteredTasks}
                            canDelete={canDelete}
                            canEdit={true}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    )
                })()}
            </div>
            <Modal isOpen={isEditOpen} title="Edit Task" onClose={() => setIsEditOpen(false)}>
                {editing && (
                    <TaskCreateForm
                        teamId={teamId}
                        initialValues={{
                            title: editing.title,
                            description: editing.description ?? '',
                            dueDate: editing.dueDate ? String(editing.dueDate) : undefined,
                            status: editing.status as any,
                            priority: editing.priority as any,
                            teamId,
                        }}
                        submitLabel="Update Task"
                        onSubmit={async (vals: TaskFormValues) => {
                            const { data } = await apiClient.patch<Task>('/tasks', { id: editing.id, ...vals })
                            setTasks(prev => prev.map(t => t.id === editing.id ? data : t))
                            setFilteredTasks(prev => prev.map(t => t.id === editing.id ? data : t))
                            setIsEditOpen(false)
                            setEditing(null)
                        }}
                    />
                )}
            </Modal>
        </div>
    );
}

export default TasksPage


