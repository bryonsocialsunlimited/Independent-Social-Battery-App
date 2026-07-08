# Social Battery

Mobile-first web app for curated small-group ticketed outings. Phase 1 prototype with mock data.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** — dark, premium design system
- **Framer Motion** — page transitions & splash
- **React Three Fiber** — 4-second skippable intro animation
- **Mock data** — Supabase/Stripe adapter interfaces ready for Phase 2+

## Getting started

```bash
cd social-battery
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Screen |
|---|---|
| `/` | Landing + 4s splash animation |
| `/signup`, `/login`, `/onboarding` | Auth flow |
| `/home` | Home with city selector & recommendations |
| `/explore` | Category browse (Movies, Comedy, Sports, Performing Arts) |
| `/outings` | Upcoming / pending / past outings |
| `/outings/[id]` | Outing detail + pricing variants |
| `/outings/[id]/group` | Group preview (first names + 3 public prompts) |
| `/messages` | Locked/active group chats + friend DM placeholder |
| `/profile` | Credits, rewards, memberships, settings |
| `/admin` | Admin metrics dashboard placeholder |

## Product language

- **Outings** (never "events" in UI)
- Groups: 3–6 people, never exceed 6
- Group chat opens 1hr before outing, closes at end
- DMs unlock only after mutual "become friends"
- Boston live; Worcester & Providence waitlist

## Beta bypass code

On outing detail, enter `SOCIALBETA` for $0 mock checkout.

## Architecture

```
src/
├── app/api/v1/          # REST stubs returning mock data (swap for Supabase later)
├── components/cards/    # Reusable AppCard system (outing, group, pricing, reward, admin)
├── components/motion/   # Page transitions & stagger animations
├── lib/mock-data/       # Rich prototype fixtures
├── lib/services/        # Data access layer (currently mock-backed)
├── lib/api/client.ts    # Typed fetch client for /api/v1/*
└── lib/routes.ts        # Central route map
```

### API routes (mock)

| Endpoint | Description |
|---|---|
| `GET /api/v1/outings` | List outings (`?cityId`, `?categoryId`) |
| `GET /api/v1/outings/[id]` | Outing detail |
| `GET /api/v1/users/me` | Current user profile |
| `GET /api/v1/users/me/bookings` | User bookings |
| `GET /api/v1/groups?outingId=` | Group for an outing |
| `GET /api/v1/conversations` | All conversations |
| `GET /api/v1/memberships` | Membership plans |
| `GET /api/v1/rewards` | Rewards tiers, redemptions, activity |
| `GET /api/v1/admin/metrics` | Admin dashboard metrics |
| `GET /api/v1/admin/feedback-flags` | Feedback flag queue |

## Next phases

See `Social_Battery_Codex_Build_Spec_v1.md` for Phases 2–6: Supabase schema, real auth, Stripe checkout, grouping engine, feedback/friends, full admin.
