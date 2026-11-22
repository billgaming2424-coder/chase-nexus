"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  Download,
  Flame,
  Lock,
  MessageCircle,
  Mic,
  MicOff,
  Monitor,
  Phone,
  PhoneOff,
  Send,
  Shield,
  Video as VideoIcon,
  VideoOff,
  Smartphone,
  Moon,
  Eye,
  Award,
  Sparkles,
  Radio,
  Search,
  Bookmark,
  Hash,
  Users,
  X,
  ShoppingBag,
  Coins,
  Gift,
  Zap,
  ShieldAlert,
  Volume2,
  Play,
  Pause,
  Compass,
  Heart,
  Share2,
  ThumbsUp,
  AlertTriangle,
  ShieldCheck,
  Star,
} from "lucide-react";
import { PostCard } from "@/components/feed/PostCard";
import { StoriesRow } from "@/components/feed/StoriesRow";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";
import { NexusAvatarBuilder } from "@/components/nexus/NexusAvatarBuilder";
import { useNexus } from "@/components/nexus/NexusProvider";
import { sounds } from "@/lib/sounds";
import {
  COMMUNITIES,
  CONVERSATIONS,
  SUGGESTED,
  TRENDING,
  VIDEOS,
  type DemoConversation,
  type DemoMessage,
} from "@/lib/demo-data";
import type { ThemeName } from "@/lib/types";

const THEMES: { id: ThemeName; label: string; detail: string }[] = [
  { id: "chase-purple", label: "Chase Purple", detail: "Black, silver, and vibrant purple" },
  { id: "midnight", label: "Midnight", detail: "Deep obsidian with cool silver accents" },
  { id: "light", label: "Light", detail: "Clean silver-white with purple accents" },
];

export function VideoScreen() {
  const [loadStream, setLoadStream] = useState(false);

  return (
    <section className="page">
      <p className="eyebrow">Nexus Video & Streams</p>
      <h1>Video & Live Broadcasts</h1>
      <p>Watch official studio streams, game showcases, community clips, and creator channels.</p>

      {/* Bill Chase Official Live Twitch Stream */}
      <div className="card twitch-live-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div>
            <span className="card-badge" style={{ background: "rgba(168, 85, 247, 0.2)", color: "#c084fc", border: "1px solid rgba(168, 85, 247, 0.4)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Radio size={12} className="purple-icon" /> Live Stream Hub
            </span>
            <h2 style={{ margin: "4px 0 0", fontSize: "1.3rem" }}>Bill Chase Live on Twitch</h2>
            <p className="hint" style={{ margin: 0 }}>Watch game development, Unimon raids, and DEADEYE co-op live</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href="https://twitch.tv/billgaming2424"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ background: "#9146ff", color: "#fff" }}
            >
              Open on Twitch
            </a>
            {!loadStream && (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setLoadStream(true)}
              >
                Load Stream Player
              </button>
            )}
          </div>
        </div>

        <div className="twitch-embed-frame">
          {loadStream ? (
            <iframe
              src="https://player.twitch.tv/?channel=billgaming2424&parent=nexus.chase-studios.org&parent=chase-nexus.vercel.app&parent=localhost&muted=true"
              allowFullScreen
              title="Bill Chase Twitch Stream"
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                minHeight: 240,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "radial-gradient(circle, #2e1065, #0f0a1c)",
                cursor: "pointer",
                padding: 20,
                textAlign: "center",
              }}
              onClick={() => setLoadStream(true)}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#9146ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                  boxShadow: "0 0 20px rgba(145, 71, 255, 0.6)",
                }}
              >
                <Radio size={24} color="#fff" />
              </div>
              <h3 style={{ margin: "0 0 4px" }}>Click to Watch Bill Chase on Twitch</h3>
              <p className="hint" style={{ margin: 0 }}>Live stream player loads on-demand for smooth PC performance</p>
            </div>
          )}
        </div>
      </div>

      <div className="section-title">Community Clips & Highlights</div>
      <div className="video-grid">
        {VIDEOS.map((video) => (
          <article key={video.id} className="video-card card">
            <div className="media" data-tone={video.tone}>
              <span>{video.length}</span>
            </div>
            <h2>{video.title}</h2>
            <p className="author-name">
              <span>{video.channel}</span>
              <ChaseBadge type="official" />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExploreScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "tags" | "creators" | "guilds">("all");
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  const needle = search.trim().toLowerCase();
  const filteredTags = TRENDING.filter(
    (t) => !needle || t.label.toLowerCase().includes(needle) || t.tag.toLowerCase().includes(needle)
  );
  const filteredCreators = SUGGESTED.filter(
    (c) => !needle || c.name.toLowerCase().includes(needle) || c.handle.toLowerCase().includes(needle)
  );
  const filteredGuilds = COMMUNITIES.filter(
    (g) => !needle || g.name.toLowerCase().includes(needle) || g.description.toLowerCase().includes(needle)
  );

  const toggleFollow = (handle: string) => {
    setFollowed((prev) => ({ ...prev, [handle]: !prev[handle] }));
  };

  return (
    <section className="page">
      <p className="eyebrow">Nexus Discovery & Explore</p>
      <h1>Explore Nexus</h1>
      <p>
        Discover trending game discussions, community creators, guilds, and live streams across Chase Studios.
      </p>

      {/* Live Search Bar */}
      <div
        className="card explore-search-bar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          marginBottom: 16,
          background: "var(--surface)",
        }}
      >
        <Search size={18} className="silver-icon" />
        <input
          type="text"
          value={search}
          placeholder="Search tags, creators, games, guilds..."
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--foreground)",
            width: "100%",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
        {search && (
          <button
            type="button"
            className="icon-btn"
            onClick={() => setSearch("")}
            style={{ width: 24, height: 24 }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="pill-tabs" style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {(["all", "tags", "creators", "guilds"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            className={`choice-chip ${filter === tab ? "is-active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab === "all"
              ? "🔥 All Trends"
              : tab === "tags"
              ? "# Trending Tags"
              : tab === "creators"
              ? "✨ Creators"
              : "🛡️ Communities"}
          </button>
        ))}
      </div>

      {/* Trending Topics & Hashtags */}
      {(filter === "all" || filter === "tags") && (
        <div style={{ marginBottom: 28 }}>
          <div className="section-title" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <Hash size={16} className="purple-icon" /> Trending Topics & Game Tags
          </div>
          <div className="link-grid">
            {filteredTags.map((topic) => (
              <Link key={topic.tag} className="card link-card" href={`/?tag=${topic.tag}`}>
                <strong>{topic.label}</strong>
                <span>{topic.detail}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Creators */}
      {(filter === "all" || filter === "creators") && (
        <div style={{ marginBottom: 28 }}>
          <div className="section-title" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <Users size={16} className="purple-icon" /> Suggested Creators & Developers
          </div>
          <div
            className="creator-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 12,
            }}
          >
            {filteredCreators.map((creator) => (
              <div
                key={creator.handle}
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  padding: 14,
                }}
              >
                <div>
                  <div className="author-name">
                    <strong>{creator.name}</strong>
                    {creator.verified && <ChaseBadge type={creator.badgeType} />}
                  </div>
                  <small className="hint">
                    {creator.handle} · {creator.note}
                  </small>
                </div>
                <button
                  type="button"
                  className={`btn btn-sm ${followed[creator.handle] ? "btn-secondary" : "btn-primary"}`}
                  onClick={() => toggleFollow(creator.handle)}
                >
                  {followed[creator.handle] ? "Following" : "+ Follow"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Guilds */}
      {(filter === "all" || filter === "guilds") && (
        <div style={{ marginBottom: 28 }}>
          <div className="section-title" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <Shield size={16} className="purple-icon" /> Featured Communities & Guilds
          </div>
          <div className="link-grid">
            {filteredGuilds.map((g) => (
              <Link key={g.id} className="card link-card" href="/communities">
                <strong>{g.name}</strong>
                <span>{g.description}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function CommunitiesScreen() {
  const [activeTab, setActiveTab] = useState<"guilds" | "moderation">("guilds");
  const [joined, setJoined] = useState<Record<string, boolean>>({
    "unimon-legends": true,
    "deadeye": true,
  });
  const [flaggedReports, setFlaggedReports] = useState([
    {
      id: "rep-1",
      author: "ShadowBot99",
      reason: "Suspicious external phishing link",
      content: "Free game keys at http://shady-link.xyz claim now!!",
      time: "10m ago",
    },
    {
      id: "rep-2",
      author: "ToxicGamer2026",
      reason: "Harassment in DEADEYE Survival raid thread",
      content: "You all suck at this game stop playing forever",
      time: "24m ago",
    },
  ]);
  const [autoModFilters, setAutoModFilters] = useState({
    antiSpam: true,
    antiPhishing: true,
    toxicLanguage: true,
    requireVerifiedAccount: false,
  });

  const toggleJoin = (id: string) => {
    setJoined((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="page">
      <p className="eyebrow">Nexus Communities & Guilds</p>
      <h1>Official Studio Communities</h1>
      <p>
        Nexus Communities combines Discord-style guild channels with Reddit-style discussion boards for Chase Studios titles.
      </p>

      {/* Tab Switcher */}
      <div style={{ display: "flex", gap: 8, margin: "16px 0 20px" }}>
        <button
          type="button"
          className={`btn btn-sm ${activeTab === "guilds" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveTab("guilds")}
        >
          <Users size={14} /> Official Guilds ({COMMUNITIES.length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${activeTab === "moderation" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveTab("moderation")}
        >
          <ShieldAlert size={14} /> Community Moderation Hub {flaggedReports.length > 0 && <span className="pill" style={{ background: "#ef4444", color: "#fff", marginLeft: 4 }}>{flaggedReports.length}</span>}
        </button>
      </div>

      {activeTab === "guilds" ? (
        <div className="stack">
          {COMMUNITIES.map((community) => {
            const isMember = Boolean(joined[community.id]);
            return (
              <article key={community.id} className="card info-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                  <div className="author-name">
                    <h2>{community.name}</h2>
                    <ChaseBadge type="official" />
                  </div>
                  <button
                    type="button"
                    className={`btn btn-sm ${isMember ? "btn-secondary" : "btn-primary"}`}
                    onClick={() => toggleJoin(community.id)}
                  >
                    {isMember ? "Joined ✓" : "Join Guild"}
                  </button>
                </div>
                <p>{community.description}</p>
                <div className="community-pills-row" style={{ marginTop: 8 }}>
                  {community.channels.map((channel) => (
                    <span key={channel} className="community-chip">
                      #{channel}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="stack">
          {/* Moderation Queue */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 8 }}>
                  <ShieldCheck size={18} className="purple-icon" /> Reported Content Queue
                </h2>
                <p className="hint" style={{ margin: "4px 0 0" }}>
                  Items flagged by community members or automated safety filters.
                </p>
              </div>
              <span className="pill">{flaggedReports.length} pending review</span>
            </div>

            {flaggedReports.length === 0 ? (
              <div style={{ padding: "24px 0", textAlign: "center", color: "var(--muted)" }}>
                <Check size={28} style={{ color: "#4ade80", margin: "0 auto 8px" }} />
                <p style={{ margin: 0 }}>All clear! No pending reports in the moderation queue.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {flaggedReports.map((report) => (
                  <div
                    key={report.id}
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: 12,
                      padding: "14px 16px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: "0.85rem", color: "#f87171", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                        <AlertTriangle size={14} /> {report.reason}
                      </span>
                      <small style={{ color: "var(--muted)" }}>{report.time}</small>
                    </div>
                    <div style={{ fontSize: "0.88rem", marginBottom: 10, color: "#fff", background: "rgba(0,0,0,0.3)", padding: "8px 12px", borderRadius: 8 }}>
                      &ldquo;{report.content}&rdquo;
                      <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 4 }}>
                        Reported user: @{report.author}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        className="btn btn-alert btn-sm"
                        onClick={() => {
                          setFlaggedReports((prev) => prev.filter((r) => r.id !== report.id));
                        }}
                      >
                        Remove & Strike User
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => {
                          setFlaggedReports((prev) => prev.filter((r) => r.id !== report.id));
                        }}
                      >
                        Dismiss (False Positive)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Auto-Moderation Settings */}
          <div className="card">
            <h2 style={{ fontSize: "1.2rem", marginBottom: 14 }}>Automated Safety & Filter Rules</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <strong>Anti-Spam Bot Filter</strong>
                  <p className="hint" style={{ margin: 0 }}>Automatically rate-limit duplicate posts across guilds</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoModFilters.antiSpam}
                  onChange={(e) => setAutoModFilters({ ...autoModFilters, antiSpam: e.target.checked })}
                />
              </label>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <strong>Anti-Phishing & Malware Guard</strong>
                  <p className="hint" style={{ margin: 0 }}>Block unverified domain links not on Chase Studios allowlist</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoModFilters.antiPhishing}
                  onChange={(e) => setAutoModFilters({ ...autoModFilters, antiPhishing: e.target.checked })}
                />
              </label>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <strong>Toxicity & Slur Protection</strong>
                  <p className="hint" style={{ margin: 0 }}>Hold toxic comments and slurs in review queue</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoModFilters.toxicLanguage}
                  onChange={(e) => setAutoModFilters({ ...autoModFilters, toxicLanguage: e.target.checked })}
                />
              </label>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <strong>Require Chase Account Verified</strong>
                  <p className="hint" style={{ margin: 0 }}>Only allow purple-badged Chase Accounts to post in announcements</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoModFilters.requireVerifiedAccount}
                  onChange={(e) => setAutoModFilters({ ...autoModFilters, requireVerifiedAccount: e.target.checked })}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function DiscussionsScreen() {
  return (
    <section className="page">
      <p className="eyebrow">Nexus Discussions</p>
      <h1>Discussion preview</h1>
      <p>Threaded comments, upvotes, downvotes, and community moderation boards arrive in Alpha 0.4. Voting in the sample feed is preserved on this device.</p>
      <Link className="btn btn-primary" href="/?feed=discussions">
        Open the discussions feed
      </Link>
    </section>
  );
}

export function StoriesScreen() {
  return (
    <section className="page">
      <p className="eyebrow">Nexus Stories</p>
      <h1>Stories</h1>
      <p>Snapchat-inspired temporary 24-hour Stories arrive in Alpha 0.8. You can preview photo creation locally below.</p>
      <StoriesRow />
    </section>
  );
}

export function SavedScreen() {
  const { posts } = useNexus();
  const [filter, setFilter] = useState<"all" | "media" | "discussions">("all");
  const saved = posts.filter((post) => post.saved);

  const filteredSaved = saved.filter((post) => {
    if (filter === "media") return Boolean(post.imageUrl || post.imageLabel || post.videoLabel);
    if (filter === "discussions") return post.feeds.includes("discussions");
    return true;
  });

  return (
    <section className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <p className="eyebrow">Bookmarks & Saved</p>
          <h1>Saved Posts</h1>
        </div>
        <span className="pill">{saved.length} Bookmarked</span>
      </div>
      <p>Posts bookmarked from your feed are saved to your account and device.</p>

      {/* Filter Tabs */}
      <div className="pill-tabs" style={{ display: "flex", gap: 8, margin: "14px 0 20px" }}>
        <button
          type="button"
          className={`choice-chip ${filter === "all" ? "is-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({saved.length})
        </button>
        <button
          type="button"
          className={`choice-chip ${filter === "media" ? "is-active" : ""}`}
          onClick={() => setFilter("media")}
        >
          Media & Images
        </button>
        <button
          type="button"
          className={`choice-chip ${filter === "discussions" ? "is-active" : ""}`}
          onClick={() => setFilter("discussions")}
        >
          Discussions
        </button>
      </div>

      {filteredSaved.length === 0 ? (
        <div className="empty card" style={{ textAlign: "center", padding: "36px 16px" }}>
          <Bookmark size={36} className="purple-icon" style={{ margin: "0 auto 12px", opacity: 0.6 }} />
          <h3>No saved posts found</h3>
          <p className="hint">Tap the bookmark icon on any post in your feed to save it here.</p>
          <Link href="/" className="btn btn-primary btn-sm" style={{ marginTop: 14, display: "inline-flex" }}>
            Explore Home Feed
          </Link>
        </div>
      ) : (
        <div className="post-list">
          {filteredSaved.map((post) => (
            <PostCard key={post.id} post={post} mode="for-you" onTag={() => undefined} />
          ))}
        </div>
      )}
    </section>
  );
}

export function ProfileScreen() {
  const { displayName, setDisplayName, posts, userAvatar, setUserAvatar, currentUser, userProfile } = useNexus();
  const [name, setName] = useState(displayName);
  const [avatarBuilderOpen, setAvatarBuilderOpen] = useState(false);
  const mine = posts.filter((post) => post.yours).length;

  useEffect(() => {
    setName(displayName);
  }, [displayName]);

  return (
    <section className="page">
      <p className="eyebrow">Profile & Character</p>
      <div className="profile-hero card">
        <div className="cover" />
        <div className="profile-row" style={{ alignItems: "flex-start", gap: 16 }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <NexusAvatar config={userAvatar} size={88} showStickerBadge />
            <button
              type="button"
              className="icon-btn"
              title="Open Bitmoji Studio"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 28,
                height: 28,
                background: "var(--accent)",
                color: "#fff",
                borderRadius: "50%",
                border: "2px solid var(--surface)",
              }}
              onClick={() => setAvatarBuilderOpen(true)}
            >
              <Sparkles size={14} />
            </button>
          </div>
          <div>
            <div className="author-name">
              <h1>{userProfile?.display_name || displayName}</h1>
              <ChaseBadge type="chase-account" />
            </div>
            <p className="hint">
              {currentUser
                ? `Signed in as ${currentUser.email} · Chase Account Verified`
                : "Chase Studios Cloud Profile · Universal Account Verified"}
            </p>
            {userAvatar.statusBubble && (
              <div
                className="status-bubble-pill"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 12px",
                  background: "rgba(168, 85, 247, 0.15)",
                  border: "1px solid rgba(168, 85, 247, 0.4)",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  color: "#e9d5ff",
                  marginTop: 6,
                }}
              >
                <span>💭</span>
                <span>{userAvatar.statusBubble}</span>
              </div>
            )}
            <div style={{ marginTop: 8 }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ gap: 6 }}
                onClick={() => setAvatarBuilderOpen(true)}
              >
                <Sparkles size={14} className="purple-icon" />
                <span>Customize Bitmoji Avatar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bitmoji Sticker Sheet - Full Comic Sticker Pack */}
      <div className="card sticker-sheet-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div>
            <h2 style={{ fontSize: "1.15rem", margin: 0 }}>My Bitmoji Stickers & Expressions (20+ Pack)</h2>
            <p className="hint" style={{ margin: "2px 0 0" }}>
              Snapchat-style comic expressions. Tap any sticker to set your active mood!
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setAvatarBuilderOpen(true)}
          >
            Studio Deluxe
          </button>
        </div>

        <div className="sticker-grid">
          {[
            { pose: "portrait", label: "Default" },
            { pose: "fire", label: "🔥 On Fire" },
            { pose: "gg", label: "🎮 GG!" },
            { pose: "hype", label: "⚡ HYPE!" },
            { pose: "shield", label: "🛡️ Shield" },
            { pose: "verified", label: "👑 Verified" },
            { pose: "chill", label: "☕ Chill" },
            { pose: "afk", label: "💤 AFK" },
            { pose: "raid", label: "⚔️ Raid" },
            { pose: "love", label: "❤️ Love" },
            { pose: "rocket", label: "🚀 Moon" },
            { pose: "levelup", label: "⭐ Level Up" },
            { pose: "ragequit", label: "💥 Rage Quit" },
            { pose: "clutch", label: "🎯 1v5 Clutch" },
            { pose: "mindblown", label: "🤯 Mind Blown" },
            { pose: "skull", label: "💀 Dead" },
            { pose: "stream", label: "🔴 Live Now" },
            { pose: "dance", label: "💃 Hype Dance" },
            { pose: "flex", label: "💪 Big Flex" },
            { pose: "wave", label: "👋 Hey There" },
            { pose: "co-op", label: "🤝 Co-Op Squad" },
            { pose: "salute", label: "🫡 Respect" },
          ].map((item) => (
            <button
              key={item.pose}
              type="button"
              className={`sticker-tile ${userAvatar.pose === item.pose ? "is-active" : ""}`}
              onClick={() => {
                setUserAvatar({ ...userAvatar, pose: item.pose as any });
              }}
              title={`Set avatar mood to ${item.label}`}
            >
              <NexusAvatar config={{ ...userAvatar, pose: item.pose as any }} size={64} showStickerBadge />
              <small>{item.label}</small>
            </button>
          ))}
        </div>
      </div>

      <dl className="stats">
        <div>
          <dt>My Posts</dt>
          <dd>{mine}</dd>
        </div>
        <div>
          <dt>Account Tier</dt>
          <dd style={{ color: "var(--accent)", fontWeight: 700 }}>Chase Verified</dd>
        </div>
        <div>
          <dt>Streak Record</dt>
          <dd>3 Days 🔥</dd>
        </div>
      </dl>

      <form
        className="card settings-form"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setDisplayName(String(data.get("name") ?? ""));
        }}
      >
        <label htmlFor="display-name">Display name</label>
        <input
          id="display-name"
          name="name"
          value={name}
          maxLength={40}
          onChange={(event) => setName(event.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Save name
        </button>
      </form>

      <NexusAvatarBuilder isOpen={avatarBuilderOpen} onClose={() => setAvatarBuilderOpen(false)} />
    </section>
  );
}

export function MessagesScreen() {
  const { userAvatar, walletBalance, tipCreator } = useNexus();
  const [conversations, setConversations] = useState<DemoConversation[]>(CONVERSATIONS);
  const [activeId, setActiveId] = useState<string>("avery");
  const [mobileActiveView, setMobileActiveView] = useState<"threads" | "chat">("threads");
  const [inputMessage, setInputMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [messageReactions, setMessageReactions] = useState<Record<string, string>>({});
  const [typingSim, setTypingSim] = useState(false);

  const activeChat = conversations.find((c) => c.id === activeId) ?? conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputMessage.trim();
    if (!text) return;

    const newMsg: DemoMessage = {
      id: crypto.randomUUID(),
      sender: "you",
      text,
      time: "Just now",
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeId ? { ...conv, messages: [...conv.messages, newMsg] } : conv
      )
    );
    setInputMessage("");

    // Trigger simulated reply typing after 1.5s
    setTimeout(() => {
      setTypingSim(true);
      setTimeout(() => {
        setTypingSim(false);
        const replyMsg: DemoMessage = {
          id: crypto.randomUUID(),
          sender: "them",
          text: `Awesome! Let's jump into DEADEYE Survival raid tonight 🔥`,
          time: "Just now",
        };
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeId ? { ...conv, messages: [...conv.messages, replyMsg] } : conv
          )
        );
      }, 2000);
    }, 800);
  };

  const handleSendSticker = (pose: string) => {
    const newMsg: DemoMessage = {
      id: crypto.randomUUID(),
      sender: "you",
      text: "",
      stickerPose: pose,
      time: "Just now",
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeId ? { ...conv, messages: [...conv.messages, newMsg] } : conv
      )
    );
  };

  const handleSendVoiceNote = () => {
    setIsRecordingVoice(true);
    setTimeout(() => {
      setIsRecordingVoice(false);
      const newMsg: DemoMessage = {
        id: crypto.randomUUID(),
        sender: "you",
        text: "🎙️ Voice Note (0:08) · [▶ •••••••••••]",
        time: "Just now",
      };
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeId ? { ...conv, messages: [...conv.messages, newMsg] } : conv
        )
      );
    }, 1800);
  };

  const handleSendGemsGift = (amount: number) => {
    if (walletBalance < amount) {
      const errMsg: DemoMessage = {
        id: crypto.randomUUID(),
        sender: "them",
        text: `⚠️ Insufficient gems to send ${amount} 💎 gift. Top up in the Marketplace!`,
        time: "Just now",
      };
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeId ? { ...conv, messages: [...conv.messages, errMsg] } : conv
        )
      );
      return;
    }
    tipCreator(activeChat.name, amount);
    const newMsg: DemoMessage = {
      id: crypto.randomUUID(),
      sender: "you",
      text: `💎 Sent a gift of ${amount} Nexus Gems!`,
      time: "Just now",
    };
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeId ? { ...conv, messages: [...conv.messages, newMsg] } : conv
      )
    );
  };

  const toggleReaction = (msgId: string, emoji: string) => {
    setMessageReactions((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === emoji ? "" : emoji,
    }));
  };

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="page messages-page">
      <header className="page-head">
        <p className="eyebrow">Nexus Messages & Streaks</p>
        <h1>Direct Messages & Streaks</h1>
        <p>
          Private conversations with streak fire milestones, voice notes, and Bitmoji avatar chat.
        </p>
      </header>

      <div className={`messages-layout card view-${mobileActiveView}`}>
        {/* Conversations Sidebar */}
        <div className="messages-sidebar">
          <div className="messages-sidebar-head">
            <h3>Direct Messages</h3>
            <span className="pill">Cloud Chat</span>
          </div>

          {/* Search Contacts Bar */}
          <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: "var(--muted)" }} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 10px 6px 30px",
                  fontSize: "0.82rem",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                }}
              />
            </div>
          </div>

          <ul className="chat-thread-list">
            {filteredConversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isSelected = conv.id === activeId;
              return (
                <li key={conv.id}>
                  <button
                    type="button"
                    className={`chat-thread-btn ${isSelected ? "is-active" : ""}`}
                    onClick={() => {
                      setActiveId(conv.id);
                      setMobileActiveView("chat");
                    }}
                  >
                    <span className="avatar avatar-sm">{conv.name.slice(0, 1)}</span>
                    <div className="chat-thread-meta">
                      <div className="chat-thread-top">
                        <span className="author-name">
                          <strong>{conv.name}</strong>
                          {conv.verified ? <ChaseBadge type={conv.badgeType} /> : null}
                        </span>
                        {conv.streak && conv.streak.count > 0 ? (
                          <span className="streak-pill" title={`${conv.streak.count}-day streak`}>
                            <Flame size={12} className="flame-icon" aria-hidden="true" />
                            <span>{conv.streak.count}</span>
                          </span>
                        ) : null}
                      </div>
                      <small className="chat-last-msg">{lastMsg?.text || "Bitmoji sticker sent"}</small>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Active Conversation Pane */}
        <div className="messages-pane">
          <header className="chat-pane-head">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                className="btn btn-ghost btn-sm mobile-chat-back-btn"
                onClick={() => setMobileActiveView("threads")}
                style={{ padding: "4px 8px", fontSize: "0.82rem", borderRadius: 8 }}
                aria-label="Back to conversations"
              >
                ← Chats
              </button>
              <div className="author-name">
                <span className="avatar avatar-sm">{activeChat.name.slice(0, 1)}</span>
                <div>
                  <span className="author-name">
                    <strong>{activeChat.name}</strong>
                    {activeChat.verified ? <ChaseBadge type={activeChat.badgeType} /> : null}
                  </span>
                  <p className="hint">{activeChat.handle}</p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ fontSize: "0.78rem", gap: 6 }}
                onClick={() => handleSendGemsGift(100)}
                title="Send 100 Nexus Gems gift in DM"
              >
                <Coins size={14} className="purple-icon" /> Send 100 💎
              </button>

              {activeChat.streak && activeChat.streak.count > 0 ? (
                <div className="streak-indicator-banner">
                  <Flame size={15} className="flame-icon" aria-hidden="true" />
                  <span>
                    <strong>{activeChat.streak.count} Days</strong> · {activeChat.streak.hoursLeft}h left today
                  </span>
                  {activeChat.streak.milestone ? (
                    <span className="milestone-badge">
                      <Award size={12} aria-hidden="true" /> {activeChat.streak.milestone}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </header>

          <div className="chat-bubble-stream">
            <p className="hint center-hint">
              Direct messaging with active streaks, voice notes, and Bitmoji sticker support.
            </p>
            {activeChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-wrap ${msg.sender === "you" ? "is-mine" : "is-theirs"}`}
                style={{ display: "flex", alignItems: "flex-end", gap: 8, position: "relative" }}
              >
                {msg.sender === "them" && (
                  <span className="avatar avatar-xs">{activeChat.name.slice(0, 1)}</span>
                )}
                {msg.stickerPose ? (
                  <div
                    className="chat-bubble"
                    style={{
                      background: "rgba(124, 58, 237, 0.12)",
                      border: "1px solid rgba(124, 58, 237, 0.35)",
                      padding: "8px 12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <NexusAvatar
                      config={{
                        ...userAvatar,
                        pose: msg.stickerPose as any,
                      }}
                      size={76}
                      showStickerBadge
                    />
                    <small style={{ marginTop: 4, opacity: 0.7 }}>{msg.time}</small>
                  </div>
                ) : (
                  <div
                    className="chat-bubble"
                    style={{
                      position: "relative",
                      background: msg.text.includes("💎 Sent a gift")
                        ? "linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(168, 85, 247, 0.15))"
                        : undefined,
                    }}
                  >
                    <p style={{ margin: 0 }}>{msg.text}</p>
                    <small style={{ marginTop: 4, display: "block" }}>{msg.time}</small>

                    {/* Reaction badge if applied */}
                    {messageReactions[msg.id] && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: -10,
                          right: 8,
                          background: "#181028",
                          border: "1px solid rgba(168, 85, 247, 0.4)",
                          borderRadius: 12,
                          padding: "2px 6px",
                          fontSize: "0.85rem",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                        }}
                      >
                        {messageReactions[msg.id]}
                      </span>
                    )}

                    {/* Quick Reaction Tray on hover */}
                    <div
                      className="msg-reaction-bar"
                      style={{
                        display: "flex",
                        gap: 4,
                        marginTop: 4,
                        opacity: 0.75,
                      }}
                    >
                      {["❤️", "🔥", "😂", "👏", "💯"].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          style={{
                            background: "none",
                            border: "none",
                            padding: "1px 3px",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                          onClick={() => toggleReaction(msg.id, emoji)}
                          title={`React ${emoji}`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {msg.sender === "you" && (
                  <NexusAvatar config={userAvatar} size={26} showStickerBadge />
                )}
              </div>
            ))}

            {/* Typing simulation bubble */}
            {typingSim && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px" }}>
                <span className="avatar avatar-xs">{activeChat.name.slice(0, 1)}</span>
                <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "8px 14px", borderRadius: 16, display: "flex", gap: 4 }}>
                  <span className="typing-dot" style={{ width: 6, height: 6, background: "#c084fc", borderRadius: "50%", animation: "pulseBubble 0.6s infinite alternate" }} />
                  <span className="typing-dot" style={{ width: 6, height: 6, background: "#c084fc", borderRadius: "50%", animation: "pulseBubble 0.6s infinite alternate 0.2s" }} />
                  <span className="typing-dot" style={{ width: 6, height: 6, background: "#c084fc", borderRadius: "50%", animation: "pulseBubble 0.6s infinite alternate 0.4s" }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Bitmoji Sticker Tray */}
          <div
            className="chat-quick-stickers"
            style={{
              padding: "8px 12px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              overflowX: "auto",
              background: "rgba(0,0,0,0.15)",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--muted)", whiteSpace: "nowrap" }}>
              Bitmoji Deluxe:
            </span>
            {[
              { pose: "fire", icon: "🔥 Fire" },
              { pose: "gg", icon: "🎮 GG!" },
              { pose: "hype", icon: "⚡ Hype" },
              { pose: "shield", icon: "🛡️ Shield" },
              { pose: "verified", icon: "👑 Verified" },
              { pose: "chill", icon: "☕ Chill" },
              { pose: "afk", icon: "💤 AFK" },
              { pose: "raid", icon: "⚔️ Raid" },
              { pose: "love", icon: "❤️ Love" },
              { pose: "rocket", icon: "🚀 Moon" },
              { pose: "dance", icon: "💃 Dance" },
              { pose: "flex", icon: "💪 Flex" },
              { pose: "wave", icon: "👋 Wave" },
            ].map((st) => (
              <button
                key={st.pose}
                type="button"
                className="choice-chip"
                style={{ fontSize: "0.78rem", padding: "3px 8px", whiteSpace: "nowrap" }}
                onClick={() => handleSendSticker(st.pose)}
                title={`Send ${st.icon} sticker`}
              >
                {st.icon}
              </button>
            ))}
          </div>

          {/* Chat Composer */}
          <form className="chat-composer" onSubmit={handleSend} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              type="button"
              className={`icon-btn ${isRecordingVoice ? "is-alert" : ""}`}
              style={{ width: 36, height: 36, flexShrink: 0 }}
              title="Record voice note"
              onClick={handleSendVoiceNote}
            >
              <Mic size={18} className={isRecordingVoice ? "alert-icon" : "purple-icon"} />
            </button>

            <input
              type="text"
              value={inputMessage}
              placeholder={isRecordingVoice ? "Recording voice note (speak now)..." : `Message ${activeChat.name}...`}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isRecordingVoice}
            />

            <button
              type="submit"
              className="btn btn-primary icon-submit-btn"
              disabled={!inputMessage.trim()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function CallsScreen() {
  const { userAvatar, walletBalance, addGems } = useNexus();
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [activeRoom, setActiveRoom] = useState("Chase Studios Alpha Dev Lounge");
  const [reactions, setReactions] = useState<{ id: string; glyph: string; x: number }[]>([]);
  const [callDuration, setCallDuration] = useState("06:42");
  const [callEnded, setCallEnded] = useState(false);

  const sendCallReaction = (glyph: string) => {
    const id = crypto.randomUUID();
    const x = Math.random() * 80 + 10;
    setReactions((prev) => [...prev, { id, glyph, x }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2200);
  };

  return (
    <section className="page">
      <header className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
        <div>
          <p className="eyebrow">Nexus HD Conference & Calls</p>
          <h1>Voice & Video Calling Suite</h1>
          <p>Multi-participant spatial voice, WebRTC HD video, and dynamic Bitmoji avatar presence.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Alpha Dev Lounge", "Unimon Squad", "Creators Stage"].map((room) => (
            <button
              key={room}
              type="button"
              className={`btn btn-sm ${activeRoom.includes(room) ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveRoom(room)}
            >
              {room}
            </button>
          ))}
        </div>
      </header>

      {/* Main Call Viewport */}
      <div
        className="card call-stage-card"
        style={{
          position: "relative",
          background: "#080512",
          border: "1px solid rgba(168, 85, 247, 0.3)",
          borderRadius: 20,
          overflow: "hidden",
          padding: 16,
        }}
      >
        {/* Floating reaction particles */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 50, overflow: "hidden" }}>
          {reactions.map((r) => (
            <div
              key={r.id}
              style={{
                position: "absolute",
                left: `${r.x}%`,
                bottom: 80,
                fontSize: "2rem",
                animation: "floatUpReaction 2.2s ease-out forwards",
              }}
            >
              {r.glyph}
            </div>
          ))}
        </div>

        {/* Top Status Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 12px",
            background: "rgba(255, 255, 255, 0.04)",
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="status-dot live" />
            <strong style={{ fontSize: "0.92rem" }}>{activeRoom}</strong>
            <span className="pill">4 in Call</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "0.85rem", color: "#c084fc", fontFamily: "monospace", fontWeight: 700 }}>
              {callDuration}
            </span>
            <span className="pill" style={{ background: "rgba(34, 197, 94, 0.2)", color: "#4ade80" }}>
              HD 1080p
            </span>
          </div>
        </div>

        {/* Screen Share Stage (if active) */}
        {screenSharing && (
          <div
            style={{
              height: 280,
              borderRadius: 14,
              background: "radial-gradient(circle, #231244 0%, #0d061c 100%)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              marginBottom: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <span className="pill" style={{ position: "absolute", top: 12, left: 12, background: "rgba(168, 85, 247, 0.3)" }}>
              Bill Chase · Unreal Engine 5 Dev Stream (DEADEYE Survival)
            </span>
            <Monitor size={48} className="purple-icon" style={{ marginBottom: 12, opacity: 0.8 }} />
            <strong style={{ fontSize: "1.1rem" }}>Sharing Display: DEADEYE Weapon Workshop Live</strong>
            <small style={{ color: "var(--muted)" }}>60 FPS · Spatial Audio Active</small>
          </div>
        )}

        {/* Participant 4-Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginBottom: 16,
          }}
        >
          {/* Bill Chase */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(234, 179, 8, 0.4)",
              borderRadius: 16,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <span className="pill" style={{ position: "absolute", top: 10, right: 10, background: "rgba(234, 179, 8, 0.2)", color: "#facc15" }}>
              Speaking
            </span>
            <div style={{ position: "relative", margin: "10px 0" }}>
              <span className="avatar avatar-lg" style={{ background: "#7c3aed", color: "#fff", width: 72, height: 72, fontSize: "1.8rem" }}>
                B
              </span>
              <div
                style={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  background: "#100922",
                  borderRadius: "50%",
                  padding: 2,
                }}
              >
                <ChaseBadge type="staff" size={16} />
              </div>
            </div>
            <strong style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.95rem" }}>
              Bill Chase <ChaseBadge type="staff" />
            </strong>
            <small style={{ color: "var(--muted)", margin: "2px 0 8px" }}>Founder · Chase Studios</small>
            {/* Visualizer bars */}
            <div style={{ display: "flex", alignItems: "center", gap: 3, height: 16 }}>
              {[8, 14, 16, 12, 16, 10].map((h, i) => (
                <span
                  key={i}
                  style={{
                    width: 3,
                    height: h,
                    background: "#eab308",
                    borderRadius: 2,
                    animation: "pulseBubble 0.8s ease-in-out infinite alternate",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Samira Cole */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(168, 85, 247, 0.2)",
              borderRadius: 16,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "relative", margin: "10px 0" }}>
              <span className="avatar avatar-lg" style={{ background: "#2563eb", color: "#fff", width: 72, height: 72, fontSize: "1.8rem" }}>
                S
              </span>
              <div
                style={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  background: "#100922",
                  borderRadius: "50%",
                  padding: 2,
                }}
              >
                <ChaseBadge type="chase-account" size={16} />
              </div>
            </div>
            <strong style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.95rem" }}>
              Samira Cole <ChaseBadge type="chase-account" />
            </strong>
            <small style={{ color: "var(--muted)", margin: "2px 0 8px" }}>DEADEYE Raid Lead</small>
            <span style={{ fontSize: "0.78rem", color: "#4ade80", display: "flex", alignItems: "center", gap: 4 }}>
              <Volume2 size={12} /> Headset Active
            </span>
          </div>

          {/* Jordan Hale */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(168, 85, 247, 0.2)",
              borderRadius: 16,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "relative", margin: "10px 0" }}>
              <span className="avatar avatar-lg" style={{ background: "#059669", color: "#fff", width: 72, height: 72, fontSize: "1.8rem" }}>
                J
              </span>
              <div
                style={{
                  position: "absolute",
                  bottom: -4,
                  right: -4,
                  background: "#100922",
                  borderRadius: "50%",
                  padding: 2,
                }}
              >
                <ChaseBadge type="chase-account" size={16} />
              </div>
            </div>
            <strong style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.95rem" }}>
              Jordan Hale <ChaseBadge type="chase-account" />
            </strong>
            <small style={{ color: "var(--muted)", margin: "2px 0 8px" }}>Nexus Video Streamer</small>
            <span style={{ fontSize: "0.78rem", color: "#c084fc" }}>Listening</span>
          </div>

          {/* You (with Bitmoji Deluxe or Camera Feed) */}
          <div
            style={{
              background: "rgba(124, 58, 237, 0.08)",
              border: "1px solid rgba(168, 85, 247, 0.5)",
              borderRadius: 16,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <span className="pill" style={{ position: "absolute", top: 10, right: 10, background: "rgba(124, 58, 237, 0.3)" }}>
              {videoOn ? "Webcam HD" : "Bitmoji Virtual Avatar"}
            </span>
            <div style={{ position: "relative", margin: "6px 0" }}>
              <NexusAvatar config={userAvatar} size={76} showStickerBadge />
            </div>
            <strong style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.95rem" }}>
              You (Your Profile) <ChaseBadge type="chase-account" />
            </strong>
            <small style={{ color: muted ? "#ef4444" : "#4ade80", margin: "2px 0 8px", fontWeight: 600 }}>
              {muted ? "Microphone Muted" : "Mic Open · Transmitting"}
            </small>
            <div style={{ display: "flex", alignItems: "center", gap: 3, height: 16 }}>
              {!muted &&
                [4, 12, 18, 14, 8].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      width: 3,
                      height: h,
                      background: "#a855f7",
                      borderRadius: 2,
                    }}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Reaction Pill Bar */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 14 }}>
          {["🔥", "🚀", "👑", "❤️", "👏", "💎", "⭐"].map((glyph) => (
            <button
              key={glyph}
              type="button"
              className="icon-btn"
              style={{ fontSize: "1.2rem", width: 38, height: 38 }}
              title={`Send ${glyph} reaction in call`}
              onClick={() => sendCallReaction(glyph)}
            >
              {glyph}
            </button>
          ))}
        </div>

        {/* Interactive Controls Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            padding: "10px 0 4px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <button
            type="button"
            className={`btn ${muted ? "btn-alert" : "btn-secondary"}`}
            style={{ borderRadius: 24, padding: "8px 18px", gap: 8 }}
            onClick={() => setMuted((v) => !v)}
          >
            {muted ? <MicOff size={18} /> : <Mic size={18} />}
            <span>{muted ? "Unmute" : "Mute"}</span>
          </button>
          <button
            type="button"
            className={`btn ${videoOn ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: 24, padding: "8px 18px", gap: 8 }}
            onClick={() => setVideoOn((v) => !v)}
          >
            {videoOn ? <VideoIcon size={18} /> : <VideoOff size={18} />}
            <span>{videoOn ? "Camera On" : "Camera Off"}</span>
          </button>
          <button
            type="button"
            className={`btn ${screenSharing ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: 24, padding: "8px 18px", gap: 8 }}
            onClick={() => setScreenSharing((v) => !v)}
          >
            <Monitor size={18} />
            <span>{screenSharing ? "Stop Share" : "Share Screen"}</span>
          </button>
          <button
            type="button"
            className="btn btn-alert"
            style={{ borderRadius: 24, padding: "8px 22px", gap: 8 }}
            onClick={() => setCallEnded(true)}
          >
            <PhoneOff size={18} />
            <span>Leave Call</span>
          </button>
        </div>

        {callEnded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(10, 6, 18, 0.95)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              padding: 24,
              textAlign: "center",
            }}
          >
            <PhoneOff size={44} style={{ color: "#f87171", marginBottom: 12 }} />
            <h3 style={{ margin: "0 0 6px" }}>You left the call session</h3>
            <p className="hint" style={{ maxWidth: 320, marginBottom: 16 }}>
              Microphone and screen transmission stopped. You can rejoin {activeRoom} anytime.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ borderRadius: 20, padding: "10px 24px" }}
              onClick={() => setCallEnded(false)}
            >
              Rejoin Call
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

interface LocalNotif {
  id: string;
  type: string;
  title: string;
  time: string;
  icon: string;
  detail: string;
  read: boolean;
  hasStreakAction?: boolean;
  streakReturned?: boolean;
  giftClaimable?: boolean;
  giftClaimed?: boolean;
  audioLink?: string;
}

export function NotificationsScreen() {
  const { walletBalance, addGems } = useNexus();
  const [filter, setFilter] = useState<"all" | "streaks" | "tips" | "mentions" | "system">("all");
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [notifToast, setNotifToast] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<LocalNotif[]>([
    {
      id: "n1",
      type: "system",
      title: "Chase Studios published a preview update",
      time: "2h ago",
      icon: "official",
      detail: "Universal purple checkmark badges are now active across Nexus profiles and posts.",
      read: false,
    },
    {
      id: "n2",
      type: "streaks",
      title: "Avery Quinn maintained your streak 🔥",
      time: "3h ago",
      icon: "flame",
      detail: "Your 3-day friendship streak with Avery Quinn has been extended for today.",
      read: false,
      hasStreakAction: true,
      streakReturned: false,
    },
    {
      id: "n3",
      type: "tips",
      title: "Samira Cole sent you a gift of 250 Gems! 💎",
      time: "4h ago",
      icon: "gem",
      detail: "“Thanks for the awesome co-op run in Unimon Legends today!”",
      read: false,
      giftClaimable: true,
      giftClaimed: false,
    },
    {
      id: "n4",
      type: "mentions",
      title: "Bill Chase mentioned you in an Audio Stage",
      time: "6h ago",
      icon: "audio",
      detail: "“Join the live DEADEYE Weapon Workshop dev stage right now.”",
      read: true,
      audioLink: "/audio",
    },
    {
      id: "n5",
      type: "mentions",
      title: "Jordan Hale liked your latest Bitmoji sticker post",
      time: "8h ago",
      icon: "heart",
      detail: "Your Cyber Samurai post is trending in the #ChaseNexus community feed.",
      read: true,
    },
  ]);

  const handleClaimDaily = () => {
    if (dailyClaimed) return;
    sounds.playFanfare();
    sounds.playCoin();
    setDailyClaimed(true);
    addGems(500);
    setNotifToast("🎉 Daily streak bonus claimed! +500 Nexus Gems added to your wallet.");
    setTimeout(() => setNotifToast(null), 4000);
  };

  const handleReturnStreak = (id: string) => {
    sounds.playPop();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, streakReturned: true } : n))
    );
    setNotifToast("🔥 Reciprocal streak interaction sent back!");
    setTimeout(() => setNotifToast(null), 3000);
  };

  const handleClaimGift = (id: string) => {
    sounds.playCoin();
    addGems(250);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, giftClaimed: true } : n))
    );
    setNotifToast("💎 250 Nexus Gems deposited to your wallet!");
    setTimeout(() => setNotifToast(null), 3000);
  };

  const markAllRead = () => {
    sounds.playPop();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filter === "all") return true;
    return n.type === filter;
  });

  return (
    <section className="page notifications-page">
      <header className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <p className="eyebrow">Nexus Inbox & Alerts</p>
          <h1>Notification Center</h1>
          <p>Real-time social alerts, reciprocal streak timers, gem gift deposits, and dev updates.</p>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={markAllRead} style={{ borderRadius: 14 }}>
          Mark all as read
        </button>
      </header>

      {/* Floating Non-Blocking Notification Toast */}
      {notifToast && (
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
          {notifToast}
        </div>
      )}

      {/* Daily Login Streak Reward Banner */}
      <div
        className="card daily-reward-card"
        style={{
          background: "linear-gradient(135deg, rgba(147, 51, 234, 0.25) 0%, rgba(56, 189, 248, 0.2) 100%)",
          border: "1px solid rgba(168, 85, 247, 0.4)",
          borderRadius: 18,
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: "2rem" }}>🎁</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <strong style={{ fontSize: "1.05rem", color: "#fff" }}>Daily Nexus Login Streak Drop</strong>
              <span className="pill" style={{ background: "#22c55e", color: "#000", fontWeight: 800, fontSize: "0.72rem" }}>
                +500 💎
              </span>
            </div>
            <p className="hint" style={{ margin: "2px 0 0" }}>
              Log in every 24 hours to multiply your streak multiplier across the Arcade & Marketplace.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          style={{ padding: "8px 20px", borderRadius: 20, fontSize: "0.88rem" }}
          disabled={dailyClaimed}
          onClick={handleClaimDaily}
        >
          {dailyClaimed ? "Claimed for Today ✓" : "Claim +500 Gems"}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="tabs" role="tablist" style={{ marginBottom: 18 }}>
        <button
          type="button"
          className={`tab ${filter === "all" ? "is-active" : ""}`}
          onClick={() => {
            sounds.playPop();
            setFilter("all");
          }}
        >
          All ({notifications.length})
        </button>
        <button
          type="button"
          className={`tab ${filter === "streaks" ? "is-active" : ""}`}
          onClick={() => {
            sounds.playPop();
            setFilter("streaks");
          }}
        >
          🔥 Streaks
        </button>
        <button
          type="button"
          className={`tab ${filter === "tips" ? "is-active" : ""}`}
          onClick={() => {
            sounds.playPop();
            setFilter("tips");
          }}
        >
          💎 Tips & Gifts
        </button>
        <button
          type="button"
          className={`tab ${filter === "mentions" ? "is-active" : ""}`}
          onClick={() => {
            sounds.playPop();
            setFilter("mentions");
          }}
        >
          Mentions
        </button>
        <button
          type="button"
          className={`tab ${filter === "system" ? "is-active" : ""}`}
          onClick={() => {
            sounds.playPop();
            setFilter("system");
          }}
        >
          System
        </button>
      </div>

      {/* Notification Stream */}
      <div className="stack" style={{ gap: 10 }}>
        {filteredNotifs.map((n) => (
          <article
            key={n.id}
            className="card notif-card"
            style={{
              padding: "14px 18px",
              borderRadius: 16,
              background: n.read ? "rgba(255, 255, 255, 0.02)" : "rgba(168, 85, 247, 0.08)",
              border: n.read ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(168, 85, 247, 0.3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: "rgba(255, 255, 255, 0.04)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                {n.icon === "flame" ? (
                  <Flame size={20} className="flame-icon" />
                ) : n.icon === "gem" ? (
                  <Coins size={20} className="purple-icon" />
                ) : n.icon === "audio" ? (
                  <Radio size={20} style={{ color: "#38bdf8" }} />
                ) : n.icon === "official" ? (
                  <Shield size={20} className="purple-icon" />
                ) : (
                  <Heart size={20} style={{ color: "#ec4899" }} />
                )}
              </div>
              <div>
                <strong style={{ fontSize: "0.95rem", color: "#fff", display: "block" }}>{n.title}</strong>
                <p style={{ margin: "4px 0 2px", fontSize: "0.85rem", color: "var(--silver)" }}>{n.detail}</p>
                <small style={{ color: "var(--muted)", fontSize: "0.75rem" }}>{n.time}</small>
              </div>
            </div>

            {/* Interactive Quick Actions */}
            <div style={{ display: "flex", gap: 8 }}>
              {n.hasStreakAction && (
                <button
                  type="button"
                  className={`btn btn-sm ${n.streakReturned ? "btn-secondary" : "btn-primary"}`}
                  disabled={n.streakReturned}
                  onClick={() => handleReturnStreak(n.id)}
                  style={{ borderRadius: 16 }}
                >
                  {n.streakReturned ? "Streak Returned 🔥" : "Send Streak Back 🔥"}
                </button>
              )}

              {n.giftClaimable && (
                <button
                  type="button"
                  className={`btn btn-sm ${n.giftClaimed ? "btn-secondary" : "btn-primary"}`}
                  disabled={n.giftClaimed}
                  onClick={() => handleClaimGift(n.id)}
                  style={{ borderRadius: 16, background: n.giftClaimed ? undefined : "#22c55e" }}
                >
                  {n.giftClaimed ? "Deposited 💎" : "Claim 250 💎"}
                </button>
              )}

              {n.audioLink && (
                <Link
                  href={n.audioLink}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: 16 }}
                >
                  Join Audio Stage
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SettingsScreen() {
  const { theme, setTheme, accent, setAccent, reducedMotion, setReducedMotion } = useNexus();
  const [isStandalone, setIsStandalone] = useState(false);
  const [installedNotice, setInstalledNotice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isApp =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(isApp);
    }
  }, []);

  return (
    <section className="page">
      <p className="eyebrow">Settings</p>
      <h1>Preferences & Safety</h1>
      <p>Personalization, PWA installation, notification controls, and privacy settings.</p>

      {/* PWA Installation Section */}
      <div className="card info-card">
        <h2>Install Chase Nexus (PWA)</h2>
        <p className="hint">
          Chase Nexus is an installable Progressive Web App for iOS, Android, Windows, and macOS.
        </p>
        {isStandalone ? (
          <p className="installed-badge">
            <Check size={16} /> Running as an installed standalone application
          </p>
        ) : (
          <div className="install-actions">
            <p>Install Nexus on your device to launch it from your home screen or desktop taskbar.</p>
            <div className="button-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setInstalledNotice(true)}
              >
                <Download size={16} />
                <span>Install Chase Nexus App</span>
              </button>
            </div>
            {installedNotice ? (
              <div className="install-instructions">
                <p>
                  <strong>Desktop (Chrome/Edge):</strong> Look for the install icon (⊕) in the browser address bar.<br />
                  <strong>iOS/iPadOS (Safari):</strong> Tap the <em>Share</em> button (square with arrow) and select <strong>Add to Home Screen</strong>.<br />
                  <strong>Android (Chrome):</strong> Tap the menu (⋮) and select <strong>Install App</strong> or <strong>Add to Home screen</strong>.
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Notification Categories & Push Infrastructure */}
      <div className="card info-card">
        <h2>Push Notifications & Alerts</h2>
        <p className="hint">
          Granular controls for Web Push notifications, quiet hours, and sensitive message preview privacy.
        </p>
        <div className="privacy-options-stack">
          <div className="privacy-row">
            <div>
              <strong>Nexus Streak Reminders</strong>
              <p className="hint">Alert when reciprocal daily streak interaction is nearing expiration</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="privacy-row">
            <div>
              <strong>Direct & Group Messages</strong>
              <p className="hint">Notifications for incoming chats and message replies</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="privacy-row">
            <div>
              <strong>Friend Requests & Followers</strong>
              <p className="hint">Alerts for new friend invitations and follower connections</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="privacy-row">
            <div>
              <strong>Comments & Reactions</strong>
              <p className="hint">Responses and reactions on your posts and discussions</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="privacy-row">
            <div>
              <strong>Voice & Video Calls</strong>
              <p className="hint">Incoming call ringing and screen share alerts</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="privacy-row">
            <div>
              <strong>Chase Studios & Chase+ Rewards</strong>
              <p className="hint">Studio announcements, playtest invitations, and member drop notifications</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="privacy-row">
            <div>
              <strong>Notification Content Previews</strong>
              <p className="hint">Hide message body content in lock screen push previews for privacy</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="privacy-row">
            <div>
              <strong>Quiet Hours (Do Not Disturb)</strong>
              <p className="hint">Mute notification delivery during night hours (10:00 PM – 8:00 AM)</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="card info-card">
        <h2>Appearance</h2>
        <p className="hint">Themes and colors are preserved in this browser.</p>
        <fieldset className="theme-grid">
          <legend className="sr-only">Theme</legend>
          {THEMES.map((item) => (
            <label key={item.id} className={theme === item.id ? "theme-option is-active" : "theme-option"}>
              <input
                type="radio"
                name="theme"
                value={item.id}
                checked={theme === item.id}
                onChange={() => setTheme(item.id)}
              />
              <span>{item.label}</span>
              <small>{item.detail}</small>
            </label>
          ))}
        </fieldset>

        <div style={{ marginTop: 14 }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 700, display: "block", marginBottom: 8 }}>
            Quick Color Swatches
          </label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            {[
              { label: "Chase Purple", color: "#9333ea" },
              { label: "Neon Cyan", color: "#06b6d4" },
              { label: "Rose Pink", color: "#ec4899" },
              { label: "Amber Gold", color: "#f59e0b" },
              { label: "Emerald", color: "#10b981" },
              { label: "Obsidian", color: "#94a3b8" },
            ].map((c) => (
              <button
                key={c.color}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setAccent(c.color);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.04)",
                  border: accent === c.color ? `2px solid ${c.color}` : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: c.color }} />
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form
          className="settings-form"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            setAccent(String(data.get("accent") ?? ""));
            sounds.playPop();
          }}
        >
          <label htmlFor="accent">Custom accent color</label>
          <input
            id="accent"
            name="accent"
            type="color"
            value={accent ?? "#9b6dff"}
            onChange={(event) => setAccent(event.target.value)}
          />
          <div className="button-row">
            <button className="btn btn-primary" type="submit">
              Apply accent
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => setAccent(null)}>
              Use theme accent
            </button>
          </div>
        </form>

        <label className="check-row">
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(event) => setReducedMotion(event.target.checked)}
          />
          Reduce motion animations
        </label>
      </div>

      {/* Audio & Synthesized Sound Engine */}
      <div className="card info-card">
        <h2>Audio & UI Feedback</h2>
        <p className="hint">
          Procedural synthesized Web Audio API sound effects for reactions, gem transactions, and arcade games.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <strong>Interactive Sound Effects (SFX)</strong>
            <p className="hint" style={{ margin: "2px 0 0" }}>Play low-latency audio for likes, coins, and victory fanfare</p>
          </div>
          <button
            type="button"
            className={`btn btn-sm ${sounds.isEnabled() ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: 16 }}
            onClick={() => {
              const next = !sounds.isEnabled();
              sounds.setEnabled(next);
              if (next) sounds.playPop();
            }}
          >
            {sounds.isEnabled() ? "SFX Enabled 🔊" : "SFX Muted 🔇"}
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => sounds.playPop()}>
            Test Pop
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => sounds.playCoin()}>
            Test Gem Chime
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => sounds.playFanfare()}>
            Test Fanfare
          </button>
        </div>
      </div>

      {/* Nexus Privacy Center Preview */}
      <div className="card info-card">
        <h2>Nexus Privacy Center</h2>
        <p className="hint">
          Manage your personal information, profile visibility, and interaction safety.
        </p>
        <div className="privacy-options-stack">
          <div className="privacy-row">
            <div>
              <strong>Profile Visibility</strong>
              <p className="hint">Control who can discover and view your profile</p>
            </div>
            <select defaultValue="public">
              <option value="public">Public (Everyone)</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="privacy-row">
            <div>
              <strong>Direct Messages</strong>
              <p className="hint">Who can initiate one-on-one private messages</p>
            </div>
            <select defaultValue="friends">
              <option value="everyone">Everyone</option>
              <option value="friends">Friends Only</option>
              <option value="none">Nobody</option>
            </select>
          </div>
          <div className="privacy-row">
            <div>
              <strong>Story Privacy</strong>
              <p className="hint">Default audience for your 24-hour stories</p>
            </div>
            <select defaultValue="friends">
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="close">Close Friends Circle</option>
            </select>
          </div>
          <div className="privacy-row">
            <div>
              <strong>Online Status & Read Receipts</strong>
              <p className="hint">Show when you are active and when you read messages</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
      </div>
    </section>
  );
}

export function MarketplaceScreen() {
  const { walletBalance, addGems, tipCreator, userAvatar, setUserAvatar } = useNexus();
  const [activeCategory, setActiveCategory] = useState<"all" | "bitmoji" | "passes" | "chase-plus" | "tips">("all");
  const [unlockedItems, setUnlockedItems] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const ITEMS = [
    {
      id: "cyber-samurai",
      title: "Cyber Samurai Neon Armor",
      category: "bitmoji",
      rarity: "Legendary",
      price: 800,
      description: "Cybernetic battle suit with glowing neon purple kanji, laser katana prop, and high-tech visor.",
      perks: ["Unlocks Ninja Shinobi Outfit", "Unlocks Laser Sword Prop", "Unlocks Cyber Visor Accessory"],
      equipConfig: {
        outfit: "ninja-shinobi",
        prop: "laser-sword",
        accessory: "cyber-visor",
      },
    },
    {
      id: "unimon-pass",
      title: "Radiant Dragon Season Pass",
      category: "passes",
      rarity: "Legendary",
      price: 1200,
      description: "Official Season 1 Battle Pass for Unimon Legends. Unlocks 50 tiers, Celestial Dragon mount, and 2x XP boost.",
      perks: ["Celestial Dragon Mount", "50 Season Tiers", "2x XP Boost across all arenas"],
    },
    {
      id: "deadeye-damascus",
      title: "Damascus Steel Camo Bundle",
      category: "passes",
      rarity: "Epic",
      price: 650,
      description: "For DEADEYE: Survival. Damascus steel pattern for all tactical rifles, sniper rifles, and combat knife.",
      perks: ["Damascus Weapon Skins", "Custom Muzzle Flash FX", "Exclusive Survivor Tag"],
    },
    {
      id: "chase-plus-pass",
      title: "Chase+ All-Access Pass (1 Year)",
      category: "chase-plus",
      rarity: "Legendary",
      price: 2500,
      description: "The ultimate Chase Studios subscription. Official Purple Checkmark, 4K 60fps video uploads, and day-one access to all titles.",
      perks: ["Chase Account Verified Badge", "Unlimited 4K Video Uploads", "All Future Chase Studios Titles Included", "10 Bitmoji Closet Slots"],
    },
    {
      id: "mecha-kitty",
      title: "Mecha Kitty Companion",
      category: "passes",
      rarity: "Rare",
      price: 400,
      description: "For Cat Clash. Robotic combat kitten with plasma eye beam emotes and battle meows.",
      perks: ["Mecha Kitty Companion", "Exclusive Arena Intro Animation", "Laser Pounce Emote"],
    },
    {
      id: "golden-mic",
      title: "Golden Microphone & DJ Stage",
      category: "bitmoji",
      rarity: "Epic",
      price: 500,
      description: "Deluxe 24K golden microphone handheld prop and animated audio visualizer stage for your Bitmoji.",
      perks: ["Unlocks Golden Mic Prop", "Cosmic Stars Background", "Hype Dance Pose"],
      equipConfig: {
        prop: "golden-mic",
        background: "cosmic-stars",
        pose: "dance",
      },
    },
  ];

  const handlePurchase = (item: (typeof ITEMS)[0]) => {
    if (unlockedItems[item.id]) {
      // Already unlocked, equip if avatar gear
      if (item.equipConfig) {
        setUserAvatar({
          ...userAvatar,
          ...(item.equipConfig as any),
        });
        showToast(`Equipped ${item.title} to your Bitmoji avatar!`);
      }
      return;
    }

    if (walletBalance < item.price) {
      showToast(`⚠️ Insufficient Nexus Gems. You have ${walletBalance} Gems, but this item costs ${item.price} Gems.`);
      return;
    }

    const success = tipCreator("Marketplace", item.price);
    if (success) {
      setUnlockedItems((prev) => ({ ...prev, [item.id]: true }));
      if (item.equipConfig) {
        setUserAvatar({
          ...userAvatar,
          ...(item.equipConfig as any),
        });
        showToast(`Unlocked & equipped ${item.title}!`);
      } else {
        showToast(`Successfully unlocked ${item.title}!`);
      }
    }
  };

  const handleTip = (creator: string, amount: number) => {
    if (walletBalance < amount) {
      showToast(`⚠️ Insufficient Nexus Gems. Click "+ Get Gems" to top up!`);
      return;
    }
    const success = tipCreator(creator, amount);
    if (success) {
      showToast(`Tipped ${amount} Gems to ${creator}! 🎉 Thank you for supporting creators!`);
    }
  };

  const filteredItems = ITEMS.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <section className="page marketplace-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #7c3aed, #9333ea)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 30,
            fontWeight: 700,
            boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(168, 85, 247, 0.4)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Sparkles size={18} /> {toastMessage}
        </div>
      )}

      {/* Header with Wallet */}
      <header className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
        <div>
          <p className="eyebrow">Chase Studios Digital Store</p>
          <h1>Nexus Marketplace & Creator Economy</h1>
          <p>Unlock official game season passes, exclusive Bitmoji skins, and tip your favorite creators.</p>
        </div>

        {/* User Gems Wallet Card */}
        <div
          className="card"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 18px",
            background: "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(15, 10, 26, 0.8))",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            borderRadius: 18,
          }}
        >
          <div>
            <span style={{ fontSize: "0.75rem", color: "#b7b1c4", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>
              Nexus Gems Balance
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "1.3rem", fontWeight: 800, color: "#fff" }}>
              <Coins size={20} className="purple-icon" />
              <span>{walletBalance.toLocaleString()}</span>
              <small style={{ fontSize: "0.75rem", color: "#c084fc", fontWeight: 600 }}>GEMS</small>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ borderRadius: 12, padding: "6px 14px" }}
            onClick={() => {
              addGems(1000);
              showToast("Added +1,000 Nexus Gems to your wallet!");
            }}
          >
            + Get Gems
          </button>
        </div>
      </header>

      {/* Category Navigation */}
      <div style={{ display: "flex", gap: 8, margin: "16px 0 24px", flexWrap: "wrap" }}>
        {[
          { id: "all", label: "All Items", icon: ShoppingBag },
          { id: "bitmoji", label: "Bitmoji Deluxe Gear", icon: Sparkles },
          { id: "passes", label: "Game Season Passes", icon: Zap },
          { id: "chase-plus", label: "Chase+ Subscriptions", icon: Star },
          { id: "tips", label: "Tip Creators", icon: Gift },
        ].map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              className={`btn btn-sm ${activeCategory === cat.id ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveCategory(cat.id as any)}
              style={{ gap: 6 }}
            >
              <Icon size={14} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Creator Tip Jar Section (if activeCategory is tips or all) */}
      {(activeCategory === "tips" || activeCategory === "all") && (
        <div className="card" style={{ marginBottom: 24, border: "1px solid rgba(168, 85, 247, 0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 8 }}>
                <Gift size={20} className="purple-icon" /> Creator Tip Jar & Super Stars
              </h2>
              <p className="hint" style={{ margin: "4px 0 0" }}>
                Send instant Nexus Gems tips to official Chase Studios developers and verified community creators.
              </p>
            </div>
            <span className="pill">100% Goes to Creators</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {[
              { name: "Bill Chase", role: "Chase Studios Founder", badge: "staff" as const },
              { name: "Samira Cole", role: "DEADEYE Lead Designer", badge: "chase-account" as const },
              { name: "Jordan Hale", role: "Nexus Video Partner", badge: "chase-account" as const },
            ].map((creator) => (
              <div
                key={creator.name}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 14,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <strong style={{ fontSize: "1rem" }}>{creator.name}</strong>
                    <ChaseBadge type={creator.badge} />
                  </div>
                  <small style={{ color: "var(--muted)" }}>{creator.role}</small>
                </div>

                <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
                  {[100, 250, 500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, fontSize: "0.78rem", padding: "4px 8px" }}
                      onClick={() => handleTip(creator.name, amt)}
                    >
                      +{amt} 💎
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Item Catalog Grid */}
      {activeCategory !== "tips" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {filteredItems.map((item) => {
            const isUnlocked = Boolean(unlockedItems[item.id]);
            return (
              <article
                key={item.id}
                className="card item-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: isUnlocked ? "1px solid #4ade80" : "1px solid rgba(168, 85, 247, 0.25)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span
                      className="pill"
                      style={{
                        background:
                          item.rarity === "Legendary"
                            ? "rgba(234, 179, 8, 0.2)"
                            : item.rarity === "Epic"
                            ? "rgba(168, 85, 247, 0.2)"
                            : "rgba(59, 130, 246, 0.2)",
                        color:
                          item.rarity === "Legendary"
                            ? "#facc15"
                            : item.rarity === "Epic"
                            ? "#c084fc"
                            : "#60a5fa",
                        fontWeight: 700,
                      }}
                    >
                      {item.rarity}
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "var(--muted)", textTransform: "capitalize" }}>
                      {item.category.replace("-", " ")}
                    </span>
                  </div>

                  <h3 style={{ margin: "0 0 6px", fontSize: "1.15rem", fontWeight: 700 }}>{item.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--silver)", lineHeight: 1.5, margin: "0 0 14px" }}>
                    {item.description}
                  </p>

                  <ul style={{ margin: "0 0 16px", paddingLeft: 18, fontSize: "0.82rem", color: "var(--muted)", display: "flex", flexDirection: "column", gap: 4 }}>
                    {item.perks.map((perk, i) => (
                      <li key={i}>{perk}</li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 12,
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 800, fontSize: "1.1rem" }}>
                    <Coins size={16} className="purple-icon" />
                    <span>{item.price.toLocaleString()}</span>
                    <small style={{ fontSize: "0.75rem", color: "#c084fc", fontWeight: 600 }}>GEMS</small>
                  </div>

                  <button
                    type="button"
                    className={`btn btn-sm ${isUnlocked ? "btn-secondary" : "btn-primary"}`}
                    onClick={() => handlePurchase(item)}
                  >
                    {isUnlocked ? (item.equipConfig ? "Equip Gear ✓" : "Unlocked ✓") : "Unlock Item"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export function HoldScreen({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="page">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{body}</p>
    </section>
  );
}

export { ArcadeScreen } from "./ArcadeScreen";
export { AudioStagesScreen } from "./AudioStagesScreen";
export { StudioScreen } from "./StudioScreen";
