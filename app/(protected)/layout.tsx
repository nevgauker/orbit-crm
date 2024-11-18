"use client";

import Sidebar from '@/components/navigation/sidebar';
import { useRouter } from "next/navigation";
import { useAuth } from '@/contexts/auth_context';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { loading, setUser } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    // Clear the token and reset the user
    localStorage.removeItem("token");
    setUser(null);
    router.push("/signin");
  }

  return (
    <div className="flex h-screen">
      {
        loading ? <p>Loading...</p> : <>
          {/* Sidebar */}
          <Sidebar />
          <div className='flex flex-col w-screen'>
            {children}
          </div>
        </>
      }
    </div>
  )
}


