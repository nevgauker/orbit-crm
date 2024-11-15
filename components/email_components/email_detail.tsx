import { dummyEmails } from '@/data/emails';

export function EmailDetail({ selectedEmailId }: { selectedEmailId: number | null }) {
    const email = dummyEmails.find((e) => e.id === selectedEmailId);

    if (!email) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                Select an email to view details.
            </div>
        );
    }

    return (
        <div className="flex-1 p-6 bg-white">
            <h2 className="text-lg font-bold text-gray-800">{email.subject}</h2>
            <p className="text-sm text-gray-600">From: {email.sender}</p>
            <p className="text-xs text-gray-500 mb-4">Received: {email.receivedAt}</p>
            <hr className="mb-4" />
            <p className="text-sm text-gray-800">
                {email.snippet} {/* Replace with full content in a real app */}
            </p>
        </div>
    )
}
