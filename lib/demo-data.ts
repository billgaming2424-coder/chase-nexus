import type {
  CommunityPreview,
  ConnectedAccount,
  FriendConnection,
  Post,
  StoryPreview,
  TrendingTopic,
  VideoPreview,
} from "@/lib/types";
import { DEFAULT_AVATAR } from "@/lib/types";

const sample = (
  name: string,
  handle: string,
  verified = false,
  badgeType: "chase-account" | "staff" | "official" = "chase-account"
) => ({
  name,
  handle,
  example: false as const,
  verified,
  badgeType: verified ? badgeType : undefined,
});

export const STORIES: StoryPreview[] = [
  {
    id: "you",
    name: "Your story",
    caption: "Story publishing arrives in a later alpha. You can preview a photo on this device, and it is not uploaded.",
    tone: 1,
    yours: true,
  },
  {
    id: "studios",
    name: "Chase Studios",
    caption: "Sample story card for Chase Studios. This preview does not expire and is not visible to anyone else.",
    tone: 2,
  },
  {
    id: "unimon",
    name: "Unimon",
    caption: "Sample Unimon Legends story. No camera effects or licensed filters are included.",
    tone: 3,
  },
  {
    id: "deadeye",
    name: "DEADEYE",
    caption: "Sample DEADEYE: Survival story card for the communities preview.",
    tone: 4,
  },
  {
    id: "catclash",
    name: "Cat Clash",
    caption: "Sample Cat Clash story card. Stories are not being distributed.",
    tone: 1,
  },
];

export const VIDEOS: VideoPreview[] = [
  {
    id: "welcome",
    title: "Welcome to Nexus Video",
    channel: "Chase Studios · example",
    length: "Preview",
    tone: 1,
  },
  {
    id: "unimon-trailer",
    title: "Unimon Legends — world preview",
    channel: "Example creator",
    length: "Preview",
    tone: 2,
  },
  {
    id: "deadeye-notes",
    title: "DEADEYE: Survival — dev notes",
    channel: "Example creator",
    length: "Preview",
    tone: 3,
  },
  {
    id: "cat-clash",
    title: "Cat Clash — arena sketch",
    channel: "Example creator",
    length: "Preview",
    tone: 4,
  },
];

export const COMMUNITIES: CommunityPreview[] = [
  {
    id: "studios",
    name: "Chase Studios Community",
    description: "Example home for studio news, playtests, and project discussion.",
    channels: ["announcements", "general", "introductions"],
  },
  {
    id: "unimon",
    name: "Unimon Legends",
    description: "Example game community with chat and long-form boards planned together.",
    channels: ["general", "team-building", "fan-art", "announcements"],
  },
  {
    id: "deadeye",
    name: "DEADEYE: Survival",
    description: "Example survival-game community. Voice and roles are not active yet.",
    channels: ["general", "bug-reports", "suggestions"],
  },
  {
    id: "cat-clash",
    name: "Cat Clash",
    description: "Example community for matches, clips, and feedback.",
    channels: ["general", "clips", "feedback"],
  },
];

export const TRENDING: TrendingTopic[] = [
  { tag: "ChaseNexus", label: "#ChaseNexus", detail: "Sample topic in this preview" },
  { tag: "UnimonLegends", label: "#UnimonLegends", detail: "Example game discussion" },
  { tag: "DEADEYE", label: "#DEADEYE", detail: "Example survival thread" },
  { tag: "CatClash", label: "#CatClash", detail: "Example arena conversation" },
  { tag: "NexusVideo", label: "#NexusVideo", detail: "Sample creator preview" },
];

export const CONNECTIONS: ConnectedAccount[] = [
  { id: "youtube", name: "YouTube", detail: "Not connected" },
  { id: "discord", name: "Discord", detail: "Not connected" },
  { id: "facebook", name: "Facebook", detail: "Not connected" },
  { id: "x", name: "X", detail: "Not connected" },
];

export const DEFAULT_SUGGESTED_CREATORS: FriendConnection[] = [
  {
    id: "bill-chase",
    name: "Bill Chase",
    handle: "@billchase",
    verified: true,
    streak: 0,
    badgeType: "staff",
    online: true,
    bio: "Founder & Game Director · Chase Studios. Building DEADEYE & Unimon Legends in Unreal Engine 5.",
    avatar: {
      ...DEFAULT_AVATAR,
      skinTone: "#f8cbb0",
      hairStyle: "slick-back",
      hairColor: "#1e1b2e",
      outfit: "cyber-samurai",
      aura: "neon-lightning",
    },
  },
  {
    id: "chase-studios",
    name: "Chase Studios",
    handle: "@chasestudios",
    verified: true,
    streak: 0,
    badgeType: "official",
    online: true,
    bio: "Official Chase Studios network & games publishing hub. Connect. Create. Discover.",
    avatar: {
      ...DEFAULT_AVATAR,
      skinTone: "#f8cbb0",
      hairStyle: "fade",
      hairColor: "#7c3aed",
      outfit: "royal-cape",
      aura: "cosmic-void",
    },
  },
  {
    id: "avery-quinn",
    name: "Avery Quinn",
    handle: "@avery",
    verified: true,
    streak: 0,
    badgeType: "chase-account",
    online: true,
    bio: "Community Co-Host & Competitive Gamer. Streetwear & Cyberpunk aesthetic enthusiast.",
    avatar: {
      ...DEFAULT_AVATAR,
      skinTone: "#f3c5a8",
      hairStyle: "braids",
      hairColor: "#b91c1c",
      outfit: "cyber-jacket",
      accessory: "gamer-headset",
    },
  },
  {
    id: "samira-cole",
    name: "Samira Cole",
    handle: "@samira",
    verified: true,
    streak: 0,
    badgeType: "chase-account",
    online: false,
    bio: "Lead Battle Designer for Unimon Legends. Voidscale master & raid tactician.",
    avatar: {
      ...DEFAULT_AVATAR,
      skinTone: "#e5b897",
      hairStyle: "curls",
      hairColor: "#22d3ee",
      outfit: "void-paladin",
      accessory: "vr-headset",
    },
  },
];

export const SUGGESTED = DEFAULT_SUGGESTED_CREATORS.map((c) => ({
  name: c.name,
  handle: c.handle,
  note: c.bio || "Ecosystem creator",
  verified: c.verified,
  badgeType: c.badgeType,
}));

// Friends list starts completely empty until users actively add them!
export const FRIEND_EXAMPLES: FriendConnection[] = [];

export interface DemoMessage {
  id: string;
  sender: "them" | "you";
  text: string;
  time: string;
  stickerPose?: string;
}

export interface DemoConversation {
  id: string;
  name: string;
  handle: string;
  verified?: boolean;
  badgeType?: "chase-account" | "staff" | "official";
  streak?: {
    count: number;
    hoursLeft: number;
    milestone?: string;
  };
  messages: DemoMessage[];
}

export const CONVERSATIONS: DemoConversation[] = [
  {
    id: "avery",
    name: "Avery Quinn",
    handle: "@avery",
    verified: true,
    badgeType: "chase-account",
    streak: {
      count: 3,
      hoursLeft: 14,
      milestone: "Active Streak",
    },
    messages: [
      { id: "m1", sender: "them", text: "Hey! Did you check out the new Unimon Legends playtest announcement?", time: "2:41 PM" },
      { id: "m2", sender: "you", text: "Yes! The team-building thread in Communities is already active.", time: "2:43 PM" },
      { id: "m3", sender: "them", text: "Awesome! Our 3-day streak is maintained for today. 🔥", time: "2:45 PM" },
    ],
  },
  {
    id: "samira",
    name: "Samira Cole",
    handle: "@samira",
    verified: true,
    badgeType: "chase-account",
    streak: {
      count: 7,
      hoursLeft: 8,
      milestone: "7-Day Milestone Hit! 🎉",
    },
    messages: [
      { id: "s1", sender: "them", text: "Sent over the 2D Nexus Avatar sketch concepts when you have a moment.", time: "11:20 AM" },
      { id: "s2", sender: "you", text: "They look great! Exactly the original aesthetic we envisioned.", time: "11:35 AM" },
    ],
  },
  {
    id: "studios",
    name: "Chase Studios Dev Chat",
    handle: "@chasestudios",
    verified: true,
    badgeType: "official",
    messages: [
      { id: "d1", sender: "them", text: "Welcome to Chase Nexus Alpha 0.1! Connect, create, and discover across all communities.", time: "Yesterday" },
      { id: "d2", sender: "them", text: "Universal Chase Account purple checkmarks are now live across all member posts.", time: "10:15 AM" },
    ],
  },
  {
    id: "jordan",
    name: "Jordan Hale",
    handle: "@jordan",
    verified: false,
    messages: [
      { id: "j1", sender: "them", text: "The chronological feed tabs make finding discussions so much faster.", time: "3 days ago" },
    ],
  },
];

export const POSTS: Post[] = [
  {
    id: "post-chase-welcome",
    author: sample("Chase Studios", "@chasestudios", true, "official"),
    timeLabel: "2h ago",
    body: "🌌 Welcome to Chase Nexus — the official creative & social universe of Chase Studios. Connect with creators, customize your Bitmoji with animated Season 1 auras, test your reflexes in the Arcade Realm, and drop into live Voice Stages. Every genre. No limits.",
    feeds: ["for-you", "trending"],
    hashtags: ["ChaseNexus", "ChaseStudios", "EveryGenreNoLimits"],
    audience: "public",
    tone: 1,
    reactions: { like: 142, celebrate: 89, support: 34 },
    comments: [
      {
        id: "c1",
        author: "Bill Chase",
        body: "Proud of the entire studio team. The arcade mini-games and procedural audio engine are just the beginning.",
        example: false,
      },
    ],
    reposts: 28,
    reposted: false,
    saved: false,
    discussionScore: 45,
    discussionVote: 0,
  },
  {
    id: "post-bill-deadeye",
    author: sample("Bill Chase", "@billchase", true, "staff"),
    timeLabel: "4h ago",
    body: "🎯 DEADEYE Survival Alpha dev update: We just compiled dynamic volumetric weather and weapon recoil modding in Unreal Engine 5. Check out the 15-second Quick-Draw challenge in the Nexus Arcade to test your target reaction speed!",
    feeds: ["for-you", "trending", "communities"],
    hashtags: ["DEADEYE", "UnrealEngine", "GameDev"],
    audience: "public",
    tone: 2,
    reactions: { like: 98, celebrate: 54, support: 19 },
    comments: [],
    reposts: 15,
    reposted: false,
    saved: false,
    discussionScore: 32,
    discussionVote: 0,
  },
  {
    id: "post-unimon-raid",
    author: sample("Unimon Legends", "@unimonlegends", true, "official"),
    timeLabel: "6h ago",
    body: "🦊⚡ The Mythic Voidscale Boss Raid has arrived in Aetheria! Assemble your 4-trainer strike party and prepare for cosmic-element attacks. Earn exclusive in-game badges and +150 Gem victory drops.",
    feeds: ["for-you", "communities", "trending"],
    hashtags: ["UnimonLegends", "BossRaid", "Gaming"],
    audience: "public",
    tone: 3,
    reactions: { like: 112, celebrate: 67, support: 22 },
    comments: [],
    reposts: 19,
    reposted: false,
    saved: false,
    discussionScore: 28,
    discussionVote: 0,
  },
  {
    id: "post-samira-poll",
    author: sample("Samira Cole", "@samira", true, "chase-account"),
    timeLabel: "8h ago",
    body: "⚔️ Which starter element are you mastering for Season 1 competitive ladders in Unimon Legends? The combat balancing patch adjusted crit multipliers this morning.",
    feeds: ["for-you", "discussions", "trending"],
    hashtags: ["UnimonLegends", "TierList", "Gaming"],
    audience: "public",
    tone: 4,
    poll: [
      { id: "ignifox", label: "Ignifox (Fire / Flare Claw)", votes: 64 },
      { id: "voltkin", label: "Voltkin (Electric / Thunderbolt)", votes: 82 },
      { id: "voidscale", label: "Voidscale (Cosmic / Astral Nova)", votes: 97 },
    ],
    reactions: { like: 76, celebrate: 33, support: 15 },
    comments: [],
    reposts: 8,
    reposted: false,
    saved: false,
    discussionScore: 41,
    discussionVote: 0,
  },
  {
    id: "post-avery-stage",
    author: sample("Avery Quinn", "@avery", true, "chase-account"),
    timeLabel: "10h ago",
    body: "🎙️ Live Audio Stage tonight at 8 PM EST! Dropping in with Bill Chase and the engineering team to discuss procedural Web Audio synthesis, UE5 animation rigs, and community mods. Raise your hand in the /audio room to join the stage speakers!",
    feeds: ["for-you", "trending"],
    hashtags: ["AudioPods", "DevTalk", "ChaseNexus"],
    audience: "public",
    tone: 1,
    reactions: { like: 58, celebrate: 27, support: 12 },
    comments: [],
    reposts: 6,
    reposted: false,
    saved: false,
    discussionScore: 19,
    discussionVote: 0,
  },
  {
    id: "post-nexus-video",
    author: sample("Nexus Video", "@nexusvideo", true, "official"),
    timeLabel: "12h ago",
    body: "🎬 Watch the official Chase Studios Cinematic Reel: Behind the scenes of Unreal Engine 5 level design, character shading pipelines, and spatial audio mastering.",
    feeds: ["for-you", "videos", "trending"],
    hashtags: ["NexusVideo", "GameDev", "CGI"],
    audience: "public",
    tone: 3,
    videoLabel: "Chase Studios Official Cinematic Reel · 4K 60FPS",
    reactions: { like: 124, celebrate: 81, support: 40 },
    comments: [],
    reposts: 31,
    reposted: false,
    saved: false,
    discussionScore: 52,
    discussionVote: 0,
  },
];
