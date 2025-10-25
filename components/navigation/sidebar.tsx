'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth_context';
import { 
  LayoutDashboard, Users, UserPlus, Briefcase, CheckSquare, BarChart3, Mail, Settings, LogOut, UsersRound 
} from 'lucide-react';

type IconType = React.ComponentType<{ size?: number | string; className?: string }>

function NavItem({ href, icon: Icon, label, collapsed }: { href: string; icon: IconType; label: string; collapsed: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-accent hover:text-accent-foreground">
      <Icon size={18} className="shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  )
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { setUser, user, currentTeam, setCurrentTeam } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setUser(null)
    setCurrentTeam(0)
    router.push("/signin")
  }

  const teamId = user?.roles[currentTeam].team.id

  return (
    <div className={`h-full border-r bg-card text-card-foreground p-3 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <button
        className="mb-4 px-2 py-1 rounded-md text-sm bg-secondary text-secondary-foreground hover:opacity-90"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? '›' : '‹'}
      </button>
      {!isCollapsed && (
        <h2 className="text-xl font-semibold mb-6">OrbitCRM</h2>
      )}

      <nav className="flex flex-col justify-between h-full">
        <div className='flex flex-col gap-1'>
          <NavItem href={`/dashboard/${teamId}`} icon={LayoutDashboard} label="Dashboard" collapsed={isCollapsed} />
          <NavItem href={`/contacts/${teamId}`} icon={UsersRound} label="Contacts" collapsed={isCollapsed} />
          <NavItem href={`/leads/${teamId}`} icon={UserPlus} label="Leads" collapsed={isCollapsed} />
          <NavItem href={`/opportunities/${teamId}`} icon={Briefcase} label="Opportunities" collapsed={isCollapsed} />
          <NavItem href={`/tasks/${teamId}`} icon={CheckSquare} label="Tasks" collapsed={isCollapsed} />
          <NavItem href={`/reports/${teamId}`} icon={BarChart3} label="Reports" collapsed={isCollapsed} />
          <NavItem href={`/emails/${teamId}`} icon={Mail} label="Emails" collapsed={isCollapsed} />
          <NavItem href={`/teams`} icon={Users} label="Teams" collapsed={isCollapsed} />
          <NavItem href={`/settings`} icon={Settings} label="Settings" collapsed={isCollapsed} />
        </div>
        <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-accent hover:text-accent-foreground">
          <LogOut size={18} />
          {!isCollapsed && <span>Sign out</span>}
        </button>
      </nav>
    </div>
  );
}



