"use client";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, MessageCircle, Bell, Camera, Users, Compass } from "lucide-react";
import { Composer } from "@/components/feed/Composer";
import { PostCard } from "@/components/feed/PostCard";
import { useNexus } from "@/components/nexus/NexusProvider";
import { FEEDS, type FeedId } from "@/lib/types";

export function HomeFeed() {
  const params = useSearchParams();
  const { posts, isFriend, isFollowing, ready } = useNexus();
  const [tab, setTab] = useState<FeedId>("for-you");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [limit, setLimit] = useState(15);
  const needle = useDeferredValue(query).trim().toLowerCase();
  useEffect(() => {
    const feed = FEEDS.find(f => f.id === params.get("feed"));
    if (feed) setTab(feed.id);
    setTag(params.get("tag") ?? "");
  }, [params]);
  useEffect(() => setLimit(15), [tab, needle, tag]);
  const visible = useMemo(() => posts.filter(p => {
    const matchesFeed = tab === "following" ? p.yours || isFollowing(p.author.handle) : tab === "friends" ? p.yours || isFriend(p.author.handle) || isFriend(p.author.name) : p.feeds.includes(tab) || (tab === "for-you" && p.yours);
    return matchesFeed && (!needle || [p.body,p.author.name,p.author.handle,...p.hashtags].join(" ").toLowerCase().includes(needle)) && (!tag || p.hashtags.some(t => t.toLowerCase() === tag.toLowerCase()));
  }), [posts,tab,needle,tag,isFriend,isFollowing]);
  return <div className="feed nexus-home">
    <section className="nexus-brand-hero"><img src="/chase-studios-logo.svg" alt="" width={96} height={96}/><div><h1>CHASE <em>NEXUS</em></h1><p>CONNECT. CREATE. DISCOVER.</p></div></section><header className="nexus-home-head"><div><h1>Home</h1><p>Your people. Your world.</p></div><div className="nexus-quick"><Link href="/messages" aria-label="Messages"><MessageCircle size={21}/></Link><Link href="/notifications" aria-label="Notifications"><Bell size={21}/></Link></div></header>
    <div className="nexus-search"><Search size={19}/><input aria-label="Search posts" placeholder="Search your feed" value={query} onChange={e=>setQuery(e.target.value)}/>{query && <button type="button" onClick={()=>setQuery("")} aria-label="Clear search">×</button>}</div>
    <section className="nexus-story-section"><div className="nexus-section-heading"><h2>Stories & discovery</h2><Link href="/stories">View stories</Link></div><div className="nexus-story-strip"><Link href="/stories" className="nexus-story-tile story-purple"><Camera size={28}/><strong>Stories</strong><small>Explore stories</small></Link><Link href="/communities" className="nexus-story-tile story-blue"><Users size={28}/><strong>Communities</strong><small>Find your circle</small></Link><Link href="/explore" className="nexus-story-tile story-pink"><Compass size={28}/><strong>Discover</strong><small>Explore Nexus</small></Link></div></section>
    <Composer/>
    <div className="nexus-feed-tabs" aria-label="Feed filters">{FEEDS.filter(f=>["for-you","following","friends"].includes(f.id)||f.id===tab).map(f=><button type="button" key={f.id} aria-pressed={tab===f.id} onClick={()=>setTab(f.id)}>{f.label}</button>)}</div>
    {tag && <p className="filter-note">#{tag} <button type="button" onClick={()=>setTag("")}>Clear</button></p>}
    <div className="post-list">{!ready ? <p role="status" className="card">Loading feed…</p> : visible.length ? visible.slice(0,limit).map(post=><PostCard key={post.id} post={post} mode={tab} onTag={setTag}/>) : <section className="card nexus-empty"><MessageCircle size={32}/><h2>{needle||tag?"No matching posts":"Welcome to Nexus"}</h2><p>{needle||tag?"Try a different search.":"Build your circle, share your world, and find your people."}</p><Link href="/explore" className="btn btn-secondary">Discover Nexus</Link></section>}</div>
    {visible.length>limit && <button className="btn btn-ghost" type="button" onClick={()=>setLimit(n=>n+15)}>Load more posts</button>}
  </div>;
}
