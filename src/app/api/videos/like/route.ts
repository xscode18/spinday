import { NextResponse } from "next/server";
import { getViewer } from "@/lib/wallet";
import { toggleLike } from "@/lib/ranks";

export async function POST(req: Request) {
  const v = await getViewer();
  if (!v || v.guest) return NextResponse.json({ error: "Sign in to like videos." }, { status: 401 });
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  const r = await toggleLike(v, String(id ?? ""));
  return r.ok ? NextResponse.json(r) : NextResponse.json({ error: r.error }, { status: r.status });
}
