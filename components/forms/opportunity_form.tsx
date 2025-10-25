'use client'
import { Lead } from '@prisma/client';
import { useState } from 'react'

interface OpportunityCreateFormProps {
    leads: Lead[] // List of leads to associate with the opportunity
    teamId: string; // ID of the team this opportunity belongs to
    onSubmit: (opportunityData: OpportunityFormValues) => void; // Callback to handle form submission
    initialValues?: OpportunityFormValues
    submitLabel?: string
}

export interface OpportunityFormValues {
    title: string;
    description?: string;
    value: number;
    status: 'OPEN' | 'IN_PROGRESS' | 'WON' | 'LOST' // OpportunityStatus
    leadId: string; // Associated lead ID
    teamId: string; // The ID of the team the opportunity belongs to
}

export default function OpportunityCreateForm({
    leads,
    teamId,
    onSubmit,
    initialValues,
    submitLabel = 'Create Opportunity',
}: OpportunityCreateFormProps) {
    const [title, setTitle] = useState(initialValues?.title ?? '');
    const [description, setDescription] = useState(initialValues?.description ?? '');
    const [value, setValue] = useState(initialValues?.value ?? 0);
    const [status, setStatus] = useState<'OPEN' | 'IN_PROGRESS' | 'WON' | 'LOST'>(initialValues?.status ?? 'OPEN');
    const [leadId, setLeadId] = useState(initialValues?.leadId ?? '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !leadId) {
            alert('Title and Lead are required.');
            return;
        }

        const opportunityData: OpportunityFormValues = {
            title,
            description: description || undefined,
            value: value || 0,
            status,
            leadId,
            teamId,
        };

        onSubmit(opportunityData);

        // Reset the form
        setTitle('');
        setDescription('');
        setValue(0);
        setStatus('OPEN');
        setLeadId('');
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
                    placeholder="Opportunity title"
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
                    placeholder="Opportunity description (optional)"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="value" className="block text-sm text-muted-foreground mb-1">
                    Value
                </label>
                <input
                    id="value"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full px-4 py-2 border rounded-md bg-background"
                    placeholder="Opportunity value"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block text-sm text-muted-foreground mb-1">
                    Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'OPEN' | 'IN_PROGRESS' | 'WON' | 'LOST')}
                    className="w-full px-4 py-2 border rounded-md bg-background"
                >
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="WON">Won</option>
                    <option value="LOST">Lost</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="lead" className="block text-sm text-muted-foreground mb-1">
                    Lead
                </label>
                <select
                    id="lead"
                    value={leadId}
                    onChange={(e) => setLeadId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md bg-background"
                    required
                >
                    <option value="" disabled>
                        Select a lead
                    </option>
                    {leads.map((lead) => (
                        <option key={lead.id} value={lead.id}>
                            {`${lead.firstName} ${lead.lastName}`}
                        </option>
                    ))}
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
