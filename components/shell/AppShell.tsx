"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Menu, MessageCircle, UserRound, Video } from "lucide-react";
import { NexusProvider } from "@/components/nexus/NexusProvider";
import { RightRail } from "@/components/rail/RightRail";
import { Sidebar } from "@/components/shell/Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showRail = pathname === "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <NexusProvider>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className={showRail ? "shell shell-rail" : "shell"}>
        <Sidebar open={open} onNavigate={() => setOpen(false)} />
        {open ? (
          <button className="scrim" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />
        ) : null}
        <div className="workspace">
          <header className="mobile-bar">
            <button type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu size={20} />
            </button>
            <span className="mobile-brand">Chase Nexus</span>
          </header>
          <p className="banner">
            Alpha 0.1 preview. Posts, appearance, and saves stay in this browser. Nothing here is published to other people.
          </p>
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
    </NexusProvider>
  );
}
