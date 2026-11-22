"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Plus, X, Heart, Flame, Sparkles, Send } from "lucide-react";
import { STORIES } from "@/lib/demo-data";
import type { StoryPreview } from "@/lib/types";
import { useNexus } from "@/components/nexus/NexusProvider";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";

export function StoriesRow() {
  const { userAvatar, displayName } = useNexus();
  const [active, setActive] = useState<StoryPreview | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [storyCaption, setStoryCaption] = useState("");
  const [reactions, setReactions] = useState<{ id: string; emoji: string }[]>([]);
  const [progress, setProgress] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // Modal open/close sync
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) {
      dialog.showModal();
      setProgress(0);
    }
    if (!active && dialog.open) {
      dialog.close();
    }
  }, [active]);

  // Story auto-advance progress timer
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          return 100;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const close = () => {
    setActive(null);
    if (localPreview) URL.revokeObjectURL(localPreview);
    setLocalPreview(null);
    setProgress(0);
  };

  const handleReact = (emoji: string) => {
    const id = crypto.randomUUID();
    setReactions((prev) => [...prev, { id, emoji }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 1500);
  };

  return (
    <section className="stories-wrap" aria-labelledby="stories-heading">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <h2 id="stories-heading" className="section-label" style={{ margin: 0 }}>
          Nexus 24h Stories
        </h2>
        <span className="pill" style={{ fontSize: "0.75rem" }}>Snapchat-Style</span>
      </div>

      <div className="stories">
        {/* Your Story button with Bitmoji avatar */}
        <button
          type="button"
          className="story"
          onClick={() => setActive(STORIES[0])}
          title="Add or view your story"
        >
          <div style={{ position: "relative" }}>
            <span className="story-ring is-yours" data-tone={1}>
              <NexusAvatar config={userAvatar} size={46} showStickerBadge />
            </span>
            <span
              style={{
                position: "absolute",
                bottom: -2,
                right: -2,
                background: "var(--accent)",
                color: "#fff",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid var(--background)",
              }}
            >
              <Plus size={12} />
            </span>
          </div>
          <span className="story-name">Your Story</span>
        </button>

        {/* Other community & studio stories */}
        {STORIES.slice(1).map((story) => (
          <button key={story.id} type="button" className="story" onClick={() => setActive(story)}>
            <span className="story-ring" data-tone={story.tone}>
              <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{story.name.slice(0, 1)}</span>
            </span>
            <span className="story-name">{story.name}</span>
          </button>
        ))}
      </div>

      <dialog ref={dialogRef} className="dialog story-modal-dialog" aria-labelledby={titleId} onClose={close}>
        {active ? (
          <div className="dialog-card story-dialog-card">
            {/* Snapchat-style Top Progress Bar */}
            <div className="story-progress-bar-wrap" style={{ height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 2, marginBottom: 12, overflow: "hidden" }}>
              <div
                className="story-progress-fill"
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "var(--accent)",
                  transition: "width 0.1s linear",
                }}
              />
            </div>

            <header className="dialog-head" style={{ marginBottom: 12 }}>
              <div className="author-name" style={{ gap: 8 }}>
                {active.yours ? (
                  <NexusAvatar config={userAvatar} size={32} showStickerBadge />
                ) : (
                  <span className="avatar avatar-sm">{active.name.slice(0, 1)}</span>
                )}
                <div>
                  <h3 id={titleId} style={{ fontSize: "1rem", margin: 0 }}>
                    {active.yours ? displayName || "Your Story" : active.name}
                  </h3>
                  <small className="hint">24h Expiring Story · Active</small>
                </div>
              </div>
              <button type="button" className="icon-btn" aria-label="Close story" onClick={close}>
                <X size={18} />
              </button>
            </header>

            {/* Story Visual Stage */}
            <div
              className="media media-story"
              data-tone={active.tone}
              style={{
                position: "relative",
                minHeight: 280,
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                background: "linear-gradient(135deg, #180b2c, #3b0764)",
              }}
            >
              {localPreview ? (
                <img
                  src={localPreview}
                  alt="Story photo preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : active.yours ? (
                <div style={{ textAlign: "center", padding: 20 }}>
                  <NexusAvatar config={userAvatar} size={110} showStickerBadge />
                  <p style={{ marginTop: 12, fontWeight: 600 }}>Share a snap with your friends</p>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: 20 }}>
                  <span style={{ fontSize: "2.4rem", display: "block", marginBottom: 8 }}>🎮</span>
                  <h3>{active.name}</h3>
                  <p className="hint">{active.caption}</p>
                </div>
              )}

              {/* Floating Reaction Animations */}
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 20,
                  pointerEvents: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {reactions.map((r) => (
                  <span
                    key={r.id}
                    style={{
                      fontSize: "2rem",
                      animation: "flyUp 1.2s ease-out forwards",
                    }}
                  >
                    {r.emoji}
                  </span>
                ))}
              </div>
            </div>

            <p style={{ margin: "12px 0 8px", fontSize: "0.95rem" }}>
              {storyCaption || active.caption}
            </p>

            {/* Story Actions & Creator Upload */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {active.yours ? (
                <label className="btn btn-primary btn-sm" style={{ cursor: "pointer" }}>
                  <Plus size={14} />
                  <span>{localPreview ? "Change Photo" : "Upload Photo"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      if (localPreview) URL.revokeObjectURL(localPreview);
                      setLocalPreview(URL.createObjectURL(file));
                    }}
                  />
                </label>
              ) : null}

              {/* Quick Story Emoji Reactions */}
              <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
                {["❤️", "🔥", "⚡", "👑", "🎮"].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="icon-btn"
                    style={{ width: 34, height: 34, fontSize: "1.1rem" }}
                    onClick={() => handleReact(emoji)}
                    title={`React ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
