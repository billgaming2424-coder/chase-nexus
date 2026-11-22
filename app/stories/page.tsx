import type { Metadata } from "next";
import { StoriesScreen } from "@/components/screens/Screens";

export const metadata: Metadata = { title: "Stories" };

export default function StoriesPage() {
  return <StoriesScreen />;
}
