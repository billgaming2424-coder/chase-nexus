"use client";

import { Check, Shield, Star, ShieldCheck } from "lucide-react";
import type { BadgeCategory } from "@/lib/types";

interface ChaseBadgeProps {
  type?: BadgeCategory;
  size?: number;
  className?: string;
}

const BADGE_CONFIG: Record<
  BadgeCategory,
  { label: string; ariaLabel: string; className: string }
> = {
  "chase-account": {
    label: "Chase Account Verified",
    ariaLabel: "Chase Account Verified · Official Chase Studios account registered through chase-studios.org",
    className: "badge-chase-account",
  },
  official: {
    label: "Official Product",
    ariaLabel: "Official Chase Studios Product",
    className: "badge-official",
  },
  staff: {
    label: "Chase Studios Staff",
    ariaLabel: "Official Chase Studios Staff Member",
    className: "badge-staff",
  },
  moderator: {
    label: "Community Moderator",
    ariaLabel: "Verified Community Moderator",
    className: "badge-moderator",
  },
  "chase-plus": {
    label: "Chase+ Member",
    ariaLabel: "Chase+ Member · All-Access Ecosystem Subscriber",
    className: "badge-chase-plus",
  },
  "identity-verified": {
    label: "Identity Verified",
    ariaLabel: "Identity Verified Account",
    className: "badge-identity-verified",
  },
};

export function ChaseBadge({
  type = "chase-account",
  size = 12,
  className = "",
}: ChaseBadgeProps) {
  const config = BADGE_CONFIG[type] ?? BADGE_CONFIG["chase-account"];

  return (
    <span
      className={`chase-badge ${config.className} ${className}`.trim()}
      title={config.ariaLabel}
      aria-label={config.ariaLabel}
      role="img"
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
  );
}
