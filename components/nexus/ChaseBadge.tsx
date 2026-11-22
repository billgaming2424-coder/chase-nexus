"use client";

import { Check } from "lucide-react";

interface ChaseBadgeProps {
  type?: "chase-account" | "staff" | "official";
  size?: number;
  className?: string;
}

export function ChaseBadge({ type = "chase-account", size = 13, className = "" }: ChaseBadgeProps) {
  const isOfficial = type === "official" || type === "staff";
  const label = isOfficial
    ? "Official Chase Studios Badge"
    : "Chase Account Verified · Registered through chase-studios.org";

  return (
    <span
      className={`chase-badge ${isOfficial ? "is-official" : ""} ${className}`.trim()}
      title={label}
      aria-label={label}
      role="img"
    >
      <Check size={size} strokeWidth={3} aria-hidden="true" />
    </span>
  );
}
