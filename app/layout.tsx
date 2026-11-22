import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#140b22",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Chase Nexus",
    template: "%s · Chase Nexus",
  },
  description: "Connect. Create. Discover. Chase Nexus is the social platform from Chase Studios.",
  applicationName: "Chase Nexus",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chase Nexus",
  },
};

const themeBoot = `
try {
  var saved = JSON.parse(localStorage.getItem("chase-nexus-alpha") || "null");
  if (saved) {
    if (saved.theme) document.documentElement.dataset.theme = saved.theme;
    if (saved.accent && /^#[0-9a-fA-F]{6}$/.test(saved.accent)) {
      document.documentElement.style.setProperty("--accent", saved.accent);
    }
    if (saved.reducedMotion) document.documentElement.classList.add("reduce-motion");
  }
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
    navigator.serviceWorker.register('/sw.js').catch(function(){});
  }
} catch (error) {}
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="chase-purple">
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
