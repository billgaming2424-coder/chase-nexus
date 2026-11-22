export interface NavItem {
  href: string;
  label: string;
  icon:
    | "home"
    | "video"
    | "explore"
    | "communities"
    | "discussions"
    | "messages"
    | "calls"
    | "marketplace"
    | "stories"
    | "notifications"
    | "saved"
    | "profile"
    | "settings";
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/explore", label: "Explore", icon: "explore" },
  { href: "/video", label: "Nexus Video", icon: "video" },
  { href: "/communities", label: "Communities", icon: "communities" },
  { href: "/discussions", label: "Discussions", icon: "discussions" },
  { href: "/marketplace", label: "Marketplace", icon: "marketplace" },
  { href: "/stories", label: "Stories", icon: "stories" },
  { href: "/messages", label: "Messages", icon: "messages" },
  { href: "/calls", label: "Calls", icon: "calls" },
  { href: "/notifications", label: "Notifications", icon: "notifications" },
  { href: "/saved", label: "Bookmarks", icon: "saved" },
  { href: "/profile", label: "Profile", icon: "profile" },
  { href: "/settings", label: "Settings", icon: "settings" },
];
