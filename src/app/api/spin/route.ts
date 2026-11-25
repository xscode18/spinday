import { NextResponse } from "next/server";
import { getViewer, history, spendSpin } from "@/lib/wallet";
import { landed, parseFilters, pick } from "@/lib/spin";

// The server picks the idea and spends the spin. The free spin is tied to the account (or, without
// an account, to this browser's cookie AND its network), so reloading, clearing storage or a private
// window doesn't give another one.
export async function POST(req: Request) {
  const viewer = (await getViewer(true))!;
  const filters = parseFilters(await req.json().catch(() => ({})));
  const before = await history(viewer.owner);
  const idea = pick(filters, before.last);
  if (!idea) return NextResponse.json({ error: "nomatch" }, { status: 409 });

  const result = await spendSpin(viewer, idea.id, filters);
  if (result.kind === "ip_limit") return NextResponse.json({ error: "network", wallet: result.wallet }, { status: 402 });
  if (result.kind === "none") return NextResponse.json({ error: "nospins", wallet: result.wallet }, { status: 402 });
  const after = await history(viewer.owner);
  return NextResponse.json({ idea: landed(idea), kind: result.kind, wallet: result.wallet, streak: after.streak });
}
