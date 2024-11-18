"use client"
import React, { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation"

const SignUpPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null)

        try {
            const response = await axios.post("/api/auth/signup", formData);
            if (response.status === 201) {
                router.push("/signin");
            }
        } catch (err) {
            console.log(err)
            // setError(err.response?.data?.error || "Something went wrong.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

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
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUpPage
