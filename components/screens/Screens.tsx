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
} from "lucide-react";
import { PostCard } from "@/components/feed/PostCard";
import { StoriesRow } from "@/components/feed/StoriesRow";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";
import { NexusAvatarBuilder } from "@/components/nexus/NexusAvatarBuilder";
import { useNexus } from "@/components/nexus/NexusProvider";
import {
  COMMUNITIES,
  CONVERSATIONS,
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
          <a
            href="https://twitch.tv/billgaming2424"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            style={{ background: "#9146ff", color: "#fff" }}
          >
            Open on Twitch
          </a>
        </div>
        <div className="twitch-embed-frame">
          <iframe
            src="https://player.twitch.tv/?channel=billgaming2424&parent=nexus.chase-studios.org&parent=chase-nexus.vercel.app&parent=localhost&muted=true"
            allowFullScreen
            title="Bill Chase Twitch Stream"
          />
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
  return (
    <section className="page">
      <p className="eyebrow">Explore</p>
      <h1>Discover the preview</h1>
      <p>Topics below filter the sample home feed. Trending topics are demonstration presets in Alpha 0.1.</p>
      <div className="link-grid">
        {TRENDING.map((topic) => (
          <Link key={topic.tag} className="card link-card" href={`/?tag=${topic.tag}`}>
            <strong>{topic.label}</strong>
            <span>{topic.detail}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CommunitiesScreen() {
  const [joined, setJoined] = useState<Record<string, boolean>>({
    "unimon-legends": true,
    "deadeye": true,
  });

  const toggleJoin = (id: string) => {
    setJoined((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="page">
      <p className="eyebrow">Nexus Communities</p>
      <h1>Official Studio Communities</h1>
      <p>Nexus Communities combines Discord-style guild channels with Reddit-style discussion boards for Chase Studios titles.</p>
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
  const saved = posts.filter((post) => post.saved);
  return (
    <section className="page">
      <p className="eyebrow">Bookmarks</p>
      <h1>Bookmarks</h1>
      <p>Posts saved from your feed are stored locally on this device.</p>
      {saved.length === 0 ? (
        <p className="empty card">Bookmark a post from your feed and it will appear here.</p>
      ) : (
        <div className="post-list">
          {saved.map((post) => (
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
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 8, gap: 6 }}
              onClick={() => setAvatarBuilderOpen(true)}
            >
              <Sparkles size={14} className="purple-icon" />
              <span>Customize Bitmoji Avatar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bitmoji Sticker Sheet */}
      <div className="card sticker-sheet-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div>
            <h2 style={{ fontSize: "1.15rem", margin: 0 }}>My Bitmoji Stickers</h2>
            <p className="hint" style={{ margin: "2px 0 0" }}>
              Snapchat-style expressions. Tap any sticker to set your active mood!
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setAvatarBuilderOpen(true)}
          >
            Studio
          </button>
        </div>

        <div className="sticker-grid">
          {[
            { pose: "portrait", label: "Default" },
            { pose: "fire", label: "🔥 On Fire" },
            { pose: "gg", label: "🎮 GG!" },
            { pose: "hype", label: "⚡ HYPE!" },
            { pose: "verified", label: "👑 Verified" },
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
              <NexusAvatar config={{ ...userAvatar, pose: item.pose as any }} size={68} showStickerBadge />
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
  const { userAvatar } = useNexus();
  const [conversations, setConversations] = useState<DemoConversation[]>(CONVERSATIONS);
  const [activeId, setActiveId] = useState<string>("avery");
  const [inputMessage, setInputMessage] = useState("");

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
  };

  return (
    <section className="page messages-page">
      <header className="page-head">
        <p className="eyebrow">Nexus Messages & Streaks</p>
        <h1>Direct Messages & Streaks</h1>
        <p>
          Private conversations with streak fire milestones and Bitmoji avatar chat.
        </p>
      </header>

      <div className="messages-layout card">
        {/* Conversations Sidebar */}
        <div className="messages-sidebar">
          <div className="messages-sidebar-head">
            <h3>Direct Messages</h3>
            <span className="pill">Cloud Chat</span>
          </div>
          <ul className="chat-thread-list">
            {conversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isSelected = conv.id === activeId;
              return (
                <li key={conv.id}>
                  <button
                    type="button"
                    className={`chat-thread-btn ${isSelected ? "is-active" : ""}`}
                    onClick={() => setActiveId(conv.id)}
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
                      <small className="chat-last-msg">{lastMsg?.text ?? "No messages"}</small>
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
          </header>

          <div className="chat-bubble-stream">
            <p className="hint center-hint">
              Direct messaging with active streaks and Bitmoji sticker support.
            </p>
            {activeChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-wrap ${msg.sender === "you" ? "is-mine" : "is-theirs"}`}
                style={{ display: "flex", alignItems: "flex-end", gap: 8 }}
              >
                {msg.sender === "them" && (
                  <span className="avatar avatar-xs">{activeChat.name.slice(0, 1)}</span>
                )}
                <div className="chat-bubble">
                  <p>{msg.text}</p>
                  <small>{msg.time}</small>
                </div>
                {msg.sender === "you" && (
                  <NexusAvatar config={userAvatar} size={26} showStickerBadge />
                )}
              </div>
            ))}
          </div>

          <form className="chat-composer" onSubmit={handleSend}>
            <input
              type="text"
              value={inputMessage}
              placeholder={`Message ${activeChat.name}...`}
              onChange={(e) => setInputMessage(e.target.value)}
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
  const { userAvatar } = useNexus();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  return (
    <section className="page">
      <p className="eyebrow">Nexus Calls</p>
      <h1>Voice & Video Calls</h1>
      <p>
        Nexus Calls supports native voice/video calls with custom Bitmoji avatar stages.
      </p>

      <div className="card call-preview-card">
        <div className="call-avatar-grid">
          <div className="call-tile">
            <span className="avatar avatar-lg">A</span>
            <strong>Avery Quinn</strong>
            <small>Active in call · preview</small>
          </div>
          <div className="call-tile you-tile">
            <NexusAvatar config={userAvatar} size={64} showStickerBadge />
            <strong>You</strong>
            <small>{muted ? "Muted" : "Speaking"}</small>
          </div>
        </div>

        <div className="call-controls-bar">
          <button
            type="button"
            className={`icon-btn ${muted ? "is-alert" : ""}`}
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => setMuted((v) => !v)}
          >
            {muted ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <button
            type="button"
            className={`icon-btn ${videoOff ? "is-alert" : ""}`}
            aria-label={videoOff ? "Turn camera on" : "Turn camera off"}
            onClick={() => setVideoOff((v) => !v)}
          >
            {videoOff ? <VideoOff size={18} /> : <VideoIcon size={18} />}
          </button>
          <button type="button" className="icon-btn" aria-label="Screen share (planned)">
            <Monitor size={18} />
          </button>
          <button type="button" className="btn btn-alert call-end-btn" aria-label="End call preview">
            <PhoneOff size={18} />
            <span>Leave</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export function NotificationsScreen() {
  const sampleNotifications = [
    {
      id: "n1",
      title: "Chase Studios published a preview update",
      time: "2h ago",
      icon: "official",
      detail: "Universal purple checkmark badges are now active across Nexus profiles and posts.",
    },
    {
      id: "n2",
      title: "Avery Quinn maintained your streak 🔥",
      time: "3h ago",
      icon: "flame",
      detail: "Your 3-day friendship streak with Avery Quinn has been extended for today.",
    },
    {
      id: "n3",
      title: "Samira Cole commented on your discussion",
      time: "5h ago",
      icon: "comment",
      detail: "“The 2D cartoon avatar creator fits the Chase Studios aesthetic.”",
    },
  ];

  return (
    <section className="page">
      <p className="eyebrow">Notifications</p>
      <h1>Notification Center</h1>
      <p>Demonstration notifications preview. Push notifications and quiet hours can be configured in Settings.</p>

      <div className="stack">
        {sampleNotifications.map((n) => (
          <article key={n.id} className="card notif-card">
            <div className="notif-icon-col">
              {n.icon === "flame" ? (
                <Flame size={20} className="flame-icon" />
              ) : n.icon === "official" ? (
                <Shield size={20} className="purple-icon" />
              ) : (
                <Bell size={20} className="silver-icon" />
              )}
            </div>
            <div className="notif-content">
              <strong>{n.title}</strong>
              <p>{n.detail}</p>
              <small>{n.time}</small>
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

        <form
          className="settings-form"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            setAccent(String(data.get("accent") ?? ""));
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
