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

window.addEventListener('error', function(event) {
  if (event && event.message && (
    event.message.indexOf('Loading chunk') !== -1 ||
    event.message.indexOf('Failed to fetch dynamically imported module') !== -1
  )) {
    console.warn('Stale build chunk detected. Clearing cache and reloading...');
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(regs) {
        for (var i = 0; i < regs.length; i++) regs[i].unregister();
      });
    }
    if ('caches' in window) {
      caches.keys().then(function(keys) {
        for (var i = 0; i < keys.length; i++) caches.delete(keys[i]);
      });
    }
    window.location.reload();
  }
});
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="chase-purple" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <script src="/splash.js" defer />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
