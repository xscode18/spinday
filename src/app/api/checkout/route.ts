import { NextResponse } from "next/server";
import { CURRENCY, DEMO, PACKS, PAYMENTS_LIVE, type PackId } from "@/lib/config";
import { addCredits, getViewer, getWallet } from "@/lib/wallet";
import { stripe } from "@/lib/stripe";


export async function POST(req: Request) {
  const viewer = await getViewer();
  if (!viewer) return NextResponse.json({ error: "signin" }, { status: 401 });
  const { pack } = (await req.json().catch(() => ({}))) as { pack?: string };
  const p = PACKS[pack as PackId];
  if (!p) return NextResponse.json({ error: "pack" }, { status: 400 });

  // Before Stripe is set up: hand out the spins for free so the flow can be tested.
  if (!PAYMENTS_LIVE || !stripe) {
    if (!DEMO && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "payments_off" }, { status: 503 });
    }
    await addCredits(`test_${crypto.randomUUID()}`, viewer.id, p.spins, 0, CURRENCY);
    return NextResponse.json({ test: true, wallet: await getWallet(viewer.id) });
  }

  const origin = new URL(req.url).origin;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    client_reference_id: viewer.id,
    customer_email: viewer.email ?? undefined,
    metadata: { user_id: viewer.id, spins: String(p.spins), pack: String(pack) },
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
    success_url: `${origin}/?paid={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?canceled=1`,
  });
  return NextResponse.json({ url: session.url });
}
