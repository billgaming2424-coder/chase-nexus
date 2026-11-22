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
      <header className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <p className="eyebrow">Nexus Creator Economy</p>
          <h1>Creator Studio & Analytics</h1>
          <p>
            Monetization metrics, community tipping, game pass royalties, and direct Chase Account payouts.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="pill" style={{ background: "rgba(168, 85, 247, 0.2)", color: "#c084fc", fontWeight: 700 }}>
            <ChaseBadge type="official" /> Certified Creator Partner
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
            fontSize: "0.9rem",
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

      {/* Metric Cards Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
        <div className="card" style={{ padding: 18 }}>
          <small style={{ color: "var(--muted)", textTransform: "uppercase", fontSize: "0.72rem", fontWeight: 700 }}>
            Wallet Balance
          </small>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
            <strong style={{ fontSize: "1.6rem", color: "#fff" }}>{walletBalance} 💎</strong>
            <Coins size={24} className="purple-icon" />
          </div>
          <small style={{ color: "#4ade80", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
            <TrendingUp size={14} /> +24% this week
          </small>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <small style={{ color: "var(--muted)", textTransform: "uppercase", fontSize: "0.72rem", fontWeight: 700 }}>
            Estimated USD Value
          </small>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
            <strong style={{ fontSize: "1.6rem", color: "#4ade80" }}>${(walletBalance / 100).toFixed(2)}</strong>
            <DollarSign size={24} style={{ color: "#4ade80" }} />
          </div>
          <small style={{ color: "var(--muted)", marginTop: 4, display: "block" }}>
            100 Gems = $1.00 USD Direct Deposit
          </small>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <small style={{ color: "var(--muted)", textTransform: "uppercase", fontSize: "0.72rem", fontWeight: 700 }}>
            Impressions & Views
          </small>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
            <strong style={{ fontSize: "1.6rem", color: "#fff" }}>38.4K</strong>
            <Eye size={24} className="silver-icon" />
          </div>
          <small style={{ color: "#38bdf8", fontWeight: 600, marginTop: 4, display: "block" }}>
            94% organic reach across feeds
          </small>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <small style={{ color: "var(--muted)", textTransform: "uppercase", fontSize: "0.72rem", fontWeight: 700 }}>
            Subscribers & Fans
          </small>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
            <strong style={{ fontSize: "1.6rem", color: "#fff" }}>1,840</strong>
            <Users size={24} className="purple-icon" />
          </div>
          <small style={{ color: "#c084fc", fontWeight: 600, marginTop: 4, display: "block" }}>
            Top 5% Creator on Chase Nexus
          </small>
        </div>
      </div>

      {/* Payout & Revenue Breakdown Section */}
      <div className="studio-split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Direct Deposit Simulator */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Chase Account Payout</h3>
            <span className="pill" style={{ background: "rgba(34, 197, 94, 0.2)", color: "#4ade80" }}>
              Instant Transfer Active
            </span>
          </div>
          <p className="hint">
            Cash out your virtual Gems balance directly to your verified Chase Studios Account or PayPal.
          </p>

          <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 14, padding: 14, margin: "14px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "var(--muted)" }}>Available to Cash Out:</span>
              <strong style={{ color: "#fff" }}>{walletBalance} Gems (${(walletBalance / 100).toFixed(2)})</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)" }}>Destination Account:</span>
              <strong style={{ color: "#c084fc" }}>
                {currentUser ? currentUser.email : "billchase@chase-studios.org"}
              </strong>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "100%", padding: 12, borderRadius: 14, fontSize: "0.95rem" }}
            disabled={withdrawing || walletBalance < 500}
            onClick={handleWithdraw}
          >
            {withdrawing ? "Processing Direct Deposit..." : `Withdraw $${(walletBalance / 100).toFixed(2)} USD`}
          </button>
        </div>

        {/* Revenue Stream Breakdown */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ margin: "0 0 14px" }}>Revenue Stream Breakdown</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: 4 }}>
                <span>Creator Tips & DM Gifts (39%)</span>
                <strong>{earnings.tipsGems} 💎</strong>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: "39%", height: "100%", background: "#a855f7" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: 4 }}>
                <span>Game Pass Royalties (Unimon/DEADEYE) (35%)</span>
                <strong>{earnings.gamePassRoyalties} 💎</strong>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: "35%", height: "100%", background: "#38bdf8" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: 4 }}>
                <span>Bitmoji Gear & Marketplace Cut (18%)</span>
                <strong>{earnings.marketplaceCut} 💎</strong>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: "18%", height: "100%", background: "#4ade80" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: 4 }}>
                <span>Chase+ Creator Revenue Pool (8%)</span>
                <strong>{earnings.chasePlusPool} 💎</strong>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: "8%", height: "100%", background: "#f59e0b" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
