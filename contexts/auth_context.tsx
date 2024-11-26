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

            console.log('zzzz')
            const publicRoutes = ["/", "/invite", "/signin", "/signup", "/pricing"]
            const isPublicRoute = publicRoutes.includes(pathname)

            try {
                const token = localStorage.getItem("token")

                if (isPublicRoute && !token) {
                    // On public routes, don't fetch or redirect if no token
                    setUser(null);
                    setInitializing(false);
                    return
                }

                if (token) {
                    // Set token in apiClient
                    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`

                    // Fetch user data
                    console.log('DDDDDDD')

                    const { data } = await apiClient.get<UserResult>("/protected/me")
                    setUser(data);
                } else if (!isPublicRoute) {
                    // Redirect to sign-in for non-public routes without a token
                    router.push("/signin")
                }
            } catch (error) {
                console.error("Authentication check failed:", error);

                if (!isPublicRoute) {
                    setUser(null);
                    router.push("/signin")
                }
            } finally {
                setInitializing(false)
            }
        }

        checkAuth()
    }, [router, pathname])


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
