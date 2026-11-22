"use client";

import { useState } from "react";
import {
  ExternalLink,
  Mail,
  Share2,
  Sparkles,
  Gamepad2,
  Crosshair,
  ShieldCheck,
  Grid,
  X,
  Check,
} from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import { sounds } from "@/lib/sounds";

interface ChaseOsLauncherProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChaseOsLauncher({ isOpen, onClose }: ChaseOsLauncherProps) {
  const { currentUser, userProfile } = useNexus();

  if (!isOpen) return null;

  const APPS = [
    {
      id: "nexus",
      name: "Chase Nexus",
      subtitle: "Social, Avatars & Video",
      url: "https://nexus.chase-studios.org",
      current: true,
      badge: "Active",
      icon: "🌌",
    },
    {
      id: "mail",
      name: "Chase Mail",
      subtitle: "Fast, Secure Studio Email",
      url: "https://mail.chase-studios.org",
      current: false,
      badge: "Beta Live",
      icon: "✉️",
    },
    {
      id: "unimon",
      name: "Unimon Legends",
      subtitle: "Monster Battler RPG",
      url: "https://nexus.chase-studios.org/arcade",
      current: false,
      badge: "Playable",
      icon: "🦊",
    },
    {
      id: "deadeye",
      name: "DEADEYE Survival",
      subtitle: "Unreal Engine 5 Shooter",
      url: "https://nexus.chase-studios.org/arcade",
      current: false,
      badge: "Alpha Demo",
      icon: "🎯",
    },
    {
      id: "portal",
      name: "Chase Studios Portal",
      subtitle: "Cloud ID & Game Passes",
      url: "https://chase-studios.org",
      current: false,
      badge: "Ecosystem Hub",
      icon: "🛡️",
    },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 100 }}>
      <div
        className="dialog card chase-os-modal"
        role="dialog"
        aria-label="Chase Studios Universal App Switcher"
        style={{
          maxWidth: 520,
          background: "radial-gradient(circle at 50% 20%, #1c0e32 0%, #080410 100%)",
          border: "1px solid rgba(168, 85, 247, 0.4)",
          borderRadius: 22,
          padding: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.85)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="/chase-studios-logo.svg"
              alt="Chase Studios"
              width={30}
              height={30}
              style={{ objectFit: "contain", filter: "drop-shadow(0 0 10px rgba(168,85,247,0.7))" }}
            />
            <div>
              <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Chase OS App Switcher</h3>
              <p className="hint" style={{ margin: 0 }}>Every genre. No limits. All in one ecosystem.</p>
            </div>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close switcher">
            <X size={18} />
          </button>
        </div>

        {/* User Identity Info */}
        <div style={{ background: "rgba(255, 255, 255, 0.04)", borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="status-dot live" />
            <span style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 600 }}>
              {currentUser ? currentUser.email : "Universal Guest Profile"}
            </span>
          </div>
          <span className="pill" style={{ fontSize: "0.72rem", background: "rgba(168, 85, 247, 0.2)", color: "#c084fc" }}>
            Single Sign-On Active
          </span>
        </div>

        {/* App Tiles Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {APPS.map((app) => (
            <a
              key={app.id}
              href={app.url}
              target={app.current ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={() => {
                sounds.playPop();
                if (app.current) onClose();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                borderRadius: 14,
                background: app.current ? "rgba(168, 85, 247, 0.18)" : "rgba(255, 255, 255, 0.03)",
                border: app.current ? "1px solid #a855f7" : "1px solid rgba(255, 255, 255, 0.08)",
                textDecoration: "none",
                color: "#fff",
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: "1.6rem" }}>{app.icon}</span>
                <div>
                  <strong style={{ fontSize: "0.95rem", display: "block" }}>{app.name}</strong>
                  <small style={{ color: "var(--muted)", fontSize: "0.78rem" }}>{app.subtitle}</small>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="pill" style={{ fontSize: "0.72rem" }}>{app.badge}</span>
                {!app.current && <ExternalLink size={14} style={{ color: "var(--muted)" }} />}
                {app.current && <Check size={16} className="purple-icon" />}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
