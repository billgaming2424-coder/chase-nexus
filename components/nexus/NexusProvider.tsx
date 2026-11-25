"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { POSTS } from "@/lib/demo-data";
import type {
  Audience,
  AvatarConfig,
  CustomSpaceWidgets,
  FeedId,
  FriendConnection,
  OnboardingData,
  Post,
  ReactionId,
  SpaceId,
  ThemeName,
  UserProfile,
} from "@/lib/types";
import { DEFAULT_AVATAR } from "@/lib/types";

const STORAGE_KEY = "chase-nexus-v2";
const STORAGE_VERSION = 2;

export interface NewPostInput {
  body: string;
  audience: Audience;
  imageUrl?: string;
  imageLabel?: string;
  avatarSticker?: string;
  avatarStickerCaption?: string;
  avatarDuoFriend?: string;
  videoUrl?: string;
  videoLabel?: string;
  poll?: { id: string; label: string }[];
  quote?: Post["quote"];
}

export const DEFAULT_CUSTOM_WIDGETS: CustomSpaceWidgets = {
  stories: true,
  composer: true,
  feed: true,
  videos: true,
  communities: true,
  trending: true,
  friends: true,
  chasePlus: true,
};

interface PersistedState {
  version: number;
  theme: ThemeName;
  accent: string | null;
  reducedMotion: boolean;
  displayName: string;
  posts: Post[];
  activeSpace?: SpaceId;
  customWidgets?: CustomSpaceWidgets;
  userAvatar?: AvatarConfig;
}

export interface NexusContextValue {
  ready: boolean;
  posts: Post[];
  displayName: string;
  setDisplayName: (name: string) => void;
  currentUser: User | null;
  userProfile: UserProfile | null;
  isAuthLoading: boolean;
  userAvatar: AvatarConfig;
  setUserAvatar: (avatar: AvatarConfig) => void;
  signIn: (email: string, password: string) => Promise<{ data: unknown; error: AuthError | null }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ data: unknown; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  refreshPosts: () => Promise<void>;
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  accent: string | null;
  setAccent: (accent: string | null) => void;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  activeSpace: SpaceId;
  setActiveSpace: (space: SpaceId) => void;
  customWidgets: CustomSpaceWidgets;
  setCustomWidget: (widget: keyof CustomSpaceWidgets, enabled: boolean) => void;
  quoteTarget: Post | null;
  setQuoteTarget: (post: Post | null) => void;
  addPost: (input: NewPostInput) => Promise<void> | void;
  deletePost: (id: string) => void;
  pinPost: (id: string) => void;
  reportPost: (postId: string, reason?: string) => void;
  walletBalance: number;
  addGems: (amount: number) => void;
  tipCreator: (creatorName: string, amount: number) => boolean;
  reactToPost: (id: string, reaction: ReactionId) => void;
  toggleRepost: (id: string) => void;
  toggleSave: (id: string) => void;
  addComment: (postId: string, body: string, parentId?: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  voteDiscussion: (postId: string, direction: -1 | 1) => void;
  friends: FriendConnection[];
  addFriend: (friend: FriendConnection) => void;
  removeFriend: (id: string) => void;
  isFriend: (idOrHandle: string) => boolean;
  followingHandles: string[];
  followUser: (handle: string) => void;
  unfollowUser: (handle: string) => void;
  isFollowing: (handle: string) => boolean;
  onboardingModalOpen: boolean;
  setOnboardingModalOpen: (open: boolean) => void;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
}

const NexusContext = createContext<NexusContextValue | null>(null);

const THEMES: ThemeName[] = ["chase-purple", "midnight", "light"];
const SPACES: SpaceId[] = ["social", "creator", "community", "custom"];

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

function formatPostTime(dateString: string): string {
  try {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "Just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return "Recently";
  }
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
    const demoIds = new Set(POSTS.map((post) => post.id));
    const posts = parsed.posts.map(normalizePost).filter((post): post is Post => post !== null && !demoIds.has(post.id));
    return {
      version: STORAGE_VERSION,
      theme: THEMES.includes(parsed.theme) ? parsed.theme : "chase-purple",
      accent: sanitizeAccent(parsed.accent),
      reducedMotion: Boolean(parsed.reducedMotion),
      displayName: sanitizeName(parsed.displayName),
      posts,
      activeSpace: parsed.activeSpace && SPACES.includes(parsed.activeSpace) ? parsed.activeSpace : "social",
      customWidgets: parsed.customWidgets ?? DEFAULT_CUSTOM_WIDGETS,
      userAvatar: parsed.userAvatar,
    };
  } catch {
    return null;
  }
}

export function NexusProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [displayName, setDisplayNameState] = useState("You");
  const [theme, setTheme] = useState<ThemeName>("chase-purple");
  const [accent, setAccentState] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeSpace, setActiveSpace] = useState<SpaceId>("social");
  const [customWidgets, setCustomWidgets] = useState<CustomSpaceWidgets>(DEFAULT_CUSTOM_WIDGETS);
  const [quoteTarget, setQuoteTarget] = useState<Post | null>(null);

  // Live Supabase Authentication & Profile State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(1500);

  // Friends & Social Following State (Starts 100% empty until user actively adds friends!)
  const [friends, setFriends] = useState<FriendConnection[]>([]);
  const [followingHandles, setFollowingHandles] = useState<string[]>([]);
  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false);

  const followUser = useCallback((handle: string) => {
    const clean = handle.startsWith("@") ? handle.toLowerCase() : `@${handle.toLowerCase()}`;
    setFollowingHandles((prev) => {
      if (prev.includes(clean)) return prev;
      const next = [...prev, clean];
      try {
        localStorage.setItem("nexus-following", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const unfollowUser = useCallback((handle: string) => {
    const clean = handle.startsWith("@") ? handle.toLowerCase() : `@${handle.toLowerCase()}`;
    setFollowingHandles((prev) => {
      const next = prev.filter((h) => h !== clean);
      try {
        localStorage.setItem("nexus-following", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isFollowing = useCallback(
    (handle: string) => {
      const clean = handle.startsWith("@") ? handle.toLowerCase() : `@${handle.toLowerCase()}`;
      return followingHandles.includes(clean);
    },
    [followingHandles]
  );

  const addFriend = useCallback(
    (friend: FriendConnection) => {
      setFriends((prev) => {
        if (prev.some((f) => f.handle.toLowerCase() === friend.handle.toLowerCase() || f.id === friend.id)) {
          return prev;
        }
        const next = [...prev, friend];
        try {
          localStorage.setItem("nexus-friends", JSON.stringify(next));
        } catch {}
        return next;
      });
      followUser(friend.handle);
    },
    [followUser]
  );

  const removeFriend = useCallback((id: string) => {
    setFriends((prev) => {
      const next = prev.filter((f) => f.id !== id && f.handle !== id);
      try {
        localStorage.setItem("nexus-friends", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isFriend = useCallback(
    (idOrHandle: string) => {
      const clean = idOrHandle.toLowerCase();
      return friends.some((f) => f.id.toLowerCase() === clean || f.handle.toLowerCase() === clean);
    },
    [friends]
  );

  const completeOnboarding = useCallback(
    async (data: OnboardingData) => {
      setDisplayNameState(data.displayName);
      setUserAvatarState(data.avatar);
      try {
        localStorage.setItem("nexus-custom-avatar", JSON.stringify(data.avatar));
        localStorage.setItem("nexus-onboarding-completed", "true");
        if (currentUser?.id) {
          localStorage.setItem(`nexus-onboarding-${currentUser.id}`, "true");
        }
      } catch {}

      // Add followed creators to following
      data.followedCreators.forEach((handle) => {
        followUser(handle);
      });

      // Credit +250 Welcome Gems
      setWalletBalance((prev) => {
        const next = prev + 250;
        try {
          localStorage.setItem("nexus-gems-balance", String(next));
        } catch {}
        return next;
      });

      // Save profile to Supabase if authenticated
      if (currentUser?.id) {
        try {
          await supabase.from("nexus_profiles").upsert({
            id: currentUser.id,
            display_name: data.displayName,
            avatar_url: JSON.stringify(data.avatar),
            bio: data.bio,
            updated_at: new Date().toISOString(),
          });
        } catch {}
      }

      setOnboardingModalOpen(false);
    },
    [currentUser, followUser]
  );

  // Load persistent social connections (starts 100% empty until added)
  useEffect(() => {
    try {
      const storedFriends = localStorage.getItem("nexus-friends");
      if (storedFriends) {
        setFriends(JSON.parse(storedFriends));
      }
      const storedFollowing = localStorage.getItem("nexus-following");
      if (storedFollowing) {
        setFollowingHandles(JSON.parse(storedFollowing));
      }
      const storedBalance = localStorage.getItem("nexus-gems-balance");
      if (storedBalance) {
        setWalletBalance(Number(storedBalance) || 1500);
      }
    } catch {}
  }, []);

  // Nexus Persona Custom Avatar State (initialized consistently to prevent hydration mismatch)
  const [userAvatar, setUserAvatarState] = useState<AvatarConfig>(DEFAULT_AVATAR);

  const setUserAvatar = useCallback(async (avatar: AvatarConfig) => {
    setUserAvatarState(avatar);
    try {
      localStorage.setItem("nexus-custom-avatar", JSON.stringify(avatar));
      window.dispatchEvent(new Event("nexus-avatar-updated"));

      if (currentUser?.id) {
        await supabase
          .from("nexus_profiles")
          .update({
            avatar_url: JSON.stringify(avatar),
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentUser.id);
      }
    } catch {}
  }, [currentUser]);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("nexus_profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (data && !error) {
        setUserProfile(data);
        if (data.display_name) {
          setDisplayNameState(data.display_name);
        }
        if (data.avatar_url && data.avatar_url.startsWith("{")) {
          try {
            const parsed = JSON.parse(data.avatar_url);
            setUserAvatarState(parsed);
            localStorage.setItem("nexus-custom-avatar", data.avatar_url);
          } catch {}
        }
      }
    } catch {
      // Table may not be initialized yet in database
    }
  }, []);

  const loadCloudPosts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("nexus_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (data && !error && data.length > 0) {
        const cloudPosts: Post[] = data.map((row) => ({
          id: row.id,
          author: {
            name: row.author_name || "Chase Member",
            handle: row.author_handle || "@member",
            example: false,
            verified: true,
            badgeType: "chase-account",
          },
          timeLabel: formatPostTime(row.created_at),
          body: row.body,
          feeds: Array.isArray(row.feeds) ? row.feeds : ["for-you", "following"],
          hashtags: Array.isArray(row.hashtags) ? row.hashtags : [],
          audience: (row.audience as Audience) || "public",
          tone: 1,
          imageUrl: row.image_url || undefined,
          imageLabel: row.image_label || undefined,
          poll: row.poll_data || undefined,
          quote: row.quote_data || undefined,
          reactions: { like: 0, celebrate: 0, support: 0 },
          comments: [],
          reposts: 0,
          reposted: false,
          saved: false,
          discussionScore: 0,
          discussionVote: 0,
          yours: currentUser ? row.user_id === currentUser.id : false,
        }));

        setPosts((prev) => {
          const cloudIds = new Set(cloudPosts.map((p) => p.id));
          const filteredPrev = prev.filter((p) => !cloudIds.has(p.id));
          return [...cloudPosts, ...filteredPrev];
        });
      }
    } catch {
      // Offline or database table not yet initialized
    }
  }, [currentUser]);

  // Real-time live feed updates listener via Supabase
  useEffect(() => {
    const channel = supabase
      .channel("nexus-live-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "nexus_posts" },
        (payload) => {
          const row = payload.new as any;
          if (!row) return;
          const livePost: Post = {
            id: row.id,
            author: {
              name: row.author_name || "Chase Member",
              handle: row.author_handle || "@member",
              example: false,
              verified: true,
              badgeType: "chase-account",
            },
            timeLabel: "Just now · Live",
            body: row.body,
            feeds: Array.isArray(row.feeds) ? row.feeds : ["for-you", "following"],
            hashtags: Array.isArray(row.hashtags) ? row.hashtags : [],
            audience: (row.audience as Audience) || "public",
            tone: 1,
            imageUrl: row.image_url || undefined,
            imageLabel: row.image_label || undefined,
            poll: row.poll_data || undefined,
            quote: row.quote_data || undefined,
            reactions: { like: 0, celebrate: 0, support: 0 },
            comments: [],
            reposts: 0,
            reposted: false,
            saved: false,
            discussionScore: 0,
            discussionVote: 0,
            yours: currentUser ? row.user_id === currentUser.id : false,
          };

          setPosts((prev) => {
            if (prev.some((p) => p.id === livePost.id)) return prev;
            return [livePost, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  // Sync avatar updates across tabs and on initial mount (post-hydration)
  useEffect(() => {
    const handleAvatarUpdate = () => {
      try {
        const raw = localStorage.getItem("nexus-custom-avatar");
        if (raw) setUserAvatarState(JSON.parse(raw));
      } catch {}
    };
    handleAvatarUpdate();
    window.addEventListener("nexus-avatar-updated", handleAvatarUpdate);
    return () => window.removeEventListener("nexus-avatar-updated", handleAvatarUpdate);
  }, []);

  // Initialize from LocalStorage and Supabase Session
  useEffect(() => {
    const saved = readPersisted();
    if (saved) {
      setPosts(saved.posts);
      setDisplayNameState(saved.displayName);
      setTheme(saved.theme);
      setAccentState(saved.accent);
      setReducedMotion(saved.reducedMotion);
      if (saved.activeSpace) setActiveSpace(saved.activeSpace);
      if (saved.customWidgets) setCustomWidgets(saved.customWidgets);
      if (saved.userAvatar) setUserAvatarState(saved.userAvatar);
    }
    setReady(true);

    let mounted = true;

    // Check existing Supabase session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        const user = session?.user ?? null;
        setCurrentUser(user);
        if (user) {
          fetchProfile(user.id);
        }
      })
      .catch(() => { /* Session unavailable; allow the interface to load. */ })
      .finally(() => {
        if (mounted) setIsAuthLoading(false);
      });

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const user = session?.user ?? null;
      setCurrentUser(user);
      if (user) {
        // Do not start a Supabase query inside its auth callback lock.
        setTimeout(() => { if (mounted) void fetchProfile(user.id); }, 0);
      } else {
        setUserProfile(null);
      }
      setIsAuthLoading(false);
    });


    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  // Refresh the feed separately from session initialization.
  useEffect(() => {
    loadCloudPosts();
  }, [loadCloudPosts]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (accent) document.documentElement.style.setProperty("--accent", accent);
    else document.documentElement.style.removeProperty("--accent");
    document.documentElement.classList.toggle("reduce-motion", reducedMotion);
  }, [theme, accent, reducedMotion]);

  useEffect(() => {
    if (!ready) return;
    const persist = () => {
    const payload: PersistedState = {
      version: STORAGE_VERSION,
      theme,
      accent,
      reducedMotion,
      displayName,
      activeSpace,
      customWidgets,
      userAvatar,
      posts: posts.map((post) => ({
        ...post,
        imageUrl: post.imageUrl?.startsWith("blob:") ? undefined : post.imageUrl,
      })),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage fallback
    }
    };
    const timer = window.setTimeout(persist, 250);
    window.addEventListener('pagehide', persist);
    return () => { window.clearTimeout(timer); window.removeEventListener('pagehide', persist); };
  }, [ready, posts, theme, accent, reducedMotion, displayName, activeSpace, customWidgets, userAvatar]);

  const value = useMemo<NexusContextValue>(() => {
    const update = (id: string, recipe: (post: Post) => Post) => {
      setPosts((current) => current.map((post) => (post.id === id ? recipe(post) : post)));
    };

    return {
      ready,
      posts,
      displayName,
      setDisplayName: (name: string) => setDisplayNameState(sanitizeName(name)),
      currentUser,
      userProfile,
      isAuthLoading,
      userAvatar,
      setUserAvatar,
      signIn: async (email: string, password: string) => {
        setIsAuthLoading(true);
        try {
          const res = await supabase.auth.signInWithPassword({ email, password });
          if (res.data?.user) {
            setCurrentUser(res.data.user);
            await fetchProfile(res.data.user.id);
            await loadCloudPosts();
          }
          return res;
        } finally {
          setIsAuthLoading(false);
        }
      },
      signUp: async (email: string, password: string, name?: string) => {
        setIsAuthLoading(true);
        try {
          const res = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                display_name: name || "Chase Member",
                full_name: name || "Chase Member",
              },
            },
          });
          if (res.data?.user) {
            setCurrentUser(res.data.user);
            try {
              await supabase.from("nexus_profiles").upsert({
                id: res.data.user.id,
                email: res.data.user.email,
                display_name: name || "Chase Member",
                username: res.data.user.email?.split("@")[0] || "member",
                verified: true,
                badge_type: "chase-account",
              });
            } catch {
              // Table might be pending schema migration
            }
            await fetchProfile(res.data.user.id);
            await loadCloudPosts();
          }
          return res;
        } finally {
          setIsAuthLoading(false);
        }
      },
      signOut: async () => {
        setIsAuthLoading(true);
        try {
          const res = await supabase.auth.signOut();
          setCurrentUser(null);
          setUserProfile(null);
          return res;
        } finally {
          setIsAuthLoading(false);
        }
      },
      refreshPosts: async () => {
        await loadCloudPosts();
      },
      theme,
      setTheme,
      accent,
      setAccent: (next: string | null) => setAccentState(sanitizeAccent(next)),
      reducedMotion,
      setReducedMotion,
      activeSpace,
      setActiveSpace,
      customWidgets,
      setCustomWidget: (widget: keyof CustomSpaceWidgets, enabled: boolean) =>
        setCustomWidgets((prev) => ({ ...prev, [widget]: enabled })),
      quoteTarget,
      setQuoteTarget,
      deletePost: (id: string) => {
        setPosts((current) => current.filter((p) => p.id !== id));
      },
      pinPost: (id: string) => {
        update(id, (p) => ({ ...p, pinned: !p.pinned }));
      },
      reportPost: (postId: string) => {
        update(postId, (p) => ({ ...p, reported: true }));
      },
      walletBalance,
      addGems: (amount: number) => {
        setWalletBalance((prev) => {
          const next = prev + amount;
          try {
            localStorage.setItem("nexus-gems-balance", String(next));
          } catch {}
          return next;
        });
      },
      tipCreator: (creatorName: string, amount: number) => {
        if (walletBalance < amount) return false;
        setWalletBalance((prev) => {
          const next = prev - amount;
          try {
            localStorage.setItem("nexus-gems-balance", String(next));
          } catch {}
          return next;
        });
        return true;
      },
      addPost: async (input: NewPostInput) => {
        if (!currentUser) throw new Error("Sign in before publishing.");
        if (input.audience !== "public") throw new Error("Private audiences are not supported in this preview.");
        if (input.imageUrl || input.videoUrl || input.avatarSticker || input.poll || input.quote) throw new Error("Attachments, polls and quotes are not yet supported for publishing.");
        const authorName =
          userProfile?.display_name ||
          (displayName !== "You" ? displayName : "Chase Member");
        const authorHandle = userProfile?.username
          ? `@${userProfile.username}`
          : currentUser?.email
          ? `@${currentUser.email.split("@")[0]}`
          : "@you";

        const newPostId = crypto.randomUUID();
        const post: Post = {
          id: newPostId,
          author: {
            name: authorName,
            handle: authorHandle,
            example: false,
            verified: true,
            badgeType: "chase-account",
            avatarConfig: userAvatar,
          },
          timeLabel: "Just now · Chase Cloud",
          body: input.body.trim(),
          feeds: ["for-you", "following"],
          hashtags: Array.from(input.body.matchAll(/#([A-Za-z0-9_]+)/g), (match) => match[1]),
          audience: input.audience,
          tone: 1,
          imageUrl: input.imageUrl,
          imageLabel: input.imageLabel,
          videoUrl: input.videoUrl,
          videoLabel: input.videoLabel,
          avatarSticker: input.avatarSticker,
          avatarStickerCaption: input.avatarStickerCaption,
          avatarDuoFriend: input.avatarDuoFriend,
          poll: undefined,
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


        // If authenticated, persist to live Supabase backend
        if (currentUser) {
          try {
            const { error } = await supabase.from("nexus_posts").insert({
              id: newPostId,
              user_id: currentUser.id,
              author_name: authorName,
              author_handle: authorHandle,
              body: input.body.trim(),
              audience: input.audience,
              feeds: ["for-you", "following"],
              hashtags: Array.from(input.body.matchAll(/#([A-Za-z0-9_]+)/g), (match) => match[1]),
              image_url: input.imageUrl || null,
              image_label: input.imageLabel || null,
              poll_data: input.poll ? JSON.parse(JSON.stringify(input.poll)) : null,
              quote_data: input.quote ? JSON.parse(JSON.stringify(input.quote)) : null,
            });
            if (error) throw new Error("Could not publish your post. Please try again.");
            setPosts((current) => current.some((item) => item.id === post.id) ? current : [post, ...current]);
            setQuoteTarget(null);
          } catch (err) {
            throw err;
          }
        }
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
        const authorName =
          userProfile?.display_name ||
          (displayName !== "You" ? displayName : "Chase Member");
        update(postId, (post) => ({
          ...post,
          comments: [
            ...post.comments,
            {
              id: crypto.randomUUID(),
              author: authorName,
              body: text.slice(0, 300),
              example: false,
              parentId,
              verified: true,
              badgeType: "chase-account",
              avatarConfig: userAvatar,
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
      friends,
      addFriend,
      removeFriend,
      isFriend,
      followingHandles,
      followUser,
      unfollowUser,
      isFollowing,
      onboardingModalOpen,
      setOnboardingModalOpen,
      completeOnboarding,
    };
  }, [
    ready,
    posts,
    displayName,
    currentUser,
    userProfile,
    isAuthLoading,
    userAvatar,
    setUserAvatar,
    fetchProfile,
    loadCloudPosts,
    theme,
    accent,
    reducedMotion,
    activeSpace,
    customWidgets,
    quoteTarget,
    walletBalance,
    friends,
    addFriend,
    removeFriend,
    isFriend,
    followingHandles,
    followUser,
    unfollowUser,
    isFollowing,
    onboardingModalOpen,
    completeOnboarding,
  ]);

  return <NexusContext.Provider value={value}>{children}</NexusContext.Provider>;
}

export function useNexus() {
  const context = useContext(NexusContext);
  if (!context) throw new Error("useNexus must be used within NexusProvider");
  return context;
}
