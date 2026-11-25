"use client";

import { useState } from "react";
import {
  Sparkles,
  User,
  AtSign,
  FileText,
  Check,
  ChevronRight,
  ChevronLeft,
  Coins,
  ShieldCheck,
  Flame,
  Dice5,
  Users,
} from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
import { sounds } from "@/lib/sounds";

import type { AvatarConfig, OnboardingData } from "@/lib/types";

interface AccountSetupWizardProps {
  isOpen: boolean;
  onClose?: () => void;
}

const INTEREST_TOPICS = [
  { id: "gaming", label: "Gaming & RPGs", icon: "🎮", tag: "#Gaming" },
  { id: "unimon", label: "Unimon Legends", icon: "🦊", tag: "#UnimonLegends" },
  { id: "deadeye", label: "DEADEYE Survival", icon: "🎯", tag: "#DEADEYE" },
  { id: "gamedev", label: "Unreal Engine & Dev", icon: "🛠️", tag: "#GameDev" },
  { id: "audio", label: "Live Voice Stages", icon: "🎙️", tag: "#AudioPods" },
  { id: "arcade", label: "Arcade Realm", icon: "🕹️", tag: "#Arcade" },
  { id: "art", label: "Digital Art & 3D", icon: "🎨", tag: "#Art" },
  { id: "esports", label: "Esports & Tourneys", icon: "🏆", tag: "#Esports" },
  { id: "music", label: "Lo-Fi Beats & Ambient", icon: "🎵", tag: "#Music" },
];

const QUICK_SKINS = ["#f8cbb0", "#f3c5a8", "#e5b897", "#d89e7c", "#b87856", "#8d5538", "#603623", "#3d1f14"];
const QUICK_HAIRS = [
  { id: "fade" as const, label: "Fade" },
  { id: "buzz" as const, label: "Buzz" },
  { id: "spikes" as const, label: "Spikes" },
  { id: "braids" as const, label: "Braids" },
  { id: "curls" as const, label: "Curls" },
  { id: "slick-back" as const, label: "Slick" },
  { id: "bun" as const, label: "Bun" },
  { id: "neon-locs" as const, label: "Neon Locs" },
];
const QUICK_OUTFITS = [
  { id: "cyber-samurai" as const, label: "Cyber Samurai" },
  { id: "void-paladin" as const, label: "Void Paladin" },
  { id: "varsity-hoodie" as const, label: "Varsity Hoodie" },
  { id: "retro-synthwave" as const, label: "Retro Synth" },
  { id: "trainer-vest" as const, label: "Trainer Vest" },
  { id: "royal-cape" as const, label: "Royal Cape" },
];
const QUICK_AURAS = [
  { id: "neon-lightning" as const, label: "⚡ Neon Lightning" },
  { id: "cosmic-void" as const, label: "🌌 Cosmic Void" },
  { id: "golden-halo" as const, label: "👑 Golden Halo" },
  { id: "flame-burst" as const, label: "🔥 Flame Burst" },
  { id: "glitch-matrix" as const, label: "👾 Glitch Matrix" },
  { id: "none" as const, label: "🚫 None" },
];

export function AccountSetupWizard({ isOpen, onClose }: AccountSetupWizardProps) {
  const { currentUser, userProfile, userAvatar, completeOnboarding } = useNexus();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Identity
  const defaultHandle = currentUser?.email
    ? `@${currentUser.email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "").slice(0, 18)}`
    : "@chase_member";
  const [displayName, setDisplayName] = useState(userProfile?.display_name || "Chase Member");
  const [handle, setHandle] = useState(defaultHandle);
  const [bio, setBio] = useState("Exploring Chase Nexus · Gamer & Creative Explorer.");

  // Step 2: Avatar Customization
  const [avatar, setAvatar] = useState<AvatarConfig>(userAvatar);

  // Step 3: Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "#Gaming",
    "#DEADEYE",
    "#UnimonLegends",
  ]);

  // Step 4: Followed Creators (Zero forced friends!)
  const [followedHandles, setFollowedHandles] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleNext = () => {
    sounds.playPop();
    if (step < 5) {
      const nextStep = (step + 1) as 1 | 2 | 3 | 4 | 5;
      setStep(nextStep);
      if (nextStep === 5) {
        sounds.playFanfare();
        sounds.playCoin();
      }
    }
  };

  const handlePrev = () => {
    sounds.playPop();
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3 | 4 | 5);
    }
  };

  const toggleInterest = (tag: string) => {
    sounds.playPop();
    setSelectedInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleFollowCreator = (h: string) => {
    sounds.playCoin();
    setFollowedHandles((prev) =>
      prev.includes(h) ? prev.filter((item) => item !== h) : [...prev, h]
    );
  };

  const handleRandomizeAvatar = () => {
    sounds.playPop();
    const randomSkin = QUICK_SKINS[Math.floor(Math.random() * QUICK_SKINS.length)];
    const randomHair = QUICK_HAIRS[Math.floor(Math.random() * QUICK_HAIRS.length)].id;
    const randomOutfit = QUICK_OUTFITS[Math.floor(Math.random() * QUICK_OUTFITS.length)].id;
    const randomAura = QUICK_AURAS[Math.floor(Math.random() * QUICK_AURAS.length)].id;
    setAvatar((prev) => ({
      ...prev,
      skinTone: randomSkin,
      hairStyle: randomHair,
      outfit: randomOutfit,
      aura: randomAura,
    }));
  };

  const handleFinish = async () => {
    const cleanHandle = handle.startsWith("@") ? handle : `@${handle}`;
    const data: OnboardingData = {
      displayName: displayName.trim() || "Chase Member",
      handle: cleanHandle,
      bio: bio.trim(),
      interests: selectedInterests,
      avatar,
      followedCreators: followedHandles,
    };
    await completeOnboarding(data);
    if (onClose) onClose();
  };

  return (
    <div className="modal-backdrop" style={{ zIndex: 120 }}>
      <div
        className="dialog card auth-modal-body"
        style={{
          maxWidth: 540,
          width: "92vw",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 24,
          overflow: "hidden",
          padding: 0,
        }}
        role="dialog"
        aria-label="Account Setup Wizard"
      >
        {/* Wizard Header & Progress Bar */}
        <header
          style={{
            padding: "18px 22px 14px",
            background: "linear-gradient(180deg, rgba(20, 11, 34, 0.95) 0%, rgba(10, 6, 18, 0.9) 100%)",
            borderBottom: "1px solid rgba(168, 85, 247, 0.2)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="logo-mark auth-mini-logo">N</span>
              <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#fff", letterSpacing: "0.04em" }}>
                CHASE NEXUS SETUP
              </span>
            </div>
            <span className="pill" style={{ background: "rgba(168, 85, 247, 0.2)", color: "#c084fc", fontWeight: 700 }}>
              Step {step} of 5
            </span>
          </div>

          {/* Stepper Dots */}
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 99,
                  background:
                    s <= step
                      ? "linear-gradient(90deg, #9333ea, #38bdf8)"
                      : "rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </header>

        {/* Wizard Step Body */}
        <div style={{ padding: "20px 22px", overflowY: "auto", flex: 1 }}>
          {/* STEP 1: IDENTITY & PROFILE */}
          {step === 1 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <h2 style={{ margin: "0 0 6px", fontSize: "1.35rem" }}>Create Your Identity</h2>
                <p className="hint" style={{ margin: 0 }}>
                  Choose your display name, unique handle, and bio for your verified Chase Account.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="form-group">
                  <label htmlFor="wizard-name" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--silver)" }}>
                    Display Name
                  </label>
                  <div className="input-with-icon">
                    <User size={16} className="input-icon" />
                    <input
                      id="wizard-name"
                      type="text"
                      placeholder="Your Full Name or Gamer Tag"
                      value={displayName}
                      maxLength={40}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="wizard-handle" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--silver)" }}>
                    Unique Username Handle
                  </label>
                  <div className="input-with-icon">
                    <AtSign size={16} className="input-icon" />
                    <input
                      id="wizard-handle"
                      type="text"
                      placeholder="@yourhandle"
                      value={handle}
                      maxLength={24}
                      onChange={(e) => {
                        let val = e.target.value.toLowerCase().replace(/[^a-z0-9_@]/g, "");
                        if (!val.startsWith("@") && val.length > 0) val = `@${val}`;
                        setHandle(val);
                      }}
                    />
                  </div>
                  <small style={{ color: "var(--muted)", fontSize: "0.74rem", marginTop: 4, display: "block" }}>
                    Your permanent URL handle across Chase Nexus and Chase Studios.
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="wizard-bio" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--silver)" }}>
                    Bio & Tagline
                  </label>
                  <div className="input-with-icon" style={{ alignItems: "flex-start" }}>
                    <textarea
                      id="wizard-bio"
                      rows={3}
                      placeholder="Tell the community what games, tech, and creative genres you love..."
                      value={bio}
                      maxLength={180}
                      onChange={(e) => setBio(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        background: "var(--surface)",
                        border: "1px solid var(--line)",
                        color: "var(--text)",
                        borderRadius: 12,
                        fontSize: "0.88rem",
                        resize: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PERSONA CUSTOMIZER */}
          {step === 2 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <h2 style={{ margin: "0 0 6px", fontSize: "1.35rem" }}>Design Your Nexus Persona</h2>
                <p className="hint" style={{ margin: 0 }}>
                  Customize your signature 2D persona, wardrobe, and animated energy aura.
                </p>
              </div>

              {/* Central Avatar Stage */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(10, 6, 18, 0.6) 70%)",
                  borderRadius: 18,
                  padding: "16px 12px",
                  marginBottom: 16,
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                }}
              >
                <NexusAvatar config={avatar} size={110} showStickerBadge />
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: 10, borderRadius: 16, gap: 6 }}
                  onClick={handleRandomizeAvatar}
                >
                  <Dice5 size={14} /> Randomize Look
                </button>
              </div>

              {/* Quick Swatches & Categories */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Skin tone */}
                <div>
                  <small style={{ color: "var(--silver)", fontWeight: 700, display: "block", marginBottom: 6 }}>
                    Skin Tone
                  </small>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {QUICK_SKINS.map((tone) => (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => {
                          sounds.playPop();
                          setAvatar((prev) => ({ ...prev, skinTone: tone }));
                        }}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: tone,
                          border: avatar.skinTone === tone ? "2px solid #fff" : "1px solid rgba(255,255,255,0.2)",
                          boxShadow: avatar.skinTone === tone ? "0 0 8px #fff" : "none",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Outfit */}
                <div>
                  <small style={{ color: "var(--silver)", fontWeight: 700, display: "block", marginBottom: 6 }}>
                    Season 1 Wardrobe
                  </small>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {QUICK_OUTFITS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`chip ${avatar.outfit === item.id ? "is-active" : ""}`}
                        style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                        onClick={() => {
                          sounds.playPop();
                          setAvatar((prev) => ({ ...prev, outfit: item.id }));
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aura */}
                <div>
                  <small style={{ color: "var(--silver)", fontWeight: 700, display: "block", marginBottom: 6 }}>
                    Animated Energy Aura
                  </small>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {QUICK_AURAS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`chip ${avatar.aura === item.id ? "is-active" : ""}`}
                        style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                        onClick={() => {
                          sounds.playPop();
                          setAvatar((prev) => ({ ...prev, aura: item.id }));
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PICK TOPIC INTERESTS */}
          {step === 3 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 18 }}>
                <h2 style={{ margin: "0 0 6px", fontSize: "1.35rem" }}>Pick Your Interests</h2>
                <p className="hint" style={{ margin: 0 }}>
                  Select 1 or more topics to customize your personal feed and discovery space.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
                {INTEREST_TOPICS.map((topic) => {
                  const isSelected = selectedInterests.includes(topic.tag);
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => toggleInterest(topic.tag)}
                      style={{
                        padding: "12px 10px",
                        borderRadius: 14,
                        background: isSelected
                          ? "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(56, 189, 248, 0.2))"
                          : "rgba(255, 255, 255, 0.04)",
                        border: isSelected
                          ? "1.5px solid rgba(168, 85, 247, 0.8)"
                          : "1px solid rgba(255, 255, 255, 0.08)",
                        color: isSelected ? "#fff" : "var(--silver)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                        textAlign: "center",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span style={{ fontSize: "1.5rem" }}>{topic.icon}</span>
                      <strong style={{ fontSize: "0.82rem" }}>{topic.label}</strong>
                      <small style={{ color: isSelected ? "#c084fc" : "var(--muted)", fontSize: "0.7rem" }}>
                        {topic.tag}
                      </small>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: FOLLOW CREATORS (ZERO FORCED FRIENDS) */}
          {step === 4 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <h2 style={{ margin: "0 0 6px", fontSize: "1.35rem" }}>Follow Creators & Friends</h2>
                <p className="hint" style={{ margin: "0 0 10px" }}>
                  Find real people once account discovery is available.
                </p>
                <span className="pill" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#4ade80", fontSize: "0.75rem" }}>
                  No automatic follows
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p className="hint">Real account discovery is coming soon. You can continue without following anyone.</p>
              </div>
            </div>
          )}

          {/* STEP 5: WELCOME & BONUS GEMS */}
          {step === 5 && (
            <div style={{ textAlign: "center", padding: "16px 8px" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>🎉</div>
              <h2 style={{ fontSize: "1.5rem", margin: "0 0 8px", color: "#fff" }}>
                Welcome to Chase Nexus!
              </h2>
              <p className="hint" style={{ maxWidth: 380, margin: "0 auto 20px" }}>
                Your verified Chase Studios Account is fully configured. Enjoy your welcome drop of virtual gems!
              </p>

              {/* Reward Card */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(245, 158, 11, 0.25) 100%)",
                  border: "1px solid rgba(245, 158, 11, 0.5)",
                  borderRadius: 18,
                  padding: "16px 20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 24,
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
                }}
              >
                <Coins size={32} style={{ color: "#fbbf24" }} />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff" }}>+250 Nexus Gems</div>
                  <small style={{ color: "#fbbf24", fontWeight: 700 }}>
                    Credited to your creator & marketplace wallet
                  </small>
                </div>
              </div>

              {/* Final Identity Card Preview */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  borderRadius: 16,
                  padding: 16,
                  maxWidth: 320,
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textAlign: "left",
                }}
              >
                <NexusAvatar config={avatar} size={54} showStickerBadge />
                <div>
                  <strong style={{ fontSize: "0.95rem", color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
                    {displayName} <ChaseBadge type="chase-account" />
                  </strong>
                  <span style={{ fontSize: "0.8rem", color: "#c084fc", fontWeight: 600 }}>{handle}</span>
                  <small style={{ display: "block", color: "var(--muted)", fontSize: "0.72rem", marginTop: 2 }}>
                    {followedHandles.length} Following · 0 Generic Friends
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 22px",
            background: "var(--surface)",
            borderTop: "1px solid var(--line)",
          }}
        >
          {step > 1 && step < 5 ? (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 14, gap: 4 }}
              onClick={handlePrev}
            >
              <ChevronLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              className="btn btn-primary"
              style={{ borderRadius: 16, padding: "8px 22px", gap: 6 }}
              onClick={handleNext}
              disabled={step === 3 && selectedInterests.length === 0}
            >
              <span>{step === 4 ? "Complete Setup" : "Next Step"}</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary full-width"
              style={{
                borderRadius: 18,
                padding: "12px 24px",
                fontSize: "1rem",
                background: "linear-gradient(135deg, #9333ea, #38bdf8)",
              }}
              onClick={handleFinish}
            >
              Launch My Feed 🚀
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
