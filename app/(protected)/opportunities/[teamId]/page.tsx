import { OpportunitiesTable } from "@/components/tables/opportunities_table";




const OpportunitiesPage = ({ params }: { params: { teamId: string } }) => {
    const { teamId } = params

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Opportunities</h1>
            <p className="text-gray-600 mb-6">
                Manage your sales opportunities here. Track their stages, values, and expected close dates.
            </p>

            <div className="bg-white p-4 shadow rounded-md">
                <OpportunitiesTable />
            </div>
        </div>
    );
}

export default OpportunitiesPage


