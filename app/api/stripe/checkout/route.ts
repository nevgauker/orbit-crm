import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { requireEnv } from "@/utils/env";
import { getAuthUserId } from "@/utils/authorization";
import { UserType } from "@prisma/client";

// Defer Stripe initialization to the handler to avoid build-time env requirement

const PRICE_MAP: Record<string, { priceIdEnv: string; userType: UserType }> = {
  "4483": { priceIdEnv: "STRIPE_PRICE_PRO", userType: UserType.PRO },
  "8809": { priceIdEnv: "STRIPE_PRICE_ENTERPRISE", userType: UserType.ENTERPRISE },
};

export async function POST(req: NextRequest) {
  try {
    const STRIPE_SECRET_KEY = requireEnv("STRIPE_SECRET_KEY");
    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const userId = await getAuthUserId(req as unknown as Request);
    const { packageId } = await req.json();

    const mapping = PRICE_MAP[String(packageId)];
    if (!mapping) return NextResponse.json({ error: "Invalid packageId" }, { status: 400 });

    const priceId = requireEnv(mapping.priceIdEnv);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/pricing?success=1`,
      cancel_url: `${baseUrl}/pricing?canceled=1`,
      metadata: {
        userId,
        targetUserType: mapping.userType,
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Stripe checkout error", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}


