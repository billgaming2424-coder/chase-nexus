import type { Metadata } from "next";
import { ArcadeScreen } from "@/components/screens/Screens";

export const metadata: Metadata = {
  title: "Nexus Arcade Realm · Mini-Games",
  description: "Play Unimon Arena battle simulator, DEADEYE quick-draw reaction gallery, and Persona runway fashion show to earn Nexus Gems.",
};

export default function ArcadePage() {
  return <ArcadeScreen />;
}
