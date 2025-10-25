"use client"
import React, { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation"
import Link from "next/link";
import ActivityLoader from "@/components/activity_loader";

const SignUpPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null)
        setLoading(true)

        try {
            const response = await axios.post("/api/auth/signup", formData);
            if (response.status === 201) {
                router.push("/signin");
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
            // setError(err.response?.data?.error || "Something went wrong.");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            {loading ? <ActivityLoader /> : <><form
                onSubmit={handleSubmit}
                className="rounded-lg border bg-card p-6 w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>

                <div className="mb-4">
                    <label className="block text-sm text-muted-foreground mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-md bg-background"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-muted-foreground mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-md bg-background"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-muted-foreground mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-md bg-background"
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
                >
                    Sign Up
                </button>
            </form>
                <span>Already have a user? <Link className='underline' href={"/signin"}>Sign in here</Link>  </span>

            </>
            }

        </div>
    )
}

export default SignUpPage
