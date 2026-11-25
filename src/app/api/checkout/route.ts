import { NextResponse } from "next/server";
import { CURRENCY, DEMO, PACKS, PAYMENTS_LIVE, PLAN, type PackId } from "@/lib/config";
import { addCredits, getSub, getViewer, getWallet, saveSub } from "@/lib/wallet";
import { stripe } from "@/lib/stripe";


export async function POST(req: Request) {
  const viewer = (await getViewer(true))!;
  const { pack, plan } = (await req.json().catch(() => ({}))) as { pack?: string; plan?: string };
  const monthly = plan === "monthly";
  const p = PACKS[pack as PackId];
  if (!monthly && !p) return NextResponse.json({ error: "pack" }, { status: 400 });
  // The plan follows the account, so it needs an email (Google or email link).
  if (monthly && viewer.guest) return NextResponse.json({ error: "signin" }, { status: 401 });

  // Before Stripe is set up: hand it out for free so the flow can be tested.
  if (!PAYMENTS_LIVE || !stripe) {
    if (!DEMO && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "payments_off" }, { status: 503 });
    }
    if (monthly) {
      await saveSub({ owner: viewer.owner, stripe_customer: null, stripe_subscription: `test_${crypto.randomUUID()}`, status: "active", current_period_end: new Date(Date.now() + 30 * 864e5).toISOString() });
    } else {
      await addCredits(`test_${crypto.randomUUID()}`, viewer.owner, p.spins, 0, CURRENCY);
    }
    return NextResponse.json({ test: true, wallet: await getWallet(viewer.owner) });
  }

  const origin = new URL(req.url).origin;
  if (monthly) {
    const existing = await getSub(viewer.owner);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      client_reference_id: viewer.owner,
      ...(existing?.stripe_customer ? { customer: existing.stripe_customer } : { customer_email: viewer.email ?? undefined }),
      metadata: { owner: viewer.owner, plan: "monthly" },
      subscription_data: { metadata: { owner: viewer.owner } },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: PLAN.cents,
            recurring: { interval: PLAN.interval },
            product_data: { name: `SpinDay: ${PLAN.label}`, description: "Spin as much as you want. Cancel anytime." },
          },
        },
      ],
      success_url: `${origin}/?paid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=1`,
    });
    return NextResponse.json({ url: session.url });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    client_reference_id: viewer.owner,
    customer_email: viewer.email ?? undefined,
    metadata: { owner: viewer.owner, spins: String(p.spins), pack: String(pack) },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          unit_amount: p.cents,
          product_data: { name: `SpinDay: ${p.label}`, description: "Extra spins. They never expire." },
        },
      },
    ],
    // No payment_method_types: Checkout then shows every method switched on in the Stripe
    // dashboard, including Apple Pay and Google Pay on devices that support them.
    success_url: `${origin}/?paid={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?canceled=1`,
  });
  return NextResponse.json({ url: session.url });
}
