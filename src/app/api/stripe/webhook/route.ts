import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { STRIPE_WEBHOOK_SECRET } from "@/lib/config";
import { creditSession, stripe } from "@/lib/stripe";


export async function POST(req: Request) {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, req.headers.get("stripe-signature") ?? "", STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }
  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    await creditSession(event.data.object as Stripe.Checkout.Session);
  }
  return NextResponse.json({ received: true });
}
