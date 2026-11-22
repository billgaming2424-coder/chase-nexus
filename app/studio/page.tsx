import type { Metadata } from "next";
import { StudioScreen } from "@/components/screens/Screens";

export const metadata: Metadata = {
  title: "Creator Studio & Analytics",
  description: "Creator monetization dashboard, Gem tipping analytics, game pass royalties, and direct deposit payouts.",
};

export default function StudioPage() {
  return <StudioScreen />;
}
