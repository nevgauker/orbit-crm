"use client";

import { useAuth } from "@/contexts/auth_context";
import { UserType } from "@prisma/client";
import Link from "next/link";

export default function PricingPage() {
    const { user } = useAuth();
    const userType = user?.userType;

    const packages = [
        {
            name: "Free Plan",
            price: "Free",
            features: ["1 User", "1 Team", "Free Support"],
            buttonText: userType === UserType.FREE ? "Current Plan" : "Sign Up for Free",
            link: "/signup",
            shouldBeDisabled: userType === UserType.FREE,
        },
        {
            name: "Pro Plan",
            price: "$15/month",
            features: ["Up to 5 Users", "Up to 5 Teams", "Priority Support"],
            buttonText: userType === UserType.PRO ? "Current Plan" : "Upgrade to Pro",
            link: "/signup?plan=pro",
            shouldBeDisabled: userType === UserType.PRO,
        },
        {
            name: "Enterprise Plan",
            price: "$50/month",
            features: ["Unlimited Users", "Unlimited Teams", "Dedicated Support"],
            buttonText: userType === UserType.ENTERPRISE ? "Current Plan" : "Contact Sales",
            link: "/contact-sales",
            shouldBeDisabled: userType === UserType.ENTERPRISE,
        },
    ];

    return (
        <div className="flex flex-col items-center py-10 px-6 bg-gray-50">
            <h1 className="text-4xl font-bold mb-6">Choose the Perfect Plan</h1>
            <p className="text-gray-600 mb-10 text-center max-w-lg">
                Find the right plan for your team. Scale your operations with flexibility and dedicated support.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {packages.map((pkg) => (
                    <div
                        key={pkg.name}
                        className={`bg-white border rounded-lg p-6 shadow-md ${pkg.shouldBeDisabled ? "opacity-50" : "opacity-100"
                            }`}
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">{pkg.name}</h2>
                        <p className="text-3xl font-bold text-gray-900 mb-6">{pkg.price}</p>
                        <ul className="space-y-2 text-gray-600 mb-6">
                            {pkg.features.map((feature) => (
                                <li key={feature} className="flex items-center space-x-2">
                                    <span>✔️</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={pkg.link}
                            className={`block text-center py-2 px-4 rounded ${pkg.shouldBeDisabled
                                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            {pkg.buttonText}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
