"use client";

import { useState } from "react";
import { Check, Shield, Star, ShieldCheck, X, ExternalLink } from "lucide-react";
import type { BadgeCategory } from "@/lib/types";

interface ChaseBadgeProps {
  type?: BadgeCategory;
  size?: number;
  className?: string;
  interactive?: boolean;
}

const BADGE_CONFIG: Record<
  BadgeCategory,
  { label: string; ariaLabel: string; className: string; description: string }
> = {
  "chase-account": {
    label: "Chase Account Verified",
    ariaLabel: "Chase Account Verified · Official Chase Studios account registered through chase-studios.org",
    className: "badge-chase-account",
    description: "This purple checkmark indicates an authentic account registered through the official Chase Studios identity system. Server-side verified across Chase Nexus, Chase Mail, and Chase Studios titles.",
  },
  official: {
    label: "Official Product",
    ariaLabel: "Official Chase Studios Product",
    className: "badge-official",
    description: "Official Chase Studios release or product channel maintained directly by Chase Studios leadership.",
  },
  staff: {
    label: "Chase Studios Staff",
    ariaLabel: "Official Chase Studios Staff Member",
    className: "badge-staff",
    description: "Confirmed core developer, engineer, or team member at Chase Studios.",
  },
  moderator: {
    label: "Community Moderator",
    ariaLabel: "Verified Community Moderator",
    className: "badge-moderator",
    description: "Community guardian responsible for keeping Nexus spaces safe, constructive, and spam-free.",
  },
  "chase-plus": {
    label: "Chase+ Member",
    ariaLabel: "Chase+ Member · All-Access Ecosystem Subscriber",
    className: "badge-chase-plus",
    description: "All-Access subscriber enjoying unlimited 4K video uploads, custom Persona vault slots, and priority matchmaking.",
  },
  "identity-verified": {
    label: "Identity Verified",
    ariaLabel: "Identity Verified Account",
    className: "badge-identity-verified",
    description: "Independently verified creator profile identity.",
  },
};

export function ChaseBadge({
  type = "chase-account",
  size = 12,
  className = "",
  interactive = true,
}: ChaseBadgeProps) {
  const [open, setOpen] = useState(false);
  const config = BADGE_CONFIG[type] ?? BADGE_CONFIG["chase-account"];

  return (
    <>
      <span
        className={`chase-badge ${config.className} ${className}`.trim()}
        title={`${config.ariaLabel} (Click to inspect verification)`}
        aria-label={config.ariaLabel}
        role="button"
        tabIndex={0}
        onClick={(e) => {
          if (!interactive) return;
          e.stopPropagation();
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (!interactive) return;
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            setOpen(true);
          }
        }}
        style={{ cursor: interactive ? "pointer" : "default" }}
      >
        {type === "chase-plus" ? (
          <Star size={size} strokeWidth={2.8} aria-hidden="true" fill="currentColor" />
        ) : type === "moderator" ? (
          <Shield size={size} strokeWidth={2.6} aria-hidden="true" />
        ) : type === "staff" ? (
          <ShieldCheck size={size} strokeWidth={2.6} aria-hidden="true" />
        ) : (
          <Check size={size} strokeWidth={3} aria-hidden="true" />
        )}
      </span>

      {open && (
        <div
          className="badge-modal-backdrop"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: 16,
          }}
        >
          <div
            className="badge-modal-card card"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 420,
              width: "100%",
              background: "#140c24",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(168, 85, 247, 0.2)",
              borderRadius: 20,
              padding: 24,
              color: "#fff",
              position: "relative",
            }}
          >
            <button
              type="button"
              className="icon-btn"
              onClick={() => setOpen(false)}
              style={{ position: "absolute", top: 16, right: 16 }}
              aria-label="Close verification details"
            >
              <X size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background:
                    type === "chase-account"
                      ? "linear-gradient(135deg, #7c3aed, #9333ea)"
                      : type === "staff"
                      ? "linear-gradient(135deg, #eab308, #ca8a04)"
                      : "linear-gradient(135deg, #06b6d4, #0891b2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)",
                }}
              >
                {type === "chase-plus" ? (
                  <Star size={24} fill="#fff" strokeWidth={2} />
                ) : type === "moderator" ? (
                  <Shield size={24} strokeWidth={2.4} />
                ) : type === "staff" ? (
                  <ShieldCheck size={24} strokeWidth={2.4} />
                ) : (
                  <Check size={24} strokeWidth={3} />
                )}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>{config.label}</h3>
                <span style={{ fontSize: "0.8rem", color: "#a855f7", fontWeight: 600 }}>
                  CHASE STUDIOS AUTHORITATIVE VERIFICATION
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.92rem", lineHeight: 1.5, color: "#d5d0de", margin: "0 0 16px" }}>
              {config.description}
            </p>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: "0.82rem",
                color: "#b7b1c4",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span>Issuing Authority</span>
                <strong style={{ color: "#fff" }}>Chase Studios Cloud</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span>Anti-Spoofing</span>
                <strong style={{ color: "#4ade80" }}>Cryptographically Enforced</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Ecosystem Status</span>
                <strong style={{ color: "#c084fc" }}>Universal Purple Check</strong>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <a
                href="https://chase-studios.org"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              >
                Learn About Verification <ExternalLink size={14} />
              </a>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setOpen(false)}
                style={{ minWidth: 80 }}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
