"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    setUser: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Fetch current user from API or localStorage
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token");

                const res = await fetch("/api/protected/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data: User = await res.json();
                    setUser(data);
                } else {
                    throw new Error("Failed to authenticate")
                }
            } catch {
                router.push("/signin")
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}
