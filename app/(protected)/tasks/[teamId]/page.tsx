'use client'
import ActivityLoader from "@/components/activity_loader";
import { SearchBar } from "@/components/search_bar";
import { TasksTable } from "@/components/tables/tasks_table";
import apiClient from "@/utils/api_client";
import { Role, Task } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth_context";


const TasksPage = ({ params }: { params: { teamId: string } }) => {

    const { teamId } = params
    const [tasks, setTasks] = useState<Task[]>([])
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()


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

    const handleSearch = () => {
        const filtered = tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(search.toLowerCase()))
        )
        setFilteredTasks(filtered);
    }

    const handleClear = () => {
        setSearch('');
        setFilteredTasks(tasks); // Reset to all data
    }

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
            <SearchBar
                search={search}
                placeholder='Search by first name, last name, email, or phone...'
                setSearch={setSearch}
                handleSearch={handleSearch}
                handleClear={handleClear}
            />
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
                    const handleEdit = async (task: Task) => {
                        const title = prompt('Title', task.title) ?? task.title
                        const description = prompt('Description', task.description ?? '') || undefined
                        const dueDate = prompt('Due date (YYYY-MM-DD)', task.dueDate ? String(task.dueDate).slice(0, 10) : '') || undefined
                        const status = prompt('Status (PENDING, IN_PROGRESS, COMPLETED, OVERDUE)', task.status) as any ?? task.status
                        const priority = prompt('Priority (HIGH, MEDIUM, LOW)', task.priority) as any ?? task.priority
                        const { data } = await apiClient.patch<Task>('/tasks', { id: task.id, title, description, dueDate, status, priority })
                        setTasks(prev => prev.map(t => t.id === task.id ? data : t))
                        setFilteredTasks(prev => prev.map(t => t.id === task.id ? data : t))
                    }
                    return filteredTasks.length > 0 ? (
                        <TasksTable tasks={filteredTasks} canDelete={canDelete} canEdit={true} onDelete={handleDelete} onEdit={handleEdit} />
                    ) : (
                        <p>No tasks found.</p>
                    )
                })()}
            </div>
        </div>
    );
}

export default TasksPage


