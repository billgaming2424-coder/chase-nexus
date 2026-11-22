"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Coins,
  DollarSign,
  ArrowUpRight,
  Eye,
  Users,
  Video,
  Award,
  Sparkles,
  ShieldCheck,
  Check,
  Download,
} from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
import { sounds } from "@/lib/sounds";

export function StudioScreen() {
  const { walletBalance, currentUser, userProfile, addGems } = useNexus();
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "all">("30d");
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState<number | null>(null);
  const [studioToast, setStudioToast] = useState<string | null>(null);

  const earnings = {
    totalGemsEarned: 18450,
    tipsGems: 7200,
    gamePassRoyalties: 6500,
    marketplaceCut: 3250,
    chasePlusPool: 1500,
    estimatedUsd: "$184.50",
  };

  const handleWithdraw = () => {
    if (walletBalance < 500) {
      setStudioToast("⚠️ Minimum payout threshold is 500 Gems ($5.00 USD). Keep creating!");
      setTimeout(() => setStudioToast(null), 3500);
      return;
    }
    sounds.playCoin();
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawnAmount(walletBalance);
      setWithdrawing(false);
      sounds.playFanfare();
      setStudioToast(`🎉 Payout initiated! Transferring $${(walletBalance / 100).toFixed(2)} USD directly to your Chase Account.`);
      setTimeout(() => setStudioToast(null), 5000);
    }, 1200);
  };

  return (
    <section className="page studio-page">
      <header className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>Creator Studio</h1>
          <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: "0.88rem" }}>
            Real-time monetization, community tipping, and direct Chase Account payouts.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="pill" style={{ background: "rgba(168, 85, 247, 0.15)", color: "#c084fc", fontWeight: 700, padding: "5px 12px", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
            <ChaseBadge type="official" /> Certified Partner
          </span>
        </div>
      </header>

      {/* Floating Non-Blocking Studio Toast */}
      {studioToast && (
        <div
          style={{
            padding: "10px 16px",
            borderRadius: 14,
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(34, 197, 94, 0.25))",
            border: "1px solid rgba(168, 85, 247, 0.6)",
            color: "#ffffff",
            fontSize: "0.88rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 16,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            animation: "modalPopIn 0.2s ease-out",
          }}
        >
          {studioToast}
        </div>
      )}

      {/* Hero Financial Overview Card */}
      <div
        className="card"
        style={{
          padding: "24px 22px",
          background: "linear-gradient(135deg, rgba(30, 16, 52, 0.75) 0%, rgba(14, 10, 24, 0.9) 100%)",
          border: "1px solid rgba(168, 85, 247, 0.25)",
          borderRadius: 20,
          marginBottom: 18,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{ color: "var(--muted)", textTransform: "uppercase", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.06em" }}>
              Total Available Earnings
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 4 }}>
              <strong style={{ fontSize: "2.4rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
                ${(walletBalance / 100).toFixed(2)}
              </strong>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#c084fc" }}>
                {walletBalance.toLocaleString()} 💎
              </span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#4ade80", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
              <TrendingUp size={14} /> +24% growth vs previous month · Instant Direct Deposit ready
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{
              padding: "10px 22px",
              fontSize: "0.88rem",
              fontWeight: 700,
              borderRadius: 14,
              boxShadow: "0 4px 16px rgba(124, 58, 237, 0.4)",
              minWidth: 160,
            }}
            disabled={withdrawing || walletBalance < 500}
            onClick={handleWithdraw}
          >
            {withdrawing ? "Processing..." : `Withdraw Funds`}
          </button>
        </div>

        {/* Sub-Metric Row Strip inside Hero */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 14,
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div>
            <span style={{ fontSize: "0.74rem", color: "var(--muted)", display: "block" }}>Impressions & Views</span>
            <strong style={{ fontSize: "1.15rem", color: "#fff" }}>38.4K</strong>
            <span style={{ fontSize: "0.72rem", color: "#38bdf8", display: "block", marginTop: 2 }}>94% organic reach</span>
          </div>

          <div>
            <span style={{ fontSize: "0.74rem", color: "var(--muted)", display: "block" }}>Active Followers</span>
            <strong style={{ fontSize: "1.15rem", color: "#fff" }}>1,840</strong>
            <span style={{ fontSize: "0.72rem", color: "#c084fc", display: "block", marginTop: 2 }}>Top 5% Creator</span>
          </div>

          <div>
            <span style={{ fontSize: "0.74rem", color: "var(--muted)", display: "block" }}>Tips & Gifts Earned</span>
            <strong style={{ fontSize: "1.15rem", color: "#4ade80" }}>{earnings.tipsGems} 💎</strong>
            <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block", marginTop: 2 }}>From 142 supporters</span>
          </div>

          <div>
            <span style={{ fontSize: "0.74rem", color: "var(--muted)", display: "block" }}>Payout Destination</span>
            <strong style={{ fontSize: "0.95rem", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
              {currentUser ? currentUser.email : "billchase@chase-studios.org"}
            </strong>
            <span style={{ fontSize: "0.72rem", color: "#4ade80", display: "block", marginTop: 2 }}>Direct Deposit Active</span>
          </div>
        </div>
      </div>

      {/* Analytics & Payout Details Grid */}
      <div className="studio-split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Revenue Stream Breakdown */}
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>Revenue Streams</h3>
            <span className="pill" style={{ fontSize: "0.72rem" }}>Past 30 Days</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 5 }}>
                <span style={{ color: "var(--silver)" }}>Creator Tips & DM Gifts (39%)</span>
                <strong style={{ color: "#fff" }}>{earnings.tipsGems} 💎</strong>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: "39%", height: "100%", background: "#a855f7" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 5 }}>
                <span style={{ color: "var(--silver)" }}>Game Pass Royalties (35%)</span>
                <strong style={{ color: "#fff" }}>{earnings.gamePassRoyalties} 💎</strong>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: "35%", height: "100%", background: "#38bdf8" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 5 }}>
                <span style={{ color: "var(--silver)" }}>Persona Gear & Marketplace (18%)</span>
                <strong style={{ color: "#fff" }}>{earnings.marketplaceCut} 💎</strong>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: "18%", height: "100%", background: "#4ade80" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 5 }}>
                <span style={{ color: "var(--silver)" }}>Chase+ Creator Revenue Pool (8%)</span>
                <strong style={{ color: "#fff" }}>{earnings.chasePlusPool} 💎</strong>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: "8%", height: "100%", background: "#f59e0b" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Direct Deposit & Verification Card */}
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>Payout Settings</h3>
            <span className="pill" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#4ade80", fontSize: "0.72rem" }}>
              ✓ Verified Account
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 4 }}>
                <span style={{ color: "var(--muted)" }}>Payout Method:</span>
                <strong style={{ color: "#fff" }}>Direct Deposit / Chase Account</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 4 }}>
                <span style={{ color: "var(--muted)" }}>Minimum Threshold:</span>
                <span style={{ color: "#c084fc", fontWeight: 600 }}>500 Gems ($5.00 USD)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                <span style={{ color: "var(--muted)" }}>Processing Fee:</span>
                <span style={{ color: "#4ade80", fontWeight: 600 }}>0% (Covered by Chase Studios)</span>
              </div>
            </div>

            <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0, lineHeight: 1.45 }}>
              All creator tips, game pass royalties, and marketplace earnings are calculated in real-time. Payouts transfer directly to your registered account within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
