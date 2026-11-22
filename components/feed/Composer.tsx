"use client";

import { useState } from "react";
import { ImagePlus, ListPlus, Sparkles, X, Smile, Flame, Check } from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";
import { NexusAvatarBuilder } from "@/components/nexus/NexusAvatarBuilder";
import type { Audience } from "@/lib/types";

const STICKER_PACK = [
  { id: "fire", label: "🔥 Fire Streak" },
  { id: "gg", label: "🎮 GG! Victory" },
  { id: "hype", label: "⚡ HYPE!" },
  { id: "verified", label: "👑 Verified" },
  { id: "chill", label: "☕ Chill Vibes" },
  { id: "afk", label: "💤 AFK" },
  { id: "raid", label: "⚔️ Raid Ready" },
  { id: "love", label: "❤️ Big Love" },
  { id: "rocket", label: "🚀 To The Moon" },
  { id: "levelup", label: "⭐ Level Up" },
  { id: "ragequit", label: "💥 Rage Quit" },
  { id: "clutch", label: "🎯 1v5 Clutch" },
  { id: "mindblown", label: "🤯 Mind Blown" },
  { id: "skull", label: "💀 I'm Dead" },
  { id: "stream", label: "🔴 Live Now" },
  { id: "dance", label: "💃 Hype Dance" },
  { id: "flex", label: "💪 Big Flex" },
  { id: "wave", label: "👋 Hey There" },
  { id: "co-op", label: "🤝 Co-Op Squad" },
  { id: "salute", label: "🫡 Respect" },
];

export function Composer() {
  const { quoteTarget, setQuoteTarget, addPost, userAvatar } = useNexus();
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<Audience>("public");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [avatarSticker, setAvatarSticker] = useState<string | null>(null);
  const [stickerCaption, setStickerCaption] = useState("");
  const [stickerDrawerOpen, setStickerDrawerOpen] = useState(false);
  const [pollOn, setPollOn] = useState(false);
  const [choices, setChoices] = useState(["", ""]);
  const [avatarStudioOpen, setAvatarStudioOpen] = useState(false);

  const filledChoices = choices.map((choice) => choice.trim()).filter(Boolean);
  const pollReady = !pollOn || (body.trim().length > 0 && filledChoices.length >= 2);
  const hasContent = body.trim().length > 0 || Boolean(imageUrl) || Boolean(avatarSticker);
  const quoteReady = !quoteTarget || body.trim().length > 0;
  const canSubmit = hasContent && pollReady && quoteReady;

  const reset = () => {
    setBody("");
    setPollOn(false);
    setChoices(["", ""]);
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setAvatarSticker(null);
    setStickerCaption("");
    setStickerDrawerOpen(false);
  };

  return (
    <>
      <form
        className="composer card"
        onSubmit={(event) => {
          event.preventDefault();
          if (!canSubmit) return;
          addPost({
            body,
            audience,
            imageUrl: imageUrl ?? undefined,
            imageLabel: imageUrl ? "Photo attached" : undefined,
            avatarSticker: avatarSticker ?? undefined,
            avatarStickerCaption: stickerCaption ? stickerCaption.trim() : undefined,
            poll: pollOn
              ? filledChoices.slice(0, 4).map((label, index) => ({ id: `choice-${index}`, label }))
              : undefined,
            quote: quoteTarget
              ? {
                  author: quoteTarget.author.name,
                  handle: quoteTarget.author.handle,
                  body: quoteTarget.body,
                }
              : undefined,
          });
          reset();
        }}
      >
        <div className="composer-top">
          <button
            type="button"
            className="avatar-composer-btn"
            title="Edit your Bitmoji avatar"
            onClick={() => setAvatarStudioOpen(true)}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <NexusAvatar config={userAvatar} size={44} showStickerBadge />
          </button>
          <label className="sr-only" htmlFor="composer-body">
            Write a post
          </label>
          <textarea
            id="composer-body"
            value={body}
            maxLength={500}
            placeholder="Share something with the Chase Studios community..."
            onChange={(event) => setBody(event.target.value)}
          />
        </div>

        {/* Attached Bitmoji Sticker Preview */}
        {avatarSticker && (
          <div
            className="composer-sticker-preview"
            style={{
              margin: "10px 0 14px 56px",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(124, 58, 237, 0.1)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              borderRadius: 16,
              padding: "8px 14px",
            }}
          >
            <NexusAvatar
              config={{
                ...userAvatar,
                pose: avatarSticker as any,
                customCaption: stickerCaption || undefined,
              }}
              size={68}
              showStickerBadge
            />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <strong>Attached Bitmoji Sticker</strong>
                <button
                  type="button"
                  className="icon-btn"
                  style={{ width: 20, height: 20 }}
                  onClick={() => setAvatarSticker(null)}
                  title="Remove sticker"
                >
                  <X size={12} />
                </button>
              </div>
              <input
                type="text"
                value={stickerCaption}
                placeholder="Add custom meme text (optional)..."
                maxLength={24}
                onChange={(e) => setStickerCaption(e.target.value)}
                style={{
                  marginTop: 6,
                  padding: "4px 8px",
                  fontSize: "0.8rem",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  color: "var(--foreground)",
                }}
              />
            </div>
          </div>
        )}

        {quoteTarget ? (
          <div className="quote">
            <div>
              <strong>{quoteTarget.author.name}</strong>
              <span>{quoteTarget.author.handle}</span>
              <p>{quoteTarget.body}</p>
            </div>
            <button type="button" className="icon-btn" aria-label="Remove quote" onClick={() => setQuoteTarget(null)}>
              <X size={16} />
            </button>
          </div>
        ) : null}

        {imageUrl ? (
          <div className="media">
            <img src={imageUrl} alt="Attached post preview" />
            <button
              type="button"
              className="icon-btn media-remove"
              aria-label="Remove photo"
              onClick={() => {
                URL.revokeObjectURL(imageUrl);
                setImageUrl(null);
              }}
            >
              <X size={16} />
            </button>
          </div>
        ) : null}

        {pollOn ? (
          <fieldset className="poll-editor">
            <legend>Poll choices</legend>
            {choices.map((choice, index) => (
              <input
                key={index}
                value={choice}
                maxLength={60}
                aria-label={`Choice ${index + 1}`}
                placeholder={`Choice ${index + 1}`}
                onChange={(event) => {
                  const next = [...choices];
                  next[index] = event.target.value;
                  setChoices(next);
                }}
              />
            ))}
            {choices.length < 4 ? (
              <button type="button" className="btn btn-ghost" onClick={() => setChoices([...choices, ""])}>
                Add choice
              </button>
            ) : null}
          </fieldset>
        ) : null}

        {/* Sticker Drawer Dropdown / Popover */}
        {stickerDrawerOpen && (
          <div
            className="composer-sticker-drawer"
            style={{
              padding: "12px",
              background: "var(--surface-2)",
              borderRadius: 14,
              border: "1px solid var(--line)",
              margin: "8px 0 14px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>Choose a Bitmoji Pose Sticker:</span>
              <button
                type="button"
                className="icon-btn"
                style={{ width: 22, height: 22 }}
                onClick={() => setStickerDrawerOpen(false)}
              >
                <X size={14} />
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: 8,
                maxHeight: 180,
                overflowY: "auto",
              }}
            >
              {STICKER_PACK.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`choice-chip ${avatarSticker === s.id ? "is-active" : ""}`}
                  style={{
                    padding: "6px 8px",
                    fontSize: "0.78rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                  onClick={() => {
                    setAvatarSticker(s.id);
                    setStickerDrawerOpen(false);
                  }}
                >
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="composer-bar">
          <label className="icon-btn" title="Add a photo from your device">
            <ImagePlus size={18} aria-hidden="true" />
            <span className="sr-only">Add a photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                if (imageUrl) URL.revokeObjectURL(imageUrl);
                setImageUrl(URL.createObjectURL(file));
                event.target.value = "";
              }}
            />
          </label>

          <button
            type="button"
            className={pollOn ? "icon-btn is-on" : "icon-btn"}
            aria-pressed={pollOn}
            aria-label="Add a poll"
            onClick={() => setPollOn((value) => !value)}
          >
            <ListPlus size={18} />
          </button>

          <button
            type="button"
            className={`icon-btn ${stickerDrawerOpen ? "is-on" : ""}`}
            title="Attach Bitmoji Sticker (24 Poses)"
            aria-label="Attach Bitmoji Sticker"
            onClick={() => setStickerDrawerOpen((v) => !v)}
          >
            <Smile size={18} className="purple-icon" />
          </button>

          <button
            type="button"
            className="icon-btn"
            title="Bitmoji Avatar Studio"
            aria-label="Customize Bitmoji Avatar"
            onClick={() => setAvatarStudioOpen(true)}
          >
            <Sparkles size={18} className="purple-icon" />
          </button>

          <label className="audience" style={{ marginLeft: "auto" }}>
            <span className="sr-only">Audience preference</span>
            <select value={audience} onChange={(event) => setAudience(event.target.value as Audience)}>
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="followers">Followers</option>
            </select>
          </label>

          <button className="btn btn-primary" type="submit" disabled={!canSubmit}>
            Post
          </button>
        </div>

        <p className="hint">Posts sync live to Chase Studios Cloud in real-time.</p>
      </form>

      <NexusAvatarBuilder isOpen={avatarStudioOpen} onClose={() => setAvatarStudioOpen(false)} />
    </>
  );
}
