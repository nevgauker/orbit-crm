import { UserRole } from '@/types/userWithRoles'
import TeamSwitcher from './team_switcher'
export default function TopBar({ roles }: { roles: UserRole[] }) {
  return (
    <div className=' bg-gray-100 h-9'>
      <div className='ml-2 mt-2'>
        <TeamSwitcher userRoles={roles ?? []} currentTeamId={''} onSwitchTeam={function (teamId: string): void { }} />
      </div>

    </div>
  )
}

