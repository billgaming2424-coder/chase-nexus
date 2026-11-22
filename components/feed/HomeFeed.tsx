"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Composer } from "@/components/feed/Composer";
import { PostCard } from "@/components/feed/PostCard";
import { StoriesRow } from "@/components/feed/StoriesRow";
import { useNexus } from "@/components/nexus/NexusProvider";
import { FEEDS, type FeedId } from "@/lib/types";

function isFeedId(value: string | null): value is FeedId {
  return FEEDS.some((feed) => feed.id === value);
}

export function HomeFeed() {
  const params = useSearchParams();
  const { posts } = useNexus();
  const [tab, setTab] = useState<FeedId>("for-you");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    const feed = params.get("feed");
    const nextTag = params.get("tag");
    if (isFeedId(feed)) setTab(feed);
    if (nextTag) setTag(nextTag);
  }, [params]);

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

  return (
    <div className="feed">
      <header className="feed-head">
        <p className="eyebrow">Nexus Social</p>
        <h1>Home</h1>
        <p>A demonstration feed in chronological sample order. Your own posts appear first.</p>
      </header>
      <StoriesRow />
      <Composer />
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
    </div>
  );
}
