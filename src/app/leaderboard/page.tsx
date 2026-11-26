import type { Metadata } from "next";
import { Suspense } from "react";
import Leaderboard from "@/components/Leaderboard";
import { DEMO, SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/config";
import { IDEAS } from "@/lib/ideas";

export const metadata: Metadata = {
  title: "Leaderboard · SpinDay",
  description: "Post proof you did your spin, get likes, rank up. Plus the top spinners and longest streaks.",
};

export default function Page() {
  return (
    <Suspense>
    <Leaderboard
      demo={DEMO}
      ideas={IDEAS.map((i) => ({ id: i.id, name: i.name }))}
      supabaseUrl={DEMO ? "" : SUPABASE_URL}
      supabaseAnonKey={DEMO ? "" : SUPABASE_ANON_KEY}
    />
    </Suspense>
  );
}
