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
  Download,
  Gamepad2,
  Users,
  Bookmark,
  Zap,
} from "lucide-react";
import type { AvatarConfig, AvatarPreset } from "@/lib/types";
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
  { id: "afro", label: "Classic Afro" },
  { id: "braids", label: "Braided Locs" },
  { id: "flowing", label: "Long Flowing" },
  { id: "bun", label: "Top Bun" },
  { id: "side-part", label: "Side Part" },
  { id: "dreads", label: "Cyber Dreads" },
  { id: "mohawk", label: "Punk Mohawk" },
  { id: "curls", label: "Bouncy Curls" },
  { id: "slick-back", label: "Slicked Back" },
  { id: "ponytail", label: "High Ponytail" },
  { id: "neon-locs", label: "Neon Braids" },
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
  { id: "mech-pilot", label: "Titan Mech Flight Suit", desc: "High-agility armored pilot exoskeleton" },
  { id: "ninja-shinobi", label: "Midnight Shinobi Wraps", desc: "Shadow assassin combat tactical wraps" },
  { id: "esports-jersey", label: "Pro Esports Jersey #24", desc: "Official Chase Studios competitive jersey" },
  { id: "retro-synth", label: "Synthwave Grid Jacket", desc: "80s neon motorcycle rider leather" },
  { id: "cozy-hoodie", label: "Oversized Chill Fleece", desc: "Ultra-comfortable pastel lounge hoodie" },
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
  { id: "heart-shades", label: "Ruby Heart Sunglasses" },
  { id: "vr-headset", label: "Holographic VR Goggles" },
  { id: "halo", label: "Angelic Golden Halo" },
  { id: "demon-horns", label: "Crimson Demon Horns" },
];

const PROPS: { id: NonNullable<AvatarConfig["prop"]>; label: string; icon: string }[] = [
  { id: "none", label: "None", icon: "🚫" },
  { id: "rgb-controller", label: "Wireless Gamepad", icon: "🎮" },
  { id: "energy-drink", label: "Cyber Energy Drink", icon: "⚡" },
  { id: "steam-deck", label: "Handheld OLED Rig", icon: "🕹️" },
  { id: "golden-mic", label: "Studio Broadcast Mic", icon: "🎙️" },
  { id: "laser-sword", label: "Plasma Energy Saber", icon: "⚔️" },
  { id: "coffee-mug", label: "Chase Studios Ceramic Mug", icon: "☕" },
  { id: "trophy", label: "Championship Gold Cup", icon: "🏆" },
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
  { id: "ragequit", label: "Rage Quit!", icon: "💥" },
  { id: "clutch", label: "1v5 Clutch", icon: "🎯" },
  { id: "mindblown", label: "Mind Blown!", icon: "🤯" },
  { id: "skull", label: "I'm Dead", icon: "💀" },
  { id: "stream", label: "Live Now", icon: "🔴" },
  { id: "dance", label: "Hype Dance", icon: "💃" },
  { id: "facepalm", label: "Facepalm", icon: "🤦" },
  { id: "flex", label: "Big Flex", icon: "💪" },
  { id: "wave", label: "Hey There!", icon: "👋" },
  { id: "cry-laugh", label: "Dead Laughing", icon: "😂" },
  { id: "co-op", label: "Co-Op Squad", icon: "🤝" },
  { id: "salute", label: "Respect Salute", icon: "🫡" },
];

const BACKGROUNDS: { id: AvatarConfig["background"]; label: string; preview: string }[] = [
  { id: "purple-gradient", label: "Cosmic Purple", preview: "linear-gradient(135deg, #1b0a2a, #4a1d96)" },
  { id: "neon-cyan", label: "Neon Cyber", preview: "linear-gradient(135deg, #022c22, #06b6d4)" },
  { id: "void-dark", label: "Deep Obsidian", preview: "linear-gradient(135deg, #09090b, #18181b)" },
  { id: "gold-burst", label: "Champion Gold", preview: "linear-gradient(135deg, #451a03, #d97706)" },
  { id: "fire-streak", label: "Fire Streak", preview: "linear-gradient(135deg, #450a0a, #ef4444)" },
  { id: "cosmic-stars", label: "Starlight Void", preview: "radial-gradient(circle, #3b0764, #030712)" },
  { id: "cyber-grid", label: "Cyber Grid", preview: "linear-gradient(135deg, #0f172a, #701a75)" },
  { id: "retro-sunset", label: "Retro Sunset", preview: "linear-gradient(180deg, #f43f5e, #0f172a)" },
];

const PRESET_FRIENDS = [
  {
    name: "Avery Quinn",
    handle: "@avery",
    avatar: {
      ...DEFAULT_AVATAR,
      hairStyle: "curls" as const,
      hairColor: "#b91c1c",
      outfit: "cyber-jacket" as const,
      accessory: "cat-ears" as const,
      prop: "rgb-controller" as const,
    },
  },
  {
    name: "Bill Chase",
    handle: "@billchase",
    avatar: {
      ...DEFAULT_AVATAR,
      hairStyle: "fade" as const,
      hairColor: "#18181b",
      outfit: "varsity-hoodie" as const,
      accessory: "gamer-headset" as const,
      prop: "trophy" as const,
    },
  },
  {
    name: "Samira Cole",
    handle: "@samira",
    avatar: {
      ...DEFAULT_AVATAR,
      skinTone: "#8c5332",
      hairStyle: "braids" as const,
      hairColor: "#a855f7",
      outfit: "mech-pilot" as const,
      accessory: "vr-headset" as const,
      prop: "laser-sword" as const,
    },
  },
];

export function NexusAvatarBuilder({ isOpen, onClose }: NexusAvatarBuilderProps) {
  const { userProfile, setUserAvatar, userAvatar } = useNexus();
  const [activeTab, setActiveTab] = useState<
    "face" | "hair" | "eyes" | "outfit" | "accessories" | "props" | "stickers" | "friendmoji" | "presets" | "bubble"
  >("face");

  const [avatar, setAvatar] = useState<AvatarConfig>(() => {
    return userProfile?.avatar_config || userAvatar || DEFAULT_AVATAR;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [savedPresets, setSavedPresets] = useState<AvatarPreset[]>(() => {
    try {
      const raw = localStorage.getItem("nexus-avatar-presets");
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      { id: "p1", name: "Gamer Rig", avatar: { ...DEFAULT_AVATAR, prop: "rgb-controller", accessory: "gamer-headset" } },
      { id: "p2", name: "DEADEYE Outlaw", avatar: { ...DEFAULT_AVATAR, outfit: "survivor-duster", accessory: "bandana", prop: "laser-sword" } },
      { id: "p3", name: "Gala Velvet", avatar: { ...DEFAULT_AVATAR, outfit: "purple-tux", accessory: "crown", prop: "trophy" } },
    ];
  });

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
      prop: randomItem(PROPS).id,
      background: randomItem(BACKGROUNDS).id,
      pose: randomItem(MOOD_POSES).id,
      statusBubble: avatar.statusBubble || "Chilling on Chase Nexus ✨",
      customCaption: avatar.customCaption || "",
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

  const handleSaveToSlot = (slotIndex: number) => {
    const updated = [...savedPresets];
    updated[slotIndex] = {
      id: `p-${slotIndex}`,
      name: `Look ${slotIndex + 1} (${avatar.outfit})`,
      avatar: { ...avatar },
    };
    setSavedPresets(updated);
    try {
      localStorage.setItem("nexus-avatar-presets", JSON.stringify(updated));
    } catch {}
  };

  const handleApplyPreset = (presetAvatar: AvatarConfig) => {
    setAvatar({ ...presetAvatar });
  };

  const handleDownloadSVG = () => {
    // Generate downloadable SVG
    const svgEl = document.querySelector(".avatar-preview-stage svg");
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nexus-bitmoji-${avatar.pose || "avatar"}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="dialog card avatar-studio-modal"
        role="dialog"
        aria-label="Nexus Avatar Studio"
        style={{ maxWidth: 660, maxHeight: "90vh", display: "flex", flexDirection: "column" }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="dialog-head">
          <div className="author-name">
            <span className="logo-mark auth-mini-logo" aria-hidden="true">
              <Sparkles size={16} />
            </span>
            <div>
              <h3>Nexus Bitmoji Studio Deluxe</h3>
              <p className="hint">Snapchat-style avatars, props, meme stickers & Friendmojis</p>
            </div>
          </div>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        {/* Live Stage with 3D Card Glow */}
        <div className="avatar-preview-stage" style={{ position: "relative", padding: "18px 0 10px" }}>
          <div className="avatar-stage-glow" />
          <NexusAvatar config={avatar} size={150} showStickerBadge showStatusBubble />
          <div className="avatar-preview-actions" style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleRandomize}
              title="Surprise me with a random combination"
            >
              <Shuffle size={14} />
              <span>Randomize</span>
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={handleDownloadSVG}
              title="Download your Bitmoji as an SVG vector image"
            >
              <Download size={14} />
              <span>Export SVG</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <nav className="avatar-cat-tabs" aria-label="Avatar Categories" style={{ overflowX: "auto" }}>
          <button
            type="button"
            className={`cat-tab ${activeTab === "face" ? "is-active" : ""}`}
            onClick={() => setActiveTab("face")}
          >
            <Palette size={13} />
            <span>Face</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "hair" ? "is-active" : ""}`}
            onClick={() => setActiveTab("hair")}
          >
            <Scissors size={13} />
            <span>Hair (15)</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "eyes" ? "is-active" : ""}`}
            onClick={() => setActiveTab("eyes")}
          >
            <Eye size={13} />
            <span>Eyes</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "outfit" ? "is-active" : ""}`}
            onClick={() => setActiveTab("outfit")}
          >
            <Shirt size={13} />
            <span>Fits (14)</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "accessories" ? "is-active" : ""}`}
            onClick={() => setActiveTab("accessories")}
          >
            <Headphones size={13} />
            <span>Hats & Gear</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "props" ? "is-active" : ""}`}
            onClick={() => setActiveTab("props")}
          >
            <Gamepad2 size={13} />
            <span>Props</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "stickers" ? "is-active" : ""}`}
            onClick={() => setActiveTab("stickers")}
          >
            <Flame size={13} />
            <span>Stickers (24)</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "friendmoji" ? "is-active" : ""}`}
            onClick={() => setActiveTab("friendmoji")}
          >
            <Users size={13} />
            <span>Friendmoji</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "presets" ? "is-active" : ""}`}
            onClick={() => setActiveTab("presets")}
          >
            <Bookmark size={13} />
            <span>Closet</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "bubble" ? "is-active" : ""}`}
            onClick={() => setActiveTab("bubble")}
          >
            <MessageSquare size={13} />
            <span>Speech & Theme</span>
          </button>
        </nav>

        {/* Category Controls Body */}
        <div className="avatar-controls-panel" style={{ flex: 1, overflowY: "auto", padding: "14px 18px" }}>
          {/* 1. Face & Expression */}
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
                Facial Hair / Beard
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

          {/* 2. Hair & Colors (15 styles) */}
          {activeTab === "hair" && (
            <div className="builder-section">
              <label className="builder-label">Hair Style (15 Custom Cuts)</label>
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

          {/* 3. Eyes & Colors */}
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

          {/* 4. Wardrobe (14 Outfits) */}
          {activeTab === "outfit" && (
            <div className="builder-section">
              <label className="builder-label">Chase Studios Outfits (14 Official Fits)</label>
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

          {/* 5. Accessories & Hats (14 items) */}
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

          {/* 6. Handheld Props */}
          {activeTab === "props" && (
            <div className="builder-section">
              <label className="builder-label">Handheld Props & Rig Items</label>
              <p className="hint" style={{ marginBottom: 10 }}>
                Hold your favorite gaming gear, stream mic, plasma saber, or winner trophy!
              </p>
              <div className="choice-chip-grid">
                {PROPS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`choice-chip ${avatar.prop === p.id ? "is-active" : ""}`}
                    onClick={() => setAvatar((prev) => ({ ...prev, prop: p.id }))}
                  >
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 7. Sticker Pack & Comic Memes (24 Poses + Custom Caption) */}
          {activeTab === "stickers" && (
            <div className="builder-section">
              <label className="builder-label">Custom Comic Sticker Caption</label>
              <p className="hint" style={{ marginBottom: 6 }}>
                Type any meme text to stamp across your Bitmoji sticker banner:
              </p>
              <input
                type="text"
                value={avatar.customCaption || ""}
                placeholder="e.g. BEAST MODE, DEADEYE SQUAD, SEE YA!"
                maxLength={24}
                onChange={(e) => setAvatar((prev) => ({ ...prev, customCaption: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--foreground)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  marginBottom: 16,
                }}
              />

              <label className="builder-label">Snapchat-Style Bitmoji Comic Poses (24 Pack)</label>
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

          {/* 8. Friendmoji Duo Studio */}
          {activeTab === "friendmoji" && (
            <div className="builder-section">
              <label className="builder-label">Snapchat-Style Friendmoji Duo</label>
              <p className="hint" style={{ marginBottom: 12 }}>
                Pose side-by-side with your friends, squad mates, or studio developers!
              </p>
              <div className="outfit-card-stack">
                {PRESET_FRIENDS.map((f) => (
                  <button
                    key={f.handle}
                    type="button"
                    className={`outfit-select-row ${avatar.duoFriend?.name === f.name ? "is-active" : ""}`}
                    onClick={() => {
                      if (avatar.duoFriend?.name === f.name) {
                        setAvatar((prev) => ({ ...prev, duoFriend: undefined }));
                      } else {
                        setAvatar((prev) => ({
                          ...prev,
                          duoFriend: { name: f.name, avatar: f.avatar, duoPose: "co-op" },
                          pose: "co-op",
                        }));
                      }
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <NexusAvatar config={f.avatar} size={36} />
                      <div>
                        <strong>{f.name}</strong>
                        <p>{f.handle} · Co-Op Squad Partner</p>
                      </div>
                    </div>
                    {avatar.duoFriend?.name === f.name && <Check size={16} className="purple-icon" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 9. Closet Presets */}
          {activeTab === "presets" && (
            <div className="builder-section">
              <label className="builder-label">Wardrobe Closet Presets</label>
              <p className="hint" style={{ marginBottom: 12 }}>
                Save your favorite looks into wardrobe slots and switch with one tap.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {savedPresets.map((preset, idx) => (
                  <div
                    key={preset.id}
                    className="card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: "var(--surface)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <NexusAvatar config={preset.avatar} size={42} />
                      <div>
                        <strong>{preset.name}</strong>
                        <p className="hint">{preset.avatar.outfit} · {preset.avatar.accessory}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => handleApplyPreset(preset.avatar)}
                      >
                        Equip
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleSaveToSlot(idx)}
                        title="Overwrite this slot with your current look"
                      >
                        Overwrite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. Speech Bubble & Backdrop */}
          {activeTab === "bubble" && (
            <div className="builder-section">
              <label className="builder-label">Floating Status Speech Bubble</label>
              <input
                type="text"
                className="bubble-input"
                value={avatar.statusBubble || ""}
                placeholder="What's your character saying? (e.g. Grinding Unimon Legends ⚔️)"
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
                  marginBottom: 16,
                }}
              />

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
        <footer className="avatar-builder-foot" style={{ borderTop: "1px solid var(--border)", padding: "12px 18px" }}>
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
