import { Suspense } from "react";
import { HomeFeed } from "@/components/feed/HomeFeed";

export default function HomePage() {
  return (
    <Suspense fallback={<p className="hint">Loading the preview feed…</p>}>
      <HomeFeed />
    </Suspense>
  );
}
