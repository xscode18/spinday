import { NextResponse } from "next/server";
import { getViewer, getWallet } from "@/lib/wallet";
import { creditSession, stripe } from "@/lib/stripe";


// Called when the buyer comes back from Stripe, so spins show up straight away even
// if the webhook is a few seconds behind. Crediting is idempotent, so both can run.
export async function POST(req: Request) {
  const viewer = await getViewer();
  if (!viewer || !stripe) return NextResponse.json({ error: "signin" }, { status: 401 });
  const { session_id } = (await req.json().catch(() => ({}))) as { session_id?: string };
  if (!session_id?.startsWith("cs_")) return NextResponse.json({ error: "session" }, { status: 400 });
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const owner = session.metadata?.owner ?? session.client_reference_id;
  if (owner !== viewer.owner) return NextResponse.json({ error: "session" }, { status: 403 });
  await creditSession(session);
  const spins = Number(session.metadata?.spins) || 0;
  return NextResponse.json({ paid: session.payment_status === "paid", spins, wallet: await getWallet(viewer.owner) });
}
