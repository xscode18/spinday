import { NextResponse } from "next/server";
import { getSub, getViewer } from "@/lib/wallet";
import { stripe } from "@/lib/stripe";

// Stripe's customer portal: cancel the plan, change card, see receipts.
export async function POST(req: Request) {
  const viewer = await getViewer();
  if (!viewer || viewer.guest) return NextResponse.json({ error: "signin" }, { status: 401 });
  const sub = await getSub(viewer.owner);
  if (!stripe || !sub?.stripe_customer) return NextResponse.json({ error: "nosub" }, { status: 404 });
  const portal = await stripe.billingPortal.sessions.create({ customer: sub.stripe_customer, return_url: new URL(req.url).origin });
  return NextResponse.json({ url: portal.url });
}
