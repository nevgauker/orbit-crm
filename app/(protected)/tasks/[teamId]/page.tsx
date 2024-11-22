'user client'
import { TasksTable } from "@/components/tables/tasks_table";
import apiClient from "@/utils/api_client";
import { Task } from "@prisma/client";
import { useEffect, useState } from "react";




const TasksPage = ({ params }: { params: { teamId: string } }) => {

    const { teamId } = params
    const [tasks, setTasks] = useState<Task[]>([])
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        // Fetch all contacts when the component loads
        const fetchTasks = async () => {
            try {
                const response = await apiClient.get(`/tasks?teamId=${teamId}`)
                setTasks(response.data);
                setFilteredTasks(response.data); // Initialize filtered contacts with all data
            } catch (error) {
                console.error('Error fetching contacts:', error)
            }
        };

        fetchTasks();
    }, []);

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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h1>
            <p className="text-gray-600 mb-6">
                View and manage your tasks here. Track due dates, priorities, and statuses.
            </p>

            <div className="bg-white p-4 shadow rounded-md">
                <TasksTable tasks={filteredTasks} />
            </div>
        </div>
    );
}

export default TasksPage


