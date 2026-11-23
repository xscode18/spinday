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
      </div>
    </footer>
  );
}
