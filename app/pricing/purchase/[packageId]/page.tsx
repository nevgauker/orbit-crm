"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/utils/api_client";

export default function PurchasePage({ params: { packageId } }: { params: { packageId: string } }) {
  const router = useRouter();
  useEffect(() => {
    const go = async () => {
      try {
        const { data } = await apiClient.post("/stripe/checkout", { packageId });
        if (data?.url) {
          window.location.href = data.url;
        } else {
          router.push("/pricing?error=1");
        }
      } catch (e) {
        console.error(e);
        router.push("/pricing?error=1");
      }
    };
    go();
  }, [packageId, router]);
  return <div className="p-6">Redirecting to payment...</div>;
}
