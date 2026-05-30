# Mohalla — PRD

## Original problem statement
Mobile-first React PWA for urban India (Bengaluru) — a hyperlocal AI-powered "living intelligence layer" of a neighbourhood. Two user modes (Resident / Gig Worker) and three transaction types (money, barter, Mohalla coins). 14 screens, editorial design system (Fraunces + Sora), cream/ink/rust/moss palette.

## Architecture
- Pure frontend, no backend. Storage = `localStorage` (key `mohalla_state_v1`).
- React 19 (CRA + craco), Tailwind, Tabler Icons, Fraunces + Sora via Google Fonts.
- All AI responses are mocked client-side via `getMockAIResponse(context)` in `/app/frontend/src/lib/ai.js`.
- Phone OTP is mocked — any 6-digit code is accepted.

## User personas
1. **Resident (default name Aanya, Flat A-302)** — wants to discover the ghost economy of their street, avoid scams, trade favours.
2. **Gig worker (default name Ramesh, Flat D-12)** — wants visibility for their skills, demand forecasts, and a trust score built from organic mentions.

## Core requirements (static)
- 14 routes (see App.js)
- Editorial design: Fraunces italic display, Sora body, no gradients on cream, 12/10/99 radius
- Coin badge visible everywhere
- Scam alert strip persists on home + map when an alert is active
- Trust score is always a 0–100 number, never stars
- Barter match badge is "Very high / High / Medium"
- Gig mode header is moss-green, resident is ink-dark
- Bottom nav uses 18×3px rust pill above icon (not underline)
- All empty states have an AI message

## What's implemented (2026-02-15)
- All 14 screens with realistic mock data (6 ghost nodes, 3 barters, 3 alerts, 2 favours, 3 jobs, 7-day demand forecast).
- Phone + OTP auth (mocked), gig toggle on splash, role-based onboarding chat with 3-step progress.
- Auth guard via `AppLayout` — unauthenticated users bounce to `/`.
- Role-aware bottom nav (Home/Map/Barter/Me for residents; Home/Jobs/Rep/Barter/Me for gig).
- Role toggle in `/me` with full state reset.
- AI-brokered barter match flow with coin fairness card and confirm action.
- Active barter / scam radar / weekly snapshot / favour board / ledger all live.
- Bottom-nav z-index lifted above the Emergent floating badge; chat-input rows have 64px bottom padding so send button isn't intercepted by the badge.
- All interactive elements have `data-testid`.
- Frontend tested end-to-end (96% pass on iteration 1; critical badge-overlap bug fixed in iteration 2).

## Prioritized backlog
### P1 (next session)
- Persist jobs status (accepted/passed) into localStorage (currently session-only).
- Real "Post barter" modal (currently a teaser CTA).
- "Connect" CTA on node profile — open a deeper intro chat with the node.
- Reputation page: when accessed by a resident, route to gig dashboard with seeded gig identity (or hide entirely for residents).

### P2
- Animated entrance staggers on cards (Motion library).
- Real geolocation overlay on the ghost economy map.
- Wire AI responses to a real LLM (Claude Sonnet 4.5) via emergentintegrations + Universal Key.
- WhatsApp share intent for the weekly snapshot.
- Notification dot on bottom-nav when a new barter match or alert arrives.

### P3
- Resident → Gig "graduation" flow: a resident with enough mentions auto-creates a gig profile.
- Mohalla coin marketplace UI (badges, ghost node unlocks).
- 3-way barter visual loop animation.
