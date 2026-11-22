"use client";

import React from "react";
import type { AvatarConfig } from "@/lib/types";
import { DEFAULT_AVATAR } from "@/lib/types";

interface NexusAvatarProps {
  config?: AvatarConfig | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "hero" | number;
  className?: string;
  showStickerBadge?: boolean;
  showStatusBubble?: boolean;
}

const SIZES = {
  xs: 24,
  sm: 32,
  md: 44,
  lg: 64,
  xl: 96,
  hero: 160,
};

export function NexusAvatar({
  config,
  size = "md",
  className = "",
  showStickerBadge = false,
  showStatusBubble = false,
}: NexusAvatarProps) {
  const c = config || DEFAULT_AVATAR;
  const dimension = typeof size === "number" ? size : SIZES[size] || 44;

  const skin = c.skinTone || "#f8cbb0";
  const hair = c.hairColor || "#1e1b2e";
  const eye = c.eyeColor || "#7c3aed";

  return (
    <div
      className={`nexus-avatar-wrap ${className}`}
      style={{
        width: dimension,
        height: dimension,
        display: "inline-block",
        position: "relative",
        borderRadius: "50%",
        flexShrink: 0,
      }}
      aria-label="Nexus Bitmoji Avatar"
    >
      {showStatusBubble && c.statusBubble && (
        <div
          className="avatar-status-speech-bubble"
          style={{
            position: "absolute",
            bottom: "105%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(20, 11, 34, 0.95)",
            border: "1px solid rgba(168, 85, 247, 0.5)",
            borderRadius: "12px",
            padding: "4px 8px",
            fontSize: "11px",
            fontWeight: 700,
            color: "#ffffff",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {c.statusBubble}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid rgba(168, 85, 247, 0.5)",
            }}
          />
        </div>
      )}

      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        style={{ borderRadius: "50%", overflow: "hidden", display: "block" }}
      >
        <defs>
          {/* Background Gradients */}
          <linearGradient id="bg-purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b0764" />
            <stop offset="50%" stop-color="#1e1035" />
            <stop offset="100%" stop-color="#090514" />
          </linearGradient>
          <linearGradient id="bg-neon-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0891b2" />
            <stop offset="100%" stop-color="#164e63" />
          </linearGradient>
          <linearGradient id="bg-void-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#171026" />
            <stop offset="100%" stop-color="#07050d" />
          </linearGradient>
          <linearGradient id="bg-gold-burst" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#eab308" />
            <stop offset="100%" stop-color="#713f12" />
          </linearGradient>
          <linearGradient id="bg-fire-streak" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ef4444" />
            <stop offset="50%" stop-color="#f97316" />
            <stop offset="100%" stop-color="#7c2d12" />
          </linearGradient>
          <radialGradient id="bg-cosmic-stars" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stop-color="#6366f1" />
            <stop offset="50%" stop-color="#1e1b4b" />
            <stop offset="100%" stop-color="#090514" />
          </radialGradient>
        </defs>

        {/* 1. Backdrop */}
        <circle cx="100" cy="100" r="100" fill={`url(#bg-${c.background || "purple-gradient"})`} />
        {c.background === "cosmic-stars" && (
          <g opacity="0.6">
            <circle cx="45" cy="45" r="1.5" fill="#ffffff" />
            <circle cx="160" cy="40" r="2" fill="#22d3ee" />
            <circle cx="140" cy="160" r="1.5" fill="#c084fc" />
            <circle cx="35" cy="130" r="2" fill="#ffffff" />
          </g>
        )}

        {/* 2. Neck & Shoulders Base */}
        <path d="M78 140 L122 140 L122 170 L78 170 Z" fill={skin} />
        <path d="M78 140 Q100 152 122 140 L122 146 Q100 158 78 146 Z" fill="#000000" opacity="0.15" />

        {/* 3. Outfits / Torso */}
        {c.outfit === "varsity-hoodie" && (
          <g id="outfit-varsity">
            <path d="M42 165 C48 148 68 142 100 142 C132 142 152 148 158 165 L165 200 L35 200 Z" fill="#140a24" />
            <path d="M85 142 L100 162 L115 142" stroke="#a855f7" stroke-width="4" fill="none" />
            <circle cx="100" cy="180" r="10" fill="#a855f7" />
            <text x="100" y="184" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="900" font-family="sans-serif">CS</text>
          </g>
        )}

        {c.outfit === "cyber-jacket" && (
          <g id="outfit-cyber">
            <path d="M40 165 C46 146 68 140 100 140 C132 140 154 146 160 165 L168 200 L32 200 Z" fill="#0f172a" />
            <path d="M70 144 L100 178 L78 200" fill="#06b6d4" />
            <path d="M130 144 L100 178 L122 200" fill="#0891b2" />
            <line x1="45" y1="180" x2="60" y2="180" stroke="#22d3ee" stroke-width="3" />
            <line x1="140" y1="180" x2="155" y2="180" stroke="#22d3ee" stroke-width="3" />
          </g>
        )}

        {c.outfit === "survivor-duster" && (
          <g id="outfit-duster">
            <path d="M65 146 L100 146 L135 146 L135 200 L65 200 Z" fill="#b91c1c" />
            <line x1="100" y1="146" x2="100" y2="200" stroke="#ffffff" stroke-width="2" />
            <path d="M38 166 C44 146 64 142 80 142 L72 200 L32 200 Z" fill="#5c2e0b" />
            <path d="M162 166 C156 146 136 142 120 142 L128 200 L168 200 Z" fill="#5c2e0b" />
          </g>
        )}

        {c.outfit === "trainer-vest" && (
          <g id="outfit-trainer">
            <path d="M40 165 C48 146 68 142 100 142 C132 142 152 146 160 165 L168 200 L32 200 Z" fill="#1e3a8a" />
            <path d="M80 144 L100 168 L120 144" fill="#fbbf24" />
            <circle cx="100" cy="182" r="8" fill="#ffffff" stroke="#ef4444" stroke-width="3" />
          </g>
        )}

        {c.outfit === "nexus-tee" && (
          <g id="outfit-tee">
            <path d="M42 165 C48 148 68 144 100 144 C132 144 152 148 158 165 L166 200 L34 200 Z" fill="#18181b" />
            <polygon points="94,168 100,162 106,168 100,174" fill="#c084fc" />
            <text x="100" y="186" text-anchor="middle" fill="#22d3ee" font-size="8" font-weight="800" letter-spacing="1">NEXUS</text>
          </g>
        )}

        {c.outfit === "armor" && (
          <g id="outfit-armor">
            <path d="M38 165 C46 144 68 138 100 138 C132 138 154 144 162 165 L170 200 L30 200 Z" fill="#334155" />
            <path d="M32 162 L60 146 L68 185 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5" />
            <path d="M168 162 L140 146 L132 185 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5" />
            <polygon points="100,150 110,165 100,180 90,165" fill="#a855f7" />
          </g>
        )}

        {c.outfit === "space-suit" && (
          <g id="outfit-space">
            <path d="M38 165 C46 144 68 140 100 140 C132 140 154 144 162 165 L170 200 L30 200 Z" fill="#e2e8f0" />
            <path d="M80 142 L120 142 L120 185 L80 185 Z" fill="#38bdf8" opacity="0.3" stroke="#0284c7" stroke-width="1" />
            <circle cx="100" cy="165" r="6" fill="#ef4444" />
          </g>
        )}

        {c.outfit === "retro-arcade" && (
          <g id="outfit-retro">
            <path d="M40 165 C48 146 68 142 100 142 C132 142 152 146 160 165 L168 200 L32 200 Z" fill="#4c1d95" />
            <path d="M50 172 L150 172" stroke="#f43f5e" stroke-width="4" />
            <path d="M50 180 L150 180" stroke="#f59e0b" stroke-width="3" />
            <path d="M50 186 L150 186" stroke="#06b6d4" stroke-width="2" />
          </g>
        )}

        {c.outfit === "purple-tux" && (
          <g id="outfit-tux">
            <path d="M38 165 C46 144 68 138 100 138 C132 138 154 144 162 165 L170 200 L30 200 Z" fill="#581c87" />
            {/* White shirt triangle */}
            <polygon points="86,142 114,142 100,185" fill="#ffffff" />
            {/* Purple bow tie */}
            <polygon points="94,148 106,148 100,153" fill="#a855f7" />
            <polygon points="94,158 106,158 100,153" fill="#a855f7" />
            <circle cx="100" cy="153" r="2.5" fill="#c084fc" />
          </g>
        )}

        {/* 4. Head & Face */}
        <g id="head-base">
          <circle cx="56" cy="100" r="14" fill={skin} />
          <circle cx="144" cy="100" r="14" fill={skin} />
          <circle cx="56" cy="100" r="8" fill="#000000" opacity="0.1" />
          <circle cx="144" cy="100" r="8" fill="#000000" opacity="0.1" />

          <path
            d="M60 88 C60 52 140 52 140 88 C140 125 125 144 100 144 C75 144 60 125 60 88 Z"
            fill={skin}
          />

          <ellipse cx="74" cy="112" rx="8" ry="4" fill="#ef4444" opacity="0.22" />
          <ellipse cx="126" cy="112" rx="8" ry="4" fill="#ef4444" opacity="0.22" />
        </g>

        {/* 5. Eyes */}
        <g id="eyes">
          {c.eyeShape === "almond" && (
            <>
              <ellipse cx="80" cy="95" rx="10" ry="7" fill="#ffffff" />
              <circle cx="81" cy="95" r="5.5" fill={eye} />
              <circle cx="81" cy="95" r="3" fill="#09060f" />
              <circle cx="83" cy="93" r="1.8" fill="#ffffff" />

              <ellipse cx="120" cy="95" rx="10" ry="7" fill="#ffffff" />
              <circle cx="119" cy="95" r="5.5" fill={eye} />
              <circle cx="119" cy="95" r="3" fill="#09060f" />
              <circle cx="121" cy="93" r="1.8" fill="#ffffff" />
            </>
          )}

          {c.eyeShape === "round" && (
            <>
              <circle cx="80" cy="95" r="9" fill="#ffffff" />
              <circle cx="80" cy="95" r="6" fill={eye} />
              <circle cx="80" cy="95" r="3" fill="#09060f" />
              <circle cx="82" cy="93" r="2" fill="#ffffff" />

              <circle cx="120" cy="95" r="9" fill="#ffffff" />
              <circle cx="120" cy="95" r="6" fill={eye} />
              <circle cx="120" cy="95" r="3" fill="#09060f" />
              <circle cx="122" cy="93" r="2" fill="#ffffff" />
            </>
          )}

          {c.eyeShape === "sharp" && (
            <>
              <path d="M68 97 Q80 88 92 95 Q80 102 68 97 Z" fill="#ffffff" />
              <circle cx="81" cy="94" r="5" fill={eye} />
              <circle cx="81" cy="94" r="2.5" fill="#000" />
              <circle cx="83" cy="93" r="1.5" fill="#fff" />

              <path d="M108 95 Q120 88 132 97 Q120 102 108 95 Z" fill="#ffffff" />
              <circle cx="119" cy="94" r="5" fill={eye} />
              <circle cx="119" cy="94" r="2.5" fill="#000" />
              <circle cx="121" cy="93" r="1.5" fill="#fff" />
            </>
          )}

          {c.eyeShape === "starry" && (
            <>
              <circle cx="80" cy="95" r="9" fill="#ffffff" />
              <circle cx="80" cy="95" r="6" fill={eye} />
              <polygon points="80,90 82,94 86,95 82,96 80,100 78,96 74,95 78,94" fill="#ffffff" />

              <circle cx="120" cy="95" r="9" fill="#ffffff" />
              <circle cx="120" cy="95" r="6" fill={eye} />
              <polygon points="120,90 122,94 126,95 122,96 120,100 118,96 114,95 118,94" fill="#ffffff" />
            </>
          )}

          {/* Eyebrows */}
          <path d="M70 84 Q80 80 90 84" stroke={hair} stroke-width="3" stroke-linecap="round" fill="none" />
          <path d="M110 84 Q120 80 130 84" stroke={hair} stroke-width="3" stroke-linecap="round" fill="none" />
        </g>

        {/* 6. Mouth & Expressions */}
        <g id="mouth">
          <path d="M98 106 Q100 108 102 106" stroke="#000000" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.3" />

          {c.mouth === "smile" && (
            <path d="M88 118 Q100 130 112 118" stroke="#000000" stroke-width="3" stroke-linecap="round" fill="none" />
          )}

          {c.mouth === "smirk" && (
            <path d="M90 121 Q104 124 114 116" stroke="#000000" stroke-width="3" stroke-linecap="round" fill="none" />
          )}

          {c.mouth === "laugh" && (
            <path d="M86 116 Q100 116 114 116 Q100 132 86 116 Z" fill="#881337" stroke="#000000" stroke-width="2" />
          )}

          {c.mouth === "neutral" && (
            <line x1="90" y1="120" x2="110" y2="120" stroke="#000000" stroke-width="3" stroke-linecap="round" />
          )}

          {c.mouth === "battle" && (
            <path d="M88 118 L94 116 L100 118 L106 116 L112 118" stroke="#000000" stroke-width="3" stroke-linecap="round" fill="none" />
          )}

          {c.mouth === "wink" && (
            <path d="M88 118 Q100 128 112 118" stroke="#000000" stroke-width="3" stroke-linecap="round" fill="none" />
          )}
        </g>

        {/* 7. Facial Hair */}
        {c.facialHair === "stubble" && (
          <g opacity="0.3" fill={hair}>
            <circle cx="90" cy="128" r="1" /><circle cx="96" cy="132" r="1" /><circle cx="104" cy="132" r="1" /><circle cx="110" cy="128" r="1" />
            <circle cx="86" cy="124" r="1" /><circle cx="114" cy="124" r="1" /><circle cx="100" cy="136" r="1" />
          </g>
        )}

        {c.facialHair === "mustache" && (
          <path d="M86 114 Q94 112 100 115 Q106 112 114 114 Q108 118 100 116 Q92 118 86 114 Z" fill={hair} />
        )}

        {c.facialHair === "goatee" && (
          <g>
            <path d="M88 114 Q100 116 112 114" stroke={hair} stroke-width="2.5" fill="none" />
            <path d="M94 126 L106 126 L100 140 Z" fill={hair} />
          </g>
        )}

        {c.facialHair === "beard" && (
          <path
            d="M62 98 C62 136 80 152 100 152 C120 152 138 136 138 98 L130 98 C130 130 116 142 100 142 C84 142 70 130 70 98 Z"
            fill={hair}
          />
        )}

        {/* 8. Hair Styles */}
        <g id="hair">
          {c.hairStyle === "buzz" && (
            <path d="M58 84 C58 48 142 48 142 84 C132 58 68 58 58 84 Z" fill={hair} />
          )}

          {c.hairStyle === "fade" && (
            <g>
              <path d="M58 86 C56 46 144 46 142 86 C136 50 64 50 58 86 Z" fill={hair} />
              <path d="M60 76 Q100 48 140 70 Q100 58 60 76 Z" fill="#ffffff" opacity="0.2" />
            </g>
          )}

          {c.hairStyle === "spikes" && (
            <path
              d="M58 86 L56 64 L72 44 L84 62 L100 36 L116 62 L128 44 L144 64 L142 86 C130 52 70 52 58 86 Z"
              fill={hair}
            />
          )}

          {c.hairStyle === "wavy" && (
            <g>
              <path
                d="M56 88 C54 44 146 44 144 88 C144 110 136 122 136 122 C146 80 134 56 100 54 C66 56 54 80 64 122 C64 122 56 110 56 88 Z"
                fill={hair}
              />
              <path d="M74 58 Q100 48 126 58" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.25" />
            </g>
          )}

          {c.hairStyle === "afro" && (
            <circle cx="100" cy="74" r="50" fill={hair} />
          )}

          {c.hairStyle === "braids" && (
            <g>
              <path d="M58 82 C58 48 142 48 142 82 Z" fill={hair} />
              <line x1="68" y1="64" x2="68" y2="136" stroke={hair} stroke-width="6" stroke-linecap="round" />
              <line x1="80" y1="56" x2="80" y2="142" stroke={hair} stroke-width="6" stroke-linecap="round" />
              <line x1="120" y1="56" x2="120" y2="142" stroke={hair} stroke-width="6" stroke-linecap="round" />
              <line x1="132" y1="64" x2="132" y2="136" stroke={hair} stroke-width="6" stroke-linecap="round" />
            </g>
          )}

          {c.hairStyle === "flowing" && (
            <path
              d="M56 88 C54 40 146 40 144 88 C146 126 142 165 142 165 C146 105 136 56 100 54 C64 56 54 105 58 165 C58 165 54 126 56 88 Z"
              fill={hair}
            />
          )}

          {c.hairStyle === "bun" && (
            <g>
              <circle cx="100" cy="38" r="22" fill={hair} />
              <path d="M58 84 C58 48 142 48 142 84 Z" fill={hair} />
            </g>
          )}

          {c.hairStyle === "side-part" && (
            <g>
              <path d="M56 84 C56 42 144 42 144 84 C130 52 70 52 56 84 Z" fill={hair} />
              <path d="M70 52 Q95 44 140 76 Q100 58 70 52 Z" fill="#ffffff" opacity="0.2" />
            </g>
          )}

          {c.hairStyle === "dreads" && (
            <g>
              <circle cx="100" cy="74" r="48" fill={hair} />
              <circle cx="60" cy="90" r="10" fill={hair} />
              <circle cx="140" cy="90" r="10" fill={hair} />
            </g>
          )}
        </g>

        {/* 9. Accessories & Headwear */}
        {c.accessory === "gamer-headset" && (
          <g id="acc-headset">
            <path d="M50 96 C48 38 152 38 150 96" stroke="#09060f" stroke-width="7" stroke-linecap="round" fill="none" />
            <path d="M50 96 C48 38 152 38 150 96" stroke="#a855f7" stroke-width="3" stroke-linecap="round" fill="none" />
            <rect x="42" y="82" width="16" height="30" rx="8" fill="#140b22" stroke="#a855f7" stroke-width="2.5" />
            <circle cx="50" cy="97" r="4" fill="#22d3ee" />
            <rect x="142" y="82" width="16" height="30" rx="8" fill="#140b22" stroke="#a855f7" stroke-width="2.5" />
            <circle cx="150" cy="97" r="4" fill="#22d3ee" />
            <path d="M50 106 Q60 128 78 126" stroke="#09060f" stroke-width="3" stroke-linecap="round" fill="none" />
            <circle cx="80" cy="126" r="3.5" fill="#22d3ee" />
          </g>
        )}

        {c.accessory === "cyber-visor" && (
          <g id="acc-visor">
            <path d="M64 90 L136 90 L132 102 L68 102 Z" fill="#22d3ee" opacity="0.85" stroke="#ffffff" stroke-width="1.5" />
            <line x1="68" y1="94" x2="132" y2="94" stroke="#ffffff" stroke-width="1" />
          </g>
        )}

        {c.accessory === "aviators" && (
          <g id="acc-aviators">
            <ellipse cx="80" cy="96" rx="14" ry="11" fill="#0f172a" stroke="#fbbf24" stroke-width="2" />
            <ellipse cx="120" cy="96" rx="14" ry="11" fill="#0f172a" stroke="#fbbf24" stroke-width="2" />
            <line x1="94" y1="94" x2="106" y2="94" stroke="#fbbf24" stroke-width="2.5" />
            <line x1="72" y1="91" x2="88" y2="91" stroke="#ffffff" stroke-width="1.5" opacity="0.6" />
          </g>
        )}

        {c.accessory === "snapback" && (
          <g id="acc-snapback">
            <path d="M56 70 C56 44 144 44 144 70 Z" fill="#7c3aed" />
            <path d="M52 70 L148 70 L160 76 L40 76 Z" fill="#581c87" />
            <circle cx="100" cy="56" r="6" fill="#ffffff" />
            <text x="100" y="58" text-anchor="middle" fill="#581c87" font-size="6" font-weight="900">C</text>
          </g>
        )}

        {c.accessory === "beanie" && (
          <g id="acc-beanie">
            <path d="M54 78 C54 38 146 38 146 78 Z" fill="#334155" />
            <rect x="52" y="72" width="96" height="12" rx="4" fill="#1e293b" />
            <circle cx="100" cy="36" r="8" fill="#a855f7" />
          </g>
        )}

        {c.accessory === "crown" && (
          <g id="acc-crown">
            <polygon points="65,68 75,44 100,56 125,44 135,68" fill="#f59e0b" stroke="#b45309" stroke-width="2" />
            <circle cx="75" cy="44" r="3" fill="#a855f7" />
            <circle cx="100" cy="56" r="3.5" fill="#22d3ee" />
            <circle cx="125" cy="44" r="3" fill="#a855f7" />
          </g>
        )}

        {c.accessory === "cat-ears" && (
          <g id="acc-cat">
            <polygon points="56,70 60,34 82,56" fill="#ec4899" stroke="#9d174d" stroke-width="2" />
            <polygon points="62,64 65,42 78,56" fill="#fbcfe8" />
            <polygon points="144,70 140,34 118,56" fill="#ec4899" stroke="#9d174d" stroke-width="2" />
            <polygon points="138,64 135,42 122,56" fill="#fbcfe8" />
          </g>
        )}

        {c.accessory === "bandana" && (
          <g id="acc-bandana">
            <path d="M56 74 Q100 64 144 74 L144 84 Q100 74 56 84 Z" fill="#dc2626" />
            <circle cx="100" cy="74" r="2" fill="#ffffff" />
          </g>
        )}

        {c.accessory === "earring" && (
          <g id="acc-earring">
            <circle cx="144" cy="114" r="3" fill="#fbbf24" stroke="#d97706" stroke-width="1" />
          </g>
        )}

        {/* 10. Comic Pose Stickers */}
        {c.pose === "fire" && (
          <g id="pose-fire">
            <text x="100" y="194" text-anchor="middle" font-size="20">🔥</text>
          </g>
        )}

        {c.pose === "gg" && (
          <g id="pose-gg">
            <rect x="74" y="174" width="52" height="20" rx="10" fill="#10b981" />
            <text x="100" y="188" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="900">🎮 GG!</text>
          </g>
        )}

        {c.pose === "hype" && (
          <g id="pose-hype">
            <rect x="70" y="174" width="60" height="20" rx="10" fill="#a855f7" />
            <text x="100" y="188" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="900">⚡ HYPE!</text>
          </g>
        )}

        {c.pose === "verified" && (
          <g id="pose-verified">
            <circle cx="100" cy="180" r="12" fill="#a855f7" stroke="#ffffff" stroke-width="2" />
            <path d="M96 180 L99 183 L105 177" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </g>
        )}

        {c.pose === "chill" && (
          <g id="pose-chill">
            <rect x="70" y="174" width="60" height="20" rx="10" fill="#0284c7" />
            <text x="100" y="188" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="900">☕ CHILL</text>
          </g>
        )}

        {c.pose === "afk" && (
          <g id="pose-afk">
            <rect x="74" y="174" width="52" height="20" rx="10" fill="#475569" />
            <text x="100" y="188" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="900">💤 AFK</text>
          </g>
        )}

        {c.pose === "raid" && (
          <g id="pose-raid">
            <rect x="66" y="174" width="68" height="20" rx="10" fill="#dc2626" />
            <text x="100" y="188" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="900">⚔️ RAID ON</text>
          </g>
        )}

        {c.pose === "love" && (
          <g id="pose-love">
            <rect x="74" y="174" width="52" height="20" rx="10" fill="#ec4899" />
            <text x="100" y="188" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="900">❤️ LOVE</text>
          </g>
        )}

        {c.pose === "rocket" && (
          <g id="pose-rocket">
            <rect x="68" y="174" width="64" height="20" rx="10" fill="#f59e0b" />
            <text x="100" y="188" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="900">🚀 MOON</text>
          </g>
        )}

        {c.pose === "levelup" && (
          <g id="pose-levelup">
            <rect x="64" y="174" width="72" height="20" rx="10" fill="#6366f1" />
            <text x="100" y="188" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="900">💎 LEVEL UP</text>
          </g>
        )}

        {c.pose === "shield" && (
          <g id="pose-shield">
            <rect x="68" y="174" width="64" height="20" rx="10" fill="#140b22" stroke="#a855f7" stroke-width="1.5" />
            <text x="100" y="188" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="900">🛡️ SQUAD</text>
          </g>
        )}
      </svg>

      {/* Small badge overlay */}
      {showStickerBadge && c.pose && c.pose !== "portrait" && (
        <span
          className="avatar-sticker-badge"
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            fontSize: "12px",
            lineHeight: 1,
            background: "var(--surface)",
            borderRadius: "50%",
            padding: "2px",
            boxShadow: "0 0 6px rgba(0,0,0,0.5)",
          }}
        >
          {c.pose === "fire"
            ? "🔥"
            : c.pose === "gg"
            ? "🎮"
            : c.pose === "hype"
            ? "⚡"
            : c.pose === "chill"
            ? "☕"
            : c.pose === "afk"
            ? "💤"
            : c.pose === "raid"
            ? "⚔️"
            : c.pose === "love"
            ? "❤️"
            : c.pose === "rocket"
            ? "🚀"
            : c.pose === "levelup"
            ? "💎"
            : "👑"}
        </span>
      )}
    </div>
  );
}
