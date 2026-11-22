import type { Metadata } from "next";
import { MarketplaceScreen } from "@/components/screens/Screens";

export const metadata: Metadata = {
  title: "Marketplace & Creator Economy",
  description: "Official Chase Studios Digital Marketplace. Unlock game season passes, exclusive Bitmoji gear, and tip creators with Nexus Gems.",
};

export default function MarketplacePage() {
  return <MarketplaceScreen />;
}
