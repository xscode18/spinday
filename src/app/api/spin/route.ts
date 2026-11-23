import { NextResponse } from "next/server";
import { getViewer, lastSpinToday, spendSpin } from "@/lib/wallet";
import { landed, parseFilters, pick } from "@/lib/spin";


// The server picks the idea and spends the spin, so reloading, clearing storage or
// editing the page can't produce extra free spins.
export async function POST(req: Request) {
  const viewer = await getViewer();
  if (!viewer) return NextResponse.json({ error: "signin" }, { status: 401 });

  const filters = parseFilters(await req.json().catch(() => ({})));
  const idea = pick(filters, await lastSpinToday(viewer.id));
  if (!idea) return NextResponse.json({ error: "nomatch" }, { status: 409 });

  const result = await spendSpin(viewer.id, idea.id, filters);
  if (result.kind === "none") return NextResponse.json({ error: "nospins", wallet: result.wallet }, { status: 402 });
  return NextResponse.json({ idea: landed(idea), kind: result.kind, wallet: result.wallet });
}
