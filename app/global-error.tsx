"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Chase Nexus Global Error:", error);
  }, [error]);

  const handleHardReset = () => {
    try {
      if (typeof window !== "undefined") {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.getRegistrations().then((regs) => {
            for (const r of regs) r.unregister();
          });
        }
        if ("caches" in window) {
          caches.keys().then((keys) => {
            for (const k of keys) caches.delete(k);
          });
        }
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
      }
    } catch {
      window.location.reload();
    }
  };

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#090514",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: 24,
        }}
      >
        <div
          style={{
            maxWidth: 460,
            width: "100%",
            textAlign: "center",
            padding: 32,
            background: "#140b22",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            borderRadius: 20,
          }}
        >
          <h2 style={{ margin: "0 0 10px", color: "#a855f7" }}>Chase Nexus Recovery</h2>
          <p style={{ color: "#cbd5e1", fontSize: "0.95rem", marginBottom: 24 }}>
            An unexpected error occurred while loading Chase Nexus. Click below to reset your cache and reload cleanly.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button
              onClick={() => reset()}
              style={{
                padding: "10px 18px",
                background: "#7c3aed",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Try Again
            </button>
            <button
              onClick={handleHardReset}
              style={{
                padding: "10px 18px",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              Clear Cache & Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
