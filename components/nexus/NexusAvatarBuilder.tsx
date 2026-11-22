"use client";

import { useState } from "react";
import {
  Sparkles,
  Shuffle,
  Check,
  Palette,
  Scissors,
  Eye,
  Smile,
  Shirt,
  Headphones,
  Flame,
  MessageSquare,
  Layers,
  X,
} from "lucide-react";
import type { AvatarConfig } from "@/lib/types";
import { DEFAULT_AVATAR } from "@/lib/types";
import { NexusAvatar } from "./NexusAvatar";
import { useNexus } from "./NexusProvider";

interface NexusAvatarBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

const SKIN_TONES = [
  { label: "Fair", value: "#fbe3d5" },
  { label: "Peach", value: "#f8cbb0" },
  { label: "Warm Tan", value: "#e5a77d" },
  { label: "Golden Caramel", value: "#c98251" },
  { label: "Espresso", value: "#8c5332" },
  { label: "Deep Obsidian", value: "#4a2a18" },
  { label: "Cosmic Void", value: "#7c3aed" },
  { label: "Neon Cyber", value: "#06b6d4" },
];

const HAIR_STYLES: { id: AvatarConfig["hairStyle"]; label: string }[] = [
  { id: "fade", label: "Clean Fade" },
  { id: "buzz", label: "Buzz Cut" },
  { id: "spikes", label: "Anime Spikes" },
  { id: "wavy", label: "Wavy Part" },
  { id: "afro", label: "Afro" },
  { id: "braids", label: "Braided Locs" },
  { id: "flowing", label: "Long Flowing" },
  { id: "bun", label: "Top Bun" },
  { id: "side-part", label: "Side Part" },
  { id: "dreads", label: "Cyber Dreads" },
];

const HAIR_COLORS = [
  { label: "Jet Black", value: "#18181b" },
  { label: "Dark Brown", value: "#3f2212" },
  { label: "Golden Blonde", value: "#eab308" },
  { label: "Crimson Red", value: "#b91c1c" },
  { label: "Cosmic Purple", value: "#a855f7" },
  { label: "Neon Cyan", value: "#22d3ee" },
  { label: "Silver Platinum", value: "#cbd5e1" },
  { label: "Rose Pink", value: "#ec4899" },
];

const EYE_SHAPES: { id: AvatarConfig["eyeShape"]; label: string }[] = [
  { id: "almond", label: "Confident Almond" },
  { id: "round", label: "Expressive Round" },
  { id: "sharp", label: "Determined Anime" },
  { id: "starry", label: "Starry Sparkle" },
];

const EYE_COLORS = [
  { label: "Deep Amethyst", value: "#7c3aed" },
  { label: "Cyber Cyan", value: "#06b6d4" },
  { label: "Warm Hazel", value: "#854d0e" },
  { label: "Emerald", value: "#10b981" },
  { label: "Sapphire", value: "#2563eb" },
  { label: "Obsidian", value: "#09060f" },
  { label: "Golden Flame", value: "#f59e0b" },
];

const MOUTHS: { id: AvatarConfig["mouth"]; label: string }[] = [
  { id: "smile", label: "Friendly Smile" },
  { id: "smirk", label: "Confident Smirk" },
  { id: "laugh", label: "Joyful Laugh" },
  { id: "neutral", label: "Chill Neutral" },
  { id: "battle", label: "Battle Grin" },
  { id: "wink", label: "Playful Wink" },
];

const FACIAL_HAIR: { id: NonNullable<AvatarConfig["facialHair"]>; label: string }[] = [
  { id: "none", label: "Clean Shaven" },
  { id: "stubble", label: "5 O'Clock Stubble" },
  { id: "mustache", label: "Classic Mustache" },
  { id: "goatee", label: "Sharp Goatee" },
  { id: "beard", label: "Full Beard" },
];

const OUTFITS: { id: AvatarConfig["outfit"]; label: string; desc: string }[] = [
  { id: "varsity-hoodie", label: "Chase Varsity Hoodie", desc: "Signature black & purple CS studio hoodie" },
  { id: "cyber-jacket", label: "Cyberpunk Bomber", desc: "Neon cyan high-tech street jacket" },
  { id: "survivor-duster", label: "DEADEYE Duster", desc: "Western survivor coat & flannel" },
  { id: "trainer-vest", label: "Aetheria Vest", desc: "Unimon Legends companion explorer gear" },
  { id: "nexus-tee", label: "Nexus Streetwear", desc: "Holographic graphic tee" },
  { id: "armor", label: "Steam RPG Armor", desc: "Obsidian knight battle plate" },
  { id: "space-suit", label: "Deep Space Suit", desc: "Void exploration astronaut suit with gold visor" },
  { id: "retro-arcade", label: "Retro Arcade Bomber", desc: "Pixel 80s gamer windbreaker jacket" },
  { id: "purple-tux", label: "Chase Gala Tuxedo", desc: "VIP formal purple velvet suit & bow tie" },
];

const ACCESSORIES: { id: AvatarConfig["accessory"]; label: string }[] = [
  { id: "none", label: "None" },
  { id: "gamer-headset", label: "Chase Gamer Headset" },
  { id: "cyber-visor", label: "Neon Visor Glasses" },
  { id: "aviators", label: "Gold Aviator Shades" },
  { id: "snapback", label: "Snapback Cap" },
  { id: "beanie", label: "Warm Knit Beanie" },
  { id: "crown", label: "Gold King Crown" },
  { id: "cat-ears", label: "Cyber Cat Ears Headband" },
  { id: "bandana", label: "Outlaw Bandana" },
  { id: "earring", label: "Gold Earring" },
];

const MOOD_POSES: { id: NonNullable<AvatarConfig["pose"]>; label: string; icon: string }[] = [
  { id: "portrait", label: "Default Avatar", icon: "✨" },
  { id: "fire", label: "On Fire Streak", icon: "🔥" },
  { id: "gg", label: "GG! Victory", icon: "🎮" },
  { id: "hype", label: "HYPE Celebration", icon: "⚡" },
  { id: "shield", label: "Security Shield", icon: "🛡️" },
  { id: "verified", label: "Chase Verified", icon: "👑" },
  { id: "chill", label: "Chill Vibes", icon: "☕" },
  { id: "afk", label: "AFK Away", icon: "💤" },
  { id: "raid", label: "Raid Boss", icon: "⚔️" },
  { id: "love", label: "Lots of Love", icon: "❤️" },
  { id: "rocket", label: "To The Moon", icon: "🚀" },
  { id: "levelup", label: "Level Up!", icon: "⭐" },
];

const BACKGROUNDS: { id: AvatarConfig["background"]; label: string; preview: string }[] = [
  { id: "purple-gradient", label: "Cosmic Purple", preview: "linear-gradient(135deg, #1b0a2a, #4a1d96)" },
  { id: "neon-cyan", label: "Neon Cyber", preview: "linear-gradient(135deg, #022c22, #06b6d4)" },
  { id: "void-dark", label: "Deep Obsidian", preview: "linear-gradient(135deg, #09090b, #18181b)" },
  { id: "gold-burst", label: "Champion Gold", preview: "linear-gradient(135deg, #451a03, #d97706)" },
  { id: "fire-streak", label: "Fire Streak", preview: "linear-gradient(135deg, #450a0a, #ef4444)" },
  { id: "cosmic-stars", label: "Starlight Void", preview: "radial-gradient(circle, #3b0764, #030712)" },
];

const PRESET_BUBBLES = [
  "Chilling on Chase Nexus ✨",
  "Grinding games 🎮",
  "Streaming live on Twitch 🔴",
  "Coding the future 💻",
  "Chase Verified 👑",
  "AFK taking a break 💤",
  "Unimon Raids tonight ⚔️",
];

export function NexusAvatarBuilder({ isOpen, onClose }: NexusAvatarBuilderProps) {
  const { userProfile, setUserAvatar, userAvatar } = useNexus();
  const [activeTab, setActiveTab] = useState<
    "face" | "hair" | "eyes" | "outfit" | "accessories" | "stickers" | "bubble" | "backdrop"
  >("face");

  const [avatar, setAvatar] = useState<AvatarConfig>(() => {
    return userProfile?.avatar_config || userAvatar || DEFAULT_AVATAR;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRandomize = () => {
    const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    setAvatar({
      skinTone: randomItem(SKIN_TONES).value,
      hairStyle: randomItem(HAIR_STYLES).id,
      hairColor: randomItem(HAIR_COLORS).value,
      eyeShape: randomItem(EYE_SHAPES).id,
      eyeColor: randomItem(EYE_COLORS).value,
      mouth: randomItem(MOUTHS).id,
      facialHair: randomItem(FACIAL_HAIR).id,
      outfit: randomItem(OUTFITS).id,
      accessory: randomItem(ACCESSORIES).id,
      background: randomItem(BACKGROUNDS).id,
      pose: randomItem(MOOD_POSES).id,
      statusBubble: randomItem(PRESET_BUBBLES),
    });
  };

  const handleSave = async () => {
    try {
      setUserAvatar(avatar);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 700);
    } catch {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="dialog card avatar-studio-modal"
        role="dialog"
        aria-label="Nexus Avatar Studio"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="dialog-head">
          <div className="author-name">
            <span className="logo-mark auth-mini-logo" aria-hidden="true">
              <Sparkles size={16} />
            </span>
            <div>
              <h3>Nexus Avatar Studio 2.0</h3>
              <p className="hint">Custom Snapchat/Bitmoji-style Chase Studios character</p>
            </div>
          </div>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        {/* Live Avatar Preview Stage */}
        <div className="avatar-preview-stage">
          <div className="avatar-stage-glow" />
          <NexusAvatar config={avatar} size={150} showStickerBadge />
          <div className="avatar-preview-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleRandomize}
              title="Surprise me with a random combination"
            >
              <Shuffle size={14} />
              <span>Randomize</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <nav className="avatar-cat-tabs" aria-label="Avatar Categories">
          <button
            type="button"
            className={`cat-tab ${activeTab === "face" ? "is-active" : ""}`}
            onClick={() => setActiveTab("face")}
          >
            <Palette size={14} />
            <span>Face</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "hair" ? "is-active" : ""}`}
            onClick={() => setActiveTab("hair")}
          >
            <Scissors size={14} />
            <span>Hair</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "eyes" ? "is-active" : ""}`}
            onClick={() => setActiveTab("eyes")}
          >
            <Eye size={14} />
            <span>Eyes</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "outfit" ? "is-active" : ""}`}
            onClick={() => setActiveTab("outfit")}
          >
            <Shirt size={14} />
            <span>Wardrobe</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "accessories" ? "is-active" : ""}`}
            onClick={() => setActiveTab("accessories")}
          >
            <Headphones size={14} />
            <span>Gear</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "stickers" ? "is-active" : ""}`}
            onClick={() => setActiveTab("stickers")}
          >
            <Flame size={14} />
            <span>Stickers</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "bubble" ? "is-active" : ""}`}
            onClick={() => setActiveTab("bubble")}
          >
            <MessageSquare size={14} />
            <span>Bubble</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "backdrop" ? "is-active" : ""}`}
            onClick={() => setActiveTab("backdrop")}
          >
            <Layers size={14} />
            <span>Backdrop</span>
          </button>
        </nav>

        {/* Category Panel Content */}
        <div className="avatar-controls-panel">
          {/* 1. Face, Skin & Expression */}
          {activeTab === "face" && (
            <div className="builder-section">
              <label className="builder-label">Skin Tone</label>
              <div className="swatch-grid">
                {SKIN_TONES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    className={`swatch-btn ${avatar.skinTone === t.value ? "is-active" : ""}`}
                    style={{ background: t.value }}
                    title={t.label}
                    onClick={() => setAvatar((prev) => ({ ...prev, skinTone: t.value }))}
                  />
                ))}
              </div>

              <label className="builder-label" style={{ marginTop: 14 }}>
                Facial Expression
              </label>
              <div className="choice-chip-grid">
                {MOUTHS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`choice-chip ${avatar.mouth === m.id ? "is-active" : ""}`}
                    onClick={() => setAvatar((prev) => ({ ...prev, mouth: m.id }))}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <label className="builder-label" style={{ marginTop: 14 }}>
                Facial Hair / Beard Style
              </label>
              <div className="choice-chip-grid">
                {FACIAL_HAIR.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`choice-chip ${avatar.facialHair === f.id ? "is-active" : ""}`}
                    onClick={() => setAvatar((prev) => ({ ...prev, facialHair: f.id }))}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Hair Style & Color */}
          {activeTab === "hair" && (
            <div className="builder-section">
              <label className="builder-label">Hair Style (10 Custom Cuts)</label>
              <div className="choice-chip-grid">
                {HAIR_STYLES.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    className={`choice-chip ${avatar.hairStyle === h.id ? "is-active" : ""}`}
                    onClick={() => setAvatar((prev) => ({ ...prev, hairStyle: h.id }))}
                  >
                    {h.label}
                  </button>
                ))}
              </div>

              <label className="builder-label" style={{ marginTop: 14 }}>
                Hair Color
              </label>
              <div className="swatch-grid">
                {HAIR_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    className={`swatch-btn ${avatar.hairColor === c.value ? "is-active" : ""}`}
                    style={{ background: c.value }}
                    title={c.label}
                    onClick={() => setAvatar((prev) => ({ ...prev, hairColor: c.value }))}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 3. Eyes & Eye Color */}
          {activeTab === "eyes" && (
            <div className="builder-section">
              <label className="builder-label">Eye Shape</label>
              <div className="choice-chip-grid">
                {EYE_SHAPES.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    className={`choice-chip ${avatar.eyeShape === e.id ? "is-active" : ""}`}
                    onClick={() => setAvatar((prev) => ({ ...prev, eyeShape: e.id }))}
                  >
                    {e.label}
                  </button>
                ))}
              </div>

              <label className="builder-label" style={{ marginTop: 14 }}>
                Iris Glow / Eye Color
              </label>
              <div className="swatch-grid">
                {EYE_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    className={`swatch-btn ${avatar.eyeColor === c.value ? "is-active" : ""}`}
                    style={{ background: c.value }}
                    title={c.label}
                    onClick={() => setAvatar((prev) => ({ ...prev, eyeColor: c.value }))}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4. Wardrobe */}
          {activeTab === "outfit" && (
            <div className="builder-section">
              <label className="builder-label">Chase Studios Outfits (9 Iconic Fits)</label>
              <div className="outfit-card-stack">
                {OUTFITS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className={`outfit-select-row ${avatar.outfit === o.id ? "is-active" : ""}`}
                    onClick={() => setAvatar((prev) => ({ ...prev, outfit: o.id }))}
                  >
                    <div>
                      <strong>{o.label}</strong>
                      <p>{o.desc}</p>
                    </div>
                    {avatar.outfit === o.id && <Check size={16} className="purple-icon" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5. Gear & Hats */}
          {activeTab === "accessories" && (
            <div className="builder-section">
              <label className="builder-label">Gear, Hats & Eyewear</label>
              <div className="choice-chip-grid">
                {ACCESSORIES.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className={`choice-chip ${avatar.accessory === a.id ? "is-active" : ""}`}
                    onClick={() => setAvatar((prev) => ({ ...prev, accessory: a.id }))}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 6. Snapchat-Style Mood Stickers (12 pack) */}
          {activeTab === "stickers" && (
            <div className="builder-section">
              <label className="builder-label">Snapchat-Style Bitmoji Pose Stickers (12 Pack)</label>
              <div className="choice-chip-grid">
                {MOOD_POSES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`choice-chip ${avatar.pose === p.id ? "is-active" : ""}`}
                    onClick={() => setAvatar((prev) => ({ ...prev, pose: p.id }))}
                  >
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 7. Status Speech Bubble */}
          {activeTab === "bubble" && (
            <div className="builder-section">
              <label className="builder-label">Floating Status Speech Bubble</label>
              <p className="hint" style={{ marginBottom: 8 }}>
                Your avatar displays this message in your profile, posts, and chat headers.
              </p>
              <input
                type="text"
                className="bubble-input"
                value={avatar.statusBubble || ""}
                placeholder="What's your character saying? (e.g. Chilling on Chase Nexus ✨)"
                maxLength={45}
                onChange={(e) => setAvatar((prev) => ({ ...prev, statusBubble: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                  marginBottom: 12,
                }}
              />
              <label className="builder-label">Quick Suggestions</label>
              <div className="choice-chip-grid">
                {PRESET_BUBBLES.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={`choice-chip ${avatar.statusBubble === preset ? "is-active" : ""}`}
                    onClick={() => setAvatar((prev) => ({ ...prev, statusBubble: preset }))}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 8. Backdrop Theme */}
          {activeTab === "backdrop" && (
            <div className="builder-section">
              <label className="builder-label">Avatar Background Gradient</label>
              <div className="choice-chip-grid">
                {BACKGROUNDS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`choice-chip ${avatar.background === b.id ? "is-active" : ""}`}
                    onClick={() => setAvatar((prev) => ({ ...prev, background: b.id }))}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: b.preview,
                        display: "inline-block",
                      }}
                    />
                    <span>{b.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <footer className="avatar-builder-foot">
          {savedSuccess ? (
            <div className="auth-success-banner" style={{ width: "100%", textAlign: "center" }}>
              ✓ Character Avatar Saved to Profile & Cloud!
            </div>
          ) : (
            <>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                <Check size={16} />
                <span>Save Bitmoji Avatar</span>
              </button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}
