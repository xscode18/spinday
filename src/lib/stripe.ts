import "server-only";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "@/lib/config";
import { addCredits } from "@/lib/wallet";

export const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

/** Credits a paid checkout session (safe to call more than once: only the first call adds spins). */
export async function creditSession(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return false;
  const owner = session.metadata?.owner ?? session.client_reference_id;
  const spins = Number(session.metadata?.spins);
  if (!owner || !spins) return false;
  return addCredits(session.id, owner, spins, session.amount_total ?? null, session.currency ?? null);
}
