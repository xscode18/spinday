import Footer from "@/components/Footer";

export const metadata = { title: "Privacy · SpinDay" };

export default function Privacy() {
  return (
    <>
      <main className="in legal">
        <h1>Privacy</h1>
        <p>Last updated: November 2026</p>
        <h2>What we keep</h2>
        <ul>
          <li>Your email address (and your name and picture if you sign in with Google), so you can sign in.</li>
          <li>When you used your free spin, how many paid spins you have, and which ideas you landed on.</li>
          <li>A record of each purchase. Card details go straight to Stripe; we never see or store them.</li>
        </ul>
        <h2>What we don&apos;t do</h2>
        <p>We don&apos;t sell your data, and we don&apos;t send you marketing email unless you ask for it.</p>
        <h2>Who handles it</h2>
        <p>Supabase stores accounts and spins. Stripe handles payments. Vercel hosts the site. Google handles Google sign-in.</p>
        <h2>Your plan progress</h2>
        <p>The steps you tick off are saved only in your own browser.</p>
        <h2>Deleting your account</h2>
        <p>Email us from the address on your account and we&apos;ll delete it and everything linked to it.</p>
      </main>
      <Footer />
    </>
  );
}
