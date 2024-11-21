import { TasksTable } from "@/components/tables/tasks_table";

const TasksPage = ({ params }: { params: { teamId: string } }) => {

    const { teamId } = params
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h1>
            <p className="text-gray-600 mb-6">
                View and manage your tasks here. Track due dates, priorities, and statuses.
            </p>

            <div className="bg-white p-4 shadow rounded-md">
                <TasksTable />
            </div>
        </div>
    );
}

export default TasksPage


