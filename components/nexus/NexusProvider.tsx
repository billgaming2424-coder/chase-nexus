"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { POSTS } from "@/lib/demo-data";
import type { Audience, FeedId, Post, ReactionId, ThemeName } from "@/lib/types";

const STORAGE_KEY = "chase-nexus-alpha";
const STORAGE_VERSION = 1;

export interface NewPostInput {
  body: string;
  audience: Audience;
  imageUrl?: string;
  imageLabel?: string;
  poll?: { id: string; label: string }[];
  quote?: Post["quote"];
}

interface PersistedState {
  version: number;
  theme: ThemeName;
  accent: string | null;
  reducedMotion: boolean;
  displayName: string;
  posts: Post[];
}

interface NexusContextValue {
  ready: boolean;
  posts: Post[];
  displayName: string;
  setDisplayName: (name: string) => void;
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  accent: string | null;
  setAccent: (accent: string | null) => void;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  quoteTarget: Post | null;
  setQuoteTarget: (post: Post | null) => void;
  addPost: (input: NewPostInput) => void;
  reactToPost: (id: string, reaction: ReactionId) => void;
  toggleRepost: (id: string) => void;
  toggleSave: (id: string) => void;
  addComment: (postId: string, body: string, parentId?: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  voteDiscussion: (postId: string, direction: -1 | 1) => void;
}

const NexusContext = createContext<NexusContextValue | null>(null);

const THEMES: ThemeName[] = ["chase-purple", "midnight", "light"];

function sanitizeAccent(value: unknown): string | null {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value) ? value : null;
}

function sanitizeName(value: unknown): string {
  if (typeof value !== "string") return "You";
  const cleaned = value.replace(/[\u0000-\u001F]/g, "").trim().slice(0, 40);
  return cleaned || "You";
}

function isFeedId(value: string): value is FeedId {
  return [
    "for-you",
    "following",
    "friends",
    "trending",
    "communities",
    "discussions",
    "videos",
  ].includes(value);
}

function normalizePost(value: unknown): Post | null {
  if (!value || typeof value !== "object") return null;
  const post = value as Post;
  if (typeof post.id !== "string" || typeof post.body !== "string") return null;
  if (!Array.isArray(post.feeds) || !post.reactions) return null;
  return {
    ...post,
    author: post.author?.name
      ? post.author
      : { name: "Member", handle: "@member", example: true },
    timeLabel: typeof post.timeLabel === "string" ? post.timeLabel : "Sample",
    audience: post.audience ?? "public",
    tone: post.tone ?? 1,
    feeds: post.feeds.filter((feed): feed is FeedId => typeof feed === "string" && isFeedId(feed)),
    hashtags: Array.isArray(post.hashtags) ? post.hashtags.filter((tag) => typeof tag === "string") : [],
    comments: Array.isArray(post.comments) ? post.comments : [],
    reactions: {
      like: Number(post.reactions.like) || 0,
      celebrate: Number(post.reactions.celebrate) || 0,
      support: Number(post.reactions.support) || 0,
    },
    imageUrl: post.imageUrl?.startsWith("blob:") ? undefined : post.imageUrl,
    reposts: Number(post.reposts) || 0,
    discussionScore: Number(post.discussionScore) || 0,
    discussionVote: post.discussionVote === -1 || post.discussionVote === 1 ? post.discussionVote : 0,
    saved: Boolean(post.saved),
    reposted: Boolean(post.reposted),
  };
}

function readPersisted(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (parsed.version !== STORAGE_VERSION || !Array.isArray(parsed.posts)) return null;
    const posts = parsed.posts.map(normalizePost).filter((post): post is Post => post !== null);
    if (posts.length === 0) return null;
    return {
      version: STORAGE_VERSION,
      theme: THEMES.includes(parsed.theme) ? parsed.theme : "chase-purple",
      accent: sanitizeAccent(parsed.accent),
      reducedMotion: Boolean(parsed.reducedMotion),
      displayName: sanitizeName(parsed.displayName),
      posts,
    };
  } catch {
    return null;
  }
}

export function NexusProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [displayName, setDisplayNameState] = useState("You");
  const [theme, setTheme] = useState<ThemeName>("chase-purple");
  const [accent, setAccentState] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [quoteTarget, setQuoteTarget] = useState<Post | null>(null);

  useEffect(() => {
    const saved = readPersisted();
    if (saved) {
      setPosts(saved.posts);
      setDisplayNameState(saved.displayName);
      setTheme(saved.theme);
      setAccentState(saved.accent);
      setReducedMotion(saved.reducedMotion);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (accent) document.documentElement.style.setProperty("--accent", accent);
    else document.documentElement.style.removeProperty("--accent");
    document.documentElement.classList.toggle("reduce-motion", reducedMotion);
  }, [theme, accent, reducedMotion]);

  useEffect(() => {
    if (!ready) return;
    const payload: PersistedState = {
      version: STORAGE_VERSION,
      theme,
      accent,
      reducedMotion,
      displayName,
      posts: posts.map((post) => ({
        ...post,
        imageUrl: post.imageUrl?.startsWith("blob:") ? undefined : post.imageUrl,
      })),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Private mode or a full disk should not break the preview.
    }
  }, [ready, posts, theme, accent, reducedMotion, displayName]);

  const value = useMemo<NexusContextValue>(() => {
    const update = (id: string, recipe: (post: Post) => Post) => {
      setPosts((current) => current.map((post) => (post.id === id ? recipe(post) : post)));
    };

    return {
      ready,
      posts,
      displayName,
      setDisplayName: (name: string) => setDisplayNameState(sanitizeName(name)),
      theme,
      setTheme,
      accent,
      setAccent: (next: string | null) => setAccentState(sanitizeAccent(next)),
      reducedMotion,
      setReducedMotion,
      quoteTarget,
      setQuoteTarget,
      addPost: (input: NewPostInput) => {
        const post: Post = {
          id: crypto.randomUUID(),
          author: { name: displayName, handle: "@you", example: false },
          timeLabel: "Just now · this device",
          body: input.body.trim(),
          feeds: ["for-you", "following"],
          hashtags: Array.from(input.body.matchAll(/#([A-Za-z0-9_]+)/g), (match) => match[1]),
          audience: input.audience,
          tone: 1,
          imageUrl: input.imageUrl,
          imageLabel: input.imageLabel,
          poll: input.poll?.map((choice) => ({ ...choice, votes: 0 })),
          quote: input.quote,
          reactions: { like: 0, celebrate: 0, support: 0 },
          comments: [],
          reposts: 0,
          reposted: false,
          saved: false,
          discussionScore: 0,
          discussionVote: 0,
          yours: true,
        };
        setPosts((current) => [post, ...current]);
        setQuoteTarget(null);
      },
      reactToPost: (id, reaction) => {
        update(id, (post) => {
          const reactions = { ...post.reactions };
          if (post.reaction) reactions[post.reaction] = Math.max(0, reactions[post.reaction] - 1);
          const next = post.reaction === reaction ? undefined : reaction;
          if (next) reactions[next] += 1;
          return { ...post, reactions, reaction: next };
        });
      },
      toggleRepost: (id) => {
        update(id, (post) => ({
          ...post,
          reposted: !post.reposted,
          reposts: Math.max(0, post.reposts + (post.reposted ? -1 : 1)),
        }));
      },
      toggleSave: (id) => {
        update(id, (post) => ({ ...post, saved: !post.saved }));
      },
      addComment: (postId, body, parentId) => {
        const text = body.trim();
        if (!text) return;
        update(postId, (post) => ({
          ...post,
          comments: [
            ...post.comments,
            {
              id: crypto.randomUUID(),
              author: displayName,
              body: text.slice(0, 300),
              example: false,
              parentId,
            },
          ],
        }));
      },
      votePoll: (postId, optionId) => {
        update(postId, (post) => {
          if (!post.poll || post.pollVote === optionId) return post;
          return {
            ...post,
            pollVote: optionId,
            poll: post.poll.map((choice) => {
              let votes = choice.votes;
              if (post.pollVote === choice.id) votes -= 1;
              if (choice.id === optionId) votes += 1;
              return { ...choice, votes: Math.max(0, votes) };
            }),
          };
        });
      },
      voteDiscussion: (postId, direction) => {
        update(postId, (post) => {
          const discussionVote = post.discussionVote === direction ? 0 : direction;
          return {
            ...post,
            discussionVote,
            discussionScore: post.discussionScore - post.discussionVote + discussionVote,
          };
        });
      },
    };
  }, [ready, posts, displayName, theme, accent, reducedMotion, quoteTarget]);

  return <NexusContext.Provider value={value}>{children}</NexusContext.Provider>;
}

export function useNexus() {
  const context = useContext(NexusContext);
  if (!context) throw new Error("useNexus must be used within NexusProvider");
  return context;
}
