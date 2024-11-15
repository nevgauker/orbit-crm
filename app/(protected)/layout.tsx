// app/layout.tsx
import { ReactNode } from 'react';
import Sidebar from '@/components/navigation/sidebar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {children}
    </div>
  )
}
