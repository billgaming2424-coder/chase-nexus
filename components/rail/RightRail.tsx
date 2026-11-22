"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, Sparkles, X, ChevronRight, Gamepad2, Gift, ShieldCheck } from "lucide-react";
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
  const { theme, setTheme } = useNexus();
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

      {/* 6. Online Friends & Streaks */}
      <section className="rail-card">
        <div className="card-head-row">
          <h2>Online friends</h2>
          <Link href="/messages" className="text-link small-link">
            Messages
          </Link>
        </div>
        <p className="hint">Sample contacts. Presence and streaks are local demonstration previews.</p>
        <ul className="friend-streak-list">
          {FRIEND_EXAMPLES.map((friend) => (
            <li key={friend.name} className="friend-streak-item">
              <span className="author-name">
                <span>{friend.name}</span>
                {friend.verified ? <ChaseBadge /> : null}
              </span>
              {friend.streak > 0 ? (
                <span className="streak-pill" title={`${friend.streak}-day streak preview`}>
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
