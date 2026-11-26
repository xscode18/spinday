import { DEMO } from "@/lib/config";
import { demoFile } from "@/lib/ranks";

// Preview mode only: plays a video kept in memory. (Live videos are served by Supabase Storage.)
export async function GET(req: Request) {
  const f = DEMO ? demoFile(new URL(req.url).searchParams.get("id") ?? "") : null;
  if (!f) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(f.buf), { headers: { "content-type": f.type, "cache-control": "private, max-age=3600" } });
}
