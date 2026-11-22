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
  forceDuo?: boolean;
}

const SIZES = {
  xs: 24,
  sm: 32,
  md: 44,
  lg: 64,
  xl: 96,
  hero: 160,
};

/**
 * Sub-renderer for an individual Persona character.
 * Supports positioning, scaling, horizontal mirroring/angling, and accessory pairing.
 */
function renderPersonaCharacter(
  c: AvatarConfig,
  keyPrefix: string,
  isPartner = false,
  customScale = 1
) {
  const skin = c.skinTone || "#f8cbb0";
  const hair = c.hairColor || "#1e1b2e";
  const eye = c.eyeColor || "#7c3aed";
  const isHat = ["snapback", "snapback-back", "beanie", "crown", "spartan-helmet"].includes(c.accessory);

  return (
    <g key={keyPrefix} id={`${keyPrefix}-persona`}>
      {/* 1. Back Hair (For long / flowing styles that rest behind shoulders) */}
      {(c.hairStyle === "flowing" || c.hairStyle === "ponytail" || c.hairStyle === "neon-locs") && (
        <g id={`${keyPrefix}-back-hair`}>
          {c.hairStyle === "flowing" && (
            <path
              d="M50 90 C46 130 50 172 54 176 L146 176 C150 172 154 130 150 90 Z"
              fill={hair}
              opacity="0.95"
            />
          )}
          {c.hairStyle === "ponytail" && (
            <ellipse cx="148" cy="74" rx="16" ry="28" fill={hair} />
          )}
          {c.hairStyle === "neon-locs" && (
            <g opacity="0.9">
              <line x1="64" y1="88" x2="56" y2="148" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" />
              <line x1="136" y1="88" x2="144" y2="148" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}
        </g>
      )}

      {/* 2. Avatar Torso / Wardrobe Base */}
      <g id={`${keyPrefix}-torso`}>
        <ellipse cx="100" cy="180" rx="46" ry="32" fill={skin} />
        <ellipse cx="100" cy="180" rx="46" ry="32" fill="url(#skin-shade)" />

        {/* Outfits (20 Distinct Signature Fits) */}
        {c.outfit === "varsity-hoodie" && (
          <g>
            <path d="M52 170 C52 145 148 145 148 170 L152 200 L48 200 Z" fill="#140d21" />
            <path d="M78 152 L100 182 L122 152 Z" fill={skin} />
            <path d="M82 154 L100 180 L118 154 Z" fill="#7c3aed" />
            <circle cx="100" cy="164" r="5" fill="#f8fafc" />
            <text x="100" y="196" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="900" fontFamily="sans-serif">CS</text>
          </g>
        )}

        {c.outfit === "cyber-jacket" && (
          <g>
            <path d="M50 166 C50 140 150 140 150 166 L154 200 L46 200 Z" fill="#090d16" />
            <path d="M74 154 L100 184 L126 154" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M100 184 L100 200" stroke="#06b6d4" strokeWidth="4" />
            <circle cx="70" cy="178" r="4" fill="#a855f7" />
            <circle cx="130" cy="178" r="4" fill="#a855f7" />
          </g>
        )}

        {c.outfit === "survivor-duster" && (
          <g>
            <path d="M48 168 C48 138 152 138 152 168 L156 200 L44 200 Z" fill="#3b2518" />
            <path d="M80 155 L100 180 L120 155 Z" fill="#991b1b" />
            <line x1="60" y1="164" x2="140" y2="198" stroke="#78350f" strokeWidth="6" />
            <circle cx="90" cy="178" r="3" fill="#fbbf24" />
            <circle cx="110" cy="188" r="3" fill="#fbbf24" />
          </g>
        )}

        {c.outfit === "trainer-vest" && (
          <g>
            <path d="M52 168 C52 142 148 142 148 168 L152 200 L48 200 Z" fill="#0284c7" />
            <path d="M76 154 L100 186 L124 154 Z" fill="#f8fafc" />
            <circle cx="100" cy="174" r="6" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
          </g>
        )}

        {c.outfit === "nexus-tee" && (
          <g>
            <path d="M54 168 C54 146 146 146 146 168 L150 200 L50 200 Z" fill="#18181b" />
            <ellipse cx="100" cy="154" rx="22" ry="8" fill={skin} />
            <circle cx="100" cy="182" r="11" fill="none" stroke="#a855f7" strokeWidth="3" />
            <polygon points="100,175 106,186 94,186" fill="#22d3ee" />
          </g>
        )}

        {c.outfit === "armor" && (
          <g>
            <path d="M48 164 C48 138 152 138 152 164 L156 200 L44 200 Z" fill="#1e293b" />
            <path d="M72 152 L100 186 L128 152 Z" fill="#334155" />
            <path d="M100 160 L100 200" stroke="#f59e0b" strokeWidth="4" />
            <circle cx="100" cy="180" r="8" fill="#7c3aed" stroke="#f59e0b" strokeWidth="2" />
          </g>
        )}

        {c.outfit === "space-suit" && (
          <g>
            <path d="M46 162 C46 136 154 136 154 162 L158 200 L42 200 Z" fill="#e2e8f0" />
            <ellipse cx="100" cy="154" rx="26" ry="10" fill="#0f172a" />
            <rect x="80" y="172" width="40" height="24" rx="4" fill="#0284c7" />
            <circle cx="92" cy="184" r="4" fill="#22c55e" />
            <circle cx="108" cy="184" r="4" fill="#ef4444" />
          </g>
        )}

        {c.outfit === "retro-arcade" && (
          <g>
            <path d="M50 166 C50 140 150 140 150 166 L154 200 L46 200 Z" fill="#4c1d95" />
            <polygon points="50,166 100,192 150,166 150,180 100,200 50,180" fill="#f43f5e" />
            <polygon points="50,180 100,200 150,180 150,192 100,208 50,192" fill="#06b6d4" />
          </g>
        )}

        {c.outfit === "purple-tux" && (
          <g>
            <path d="M50 164 C50 138 150 138 150 164 L154 200 L46 200 Z" fill="#2e1065" />
            <polygon points="86,150 100,186 114,150" fill="#f8fafc" />
            <polygon points="94,158 100,163 106,158 100,166" fill="#0f172a" />
            <polygon points="86,150 100,184 76,200" fill="#581c87" />
            <polygon points="114,150 100,184 124,200" fill="#581c87" />
          </g>
        )}

        {c.outfit === "mech-pilot" && (
          <g>
            <path d="M46 160 C46 134 154 134 154 160 L158 200 L42 200 Z" fill="#1e293b" />
            <path d="M70 150 L100 188 L130 150 Z" fill="#0f172a" />
            <polygon points="100,162 112,180 88,180" fill="#06b6d4" />
            <line x1="56" y1="172" x2="144" y2="172" stroke="#38bdf8" strokeWidth="3" />
          </g>
        )}

        {c.outfit === "ninja-shinobi" && (
          <g>
            <path d="M48 165 C48 140 152 140 152 165 L156 200 L44 200 Z" fill="#09090b" />
            <path d="M80 152 L100 184 L120 152 Z" fill="#7f1d1d" />
            <line x1="50" y1="160" x2="150" y2="196" stroke="#991b1b" strokeWidth="4" />
            <line x1="150" y1="160" x2="50" y2="196" stroke="#991b1b" strokeWidth="4" />
          </g>
        )}

        {c.outfit === "esports-jersey" && (
          <g>
            <path d="M50 166 C50 142 150 142 150 166 L154 200 L46 200 Z" fill="#0f172a" />
            <polygon points="50,166 100,190 150,166" fill="#7c3aed" />
            <text x="100" y="196" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="900">#24</text>
          </g>
        )}

        {c.outfit === "retro-synth" && (
          <g>
            <path d="M50 164 C50 138 150 138 150 164 L154 200 L46 200 Z" fill="#18181b" />
            <path d="M72 152 L100 186 L128 152" stroke="#ec4899" strokeWidth="4" fill="none" />
            <circle cx="100" cy="188" r="6" fill="#facc15" />
          </g>
        )}

        {c.outfit === "cozy-hoodie" && (
          <g>
            <path d="M46 160 C46 134 154 134 154 160 L158 200 L42 200 Z" fill="#e0e7ff" />
            <ellipse cx="100" cy="154" rx="24" ry="10" fill="#c7d2fe" />
            <circle cx="86" cy="180" r="5" fill="#818cf8" />
            <circle cx="114" cy="180" r="5" fill="#818cf8" />
          </g>
        )}

        {c.outfit === "cyber-samurai" && (
          <g>
            <path d="M46 160 C46 132 154 132 154 160 L158 200 L42 200 Z" fill="#0f0717" />
            <path d="M72 150 L100 186 L128 150 Z" fill="#dc2626" />
            <line x1="56" y1="168" x2="144" y2="168" stroke="#f43f5e" strokeWidth="3" />
            <circle cx="100" cy="188" r="6" fill="#facc15" stroke="#ef4444" strokeWidth="2" />
          </g>
        )}

        {c.outfit === "void-paladin" && (
          <g>
            <path d="M44 158 C44 130 156 130 156 158 L160 200 L40 200 Z" fill="#1e1035" />
            <polygon points="100,146 124,180 100,198 76,180" fill="#9333ea" stroke="#c084fc" strokeWidth="2" />
            <circle cx="100" cy="180" r="5" fill="#22d3ee" />
          </g>
        )}

        {c.outfit === "stealth-operative" && (
          <g>
            <path d="M48 162 C48 136 152 136 152 162 L156 200 L44 200 Z" fill="#09090b" />
            <path d="M74 152 L100 184 L126 152 Z" fill="#18181b" />
            <rect x="80" y="174" width="40" height="8" rx="4" fill="#06b6d4" opacity="0.85" />
          </g>
        )}

        {c.outfit === "unimon-master" && (
          <g>
            <path d="M46 160 C46 132 154 132 154 160 L158 200 L42 200 Z" fill="#b45309" />
            <polygon points="100,148 126,186 74,186" fill="#fef3c7" stroke="#fbbf24" strokeWidth="2" />
            <circle cx="100" cy="174" r="7" fill="#dc2626" stroke="#fff" strokeWidth="2" />
          </g>
        )}

        {c.outfit === "retro-synthwave" && (
          <g>
            <path d="M46 162 C46 134 154 134 154 162 L158 200 L42 200 Z" fill="#4a044e" />
            <polygon points="70,152 100,186 130,152" fill="#ec4899" />
            <polygon points="80,152 100,180 120,152" fill="#06b6d4" />
          </g>
        )}

        {c.outfit === "royal-cape" && (
          <g>
            <path d="M42 156 C42 128 158 128 158 156 L162 200 L38 200 Z" fill="#581c87" />
            <path d="M68 148 L100 178 L132 148" stroke="#fbbf24" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="100" cy="178" r="6" fill="#38bdf8" stroke="#fbbf24" strokeWidth="2" />
          </g>
        )}

        {/* Xbox 360 / Halo Master Chief Spartan Tactical Armor */}
        {c.outfit === "spartan-tactical" && (
          <g id={`${keyPrefix}-spartan-armor`}>
            <path d="M44 158 C44 130 156 130 156 158 L160 200 L40 200 Z" fill="#2d4a22" stroke="#1b3014" strokeWidth="2" />
            <path d="M72 148 L100 182 L128 148 Z" fill="#18181b" />
            <polygon points="100,154 118,172 100,192 82,172" fill="url(#spartan-gold-visor)" stroke="#854d0e" strokeWidth="1.5" />
            <rect x="42" y="162" width="22" height="14" rx="4" fill="#365e29" stroke="#1b3014" strokeWidth="1.5" />
            <rect x="136" y="162" width="22" height="14" rx="4" fill="#365e29" stroke="#1b3014" strokeWidth="1.5" />
            <line x1="64" y1="176" x2="84" y2="176" stroke="#15240f" strokeWidth="2" />
            <line x1="116" y1="176" x2="136" y2="176" stroke="#15240f" strokeWidth="2" />
            <circle cx="100" cy="172" r="3.5" fill="#22d3ee" stroke="#ffffff" strokeWidth="1" />
          </g>
        )}

        {/* Xbox 360 2005 Emerald Satin Varsity Bomber */}
        {c.outfit === "xbox-green-bomber" && (
          <g id={`${keyPrefix}-xbox-bomber`}>
            <path d="M46 160 C46 134 154 134 154 160 L158 200 L42 200 Z" fill="#107c10" stroke="#0b540b" strokeWidth="2" />
            <path d="M76 150 L100 182 L124 150 Z" fill="#f8fafc" />
            <path d="M82 152 L100 178 L118 152 Z" fill="#18181b" />
            <line x1="100" y1="178" x2="100" y2="200" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="3 2" />
            <path d="M44 166 L62 178 L56 200 L42 200 Z" fill="#e2e8f0" />
            <path d="M156 166 L138 178 L144 200 L158 200 Z" fill="#e2e8f0" />
            <circle cx="78" cy="178" r="8" fill="#15803d" stroke="#22c55e" strokeWidth="1.5" />
            <path d="M74 174 L82 182" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <path d="M82 174 L74 182" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* Reddit Snoo Mascot Plush Onesie */}
        {c.outfit === "snoo-onesie" && (
          <g id={`${keyPrefix}-snoo-onesie`}>
            <path d="M46 160 C46 132 154 132 154 160 L158 200 L42 200 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="100" cy="154" rx="26" ry="10" fill="#e2e8f0" />
            <ellipse cx="100" cy="184" rx="28" ry="16" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="100" y1="160" x2="100" y2="200" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="100" cy="168" r="3.5" fill="#ff4500" stroke="#ffffff" strokeWidth="1" />
          </g>
        )}
      </g>

      {/* 3. Neck */}
      <rect x="88" y="128" width="24" height="26" rx="6" fill={skin} />
      <rect x="88" y="128" width="24" height="26" rx="6" fill="url(#skin-shade)" />

      {/* 4. Head & Ears */}
      <ellipse cx="100" cy="100" rx="42" ry="46" fill={skin} />
      <ellipse cx="100" cy="100" rx="42" ry="46" fill="url(#skin-shade)" />

      {/* Ears with natural anatomy */}
      <circle cx="58" cy="102" r="10" fill={skin} />
      <circle cx="58" cy="102" r="6" fill="#000000" opacity="0.12" />
      <circle cx="142" cy="102" r="10" fill={skin} />
      <circle cx="142" cy="102" r="6" fill="#000000" opacity="0.12" />

      {/* 5. Paired Jewelry / Earrings (Anchored on BOTH earlobes!) */}
      {(c.accessory === "earring" || c.accessory === "paired-studs") && (
        <g id={`${keyPrefix}-earrings`}>
          {/* Left ear stud/hoop */}
          <circle cx="58" cy="110" r="3.5" fill="url(#gold-metal)" stroke="#d97706" strokeWidth="1" />
          <circle cx="57" cy="109" r="1" fill="#ffffff" />
          {/* Right ear stud/hoop */}
          <circle cx="142" cy="110" r="3.5" fill="url(#gold-metal)" stroke="#d97706" strokeWidth="1" />
          <circle cx="141" cy="109" r="1" fill="#ffffff" />
        </g>
      )}

      {/* 6. Facial Features */}
      {/* Eyes */}
      <g id={`${keyPrefix}-eyes`}>
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

        {/* Reddit Mascot Snoo Alien Glow Eyes */}
        {c.eyeShape === "snoo-glow" && (
          <g id={`${keyPrefix}-eyes-snoo-glow`}>
            <circle cx="82" cy="98" r="8.5" fill={eye === "#7c3aed" ? "#ff4500" : eye} stroke="#b91c1c" strokeWidth="1.5" />
            <circle cx="82" cy="98" r="5.5" fill="#ffffff" opacity="0.35" />
            <circle cx="84" cy="95" r="2.5" fill="#ffffff" />
            <circle cx="118" cy="98" r="8.5" fill={eye === "#7c3aed" ? "#ff4500" : eye} stroke="#b91c1c" strokeWidth="1.5" />
            <circle cx="118" cy="98" r="5.5" fill="#ffffff" opacity="0.35" />
            <circle cx="120" cy="95" r="2.5" fill="#ffffff" />
          </g>
        )}

        {/* Cyber Anime Hypnotic Spiral Swirl */}
        {c.eyeShape === "cyber-swirl" && (
          <g id={`${keyPrefix}-eyes-cyber-swirl`}>
            <circle cx="82" cy="98" r="8.5" fill="#09090b" stroke={eye} strokeWidth="2" />
            <path d="M82 98 A 2 2 0 0 1 84 96 A 4 4 0 0 1 86 98 A 6 6 0 0 1 80 102 A 8 8 0 0 1 74 95" stroke={eye} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="82" cy="98" r="2" fill="#ffffff" />
            <circle cx="118" cy="98" r="8.5" fill="#09090b" stroke={eye} strokeWidth="2" />
            <path d="M118 98 A 2 2 0 0 1 120 96 A 4 4 0 0 1 122 98 A 6 6 0 0 1 116 102 A 8 8 0 0 1 110 95" stroke={eye} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="118" cy="98" r="2" fill="#ffffff" />
          </g>
        )}

        {/* Eyebrows */}
        <path d="M74 88 Q82 83 91 87" stroke={hair} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M109 87 Q118 83 126 88" stroke={hair} strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* Nose */}
      <path d="M98 102 Q100 110 103 110" stroke="#000000" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round" fill="none" />

      {/* Mouth & Expressions */}
      <g id={`${keyPrefix}-mouth`}>
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
            <path d="M75 98 Q82 93 90 98" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>
        )}
      </g>

      {/* Facial Hair */}
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

      {/* 7. Lower-Face & Eyewear Accessories (Layered over face, under hat/hair bangs) */}
      {/* Bandana: FIXED to lower face / neck covering mouth like authentic Western/DEADEYE outlaw! */}
      {c.accessory === "bandana" && (
        <g id={`${keyPrefix}-bandana`}>
          <path
            d="M66 114 C66 114 100 118 134 114 L138 138 L100 166 L62 138 Z"
            fill="#991b1b"
            stroke="#7f1d1d"
            strokeWidth="2"
          />
          {/* Outlaw paisley & fold lines */}
          <path d="M74 126 L100 148 L126 126" stroke="#fca5a5" strokeWidth="1.5" fill="none" opacity="0.8" />
          <circle cx="100" cy="136" r="3" fill="#ffffff" opacity="0.9" />
          <polygon points="100,146 95,154 105,154" fill="#ffffff" opacity="0.85" />
        </g>
      )}

      {/* Oni Mask: Cyberpunk Ninja lower jaw mask */}
      {c.accessory === "oni-mask" && (
        <g id={`${keyPrefix}-oni-mask`}>
          <path
            d="M68 114 C68 114 100 118 132 114 L134 136 C134 148 100 156 100 156 C100 156 66 148 66 136 Z"
            fill="#18181b"
            stroke="#ef4444"
            strokeWidth="2"
          />
          <polygon points="86,128 92,136 84,136" fill="#ffffff" />
          <polygon points="114,128 108,136 116,136" fill="#ffffff" />
          <line x1="96" y1="134" x2="104" y2="134" stroke="#ef4444" strokeWidth="2" />
        </g>
      )}

      {/* Eyewear (Aviators, Visor, Heart Shades, VR) */}
      {c.accessory === "aviators" && (
        <g id={`${keyPrefix}-aviators`}>
          <ellipse cx="78" cy="98" rx="15" ry="12" fill="#0f172a" stroke="url(#gold-metal)" strokeWidth="2.5" />
          <ellipse cx="122" cy="98" rx="15" ry="12" fill="#0f172a" stroke="url(#gold-metal)" strokeWidth="2.5" />
          <line x1="92" y1="92" x2="108" y2="92" stroke="url(#gold-metal)" strokeWidth="2.5" />
          <line x1="93" y1="96" x2="107" y2="96" stroke="url(#gold-metal)" strokeWidth="2" />
          {/* Specular Glints */}
          <line x1="70" y1="92" x2="84" y2="92" stroke="#ffffff" strokeWidth="1.5" opacity="0.65" />
          <line x1="114" y1="92" x2="128" y2="92" stroke="#ffffff" strokeWidth="1.5" opacity="0.65" />
        </g>
      )}

      {c.accessory === "cyber-visor" && (
        <g id={`${keyPrefix}-cyber-visor`}>
          <path
            d="M62 90 L138 90 L134 106 L66 106 Z"
            fill="#06b6d4"
            opacity="0.88"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <line x1="66" y1="94" x2="134" y2="94" stroke="#ffffff" strokeWidth="1.5" opacity="0.75" />
          <circle cx="100" cy="98" r="2.5" fill="#a855f7" />
        </g>
      )}

      {c.accessory === "heart-shades" && (
        <g id={`${keyPrefix}-heart-shades`}>
          <path d="M70 92 A 6 6 0 0 1 82 92 Q 82 100 76 106 Q 70 100 70 92 Z" fill="#e11d48" stroke="#be123c" strokeWidth="2" />
          <path d="M118 92 A 6 6 0 0 1 130 92 Q 130 100 124 106 Q 118 100 118 92 Z" fill="#e11d48" stroke="#be123c" strokeWidth="2" />
          <line x1="82" y1="94" x2="118" y2="94" stroke="#be123c" strokeWidth="2.5" />
        </g>
      )}

      {c.accessory === "vr-headset" && (
        <g id={`${keyPrefix}-vr-headset`}>
          <rect x="60" y="86" width="80" height="26" rx="8" fill="#09090b" stroke="#a855f7" strokeWidth="2.5" />
          <line x1="68" y1="99" x2="132" y2="99" stroke="#22d3ee" strokeWidth="3" />
          <circle cx="100" cy="99" r="4.5" fill="#a855f7" />
          <rect x="54" y="93" width="7" height="12" rx="2" fill="#334155" />
          <rect x="139" y="93" width="7" height="12" rx="2" fill="#334155" />
        </g>
      )}

      {/* 8. Hairstyles (With Smart Tucking when wearing Hats) */}
      <g id={`${keyPrefix}-hair`}>
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
          isHat ? (
            /* Tucked under hat: front fringe peeking out */
            <polygon points="62,84 76,74 86,78 100,72 114,78 124,74 138,84" fill={hair} />
          ) : (
            <polygon points="58,88 64,54 76,68 86,40 100,64 114,38 124,68 136,52 142,88" fill={hair} />
          )
        )}

        {c.hairStyle === "wavy" && (
          <path
            d="M56 88 C54 44 146 44 144 88 C136 58 110 52 100 68 C90 52 64 58 56 88 Z"
            fill={hair}
          />
        )}

        {c.hairStyle === "afro" && (
          isHat ? (
            /* Tucked under hat */
            <ellipse cx="100" cy="80" rx="46" ry="24" fill={hair} />
          ) : (
            <circle cx="100" cy="80" r="50" fill={hair} />
          )
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
          isHat ? (
            <path d="M58 84 C58 56 142 56 142 84 Z" fill={hair} />
          ) : (
            <g>
              <circle cx="100" cy="38" r="22" fill={hair} />
              <path d="M58 84 C58 48 142 48 142 84 Z" fill={hair} />
            </g>
          )
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
          isHat ? (
            <ellipse cx="100" cy="76" rx="42" ry="18" fill={hair} />
          ) : (
            <g>
              <polygon points="90,88 92,30 100,24 108,30 110,88" fill={hair} />
              <polygon points="92,54 94,22 100,16 106,22 108,54" fill="#a855f7" />
            </g>
          )
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
          <path d="M58 84 C58 48 142 48 142 84 Z" fill={hair} />
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

      {/* 9. Headwear & Upper Accessories */}
      {/* Gamer Headset: Dual earcups + padded overhead arc + glowing boom mic */}
      {c.accessory === "gamer-headset" && (
        <g id={`${keyPrefix}-headset`}>
          {/* Overhead arch */}
          <path d="M46 96 C44 38 156 38 154 96" stroke="#09060f" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M46 96 C44 38 156 38 154 96" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Earcups */}
          <rect x="38" y="84" width="16" height="32" rx="8" fill="#140b22" stroke="#a855f7" strokeWidth="2.5" />
          <circle cx="46" cy="100" r="4.5" fill="#22d3ee" />
          <rect x="146" y="84" width="16" height="32" rx="8" fill="#140b22" stroke="#a855f7" strokeWidth="2.5" />
          <circle cx="154" cy="100" r="4.5" fill="#22d3ee" />
          {/* Glowing Mic */}
          <path d="M48 106 Q58 128 78 126" stroke="#09060f" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="80" cy="126" r="4" fill="#22d3ee" />
        </g>
      )}

      {/* Snapback (Forward Facing with Studio Crest) */}
      {c.accessory === "snapback" && (
        <g id={`${keyPrefix}-snapback`}>
          {/* Cap dome */}
          <path d="M54 74 C54 44 146 44 146 74 Z" fill="#6b21a8" />
          {/* Forward curved bill */}
          <path d="M48 72 L152 72 C156 78 148 80 100 80 C52 80 44 78 48 72 Z" fill="#581c87" />
          {/* Embroidered Chase Shield Button & Emblem */}
          <circle cx="100" cy="54" r="7" fill="#f8fafc" />
          <text x="100" y="57" textAnchor="middle" fill="#581c87" fontSize="8" fontWeight="900" fontFamily="sans-serif">CS</text>
        </g>
      )}

      {/* Snapback (Backwards Streetwear Style) */}
      {c.accessory === "snapback-back" && (
        <g id={`${keyPrefix}-snapback-back`}>
          {/* Cap dome facing backwards */}
          <path d="M54 74 C54 44 146 44 146 74 Z" fill="#6b21a8" />
          {/* Front Snap strap opening */}
          <path d="M82 72 Q100 60 118 72 Z" fill={skin} />
          <rect x="84" y="70" width="32" height="5" rx="2" fill="#581c87" />
          <circle cx="94" cy="72" r="1.5" fill="#f8fafc" />
          <circle cx="100" cy="72" r="1.5" fill="#f8fafc" />
          <circle cx="106" cy="72" r="1.5" fill="#f8fafc" />
        </g>
      )}

      {/* Beanie: Ribbed knit cuff and pom-pom */}
      {c.accessory === "beanie" && (
        <g id={`${keyPrefix}-beanie`}>
          <path d="M52 76 C52 38 148 38 148 76 Z" fill="#334155" />
          <rect x="50" y="70" width="100" height="14" rx="5" fill="#1e293b" />
          <line x1="60" y1="70" x2="60" y2="84" stroke="#475569" strokeWidth="1.5" />
          <line x1="80" y1="70" x2="80" y2="84" stroke="#475569" strokeWidth="1.5" />
          <line x1="100" y1="70" x2="100" y2="84" stroke="#475569" strokeWidth="1.5" />
          <line x1="120" y1="70" x2="120" y2="84" stroke="#475569" strokeWidth="1.5" />
          <line x1="140" y1="70" x2="140" y2="84" stroke="#475569" strokeWidth="1.5" />
          <circle cx="100" cy="36" r="9" fill="#a855f7" />
        </g>
      )}

      {/* Crown: Imperial 5-peak solid gold with jewels */}
      {c.accessory === "crown" && (
        <g id={`${keyPrefix}-crown`}>
          <polygon points="62,70 70,44 85,58 100,38 115,58 130,44 138,70" fill="url(#gold-metal)" stroke="#b45309" strokeWidth="2" />
          <circle cx="70" cy="44" r="3" fill="#a855f7" />
          <circle cx="100" cy="38" r="4" fill="#22d3ee" />
          <circle cx="130" cy="44" r="3" fill="#a855f7" />
          <rect x="64" y="66" width="72" height="6" rx="2" fill="#78350f" />
        </g>
      )}

      {/* Cat Ears: Cyber Neko Headband */}
      {c.accessory === "cat-ears" && (
        <g id={`${keyPrefix}-cat-ears`}>
          <polygon points="56,70 60,34 82,56" fill="#ec4899" stroke="#9d174d" strokeWidth="2" />
          <polygon points="62,64 65,42 78,56" fill="#fbcfe8" />
          <polygon points="144,70 140,34 118,56" fill="#ec4899" stroke="#9d174d" strokeWidth="2" />
          <polygon points="138,64 135,42 122,56" fill="#fbcfe8" />
          <path d="M56 70 C70 56 130 56 144 70" stroke="#09060f" strokeWidth="3" fill="none" />
        </g>
      )}

      {/* Floating Angelic Halo */}
      {c.accessory === "halo" && (
        <g id={`${keyPrefix}-halo`}>
          <ellipse cx="100" cy="38" rx="36" ry="10" fill="none" stroke="#facc15" strokeWidth="4.5" />
          <ellipse cx="100" cy="38" rx="36" ry="10" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
        </g>
      )}

      {/* Demon Horns */}
      {c.accessory === "demon-horns" && (
        <g id={`${keyPrefix}-horns`}>
          <path d="M68 64 C64 40 52 32 46 36 C52 48 62 60 68 64 Z" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="1.5" />
          <path d="M132 64 C136 40 148 32 154 36 C148 48 138 60 132 64 Z" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="1.5" />
        </g>
      )}

      {/* Reddit Alien Mascot Curved Snoo Antenna */}
      {c.accessory === "snoo-antenna" && (
        <g id={`${keyPrefix}-snoo-antenna`}>
          <path
            d="M100 54 Q100 32 115 28 Q125 24 116 14"
            stroke="#e2e8f0"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="116" cy="12" r="8" fill="url(#snoo-alien-glow)" />
          <circle cx="116" cy="12" r="5" fill="#ff4500" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="114" cy="10" r="1.5" fill="#ffffff" />
        </g>
      )}

      {/* Halo 343 / Xbox Floating Orbital Drone */}
      {c.accessory === "floating-drone" && (
        <g id={`${keyPrefix}-floating-drone`}>
          <ellipse cx="158" cy="54" rx="16" ry="16" fill="#334155" stroke="#64748b" strokeWidth="2" />
          <circle cx="158" cy="54" r="10" fill="#0f172a" />
          <circle cx="158" cy="54" r="6" fill="#38bdf8" />
          <circle cx="156" cy="52" r="2" fill="#ffffff" />
          <ellipse cx="158" cy="54" rx="22" ry="7" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 3" />
          <line x1="158" y1="70" x2="158" y2="78" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        </g>
      )}

      {/* Halo Master Chief Spartan Tactical Visor Helmet */}
      {c.accessory === "spartan-helmet" && (
        <g id={`${keyPrefix}-spartan-helmet`}>
          <path
            d="M52 92 C50 40 150 40 148 92 C148 116 144 142 100 144 C56 142 52 116 52 92 Z"
            fill="#2d4a22"
            stroke="#1b3014"
            strokeWidth="2.5"
          />
          <path d="M68 60 Q100 52 132 60 L134 68 Q100 62 66 68 Z" fill="#3b5e2d" />
          <path
            d="M62 84 Q100 80 138 84 L132 108 Q100 114 68 108 Z"
            fill="url(#spartan-gold-visor)"
            stroke="#713f12"
            strokeWidth="2"
          />
          <line x1="72" y1="88" x2="128" y2="88" stroke="#ffffff" strokeWidth="2" opacity="0.75" />
          <rect x="88" y="122" width="24" height="14" rx="3" fill="#18181b" stroke="#334155" strokeWidth="1.5" />
          <line x1="94" y1="126" x2="106" y2="126" stroke="#475569" strokeWidth="1.5" />
          <line x1="94" y1="131" x2="106" y2="131" stroke="#475569" strokeWidth="1.5" />
          <circle cx="58" cy="112" r="3.5" fill="#facc15" stroke="#18181b" strokeWidth="1" />
          <circle cx="142" cy="112" r="3.5" fill="#facc15" stroke="#18181b" strokeWidth="1" />
        </g>
      )}

      {/* Xbox 360 Avatar Red Boxing Gloves */}
      {c.accessory === "boxing-gloves" && (
        <g id={`${keyPrefix}-boxing-gloves`}>
          <ellipse cx="60" cy="170" rx="14" ry="16" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          <rect x="54" y="156" width="12" height="6" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
          <ellipse cx="68" cy="172" rx="5" ry="7" fill="#b91c1c" />
          <ellipse cx="140" cy="170" rx="14" ry="16" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          <rect x="134" y="156" width="12" height="6" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
          <ellipse cx="132" cy="172" rx="5" ry="7" fill="#b91c1c" />
        </g>
      )}

      {/* 10. Handheld Props with Natural Persona Hands */}
      {c.prop === "rgb-controller" && (
        <g id={`${keyPrefix}-prop-controller`}>
          {/* Hands holding controller */}
          <ellipse cx="72" cy="174" rx="8" ry="6" fill={skin} />
          <ellipse cx="128" cy="174" rx="8" ry="6" fill={skin} />
          <rect x="74" y="160" width="52" height="28" rx="10" fill="#18181b" stroke="#a855f7" strokeWidth="2" />
          <circle cx="85" cy="172" r="4.5" fill="#3b82f6" />
          <circle cx="115" cy="170" r="3.5" fill="#ef4444" />
          <circle cx="120" cy="176" r="3.5" fill="#22c55e" />
        </g>
      )}

      {c.prop === "coffee-mug" && (
        <g id={`${keyPrefix}-prop-coffee`}>
          <ellipse cx="140" cy="168" rx="7" ry="6" fill={skin} />
          <rect x="136" y="156" width="22" height="26" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
          <path d="M158 162 C164 162 164 176 158 176" stroke="#64748b" strokeWidth="3" fill="none" />
          <text x="147" y="174" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="900">C</text>
          {/* Steam */}
          <path d="M142 150 Q146 142 142 136" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" fill="none" />
          <path d="M148 150 Q152 142 148 136" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" fill="none" />
        </g>
      )}

      {c.prop === "laser-sword" && (
        <g id={`${keyPrefix}-prop-sword`}>
          <ellipse cx="128" cy="184" rx="7" ry="6" fill={skin} />
          <line x1="130" y1="185" x2="175" y2="125" stroke="url(#laser-glow)" strokeWidth="6" strokeLinecap="round" />
          <line x1="130" y1="185" x2="175" y2="125" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="126" y1="190" x2="134" y2="180" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}

      {c.prop === "energy-drink" && (
        <g id={`${keyPrefix}-prop-drink`}>
          <ellipse cx="138" cy="166" rx="7" ry="6" fill={skin} />
          <rect x="136" y="148" width="18" height="36" rx="4" fill="#14532d" stroke="#22c55e" strokeWidth="2" />
          <text x="145" y="170" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="900">⚡</text>
        </g>
      )}

      {c.prop === "steam-deck" && (
        <g id={`${keyPrefix}-prop-deck`}>
          <ellipse cx="66" cy="174" rx="8" ry="6" fill={skin} />
          <ellipse cx="134" cy="174" rx="8" ry="6" fill={skin} />
          <rect x="65" y="162" width="70" height="26" rx="6" fill="#09090b" stroke="#3b82f6" strokeWidth="2" />
          <rect x="80" y="166" width="40" height="18" rx="2" fill="#1e293b" />
          <circle cx="72" cy="175" r="4" fill="#475569" />
          <circle cx="128" cy="175" r="4" fill="#475569" />
        </g>
      )}

      {c.prop === "golden-mic" && (
        <g id={`${keyPrefix}-prop-mic`}>
          <ellipse cx="140" cy="170" rx="7" ry="6" fill={skin} />
          <rect x="138" y="144" width="12" height="24" rx="6" fill="url(#gold-metal)" />
          <line x1="144" y1="168" x2="144" y2="190" stroke="#000000" strokeWidth="4" />
        </g>
      )}

      {c.prop === "trophy" && (
        <g id={`${keyPrefix}-prop-trophy`}>
          <ellipse cx="144" cy="172" rx="7" ry="6" fill={skin} />
          <path d="M136 150 L156 150 L152 170 C150 178 142 178 140 170 Z" fill="url(#gold-metal)" />
          <line x1="146" y1="174" x2="146" y2="184" stroke="url(#gold-metal)" strokeWidth="4" />
          <rect x="138" y="184" width="16" height="6" rx="2" fill="#78350f" />
        </g>
      )}

      {/* Xbox Avatar Mini RC Warthog Rover */}
      {c.prop === "mini-warthog" && (
        <g id={`${keyPrefix}-prop-mini-warthog`}>
          <ellipse cx="70" cy="176" rx="7" ry="6" fill={skin} />
          <rect x="66" y="168" width="8" height="12" rx="2" fill="#18181b" />
          <line x1="70" y1="168" x2="70" y2="152" stroke="#64748b" strokeWidth="2" />
          <circle cx="70" cy="151" r="2" fill="#ef4444" />
          <g transform="translate(120, 162) scale(0.68)">
            <rect x="4" y="24" width="14" height="18" rx="4" fill="#09090b" stroke="#334155" strokeWidth="1.5" />
            <rect x="38" y="24" width="14" height="18" rx="4" fill="#09090b" stroke="#334155" strokeWidth="1.5" />
            <path d="M8 22 L16 10 L38 10 L48 22 Z" fill="#2d4a22" stroke="#1b3014" strokeWidth="2" />
            <polygon points="18,12 28,12 26,20 18,20" fill="url(#spartan-gold-visor)" />
            <path d="M26 10 L28 4 L38 4 L40 10" stroke="#18181b" strokeWidth="2.5" fill="none" />
            <rect x="36" y="2" width="6" height="6" rx="1" fill="#475569" />
            <line x1="42" y1="5" x2="52" y2="3" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      )}

      {/* Rock Band / Guitar Hero Axe Guitar */}
      {c.prop === "guitar-axe" && (
        <g id={`${keyPrefix}-prop-guitar-axe`}>
          <ellipse cx="66" cy="162" rx="7" ry="6" fill={skin} />
          <ellipse cx="132" cy="176" rx="7" ry="6" fill={skin} />
          <g transform="rotate(-28 100 165)">
            <rect x="96" y="80" width="8" height="85" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            <circle cx="100" cy="94" r="2" fill="#22c55e" />
            <circle cx="100" cy="102" r="2" fill="#ef4444" />
            <circle cx="100" cy="110" r="2" fill="#eab308" />
            <circle cx="100" cy="118" r="2" fill="#3b82f6" />
            <circle cx="100" cy="126" r="2" fill="#f97316" />
            <polygon points="100,165 72,195 90,205 100,185 110,205 128,195" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            <circle cx="100" cy="175" r="7" fill="#18181b" stroke="#ffffff" strokeWidth="1" />
            <rect x="98" y="168" width="4" height="12" rx="1" fill="#ffffff" />
            <line x1="106" y1="178" x2="114" y2="186" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      )}

      {/* 2000s Street Neon Skateboard */}
      {c.prop === "retro-skateboard" && (
        <g id={`${keyPrefix}-prop-skateboard`}>
          <ellipse cx="64" cy="170" rx="7" ry="6" fill={skin} />
          <g transform="rotate(22 75 165)">
            <rect x="68" y="115" width="16" height="90" rx="8" fill="#18181b" stroke="#ec4899" strokeWidth="2" />
            <line x1="76" y1="130" x2="76" y2="190" stroke="#a855f7" strokeWidth="3" strokeDasharray="6 4" />
            <circle cx="76" cy="160" r="4" fill="#22d3ee" />
            <circle cx="65" cy="132" r="4" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
            <circle cx="87" cy="132" r="4" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
            <circle cx="65" cy="188" r="4" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
            <circle cx="87" cy="188" r="4" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
          </g>
        </g>
      )}
    </g>
  );
}

export function NexusAvatar({
  config,
  size = "md",
  className = "",
  showStickerBadge = false,
  showStatusBubble = false,
  forceDuo = false,
}: NexusAvatarProps) {
  const c = config || DEFAULT_AVATAR;
  const dimension = typeof size === "number" ? size : SIZES[size] || 44;
  const showAura = dimension >= 36 && Boolean(c.aura && c.aura !== "none");

  // Determine whether to render the Persona Duo Scene
  const isDuo = Boolean(c.duoFriend?.avatar) && (forceDuo || dimension >= 36);
  const duoPose = c.duoFriend?.duoPose || "co-op";

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
      aria-label="Nexus Persona"
    >
      {/* Optional Speech Bubble */}
      {showStatusBubble && c.statusBubble && !isDuo && (
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

          {/* Xbox 360 & Reddit Mascots Gradients */}
          <linearGradient id="bg-xbox-360-blade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#107c10" />
            <stop offset="35%" stopColor="#22c55e" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <radialGradient id="bg-retro-nxe-sphere" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="40%" stopColor="#15803d" />
            <stop offset="80%" stopColor="#052e16" />
            <stop offset="100%" stopColor="#02140a" />
          </radialGradient>
          <linearGradient id="bg-reddit-vault" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="45%" stopColor="#4c1d95" />
            <stop offset="85%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#ff4500" />
          </linearGradient>
          <linearGradient id="spartan-gold-visor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>
          <radialGradient id="snoo-alien-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#ff4500" />
            <stop offset="80%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>

          {/* Skin and Shading Gradients */}
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
          <radialGradient id="high-five-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Backdrop */}
        <rect
          width="200"
          height="200"
          fill={`url(#bg-${c.background || "purple-gradient"})`}
        />

        {/* Animated Aura Effects (Optimized for >= 36px) */}
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

        {/* 2. MAIN RENDERING: DUO SCENE OR SOLO PERSONA */}
        {isDuo && c.duoFriend ? (
          /* =======================================================
             PERSONA DUO SCENE (Fixed & Beautifully Composed!)
             ======================================================= */
          <g id="persona-duo-scene">
            {/* Background ambiance for duo pose */}
            {duoPose === "celebrate" && (
              <g id="duo-confetti">
                <circle cx="40" cy="40" r="4" fill="#fbbf24" />
                <circle cx="80" cy="30" r="3" fill="#ec4899" />
                <circle cx="120" cy="25" r="4" fill="#22d3ee" />
                <circle cx="160" cy="45" r="3" fill="#a855f7" />
                <text x="100" y="48" textAnchor="middle" fontSize="16">💎</text>
              </g>
            )}

            {duoPose === "high-five" && (
              <circle cx="100" cy="108" r="32" fill="url(#high-five-glow)" opacity="0.85" />
            )}

            {/* Left Character: You (Scale 0.72, translated) */}
            <g transform="translate(64, 116) scale(0.72) translate(-100, -100)">
              {renderPersonaCharacter(c, "user-persona", false)}
            </g>

            {/* Right Character: Friend (Scale 0.72, translated) */}
            <g transform="translate(136, 116) scale(0.72) translate(-100, -100)">
              {renderPersonaCharacter(c.duoFriend.avatar, "friend-persona", true)}
            </g>

            {/* Center Dynamic Duo Interaction Overlay */}
            {duoPose === "co-op" && (
              <g id="duo-coop-fx">
                {/* Neon Connection Arc */}
                <path d="M78 142 Q100 128 122 142" stroke="#22d3ee" strokeWidth="3" fill="none" opacity="0.9" />
                <circle cx="100" cy="135" r="5" fill="#a855f7" stroke="#22d3ee" strokeWidth="1.5" />
                {/* P1 and P2 Tag Indicators */}
                <rect x="52" y="32" width="24" height="14" rx="4" fill="#3b82f6" />
                <text x="64" y="42" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="900">P1</text>
                <rect x="124" y="32" width="24" height="14" rx="4" fill="#ec4899" />
                <text x="136" y="42" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="900">P2</text>
                {/* Bottom Banner */}
                <rect x="55" y="174" width="90" height="18" rx="9" fill="#090514" stroke="#22d3ee" strokeWidth="1.5" />
                <text x="100" y="187" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="900" letterSpacing="0.5">🎮 SQUAD CO-OP</text>
              </g>
            )}

            {duoPose === "high-five" && (
              <g id="duo-highfive-fx">
                {/* Clapping starburst */}
                <polygon points="100,98 103,105 110,108 103,111 100,118 97,111 90,108 97,105" fill="#fde047" />
                <rect x="55" y="174" width="90" height="18" rx="9" fill="#090514" stroke="#fde047" strokeWidth="1.5" />
                <text x="100" y="187" textAnchor="middle" fill="#fde047" fontSize="9" fontWeight="900" letterSpacing="0.5">⚡ HIGH FIVE!</text>
              </g>
            )}

            {duoPose === "squad" && (
              <g id="duo-squad-fx">
                <rect x="55" y="174" width="90" height="18" rx="9" fill="#090514" stroke="#a855f7" strokeWidth="1.5" />
                <text x="100" y="187" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="900" letterSpacing="0.5">🛡️ SQUAD GOALS</text>
              </g>
            )}

            {duoPose === "boss-raid" && (
              <g id="duo-raid-fx">
                {/* Crossed Swords / Weapons */}
                <line x1="88" y1="120" x2="112" y2="95" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                <line x1="112" y1="120" x2="88" y2="95" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                <circle cx="100" cy="107" r="4" fill="#fbbf24" />
                <rect x="55" y="174" width="90" height="18" rx="9" fill="#090514" stroke="#ef4444" strokeWidth="1.5" />
                <text x="100" y="187" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="900" letterSpacing="0.5">⚔️ BOSS RAID</text>
              </g>
            )}

            {duoPose === "chill" && (
              <g id="duo-chill-fx">
                <rect x="55" y="174" width="90" height="18" rx="9" fill="#090514" stroke="#0284c7" strokeWidth="1.5" />
                <text x="100" y="187" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="900" letterSpacing="0.5">☕ CHILL VIBES</text>
              </g>
            )}

            {duoPose === "celebrate" && (
              <g id="duo-celebrate-fx">
                <rect x="55" y="174" width="90" height="18" rx="9" fill="#090514" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="100" y="187" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="900" letterSpacing="0.5">🎉 VICTORY!</text>
              </g>
            )}
          </g>
        ) : (
          /* =======================================================
             SOLO PERSONA SCENE (Centered with Scale 1)
             ======================================================= */
          renderPersonaCharacter(c, "solo", false)
        )}

        {/* 3. Comic Poses & Meme Action Badges (Solo Persona only) */}
        {!isDuo && c.pose === "fire" && (
          <g id="pose-fire"><text x="100" y="194" textAnchor="middle" fontSize="22">🔥</text></g>
        )}
        {!isDuo && c.pose === "gg" && (
          <g id="pose-gg">
            <rect x="70" y="174" width="60" height="20" rx="10" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">🎮 GG!</text>
          </g>
        )}
        {!isDuo && c.pose === "hype" && (
          <g id="pose-hype">
            <rect x="66" y="174" width="68" height="20" rx="10" fill="#a855f7" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">⚡ HYPE!</text>
          </g>
        )}
        {!isDuo && c.pose === "verified" && (
          <g id="pose-verified">
            <circle cx="100" cy="180" r="13" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
            <path d="M95 180 L99 184 L106 177" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        )}
        {!isDuo && c.pose === "chill" && (
          <g id="pose-chill">
            <rect x="66" y="174" width="68" height="20" rx="10" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">☕ CHILL</text>
          </g>
        )}
        {!isDuo && c.pose === "afk" && (
          <g id="pose-afk">
            <rect x="72" y="174" width="56" height="20" rx="10" fill="#475569" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">💤 AFK</text>
          </g>
        )}
        {!isDuo && c.pose === "raid" && (
          <g id="pose-raid">
            <rect x="68" y="174" width="64" height="20" rx="10" fill="#dc2626" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">⚔️ RAID</text>
          </g>
        )}
        {!isDuo && c.pose === "love" && (
          <g id="pose-love"><text x="100" y="194" textAnchor="middle" fontSize="22">❤️</text></g>
        )}
        {!isDuo && c.pose === "rocket" && (
          <g id="pose-rocket"><text x="100" y="194" textAnchor="middle" fontSize="22">🚀</text></g>
        )}
        {!isDuo && c.pose === "levelup" && (
          <g id="pose-levelup">
            <rect x="64" y="174" width="72" height="20" rx="10" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">⭐ LEVEL UP</text>
          </g>
        )}
        {!isDuo && c.pose === "ragequit" && (
          <g id="pose-rage">
            <rect x="60" y="174" width="80" height="20" rx="10" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">💥 RAGE QUIT</text>
          </g>
        )}
        {!isDuo && c.pose === "clutch" && (
          <g id="pose-clutch">
            <rect x="66" y="174" width="68" height="20" rx="10" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">🎯 1v5 CLUTCH</text>
          </g>
        )}
        {!isDuo && c.pose === "mindblown" && (
          <g id="pose-mindblown"><text x="100" y="194" textAnchor="middle" fontSize="22">🤯</text></g>
        )}
        {!isDuo && c.pose === "skull" && (
          <g id="pose-skull"><text x="100" y="194" textAnchor="middle" fontSize="22">💀</text></g>
        )}
        {!isDuo && c.pose === "stream" && (
          <g id="pose-stream">
            <rect x="64" y="174" width="72" height="20" rx="10" fill="#9333ea" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">🔴 LIVE NOW</text>
          </g>
        )}
        {!isDuo && c.pose === "dance" && (
          <g id="pose-dance"><text x="100" y="194" textAnchor="middle" fontSize="22">💃</text></g>
        )}
        {!isDuo && c.pose === "facepalm" && (
          <g id="pose-facepalm"><text x="100" y="194" textAnchor="middle" fontSize="22">🤦</text></g>
        )}
        {!isDuo && c.pose === "flex" && (
          <g id="pose-flex"><text x="100" y="194" textAnchor="middle" fontSize="22">💪</text></g>
        )}
        {!isDuo && c.pose === "wave" && (
          <g id="pose-wave"><text x="100" y="194" textAnchor="middle" fontSize="22">👋</text></g>
        )}
        {!isDuo && c.pose === "cry-laugh" && (
          <g id="pose-crylaugh"><text x="100" y="194" textAnchor="middle" fontSize="22">😂</text></g>
        )}
        {!isDuo && c.pose === "co-op" && (
          <g id="pose-coop">
            <rect x="66" y="174" width="68" height="20" rx="10" fill="#059669" stroke="#ffffff" strokeWidth="1" />
            <text x="100" y="188" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">🤝 CO-OP</text>
          </g>
        )}
        {!isDuo && c.pose === "salute" && (
          <g id="pose-salute"><text x="100" y="194" textAnchor="middle" fontSize="22">🫡</text></g>
        )}

        {/* Xbox 360 Achievement Unlocked Banner */}
        {!isDuo && c.pose === "achievement" && (
          <g id="pose-achievement">
            <rect x="15" y="166" width="170" height="26" rx="13" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
            <circle cx="30" cy="179" r="8" fill="#107c10" stroke="#22c55e" strokeWidth="1.5" />
            <text x="30" y="183" textAnchor="middle" fontSize="10">🏆</text>
            <text x="44" y="176" fill="#22c55e" fontSize="8" fontWeight="900" letterSpacing="0.5">ACHIEVEMENT UNLOCKED</text>
            <text x="44" y="187" fill="#ffffff" fontSize="9" fontWeight="800">100G — Legendary</text>
          </g>
        )}

        {/* Rock Hero Guitar Riff Pose */}
        {!isDuo && c.pose === "guitar-riff" && (
          <g id="pose-guitar-riff">
            <rect x="58" y="172" width="84" height="22" rx="11" fill="#dc2626" stroke="#facc15" strokeWidth="2" />
            <text x="100" y="187" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">🎸 ROCK ON! ⚡</text>
            <text x="28" y="150" fontSize="14">🎵</text>
            <text x="165" y="145" fontSize="14">🎶</text>
          </g>
        )}

        {/* Reddit Snoo Cosmic Bounce Pose */}
        {!isDuo && c.pose === "snoo-bounce" && (
          <g id="pose-snoo-bounce">
            <rect x="52" y="172" width="96" height="22" rx="11" fill="#4c1d95" stroke="#ff4500" strokeWidth="2" />
            <text x="100" y="187" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">✨ SNOO BOUNCE 🪐</text>
            <circle cx="28" cy="160" r="3" fill="#ff4500" />
            <circle cx="172" cy="155" r="4" fill="#fbbf24" />
          </g>
        )}

        {/* 4. Custom Comic Meme Caption Ribbon Banner */}
        {!isDuo && c.customCaption && (
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
      {showStickerBadge && c.pose && c.pose !== "portrait" && !isDuo && (
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
            : c.pose === "achievement"
            ? "🏆"
            : c.pose === "guitar-riff"
            ? "🎸"
            : c.pose === "snoo-bounce"
            ? "👾"
            : "✨"}
        </span>
      )}

      {/* Mini Duo Bond Badge Overlay */}
      {isDuo && (
        <span
          className="avatar-duo-badge-pill"
          title={`Persona Duo with ${c.duoFriend?.name || "Friend"}`}
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            background: "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)",
            color: "#ffffff",
            borderRadius: "50%",
            width: Math.max(18, Math.floor(dimension * 0.32)),
            height: Math.max(18, Math.floor(dimension * 0.32)),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: Math.max(10, Math.floor(dimension * 0.18)),
            border: "2px solid var(--surface)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
            pointerEvents: "none",
          }}
        >
          👥
        </span>
      )}
    </div>
  );
}
