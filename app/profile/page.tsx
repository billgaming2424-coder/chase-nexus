import type { Metadata } from "next";
import { ProfileScreen } from "@/components/screens/Screens";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return <ProfileScreen />;
}
