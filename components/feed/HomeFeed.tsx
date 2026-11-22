"use client";

import { useEffect, useMemo, useState } from "react";
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
  const { posts, activeSpace, setActiveSpace, customWidgets, setCustomWidget, userAvatar } = useNexus();
  const [tab, setTab] = useState<FeedId>("for-you");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");

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
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const inFeed = post.feeds.includes(tab) || (post.yours && (tab === "for-you" || tab === "following"));
      const haystack = [post.body, post.author.name, post.author.handle, post.hashtags.join(" ")].join(" ").toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      const matchesTag = !tag || post.hashtags.some((item) => item.toLowerCase() === tag.toLowerCase());
      return inFeed && matchesQuery && matchesTag;
    });
  }, [posts, query, tab, tag]);

  const currentSpaceMeta = SPACES.find((s) => s.id === activeSpace) ?? SPACES[0];

  return (
    <div className="feed">
      {/* Top Global Search & Quick Actions Bar (Concept Mockup Match) */}
      <div
        className="concept-top-bar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          background: "rgba(14, 10, 24, 0.65)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(168, 85, 247, 0.2)",
          borderRadius: 18,
          padding: "8px 14px",
        }}
      >
        <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
          <Search size={16} style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="Search Chase Nexus, creators, #topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "0.88rem",
              width: "100%",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link
            href="/messages"
            className="icon-btn"
            style={{ width: 34, height: 34, background: "rgba(255, 255, 255, 0.04)" }}
            title="Direct Messages"
          >
            <MessageCircle size={16} />
          </Link>
          <Link
            href="/notifications"
            className="icon-btn"
            style={{ width: 34, height: 34, background: "rgba(255, 255, 255, 0.04)" }}
            title="Notifications"
          >
            <Bell size={16} />
          </Link>
          <Link
            href="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 10px 3px 4px",
              background: "rgba(124, 58, 237, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              borderRadius: 20,
              textDecoration: "none",
              color: "#fff",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            <NexusAvatar config={userAvatar} size={24} showStickerBadge />
            <span>Profile</span>
          </Link>
        </div>
      </div>

      {/* Nexus Spaces Header & Bar */}
      <header className="feed-head">
        <div className="space-header-row">
          <div>
            <p className="eyebrow">Nexus Spaces · {currentSpaceMeta.label}</p>
            <h1>Home</h1>
          </div>
          <span className="pill">{currentSpaceMeta.subtitle}</span>
        </div>

        {/* Spaces Switcher Tabs */}
        <div className="spaces-bar" role="tablist" aria-label="Nexus Spaces">
          {SPACES.map((space) => {
            const isActive = activeSpace === space.id;
            return (
              <button
                key={space.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`space-btn ${isActive ? "is-active" : ""}`}
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
            <Link href="/video" className="btn btn-primary small-btn">
              Explore Video Hub
            </Link>
          </div>
          <div className="creator-metrics-grid">
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

      {/* Feed Filter & Search Tools */}
      {activeSpace !== "custom" || customWidgets.feed ? (
        <>
          <div className="feed-tools">
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
            <label className="search">
              <span className="sr-only">Search this preview</span>
              <input
                value={query}
                placeholder="Search this preview"
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
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
              <p className="empty card">Nothing in this preview matches the current feed.</p>
            ) : (
              visible.map((post) => <PostCard key={post.id} post={post} mode={tab} onTag={setTag} />)
            )}
          </div>
        </>
      ) : (
        <p className="empty card">Feed widget is disabled in your Custom Space layout.</p>
      )}
    </div>
  );
}
