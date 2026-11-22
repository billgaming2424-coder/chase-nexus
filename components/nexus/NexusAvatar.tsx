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
  const showAura = dimension >= 36 && Boolean(c.aura && c.aura !== "none");

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
      {/* Optional Speech Bubble */}
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
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="50%" stopColor="#1e1035" />
            <stop offset="100%" stopColor="#090514" />
          </linearGradient>
          <linearGradient id="bg-neon-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#164e63" />
          </linearGradient>
          <linearGradient id="bg-void-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#171026" />
            <stop offset="100%" stopColor="#07050d" />
          </linearGradient>
          <linearGradient id="bg-gold-burst" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>
          <linearGradient id="bg-fire-streak" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#7c2d12" />
          </linearGradient>
          <radialGradient id="bg-cosmic-stars" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="60%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#09061c" />
          </radialGradient>
          <linearGradient id="bg-cyber-grid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#701a75" />
          </linearGradient>
          <linearGradient id="bg-retro-sunset" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Skin and Hair Shading Filters */}
          <linearGradient id="skin-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="gold-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>
          <linearGradient id="laser-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* 1. Backdrop */}
        <rect
          width="200"
          height="200"
          fill={`url(#bg-${c.background || "purple-gradient"})`}
        />

        {/* Animated Aura Effects (Season 1 Cyber-Cosmetics - Optimized for >= 36px) */}
        {showAura && c.aura === "cosmic-void" && (
          <g className="aura-cosmic">
            <circle cx="100" cy="100" r="88" fill="none" stroke="#a855f7" strokeWidth="6" strokeDasharray="16 10" opacity="0.85" />
            <circle cx="100" cy="100" r="94" fill="none" stroke="#ec4899" strokeWidth="3" opacity="0.65" />
          </g>
        )}
        {showAura && c.aura === "neon-lightning" && (
          <g className="aura-lightning">
            <circle cx="100" cy="100" r="86" fill="none" stroke="#22d3ee" strokeWidth="5" strokeDasharray="8 6" opacity="0.9" />
            <polygon points="100,10 108,35 96,35 104,58 92,58" fill="#38bdf8" />
            <polygon points="185,100 160,108 160,96 138,104 138,92" fill="#38bdf8" />
          </g>
        )}
        {showAura && c.aura === "golden-halo" && (
          <g className="aura-halo">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#fbbf24" strokeWidth="6" opacity="0.8" />
            <ellipse cx="100" cy="42" rx="38" ry="12" fill="none" stroke="#fde047" strokeWidth="4" />
          </g>
        )}
        {showAura && c.aura === "flame-burst" && (
          <g className="aura-flame">
            <circle cx="100" cy="100" r="88" fill="none" stroke="#f97316" strokeWidth="6" strokeDasharray="12 8" opacity="0.85" />
            <circle cx="100" cy="100" r="93" fill="none" stroke="#ef4444" strokeWidth="4" opacity="0.75" />
          </g>
        )}
        {showAura && c.aura === "glitch-matrix" && (
          <g className="aura-matrix">
            <circle cx="100" cy="100" r="88" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="4 6" opacity="0.9" />
            <line x1="20" y1="60" x2="180" y2="60" stroke="#4ade80" strokeWidth="2" strokeDasharray="20 15" opacity="0.7" />
            <line x1="10" y1="140" x2="190" y2="140" stroke="#4ade80" strokeWidth="2" strokeDasharray="15 20" opacity="0.7" />
          </g>
        )}

        {/* 2. Avatar Torso / Wardrobe Base */}
        <g id="avatar-body">
          <ellipse cx="100" cy="180" rx="46" ry="32" fill={skin} />
          <ellipse cx="100" cy="180" rx="46" ry="32" fill="url(#skin-shade)" />

          {/* Outfits (14 Distinct Fits) */}
          {c.outfit === "varsity-hoodie" && (
            <g id="outfit-varsity">
              <path d="M52 170 C52 145 148 145 148 170 L152 200 L48 200 Z" fill="#140d21" />
              <path d="M78 152 L100 182 L122 152 Z" fill={skin} />
              <path d="M82 154 L100 180 L118 154 Z" fill="#7c3aed" />
              <circle cx="100" cy="164" r="5" fill="#f8fafc" />
              <text x="100" y="196" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="900" fontFamily="sans-serif">CS</text>
            </g>
          )}

          {c.outfit === "cyber-jacket" && (
            <g id="outfit-cyber">
              <path d="M50 166 C50 140 150 140 150 166 L154 200 L46 200 Z" fill="#090d16" />
              <path d="M74 154 L100 184 L126 154" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M100 184 L100 200" stroke="#06b6d4" strokeWidth="4" />
              <circle cx="70" cy="178" r="4" fill="#a855f7" />
              <circle cx="130" cy="178" r="4" fill="#a855f7" />
            </g>
          )}

          {c.outfit === "survivor-duster" && (
            <g id="outfit-deadeye">
              <path d="M48 168 C48 138 152 138 152 168 L156 200 L44 200 Z" fill="#3b2518" />
              <path d="M80 155 L100 180 L120 155 Z" fill="#991b1b" />
              <line x1="60" y1="164" x2="140" y2="198" stroke="#78350f" strokeWidth="6" />
              <circle cx="90" cy="178" r="3" fill="#fbbf24" />
              <circle cx="110" cy="188" r="3" fill="#fbbf24" />
            </g>
          )}

          {c.outfit === "trainer-vest" && (
            <g id="outfit-trainer">
              <path d="M52 168 C52 142 148 142 148 168 L152 200 L48 200 Z" fill="#0284c7" />
              <path d="M76 154 L100 186 L124 154 Z" fill="#f8fafc" />
              <circle cx="100" cy="174" r="6" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
            </g>
          )}

          {c.outfit === "nexus-tee" && (
            <g id="outfit-nexus-tee">
              <path d="M54 168 C54 146 146 146 146 168 L150 200 L50 200 Z" fill="#18181b" />
              <ellipse cx="100" cy="154" rx="22" ry="8" fill={skin} />
              <circle cx="100" cy="182" r="11" fill="none" stroke="#a855f7" strokeWidth="3" />
              <polygon points="100,175 106,186 94,186" fill="#22d3ee" />
            </g>
          )}

          {c.outfit === "armor" && (
            <g id="outfit-armor">
              <path d="M48 164 C48 138 152 138 152 164 L156 200 L44 200 Z" fill="#1e293b" />
              <path d="M72 152 L100 186 L128 152 Z" fill="#334155" />
              <path d="M100 160 L100 200" stroke="#f59e0b" strokeWidth="4" />
              <circle cx="100" cy="180" r="8" fill="#7c3aed" stroke="#f59e0b" strokeWidth="2" />
            </g>
          )}

          {c.outfit === "space-suit" && (
            <g id="outfit-space">
              <path d="M46 162 C46 136 154 136 154 162 L158 200 L42 200 Z" fill="#e2e8f0" />
              <ellipse cx="100" cy="154" rx="26" ry="10" fill="#0f172a" />
              <rect x="80" y="172" width="40" height="24" rx="4" fill="#0284c7" />
              <circle cx="92" cy="184" r="4" fill="#22c55e" />
              <circle cx="108" cy="184" r="4" fill="#ef4444" />
            </g>
          )}

          {c.outfit === "retro-arcade" && (
            <g id="outfit-retro">
              <path d="M50 166 C50 140 150 140 150 166 L154 200 L46 200 Z" fill="#4c1d95" />
              <polygon points="50,166 100,192 150,166 150,180 100,200 50,180" fill="#f43f5e" />
              <polygon points="50,180 100,200 150,180 150,192 100,208 50,192" fill="#06b6d4" />
            </g>
          )}

          {c.outfit === "purple-tux" && (
            <g id="outfit-tux">
              <path d="M50 164 C50 138 150 138 150 164 L154 200 L46 200 Z" fill="#2e1065" />
              <polygon points="86,150 100,186 114,150" fill="#f8fafc" />
              <polygon points="94,158 100,163 106,158 100,166" fill="#0f172a" />
              <polygon points="86,150 100,184 76,200" fill="#581c87" />
              <polygon points="114,150 100,184 124,200" fill="#581c87" />
            </g>
          )}

          {c.outfit === "mech-pilot" && (
            <g id="outfit-mech">
              <path d="M46 160 C46 134 154 134 154 160 L158 200 L42 200 Z" fill="#1e293b" />
              <path d="M70 150 L100 188 L130 150 Z" fill="#0f172a" />
              <polygon points="100,162 112,180 88,180" fill="#06b6d4" />
              <line x1="56" y1="172" x2="144" y2="172" stroke="#38bdf8" strokeWidth="3" />
            </g>
          )}

          {c.outfit === "ninja-shinobi" && (
            <g id="outfit-ninja">
              <path d="M48 165 C48 140 152 140 152 165 L156 200 L44 200 Z" fill="#09090b" />
              <path d="M80 152 L100 184 L120 152 Z" fill="#7f1d1d" />
              <line x1="50" y1="160" x2="150" y2="196" stroke="#991b1b" strokeWidth="4" />
              <line x1="150" y1="160" x2="50" y2="196" stroke="#991b1b" strokeWidth="4" />
            </g>
          )}

          {c.outfit === "esports-jersey" && (
            <g id="outfit-esports">
              <path d="M50 166 C50 142 150 142 150 166 L154 200 L46 200 Z" fill="#0f172a" />
              <polygon points="50,166 100,190 150,166" fill="#7c3aed" />
              <text x="100" y="196" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="900">#24</text>
            </g>
          )}

          {c.outfit === "retro-synth" && (
            <g id="outfit-synth">
              <path d="M50 164 C50 138 150 138 150 164 L154 200 L46 200 Z" fill="#18181b" />
              <path d="M72 152 L100 186 L128 152" stroke="#ec4899" strokeWidth="4" fill="none" />
              <circle cx="100" cy="188" r="6" fill="#facc15" />
            </g>
          )}

          {c.outfit === "cozy-hoodie" && (
            <g id="outfit-cozy">
              <path d="M46 160 C46 134 154 134 154 160 L158 200 L42 200 Z" fill="#e0e7ff" />
              <ellipse cx="100" cy="154" rx="24" ry="10" fill="#c7d2fe" />
              <circle cx="86" cy="180" r="5" fill="#818cf8" />
              <circle cx="114" cy="180" r="5" fill="#818cf8" />
            </g>
          )}

          {c.outfit === "cyber-samurai" && (
            <g id="outfit-cyber-samurai">
              <path d="M46 160 C46 132 154 132 154 160 L158 200 L42 200 Z" fill="#0f0717" />
              <path d="M72 150 L100 186 L128 150 Z" fill="#dc2626" />
              <line x1="56" y1="168" x2="144" y2="168" stroke="#f43f5e" strokeWidth="3" />
              <circle cx="100" cy="188" r="6" fill="#facc15" stroke="#ef4444" strokeWidth="2" />
            </g>
          )}

          {c.outfit === "void-paladin" && (
            <g id="outfit-void-paladin">
              <path d="M44 158 C44 130 156 130 156 158 L160 200 L40 200 Z" fill="#1e1035" />
              <polygon points="100,146 124,180 100,198 76,180" fill="#9333ea" stroke="#c084fc" strokeWidth="2" />
              <circle cx="100" cy="180" r="5" fill="#22d3ee" />
            </g>
          )}

          {c.outfit === "stealth-operative" && (
            <g id="outfit-stealth-operative">
              <path d="M48 162 C48 136 152 136 152 162 L156 200 L44 200 Z" fill="#09090b" />
              <path d="M74 152 L100 184 L126 152 Z" fill="#18181b" />
              <rect x="80" y="174" width="40" height="8" rx="4" fill="#06b6d4" opacity="0.85" />
            </g>
          )}

          {c.outfit === "unimon-master" && (
            <g id="outfit-unimon-master">
              <path d="M46 160 C46 132 154 132 154 160 L158 200 L42 200 Z" fill="#b45309" />
              <polygon points="100,148 126,186 74,186" fill="#fef3c7" stroke="#fbbf24" strokeWidth="2" />
              <circle cx="100" cy="174" r="7" fill="#dc2626" stroke="#fff" strokeWidth="2" />
            </g>
          )}

          {c.outfit === "retro-synthwave" && (
            <g id="outfit-retro-synthwave">
              <path d="M46 162 C46 134 154 134 154 162 L158 200 L42 200 Z" fill="#4a044e" />
              <polygon points="70,152 100,186 130,152" fill="#ec4899" />
              <polygon points="80,152 100,180 120,152" fill="#06b6d4" />
            </g>
          )}

          {c.outfit === "royal-cape" && (
            <g id="outfit-royal-cape">
              <path d="M42 156 C42 128 158 128 158 156 L162 200 L38 200 Z" fill="#581c87" />
              <path d="M68 148 L100 178 L132 148" stroke="#fbbf24" strokeWidth="5" fill="none" strokeLinecap="round" />
              <circle cx="100" cy="178" r="6" fill="#38bdf8" stroke="#fbbf24" strokeWidth="2" />
            </g>
          )}
        </g>

        {/* 3. Neck */}
        <rect x="88" y="128" width="24" height="26" rx="6" fill={skin} />
        <rect x="88" y="128" width="24" height="26" rx="6" fill="url(#skin-shade)" />

        {/* 4. Head */}
        <ellipse cx="100" cy="100" rx="42" ry="46" fill={skin} />
        <ellipse cx="100" cy="100" rx="42" ry="46" fill="url(#skin-shade)" />

        {/* Ears */}
        <circle cx="58" cy="102" r="10" fill={skin} />
        <circle cx="142" cy="102" r="10" fill={skin} />

        {/* 5. Eyes */}
        <g id="avatar-eyes">
          {c.eyeShape === "almond" && (
            <g>
              <ellipse cx="82" cy="98" rx="9" ry="6" fill="#ffffff" />
              <circle cx="83" cy="98" r="4" fill={eye} />
              <circle cx="84" cy="96" r="1.5" fill="#ffffff" />
              <ellipse cx="118" cy="98" rx="9" ry="6" fill="#ffffff" />
              <circle cx="117" cy="98" r="4" fill={eye} />
              <circle cx="118" cy="96" r="1.5" fill="#ffffff" />
            </g>
          )}

          {c.eyeShape === "round" && (
            <g>
              <circle cx="82" cy="98" r="8" fill="#ffffff" />
              <circle cx="82" cy="98" r="4.5" fill={eye} />
              <circle cx="84" cy="96" r="1.8" fill="#ffffff" />
              <circle cx="118" cy="98" r="8" fill="#ffffff" />
              <circle cx="118" cy="98" r="4.5" fill={eye} />
              <circle cx="120" cy="96" r="1.8" fill="#ffffff" />
            </g>
          )}

          {c.eyeShape === "sharp" && (
            <g>
              <polygon points="73,98 84,93 92,98 84,103" fill="#ffffff" />
              <circle cx="83" cy="98" r="3.5" fill={eye} />
              <polygon points="108,98 116,93 127,98 116,103" fill="#ffffff" />
              <circle cx="117" cy="98" r="3.5" fill={eye} />
            </g>
          )}

          {c.eyeShape === "starry" && (
            <g>
              <ellipse cx="82" cy="98" rx="9" ry="7" fill="#ffffff" />
              <circle cx="82" cy="98" r="4.5" fill={eye} />
              <polygon points="82,93 84,97 88,98 84,99 82,103 80,99 76,98 80,97" fill="#ffffff" />
              <ellipse cx="118" cy="98" rx="9" ry="7" fill="#ffffff" />
              <circle cx="118" cy="98" r="4.5" fill={eye} />
              <polygon points="118,93 120,97 124,98 120,99 118,103 116,99 112,98 116,97" fill="#ffffff" />
            </g>
          )}

          {/* Eyebrows */}
          <path d="M74 88 Q82 83 91 87" stroke={hair} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M109 87 Q118 83 126 88" stroke={hair} strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        {/* Nose */}
        <path d="M98 102 Q100 110 103 110" stroke="#000000" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round" fill="none" />

        {/* 6. Mouth / Expressions */}
        <g id="avatar-mouth">
          {c.mouth === "smile" && (
            <path d="M88 120 Q100 132 112 120" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}
          {c.mouth === "smirk" && (
            <path d="M90 122 Q102 124 114 116" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}
          {c.mouth === "laugh" && (
            <path d="M86 118 Q100 138 114 118 Z" fill="#e11d48" stroke="#000000" strokeWidth="2" />
          )}
          {c.mouth === "neutral" && (
            <line x1="90" y1="122" x2="110" y2="122" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          )}
          {c.mouth === "battle" && (
            <g>
              <rect x="88" y="118" width="24" height="8" rx="3" fill="#ffffff" stroke="#000000" strokeWidth="2" />
              <line x1="94" y1="118" x2="94" y2="126" stroke="#000000" strokeWidth="1" />
              <line x1="100" y1="118" x2="100" y2="126" stroke="#000000" strokeWidth="1" />
              <line x1="106" y1="118" x2="106" y2="126" stroke="#000000" strokeWidth="1" />
            </g>
          )}
          {c.mouth === "wink" && (
            <g>
              <path d="M88 120 Q100 130 112 120" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Wink left eye */}
              <path d="M75 98 Q82 93 90 98" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </g>
          )}
        </g>

        {/* 7. Facial Hair */}
        {c.facialHair === "stubble" && (
          <ellipse cx="100" cy="126" rx="20" ry="12" fill="#000000" opacity="0.12" />
        )}
        {c.facialHair === "mustache" && (
          <path d="M86 116 Q100 110 114 116 Q100 120 86 116 Z" fill={hair} />
        )}
        {c.facialHair === "goatee" && (
          <g>
            <path d="M88 116 Q100 112 112 116" stroke={hair} strokeWidth="3" fill="none" />
            <polygon points="94,124 106,124 100,136" fill={hair} />
          </g>
        )}
        {c.facialHair === "beard" && (
          <path d="M68 108 C68 144 132 144 132 108 C132 148 68 148 68 108 Z" fill={hair} opacity="0.9" />
        )}

        {/* 8. Hairstyles (15 distinct cuts) */}
        <g id="avatar-hair">
          {c.hairStyle === "fade" && (
            <g>
              <path d="M58 88 C58 46 142 46 142 88 C130 64 70 64 58 88 Z" fill={hair} />
              <path d="M60 88 C60 62 140 62 140 88 C136 76 64 76 60 88 Z" fill="#ffffff" opacity="0.15" />
            </g>
          )}

          {c.hairStyle === "buzz" && (
            <path d="M60 84 C60 52 140 52 140 84 Z" fill={hair} opacity="0.85" />
          )}

          {c.hairStyle === "spikes" && (
            <polygon
              points="58,88 64,54 76,68 86,40 100,64 114,38 124,68 136,52 142,88"
              fill={hair}
            />
          )}

          {c.hairStyle === "wavy" && (
            <path
              d="M56 88 C54 44 146 44 144 88 C136 58 110 52 100 68 C90 52 64 58 56 88 Z"
              fill={hair}
            />
          )}

          {c.hairStyle === "afro" && (
            <circle cx="100" cy="80" r="50" fill={hair} />
          )}

          {c.hairStyle === "braids" && (
            <g>
              <ellipse cx="100" cy="74" rx="46" ry="34" fill={hair} />
              <line x1="70" y1="80" x2="65" y2="130" stroke={hair} strokeWidth="5" strokeLinecap="round" />
              <line x1="80" y1="80" x2="75" y2="135" stroke={hair} strokeWidth="5" strokeLinecap="round" />
              <line x1="120" y1="80" x2="125" y2="135" stroke={hair} strokeWidth="5" strokeLinecap="round" />
              <line x1="130" y1="80" x2="135" y2="130" stroke={hair} strokeWidth="5" strokeLinecap="round" />
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

          {c.hairStyle === "mohawk" && (
            <g>
              <polygon points="90,88 92,30 100,24 108,30 110,88" fill={hair} />
              <polygon points="92,54 94,22 100,16 106,22 108,54" fill="#a855f7" />
            </g>
          )}

          {c.hairStyle === "curls" && (
            <g>
              <circle cx="75" cy="65" r="18" fill={hair} />
              <circle cx="100" cy="55" r="20" fill={hair} />
              <circle cx="125" cy="65" r="18" fill={hair} />
              <circle cx="60" cy="80" r="14" fill={hair} />
              <circle cx="140" cy="80" r="14" fill={hair} />
            </g>
          )}

          {c.hairStyle === "slick-back" && (
            <g>
              <path d="M58 84 C58 42 142 42 142 84 C132 58 68 58 58 84 Z" fill={hair} />
              <path d="M68 62 L132 62" stroke="#ffffff" strokeWidth="2" opacity="0.3" />
              <path d="M72 70 L128 70" stroke="#ffffff" strokeWidth="2" opacity="0.3" />
            </g>
          )}

          {c.hairStyle === "ponytail" && (
            <g>
              <path d="M58 84 C58 48 142 48 142 84 Z" fill={hair} />
              <ellipse cx="148" cy="60" rx="14" ry="24" fill={hair} />
              <circle cx="138" cy="54" r="6" fill="#a855f7" />
            </g>
          )}

          {c.hairStyle === "neon-locs" && (
            <g>
              <circle cx="100" cy="74" r="48" fill={hair} />
              <line x1="68" y1="82" x2="60" y2="136" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" />
              <line x1="80" y1="82" x2="74" y2="140" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" />
              <line x1="120" y1="82" x2="126" y2="140" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" />
              <line x1="132" y1="82" x2="140" y2="136" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" />
            </g>
          )}
        </g>

        {/* 9. Accessories & Headwear (14 total) */}
        {c.accessory === "gamer-headset" && (
          <g id="acc-headset">
            <path d="M50 96 C48 38 152 38 150 96" stroke="#09060f" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M50 96 C48 38 152 38 150 96" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" fill="none" />
            <rect x="42" y="82" width="16" height="30" rx="8" fill="#140b22" stroke="#a855f7" strokeWidth="2.5" />
            <circle cx="50" cy="97" r="4" fill="#22d3ee" />
            <rect x="142" y="82" width="16" height="30" rx="8" fill="#140b22" stroke="#a855f7" strokeWidth="2.5" />
            <circle cx="150" cy="97" r="4" fill="#22d3ee" />
            <path d="M50 106 Q60 128 78 126" stroke="#09060f" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="80" cy="126" r="3.5" fill="#22d3ee" />
          </g>
        )}

        {c.accessory === "cyber-visor" && (
          <g id="acc-visor">
            <path d="M64 90 L136 90 L132 102 L68 102 Z" fill="#22d3ee" opacity="0.85" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="68" y1="94" x2="132" y2="94" stroke="#ffffff" strokeWidth="1" />
          </g>
        )}

        {c.accessory === "aviators" && (
          <g id="acc-aviators">
            <ellipse cx="80" cy="96" rx="14" ry="11" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
            <ellipse cx="120" cy="96" rx="14" ry="11" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
            <line x1="94" y1="94" x2="106" y2="94" stroke="#fbbf24" strokeWidth="2.5" />
            <line x1="72" y1="91" x2="88" y2="91" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
          </g>
        )}

        {c.accessory === "snapback" && (
          <g id="acc-snapback">
            <path d="M56 70 C56 44 144 44 144 70 Z" fill="#7c3aed" />
            <path d="M52 70 L148 70 L160 76 L40 76 Z" fill="#581c87" />
            <circle cx="100" cy="56" r="6" fill="#ffffff" />
            <text x="100" y="58" textAnchor="middle" fill="#581c87" fontSize="6" fontWeight="900">C</text>
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
            <polygon points="65,68 75,44 100,56 125,44 135,68" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <circle cx="75" cy="44" r="3" fill="#a855f7" />
            <circle cx="100" cy="56" r="3.5" fill="#22d3ee" />
            <circle cx="125" cy="44" r="3" fill="#a855f7" />
          </g>
        )}

        {c.accessory === "cat-ears" && (
          <g id="acc-cat">
            <polygon points="56,70 60,34 82,56" fill="#ec4899" stroke="#9d174d" strokeWidth="2" />
            <polygon points="62,64 65,42 78,56" fill="#fbcfe8" />
            <polygon points="144,70 140,34 118,56" fill="#ec4899" stroke="#9d174d" strokeWidth="2" />
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
            <circle cx="144" cy="114" r="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          </g>
        )}

        {c.accessory === "heart-shades" && (
          <g id="acc-hearts">
            <path d="M72 90 A 6 6 0 0 1 84 90 Q 84 98 78 104 Q 72 98 72 90 Z" fill="#e11d48" stroke="#be123c" strokeWidth="1.5" />
            <path d="M116 90 A 6 6 0 0 1 128 90 Q 128 98 122 104 Q 116 98 116 90 Z" fill="#e11d48" stroke="#be123c" strokeWidth="1.5" />
            <line x1="84" y1="92" x2="116" y2="92" stroke="#be123c" strokeWidth="2" />
          </g>
        )}

        {c.accessory === "vr-headset" && (
          <g id="acc-vr">
            <rect x="62" y="86" width="76" height="24" rx="8" fill="#09090b" stroke="#a855f7" strokeWidth="2" />
            <line x1="70" y1="98" x2="130" y2="98" stroke="#22d3ee" strokeWidth="2" />
            <circle cx="100" cy="98" r="4" fill="#a855f7" />
          </g>
        )}

        {c.accessory === "halo" && (
          <g id="acc-halo">
            <ellipse cx="100" cy="42" rx="36" ry="10" fill="none" stroke="#facc15" strokeWidth="4" />
            <ellipse cx="100" cy="42" rx="36" ry="10" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
          </g>
        )}

        {c.accessory === "demon-horns" && (
          <g id="acc-horns">
            <path d="M68 64 C64 42 54 34 48 38 C54 50 62 60 68 64 Z" fill="#b91c1c" />
            <path d="M132 64 C136 42 146 34 152 38 C146 50 138 60 132 64 Z" fill="#b91c1c" />
          </g>
        )}

        {/* 10. Handheld Props (Held in foreground) */}
        {c.prop === "rgb-controller" && (
          <g id="prop-controller">
            <rect x="76" y="160" width="48" height="28" rx="10" fill="#18181b" stroke="#a855f7" strokeWidth="2" />
            <circle cx="86" cy="172" r="4" fill="#3b82f6" />
            <circle cx="114" cy="170" r="3" fill="#ef4444" />
            <circle cx="118" cy="176" r="3" fill="#22c55e" />
          </g>
        )}

        {c.prop === "energy-drink" && (
          <g id="prop-drink">
            <rect x="136" y="148" width="18" height="36" rx="4" fill="#14532d" stroke="#22c55e" strokeWidth="2" />
            <text x="145" y="170" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="900">⚡</text>
          </g>
        )}

        {c.prop === "steam-deck" && (
          <g id="prop-deck">
            <rect x="65" y="162" width="70" height="26" rx="6" fill="#09090b" stroke="#3b82f6" strokeWidth="2" />
            <rect x="80" y="166" width="40" height="18" rx="2" fill="#1e293b" />
            <circle cx="72" cy="175" r="4" fill="#475569" />
            <circle cx="128" cy="175" r="4" fill="#475569" />
          </g>
        )}

        {c.prop === "golden-mic" && (
          <g id="prop-mic">
            <rect x="138" y="144" width="12" height="24" rx="6" fill="url(#gold-metal)" />
            <line x1="144" y1="168" x2="144" y2="190" stroke="#000000" strokeWidth="4" />
          </g>
        )}

        {c.prop === "laser-sword" && (
          <g id="prop-sword">
            <line x1="130" y1="185" x2="175" y2="125" stroke="url(#laser-glow)" strokeWidth="6" strokeLinecap="round" />
            <line x1="130" y1="185" x2="175" y2="125" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="126" y1="190" x2="134" y2="180" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}

        {c.prop === "coffee-mug" && (
          <g id="prop-coffee">
            <rect x="136" y="156" width="22" height="26" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
            <path d="M158 162 C164 162 164 176 158 176" stroke="#64748b" strokeWidth="3" fill="none" />
            <text x="147" y="174" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="900">C</text>
          </g>
        )}

        {c.prop === "trophy" && (
          <g id="prop-trophy">
            <path d="M136 150 L156 150 L152 170 C150 178 142 178 140 170 Z" fill="url(#gold-metal)" />
            <line x1="146" y1="174" x2="146" y2="184" stroke="url(#gold-metal)" strokeWidth="4" />
            <rect x="138" y="184" width="16" height="6" rx="2" fill="#78350f" />
          </g>
        )}

        {/* 11. Comic Poses & Meme Badges (24 Varieties) */}
        {c.pose === "fire" && (
          <g id="pose-fire">
            <text x="100" y="194" textAnchor="middle" fontSize="22">🔥</text>
          </g>
        )}

        {c.pose === "gg" && (
          <g id="pose-gg">
            <rect x="70" y="174" width="60" height="20" rx="10" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">🎮 GG!</text>
          </g>
        )}

        {c.pose === "hype" && (
          <g id="pose-hype">
            <rect x="66" y="174" width="68" height="20" rx="10" fill="#a855f7" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">⚡ HYPE!</text>
          </g>
        )}

        {c.pose === "verified" && (
          <g id="pose-verified">
            <circle cx="100" cy="180" r="13" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
            <path d="M95 180 L99 184 L106 177" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        )}

        {c.pose === "chill" && (
          <g id="pose-chill">
            <rect x="66" y="174" width="68" height="20" rx="10" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">☕ CHILL</text>
          </g>
        )}

        {c.pose === "afk" && (
          <g id="pose-afk">
            <rect x="72" y="174" width="56" height="20" rx="10" fill="#475569" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">💤 AFK</text>
          </g>
        )}

        {c.pose === "raid" && (
          <g id="pose-raid">
            <rect x="68" y="174" width="64" height="20" rx="10" fill="#dc2626" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">⚔️ RAID</text>
          </g>
        )}

        {c.pose === "love" && (
          <g id="pose-love">
            <text x="100" y="194" textAnchor="middle" fontSize="22">❤️</text>
          </g>
        )}

        {c.pose === "rocket" && (
          <g id="pose-rocket">
            <text x="100" y="194" textAnchor="middle" fontSize="22">🚀</text>
          </g>
        )}

        {c.pose === "levelup" && (
          <g id="pose-levelup">
            <rect x="64" y="174" width="72" height="20" rx="10" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">⭐ LEVEL UP</text>
          </g>
        )}

        {c.pose === "ragequit" && (
          <g id="pose-rage">
            <rect x="60" y="174" width="80" height="20" rx="10" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">💥 RAGE QUIT</text>
          </g>
        )}

        {c.pose === "clutch" && (
          <g id="pose-clutch">
            <rect x="66" y="174" width="68" height="20" rx="10" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">🎯 1v5 CLUTCH</text>
          </g>
        )}

        {c.pose === "mindblown" && (
          <g id="pose-mindblown">
            <text x="100" y="194" textAnchor="middle" fontSize="22">🤯</text>
          </g>
        )}

        {c.pose === "skull" && (
          <g id="pose-skull">
            <text x="100" y="194" textAnchor="middle" fontSize="22">💀</text>
          </g>
        )}

        {c.pose === "stream" && (
          <g id="pose-stream">
            <rect x="64" y="174" width="72" height="20" rx="10" fill="#9333ea" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">🔴 LIVE NOW</text>
          </g>
        )}

        {c.pose === "dance" && (
          <g id="pose-dance">
            <text x="100" y="194" textAnchor="middle" fontSize="22">💃</text>
          </g>
        )}

        {c.pose === "facepalm" && (
          <g id="pose-facepalm">
            <text x="100" y="194" textAnchor="middle" fontSize="22">🤦</text>
          </g>
        )}

        {c.pose === "flex" && (
          <g id="pose-flex">
            <text x="100" y="194" textAnchor="middle" fontSize="22">💪</text>
          </g>
        )}

        {c.pose === "wave" && (
          <g id="pose-wave">
            <text x="100" y="194" textAnchor="middle" fontSize="22">👋</text>
          </g>
        )}

        {c.pose === "cry-laugh" && (
          <g id="pose-crylaugh">
            <text x="100" y="194" textAnchor="middle" fontSize="22">😂</text>
          </g>
        )}

        {c.pose === "co-op" && (
          <g id="pose-coop">
            <rect x="66" y="174" width="68" height="20" rx="10" fill="#059669" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">🤝 CO-OP</text>
          </g>
        )}

        {c.pose === "salute" && (
          <g id="pose-salute">
            <text x="100" y="194" textAnchor="middle" fontSize="22">🫡</text>
          </g>
        )}

        {/* 12. Custom Comic Meme Caption Ribbon Banner */}
        {c.customCaption && (
          <g id="avatar-comic-caption">
            <rect x="10" y="170" width="180" height="24" rx="6" fill="#fde047" stroke="#000000" strokeWidth="3" />
            <text
              x="100"
              y="186"
              textAnchor="middle"
              fill="#000000"
              fontSize="11"
              fontWeight="900"
              fontFamily="Impact, sans-serif"
              letterSpacing="0.5"
            >
              {String(c.customCaption || "").toUpperCase().slice(0, 24)}
            </text>
          </g>
        )}
      </svg>

      {/* Mini Sticker Badge Overlay */}
      {showStickerBadge && c.pose && c.pose !== "portrait" && (
        <span
          className="avatar-mood-badge-pill"
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            background: "var(--accent)",
            color: "#ffffff",
            borderRadius: "50%",
            width: Math.max(18, Math.floor(dimension * 0.32)),
            height: Math.max(18, Math.floor(dimension * 0.32)),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: Math.max(10, Math.floor(dimension * 0.2)),
            border: "2px solid var(--surface)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            pointerEvents: "none",
          }}
        >
          {c.pose === "fire"
            ? "🔥"
            : c.pose === "gg"
            ? "🎮"
            : c.pose === "hype"
            ? "⚡"
            : c.pose === "verified"
            ? "👑"
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
            ? "⭐"
            : c.pose === "ragequit"
            ? "💥"
            : c.pose === "clutch"
            ? "🎯"
            : c.pose === "mindblown"
            ? "🤯"
            : c.pose === "skull"
            ? "💀"
            : c.pose === "stream"
            ? "🔴"
            : c.pose === "dance"
            ? "💃"
            : c.pose === "flex"
            ? "💪"
            : c.pose === "wave"
            ? "👋"
            : "✨"}
        </span>
      )}
    </div>
  );
}
