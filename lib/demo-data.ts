import type {
  CommunityPreview,
  ConnectedAccount,
  Post,
  StoryPreview,
  TrendingTopic,
  VideoPreview,
} from "@/lib/types";

const sample = (
  name: string,
  handle: string,
  verified = false,
  badgeType: "chase-account" | "staff" | "official" = "chase-account"
) => ({
  name,
  handle,
  example: true as const,
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

export const SUGGESTED = [
  { name: "Chase Studios", handle: "@chasestudios", note: "Official studio", verified: true, badgeType: "official" as const },
  { name: "Unimon Archive", handle: "@unimonarchive", note: "Ecosystem creator", verified: true, badgeType: "chase-account" as const },
  { name: "Night Relay", handle: "@nightrelay", note: "Verified member", verified: true, badgeType: "chase-account" as const },
];

export const FRIEND_EXAMPLES = [
  { name: "Avery Quinn", streak: 3, verified: true },
  { name: "Jordan Hale", streak: 0, verified: false },
  { name: "Samira Cole", streak: 7, verified: true },
  { name: "Riley Chen", streak: 0, verified: true },
];

export interface DemoMessage {
  id: string;
  sender: "them" | "you";
  text: string;
  time: string;
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
    id: "welcome",
    author: sample("Chase Studios", "@chasestudios", true, "official"),
    timeLabel: "Sample",
    body: "Chase Nexus is opening in preview. One account will eventually cover posts, video, communities, discussions, stories, messages, and calls. This feed is a demonstration on your device.",
    feeds: ["for-you", "following", "trending"],
    hashtags: ["ChaseNexus"],
    audience: "public",
    tone: 1,
    reactions: { like: 18, celebrate: 6, support: 4 },
    comments: [
      {
        id: "c1",
        author: "Example member",
        body: "The unified navigation already feels like one product.",
        example: true,
      },
    ],
    reposts: 3,
    reposted: false,
    saved: false,
    discussionScore: 12,
    discussionVote: 0,
  },
  {
    id: "unimon-art",
    author: sample("Unimon Archive", "@unimonarchive", true, "chase-account"),
    timeLabel: "Sample",
    body: "A sample photo post for Unimon Legends. The artwork in this card is a gradient placeholder, not an uploaded file.",
    feeds: ["for-you", "communities", "trending"],
    hashtags: ["UnimonLegends"],
    audience: "public",
    tone: 2,
    imageLabel: "Example Unimon Legends artwork",
    reactions: { like: 11, celebrate: 9, support: 2 },
    comments: [],
    reposts: 2,
    reposted: false,
    saved: false,
    discussionScore: 8,
    discussionVote: 0,
  },
  {
    id: "video-note",
    author: sample("Nexus Video", "@nexusvideo", true, "official"),
    timeLabel: "Sample",
    body: "Native uploads and YouTube playback are later milestones. This card shows how a video post will sit in the feed.",
    feeds: ["for-you", "videos", "trending"],
    hashtags: ["NexusVideo"],
    audience: "public",
    tone: 3,
    videoLabel: "Nexus Video preview",
    reactions: { like: 7, celebrate: 3, support: 1 },
    comments: [],
    reposts: 1,
    reposted: false,
    saved: false,
    discussionScore: 5,
    discussionVote: 0,
  },
  {
    id: "poll",
    author: sample("Chase Nexus", "@chasenexus", true, "official"),
    timeLabel: "Sample",
    body: "Which preview should we keep refining first? Votes stay in this browser.",
    feeds: ["for-you", "trending", "discussions"],
    hashtags: ["ChaseNexus"],
    audience: "public",
    tone: 4,
    poll: [
      { id: "social", label: "Social feed", votes: 7 },
      { id: "video", label: "Nexus Video", votes: 5 },
      { id: "communities", label: "Communities", votes: 6 },
      { id: "stories", label: "Stories", votes: 4 },
    ],
    reactions: { like: 5, celebrate: 2, support: 3 },
    comments: [],
    reposts: 0,
    reposted: false,
    saved: false,
    discussionScore: 9,
    discussionVote: 0,
  },
  {
    id: "quote",
    author: sample("Night Relay", "@nightrelay", true, "chase-account"),
    timeLabel: "Sample",
    body: "Quote posts keep the original in view while the commentary stays with the author.",
    feeds: ["following", "for-you"],
    hashtags: [],
    audience: "public",
    tone: 1,
    quote: {
      author: "Chase Studios",
      handle: "@chasestudios",
      body: "Every genre. No limits. Nexus is being built as its own network.",
    },
    reactions: { like: 4, celebrate: 1, support: 2 },
    comments: [],
    reposts: 1,
    reposted: false,
    saved: false,
    discussionScore: 3,
    discussionVote: 0,
  },
  {
    id: "friends-note",
    author: sample("Avery Quinn", "@avery", true, "chase-account"),
    timeLabel: "Sample",
    body: "A friends-audience example. Audience labels are preferences only until accounts and privacy rules exist.",
    feeds: ["friends", "for-you"],
    hashtags: [],
    audience: "friends",
    tone: 2,
    reactions: { like: 2, celebrate: 1, support: 2 },
    comments: [],
    reposts: 0,
    reposted: false,
    saved: false,
    discussionScore: 1,
    discussionVote: 0,
  },
  {
    id: "discussion",
    author: sample("Jordan Hale", "@jordan"),
    timeLabel: "Sample",
    body: "Discussion boards should live beside community chat, not in a separate product. This thread is a sample for Unimon team-building, bug reports, and fan art — voting here does not affect anyone else.",
    feeds: ["discussions", "communities"],
    hashtags: ["UnimonLegends"],
    audience: "public",
    tone: 3,
    reactions: { like: 6, celebrate: 1, support: 4 },
    comments: [
      {
        id: "d1",
        author: "Example member",
        body: "Pin the rules at the top of each board.",
        example: true,
      },
      {
        id: "d2",
        author: "Example member",
        body: "Agreed. Flairs can wait until moderation tools exist.",
        example: true,
        parentId: "d1",
      },
    ],
    reposts: 0,
    reposted: false,
    saved: false,
    discussionScore: 14,
    discussionVote: 0,
  },
  {
    id: "deadeye",
    author: sample("DEADEYE Desk", "@deadeye"),
    timeLabel: "Sample",
    body: "Survival logs, base layouts, and patch notes will have a home in the DEADEYE community. Treat this post as layout practice.",
    feeds: ["communities", "following", "trending"],
    hashtags: ["DEADEYE"],
    audience: "followers",
    tone: 4,
    reactions: { like: 8, celebrate: 2, support: 5 },
    comments: [],
    reposts: 2,
    reposted: false,
    saved: false,
    discussionScore: 6,
    discussionVote: 0,
  },
];
