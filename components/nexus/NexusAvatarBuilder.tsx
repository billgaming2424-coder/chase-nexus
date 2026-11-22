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
  UserCheck,
} from "lucide-react";
import type { AvatarConfig, AvatarPreset } from "@/lib/types";
import { DEFAULT_AVATAR } from "@/lib/types";
import { sounds } from "@/lib/sounds";
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
  { label: "Cosmic Amethyst", value: "#7c3aed" },
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
  { id: "cyber-samurai", label: "Cyber Samurai Plate", desc: "Crimson & obsidian battle plate with neon crest" },
  { id: "void-paladin", label: "Void Paladin Plate", desc: "Purple void-forged plate with cyan mana core" },
  { id: "stealth-operative", label: "Stealth Operative", desc: "Tactical carbon weave with cyan night-vision badge" },
  { id: "unimon-master", label: "Unimon Grandmaster", desc: "Gold trim ceremonial robes with monster sphere crest" },
  { id: "retro-synthwave", label: "Retro Synthwave 84", desc: "Electric magenta & cyan geometric 80s track jacket" },
  { id: "royal-cape", label: "Chase Studios Royal Cape", desc: "Regal purple velvet cape with solid gold chain clasp" },
];

const AURAS: { id: NonNullable<AvatarConfig["aura"]>; label: string; desc: string; icon: string }[] = [
  { id: "none", label: "No Aura", desc: "Standard subtle profile look", icon: "🚫" },
  { id: "cosmic-void", label: "Cosmic Void Ring", desc: "Pulsing galaxy energy with starlight particles", icon: "🌌" },
  { id: "neon-lightning", label: "Neon Lightning", desc: "Electric cyan thunder bolts surrounding character", icon: "⚡" },
  { id: "golden-halo", label: "Celestial Golden Halo", desc: "Divine shining light and gold crown ring", icon: "👑" },
  { id: "flame-burst", label: "Inferno Flame Burst", desc: "Blazing fire streaks and embers", icon: "🔥" },
  { id: "glitch-matrix", label: "Cyber Glitch Matrix", desc: "High-tech scanlines and digital neon data", icon: "👾" },
];

const ACCESSORIES: {
  id: AvatarConfig["accessory"];
  label: string;
  category: "all" | "headwear" | "eyewear" | "face" | "jewelry";
  icon: string;
}[] = [
  { id: "none", label: "None", category: "all", icon: "🚫" },
  { id: "gamer-headset", label: "Chase Pro Headset & Mic", category: "headwear", icon: "🎧" },
  { id: "snapback", label: "Snapback Cap (Forward)", category: "headwear", icon: "🧢" },
  { id: "snapback-back", label: "Snapback Cap (Backwards)", category: "headwear", icon: "🧢" },
  { id: "beanie", label: "Knit Pom Beanie", category: "headwear", icon: "🧶" },
  { id: "crown", label: "Gold King Crown", category: "headwear", icon: "👑" },
  { id: "cat-ears", label: "Cyber Neko Headband", category: "headwear", icon: "🐱" },
  { id: "halo", label: "Angelic Celestial Halo", category: "headwear", icon: "✨" },
  { id: "demon-horns", label: "Crimson Demon Horns", category: "headwear", icon: "😈" },
  { id: "cyber-visor", label: "Neon Cyber Visor", category: "eyewear", icon: "🕶️" },
  { id: "aviators", label: "Gold Teardrop Aviators", category: "eyewear", icon: "🕶️" },
  { id: "heart-shades", label: "Ruby Heart Sunglasses", category: "eyewear", icon: "❤️" },
  { id: "vr-headset", label: "Holographic VR Goggles", category: "eyewear", icon: "🥽" },
  { id: "bandana", label: "Outlaw Neck/Face Bandana", category: "face", icon: "🧣" },
  { id: "oni-mask", label: "Cyber Oni Half-Mask", category: "face", icon: "👺" },
  { id: "earring", label: "Paired Gold Earring Hoops", category: "jewelry", icon: "💍" },
  { id: "paired-studs", label: "Paired Diamond Studs", category: "jewelry", icon: "💎" },
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
  { id: "portrait", label: "Default Persona", icon: "✨" },
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

const DUO_POSES = [
  { id: "co-op", label: "Co-Op Squad", icon: "🎮", desc: "Dual controllers & neon connection beam" },
  { id: "squad", label: "Back-to-Back", icon: "🛡️", desc: "Confident squad arms crossed" },
  { id: "high-five", label: "High Five!", icon: "⚡", desc: "Clapping hands with radiant energy spark" },
  { id: "boss-raid", label: "Mythic Raid", icon: "⚔️", desc: "Crossed swords & void aura ready for battle" },
  { id: "chill", label: "Boba & Chill", icon: "☕", desc: "Relaxing together with coffee & boba mugs" },
  { id: "celebrate", label: "Victory Drop", icon: "🎉", desc: "Gem drop & confetti celebration" },
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

const DEFAULT_PARTNERS = [
  {
    name: "Avery Quinn",
    handle: "@avery",
    avatar: {
      ...DEFAULT_AVATAR,
      skinTone: "#f3c5a8",
      hairStyle: "braids" as const,
      hairColor: "#b91c1c",
      outfit: "cyber-jacket" as const,
      accessory: "gamer-headset" as const,
      prop: "rgb-controller" as const,
    },
  },
  {
    name: "Samira Cole",
    handle: "@samira",
    avatar: {
      ...DEFAULT_AVATAR,
      skinTone: "#8c5332",
      hairStyle: "curls" as const,
      hairColor: "#22d3ee",
      outfit: "mech-pilot" as const,
      accessory: "vr-headset" as const,
      prop: "laser-sword" as const,
    },
  },
  {
    name: "Bill Chase",
    handle: "@billchase",
    avatar: {
      ...DEFAULT_AVATAR,
      skinTone: "#f8cbb0",
      hairStyle: "fade" as const,
      hairColor: "#18181b",
      outfit: "varsity-hoodie" as const,
      accessory: "snapback" as const,
      prop: "trophy" as const,
    },
  },
];

export function NexusAvatarBuilder({ isOpen, onClose }: NexusAvatarBuilderProps) {
  const { userProfile, setUserAvatar, userAvatar, friends } = useNexus();
  const [activeTab, setActiveTab] = useState<
    "face" | "hair" | "eyes" | "outfit" | "accessories" | "props" | "auras" | "duo" | "stickers" | "presets" | "bubble"
  >("face");

  const [accessoryFilter, setAccessoryFilter] = useState<"all" | "headwear" | "eyewear" | "face" | "jewelry">("all");

  const [avatar, setAvatar] = useState<AvatarConfig>(() => {
    return userProfile?.avatar_config || userAvatar || DEFAULT_AVATAR;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [savedPresets, setSavedPresets] = useState<AvatarPreset[]>(() => {
    try {
      const raw = localStorage.getItem("nexus-persona-presets");
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      { id: "p1", name: "Gamer Rig", avatar: { ...DEFAULT_AVATAR, prop: "rgb-controller", accessory: "gamer-headset" } },
      { id: "p2", name: "DEADEYE Outlaw", avatar: { ...DEFAULT_AVATAR, outfit: "survivor-duster", accessory: "bandana", prop: "laser-sword" } },
      { id: "p3", name: "Gala Velvet", avatar: { ...DEFAULT_AVATAR, outfit: "purple-tux", accessory: "crown", prop: "trophy" } },
    ];
  });

  if (!isOpen) return null;

  // Real friends first, then featured studio developers
  const partnerOptions = [
    ...friends.map((f) => ({
      name: f.name,
      handle: f.handle,
      avatar: f.avatar || DEFAULT_AVATAR,
      isRealFriend: true,
    })),
    ...DEFAULT_PARTNERS.map((p) => ({
      name: p.name,
      handle: p.handle,
      avatar: p.avatar,
      isRealFriend: false,
    })),
  ];

  const handleRandomize = () => {
    sounds.playPop();
    const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    setAvatar((prev) => ({
      ...prev,
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
      statusBubble: prev.statusBubble || "Exploring Chase Nexus ✨",
      customCaption: prev.customCaption || "",
    }));
  };

  const handleSave = async () => {
    try {
      sounds.playFanfare();
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
    sounds.playCoin();
    const updated = [...savedPresets];
    updated[slotIndex] = {
      id: `p-${slotIndex}`,
      name: `Look ${slotIndex + 1} (${avatar.outfit})`,
      avatar: { ...avatar },
    };
    setSavedPresets(updated);
    try {
      localStorage.setItem("nexus-persona-presets", JSON.stringify(updated));
    } catch {}
  };

  const handleApplyPreset = (presetAvatar: AvatarConfig) => {
    sounds.playPop();
    setAvatar({ ...presetAvatar });
  };

  const handleDownloadSVG = () => {
    const svgEl = document.querySelector(".avatar-preview-stage svg");
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nexus-persona-${avatar.pose || "avatar"}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredAccessories = ACCESSORIES.filter(
    (a) => accessoryFilter === "all" || a.category === accessoryFilter || a.id === "none"
  );

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 110 }}>
      <div
        className="dialog card avatar-studio-modal"
        role="dialog"
        aria-label="Nexus Persona Studio"
        style={{
          maxWidth: 680,
          width: "94vw",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 24,
          padding: 0,
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <header
          className="dialog-head"
          style={{
            padding: "16px 22px",
            background: "linear-gradient(180deg, rgba(20, 11, 34, 0.95) 0%, rgba(10, 6, 18, 0.9) 100%)",
            borderBottom: "1px solid rgba(168, 85, 247, 0.2)",
          }}
        >
          <div className="author-name">
            <span className="logo-mark auth-mini-logo" aria-hidden="true">
              <Sparkles size={16} />
            </span>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800 }}>Nexus Persona Studio</h3>
              <p className="hint" style={{ margin: 0, fontSize: "0.78rem" }}>
                Custom 2D Personas, Wardrobe Vault, Dynamic Duos & Holo-Stickers
              </p>
            </div>
          </div>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        {/* Live Stage with 3D Card Glow */}
        <div
          className="avatar-preview-stage"
          style={{
            position: "relative",
            padding: "20px 0 14px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, rgba(10, 6, 18, 0.6) 70%)",
            borderBottom: "1px solid rgba(168, 85, 247, 0.15)",
          }}
        >
          {avatar.duoFriend && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
                padding: "4px 12px",
                background: "rgba(124, 58, 237, 0.2)",
                border: "1px solid rgba(168, 85, 247, 0.4)",
                borderRadius: 20,
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#c084fc",
              }}
            >
              <span>👥 Persona Duo Active: {avatar.duoFriend.name}</span>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: "#f87171",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  padding: "0 2px",
                  fontWeight: 800,
                }}
                onClick={() => setAvatar((prev) => ({ ...prev, duoFriend: undefined }))}
                title="Switch back to Solo Persona"
              >
                ✕ Solo
              </button>
            </div>
          )}

          <NexusAvatar
            config={avatar}
            size={160}
            showStickerBadge
            showStatusBubble
            forceDuo={Boolean(avatar.duoFriend)}
          />

          <div
            className="avatar-preview-actions"
            style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}
          >
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleRandomize}
              title="Surprise me with a random combination"
            >
              <Shuffle size={14} />
              <span>Randomize Look</span>
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={handleDownloadSVG}
              title="Export high-resolution vector SVG"
            >
              <Download size={14} />
              <span>Export SVG</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <nav
          className="avatar-cat-tabs"
          aria-label="Avatar Categories"
          style={{
            overflowX: "auto",
            display: "flex",
            gap: 6,
            padding: "8px 14px",
            background: "rgba(10, 6, 18, 0.95)",
            borderBottom: "1px solid rgba(168, 85, 247, 0.15)",
          }}
        >
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
            <span>Fits (20)</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "accessories" ? "is-active" : ""}`}
            onClick={() => setActiveTab("accessories")}
          >
            <Headphones size={13} />
            <span>Gear & Hats</span>
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
            className={`cat-tab ${activeTab === "auras" ? "is-active" : ""}`}
            onClick={() => setActiveTab("auras")}
          >
            <Zap size={13} className="purple-icon" />
            <span>Aura (6)</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "duo" ? "is-active" : ""}`}
            onClick={() => setActiveTab("duo")}
          >
            <Users size={13} />
            <span>Persona Duo</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "stickers" ? "is-active" : ""}`}
            onClick={() => setActiveTab("stickers")}
          >
            <Flame size={13} />
            <span>Holo-Stickers</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "presets" ? "is-active" : ""}`}
            onClick={() => setActiveTab("presets")}
          >
            <Bookmark size={13} />
            <span>Vault</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "bubble" ? "is-active" : ""}`}
            onClick={() => setActiveTab("bubble")}
          >
            <MessageSquare size={13} />
            <span>Status & Theme</span>
          </button>
        </nav>

        {/* Category Controls Body */}
        <div className="avatar-controls-panel" style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          {/* 1. Face & Expression */}
          {activeTab === "face" && (
            <div className="builder-section">
              <label className="builder-label">Skin Tone Shade</label>
              <div className="swatch-grid">
                {SKIN_TONES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    className={`swatch-btn ${avatar.skinTone === t.value ? "is-active" : ""}`}
                    style={{ background: t.value }}
                    title={t.label}
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, skinTone: t.value }));
                    }}
                  />
                ))}
              </div>

              <label className="builder-label" style={{ marginTop: 16 }}>
                Mouth & Emotion Expression
              </label>
              <div className="choice-chip-grid">
                {MOUTHS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`choice-chip ${avatar.mouth === m.id ? "is-active" : ""}`}
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, mouth: m.id }));
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <label className="builder-label" style={{ marginTop: 16 }}>
                Facial Hair & Stubble
              </label>
              <div className="choice-chip-grid">
                {FACIAL_HAIR.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`choice-chip ${avatar.facialHair === f.id ? "is-active" : ""}`}
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, facialHair: f.id }));
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Hairstyles & Colors */}
          {activeTab === "hair" && (
            <div className="builder-section">
              <label className="builder-label">Hair Color Palette</label>
              <div className="swatch-grid">
                {HAIR_COLORS.map((h) => (
                  <button
                    key={h.value}
                    type="button"
                    className={`swatch-btn ${avatar.hairColor === h.value ? "is-active" : ""}`}
                    style={{ background: h.value }}
                    title={h.label}
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, hairColor: h.value }));
                    }}
                  />
                ))}
              </div>

              <label className="builder-label" style={{ marginTop: 16 }}>
                Hair Cut & Style (15 Distinct Cuts)
              </label>
              <div className="choice-chip-grid">
                {HAIR_STYLES.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    className={`choice-chip ${avatar.hairStyle === h.id ? "is-active" : ""}`}
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, hairStyle: h.id }));
                    }}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Eyes & Glow */}
          {activeTab === "eyes" && (
            <div className="builder-section">
              <label className="builder-label">Eye Shape</label>
              <div className="choice-chip-grid">
                {EYE_SHAPES.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    className={`choice-chip ${avatar.eyeShape === e.id ? "is-active" : ""}`}
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, eyeShape: e.id }));
                    }}
                  >
                    {e.label}
                  </button>
                ))}
              </div>

              <label className="builder-label" style={{ marginTop: 16 }}>
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
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, eyeColor: c.value }));
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4. Wardrobe (20 Outfits) */}
          {activeTab === "outfit" && (
            <div className="builder-section">
              <label className="builder-label">Chase Studios Fits (20 Universe Outfits)</label>
              <div className="outfit-card-stack" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {OUTFITS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className={`outfit-select-row ${avatar.outfit === o.id ? "is-active" : ""}`}
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, outfit: o.id }));
                    }}
                  >
                    <div>
                      <strong>{o.label}</strong>
                      <p className="hint" style={{ margin: "2px 0 0" }}>{o.desc}</p>
                    </div>
                    {avatar.outfit === o.id && <Check size={16} className="purple-icon" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5. Accessories, Hats & Gear (Properly Paired and Layered) */}
          {activeTab === "accessories" && (
            <div className="builder-section">
              <label className="builder-label">Gear, Hats & Eyewear</label>
              <p className="hint" style={{ marginBottom: 10 }}>
                Correctly layered and paired: hats tuck voluminous hair, bandanas cover the lower neck, and earrings are paired on both ears!
              </p>

              {/* Sub-category Filter Tabs */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {[
                  { id: "all" as const, label: "All Gear" },
                  { id: "headwear" as const, label: "Hats & Headwear" },
                  { id: "eyewear" as const, label: "Eyewear & Visors" },
                  { id: "face" as const, label: "Face & Bandanas" },
                  { id: "jewelry" as const, label: "Paired Earrings" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`chip ${accessoryFilter === tab.id ? "is-active" : ""}`}
                    style={{ fontSize: "0.75rem", padding: "4px 10px" }}
                    onClick={() => setAccessoryFilter(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="choice-chip-grid">
                {filteredAccessories.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className={`choice-chip ${avatar.accessory === a.id ? "is-active" : ""}`}
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, accessory: a.id }));
                    }}
                  >
                    <span>{a.icon}</span>
                    <span>{a.label}</span>
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
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, prop: p.id }));
                    }}
                  >
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Energy Auras */}
          {activeTab === "auras" && (
            <div className="builder-section">
              <label className="builder-label">Dynamic Energy Auras (Season 1 Cyber-Cosmetics)</label>
              <p className="hint" style={{ marginBottom: 10 }}>
                Equip a celestial cosmic aura, electric lightning shield, or digital glitch scanlines around your Persona!
              </p>
              <div className="choice-chip-grid">
                {AURAS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className={`choice-chip ${avatar.aura === a.id || (!avatar.aura && a.id === "none") ? "is-active" : ""}`}
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, aura: a.id }));
                    }}
                  >
                    <span>{a.icon}</span>
                    <span>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 7. Persona Duo Studio (Revamped Pair System) */}
          {activeTab === "duo" && (
            <div className="builder-section">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label className="builder-label" style={{ margin: 0 }}>
                  Persona Duo™ Dynamic Pair System
                </label>
                {avatar.duoFriend && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: "0.72rem", color: "#f87171" }}
                    onClick={() => setAvatar((prev) => ({ ...prev, duoFriend: undefined }))}
                  >
                    Reset to Solo Look
                  </button>
                )}
              </div>
              <p className="hint" style={{ marginBottom: 14 }}>
                Pose side-by-side with your real friends, squad mates, or studio developers in dynamic co-op scenes!
              </p>

              {/* Duo Poses / Action Scenes */}
              {avatar.duoFriend && (
                <div style={{ marginBottom: 18, padding: "12px 14px", background: "rgba(124, 58, 237, 0.1)", borderRadius: 14, border: "1px solid rgba(168, 85, 247, 0.3)" }}>
                  <label className="builder-label" style={{ fontSize: "0.82rem", color: "#c084fc", marginBottom: 8, display: "block" }}>
                    Select Duo Interaction Scene:
                  </label>
                  <div className="choice-chip-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}>
                    {DUO_POSES.map((dp) => (
                      <button
                        key={dp.id}
                        type="button"
                        className={`choice-chip ${avatar.duoFriend?.duoPose === dp.id ? "is-active" : ""}`}
                        style={{ fontSize: "0.78rem", padding: "6px 10px" }}
                        onClick={() => {
                          sounds.playCoin();
                          setAvatar((prev) => ({
                            ...prev,
                            duoFriend: prev.duoFriend ? { ...prev.duoFriend, duoPose: dp.id } : undefined,
                          }));
                        }}
                      >
                        <span>{dp.icon}</span>
                        <span>{dp.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Partner List */}
              <label className="builder-label" style={{ fontSize: "0.85rem", marginBottom: 8, display: "block" }}>
                Choose Partner to Pair With:
              </label>
              <div className="outfit-card-stack" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {partnerOptions.map((f) => {
                  const isSelected = avatar.duoFriend?.name === f.name;
                  return (
                    <button
                      key={f.handle}
                      type="button"
                      className={`outfit-select-row ${isSelected ? "is-active" : ""}`}
                      onClick={() => {
                        sounds.playPop();
                        if (isSelected) {
                          setAvatar((prev) => ({ ...prev, duoFriend: undefined }));
                        } else {
                          setAvatar((prev) => ({
                            ...prev,
                            duoFriend: {
                              name: f.name,
                              avatar: f.avatar,
                              duoPose: prev.duoFriend?.duoPose || "co-op",
                            },
                          }));
                        }
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <NexusAvatar config={f.avatar} size={38} />
                        <div>
                          <strong>{f.name}</strong>
                          <p className="hint" style={{ margin: "2px 0 0", fontSize: "0.75rem" }}>
                            {f.handle} · {f.isRealFriend ? "Connected Friend 🔥" : "Chase Studios Partner"}
                          </p>
                        </div>
                      </div>
                      {isSelected ? (
                        <span className="pill" style={{ background: "rgba(168, 85, 247, 0.3)", color: "#c084fc", fontSize: "0.72rem" }}>
                          Paired ✓
                        </span>
                      ) : (
                        <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>+ Pair</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 8. Action Frames & Holo-Stickers */}
          {activeTab === "stickers" && (
            <div className="builder-section">
              <label className="builder-label">Custom Action Frame Caption</label>
              <p className="hint" style={{ marginBottom: 6 }}>
                Type any text banner to stamp across your Persona action frame:
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
                  borderRadius: 10,
                  color: "var(--foreground)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  marginBottom: 16,
                }}
              />

              <label className="builder-label">Persona Action Frames (24 Expressions)</label>
              <div className="choice-chip-grid">
                {MOOD_POSES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`choice-chip ${avatar.pose === p.id ? "is-active" : ""}`}
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, pose: p.id }));
                    }}
                  >
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 9. Persona Vault Presets */}
          {activeTab === "presets" && (
            <div className="builder-section">
              <label className="builder-label">Persona Wardrobe Vault</label>
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
                      borderRadius: 14,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <NexusAvatar config={preset.avatar} size={42} />
                      <div>
                        <strong>{preset.name}</strong>
                        <p className="hint" style={{ margin: "2px 0 0", fontSize: "0.75rem" }}>
                          {preset.avatar.outfit} · {preset.avatar.accessory}
                        </p>
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
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. Status Bubble & Theme */}
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
                  borderRadius: 10,
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                  marginBottom: 16,
                }}
              />

              <label className="builder-label">Persona Backdrop Gradient</label>
              <div className="choice-chip-grid">
                {BACKGROUNDS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`choice-chip ${avatar.background === b.id ? "is-active" : ""}`}
                    onClick={() => {
                      sounds.playPop();
                      setAvatar((prev) => ({ ...prev, background: b.id }));
                    }}
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
        <footer
          className="avatar-builder-foot"
          style={{
            borderTop: "1px solid var(--border)",
            padding: "14px 22px",
            background: "rgba(10, 6, 18, 0.95)",
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          {savedSuccess ? (
            <div className="auth-success-banner" style={{ width: "100%", textAlign: "center", fontWeight: 700 }}>
              ✓ Nexus Persona Saved to Profile & Cloud!
            </div>
          ) : (
            <>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                <Check size={16} />
                <span>Save Nexus Persona</span>
              </button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}
