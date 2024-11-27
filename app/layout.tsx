import { ReactNode } from 'react';
import './globals.css';
import { AuthProvider } from '@/contexts/auth_context';

export const metadata = {
  title: 'OrbitCRM',
  description: 'Customer Relationship Management',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>

          {/* Main Content */}
          <main className="h-screen w-screen bg-gray-100 overflow-auto">
            {children}
          </main>
        </AuthProvider>

      </body>
    </html>
  );
}
