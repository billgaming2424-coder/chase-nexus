import type { Metadata } from "next";
import { AudioStagesScreen } from "@/components/screens/Screens";

export const metadata: Metadata = {
  title: "Nexus Audio Pods · Live Stages",
  description: "Live drop-in audio stages for Chase Studios developer discussions, gaming raid tactics, and music listening parties.",
};

export default function AudioPage() {
  return <AudioStagesScreen />;
}
