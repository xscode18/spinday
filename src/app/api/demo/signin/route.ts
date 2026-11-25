import { NextResponse } from "next/server";
import { DEMO } from "@/lib/config";
import { demoSignIn, mergeGuestInto } from "@/lib/wallet";

export async function POST(req: Request) {
  if (!DEMO) return NextResponse.json({ error: "off" }, { status: 404 });
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  const e = (email || "you@demo").slice(0, 120);
  await demoSignIn(e);
  await mergeGuestInto(`u:demo:${encodeURIComponent(e)}`);
  return NextResponse.json({ ok: true });
}
