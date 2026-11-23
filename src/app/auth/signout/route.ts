import { NextResponse } from "next/server";
import { DEMO } from "@/lib/config";
import { supabaseServer } from "@/lib/supabase/server";
import { demoSignOut } from "@/lib/wallet";

export async function POST() {
  if (DEMO) await demoSignOut();
  else await (await supabaseServer()).auth.signOut();
  return NextResponse.json({ ok: true });
}
