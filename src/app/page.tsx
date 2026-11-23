import SpinApp from "@/components/SpinApp";
import { DEMO, PAYMENTS_LIVE, SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/config";
import { REEL_NAMES } from "@/lib/spin";

export default function Home() {
  return (
    <SpinApp
      names={REEL_NAMES}
      demo={DEMO}
      paymentsLive={PAYMENTS_LIVE}
      supabaseUrl={DEMO ? "" : SUPABASE_URL}
      supabaseAnonKey={DEMO ? "" : SUPABASE_ANON_KEY}
    />
  );
}
