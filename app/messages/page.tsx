import type { Metadata } from "next";
import { MessagesScreen } from "@/components/screens/Screens";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return <MessagesScreen />;
}
