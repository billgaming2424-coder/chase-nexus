"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mic,
  MicOff,
  Radio,
  Users,
  Volume2,
  Hand,
  Sparkles,
  Flame,
  Music,
  Share2,
  Play,
  Pause,
  Award,
} from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
import { sounds } from "@/lib/sounds";

interface StageRoom {
  id: string;
  title: string;
  hostName: string;
  hostRole: string;
  topic: string;
  listeners: number;
  tags: string[];
}

export function AudioStagesScreen() {
  const { userAvatar, walletBalance } = useNexus();
  const [activeRoomId, setActiveRoomId] = useState("stage-1");
  const [isMuted, setIsMuted] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [audioWave, setAudioWave] = useState([40, 65, 80, 50, 95, 30, 85, 60, 75, 45, 90, 35]);
  const [soundboardToast, setSoundboardToast] = useState<string | null>(null);

  const ROOMS: StageRoom[] = [
    {
      id: "stage-1",
      title: "Bill Chase Live UE5 DEADEYE Dev Talk",
      hostName: "Bill Chase",
      hostRole: "Founder & Game Director",
      topic: "Unreal Engine 5 physics, weapon workshops, and open-world netcode",
      listeners: 142,
      tags: ["UnrealEngine", "DEADEYE", "DevStream"],
    },
    {
      id: "stage-2",
      title: "Unimon Legends Boss Raid Tactics & Tier Lists",
      hostName: "Samira Cole",
      hostRole: "Lead Battle Designer",
      topic: "Strategy breakdown for Mythic Voidscale encounters and optimal party builds",
      listeners: 89,
      tags: ["Unimon", "Raids", "Strategy"],
    },
    {
      id: "stage-3",
      title: "Lo-Fi Beats & Chill Code Jam",
      hostName: "Jordan Hale",
      hostRole: "Community Producer",
      topic: "Relaxing late-night coding session with official Chase Studios ambient OST",
      listeners: 57,
      tags: ["Music", "Chill", "Coding"],
    },
  ];

  const currentRoom = ROOMS.find((r) => r.id === activeRoomId) ?? ROOMS[0];

  // Animate dynamic audio waveform
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioWave((prev) =>
        prev.map(() => Math.floor(Math.random() * 70) + 25)
      );
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const triggerSound = (name: string, playFn: () => void) => {
    playFn();
    setSoundboardToast(name);
    setTimeout(() => setSoundboardToast(null), 1800);
  };

  const toggleHandRaise = () => {
    sounds.playPop();
    setIsHandRaised((prev) => {
      const next = !prev;
      alert(next ? "Hand raised! The host has been notified." : "Hand lowered.");
      return next;
    });
  };

  return (
    <section className="page audio-stages-page">
      <header className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <p className="eyebrow">Nexus Audio Pods</p>
          <h1>Live Voice Stages</h1>
          <p>
            Drop-in live audio rooms for developer panels, gaming raid strategy, and community lounges.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="pill" style={{ background: "rgba(34, 197, 94, 0.2)", color: "#4ade80", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span className="status-dot live" /> 3 Live Stages Active
          </span>
        </div>
      </header>

      {/* Stage Selector Pills */}
      <div className="tabs" role="tablist" style={{ marginBottom: 18, overflowX: "auto" }}>
        {ROOMS.map((room) => (
          <button
            key={room.id}
            type="button"
            className={`tab ${activeRoomId === room.id ? "is-active" : ""}`}
            onClick={() => {
              sounds.playPop();
              setActiveRoomId(room.id);
            }}
          >
            <Radio size={14} className={activeRoomId === room.id ? "purple-icon" : undefined} />
            <span>{room.title}</span>
            <small style={{ opacity: 0.7 }}>({room.listeners})</small>
          </button>
        ))}
      </div>

      {/* Main Stage Card */}
      <div className="card live-stage-card" style={{ background: "radial-gradient(circle at 50% 20%, #25103f 0%, #0c0617 100%)", border: "1px solid rgba(168, 85, 247, 0.35)", borderRadius: 20, padding: 24, marginBottom: 20 }}>
        {/* Stage Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span className="pill" style={{ background: "rgba(168, 85, 247, 0.25)", color: "#c084fc", fontWeight: 800 }}>
                🔴 LIVE AUDIO STAGE
              </span>
              <span className="pill">{currentRoom.listeners} Listeners</span>
            </div>
            <h2 style={{ margin: "4px 0" }}>{currentRoom.title}</h2>
            <p className="hint" style={{ margin: 0 }}>{currentRoom.topic}</p>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              className={`btn ${isHandRaised ? "btn-secondary is-on" : "btn-secondary"}`}
              style={{ gap: 6, borderRadius: 20 }}
              onClick={toggleHandRaise}
            >
              <Hand size={16} /> {isHandRaised ? "Hand Raised ✋" : "Raise Hand"}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ gap: 6, borderRadius: 20 }}
              onClick={() => {
                sounds.playPop();
                setIsMuted((m) => !m);
              }}
            >
              {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
              {isMuted ? "Unmute Mic" : "Mute Mic"}
            </button>
          </div>
        </div>

        {/* Live Audio Waveform Visualizer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, height: 60, margin: "16px 0", background: "rgba(0,0,0,0.35)", borderRadius: 14, padding: "0 20px" }}>
          {audioWave.map((h, idx) => (
            <div
              key={idx}
              style={{
                width: 6,
                height: `${h}%`,
                background: "linear-gradient(180deg, #38bdf8 0%, #a855f7 100%)",
                borderRadius: 99,
                transition: "height 0.15s ease",
              }}
            />
          ))}
          <span style={{ fontSize: "0.8rem", color: "#c084fc", fontWeight: 700, marginLeft: 14 }}>
            Spatial WebRTC Voice Active · 48kHz HD
          </span>
        </div>

        {/* Speakers Tier */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", margin: "0 0 12px" }}>
            Speakers on Stage
          </h4>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {/* Host */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ position: "relative" }}>
                <span className="story-ring is-yours" style={{ padding: 4, display: "inline-block", borderRadius: "50%" }}>
                  <NexusAvatar config={userAvatar} size={58} showStickerBadge />
                </span>
                <span className="pill" style={{ position: "absolute", bottom: -4, right: -4, fontSize: "0.65rem", padding: "1px 6px", background: "#7c3aed" }}>
                  Host
                </span>
              </div>
              <strong style={{ fontSize: "0.88rem" }}>{currentRoom.hostName}</strong>
              <small style={{ color: "var(--muted)", fontSize: "0.72rem" }}>{currentRoom.hostRole}</small>
            </div>

            {/* Guest Speaker 1 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <NexusAvatar
                config={{
                  ...userAvatar,
                  hairStyle: "braids",
                  hairColor: "#b91c1c",
                  outfit: "cyber-jacket",
                  accessory: "gamer-headset",
                }}
                size={58}
              />
              <strong style={{ fontSize: "0.88rem" }}>Avery Quinn</strong>
              <small style={{ color: "var(--muted)", fontSize: "0.72rem" }}>Community Co-Host</small>
            </div>

            {/* Guest Speaker 2 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <NexusAvatar
                config={{
                  ...userAvatar,
                  hairStyle: "curls",
                  hairColor: "#22d3ee",
                  outfit: "void-paladin",
                  accessory: "vr-headset",
                }}
                size={58}
              />
              <strong style={{ fontSize: "0.88rem" }}>Samira Cole</strong>
              <small style={{ color: "var(--muted)", fontSize: "0.72rem" }}>Lead Designer</small>
            </div>
          </div>
        </div>

        {/* Live Soundboard Deck */}
        <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 16, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
              <Volume2 size={16} className="purple-icon" /> Stage Soundboard Deck
            </span>
            {soundboardToast && (
              <span className="pill" style={{ background: "rgba(168, 85, 247, 0.3)", color: "#c084fc", animation: "pulse 0.3s ease" }}>
                Played {soundboardToast}!
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 14 }}
              onClick={() => triggerSound("Applause Pop", () => sounds.playPop())}
            >
              👏 Pop Reaction
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 14 }}
              onClick={() => triggerSound("Gem Chime", () => sounds.playCoin())}
            >
              💎 Gem Drop Chime
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 14 }}
              onClick={() => triggerSound("Victory Fanfare", () => sounds.playFanfare())}
            >
              🎺 GG Fanfare
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 14 }}
              onClick={() => triggerSound("Laser Zap", () => sounds.playZap())}
            >
              ⚡ Energy Zap
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 14 }}
              onClick={() => triggerSound("Critical Hit", () => sounds.playHit())}
            >
              💥 Impact Strike
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
