"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Aperture,
  Bell,
  Bookmark,
  Compass,
  Home,
  LogIn,
  MessageCircle,
  MessagesSquare,
  Phone,
  Settings,
  ShoppingBag,
  Sparkles,
  UserRound,
  Users,
  Video,
  Gamepad2,
  Radio,
  TrendingUp,
  Grid,
  type LucideIcon,
} from "lucide-react";
import { type NavItem } from "@/lib/navigation";
import { useNexus } from "@/components/nexus/NexusProvider";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";

const ICONS: Record<NavItem["icon"], LucideIcon> = {
  home: Home,
  video: Video,
  explore: Compass,
  arcade: Gamepad2,
  audio: Radio,
  studio: TrendingUp,
  communities: Users,
  discussions: MessagesSquare,
  marketplace: ShoppingBag,
  messages: MessageCircle,
  calls: Phone,
  stories: Aperture,
  notifications: Bell,
  saved: Bookmark,
  profile: UserRound,
  settings: Settings,
};

const CORE_NAV: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/explore", label: "Explore", icon: "explore" },
  { href: "/stories", label: "Stories", icon: "stories" },
  { href: "/messages", label: "Messages", icon: "messages" },
  { href: "/calls", label: "Calls", icon: "calls" },
  { href: "/communities", label: "Communities", icon: "communities" },
  { href: "/video", label: "Nexus Video", icon: "video" },
  { href: "/notifications", label: "Notifications", icon: "notifications" },
];

const HUBS_NAV: NavItem[] = [
  { href: "/arcade", label: "Arcade Realm", icon: "arcade" },
  { href: "/studio", label: "Creator Studio", icon: "studio" },
  { href: "/audio", label: "Audio Pods", icon: "audio" },
  { href: "/marketplace", label: "Marketplace", icon: "marketplace" },
];

const LIBRARY_NAV: NavItem[] = [
  { href: "/profile", label: "Profile", icon: "profile" },
  { href: "/saved", label: "Bookmarks", icon: "saved" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export function Sidebar({
  open,
  onNavigate,
  onOpenAuth,
  onOpenAvatarStudio,
  onOpenChaseOs,
}: {
  open: boolean;
  onNavigate: () => void;
  onOpenAuth: () => void;
  onOpenAvatarStudio: () => void;
  onOpenChaseOs?: () => void;
}) {
  const pathname = usePathname();
  const { currentUser, userProfile, userAvatar } = useNexus();

  const renderNavGroup = (items: NavItem[]) => (
    items.map((item) => {
      const Icon = ICONS[item.icon];
      const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          aria-label={item.label}
          title={item.label}
          className={active ? "nav-link is-active" : "nav-link"}
          aria-current={active ? "page" : undefined}
          onClick={onNavigate}
        >
          <Icon size={19} aria-hidden="true" />
          <span className="nav-label">{item.label}</span>
        </Link>
      );
    })
  );

  return (
    <aside className={open ? "sidebar is-open" : "sidebar"} aria-label="Primary">
      <Link href="/" className="logo" onClick={onNavigate}>
        <span className="logo-mark" aria-hidden="true">
          <img src="/chase-studios-logo.svg" alt="" width={30} height={30} />
        </span>
        <span className="logo-copy">
          <span className="logo-title">Chase Nexus</span>
          <span className="logo-tag">Connect. Create. Discover.</span>
        </span>
      </Link>

      <nav className="nav">
        {/* Core Navigation */}
        <div className="nav-section">
          {renderNavGroup(CORE_NAV)}
        </div>

        {/* Ecosystem & Hubs */}
        <details className="nav-section"><summary>More</summary>{renderNavGroup(HUBS_NAV)}</details>

        {/* Library & Settings */}
        <div className="nav-section" style={{ marginTop: 14 }}>
          <span className="nav-section-title">LIBRARY</span>
          {renderNavGroup(LIBRARY_NAV)}
        </div>
      </nav>

      <div className="sidebar-auth-section">
        {currentUser ? (
          <button
            type="button"
            className="sidebar-user-card"
            onClick={onOpenAuth}
            title="Manage Chase Studios Account"
          >
            <NexusAvatar config={userAvatar} size={36} showStickerBadge />
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">
                {userProfile?.display_name || currentUser.email?.split("@")[0] || "Chase Member"}
                <ChaseBadge type="chase-account" />
              </span>
              <span className="sidebar-user-status">Chase Verified</span>
            </div>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline sidebar-signin-btn"
            onClick={onOpenAuth}
          >
            <LogIn size={16} />
            <span>Chase Account</span>
          </button>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ fontSize: "0.78rem", gap: 5, minHeight: 32, padding: "0 8px" }}
            onClick={onOpenAvatarStudio}
          >
            <Sparkles size={13} className="purple-icon" />
            <span>Persona</span>
          </button>

          {onOpenChaseOs && (
            <button
              type="button"
              className="btn btn-ghost"
              style={{ fontSize: "0.78rem", gap: 5, minHeight: 32, padding: "0 8px", color: "var(--silver)" }}
              onClick={onOpenChaseOs}
              title="Switch between Chase Studios Ecosystem Apps"
            >
              <Grid size={13} className="purple-icon" />
              <span>Apps</span>
            </button>
          )}
        </div>
      </div>

      <a className="nexus-studio-link" href="https://chase-studios.org"><img src="/chase-studios-logo.svg" alt="" width={32} height={32}/><span><strong>Chase Studios</strong><small>Games · Apps · Community</small></span></a><section className="nexus-plus-promo"><h3>♛ Chase+</h3><p>Exclusive perks and rewards.</p><a href="https://chase-studios.org">Learn about Chase Studios</a></section><p className="side-foot">
        Chase Studios · <span>2.0 Preview</span>
      </p>
    </aside>
  );
}
