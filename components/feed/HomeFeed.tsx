"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, Video, Users, MessagesSquare, Check, Search, Bell, MessageCircle } from "lucide-react";
import { Composer } from "@/components/feed/Composer";
import { PostCard } from "@/components/feed/PostCard";
import { StoriesRow } from "@/components/feed/StoriesRow";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";
import { useNexus } from "@/components/nexus/NexusProvider";
import { COMMUNITIES, VIDEOS } from "@/lib/demo-data";
import { FEEDS, type FeedId, type SpaceId } from "@/lib/types";

const SPACES: { id: SpaceId; label: string; icon: string; subtitle: string }[] = [
  { id: "social", label: "Social Space", icon: "🌟", subtitle: "Feeds, stories, friends & updates" },
  { id: "creator", label: "Creator Space", icon: "🎬", subtitle: "Nexus Video, creator uploads & metrics" },
  { id: "community", label: "Community Space", icon: "🛡️", subtitle: "Servers, discussions & forums" },
  { id: "custom", label: "Custom Space", icon: "⚙️", subtitle: "Personalized widget toggles" },
];

function isFeedId(value: string | null): value is FeedId {
  return FEEDS.some((feed) => feed.id === value);
}

export function HomeFeed() {
  const params = useSearchParams();
  const {
    posts,
    activeSpace,
    setActiveSpace,
    customWidgets,
    setCustomWidget,
    userAvatar,
    friends,
    isFriend,
    isFollowing,
    setOnboardingModalOpen,
  } = useNexus();
  const [tab, setTab] = useState<FeedId>("for-you");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [limit, setLimit] = useState(15);
  useEffect(() => setLimit(15), [tab, deferredQuery, tag, activeSpace]);

  useEffect(() => {
    const feed = params.get("feed");
    const nextTag = params.get("tag");
    if (isFeedId(feed)) setTab(feed);
    if (nextTag) setTag(nextTag);
  }, [params]);

  // If switched to creator space, default to videos feed; if community, default to communities/discussions
  useEffect(() => {
    if (activeSpace === "creator") setTab("videos");
    else if (activeSpace === "community") setTab("communities");
  }, [activeSpace]);

  const visible = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    return posts.filter((post) => {
      let inFeed = false;
      const isYours = Boolean(post.yours);
      if (tab === "for-you") {
        inFeed = post.feeds.includes("for-you") || isYours;
      } else if (tab === "following") {
        inFeed = isYours || isFollowing(post.author.handle);
      } else if (tab === "friends") {
        inFeed = isYours || isFriend(post.author.handle) || isFriend(post.author.name);
      } else {
        inFeed = post.feeds.includes(tab);
      }

      const haystack = [post.body, post.author.name, post.author.handle, post.hashtags.join(" ")].join(" ").toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      const matchesTag = !tag || post.hashtags.some((item) => item.toLowerCase() === tag.toLowerCase());
      return inFeed && matchesQuery && matchesTag;
    });
  }, [posts, deferredQuery, tab, tag, isFollowing, isFriend]);

  const currentSpaceMeta = SPACES.find((s) => s.id === activeSpace) ?? SPACES[0];

  return (
    <div className="feed">
      {/* Top Unified Global Search & Quick Actions Bar */}
      <div
        className="concept-top-bar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
          background: "rgba(20, 12, 34, 0.75)",
          
          border: "1px solid rgba(168, 85, 247, 0.18)",
          borderRadius: 16,
          padding: "7px 14px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
          <Search size={16} style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="Search posts, creators, #hashtags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "0.86rem",
              width: "100%",
            }}
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              style={{
                background: "none",
                border: "none",
                color: "var(--muted)",
                cursor: "pointer",
                padding: 2,
                display: "flex",
              }}
            >
              ✕
            </button>
          ) : null}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/messages"
            className="icon-btn"
            style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255, 255, 255, 0.04)" }}
            title="Direct Messages"
          >
            <MessageCircle size={15} />
          </Link>
          <Link
            href="/notifications"
            className="icon-btn"
            style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255, 255, 255, 0.04)" }}
            title="Notifications"
          >
            <Bell size={15} />
          </Link>
          <Link
            href="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "2px 8px 2px 3px",
              background: "rgba(124, 58, 237, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              borderRadius: 20,
              textDecoration: "none",
              color: "#fff",
              fontSize: "0.78rem",
              fontWeight: 600,
            }}
          >
            <NexusAvatar config={userAvatar} size={22} showStickerBadge />
            <span>Profile</span>
          </Link>
        </div>
      </div>

      {/* Nexus Spaces Header & Bar */}
      <header className="feed-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <h1 style={{ fontSize: "1.45rem", fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>Home</h1>

        {/* Spaces Switcher Tabs */}
        <div className="spaces-bar" role="tablist" aria-label="Nexus Spaces" style={{ margin: 0, padding: 0 }}>
          {SPACES.map((space) => {
            const isActive = activeSpace === space.id;
            return (
              <button
                key={space.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`space-btn ${isActive ? "is-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.78rem" }}
                onClick={() => setActiveSpace(space.id)}
              >
                <span aria-hidden="true">{space.icon}</span>
                <span>{space.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Creator Space Highlight Banner */}
      {activeSpace === "creator" ? (
        <section className="card creator-space-banner">
          <div className="creator-stats-row">
            <div>
              <p className="eyebrow">Creator Dashboard Preview</p>
              <h3>Channel Studio Overview</h3>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link href="/studio" className="btn btn-primary small-btn">
                Creator Studio & Payouts
              </Link>
              <Link href="/video" className="btn btn-secondary small-btn">
                Video Hub
              </Link>
            </div>
          </div>
          <div className="creator-metrics-grid" hidden>
            <div className="metric-box">
              <small>Demo Views</small>
              <strong>12.8K</strong>
            </div>
            <div className="metric-box">
              <small>Watch Time</small>
              <strong>418 hrs</strong>
            </div>
            <div className="metric-box">
              <small>Subscribers</small>
              <strong>1,490</strong>
            </div>
          </div>
        </section>
      ) : null}

      {/* Community Space Highlight Banner */}
      {activeSpace === "community" ? (
        <section className="card community-space-banner">
          <div className="creator-stats-row">
            <div>
              <p className="eyebrow">Nexus Communities Hub</p>
              <h3>Featured Active Realms</h3>
            </div>
            <Link href="/communities" className="btn btn-primary small-btn">
              All Communities
            </Link>
          </div>
          <div className="community-pills-row">
            {COMMUNITIES.map((c) => (
              <span key={c.id} className="community-chip">
                <Users size={14} />
                <strong>{c.name}</strong>
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {/* Custom Space Widget Configurator */}
      {activeSpace === "custom" ? (
        <section className="card custom-space-controls">
          <div className="card-head-row">
            <div>
              <p className="eyebrow">Custom Space Customization</p>
              <h3>Modular Widget Controls</h3>
            </div>
            <span className="pill">Toggle Sections</span>
          </div>
          <div className="widget-toggle-chips">
            <button
              type="button"
              className={`chip ${customWidgets.stories ? "is-active" : ""}`}
              onClick={() => setCustomWidget("stories", !customWidgets.stories)}
            >
              {customWidgets.stories ? <Check size={14} /> : null} Stories Carousel
            </button>
            <button
              type="button"
              className={`chip ${customWidgets.composer ? "is-active" : ""}`}
              onClick={() => setCustomWidget("composer", !customWidgets.composer)}
            >
              {customWidgets.composer ? <Check size={14} /> : null} Post Composer
            </button>
            <button
              type="button"
              className={`chip ${customWidgets.feed ? "is-active" : ""}`}
              onClick={() => setCustomWidget("feed", !customWidgets.feed)}
            >
              {customWidgets.feed ? <Check size={14} /> : null} Social Feed
            </button>
          </div>
        </section>
      ) : null}

      {/* Stories Carousel */}
      {activeSpace === "social" || (activeSpace === "custom" && customWidgets.stories) ? (
        <StoriesRow />
      ) : null}

      {/* Post Composer */}
      {activeSpace !== "custom" || customWidgets.composer ? <Composer /> : null}

      {/* Feed Filter Tools */}
      {activeSpace !== "custom" || customWidgets.feed ? (
        <>
          <div className="feed-tools" style={{ marginTop: 12, marginBottom: 8 }}>
            <div className="tabs" role="tablist" aria-label="Feed">
              {FEEDS.map((feed) => (
                <button
                  key={feed.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === feed.id}
                  className={tab === feed.id ? "tab is-active" : "tab"}
                  onClick={() => setTab(feed.id)}
                >
                  {feed.label}
                </button>
              ))}
            </div>
          </div>

          {tag ? (
            <p className="filter-note">
              Showing #{tag}
              <button type="button" onClick={() => setTag("")}>
                Clear
              </button>
            </p>
          ) : null}

          <div className="post-list">
            {visible.length === 0 ? (
              tab === "friends" ? (
                <div className="empty card" style={{ textAlign: "center", padding: "36px 20px" }}>
                  <div style={{ fontSize: "2.4rem", marginBottom: 10 }}>👥</div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: 6, color: "#fff" }}>No posts from friends yet</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.85rem", maxWidth: 420, margin: "0 auto 16px" }}>
                    Your friends feed is completely empty until you connect with people. Add friends or launch the setup wizard to connect!
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ fontSize: "0.82rem", padding: "8px 18px", borderRadius: 12 }}
                    onClick={() => setOnboardingModalOpen(true)}
                  >
                    + Find Friends & Creators
                  </button>
                </div>
              ) : tab === "following" ? (
                <div className="empty card" style={{ textAlign: "center", padding: "36px 20px" }}>
                  <div style={{ fontSize: "2.4rem", marginBottom: 10 }}>✨</div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: 6, color: "#fff" }}>You aren't following anyone yet</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.85rem", maxWidth: 440, margin: "0 auto 16px" }}>
                    Follow Chase Studios game directors, community moderators, and video creators to see their exclusive updates here.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ fontSize: "0.82rem", padding: "8px 18px", borderRadius: 12 }}
                    onClick={() => setOnboardingModalOpen(true)}
                  >
                    Explore Suggested Creators
                  </button>
                </div>
              ) : (
                <p className="empty card">No posts yet in this feed. Share an update or follow someone.</p>
              )
            ) : (
              visible.slice(0, limit).map((post) => <PostCard key={post.id} post={post} mode={tab} onTag={setTag} />)
            )}
          </div>
          {visible.length > limit && <button type="button" className="btn btn-ghost" onClick={() => setLimit((n) => n + 15)}>Load more posts</button>}
        </>
      ) : (
        <p className="empty card">Feed widget is disabled in your Custom Space layout.</p>
      )}
    </div>
  );
}
