"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import apiClient from "@/utils/api_client";
import { Team, User } from "@prisma/client";
import { UserResult } from "@/types/userWithRoles";
import { number } from "zod";

type AuthContextType = {
    user: UserResult
    loading: boolean
    setUser: (user: UserResult) => void
    currentTeam: number
    setCurrentTeam: (index: number) => void
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    setUser: () => { },
    currentTeam: 0,
    setCurrentTeam: () => { }

});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserResult>(null)
    const [loading] = useState(false)
    const [currentTeam, setCurrentTeam] = useState(0)
    const [initializing, setInitializing] = useState(true);
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        const checkAuth = async () => {
            const publicRoutes = ["/", "/signin", "/signup"];
            if (publicRoutes.includes(pathname)) {
                setInitializing(false);
                return;
            }

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.warn("Token not found, redirecting to sign-in.");
                    setUser(null);
                    router.push("/signin");
                    return;
                }

                // Set token in apiClient
                apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                // Fetch user data
                const { data } = await apiClient.get<UserResult>("/protected/me");
                setUser(data);
            } catch (error) {
                console.error("Authentication check failed:", error);
                setUser(null);
                router.push("/signin");
            } finally {
                setInitializing(false);
            }
        };

        checkAuth();
    }, [router, pathname]);

    // Always return a valid layout
    if (initializing) {
        return (
            <div className="flex justify-center items-center h-screen">
                <></>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, loading, setUser, currentTeam, setCurrentTeam }}>
            {children}
        </AuthContext.Provider>
    );
};
