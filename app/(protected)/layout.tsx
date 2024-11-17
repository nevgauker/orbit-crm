"use client";

import Sidebar from '@/components/navigation/sidebar';
import { useRouter } from "next/navigation";
import { useAuth } from '@/contexts/auth_context';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, /*setUser*/ } = useAuth();
  const router = useRouter();

  // const handleSignOut = () => {
  //   // Clear the token and reset the user
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   router.push("/signin");
  // }

  if (loading) {
    return <p>Loading...</p>; // Show a loading spinner or message
  }

  if (!user) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="flex h-screen">
      {/* Navigation Bar */}

      {/* Sidebar */}
      <Sidebar />

      {children}
    </div>
  )
}


