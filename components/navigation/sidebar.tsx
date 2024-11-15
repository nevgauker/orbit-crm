'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`bg-gray-800 text-white h-full p-4 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
                    }`}
            >
                {/* Toggle Button */}
                <button
                    className="bg-gray-700 text-white p-2 rounded-md mb-8 hover:bg-gray-600"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? '>' : '<'}
                </button>

                {/* Logo */}
                {!isCollapsed && (
                    <h2 className="text-2xl font-bold mb-8">OrbitCRM</h2>
                )}

                {/* Navigation */}
                <nav className="space-y-4 flex flex-col">
                    <Link href="/dashboard" className="truncate">
                        {isCollapsed ? <Image src={'/dashboard.png'} alt={'dashboard'} height={100} width={100} /> : 'Dashboard'}
                    </Link>
                    <Link href="/contacts" className="truncate">
                        {isCollapsed ? <Image src={'/contacts.png'} alt={'dashboard'} height={100} width={100} /> : 'Contacts'}
                    </Link>
                    <Link href="/leads" className="truncate">
                        {isCollapsed ? <Image src={'/leads.png'} alt={'dashboard'} height={100} width={100} /> : 'Leads'}
                    </Link>
                    <Link href="/opportunities" className="truncate">
                        {isCollapsed ? <Image src={'/opportunities.png'} alt={'dashboard'} height={100} width={100} /> : 'Opportunities'}
                    </Link>
                    <Link href="/tasks" className="truncate">
                        {isCollapsed ? <Image src={'/tasks.png'} alt={'dashboard'} height={100} width={100} /> : 'Tasks'}
                    </Link>
                    <Link href="/reports" className="truncate">
                        {isCollapsed ? <Image src={'/reports.png'} alt={'dashboard'} height={100} width={100} /> : 'Reports'}
                    </Link>
                    <Link href="/emails" className="truncate">
                        {isCollapsed ? <Image src={'/emails.png'} alt={'dashboard'} height={100} width={100} /> : 'Emails'}
                    </Link>
                    <Link href="/settings" className="truncate">
                        {isCollapsed ? <Image src={'/settings.png'} alt={'dashboard'} height={100} width={100} /> : 'Settings'}
                    </Link>
                </nav>
            </div>
        </div>
    );
}
