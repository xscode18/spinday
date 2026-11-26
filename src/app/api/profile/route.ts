import { NextResponse } from "next/server";
import { getViewer } from "@/lib/wallet";
import { getNickname, isAdmin, myStats, setNickname } from "@/lib/ranks";

// Your leaderboard name and rank.
export async function GET() {
  const v = await getViewer();
  if (!v || v.guest) return NextResponse.json({ signedIn: false });
  const [nickname, stats] = await Promise.all([getNickname(v.owner), myStats(v.owner)]);
  return NextResponse.json({ signedIn: true, nickname, admin: isAdmin(v), ...stats });
}

export async function POST(req: Request) {
  const v = await getViewer();
  if (!v || v.guest) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const { nickname } = (await req.json().catch(() => ({}))) as { nickname?: string };
  const r = await setNickname(v, nickname);
  return r.ok ? NextResponse.json({ nickname: r.nickname }) : NextResponse.json({ error: r.error }, { status: 400 });
}
