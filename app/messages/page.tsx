import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Messages" };
export default function Page() {
  return <section className="page"><header className="page-head"><h1>Messages</h1></header><div className="card" style={{padding:24}}><h2>Private messaging are in development</h2><p>Real messaging is not available in this preview. Simulated conversations have been disabled.</p><Link href="/" className="btn btn-secondary">Back to Home</Link></div></section>;
}
