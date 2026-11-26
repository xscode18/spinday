import { NextResponse } from "next/server";
import { getViewer } from "@/lib/wallet";
import { finishUpload } from "@/lib/ranks";

export async function POST(req: Request) {
  const v = await getViewer();
  if (!v || v.guest) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  const ok = await finishUpload(v.owner, String(id ?? ""));
  return ok ? NextResponse.json({ ok }) : NextResponse.json({ error: "The upload didn't finish. Try again." }, { status: 400 });
}
