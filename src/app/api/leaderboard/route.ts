import { NextResponse } from "next/server";
import { getViewer } from "@/lib/wallet";
import { boardSpins, boardStreaks, boardVideos, type Range } from "@/lib/ranks";

// ?board=videos|spins|streaks&range=week|all
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const range: Range = q.get("range") === "week" ? "week" : "all";
  const v = await getViewer();
  const me = v && !v.guest ? v.owner : null;
  const board = q.get("board");
  const rows = board === "spins" ? await boardSpins(range, me) : board === "streaks" ? await boardStreaks(me) : await boardVideos(range, me);
  return NextResponse.json({ rows });
}
