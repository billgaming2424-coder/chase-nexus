import type { Metadata } from "next";
import { ExploreScreen } from "@/components/screens/Screens";

export const metadata: Metadata = { title: "Explore" };

export default function ExplorePage() {
  return <ExploreScreen />;
}
