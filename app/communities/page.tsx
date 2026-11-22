import type { Metadata } from "next";
import { CommunitiesScreen } from "@/components/screens/Screens";

export const metadata: Metadata = { title: "Communities" };

export default function CommunitiesPage() {
  return <CommunitiesScreen />;
}
