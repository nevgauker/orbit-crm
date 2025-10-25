import { ReactNode } from 'react';
import './globals.css';
import { AuthProvider } from '@/contexts/auth_context';
import { Inter } from 'next/font/google';
import AppToaster from '@/components/providers/toaster';

export const metadata = {
  title: 'OrbitCRM',
  description: 'Customer Relationship Management',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>

          {/* Main Content */}
          <main className="h-screen w-screen bg-background overflow-auto">
            {children}
          </main>
          <AppToaster />
        </AuthProvider>

      </body>
    </html>
  );
}
