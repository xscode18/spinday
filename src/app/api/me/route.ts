import { NextResponse } from "next/server";
import { getViewer, getWallet, history } from "@/lib/wallet";
import { byId, landed } from "@/lib/spin";

export async function GET() {
  const viewer = await getViewer();
  // A brand-new browser: nothing used yet.
  if (!viewer) return NextResponse.json({ signedIn: false, wallet: { freeLeft: true, credits: 0, unlimited: false }, streak: 0, last: null });
  const [wallet, h] = await Promise.all([getWallet(viewer.owner), history(viewer.owner)]);
  const idea = byId(h.last);
  return NextResponse.json({ signedIn: !viewer.guest, email: viewer.email, wallet, streak: h.streak, last: idea ? landed(idea) : null });
}
