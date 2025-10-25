'use client';

import { useState } from 'react';

interface TaskCreateFormProps {
    teamId: string; // ID of the team this task belongs to
    onSubmit: (taskData: TaskFormValues) => void; // Callback to handle form submission
    initialValues?: TaskFormValues
    submitLabel?: string
}

export interface TaskFormValues {
    title: string;
    description?: string;
    dueDate?: string; // ISO string for the date
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE'; // TaskStatus
    priority: 'HIGH' | 'MEDIUM' | 'LOW'; // TaskPriority
    teamId: string; // The ID of the team the task belongs to
}

export default function TaskCreateForm({ teamId, onSubmit, initialValues, submitLabel = 'Create Task' }: TaskCreateFormProps) {
    const [title, setTitle] = useState(initialValues?.title ?? '');
    const [description, setDescription] = useState(initialValues?.description ?? '');
    const [dueDate, setDueDate] = useState(initialValues?.dueDate ? new Date(initialValues.dueDate).toISOString().slice(0, 10) : '');
    const [status, setStatus] = useState<'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE'>(initialValues?.status ?? 'PENDING');
    const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>(initialValues?.priority ?? 'MEDIUM');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title) {
            alert('Task title is required.');
            return;
        }

        const taskData: TaskFormValues = {
            title,
            description: description || undefined,
            dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
            status,
            priority,
            teamId,
        };

        onSubmit(taskData);

        // Reset the form
        setTitle('');
        setDescription('');
        setDueDate('');
        setStatus('PENDING');
        setPriority('MEDIUM');
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{submitLabel}</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm text-muted-foreground mb-1">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md bg-background"
                    placeholder="Task title"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm text-muted-foreground mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md bg-background"
                    placeholder="Task description (optional)"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="dueDate" className="block text-sm text-muted-foreground mb-1">
                    Due Date
                </label>
                <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md bg-background"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block text-sm text-muted-foreground mb-1">
                    Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE')}
                    className="w-full px-4 py-2 border rounded-md bg-background"
                >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="OVERDUE">Overdue</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="priority" className="block text-sm text-muted-foreground mb-1">
                    Priority
                </label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'HIGH' | 'MEDIUM' | 'LOW')}
                    className="w-full px-4 py-2 border rounded-md bg-background"
                >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
            >
                {submitLabel}
            </button>
        </form>
    )
}
