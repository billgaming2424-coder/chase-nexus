"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Chase Nexus caught runtime error:", error);
  }, [error]);

  const handleHardReset = async () => {
    try {
      if ("caches" in window) {
        const cleanup = caches.keys().then((keys) =>
          Promise.all(keys.filter((key) => key.startsWith("chase-nexus-")).map((key) => caches.delete(key)))
        );
        await Promise.race([cleanup, new Promise((resolve) => setTimeout(resolve, 1500))]);
      }
    } catch {
      // Reload even if cache storage is unavailable.
    }
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
          padding: "36px 24px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(239, 68, 68, 0.15)",
            color: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <AlertTriangle size={28} />
        </div>
        <h2 style={{ margin: "0 0 8px", fontSize: "1.3rem" }}>Something went wrong</h2>
        <p className="hint" style={{ margin: "0 0 20px" }}>
          Chase Nexus encountered an unexpected client error. You can try refreshing or resetting your local cache.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => reset()}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <RefreshCw size={15} />
            <span>Try Again</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleHardReset}
          >
            Clear Cache & Reload
          </button>
          <Link href="/" className="btn btn-ghost">
            <Home size={15} />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
