# Chase Nexus

**Connect. Create. Discover.**  
*A Chase Studios Platform · Every genre. No limits.*

**Official Website:** https://chase-studios.org  
**Repository:** https://github.com/billgaming2424-coder/chase-nexus  
**Hosting Platform:** Vercel  
**Primary Branch:** `main`  
**Current Release:** Alpha 0.1

---

## Overview

Chase Nexus is an independent social media platform developed by Chase Studios. It unites core features inspired by the web's leading communication networks into one cohesive, accessible platform:

- **Nexus Social:** Chronological & curated feeds, posts, reactions, comments, quotes, and bookmarks.
- **Nexus Video:** Native creator video previews and planned YouTube embeds.
- **Nexus Communities:** Real-time channels and discussion boards.
- **Nexus Discussions:** Nested comments and community-driven voting.
- **Nexus Stories & Streaks:** 24-hour visual stories and reciprocal friendship streak tracking.
- **Nexus Messages & Calls:** Private messaging, group conversations, and WebRTC voice/video previews.
- **Chase Account Verified:** Universal purple checkmarks for registered Chase Studios accounts.
- **Chase+ Preview:** Architecture for the upcoming optional gaming & cosmetics membership.
- **Progressive Web App (PWA):** Installable on iOS, Android, Windows, and macOS with service worker caching.

---

## Alpha 0.1 Implementation

- **Framework:** Next.js (App Router), React, TypeScript.
- **Design System:** Obsidian black, dark purple, vibrant purple, silver, and white.
- **State & Personalization:** Local browser persistence (`localStorage`) for prototype posts, display names, custom accents, and themes (`chase-purple`, `midnight`, `light`).
- **Responsive Layout:**
  - Desktop: Left navigation, central feed, and right discovery rail.
  - Mobile: Pinned bottom navigation, collapsible drawer, and touch-optimized controls.
- **PWA:** Web App Manifest (`/manifest.webmanifest`), offline service worker (`/sw.js`), and install prompt guidance.

---

## Development Scripts

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run production build
npm run build

# Start production server
npm run start
```

---

## Roadmap

- **Alpha 0.1 (Current):** Working Homepage, PWA foundation, Universal Checkmark, Responsive UI, Feed prototype.
- **Alpha 0.2:** Authentication & Chase Accounts shared identity integration.
- **Alpha 0.3:** Social Networking (persistent database posts, friends, follows, notifications).
- **Alpha 0.4:** Discussions (threaded community boards, post flairs, moderator tools).
- **Alpha 0.5:** Video (native uploads, creator channels, playlists, YouTube OAuth integration).
- **Alpha 0.6:** Communities (roles, permissions, text/voice channels).
- **Alpha 0.7:** Messaging & Calls (WebRTC signaling, end-to-end messaging).
- **Alpha 0.8:** Stories & Streaks (24-hour expiration, reciprocal streak engine).
- **Alpha 0.9:** 2D Nexus Avatar creator.
- **Alpha 0.10:** External account linking (YouTube, Discord, Facebook, X).
- **Beta:** Creator Studio, Events, Achievements, and production readiness.

---

© Chase Studios. EVERY GENRE. NO LIMITS.
