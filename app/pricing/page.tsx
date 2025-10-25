"use client";

import { useAuth } from "@/contexts/auth_context";
import { Package, packages } from "@/data/packages/packages";
import Link from "next/link";

function PackageCard({ pkg, isDisabled }: { pkg: Package; isDisabled: boolean }) {
  return (
    <div
      key={pkg.name}
      className={`bg-white border rounded-lg p-6 shadow-md ${isDisabled ? "opacity-50" : "opacity-100"}`}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{pkg.name}</h2>
      <p className="text-3xl font-bold text-gray-900 mb-6">{pkg.price}</p>
      <ul className="space-y-2 text-gray-600 mb-6">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-center space-x-2">
            <span aria-hidden>✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={pkg.link}
        className={`block text-center py-2 px-4 rounded ${
          isDisabled ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {pkg.buttonText}
      </Link>
    </div>
  );
}

export default function PricingPage() {
  const { user } = useAuth();
  const userType = user?.userType;
  return (
    <div className="flex flex-col items-center py-10 px-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Choose the Perfect Plan</h1>
      <p className="text-gray-600 mb-10 text-center max-w-lg">
        Find the right plan for your team. Scale your operations with flexibility and dedicated support.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} isDisabled={userType === pkg.userType} />
        ))}
      </div>
    </div>
  );
}

