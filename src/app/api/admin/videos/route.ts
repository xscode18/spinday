import { NextResponse } from "next/server";
import { getViewer } from "@/lib/wallet";
import { isAdmin, pendingVideos, review } from "@/lib/ranks";

// Videos waiting for review. Only emails in ADMIN_EMAILS can see or approve them.
export async function GET() {
  if (!isAdmin(await getViewer())) return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  return NextResponse.json({ videos: await pendingVideos() });
}

export async function POST(req: Request) {
  if (!isAdmin(await getViewer())) return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  const { id, approve } = (await req.json().catch(() => ({}))) as { id?: string; approve?: boolean };
  const ok = await review(String(id ?? ""), approve === true);
  return ok ? NextResponse.json({ ok }) : NextResponse.json({ error: "Already reviewed." }, { status: 409 });
}
