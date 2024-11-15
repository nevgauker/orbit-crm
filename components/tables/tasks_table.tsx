import { dummyTasks } from '@/data/tasks';

export function TasksTable() {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Task</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Description</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Due Date</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Priority</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700 border-b">Status</th>
                        <th className="px-6 py-3 border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {dummyTasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-800">{task.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{task.description}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{task.dueDate}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
                                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                        }`}
                                >
                                    {task.priority}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800">
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {task.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-blue-600 hover:text-blue-800">Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
