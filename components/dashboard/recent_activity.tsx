import { recentContacts, recentLeads, upcomingTasks, recentEmails } from '@/data/dashboard';

export function RecentActivity() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium mb-3">Recent Contacts</h3>
                <ul>
                    {recentContacts.map((contact) => (
                        <li key={contact.id} className="text-sm text-gray-700 mb-2">
                            {contact.name} ({contact.company})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium mb-3">Recent Leads</h3>
                <ul>
                    {recentLeads.map((lead) => (
                        <li key={lead.id} className="text-sm text-gray-700 mb-2">
                            {lead.name} ({lead.status})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium mb-3">Upcoming Tasks</h3>
                <ul>
                    {upcomingTasks.map((task) => (
                        <li key={task.id} className="text-sm text-gray-700 mb-2">
                            {task.title} (Due: {task.dueDate})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-gray-600 text-sm font-medium mb-3">Recent Emails</h3>
                <ul>
                    {recentEmails.map((email) => (
                        <li key={email.id} className="text-sm text-gray-700 mb-2">
                            {email.subject} (From: {email.sender})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
