import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'OrbitCRM',
  description: 'Customer Relationship Management',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Main Content */}
        <main className="h-screen w-screen bg-gray-100 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
