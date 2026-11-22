import type { Metadata } from "next";
import { DiscussionsScreen } from "@/components/screens/Screens";

export const metadata: Metadata = { title: "Discussions" };

export default function DiscussionsPage() {
  return <DiscussionsScreen />;
}
