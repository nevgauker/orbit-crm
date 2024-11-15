import { LeadsTable } from "@/components/tables/leads_table";

function LeadsPage() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Leads</h1>
            <p className="text-gray-600 mb-6">
                Track and manage your leads here. View, qualify, or mark leads as lost.
            </p>

            <div className="bg-white p-4 shadow rounded-md">
                <LeadsTable />
            </div>
        </div>
    )
}


export default LeadsPage