import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Calls" };
export default function Page() {
  return <section className="page"><header className="page-head"><h1>Calls</h1></header><div className="card" style={{padding:24}}><h2>Voice and video calls are in development</h2><p>Real calling is not available in this preview. Simulated participants have been disabled.</p><Link href="/" className="btn btn-secondary">Back to Home</Link></div></section>;
}
