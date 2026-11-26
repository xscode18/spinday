import type { Metadata } from "next";
import AdminVideos from "@/components/AdminVideos";

export const metadata: Metadata = { title: "Review videos · SpinDay", robots: { index: false } };

export default function Page() {
  return <AdminVideos />;
}
