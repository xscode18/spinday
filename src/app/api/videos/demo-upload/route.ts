import { NextResponse } from "next/server";
import { DEMO } from "@/lib/config";
import { getViewer } from "@/lib/wallet";
import { demoSaveFile, MAX_VIDEO_BYTES, VIDEO_TYPES } from "@/lib/ranks";

// Preview mode only: the video comes to the server and is kept in memory.
export async function POST(req: Request) {
  if (!DEMO) return NextResponse.json({ error: "off" }, { status: 404 });
  const v = await getViewer();
  if (!v || v.guest) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file");
  const id = String(form.get("id") ?? "");
  if (!(file instanceof File) || !VIDEO_TYPES[file.type] || file.size > MAX_VIDEO_BYTES) return NextResponse.json({ error: "Bad file." }, { status: 400 });
  const ok = demoSaveFile(v.owner, id, file.type, Buffer.from(await file.arrayBuffer()));
  return ok ? NextResponse.json({ ok }) : NextResponse.json({ error: "Unknown upload." }, { status: 400 });
}
