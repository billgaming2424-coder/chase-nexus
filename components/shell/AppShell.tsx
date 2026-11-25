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
  Users,
  Grid,
  X,
} from "lucide-react";
import { NexusProvider, useNexus } from "@/components/nexus/NexusProvider";

import { Sidebar } from "@/components/shell/Sidebar";
import { AuthModal } from "@/components/auth/AuthModal";
import { AccountSetupWizard } from "@/components/auth/AccountSetupWizard";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";
import { NexusAvatarBuilder } from "@/components/nexus/NexusAvatarBuilder";
import { ChaseOsLauncher } from "@/components/shell/ChaseOsLauncher";

function AppShellContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showRail = pathname === "/";
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [avatarStudioOpen, setAvatarStudioOpen] = useState(false);
  const [chaseOsOpen, setChaseOsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { currentUser, isAuthLoading, userAvatar, onboardingModalOpen, setOnboardingModalOpen } = useNexus();

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
      <header className="nexus-desktop-header"><Link href="/" className="nexus-brand"><img src="/chase-studios-logo.svg" alt="" width={36} height={36}/><span>CHASE <strong>NEXUS</strong></span></Link><Link href="/explore" className="nexus-global-search"><Compass size={18}/> Discover Nexus</Link><div className="nexus-header-actions"><Link href="/messages" aria-label="Messages"><MessageCircle size={22}/></Link><button onClick={()=>setAuthModalOpen(true)} aria-label="Chase Account"><NexusAvatar config={userAvatar} size={32}/></button></div></header><div className={showRail ? "shell shell-rail nexus-social-shell" : "shell"}>
        <Sidebar
          open={open}
          onNavigate={() => setOpen(false)}
          onOpenAuth={() => setAuthModalOpen(true)}
          onOpenAvatarStudio={() => setAvatarStudioOpen(true)}
          onOpenChaseOs={() => setChaseOsOpen(true)}
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
                className="mobile-os-trigger"
                aria-label="Open Chase OS Apps"
                onClick={() => setChaseOsOpen(true)}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                <Grid size={20} className="silver-icon" />
              </button>
              <button
                type="button"
                className="mobile-avatar-trigger"
                aria-label="Open Persona Studio"
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
              <span>⚠️ You are offline. Some features may be unavailable.</span>
            </div>
          )}

          {!isAuthLoading && !currentUser && !bannerDismissed ? (
            <div className="banner cloud-banner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div className="banner-content" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="status-dot live" aria-hidden="true" />
                <span className="cloud-banner-desktop" style={{ fontSize: "0.84rem" }}>
                  Sign in with your Chase Account to save posts, follow friends, and customize your Persona.
                </span>
                <span className="cloud-banner-mobile" style={{ fontSize: "0.78rem" }}>
                  Sign in to save posts & customize Persona.
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  type="button"
                  className="banner-action-btn"
                  onClick={() => setAuthModalOpen(true)}
                  style={{ fontSize: "0.78rem", padding: "4px 10px", borderRadius: 8 }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  aria-label="Dismiss banner"
                  onClick={() => setBannerDismissed(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--muted)",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ) : null}

          <main id="main">{children}</main>
        </div>
        {showRail && <aside className="nexus-social-rail"><section className="nexus-rail-hero"><img src="/chase-studios-logo.svg" alt="" width={48} height={48}/><h2>Find your people.</h2><p>Connect. Create. Discover.</p><span>Chase Nexus • 2.0 Preview</span></section><section className="card nexus-rail-panel"><h2><Users size={18}/> Your circle</h2><p>{currentUser ? "Live friend presence is coming in the communications update." : "Sign in to start building your circle."}</p>{!currentUser && <button className="btn btn-primary" onClick={()=>setAuthModalOpen(true)}>Sign in</button>}<Link href="/explore">Discover Nexus</Link></section><section className="card nexus-rail-panel"><h2>Explore Nexus</h2><Link href="/communities"><Users size={18}/> Communities</Link><Link href="/stories"><Compass size={18}/> Stories</Link><Link href="/video"><Grid size={18}/> Nexus Video</Link><a href="https://chase-studios.org">Chase Studios</a></section></aside>}
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
          href="/communities"
          className={pathname.startsWith("/communities") ? "mobile-nav-item is-active" : "mobile-nav-item"}
          aria-current={pathname.startsWith("/communities") ? "page" : undefined}
        >
          <Users size={20} aria-hidden="true" />
          <span>Groups</span>
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

      {/* Universal Chase Studios Account Setup Wizard */}
      <AccountSetupWizard
        isOpen={onboardingModalOpen}
        onClose={() => setOnboardingModalOpen(false)}
      />

      {/* Nexus Persona Studio Modal */}
      <NexusAvatarBuilder isOpen={avatarStudioOpen} onClose={() => setAvatarStudioOpen(false)} />

      {/* Chase Studios Universal Ecosystem App Switcher */}
      <ChaseOsLauncher isOpen={chaseOsOpen} onClose={() => setChaseOsOpen(false)} />
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
