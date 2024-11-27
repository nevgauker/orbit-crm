'use client'
import { TasksTable } from "@/components/tables/tasks_table";
import apiClient from "@/utils/api_client";
import { Task } from "@prisma/client";
import Link from "next/link";
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
                {filteredTasks.length > 0 ? (
                    <TasksTable tasks={filteredTasks} />
                ) : (
                    <p>No tasks found.</p>
                )}
            </div>
        </div>
    );
}

export default TasksPage


