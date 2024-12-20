"use client";

import Sidebar from '@/components/navigation/sidebar';
import TopBar from '@/components/navigation/top_bar';
import { useAuth } from '@/contexts/auth_context';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  return (
    <div className="flex h-screen">
      {
        loading ? <p>Loading...</p> : <>
          {/* Sidebar */}
          <Sidebar />
          <div className='flex flex-col w-screen'>
            <TopBar />

            {children}
          </div>
        </>
      }
    </div>
  )
}


