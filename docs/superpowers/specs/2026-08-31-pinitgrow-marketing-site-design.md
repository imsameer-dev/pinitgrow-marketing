# PinitGrow marketing site

Date: 2026-08-31  
Status: Approved  
Workspace: `D:\Pinit Frontend web`  
Product app: `D:\pinit\web` (Nuxt) at `app.pinitgrow.com`

## 1. Goal

Ship a public marketing website on **pinitgrow.com** that explains PinitGrow, proves the product with real UI, and sends visitors into the existing Nuxt app. This repo does not replace the research workspace. Auth, billing, and tools stay on the subdomain.

Success looks like:

- A visitor understands the product in one screen (headline + product frame + trial CTA).
- Trial and login always land on the live app, never a fake in-site signup.
- Light and dark mode work on every page.
- The site feels like a serious research tool: calm, token-driven, one red accent.

## 2. Boundaries

In scope:

- `/`, `/features`, `/pricing`, `/faq`
- Shared header, footer, theme toggle
- Static pricing copy matching the Laravel plan config
- Product screenshots in Safari-style device frames
- CTAs to `app.pinitgrow.com`

Out of scope (v1):

- Rebuilding Keyword Explorer or any authenticated tool
- Per-tool SEO landing pages (`/keyword-explorer`, etc.)
- Live Paddle checkout on this domain
- Blog, docs, Chrome extension pages
- Fetching live scrape data for the marketing UI

## 3. Origins and handoff

| Origin | App | Repo |
|---|---|---|
| `https://pinitgrow.com` | Marketing (this project) | `D:\Pinit Frontend web` |
| `https://app.pinitgrow.com` | Research workspace | `D:\pinit\web` |

Environment:

```
NEXT_PUBLIC_APP_URL=https://app.pinitgrow.com
```

Local default: `http://localhost:3000` for marketing; `NEXT_PUBLIC_APP_URL` points at whatever hosts the Nuxt app (Docker `http://localhost` or a later local port). Never hardcode the production app host in components.

Handoff map:

| Marketing action | Destination |
|---|---|
| Start free trial / Choose plan | `{APP_URL}/register` |
| Log in | `{APP_URL}/login` |
| Deep-link to plans (rare) | `{APP_URL}/plans` |

No marketing-site registration form. No copied Sanctum session on this origin.

## 4. Stack

- Next.js App Router, TypeScript
- Tailwind CSS consuming CSS variables
- shadcn/ui + Base UI primitives where shadcn needs them
- Animate UI (copy into `components/animate/`, React + Motion)
- Lenis on the marketing layout only (`lenis/react`)
- `next-themes` with `class` strategy (`class="dark"` on `<html>`)
- Geist Sans + Geist Mono via `next/font`
- Inspira UI is a **visual recipe only** (Safari mockup, bento, marquee, number ticker, scroll reveal). Do not install Vue packages.

Lenis and Animate UI honor `prefers-reduced-motion: reduce`: disable smooth scroll; keep opacity/position fades short or static.

## 5. Visual system

Personality: restrained product site. Neutral surfaces, Pinterest red as the only brand accent, product UI as the imagery. Forbidden: aurora/sparkle/black-hole backgrounds, purple-blue glow, glass everywhere, emoji walls, equal-weight metric spam.

### Tokens

Light matches the Nuxt app’s current light palette closely. Dark uses the same semantic names.

| Token | Light | Dark |
|---|---|---|
| `--background` | `#f7f7f8` | `#0c0d10` |
| `--foreground` | `#18181b` | `#f4f4f5` |
| `--card` | `#ffffff` | `#16181d` |
| `--muted-foreground` | `#6b7280` | `#a1a1aa` |
| `--border` | `#e5e7eb` | `#2d3036` |
| `--primary` | `#e60023` | `#fb3b57` |
| `--primary-foreground` | `#ffffff` | `#ffffff` |

Also define shadcn-required tokens: `secondary`, `accent`, `destructive`, `input`, `ring`, `popover`, radius scale (`sm` / `md` / `lg` / `xl` / `2xl`), and motion (`--duration-fast: 120ms`, `--duration-normal: 180ms`, `--duration-slow: 280ms`).

Radius usage: inputs/buttons `lg`, cards `xl`, hero/Safari frame `2xl`, pills `full`.  
Elevation: borders first. Shadow only on the device frame and menus.

### Type

- Display (hero only): `text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight`
- Page title: `text-2xl md:text-3xl font-semibold tracking-tight`
- Section: `text-xl md:text-2xl font-semibold tracking-tight`
- Body: `text-base leading-7`
- Secondary: `text-sm text-muted-foreground`
- Metrics: Geist Mono

### Theme

Header control: system (default) / light / dark. Persist with `next-themes`. Product screenshots swap `*-light.png` / `*-dark.png` with the resolved theme so the Safari frame never shows a light UI on a dark page.

## 6. Information architecture

```
/            long homepage
/features    full tool walkthrough
/pricing     three plans + comparison
/faq         accordion
```

Shared chrome: `SiteHeader`, `SiteFooter`. Marketing `RootLayout` wraps children with theme provider and Lenis.

Header: logo (existing `pinitgrow-logo.svg` copied from the Nuxt public brand folder) → Features, Pricing, FAQ → theme toggle → Log in (ghost) → Start free trial (primary). Sticky, `card` background, hairline border.

Footer: product links, login/register. No Privacy/Terms routes in v1 (those ship with billing). Do not add dead `#` links.

## 7. Homepage

Order is fixed. Primary CTA copy is **Start free trial** everywhere.

1. **Header**
2. **Hero**  
   Eyebrow: `Pinterest research for creators`  
   Headline: `See the keywords, pins, and rankings Pinterest doesn’t show you.`  
   Sub: Keyword explorer, top pins, accounts, boards, and rank tracking — in one cloud workspace.  
   Primary → register. Secondary “See how it works” scrolls to `#how-it-works`.  
   Under CTA: `No credit card. Full access during a 3-day trial.`  
   Visual: Keyword Explorer in Safari frame.
3. **Proof strip** — four facts with number tickers, not fake customer logos: keyword expansion, top pins + Pin Score, rank/search tracking, account & board explorers.
4. **Feature walkthrough** — three alternating screenshot blocks:  
   - Find keywords Pinterest already ranks (Keyword Explorer)  
   - Study the pins that already win (Top Pins + Pin Stats)  
   - Track your domain over time (Rank + Search Tracker)  
   Each links to `/features`.
5. **Bento** — Ideas, Account Explorer, Board Explorer, Research Projects, Saved Lists, CSV export.
6. **How it works** (`id="how-it-works"`) — Search a seed → Read hidden stats → Save, track, export.
7. **Pricing teaser** — Creator $9.99 / Professional $29.99 (featured) / Studio $85.99. One differentiating line each. “Compare plans” → `/pricing`. CTAs still go to register (checkout is not live).
8. **FAQ preview** — four questions, link to `/faq`.
9. **Final CTA** — repeat promise + trial + login.
10. **Footer**

Testimonial marquee sits after the walkthrough. Quotes are labeled as illustrative until real customers exist; do not invent company logos. Prefer short creator-style lines. Replace in place later without changing layout.

## 8. Features page

Title: `Every research tool in one workspace.`  
Sub: Cloud access, not a desktop install.

One section per tool, product order:

1. Keyword Explorer  
2. Ideas  
3. Top Pins  
4. Pin Stats  
5. Account Explorer  
6. Board Explorer  
7. Rank Tracker  
8. Search Tracker  
9. Research Projects & Saved Lists  

Each section: benefit headline, input (what you type), output (what you get), Safari-framed screenshot. Mid-page CTA after Top Pins; repeat at bottom.

Honest product constraint, stated once (Projects section): unsaved explorer results live in the current tab only; refresh clears them. Saved projects, lists, and tracker history persist on the server.

## 9. Pricing page

Title: `Choose the research capacity you need.`  
Sub: 3-day trial on every plan. No card. Daily limits reset on the user’s timezone.

Plans are a static copy of `D:\pinit\api\config\plans.php` in `lib/plans.ts`. Do not invent different prices.

| Code | Name | Price | Role |
|---|---|---|---|
| `creator` | Creator | $9.99/mo | Solo |
| `professional` | Professional | $29.99/mo | Featured |
| `studio` | Studio | $85.99/mo | High volume |

Each card lists the same rows as Nuxt `/plans`: Keyword Explorer, Ideas, Top Pins, Pin Stats, Account Explorer, Board Explorer, new research projects (daily), max pins/search, stored projects, active trackers, tracker history days.

Trial daily limits come from usage config in the API, not from `tiers.trial.daily` (that array is empty). Marketing must not claim “unlimited” for trial. Copy: `Full product access for 3 days, with the same tool set as paid plans. Limits apply.`

Checkout note: Paddle is not enabled. Card CTA is still **Start free trial**. One sentence under the grid: checkout will open after production billing is approved; trial accounts work now.

Comparison table under cards. Billing FAQ slice (trial length, when trial ends, timezone limits).

## 10. FAQ page

shadcn Accordion. Required questions:

- What is PinitGrow?
- How is it different from PinClicks?
- How is it different from Pin Inspector?
- Do you use the official Pinterest API? (No. Public logged-out Pinterest data, same class of approach as the category. Do not over-claim legality.)
- How long is the trial? (3 days, no credit card.)
- Where is the app? (`app.pinitgrow.com`)
- Light and dark mode?
- Can I export CSV?
- What happens when the trial ends? (Account remains; research routes are gated until a plan is activated — matches Nuxt `trial_expired` → `/plans`.)

Tone: plain, specific, no competitor insults.

## 11. Components

Level 1 — shadcn: Button, Accordion, Separator, Tooltip, Tabs (if needed on features), Dropdown (theme menu).

Level 2 — marketing composites:

- `SiteHeader` / `SiteFooter`
- `ThemeToggle`
- `SafariFrame` — Inspira-style browser chrome around an image
- `Section` — max width, vertical padding, optional eyebrow
- `FeatureBlock` — copy + frame, `imageLeft` / `imageRight`
- `BentoGrid` / `BentoTile`
- `PricingCard` / `PricingTeaser`
- `ProofStrip` + Animate UI number ticker
- `TestimonialMarquee`
- `FaqList`
- `AppLink` — wraps `NEXT_PUBLIC_APP_URL` + path
- `CtaBanner` — final/mid CTAs

Level 3 — page composition only. Pages must not re-implement header spacing or button styles.

Animate UI usage (copy, then restyle to tokens): primary button motion, hero text reveal, number ticker, marquee, in-view section fade. No bubble/fireworks/star backgrounds.

## 12. Data flow

v1 is static. `lib/site.ts` holds nav, headlines, FAQ content, app paths. `lib/plans.ts` holds plan rows. `lib/utils.ts` is `cn()`.

Images live in `public/product/`:

```
keywords-light.png
keywords-dark.png
top-pins-light.png
top-pins-dark.png
rank-tracker-light.png
rank-tracker-dark.png
```

Additional frames as features page needs them. Generate or capture from the real Nuxt UI (browser) during implementation. Alt text describes the tool, not “screenshot”.

No client fetch to Laravel from the marketing origin in v1. If plans later diverge, update `lib/plans.ts` in the same PR as `api/config/plans.php`. Optional later: server-side fetch of `GET /api/plans` behind CORS; not required to ship.

## 13. Errors, empty, loading

Marketing pages are pre-rendered. No data spinner on first paint.

- Images: `next/image` with explicit width/height; theme-matched placeholder `bg-muted` if load is slow.
- Missing `NEXT_PUBLIC_APP_URL`: build must fail or fall back is forbidden in production; local `.env.example` documents the var.
- Accordion: keyboard and collapsed/expanded states from shadcn.
- Theme flash: `next-themes` blocking script / `suppressHydrationWarning` on `<html>`.
- 404: simple token-styled page with link home and trial CTA.
- Reduced motion: Lenis unmounted; marquee static; tickers show final numbers.

## 14. Accessibility

- Semantic landmarks: `header`, `main`, `footer`, one `h1` per page
- Visible focus rings using `--ring`
- Theme toggle has an accessible name
- Contrast: WCAG AA for body and muted text on both themes
- Motion: `prefers-reduced-motion`
- External app links: obvious (same tab is OK; they are the product). Do not use `target="_blank"` unless we also add `noopener` and an SR hint; default is same-tab navigation to the app.
- Touch targets ≥ 40px on header actions

## 15. Testing

- Typecheck and lint on the Next app
- Manual: 375 / 768 / 1024 / 1440, light and dark, system theme
- CTA hrefs resolve to `{APP_URL}/register` and `/login`
- Keyboard: header, accordion, theme toggle
- Reduced-motion: no smooth-scroll hijack
- Visual: hero frame matches theme; no raw `bg-zinc-*` on chrome

No requirement to unit-test copy. Prefer one Playwright smoke (`/` loads, trial link present) if the project adds e2e; not a blocker for first visual ship.

## 16. Folder structure

```
src/
  app/
    layout.tsx
    page.tsx
    features/page.tsx
    pricing/page.tsx
    faq/page.tsx
    not-found.tsx
    globals.css
  components/
    ui/
    marketing/
    animate/
  lib/
    utils.ts
    site.ts
    plans.ts
public/
  brand/pinitgrow-logo.svg
  product/
```

Use `src/` as the Next default. Keep `components/ui` for shadcn only.

## 17. Copy constraints

- Product name: **PinitGrow** (not PinIt).
- Trial: **3 days**, no credit card. Do not say 5 or 10.
- Prices: $9.99 / $29.99 / $85.99. Do not round to $10 / $30 / $86.
- Positioning: cloud research that combines rank tracking and pin/account depth. Do not claim an official Pinterest partnership or official API.
- Button labels: `Start free trial`, `Log in`, `Compare plans`. Not `Submit` / `Click here`.

## 18. Implementation notes for later

This spec is the source of truth for the marketing site. After approval, write an implementation plan (scaffold Next app, tokens, chrome, homepage, inner pages, images, motion, verify in browser). Do not edit `D:\pinit\web` except copying the logo SVG into this repo’s `public/brand/`.
