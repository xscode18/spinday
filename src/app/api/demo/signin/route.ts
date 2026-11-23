import { NextResponse } from "next/server";
import { DEMO } from "@/lib/config";
import { demoSignIn } from "@/lib/wallet";

export async function POST(req: Request) {
  if (!DEMO || (process.env.NODE_ENV === "production" && process.env.ALLOW_DEMO !== "1")) {
    return NextResponse.json({ error: "off" }, { status: 404 });
  }
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  await demoSignIn((email || "you@demo").slice(0, 120));
  return NextResponse.json({ ok: true });
}
