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
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon.svg",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-precomposed.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chase Nexus",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Chase Nexus",
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
    // Recover at most once per tab within a five-minute window.
    try {
      var key = 'nexus-chunk-recovery';
      var last = Number(sessionStorage.getItem(key) || 0);
      if (Date.now() - last < 300000) return;
      sessionStorage.setItem(key, String(Date.now()));
    } catch (error) { return; }
    var cleanup = 'caches' in window ? caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(key) {
        return key.indexOf('chase-nexus-') === 0;
      }).map(function(key) { return caches.delete(key); }));
    }) : Promise.resolve();
    Promise.race([cleanup.catch(function() {}), new Promise(function(resolve) {
      setTimeout(resolve, 1500);
    })]).then(function() { window.location.reload(); });
  }
});
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="chase-purple" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Chase Nexus" />
      </head>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <script src="/splash.js" defer />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
