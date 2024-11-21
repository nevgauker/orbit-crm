"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import ActivityLoader from "@/components/activity_loader"
import { deleteUsers } from "@/actions/delete_users"
import Link from "next/link"


const SignInPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const response = await axios.post("/api/auth/signin", formData);
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem("token", token); // Store token
                router.push("/dashboard"); // Redirect after successful login
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
            // setError(err.response?.data?.error || "Invalid email or password.");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {/* <button onClick={async () => deleteUsers()}>delete users</button> */}
            {
                loading ? (
                    <ActivityLoader />
                )
                    : (<>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 rounded shadow-md w-full max-w-md"
                        >
                            <h2 className="text-2xl font-bold mb-6">Sign In</h2>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                Sign In
                            </button>
                        </form>
                        <span>Do not have a user? <Link className='underline' href={"/signup"}>Sign up here</Link>  </span>
                    </>
                    )
            }
        </div>
    )
}

export default SignInPage
