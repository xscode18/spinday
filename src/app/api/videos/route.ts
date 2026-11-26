import { NextResponse } from "next/server";
import { getViewer } from "@/lib/wallet";
import { feed, startUpload } from "@/lib/ranks";

// Approved proof videos, newest first.
export async function GET() {
  const v = await getViewer();
  return NextResponse.json({ videos: await feed(v && !v.guest ? v.owner : null) });
}

// Starts an upload: checks the rules and hands back a one-time upload link for the file.
export async function POST(req: Request) {
  const v = await getViewer();
  if (!v || v.guest) return NextResponse.json({ error: "Sign in to post a video." }, { status: 401 });
  const r = await startUpload(v, await req.json().catch(() => ({})));
  return r.ok ? NextResponse.json(r) : NextResponse.json({ error: r.error }, { status: r.status });
}
