// import { recentContacts, recentLeads, upcomingTasks, recentEmails } from '@/data/dashboard';
import { Contact, Email, Lead, Opportunity, Task } from "@prisma/client";
import { format } from 'date-fns';

interface RecentActivityProps {
    contacts: Contact[]
    leads: Lead[]
    opportunities: Opportunity[]
    tasks: Task[]
    emails: Email[]
}

export function RecentActivity({ contacts, leads, tasks, emails }: RecentActivityProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium mb-3">Recent Contacts</h3>
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact.id} className="text-sm text-gray-700 mb-2">
                            {`${contact.firstName} ${contact.lastName}`} ({contact.company})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium mb-3">Recent Leads</h3>
                <ul>
                    {leads.map((lead) => (
                        <li key={lead.id} className="text-sm text-gray-700 mb-2">
                            {lead.firstName} {lead.lastName} ({lead.status})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium mb-3">Upcoming Tasks</h3>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className="text-sm text-gray-700 mb-2">
                            {task.title} (Due: {task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : ''})

                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium mb-3">Recent Emails</h3>
                <ul>
                    {emails.map((email) => (
                        <li key={email.id} className="text-sm text-gray-700 mb-2">
                            {email.subject} (From: {email.sender})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
