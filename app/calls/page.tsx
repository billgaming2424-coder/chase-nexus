import type { Metadata } from "next";
import { CallsScreen } from "@/components/screens/Screens";

export const metadata: Metadata = { title: "Calls" };

export default function CallsPage() {
  return <CallsScreen />;
}
