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
  UserRound,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS, type NavItem } from "@/lib/navigation";
import { useNexus } from "@/components/nexus/NexusProvider";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";

const ICONS: Record<NavItem["icon"], LucideIcon> = {
  home: Home,
  video: Video,
  explore: Compass,
  communities: Users,
  discussions: MessagesSquare,
  messages: MessageCircle,
  calls: Phone,
  stories: Aperture,
  notifications: Bell,
  saved: Bookmark,
  profile: UserRound,
  settings: Settings,
};

export function Sidebar({
  open,
  onNavigate,
  onOpenAuth,
}: {
  open: boolean;
  onNavigate: () => void;
  onOpenAuth: () => void;
}) {
  const pathname = usePathname();
  const { currentUser, userProfile } = useNexus();

  return (
    <aside className={open ? "sidebar is-open" : "sidebar"} aria-label="Primary">
      <Link href="/" className="logo" onClick={onNavigate}>
        <span className="logo-mark" aria-hidden="true">
          N
        </span>
        <span className="logo-copy">
          <span className="logo-title">Chase Nexus</span>
          <span className="logo-tag">Connect. Create. Discover.</span>
        </span>
      </Link>

      <nav className="nav">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon];
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "nav-link is-active" : "nav-link"}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-auth-section">
        {currentUser ? (
          <button
            type="button"
            className="sidebar-user-card"
            onClick={onOpenAuth}
            title="Manage Chase Studios Account"
          >
            <span className="avatar avatar-sm">
              {(userProfile?.display_name || currentUser.email || "C").slice(0, 1).toUpperCase()}
            </span>
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
      </div>

      <p className="side-foot">
        Chase Studios
        <span>Every genre. No limits.</span>
        <span>Alpha 0.1</span>
      </p>
    </aside>
  );
}
