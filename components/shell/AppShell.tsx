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
  const [isOnline, setIsOnline] = useState(true);
  const { currentUser, userProfile, userAvatar } = useNexus();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

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
            <div className="mobile-brand-wrap" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Official Chase Studios Shield Logo */}
              <img
                src="/chase-studios-logo.svg"
                alt="Chase Studios Shield"
                width={24}
                height={24}
                style={{ objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))" }}
              />
              <span className="mobile-brand">CHASE NEXUS</span>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
              <button
                type="button"
                className="mobile-avatar-trigger"
                aria-label="Open Bitmoji Studio"
                onClick={() => setAvatarStudioOpen(true)}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                <NexusAvatar config={userAvatar} size={28} showStickerBadge />
              </button>
              <button
                type="button"
                className="mobile-auth-trigger"
                aria-label="Chase Studios Account"
                onClick={() => setAuthModalOpen(true)}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                {currentUser ? (
                  <span className="badge-chase-account chase-badge" style={{ width: 22, height: 22 }}>
                    ✓
                  </span>
                ) : (
                  <ShieldCheck size={22} className="purple-icon" />
                )}
              </button>
            </div>
          </header>

          {!isOnline && (
            <div
              style={{
                background: "#7f1d1d",
                color: "#fecaca",
                padding: "6px 12px",
                textAlign: "center",
                fontSize: "0.8rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <span>⚠️ Offline cached mode. Syncs when reconnected.</span>
            </div>
          )}

          <div className="banner cloud-banner">
            <div className="banner-content">
              <span className="status-dot live" aria-hidden="true" />
              <span className="cloud-banner-desktop">
                {currentUser
                  ? `Signed in as ${userProfile?.display_name || currentUser.email} · Chase Studios Cloud active`
                  : "Chase Studios Cloud live. Sign in with your Chase Account to save posts and verify your profile."}
              </span>
              <span className="cloud-banner-mobile">
                {currentUser
                  ? `${userProfile?.display_name || "Account"} · Cloud Active`
                  : "Chase Cloud Live · Tap to Sign In"}
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
