export const metrics = {
    totalContacts: 45,
    totalLeads: { NEW: 10, CONTACTED: 8, QUALIFIED: 5, LOST: 2 },
    totalOpportunities: { OPEN: 4, IN_PROGRESS: 3, WON: 2, LOST: 1 },
    totalTasks: { PENDING: 6, COMPLETED: 10, OVERDUE: 3 },
}

export const recentContacts = [
    { id: 1, name: 'Alice Johnson', company: 'Acme Corp.', addedAt: '2024-11-12' },
    { id: 2, name: 'Bob Smith', company: 'Globex Inc.', addedAt: '2024-11-11' },
];

export const recentLeads = [
    { id: 1, name: 'Charlie Brown', email: 'charlie@peanuts.com', status: 'NEW' },
    { id: 2, name: 'Dana White', email: 'dana@ufc.com', status: 'CONTACTED' },
];

export const upcomingTasks = [
    { id: 1, title: 'Follow-up with Alice Johnson', dueDate: '2024-11-15' },
    { id: 2, title: 'Prepare proposal for Charlie Brown', dueDate: '2024-11-16' },
];

export const recentEmails = [
    { id: 1, subject: 'Proposal Review', sender: 'Alice Johnson', receivedAt: '2024-11-12' },
    { id: 2, subject: 'Meeting Agenda', sender: 'Bob Smith', receivedAt: '2024-11-11' },
]

