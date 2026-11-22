import type { Metadata } from "next";
import { SavedScreen } from "@/components/screens/Screens";

export const metadata: Metadata = { title: "Saved content" };

export default function SavedPage() {
  return <SavedScreen />;
}
