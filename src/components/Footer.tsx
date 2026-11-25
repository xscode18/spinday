import Link from "next/link";

export default function Footer({ note }: { note?: string }) {
  return (
    <footer>
      <div className="in">
        <nav>
          <Link href="/">Spin</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
        {note ?? "Earnings shown are typical first-try ranges, not promises."}
        <p className="fine">
          SpinDay shares ideas for general information only. There&apos;s no guarantee you&apos;ll earn anything, and results vary.
          Nothing here is financial, legal or tax advice. You&apos;re responsible for following each platform&apos;s rules and age limits
          and the laws and tax rules where you live.
        </p>
      </div>
    </footer>
  );
}
