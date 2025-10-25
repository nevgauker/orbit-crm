'use client'
import TableSkeleton from "@/components/tables/table_skeleton";
import EmptyState from "@/components/empty_state";
import { CheckSquare } from "lucide-react";
import TasksDataTable from "@/components/tables/tasks_datatable";
import apiClient from "@/utils/api_client";
import { Role, Task } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth_context";
import Modal from "@/components/popups/modal";
import TaskCreateForm, { TaskFormValues } from "@/components/forms/task_form";
import { toast } from "sonner";


const TasksPage = ({ params }: { params: { teamId: string } }) => {

    const { teamId } = params
    const [, setTasks] = useState<Task[]>([])
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
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
                    if (loading) return <TableSkeleton columns={6} rows={6} />
                    const role = user?.roles.find(r => r.teamId === teamId)?.role
                    const canDelete = role === Role.ADMIN || role === Role.OWNER
                    const handleDelete = async (id: string) => {
                        if (!confirm('Delete this task?')) return
                        try {
                            await apiClient.delete('/tasks', { data: { id } })
                            setTasks(prev => prev.filter(t => t.id !== id))
                            setFilteredTasks(prev => prev.filter(t => t.id !== id))
                            toast.success('Task deleted')
                        } catch (e) {
                            console.error(e)
                            toast.error('Failed to delete task')
                        }
                    }
                    const handleEdit = (task: Task) => {
                        setEditing(task)
                        setIsEditOpen(true)
                    }
                    return filteredTasks.length > 0 ? (
                        <TasksDataTable
                            data={filteredTasks}
                            canDelete={canDelete}
                            canEdit={true}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ) : (
                        <EmptyState
                            icon={<CheckSquare size={18} />}
                            title="No tasks yet"
                            description="Create a task to keep work moving forward."
                            action={{ href: `/tasks/create/${teamId}`, label: 'Create Task' }}
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
                            status: editing.status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE',
                            priority: editing.priority as 'HIGH' | 'MEDIUM' | 'LOW',
                            teamId,
                        }}
                        submitLabel="Update Task"
                        onSubmit={async (vals: TaskFormValues) => {
                            try {
                                const { data } = await apiClient.patch<Task>('/tasks', { id: editing.id, ...vals })
                                setTasks(prev => prev.map(t => t.id === editing.id ? data : t))
                                setFilteredTasks(prev => prev.map(t => t.id === editing.id ? data : t))
                                toast.success('Task updated')
                                setIsEditOpen(false)
                                setEditing(null)
                            } catch (e) {
                                console.error(e)
                                toast.error('Failed to update task')
                            }
                        }}
                    />
                )}
            </Modal>
        </div>
    );
}

export default TasksPage


