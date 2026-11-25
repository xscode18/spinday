import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { mergeGuestInto } from "@/lib/wallet";

// Google and the email link both come back here with a one-time code.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next");
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
  if (code) {
    const supabase = await supabaseServer();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      // Anything this browser did before signing in (free spin, streak, bought spins) moves to the account.
      await mergeGuestInto(`u:${data.user.id}`).catch(() => {});
      return NextResponse.redirect(new URL(safeNext + (safeNext.includes("?") ? "&" : "?") + "signin=ok", url.origin));
    }
  }
  return NextResponse.redirect(new URL("/?signin=failed", url.origin));
}
