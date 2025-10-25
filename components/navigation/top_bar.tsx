import { useAuth } from '@/contexts/auth_context'
import TeamSwitcher from './team_switcher'
import Link from 'next/link'

export default function TopBar() {
  const { user } = useAuth()
  return (
    <div className='h-12 border-b bg-background flex items-center px-3'>
      <TeamSwitcher />
      <div className='ml-3 text-sm text-muted-foreground truncate'>
        {user ? `${user.email} · ${user.userType}` : ''}
      </div>
      <div className='ml-auto'>
        <Link className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90" href="/pricing">
          Upgrade
        </Link>
      </div>
    </div>
  )
}

