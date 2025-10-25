// import { metrics } from '@/data/dashboard';
import { Totals } from '@/types/dashBoard_types';
import { UsersRound, UserPlus, Briefcase, CheckSquare } from 'lucide-react';

export function MetricsCard({ totals }: { totals: Totals }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card icon={<UsersRound size={18} />} label="Total Contacts" value={totals.contacts} />
            <Card icon={<UserPlus size={18} />} label="Total Leads" value={totals.leads} />
            <Card icon={<Briefcase size={18} />} label="Total Opportunities" value={totals.opportunities} />
            <Card icon={<CheckSquare size={18} />} label="Total Tasks" value={totals.tasks} />
        </div>
    )
}

function Card({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
    return (
        <div className="rounded-lg border bg-card text-card-foreground p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-2">{icon} {label}</span>
            </div>
            <div className="mt-2 text-2xl font-semibold">{value}</div>
        </div>
    )
}
