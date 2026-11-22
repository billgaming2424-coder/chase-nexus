import type { Metadata } from "next";
import { VideoScreen } from "@/components/screens/Screens";

export const metadata: Metadata = { title: "Nexus Video" };

export default function VideoPage() {
  return <VideoScreen />;
}
