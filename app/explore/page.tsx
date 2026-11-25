import type { Metadata } from "next";
export const metadata: Metadata = { title: "Explore" };
export default function ExplorePage() {
return <section className="page"><h1>Explore Nexus</h1><p className="hint">Discover real people and communities.</p><section className="card" style={{padding:24}}><h2>People and creators</h2><p>Account discovery is in development. No sample profiles are displayed.</p></section><section className="card" style={{padding:24}}><h2>Trending topics</h2><p>Real activity rankings are not available yet.</p></section></section>;
}
