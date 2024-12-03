'use client';

import { EmailDetail } from '@/components/email_components/email_detail';
import { EmailList } from '@/components/email_components/emails_list';
import { useState } from 'react';


const EmailsPage = () => {
    // const { teamId } = params

    const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            <EmailList onEmailClick={setSelectedEmailId} />
            <EmailDetail selectedEmailId={selectedEmailId} />
        </div>
    );
}


export default EmailsPage