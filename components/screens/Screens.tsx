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
} from "lucide-react";
import { PostCard } from "@/components/feed/PostCard";
import { StoriesRow } from "@/components/feed/StoriesRow";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
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
      <p className="eyebrow">Nexus Video</p>
      <h1>Video preview</h1>
      <p>Native uploads, playlists, creator channels, and approved YouTube embeds arrive in Alpha 0.5. These cards are demonstration previews.</p>
      <div className="video-grid">
        {VIDEOS.map((video) => (
          <article key={video.id} className="video-card card">
            <div className="media" data-tone={video.tone}>
              <span>{video.length}</span>
            </div>
            <h2>{video.title}</h2>
            <p>{video.channel}</p>
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
  return (
    <section className="page">
      <p className="eyebrow">Nexus Communities</p>
      <h1>Example communities</h1>
      <p>Nexus Communities combines Discord-style real-time channels with Reddit-style discussion boards. Real-time chat and roles arrive in Alpha 0.6.</p>
      <div className="stack">
        {COMMUNITIES.map((community) => (
          <article key={community.id} className="card info-card">
            <h2>{community.name}</h2>
            <p>{community.description}</p>
            <ul>
              {community.channels.map((channel) => (
                <li key={channel}>#{channel} · planned channel</li>
              ))}
            </ul>
          </article>
        ))}
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
  const { displayName, setDisplayName, posts } = useNexus();
  const [name, setName] = useState(displayName);
  const mine = posts.filter((post) => post.yours).length;

  useEffect(() => {
    setName(displayName);
  }, [displayName]);

  return (
    <section className="page">
      <p className="eyebrow">Profile</p>
      <div className="profile-hero card">
        <div className="cover" />
        <div className="profile-row">
          <span className="avatar avatar-lg">{displayName.slice(0, 1).toUpperCase()}</span>
          <div>
            <div className="author-name">
              <h1>{displayName}</h1>
              <ChaseBadge type="chase-account" />
            </div>
            <p>Local preview profile. Chase Accounts sign-in and cloud sync will arrive in Alpha 0.2.</p>
          </div>
        </div>
      </div>
      <dl className="stats">
        <div>
          <dt>Posts on this device</dt>
          <dd>{mine}</dd>
        </div>
        <div>
          <dt>Friends</dt>
          <dd>Not counted yet</dd>
        </div>
        <div>
          <dt>Followers</dt>
          <dd>Not counted yet</dd>
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
    </section>
  );
}

export function MessagesScreen() {
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
      time: "Just now · this device",
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
        <h1>Messages preview</h1>
        <p>
          Demonstration messaging interface with streak tracking preview. Messages typed here remain in local memory and are not sent over the network.
        </p>
      </header>

      <div className="messages-layout card">
        {/* Conversations Sidebar */}
        <div className="messages-sidebar">
          <div className="messages-sidebar-head">
            <h3>Direct Messages</h3>
            <span className="pill">Alpha 0.1</span>
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
              </div>
            ) : null}
          </header>

          <div className="chat-bubble-stream">
            <p className="hint center-hint">
              This is a local demonstration. Real-time delivery and encryption arrive in Alpha 0.7.
            </p>
            {activeChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-wrap ${msg.sender === "you" ? "is-mine" : "is-theirs"}`}
              >
                <div className="chat-bubble">
                  <p>{msg.text}</p>
                  <small>{msg.time}</small>
                </div>
              </div>
            ))}
          </div>

          <form className="chat-composer" onSubmit={handleSend}>
            <input
              type="text"
              value={inputMessage}
              placeholder={`Message ${activeChat.name} (local preview)`}
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
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  return (
    <section className="page">
      <p className="eyebrow">Nexus Calls</p>
      <h1>Voice & Video Calls</h1>
      <p>
        Nexus Calls is planned for Alpha 0.7, supporting native 1-on-1 and group voice/video calls and screen sharing via WebRTC. Alpha 0.1 does not request device media access.
      </p>

      <div className="card call-preview-card">
        <div className="call-avatar-grid">
          <div className="call-tile">
            <span className="avatar avatar-lg">A</span>
            <strong>Avery Quinn</strong>
            <small>Active in call · preview</small>
          </div>
          <div className="call-tile you-tile">
            <span className="avatar avatar-lg">Y</span>
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
      <p>Personalization, privacy settings, and application installation.</p>

      {/* PWA Installation Section */}
      <div className="card info-card">
        <h2>Install Chase Nexus (PWA)</h2>
        <p className="hint">
          Chase Nexus is an installable Progressive Web App for iOS, Android, Windows, and macOS.
        </p>
        {isStandalone ? (
          <p className="installed-badge">
            <Check size={16} /> Running as an installed application
          </p>
        ) : (
          <div className="install-actions">
            <p>Install Nexus on your device to launch it from your home screen or taskbar.</p>
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
