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

## Next phases

See `Social_Battery_Codex_Build_Spec_v1.md` for Phases 2–6: Supabase schema, real auth, Stripe checkout, grouping engine, feedback/friends, full admin.
