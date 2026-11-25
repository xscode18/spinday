import "server-only";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "@/lib/config";
import { addCredits, saveSub } from "@/lib/wallet";

export const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

/** Credits a paid checkout session (safe to call more than once: only the first call adds spins). */
export async function creditSession(session: Stripe.Checkout.Session) {
  if (session.mode === "subscription") {
    if (!stripe || !session.subscription) return false;
    const id = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
    await syncSubscription(await stripe.subscriptions.retrieve(id));
    return true;
  }
  if (session.payment_status !== "paid") return false;
  const owner = session.metadata?.owner ?? session.client_reference_id;
  const spins = Number(session.metadata?.spins);
  if (!owner || !spins) return false;
  return addCredits(session.id, owner, spins, session.amount_total ?? null, session.currency ?? null);
}

/** Saves the plan's current state. Stripe sends this on start, every renewal, failed payment and cancel. */
export async function syncSubscription(sub: Stripe.Subscription) {
  const owner = sub.metadata?.owner;
  if (!owner) return;
  const end = sub.items.data[0]?.current_period_end;
  await saveSub({
    owner,
    stripe_customer: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
    stripe_subscription: sub.id,
    status: sub.status,
    current_period_end: end ? new Date(end * 1000).toISOString() : null,
  });
}
