import { useAuth } from '@/contexts/auth_context'
import TeamSwitcher from './team_switcher'
import Link from 'next/link'
export default function TopBar() {
  const { user } = useAuth()
  return (
    <div className=' bg-gray-100 h-9 flex space-x-2'>
      <div className='flex items-center justify-start ml-2 mt-2'>
        <TeamSwitcher />
        <div className='ml-2'>
          {`${user?.email} ${user?.userType}`}
        </div>

        <Link className="ml-2 p-1 rounded-md bg-green-600 text-white font-bold" href="/pricing">
          Upgrade
        </Link>
      </div>
    </div>
  )
}

