"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, Sparkles, X, ChevronRight, Gamepad2, Gift, ShieldCheck, Coins } from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
import {
  COMMUNITIES,
  CONNECTIONS,
  FRIEND_EXAMPLES,
  SUGGESTED,
  TRENDING,
  VIDEOS,
} from "@/lib/demo-data";
import type { ThemeName } from "@/lib/types";

const THEME_SHORTCUTS: { id: ThemeName; label: string }[] = [
  { id: "chase-purple", label: "Chase Purple" },
  { id: "midnight", label: "Midnight" },
  { id: "light", label: "Light" },
];

export function RightRail() {
  const { theme, setTheme, walletBalance, tipCreator } = useNexus();
  const [account, setAccount] = useState<string | null>(null);
  const [showChasePlusModal, setShowChasePlusModal] = useState(false);

  return (
    <aside className="rail" aria-label="Discovery">
      {/* 1. Trending Topics */}
      <section className="rail-card">
        <h2>Trending</h2>
        <ul className="plain-list">
          {TRENDING.map((topic) => (
            <li key={topic.tag}>
              <Link href={`/?tag=${topic.tag}`}>
                <strong>{topic.label}</strong>
                <small>{topic.detail}</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Suggested Creators / Users */}
      <section className="rail-card">
        <h2>Suggested creators</h2>
        <ul className="plain-list">
          {SUGGESTED.map((creator) => (
            <li key={creator.handle}>
              <span>
                <span className="author-name">
                  <strong>{creator.name}</strong>
                  {creator.verified ? <ChaseBadge type={creator.badgeType} /> : null}
                </span>
                <small>
                  {creator.handle} · {creator.note}
                </small>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Creator Tip Jar (Concept Mockup Match) */}
      <section
        className="rail-card tip-jar-card"
        style={{
          background: "radial-gradient(circle at top, rgba(124, 58, 237, 0.25) 0%, rgba(14, 10, 24, 0.8) 70%)",
          border: "1px solid rgba(168, 85, 247, 0.35)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(124, 58, 237, 0.15)",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h2 style={{ fontSize: "1.05rem", margin: 0 }}>Creator Tip Jar</h2>
          <span className="pill" style={{ fontSize: "0.72rem" }}>
            {walletBalance.toLocaleString()} 💎
          </span>
        </div>
        <div style={{ padding: "10px 0 6px", display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.5rem", filter: "drop-shadow(0 0 8px #a855f7)", animation: "pulseBubble 2s infinite alternate" }}>💎</span>
          <span style={{ fontSize: "2.1rem", filter: "drop-shadow(0 0 14px #c084fc)", animation: "pulseBubble 1.8s infinite alternate 0.2s" }}>💎</span>
          <span style={{ fontSize: "1.5rem", filter: "drop-shadow(0 0 8px #a855f7)", animation: "pulseBubble 2.2s infinite alternate 0.4s" }}>💎</span>
        </div>
        <p className="hint" style={{ fontSize: "0.78rem", margin: "0 0 10px" }}>
          Support studio developers and community creators directly with Nexus Gems.
        </p>
        <div style={{ display: "flex", gap: 6 }}>
          {[100, 250, 500].map((amt) => (
            <button
              key={amt}
              type="button"
              className="btn btn-primary btn-sm"
              style={{ flex: 1, fontSize: "0.75rem", padding: "6px 2px", borderRadius: 10 }}
              onClick={() => {
                if (walletBalance < amt) {
                  alert("Insufficient gems! Top up in the Marketplace.");
                  return;
                }
                tipCreator("Chase Studios Creators", amt);
                alert(`Tipped ${amt} Gems to creators! Thank you for supporting Chase Studios! 🎉`);
              }}
            >
              +{amt} 💎
            </button>
          ))}
        </div>
      </section>

      {/* 3. Chase+ Membership Preview Card */}
      <section className="rail-card chase-plus-card">
        <div className="chase-plus-header">
          <span className="chase-plus-badge">
            <Sparkles size={13} aria-hidden="true" /> CHASE+
          </span>
          <span className="pill">Preview</span>
        </div>
        <h3>Chase+ Membership</h3>
        <p className="hint">
          Chase Studios optional membership program. Standard Chase Nexus social features remain 100% free.
        </p>
        <ul className="chase-plus-perks">
          <li>
            <Gamepad2 size={15} aria-hidden="true" />
            <span>Game Library Access & Battle Passes</span>
          </li>
          <li>
            <Gift size={15} aria-hidden="true" />
            <span>Cosmetics, Avatar Gear & Redeem Codes</span>
          </li>
          <li>
            <ShieldCheck size={15} aria-hidden="true" />
            <span>Exclusive member badge & profile decorations</span>
          </li>
        </ul>
        <button
          type="button"
          className="btn btn-ghost chase-plus-btn"
          onClick={() => setShowChasePlusModal(true)}
        >
          <span>Explore Chase+ Roadmap</span>
          <ChevronRight size={15} aria-hidden="true" />
        </button>
      </section>

      {/* 4. Nexus Video Previews */}
      <section className="rail-card">
        <h2>Nexus Video</h2>
        <ul className="video-list">
          {VIDEOS.slice(0, 3).map((video) => (
            <li key={video.id}>
              <Link href="/video">
                <span className="thumb" data-tone={video.tone} />
                <span>
                  <strong>{video.title}</strong>
                  <small>{video.channel}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Recommended Communities */}
      <section className="rail-card">
        <h2>Communities</h2>
        <ul className="plain-list">
          {COMMUNITIES.map((community) => (
            <li key={community.id}>
              <Link href="/communities">
                <strong>{community.name}</strong>
                <small>Preview community</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Active Friends & Online Presence (Mockup Match) */}
      <section className="rail-card active-friends-card">
        <div className="card-head-row">
          <h2>Active Friends</h2>
          <Link href="/messages" className="text-link small-link">
            See all
          </Link>
        </div>
        <ul className="friend-streak-list" style={{ marginTop: 10 }}>
          {FRIEND_EXAMPLES.map((friend) => (
            <li
              key={friend.name}
              className="friend-streak-item"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  className="avatar avatar-sm"
                  style={{
                    background: "rgba(124, 58, 237, 0.25)",
                    border: "1px solid rgba(168, 85, 247, 0.35)",
                    width: 32,
                    height: 32,
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  {friend.name.slice(0, 1)}
                </span>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                    {friend.name}
                    {friend.verified ? <ChaseBadge size={11} /> : null}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.72rem", color: "#4ade80" }}>
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#22c55e",
                        boxShadow: "0 0 8px #22c55e",
                        display: "inline-block",
                      }}
                    />
                    <span>Online</span>
                  </div>
                </div>
              </div>

              {friend.streak > 0 ? (
                <span className="streak-pill" title={`${friend.streak}-day streak`}>
                  <Flame size={12} className="flame-icon" aria-hidden="true" />
                  <strong>{friend.streak}</strong>
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Connected External Accounts */}
      <section className="rail-card">
        <h2>Connected accounts</h2>
        <ul className="plain-list">
          {CONNECTIONS.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => setAccount(item.name)}>
                <strong>{item.name}</strong>
                <small>{item.detail}</small>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Personalization */}
      <section className="rail-card">
        <h2>Personalization</h2>
        <div className="shortcut-row">
          {THEME_SHORTCUTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={theme === item.id ? "chip is-active" : "chip"}
              aria-pressed={theme === item.id}
              onClick={() => setTheme(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <Link className="text-link" href="/settings">
          More appearance settings
        </Link>
      </section>

      {/* Account connection modal */}
      {account ? (
        <div className="rail-note" role="dialog" aria-label={`${account} connection`}>
          <button type="button" className="icon-btn" aria-label="Close" onClick={() => setAccount(null)}>
            <X size={16} />
          </button>
          <p>
            {account} linking is not available in Alpha 0.1. Chase Nexus works without an external account, and no password is requested.
          </p>
        </div>
      ) : null}

      {/* Chase+ Roadmap Modal */}
      {showChasePlusModal ? (
        <div className="modal-backdrop" onClick={() => setShowChasePlusModal(false)}>
          <div
            className="dialog card modal-body"
            role="dialog"
            aria-label="Chase+ Membership Architecture"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="dialog-head">
              <div className="author-name">
                <span className="chase-plus-badge">
                  <Sparkles size={14} aria-hidden="true" /> CHASE+
                </span>
                <h3>Chase+ Membership Overview</h3>
              </div>
              <button
                type="button"
                className="icon-btn"
                aria-label="Close modal"
                onClick={() => setShowChasePlusModal(false)}
              >
                <X size={18} />
              </button>
            </header>
            <p className="hint">
              Chase+ is the planned optional membership program for Chase Studios, conceptually inspired by services like Xbox Game Pass and Ubisoft+.
            </p>
            <div className="modal-content-stack">
              <div className="modal-section">
                <h4>Planned Member Benefits</h4>
                <ul className="info-bullet-list">
                  <li>
                    <strong>Game Library Access:</strong> Play selected paid Chase Studios games while subscription remains active.
                  </li>
                  <li>
                    <strong>Included Battle Passes:</strong> Participating games provide included seasonal battle passes.
                  </li>
                  <li>
                    <strong>Discounts & Redeem Codes:</strong> Exclusive member discounts on eligible releases and server-validated reward codes.
                  </li>
                  <li>
                    <strong>Cosmetic Nexus Perks:</strong> Special avatar outfits, profile decorations, and member recognition.
                  </li>
                </ul>
              </div>
              <div className="modal-section alert-section">
                <h4>Alpha 0.1 Principles</h4>
                <p>
                  • <strong>No paywall:</strong> Standard Chase Nexus social networking is never gated behind Chase+.<br />
                  • <strong>Pricing:</strong> No official price has been established. Pricing is not finalized.<br />
                  • <strong>Payments:</strong> Production payment processing is deferred until post-alpha.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowChasePlusModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
