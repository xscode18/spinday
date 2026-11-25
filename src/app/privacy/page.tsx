import Footer from "@/components/Footer";

export const metadata = { title: "Privacy · SpinDay" };

export default function Privacy() {
  return (
    <>
      <main className="in legal">
        <h1>Privacy</h1>
        <p>Last updated: November 2026. This page explains what SpinDay keeps about you and why.</p>

        <h2>If you spin without an account</h2>
        <ul>
          <li>A random id saved in a cookie on your browser, so we know you&apos;ve used today&apos;s free spin and can keep your streak and paid spins.</li>
          <li>A scrambled (salted and hashed) version of your network address, used only to stop the free spin being claimed over and over from the same network. We don&apos;t store the address itself.</li>
          <li>Which ideas you landed on and when.</li>
        </ul>

        <h2>If you add your email or sign in</h2>
        <ul>
          <li>Your email address, plus your name and picture if you sign in with Google, so you can sign in and keep your streak.</li>
          <li>Your free-spin date, paid spins, streak and the ideas you landed on. Anything from before you signed in is moved onto your account.</li>
        </ul>

        <h2>Payments</h2>
        <p>Card, Apple Pay and Google Pay details go straight to Stripe. We never see or store them. We keep a record of each purchase (pack, amount and date).</p>

        <h2>Kept only in your browser</h2>
        <p>The steps you tick off in a plan are saved in your own browser, not on our servers.</p>

        <h2>Cookies</h2>
        <p>We only use cookies the site needs to work: your guest id and your sign-in session. No advertising or tracking cookies.</p>

        <h2>What we don&apos;t do</h2>
        <p>We don&apos;t sell or rent your data, and we don&apos;t send you marketing email unless you ask for it.</p>

        <h2>Who handles it</h2>
        <p>Supabase stores accounts and spins, Stripe handles payments, Vercel hosts the site and Google handles Google sign-in. These services may store data outside your country, including in the United States.</p>

        <h2>Your choices</h2>
        <p>You can clear your browser cookies at any time. To see, correct or delete what we hold about you, email us from the address on your account and we&apos;ll do it, including everything linked to your account.</p>
      </main>
      <Footer />
    </>
  );
}
