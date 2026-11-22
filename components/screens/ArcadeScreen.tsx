"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Gamepad2,
  Trophy,
  Zap,
  Target,
  Sparkles,
  Shield,
  Flame,
  Coins,
  Play,
  RotateCcw,
  Check,
  Star,
  Swords,
  Heart,
} from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
import { sounds } from "@/lib/sounds";

export function ArcadeScreen() {
  const { walletBalance, addGems, userAvatar } = useNexus();
  const [activeGame, setActiveGame] = useState<"unimon" | "deadeye" | "runway">("unimon");

  // UNIMON BATTLE ARENA STATE
  const [unimonChoice, setUnimonChoice] = useState<"ignifox" | "voltkin" | "voidscale">("ignifox");
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>([
    "A wild Shadow Voidbeast appeared in Aetheria!",
  ]);
  const [battleOver, setBattleOver] = useState(false);
  const [battleWon, setBattleWon] = useState(false);
  const [chargeMeter, setChargeMeter] = useState(0);

  // DEADEYE QUICK-DRAW CHALLENGE STATE
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [targetPos, setTargetPos] = useState({ top: 40, left: 50 });
  const [highScore, setHighScore] = useState(1240);

  // RUNWAY FASHION SHOWCASE STATE
  const [votedOutfits, setVotedOutfits] = useState<Record<string, number>>({
    c1: 142,
    c2: 218,
    c3: 189,
  });
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});
  const [arcadeToast, setArcadeToast] = useState<string | null>(null);

  // DEADEYE Timer (Smooth, no interval thrashing)
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          sounds.playFanfare();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  // Handle game finish rewards
  useEffect(() => {
    if (timeLeft === 0 && !gameActive && score > 0) {
      if (score > highScore) {
        setHighScore(score);
      }
      const reward = Math.max(50, Math.floor(score / 5));
      addGems(reward);
      setArcadeToast(`🎯 Time's up! You scored ${score} points and earned ${reward} Nexus Gems!`);
      setTimeout(() => setArcadeToast(null), 4000);
    }
  }, [timeLeft, gameActive, score, highScore, addGems]);

  const handleStartDeadeye = () => {
    sounds.playPop();
    setScore(0);
    setTimeLeft(15);
    setGameActive(true);
    moveTarget();
  };

  const moveTarget = () => {
    const top = Math.floor(Math.random() * 65) + 15;
    const left = Math.floor(Math.random() * 75) + 10;
    setTargetPos({ top, left });
  };

  const handleShootTarget = () => {
    if (!gameActive) return;
    sounds.playZap();
    setScore((s) => s + 100);
    moveTarget();
  };

  // UNIMON BATTLE ACTIONS
  const handleAttack = () => {
    if (battleOver) return;
    sounds.playHit();
    const dmg = Math.floor(Math.random() * 20) + 15;
    const newEnemyHp = Math.max(0, enemyHp - dmg);
    setEnemyHp(newEnemyHp);
    setChargeMeter((c) => Math.min(100, c + 35));

    const moves = {
      ignifox: "Blazing Flare Claw",
      voltkin: "Thunderbolt Strike",
      voidscale: "Astral Void Beam",
    };

    setBattleLog((prev) => [
      `Your Unimon used ${moves[unimonChoice]} for ${dmg} damage!`,
      ...prev.slice(0, 4),
    ]);

    if (newEnemyHp === 0) {
      setBattleOver(true);
      setBattleWon(true);
      sounds.playFanfare();
      addGems(150);
      setBattleLog((prev) => [
        "🏆 Victory! You defeated the Shadow Voidbeast and earned 150 Nexus Gems!",
        ...prev.slice(0, 4),
      ]);
      return;
    }

    // Enemy counter-attack
    setTimeout(() => {
      const enemyDmg = Math.floor(Math.random() * 16) + 10;
      const newPlayerHp = Math.max(0, playerHp - enemyDmg);
      setPlayerHp(newPlayerHp);
      sounds.playPop();
      setBattleLog((prev) => [
        `Shadow Voidbeast countered with Dark Surge for ${enemyDmg} damage!`,
        ...prev.slice(0, 4),
      ]);

      if (newPlayerHp === 0) {
        setBattleOver(true);
        setBattleWon(false);
        setBattleLog((prev) => [
          "💀 Defeat! Your Unimon retreated to safety.",
          ...prev.slice(0, 4),
        ]);
      }
    }, 450);
  };

  const handleUltimateBurst = () => {
    if (battleOver || chargeMeter < 100) return;
    sounds.playZap();
    const dmg = Math.floor(Math.random() * 30) + 45;
    const newEnemyHp = Math.max(0, enemyHp - dmg);
    setEnemyHp(newEnemyHp);
    setChargeMeter(0);

    setBattleLog((prev) => [
      `💥 CRITICAL BURST! Ultra Elemental Nova dealt a massive ${dmg} damage!`,
      ...prev.slice(0, 4),
    ]);

    if (newEnemyHp === 0) {
      setBattleOver(true);
      setBattleWon(true);
      sounds.playFanfare();
      addGems(200);
      setBattleLog((prev) => [
        "🏆 Victory! You obliterated the Shadow Voidbeast and claimed 200 Nexus Gems!",
        ...prev.slice(0, 4),
      ]);
      return;
    }

    setTimeout(() => {
      const enemyDmg = Math.floor(Math.random() * 12) + 8;
      const newPlayerHp = Math.max(0, playerHp - enemyDmg);
      setPlayerHp(newPlayerHp);
      setBattleLog((prev) => [
        `Shadow Voidbeast staggered and struck back for ${enemyDmg} damage!`,
        ...prev.slice(0, 4),
      ]);
    }, 450);
  };

  const resetBattle = () => {
    sounds.playPop();
    setPlayerHp(100);
    setEnemyHp(100);
    setChargeMeter(0);
    setBattleOver(false);
    setBattleWon(false);
    setBattleLog(["A new Shadow Voidbeast stepped onto the battleground!"]);
  };

  const handleVoteRunway = (id: string) => {
    if (userVoted[id]) return;
    sounds.playCoin();
    setUserVoted((prev) => ({ ...prev, [id]: true }));
    setVotedOutfits((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    addGems(25);
    setArcadeToast("⭐ Voted! You earned +25 Nexus Gems for rating community styles.");
    setTimeout(() => setArcadeToast(null), 3500);
  };

  return (
    <section className="page arcade-page">
      <header className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <p className="eyebrow">Interactive Ecosystem</p>
          <h1>Nexus Arcade Realm</h1>
          <p>
            Play mini-games built with Chase Studios IP, test your reflexes, and earn Nexus Gems.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="gem-wallet-badge" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "rgba(168, 85, 247, 0.15)", border: "1px solid rgba(168, 85, 247, 0.35)", borderRadius: 20 }}>
            <Coins size={18} className="purple-icon" />
            <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff" }}>
              {walletBalance} 💎
            </span>
          </div>
          <Link href="/marketplace" className="btn btn-secondary btn-sm" style={{ borderRadius: 20 }}>
            Marketplace
          </Link>
        </div>
      </header>

      {/* Floating Non-Blocking Toast for Mobile & Desktop */}
      {arcadeToast && (
        <div
          style={{
            padding: "10px 16px",
            borderRadius: 14,
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(56, 189, 248, 0.25))",
            border: "1px solid rgba(168, 85, 247, 0.6)",
            color: "#ffffff",
            fontSize: "0.9rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 16,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            animation: "modalPopIn 0.2s ease-out",
          }}
        >
          {arcadeToast}
        </div>
      )}

      {/* Arcade Navigation Switcher */}
      <div className="tabs" role="tablist" style={{ marginBottom: 20 }}>
        <button
          type="button"
          className={`tab ${activeGame === "unimon" ? "is-active" : ""}`}
          onClick={() => {
            sounds.playPop();
            setActiveGame("unimon");
          }}
        >
          <Swords size={16} />
          <span>Unimon Arena Battle</span>
        </button>
        <button
          type="button"
          className={`tab ${activeGame === "deadeye" ? "is-active" : ""}`}
          onClick={() => {
            sounds.playPop();
            setActiveGame("deadeye");
          }}
        >
          <Target size={16} />
          <span>DEADEYE Quick-Draw</span>
        </button>
        <button
          type="button"
          className={`tab ${activeGame === "runway" ? "is-active" : ""}`}
          onClick={() => {
            sounds.playPop();
            setActiveGame("runway");
          }}
        >
          <Sparkles size={16} />
          <span>Persona Fashion Runway</span>
        </button>
      </div>

      {/* GAME 1: UNIMON ARENA BATTLE */}
      {activeGame === "unimon" && (
        <div className="card arcade-game-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <span className="pill" style={{ background: "rgba(245, 158, 11, 0.2)", color: "#fbbf24" }}>
                Unimon Legends Official Mini-Game
              </span>
              <h2 style={{ margin: "6px 0 0" }}>Aetheria Battle Simulator</h2>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={resetBattle} style={{ gap: 6 }}>
              <RotateCcw size={14} /> Reset Encounter
            </button>
          </div>

          {/* Monster Selection */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            {[
              { id: "ignifox" as const, name: "Ignifox", type: "Fire", icon: "🦊🔥" },
              { id: "voltkin" as const, name: "Voltkin", type: "Electric", icon: "⚡🐺" },
              { id: "voidscale" as const, name: "Voidscale", type: "Cosmic", icon: "🌌🐉" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                className={`choice-chip ${unimonChoice === m.id ? "is-active" : ""}`}
                style={{ padding: "8px 16px", borderRadius: 14 }}
                onClick={() => {
                  sounds.playPop();
                  setUnimonChoice(m.id);
                  resetBattle();
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{m.icon}</span>
                <strong>{m.name}</strong> ({m.type})
              </button>
            ))}
          </div>

          {/* Battle Arena Viewport */}
          <div
            style={{
              background: "radial-gradient(circle at 50% 30%, #2e1065 0%, #0c0617 100%)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              borderRadius: 18,
              padding: 24,
              marginBottom: 16,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Health Bars */}
            <div className="arcade-health-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              {/* Player Unimon */}
              <div style={{ background: "rgba(0,0,0,0.5)", padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <strong style={{ color: "#fff", textTransform: "capitalize" }}>{unimonChoice} (You)</strong>
                  <span style={{ color: playerHp > 30 ? "#4ade80" : "#ef4444", fontWeight: 700 }}>
                    {playerHp} / 100 HP
                  </span>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${playerHp}%`, height: "100%", background: playerHp > 30 ? "#22c55e" : "#ef4444", transition: "width 0.3s ease" }} />
                </div>
              </div>

              {/* Enemy Boss */}
              <div style={{ background: "rgba(0,0,0,0.5)", padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <strong style={{ color: "#f87171" }}>Shadow Voidbeast</strong>
                  <span style={{ color: enemyHp > 30 ? "#4ade80" : "#ef4444", fontWeight: 700 }}>
                    {enemyHp} / 100 HP
                  </span>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${enemyHp}%`, height: "100%", background: enemyHp > 30 ? "#a855f7" : "#ef4444", transition: "width 0.3s ease" }} />
                </div>
              </div>
            </div>

            {/* Combatants Stage */}
            <div className="arcade-combatants" style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "16px 0" }}>
              <div style={{ textAlign: "center" }}>
                <div className="combatant-emoji" style={{ fontSize: "4rem", filter: "drop-shadow(0 0 16px rgba(168,85,247,0.6))" }}>
                  {unimonChoice === "ignifox" ? "🦊🔥" : unimonChoice === "voltkin" ? "⚡🐺" : "🌌🐉"}
                </div>
                <small style={{ color: "var(--muted)", textTransform: "uppercase", fontWeight: 700 }}>Lv. 35 Companion</small>
              </div>

              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#a855f7" }}>VS</div>

              <div style={{ textAlign: "center" }}>
                <div className="combatant-emoji" style={{ fontSize: "4rem", filter: "drop-shadow(0 0 16px rgba(239,68,68,0.6))" }}>
                  👾🕷️
                </div>
                <small style={{ color: "#f87171", textTransform: "uppercase", fontWeight: 700 }}>Void Boss</small>
              </div>
            </div>

            {/* Battle Log Box */}
            <div style={{ background: "rgba(0,0,0,0.6)", borderRadius: 12, padding: "10px 14px", marginTop: 16, minHeight: 70, border: "1px solid rgba(255,255,255,0.06)" }}>
              {battleLog.map((log, i) => (
                <p key={i} style={{ margin: "2px 0", fontSize: "0.85rem", color: i === 0 ? "#fff" : "var(--muted)", fontWeight: i === 0 ? 600 : 400 }}>
                  {log}
                </p>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: "12px 24px", fontSize: "0.95rem", gap: 8, borderRadius: 16 }}
              disabled={battleOver}
              onClick={handleAttack}
            >
              <Swords size={18} /> Attack Strike
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              style={{
                padding: "12px 24px",
                fontSize: "0.95rem",
                gap: 8,
                borderRadius: 16,
                background: chargeMeter >= 100 ? "linear-gradient(135deg, #9333ea, #38bdf8)" : undefined,
                color: "#fff",
              }}
              disabled={battleOver || chargeMeter < 100}
              onClick={handleUltimateBurst}
            >
              <Zap size={18} /> Ultimate Nova ({chargeMeter}%)
            </button>

            {battleOver && (
              <button
                type="button"
                className="btn btn-primary"
                style={{ padding: "12px 24px", borderRadius: 16, background: "#22c55e" }}
                onClick={resetBattle}
              >
                Play Again (+150 💎)
              </button>
            )}
          </div>
        </div>
      )}

      {/* GAME 2: DEADEYE QUICK-DRAW CHALLENGE */}
      {activeGame === "deadeye" && (
        <div className="card arcade-game-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <div>
              <span className="pill" style={{ background: "rgba(239, 68, 68, 0.2)", color: "#f87171" }}>
                DEADEYE Survival Shooter Mini-Game
              </span>
              <h2 style={{ margin: "6px 0 0" }}>Reaction Target Gallery</h2>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div>
                <small style={{ color: "var(--muted)", display: "block" }}>Personal Best</small>
                <strong style={{ fontSize: "1.1rem", color: "#fbbf24" }}>{highScore} pts</strong>
              </div>
              <div>
                <small style={{ color: "var(--muted)", display: "block" }}>Time Left</small>
                <strong style={{ fontSize: "1.1rem", color: timeLeft <= 5 ? "#ef4444" : "#4ade80" }}>
                  {timeLeft}s
                </strong>
              </div>
            </div>
          </div>

          {/* Shooting Gallery Canvas Area */}
          <div
            style={{
              height: 340,
              background: "radial-gradient(circle at 50% 50%, #1e102a 0%, #090510 100%)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 18,
              position: "relative",
              overflow: "hidden",
              marginBottom: 16,
              cursor: gameActive ? "crosshair" : "default",
            }}
          >
            {gameActive ? (
              <button
                type="button"
                onClick={handleShootTarget}
                style={{
                  position: "absolute",
                  top: `${targetPos.top}%`,
                  left: `${targetPos.left}%`,
                  transform: "translate(-50%, -50%)",
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #ef4444 0%, #7f1d1d 70%, #000 100%)",
                  border: "3px solid #fecaca",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 24px rgba(239, 68, 68, 0.8)",
                  cursor: "crosshair",
                  padding: 0,
                  animation: "pulse 0.5s infinite alternate",
                }}
              >
                <Target size={36} color="#ffffff" />
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: 20 }}>
                <Target size={48} className="purple-icon" style={{ marginBottom: 12 }} />
                <h3 style={{ margin: "0 0 8px" }}>Ready to Test Your Reflexes?</h3>
                <p className="hint" style={{ maxWidth: 360, margin: "0 0 16px" }}>
                  Click targets as fast as possible in 15 seconds to rack up multipliers and earn bonus Gems!
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: "10px 28px", borderRadius: 24, fontSize: "1rem" }}
                  onClick={handleStartDeadeye}
                >
                  <Play size={16} /> Start 15s Challenge
                </button>
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Current Session Score: </span>
              <strong style={{ fontSize: "1.2rem", color: "#38bdf8" }}>{score} pts</strong>
            </div>
            {gameActive && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setGameActive(false)}
              >
                End Run
              </button>
            )}
          </div>
        </div>
      )}

      {/* GAME 3: PERSONA FASHION RUNWAY */}
      {activeGame === "runway" && (
        <div className="card arcade-game-card">
          <div style={{ marginBottom: 16 }}>
            <span className="pill" style={{ background: "rgba(236, 72, 153, 0.2)", color: "#f472b6" }}>
              Community Style & Voting
            </span>
            <h2 style={{ margin: "6px 0 0" }}>Persona Fashion Runway Showcase</h2>
            <p className="hint">Vote for your favorite creative creator outfits and earn 25 Gems per vote!</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              {
                id: "c1",
                creator: "Avery Quinn",
                title: "Cyberpunk Streetwear",
                tag: "Neon Cyan",
                avatar: {
                  ...userAvatar,
                  outfit: "cyber-jacket" as const,
                  accessory: "cyber-visor" as const,
                  prop: "steam-deck" as const,
                },
              },
              {
                id: "c2",
                creator: "Bill Chase",
                title: "Obsidian Void Knight",
                tag: "Void Paladin",
                avatar: {
                  ...userAvatar,
                  outfit: "void-paladin" as const,
                  accessory: "crown" as const,
                  prop: "laser-sword" as const,
                  aura: "cosmic-void" as const,
                },
              },
              {
                id: "c3",
                creator: "Samira Cole",
                title: "Aetheria Grandmaster",
                tag: "Unimon Master",
                avatar: {
                  ...userAvatar,
                  outfit: "unimon-master" as const,
                  accessory: "halo" as const,
                  prop: "trophy" as const,
                  aura: "golden-halo" as const,
                },
              },
            ].map((entry) => (
              <div
                key={entry.id}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(168, 85, 247, 0.25)",
                  borderRadius: 16,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <NexusAvatar config={entry.avatar} size={110} showStickerBadge />
                <h4 style={{ margin: "12px 0 2px", fontSize: "1rem" }}>{entry.title}</h4>
                <small style={{ color: "var(--muted)", marginBottom: 12 }}>
                  By <strong>{entry.creator}</strong> · {entry.tag}
                </small>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "auto", paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#c084fc" }}>
                    ⭐ {votedOutfits[entry.id]} Votes
                  </span>
                  <button
                    type="button"
                    className={`btn btn-sm ${userVoted[entry.id] ? "btn-secondary" : "btn-primary"}`}
                    disabled={userVoted[entry.id]}
                    onClick={() => handleVoteRunway(entry.id)}
                    style={{ borderRadius: 16 }}
                  >
                    {userVoted[entry.id] ? "Voted ✓" : "Vote (+25 💎)"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
