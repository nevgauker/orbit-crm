import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { requireEnv } from "@/utils/env";
import db from "@/db/db";
import { UserType } from "@prisma/client";

export const runtime = "nodejs";

const STRIPE_SECRET_KEY = requireEnv("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = requireEnv("STRIPE_WEBHOOK_SECRET");
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId as string | undefined;
      const target = session.metadata?.targetUserType as keyof typeof UserType | undefined;
      if (userId && target && UserType[target]) {
        await db.user.update({ where: { id: userId }, data: { userType: UserType[target] } });
      }
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

