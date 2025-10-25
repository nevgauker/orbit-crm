export function KPISection({
    totalContacts,
    totalLeads,
    qualifiedLeads,
    openOpps,
    wonOpps,
    revenueWon,
    openTasks,
}: {
    totalContacts: number
    totalLeads: number
    qualifiedLeads: number
    openOpps: number
    wonOpps: number
    revenueWon: number
    openTasks: number
}) {
    const items = [
        { label: 'Contacts', value: totalContacts },
        { label: 'Leads', value: totalLeads },
        { label: 'Qualified Leads', value: qualifiedLeads },
        { label: 'Open Opportunities', value: openOpps },
        { label: 'Won Opportunities', value: wonOpps },
        { label: 'Revenue Won', value: `$${revenueWon}` },
        { label: 'Open Tasks', value: openTasks },
    ]
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((kpi, index) => (
                <div key={index} className="p-4 bg-white rounded-md shadow">
                    <h3 className="text-gray-600 text-sm font-medium">{kpi.label}</h3>
                    <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
                </div>
            ))}
        </div>
    )
}
