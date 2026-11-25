import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { STRIPE_WEBHOOK_SECRET } from "@/lib/config";
import { creditSession, stripe, syncSubscription } from "@/lib/stripe";


export async function POST(req: Request) {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) return NextResponse.json({ error: "not configured" }, { status: 503 });
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, req.headers.get("stripe-signature") ?? "", STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await creditSession(event.data.object as Stripe.Checkout.Session);
      break;
    // Monthly plan: started, renewed, payment failed, cancelled.
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await syncSubscription(event.data.object as Stripe.Subscription);
      break;
  }
  return NextResponse.json({ received: true });
}
