"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Home,
  Menu,
  MessageCircle,
  ShieldCheck,
  UserRound,
  Video,
} from "lucide-react";
import { NexusProvider, useNexus } from "@/components/nexus/NexusProvider";
import { RightRail } from "@/components/rail/RightRail";
import { Sidebar } from "@/components/shell/Sidebar";
import { AuthModal } from "@/components/auth/AuthModal";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";
import { NexusAvatarBuilder } from "@/components/nexus/NexusAvatarBuilder";

function AppShellContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showRail = pathname === "/";
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [avatarStudioOpen, setAvatarStudioOpen] = useState(false);
  const { currentUser, userProfile, userAvatar } = useNexus();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className={showRail ? "shell shell-rail" : "shell"}>
        <Sidebar
          open={open}
          onNavigate={() => setOpen(false)}
          onOpenAuth={() => setAuthModalOpen(true)}
          onOpenAvatarStudio={() => setAvatarStudioOpen(true)}
        />
        {open ? (
          <button
            className="scrim"
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
        ) : null}
        <div className="workspace">
          <header className="mobile-bar">
            <button type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu size={20} />
            </button>
            <span className="mobile-brand">Chase Nexus</span>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                className="mobile-avatar-trigger"
                aria-label="Open Bitmoji Studio"
                onClick={() => setAvatarStudioOpen(true)}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                <NexusAvatar config={userAvatar} size={28} showStickerBadge />
              </button>
              <button
                type="button"
                className="mobile-auth-trigger"
                aria-label="Chase Studios Account"
                onClick={() => setAuthModalOpen(true)}
              >
                {currentUser ? (
                  <span className="badge-chase-account chase-badge" style={{ width: 18, height: 18 }}>
                    ✓
                  </span>
                ) : (
                  <ShieldCheck size={20} className="purple-icon" />
                )}
              </button>
            </div>
          </header>

          <div className="banner cloud-banner">
            <div className="banner-content">
              <span className="status-dot live" aria-hidden="true" />
              <span>
                {currentUser
                  ? `Signed in as ${userProfile?.display_name || currentUser.email} · Chase Studios Cloud active`
                  : "Chase Studios Cloud live. Sign in with your Chase Account to save posts and verify your profile."}
              </span>
            </div>
            {!currentUser ? (
              <button
                type="button"
                className="banner-action-btn"
                onClick={() => setAuthModalOpen(true)}
              >
                Sign In
              </button>
            ) : null}
          </div>

          <main id="main">{children}</main>
        </div>
        {showRail ? <RightRail /> : null}
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <Link
          href="/"
          className={pathname === "/" ? "mobile-nav-item is-active" : "mobile-nav-item"}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <Home size={20} aria-hidden="true" />
          <span>Home</span>
        </Link>
        <Link
          href="/explore"
          className={pathname.startsWith("/explore") ? "mobile-nav-item is-active" : "mobile-nav-item"}
          aria-current={pathname.startsWith("/explore") ? "page" : undefined}
        >
          <Compass size={20} aria-hidden="true" />
          <span>Explore</span>
        </Link>
        <Link
          href="/video"
          className={pathname.startsWith("/video") ? "mobile-nav-item is-active" : "mobile-nav-item"}
          aria-current={pathname.startsWith("/video") ? "page" : undefined}
        >
          <Video size={20} aria-hidden="true" />
          <span>Video</span>
        </Link>
        <Link
          href="/messages"
          className={pathname.startsWith("/messages") ? "mobile-nav-item is-active" : "mobile-nav-item"}
          aria-current={pathname.startsWith("/messages") ? "page" : undefined}
        >
          <MessageCircle size={20} aria-hidden="true" />
          <span>Messages</span>
        </Link>
        <Link
          href="/profile"
          className={pathname.startsWith("/profile") ? "mobile-nav-item is-active" : "mobile-nav-item"}
          aria-current={pathname.startsWith("/profile") ? "page" : undefined}
        >
          <UserRound size={20} aria-hidden="true" />
          <span>Profile</span>
        </Link>
      </nav>

      {/* Universal Chase Studios Account Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Nexus Bitmoji Avatar Studio Modal */}
      <NexusAvatarBuilder isOpen={avatarStudioOpen} onClose={() => setAvatarStudioOpen(false)} />
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <NexusProvider>
      <AppShellContent>{children}</AppShellContent>
    </NexusProvider>
  );
}
