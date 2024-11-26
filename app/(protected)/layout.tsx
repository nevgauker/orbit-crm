"use client";

import Sidebar from '@/components/navigation/sidebar';
import TeamSwitcher from '@/components/navigation/team_switcher';
import { useAuth } from '@/contexts/auth_context';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();

  return (
    <div className="flex h-screen">
      {
        loading ? <p>Loading...</p> : <>
          {/* Sidebar */}
          <Sidebar />
          <TeamSwitcher userRoles={user?.roles ?? []} currentTeamId={''} onSwitchTeam={function (teamId: string): void { }} />
          <div className='flex flex-col w-screen'>
            {children}
          </div>
        </>
      }
    </div>
  )
}


