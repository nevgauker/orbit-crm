"use client";

import { useState } from "react";

export default function ContactSalesPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !message) {
            setError("All fields are required.");
            return;
        }

        try {
            setError("");
            // Simulate an API call to send contact data
            await fetch("/api/contact-sales", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            setSuccess(true);
            setName("");
            setEmail("");
            setMessage("");
        } catch {
            setError("Failed to send your message. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center py-10 px-6 bg-gray-50">
            <h1 className="text-4xl font-bold mb-6">Contact Sales</h1>
            <p className="text-gray-600 mb-10 text-center max-w-lg">
                Interested in our Enterprise Plan or have specific requirements? Fill out the form below, and we’ll get back to you as soon as possible.
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-md shadow-md max-w-lg w-full"
            >
                {success && (
                    <p className="text-green-600 text-sm mb-4">
                        Thank you for reaching out! We’ll get back to you shortly.
                    </p>
                )}
                {error && (
                    <p className="text-red-600 text-sm mb-4">
                        {error}
                    </p>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Your full name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Your email address"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-1"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Tell us more about your requirements"
                        rows={5}
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}
