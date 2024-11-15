import { dummyEmails } from '@/data/emails';

export function EmailList({ onEmailClick }: { onEmailClick: (id: number) => void }) {
    return (
        <div className="w-full lg:w-1/3 border-r bg-white overflow-y-auto">
            {dummyEmails.map((email) => (
                <div
                    key={email.id}
                    className={`p-4 border-b cursor-pointer ${email.isRead ? 'bg-gray-100' : 'bg-white'
                        } hover:bg-gray-50`}
                    onClick={() => onEmailClick(email.id)}
                >
                    <h3 className="text-sm font-semibold text-gray-800">{email.sender}</h3>
                    <p className="text-xs text-gray-600">{email.subject}</p>
                    <p className="text-xs text-gray-500 truncate">{email.snippet}</p>
                    <span className="text-xs text-gray-400">{email.receivedAt}</span>
                </div>
            ))}
        </div>
    )
}
