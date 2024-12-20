'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import axios from 'axios';

const InvitePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    useEffect(() => {
        const processInvite = async () => {

            if (!token) {
                setError("Invalid or missing invite token.");
                setLoading(false);
                return;
            }

            try {
                const decodedData = atob(decodeURIComponent(token as string)); // Decode the token
                const [email, teamId, role, inviterName] = decodedData.split(":");

                // Send the invite data to the server for processing
                const response = await axios.post("/api/invite", {
                    email,
                    teamId,
                    role,
                    inviterName,
                });

                if (response.status === 200) {
                    router.push("/dashboard"); // Redirect to the dashboard
                } else {
                    setError("Failed to process the invite.");
                }
            } catch (err) {
                console.error("Error processing invite:", err);
                setError("Invalid invite link.");
            } finally {
                setLoading(false);
            }
        }

        // if (router.isReady) {
        processInvite();
        // }
    }, [router, token]);

    if (loading) return <div>Processing your invitation...</div>;
    if (error) return <div>Error: {error}</div>;

    return null;
};

export default InvitePage;
