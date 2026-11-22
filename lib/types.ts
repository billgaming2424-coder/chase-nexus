export type ThemeName = "chase-purple" | "midnight" | "light";

export type SpaceId = "social" | "creator" | "community" | "custom";

export interface CustomSpaceWidgets {
  stories: boolean;
  composer: boolean;
  feed: boolean;
  videos: boolean;
  communities: boolean;
  trending: boolean;
  friends: boolean;
  chasePlus: boolean;
}

export type FeedId =
  | "for-you"
  | "following"
  | "friends"
  | "trending"
  | "communities"
  | "discussions"
  | "videos";

export type Audience = "public" | "friends" | "followers";

export type ReactionId = "like" | "celebrate" | "support";

export type BadgeCategory =
  | "chase-account"
  | "official"
  | "staff"
  | "moderator"
  | "chase-plus"
  | "identity-verified";

export interface AvatarConfig {
  skinTone: string;
  hairStyle:
    | "buzz"
    | "fade"
    | "spikes"
    | "wavy"
    | "afro"
    | "braids"
    | "flowing"
    | "bun"
    | "side-part"
    | "dreads"
    | "mohawk"
    | "curls"
    | "slick-back"
    | "ponytail"
    | "neon-locs";
  hairColor: string;
  eyeShape: "almond" | "round" | "sharp" | "starry";
  eyeColor: string;
  mouth: "smile" | "smirk" | "laugh" | "neutral" | "battle" | "wink";
  facialHair?: "none" | "stubble" | "beard" | "mustache" | "goatee";
  outfit:
    | "varsity-hoodie"
    | "cyber-jacket"
    | "survivor-duster"
    | "trainer-vest"
    | "nexus-tee"
    | "armor"
    | "space-suit"
    | "retro-arcade"
    | "purple-tux"
    | "mech-pilot"
    | "ninja-shinobi"
    | "esports-jersey"
    | "retro-synth"
    | "cozy-hoodie"
    | "cyber-samurai"
    | "void-paladin"
    | "stealth-operative"
    | "unimon-master"
    | "retro-synthwave"
    | "royal-cape";
  accessory:
    | "none"
    | "gamer-headset"
    | "cyber-visor"
    | "snapback"
    | "bandana"
    | "earring"
    | "beanie"
    | "crown"
    | "cat-ears"
    | "aviators"
    | "heart-shades"
    | "vr-headset"
    | "halo"
    | "demon-horns";
  prop?:
    | "none"
    | "rgb-controller"
    | "energy-drink"
    | "steam-deck"
    | "golden-mic"
    | "laser-sword"
    | "coffee-mug"
    | "trophy";
  background:
    | "purple-gradient"
    | "neon-cyan"
    | "void-dark"
    | "gold-burst"
    | "fire-streak"
    | "cosmic-stars"
    | "cyber-grid"
    | "retro-sunset";
  aura?:
    | "none"
    | "cosmic-void"
    | "neon-lightning"
    | "golden-halo"
    | "flame-burst"
    | "glitch-matrix";
  pose?:
    | "portrait"
    | "fire"
    | "gg"
    | "hype"
    | "shield"
    | "verified"
    | "chill"
    | "afk"
    | "raid"
    | "love"
    | "rocket"
    | "levelup"
    | "ragequit"
    | "clutch"
    | "mindblown"
    | "skull"
    | "stream"
    | "dance"
    | "facepalm"
    | "flex"
    | "wave"
    | "cry-laugh"
    | "co-op"
    | "salute";
  statusBubble?: string;
  customCaption?: string;
  duoFriend?: {
    name: string;
    avatar: AvatarConfig;
    duoPose?: string;
  };
}

export interface AvatarPreset {
  id: string;
  name: string;
  avatar: AvatarConfig;
}

export const DEFAULT_AVATAR: AvatarConfig = {
  skinTone: "#f8cbb0",
  hairStyle: "fade",
  hairColor: "#1e1b2e",
  eyeShape: "almond",
  eyeColor: "#7c3aed",
  mouth: "smile",
  facialHair: "none",
  outfit: "varsity-hoodie",
  accessory: "gamer-headset",
  prop: "rgb-controller",
  background: "purple-gradient",
  pose: "portrait",
  statusBubble: "Chilling on Chase Nexus ✨",
};

export interface UserProfile {
  id: string;
  email?: string;
  username?: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  avatar_config?: AvatarConfig;
  cover_url?: string;
  verified?: boolean;
  badge_type?: BadgeCategory;
  created_at?: string;
}

export interface Person {
  name: string;
  handle: string;
  example: boolean;
  verified?: boolean;
  badgeType?: BadgeCategory;
  avatarConfig?: AvatarConfig;
}

export interface PollChoice {
  id: string;
  label: string;
  votes: number;
}

export interface Comment {
  id: string;
  author: string;
  body: string;
  example: boolean;
  parentId?: string;
  verified?: boolean;
  badgeType?: BadgeCategory;
  avatarConfig?: AvatarConfig;
  likes?: number;
  liked?: boolean;
  timeAgo?: string;
}

export interface QuoteRef {
  author: string;
  handle: string;
  body: string;
}

export interface Post {
  id: string;
  author: Person;
  timeLabel: string;
  body: string;
  feeds: FeedId[];
  hashtags: string[];
  audience: Audience;
  tone: 1 | 2 | 3 | 4;
  imageLabel?: string;
  imageUrl?: string;
  avatarSticker?: string;
  avatarStickerCaption?: string;
  avatarDuoFriend?: string;
  videoLabel?: string;
  videoUrl?: string;
  pinned?: boolean;
  reported?: boolean;
  poll?: PollChoice[];
  pollVote?: string;
  quote?: QuoteRef;
  reactions: Record<ReactionId, number>;
  reaction?: ReactionId;
  comments: Comment[];
  reposts: number;
  reposted: boolean;
  saved: boolean;
  discussionScore: number;
  discussionVote: -1 | 0 | 1;
  yours?: boolean;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: "avatar-gear" | "game-pass" | "chase-plus" | "collectible";
  price: number;
  currency: "gems" | "usd";
  badge?: string;
  description: string;
  image?: string;
  features: string[];
  rarity?: "common" | "rare" | "epic" | "legendary";
}

export interface StoryPreview {
  id: string;
  name: string;
  caption: string;
  tone: 1 | 2 | 3 | 4;
  yours?: boolean;
}

export interface VideoPreview {
  id: string;
  title: string;
  channel: string;
  length: string;
  tone: 1 | 2 | 3 | 4;
}

export interface CommunityPreview {
  id: string;
  name: string;
  description: string;
  channels: string[];
}

export interface TrendingTopic {
  tag: string;
  label: string;
  detail: string;
}

export interface ConnectedAccount {
  id: string;
  name: string;
  detail: string;
}

export const FEEDS: { id: FeedId; label: string }[] = [
  { id: "for-you", label: "For You" },
  { id: "following", label: "Following" },
  { id: "friends", label: "Friends" },
  { id: "trending", label: "Trending" },
  { id: "communities", label: "Communities" },
  { id: "discussions", label: "Discussions" },
  { id: "videos", label: "Videos" },
];

export const REACTIONS: { id: ReactionId; label: string; glyph: string }[] = [
  { id: "like", label: "Like", glyph: "◆" },
  { id: "celebrate", label: "Celebrate", glyph: "✦" },
  { id: "support", label: "Support", glyph: "✚" },
];

export interface AudioStage {
  id: string;
  title: string;
  host: Person;
  topic: string;
  speakers: Person[];
  listenersCount: number;
  isLive: boolean;
  tags: string[];
}

export interface ArcadeGame {
  id: string;
  title: string;
  category: "unimon" | "deadeye" | "bitmoji";
  description: string;
  rewardGems: number;
}

export interface NotificationItem {
  id: string;
  type: "streak" | "tip" | "mention" | "like" | "system" | "reward";
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  gemReward?: number;
  avatarConfig?: AvatarConfig;
  actionLabel?: string;
}
