import { NextResponse } from "next/server";
import { getViewer, getWallet, lastSpinToday } from "@/lib/wallet";
import { byId, landed } from "@/lib/spin";


export async function GET() {
  const viewer = await getViewer();
  if (!viewer) return NextResponse.json({ signedIn: false });
  const [wallet, last] = await Promise.all([getWallet(viewer.id), lastSpinToday(viewer.id)]);
  const idea = byId(last);
  return NextResponse.json({ signedIn: true, email: viewer.email, wallet, last: idea ? landed(idea) : null });
}
