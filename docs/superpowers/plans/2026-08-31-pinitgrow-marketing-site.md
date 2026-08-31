# PinitGrow Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a Next.js marketing site on `pinitgrow.com` (home, features, pricing, FAQ) that proves PinitGrow with real product UI and sends visitors to `app.pinitgrow.com`.

**Architecture:** Static App Router site. Copy and plan numbers live in `src/lib`. All “enter product” links go through `appUrl()`. Theme uses `next-themes` + CSS variables. Lenis wraps the marketing layout only. Product screenshots sit in Safari frames; the provided Keyword Explorer PNG is the hero and the fallback for missing shots.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Motion, Animate UI (copy-in), Lenis, next-themes, Geist fonts, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-31-pinitgrow-marketing-site-design.md`

## Global Constraints

- Product name is **PinitGrow**, never PinIt.
- Trial copy is **3 days**, no credit card. Never 5 or 10.
- Prices are **$9.99 / $29.99 / $85.99**. Never round them.
- CTAs: `Start free trial` → `{NEXT_PUBLIC_APP_URL}/register`; `Log in` → `{NEXT_PUBLIC_APP_URL}/login`. Same tab. No in-site signup.
- Do not edit `D:\pinit\web` except reading it. Copy logo/screenshot **into this repo**.
- Inspira UI is a visual recipe only. Do not install Vue packages.
- No aurora/sparkle/black-hole backgrounds, no purple glow, no fake customer logos.
- Semantic tokens only on chrome (`bg-background`, `text-foreground`, `bg-primary`). No `bg-zinc-*` / `text-gray-*` on header, footer, cards, buttons.
- `prefers-reduced-motion: reduce` disables Lenis, marquee animation, and number tickers (show final values).
- Do not add Privacy/Terms routes or dead `#` links.

## File map

```
src/app/layout.tsx
src/app/page.tsx
src/app/features/page.tsx
src/app/pricing/page.tsx
src/app/faq/page.tsx
src/app/not-found.tsx
src/app/globals.css
src/components/ui/button.tsx
src/components/ui/accordion.tsx
src/components/providers/theme-provider.tsx
src/components/providers/lenis-provider.tsx
src/components/marketing/site-header.tsx
src/components/marketing/site-footer.tsx
src/components/marketing/theme-toggle.tsx
src/components/marketing/app-link.tsx
src/components/marketing/safari-frame.tsx
src/components/marketing/product-shot.tsx
src/components/marketing/section.tsx
src/components/marketing/feature-block.tsx
src/components/marketing/bento-grid.tsx
src/components/marketing/proof-strip.tsx
src/components/marketing/how-it-works.tsx
src/components/marketing/pricing-card.tsx
src/components/marketing/pricing-teaser.tsx
src/components/marketing/faq-list.tsx
src/components/marketing/cta-banner.tsx
src/components/marketing/testimonial-marquee.tsx
src/components/animate/number-ticker.tsx
src/lib/utils.ts
src/lib/app-url.ts
src/lib/site.ts
src/lib/plans.ts
src/lib/app-url.test.ts
src/lib/plans.test.ts
public/brand/pinitgrow-logo.svg
public/brand/pinitgrow-logo.png
public/product/keywords-light.png
e2e/home.spec.ts
```

Incoming assets already in the workspace root (move, do not re-download):

- `D:\Pinit Frontend web\keywords-light.png`
- `D:\Pinit Frontend web\pinitgrow-logo.svg`
- `D:\Pinit Frontend web\pinitgrow-logo.png`

---

### Task 1: Scaffold Next.js app and design tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.env.example`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/lib/utils.ts`
- Modify: replace the leftover Playwright-only `package.json` (keep `docs/`, `design-SKILL.md`, incoming assets until Task 6)
- Test: `src/lib/utils.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `cn(...inputs: ClassValue[]): string`; CSS variables listed below; Next app on port 3000

- [ ] **Step 1: Write the failing `cn` test**

Create `src/lib/utils.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges tailwind classes and drops conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/lib/utils.test.ts`
Expected: FAIL — `Cannot find module './utils'` (file does not exist yet). If vitest is not installed yet, FAIL on `vitest` not found. That is still a valid red.

- [ ] **Step 3: Scaffold the Next app in this folder**

Keep `docs/`, `design-SKILL.md`, `keywords-light.png`, `pinitgrow-logo.svg`, `pinitgrow-logo.png`. Delete `research/capture.mjs` only if it blocks scaffold; keep `research/screenshots` (reference, not shipped).

Overwrite `package.json`:

```json
{
  "name": "pinitgrow-marketing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

Install:

```bash
npm install next react react-dom clsx tailwind-merge class-variance-authority lucide-react next-themes motion lenis
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss eslint eslint-config-next vitest @vitejs/plugin-react jsdom tw-animate-css
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: "/product/**" }, { pathname: "/brand/**" }],
  },
};

export default nextConfig;
```

`postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

`vitest.config.ts`:

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

`.env.example`:

```
NEXT_PUBLIC_APP_URL=https://app.pinitgrow.com
```

`.env.local` (do not commit):

```
NEXT_PUBLIC_APP_URL=https://app.pinitgrow.com
```

`src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`src/app/globals.css` — full token file (required values, not a sketch):

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: #f7f7f8;
  --foreground: #18181b;
  --card: #ffffff;
  --card-foreground: #18181b;
  --popover: #ffffff;
  --popover-foreground: #18181b;
  --primary: #e60023;
  --primary-foreground: #ffffff;
  --secondary: #f3f1ee;
  --secondary-foreground: #18181b;
  --muted: #f3f1ee;
  --muted-foreground: #6b7280;
  --accent: #f3f1ee;
  --accent-foreground: #18181b;
  --destructive: #b42318;
  --destructive-foreground: #ffffff;
  --border: #e5e7eb;
  --input: #e5e7eb;
  --ring: #e60023;
  --radius: 0.75rem;
  --radius-sm: 0.5rem;
  --radius-md: 0.625rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.25rem;
  --duration-fast: 120ms;
  --duration-normal: 180ms;
  --duration-slow: 280ms;
  --header-height: 4rem;
  --page-max-width: 1440px;
  --content-max-width: 1200px;
}

.dark {
  --background: #0c0d10;
  --foreground: #f4f4f5;
  --card: #16181d;
  --card-foreground: #f4f4f5;
  --popover: #16181d;
  --popover-foreground: #f4f4f5;
  --primary: #fb3b57;
  --primary-foreground: #ffffff;
  --secondary: #22252a;
  --secondary-foreground: #f4f4f5;
  --muted: #22252a;
  --muted-foreground: #a1a1aa;
  --accent: #22252a;
  --accent-foreground: #f4f4f5;
  --destructive: #f97066;
  --destructive-foreground: #18181b;
  --border: #2d3036;
  --input: #2d3036;
  --ring: #fb3b57;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-2xl: var(--radius-2xl);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@layer base {
  * {
    @apply border-border;
  }
  html {
    scroll-behavior: auto;
  }
  body {
    @apply bg-background text-foreground antialiased;
  }
}

@media (prefers-reduced-motion: reduce) {
  html:root {
    scroll-behavior: auto;
  }
}
```

Minimal `src/app/layout.tsx` (theme/Lenis come in Task 4):

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PinitGrow — Pinterest research",
  description:
    "Keyword explorer, top pins, accounts, boards, and rank tracking in one cloud workspace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
```

`src/app/page.tsx`:

```tsx
export default function HomePage() {
  return <main>PinitGrow</main>;
}
```

`.gitignore` must include `.env.local`, `node_modules`, `.next`.

- [ ] **Step 4: Run the unit test and typecheck**

Run: `npx vitest run src/lib/utils.test.ts`
Expected: PASS

Run: `npx tsc --noEmit`
Expected: exit 0

Run: `npx next build`
Expected: success (placeholder home).

- [ ] **Step 5: Commit**

```bash
git add package.json tsconfig.json next.config.ts postcss.config.mjs vitest.config.ts .env.example .gitignore src/lib/utils.ts src/lib/utils.test.ts src/app/layout.tsx src/app/page.tsx src/app/globals.css
git commit -m "chore: scaffold Next.js marketing app with design tokens"
```

---

### Task 2: App URL helper and static plans

**Files:**
- Create: `src/lib/app-url.ts`, `src/lib/app-url.test.ts`, `src/lib/plans.ts`, `src/lib/plans.test.ts`, `src/lib/site.ts`
- Test: `src/lib/app-url.test.ts`, `src/lib/plans.test.ts`

**Interfaces:**
- Consumes: `NEXT_PUBLIC_APP_URL`
- Produces:
  - `appUrl(path: string): string`
  - `export const plans: Plan[]`
  - `export type PlanCode = "creator" | "professional" | "studio"`
  - `export type Plan` as defined below
  - `site` object in `src/lib/site.ts`

- [ ] **Step 1: Write failing tests**

`src/lib/app-url.test.ts`:

```ts
import { afterEach, describe, expect, it } from "vitest";
import { appUrl } from "./app-url";

const original = process.env.NEXT_PUBLIC_APP_URL;

afterEach(() => {
  process.env.NEXT_PUBLIC_APP_URL = original;
});

describe("appUrl", () => {
  it("joins origin and path without a double slash", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://app.pinitgrow.com/";
    expect(appUrl("/register")).toBe("https://app.pinitgrow.com/register");
    expect(appUrl("login")).toBe("https://app.pinitgrow.com/login");
  });

  it("throws when NEXT_PUBLIC_APP_URL is missing", () => {
    delete process.env.NEXT_PUBLIC_APP_URL;
    expect(() => appUrl("/register")).toThrow(/NEXT_PUBLIC_APP_URL/);
  });
});
```

`src/lib/plans.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { plans } from "./plans";

describe("plans", () => {
  it("matches live Laravel prices and codes", () => {
    expect(plans.map((p) => [p.code, p.priceLabel])).toEqual([
      ["creator", "$9.99"],
      ["professional", "$29.99"],
      ["studio", "$85.99"],
    ]);
    expect(plans.find((p) => p.code === "professional")?.featured).toBe(true);
  });

  it("lists the same comparison rows as the Nuxt plans page", () => {
    const creator = plans[0];
    expect(creator.rows.map((r) => r.label)).toEqual([
      "Keyword Explorer",
      "Ideas searches",
      "Top Pins searches",
      "Pin Stats scans",
      "Account Explorer",
      "Board Explorer",
      "New research projects",
      "Maximum pins/search",
      "Stored projects",
      "Active trackers",
      "Tracker history",
    ]);
    expect(creator.rows[0]?.value).toBe("20/day");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/app-url.test.ts src/lib/plans.test.ts`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement**

`src/lib/app-url.ts`:

```ts
export function appUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL;
  if (!base) {
    throw new Error("NEXT_PUBLIC_APP_URL is not set");
  }
  const origin = base.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${suffix}`;
}
```

`src/lib/plans.ts` (verbatim from `D:\pinit\api\config\plans.php`):

```ts
export type PlanCode = "creator" | "professional" | "studio";

export type PlanRow = { label: string; value: string };

export type Plan = {
  code: PlanCode;
  name: string;
  priceLabel: string;
  pitch: string;
  featured: boolean;
  rows: PlanRow[];
};

export const trialDays = 3;

export const plans: Plan[] = [
  {
    code: "creator",
    name: "Creator",
    priceLabel: "$9.99",
    pitch: "Solo creators who research a few niches a day.",
    featured: false,
    rows: [
      { label: "Keyword Explorer", value: "20/day" },
      { label: "Ideas searches", value: "5/day" },
      { label: "Top Pins searches", value: "3/day" },
      { label: "Pin Stats scans", value: "5/day" },
      { label: "Account Explorer", value: "5/day" },
      { label: "Board Explorer", value: "5/day" },
      { label: "New research projects", value: "2/day" },
      { label: "Maximum pins/search", value: "100" },
      { label: "Stored projects", value: "10" },
      { label: "Active trackers", value: "5" },
      { label: "Tracker history", value: "30 days" },
    ],
  },
  {
    code: "professional",
    name: "Professional",
    priceLabel: "$29.99",
    pitch: "Agencies and publishers who live in rank tracking.",
    featured: true,
    rows: [
      { label: "Keyword Explorer", value: "40/day" },
      { label: "Ideas searches", value: "15/day" },
      { label: "Top Pins searches", value: "10/day" },
      { label: "Pin Stats scans", value: "20/day" },
      { label: "Account Explorer", value: "15/day" },
      { label: "Board Explorer", value: "15/day" },
      { label: "New research projects", value: "5/day" },
      { label: "Maximum pins/search", value: "300" },
      { label: "Stored projects", value: "50" },
      { label: "Active trackers", value: "25" },
      { label: "Tracker history", value: "90 days" },
    ],
  },
  {
    code: "studio",
    name: "Studio",
    priceLabel: "$85.99",
    pitch: "High-volume teams that need the full daily capacity.",
    featured: false,
    rows: [
      { label: "Keyword Explorer", value: "100/day" },
      { label: "Ideas searches", value: "50/day" },
      { label: "Top Pins searches", value: "25/day" },
      { label: "Pin Stats scans", value: "50/day" },
      { label: "Account Explorer", value: "50/day" },
      { label: "Board Explorer", value: "50/day" },
      { label: "New research projects", value: "10/day" },
      { label: "Maximum pins/search", value: "500" },
      { label: "Stored projects", value: "200" },
      { label: "Active trackers", value: "75" },
      { label: "Tracker history", value: "365 days" },
    ],
  },
];
```

`src/lib/site.ts`:

```ts
export const nav = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
] as const;

export const hero = {
  eyebrow: "Pinterest research for creators",
  headline: "See the keywords, pins, and rankings Pinterest doesn’t show you.",
  sub: "Keyword explorer, top pins, accounts, boards, and rank tracking — in one cloud workspace.",
  trialNote: "No credit card. Full access during a 3-day trial.",
};

export const proofItems = [
  { value: 364, suffix: "+", label: "keyword suggestions from one seed" },
  { value: 3, suffix: "", label: "core pin research tools" },
  { value: 2, suffix: "", label: "scheduled rank and search trackers" },
  { value: 2, suffix: "", label: "account and board explorers" },
] as const;

export const walkthrough = [
  {
    title: "Find keywords Pinterest already ranks",
    body: "Start from a seed. PinitGrow expands A–Z and 0–9 autocomplete, then scores popularity so you can see demand — not guess it.",
    shot: "keywords" as const,
    href: "/features",
  },
  {
    title: "Study the pins that already win",
    body: "Top Pins and Pin Stats surface saves, Pin Score, annotations, and destinations for the results that already rank.",
    shot: "keywords" as const,
    href: "/features",
  },
  {
    title: "Track your domain over time",
    body: "Rank Tracker and Search Tracker snapshot keyword + domain position on a schedule so you can see movement, not a one-off SERP.",
    shot: "keywords" as const,
    href: "/features",
  },
] as const;

export const bento = [
  { title: "Ideas", body: "Official interests and annotations so pins match how Pinterest labels content." },
  { title: "Account Explorer", body: "Open a competitor profile and see the pins and topics they actually rank with." },
  { title: "Board Explorer", body: "Inspect a board’s pins and interests without clicking through Pinterest by hand." },
  { title: "Research Projects", body: "Package a keyword run into a durable project instead of a throwaway tab." },
  { title: "Saved Lists", body: "Keep the keywords and pins you want to ship next." },
  { title: "CSV export", body: "Download explorer results when you are ready to brief a writer or designer." },
] as const;

export const howItWorks = [
  { step: "1", title: "Search a seed", body: "Type a keyword, account, board, or pin URL — the same way you already work." },
  { step: "2", title: "Read the hidden stats", body: "See popularity, saves, annotations, and rank position in one workspace." },
  { step: "3", title: "Save, track, export", body: "Keep what matters in lists and trackers. Unsaved explorer tabs stay in-session only." },
] as const;

export const testimonials = [
  {
    quote: "I stopped guessing pin titles and started using the keywords Pinterest already suggests.",
    name: "Illustrative creator quote",
  },
  {
    quote: "Rank tracking in the browser is the difference between a desktop dump and a weekly habit.",
    name: "Illustrative publisher quote",
  },
  {
    quote: "Account Explorer is how I decide which competitors are worth studying this month.",
    name: "Illustrative strategist quote",
  },
] as const;

export const faqs = [
  {
    q: "What is PinitGrow?",
    a: "PinitGrow is a cloud Pinterest research workspace: keyword expansion, top pins, pin stats, account and board explorers, plus rank and search tracking. The marketing site is pinitgrow.com; the app is app.pinitgrow.com.",
  },
  {
    q: "How is it different from PinClicks?",
    a: "PinClicks is the established cloud rank tracker in this niche. PinitGrow is also cloud-based and includes rank tracking plus account and board explorers in one login. Compare features on the Features page rather than assuming identical data coverage.",
  },
  {
    q: "How is it different from Pin Inspector?",
    a: "Pin Inspector is a desktop app with a one-time license. PinitGrow is a browser app with a 3-day trial and monthly plans, so you can research from any machine without installing software.",
  },
  {
    q: "Do you use the official Pinterest API?",
    a: "No. PinitGrow reads publicly available logged-out Pinterest data, the same class of approach used by other tools in this category. We do not claim an official Pinterest partnership.",
  },
  {
    q: "How long is the trial?",
    a: "Every new account includes a 3-day trial with no credit card. Limits apply; the tool set matches paid plans.",
  },
  {
    q: "Where is the app?",
    a: "The research workspace is at app.pinitgrow.com. This website is only the public front door.",
  },
  {
    q: "Does it support light and dark mode?",
    a: "Yes. Both the marketing site and the app follow a system default, with a manual light or dark override.",
  },
  {
    q: "Can I export CSV?",
    a: "Yes. Explorer results can be exported to CSV from the app.",
  },
  {
    q: "What happens when the trial ends?",
    a: "Your account remains. Research routes are gated until a plan is activated. You can still open profile and security settings.",
  },
] as const;

export const faqPreviewIds = [0, 1, 3, 4] as const;

export const tools = [
  {
    title: "Keyword Explorer",
    input: "A seed such as “home decor”.",
    output: "A–Z / 0–9 suggestions with intent, popularity, and demand when volume is live.",
    shot: "keywords" as const,
  },
  {
    title: "Ideas",
    input: "A topic or interest query.",
    output: "Official annotations so you can write pins the way Pinterest already labels them.",
    shot: "keywords" as const,
  },
  {
    title: "Top Pins",
    input: "A keyword.",
    output: "Ranking pins with saves, Pin Score, and destination links.",
    shot: "keywords" as const,
  },
  {
    title: "Pin Stats",
    input: "One or many pin URLs.",
    output: "Bulk stats, annotations, and destination data.",
    shot: "keywords" as const,
  },
  {
    title: "Account Explorer",
    input: "A username or profile keyword.",
    output: "The pins and topics a competitor account actually uses.",
    shot: "keywords" as const,
  },
  {
    title: "Board Explorer",
    input: "A board URL or name.",
    output: "Board-level pins and interests.",
    shot: "keywords" as const,
  },
  {
    title: "Rank Tracker",
    input: "A keyword plus your domain.",
    output: "Scheduled position checks over time.",
    shot: "keywords" as const,
  },
  {
    title: "Search Tracker",
    input: "A keyword to snapshot.",
    output: "SERP snapshots you can compare week to week.",
    shot: "keywords" as const,
  },
  {
    title: "Research Projects & Saved Lists",
    input: "Any explorer result you want to keep.",
    output: "Durable projects and lists. Unsaved explorer work lives in the current tab only; refresh clears it. Tracker history stays on the server.",
    shot: "keywords" as const,
  },
] as const;
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run src/lib/app-url.test.ts src/lib/plans.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/app-url.ts src/lib/app-url.test.ts src/lib/plans.ts src/lib/plans.test.ts src/lib/site.ts
git commit -m "feat: add app URL helper, plan numbers, and marketing copy"
```

---

### Task 3: shadcn Button and Accordion

**Files:**
- Create: `components.json`, `src/components/ui/button.tsx`, `src/components/ui/accordion.tsx`
- Test: visual via `npx tsc --noEmit` (no extra unit test; these are primitives)

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`
- Produces: `Button` with variants `default | secondary | outline | ghost`; `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`

- [ ] **Step 1: Add shadcn config and install accordion primitive**

`components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

Install radix/base accordion dependency used by current shadcn:

```bash
npm install @radix-ui/react-slot @radix-ui/react-accordion
```

If `npx shadcn@latest add button accordion --yes` works against this `components.json`, use it. If it fails, paste the files below.

- [ ] **Step 2: `src/components/ui/button.tsx`**

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 min-h-10 px-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
        outline: "border border-border bg-background hover:bg-muted",
        ghost: "hover:bg-muted",
      },
      size: {
        default: "h-10",
        sm: "h-9 px-3",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

- [ ] **Step 3: Accordion**

Use shadcn’s Accordion sourced from the CLI. Required public names: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`. Style with `border-border`, `text-foreground`, no extra shadows.

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add components.json src/components/ui
git commit -m "feat: add shadcn button and accordion primitives"
```

---

### Task 4: Theme provider, Lenis, header chrome

**Files:**
- Create: `src/components/providers/theme-provider.tsx`, `src/components/providers/lenis-provider.tsx`, `src/components/marketing/theme-toggle.tsx`, `src/components/marketing/app-link.tsx`, `src/components/marketing/site-header.tsx`, `src/components/marketing/site-footer.tsx`
- Modify: `src/app/layout.tsx`
- Test: `e2e/home.spec.ts` is Task 8; here typecheck + `npm run dev` manual load

**Interfaces:**
- Consumes: `appUrl`, `nav`, `Button`
- Produces: `AppLink`, `SiteHeader`, `SiteFooter`, `ThemeToggle`, `LenisProvider`

- [ ] **Step 1: Theme + Lenis providers**

`src/components/providers/theme-provider.tsx`:

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
```

`src/components/providers/lenis-provider.tsx`:

```tsx
"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import "lenis/dist/lenis.css";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (reduce) return children;

  return (
    <ReactLenis root options={{ lerp: 0.1, autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 2: AppLink, theme toggle, header, footer**

`src/components/marketing/app-link.tsx`:

```tsx
import { appUrl } from "@/lib/app-url";

export function AppLink({
  path,
  className,
  children,
}: {
  path: "/register" | "/login" | "/plans";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={appUrl(path)} className={className}>
      {children}
    </a>
  );
}
```

`src/components/marketing/theme-toggle.tsx`:

```tsx
"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const order = ["system", "light", "dark"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <Button variant="ghost" size="sm" aria-label="Toggle color theme" className="min-h-10 min-w-10" />;
  }
  const current = (theme as (typeof order)[number]) || "system";
  const next = order[(order.indexOf(current) + 1) % order.length];
  const Icon = current === "dark" ? Moon : current === "light" ? Sun : Monitor;
  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={`Color theme ${current}. Switch to ${next}`}
      className="min-h-10 min-w-10"
      onClick={() => setTheme(next)}
    >
      <Icon className="size-4" />
    </Button>
  );
}
```

`src/components/marketing/site-header.tsx`:

```tsx
import Link from "next/link";
import { AppLink } from "@/components/marketing/app-link";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[var(--page-max-width)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="PinitGrow home">
          <img src="/brand/pinitgrow-logo.svg" alt="PinitGrow" className="h-8 w-auto" />
        </Link>
        <nav className="ml-4 hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <AppLink path="/login">Log in</AppLink>
          </Button>
          <Button size="sm" asChild>
            <AppLink path="/register">Start free trial</AppLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
```

`src/components/marketing/site-footer.tsx`:

```tsx
import Link from "next/link";
import { AppLink } from "@/components/marketing/app-link";
import { nav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="text-sm text-muted-foreground">PinitGrow — Pinterest research in the browser.</p>
        <nav className="flex flex-wrap gap-4 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <AppLink path="/login" className="text-muted-foreground hover:text-foreground">
            Log in
          </AppLink>
          <AppLink path="/register" className="text-muted-foreground hover:text-foreground">
            Start free trial
          </AppLink>
        </nav>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Wire layout**

Replace body in `src/app/layout.tsx`:

```tsx
import { LenisProvider } from "@/components/providers/lenis-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

// fonts + metadata from Task 1 stay

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen font-sans">
        <ThemeProvider>
          <LenisProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Move brand assets**

```bash
mkdir public\brand
copy pinitgrow-logo.svg public\brand\pinitgrow-logo.svg
copy pinitgrow-logo.png public\brand\pinitgrow-logo.png
```

Leave the root copies until after confirming `/brand/pinitgrow-logo.svg` loads, then delete the root duplicates so they are not shipped twice.

- [ ] **Step 5: Typecheck and commit**

Run: `npx tsc --noEmit`
Expected: exit 0

```bash
git add src/components src/app/layout.tsx public/brand
git commit -m "feat: add theme, Lenis, header, and app handoff links"
```

---

### Task 5: Safari frame, product shot, and Keyword Explorer image

**Files:**
- Create: `src/components/marketing/safari-frame.tsx`, `src/components/marketing/product-shot.tsx`
- Create: `public/product/keywords-light.png` (copy from workspace root `keywords-light.png`)
- Test: page renders the frame in Task 6; here typecheck

**Interfaces:**
- Consumes: `useTheme` for `light` / `dark`
- Produces: `ProductShot({ name: ProductShotName; alt: string; priority?: boolean })` where `ProductShotName = "keywords"`
- Missing `keywords-dark.png` is allowed: fall back to `keywords-light.png` (the user-supplied file). Do not 404.

- [ ] **Step 1: Copy the supplied screenshot**

```bash
mkdir public\product
copy keywords-light.png public\product\keywords-light.png
```

This is the real Keyword Explorer UI (seed “Home Decor”, 364 suggestions). Hero and every feature block that lacks its own capture uses this file.

- [ ] **Step 2: Implement SafariFrame + ProductShot**

`src/components/marketing/safari-frame.tsx`:

```tsx
import { cn } from "@/lib/utils";

export function SafariFrame({
  children,
  url = "app.pinitgrow.com/app/keywords",
  className,
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-md", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 truncate rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="bg-muted">{children}</div>
    </figure>
  );
}
```

`src/components/marketing/product-shot.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SafariFrame } from "@/components/marketing/safari-frame";

export type ProductShotName = "keywords";

const alts: Record<ProductShotName, string> = {
  keywords: "PinitGrow Keyword Explorer with an A–Z suggestion table and popularity scores",
};

export function ProductShot({
  name,
  alt,
  priority = false,
  url,
}: {
  name: ProductShotName;
  alt?: string;
  priority?: boolean;
  url?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const src =
    theme === "dark" ? `/product/${name}-dark.png` : `/product/${name}-light.png`;

  return (
    <SafariFrame url={url}>
      <Image
        src={src}
        alt={alt ?? alts[name]}
        width={1440}
        height={900}
        priority={priority}
        className="h-auto w-full"
        onError={(event) => {
          const img = event.currentTarget;
          if (!img.src.endsWith("-light.png")) {
            img.src = `/product/${name}-light.png`;
          }
        }}
      />
    </SafariFrame>
  );
}
```

`next/image` `onError` may not rewrite `src` that way for static imports. Prefer a resolved path that always exists until a dark file is added:

```tsx
const src = `/product/${name}-light.png`;
```

Only switch to `-dark.png` when that file exists. For v1, **always use `keywords-light.png`** unless `public/product/keywords-dark.png` is present. Detect with a small map:

```ts
export const productShots: Record<ProductShotName, { light: string; dark?: string }> = {
  keywords: { light: "/product/keywords-light.png" },
};
```

When a dark PNG is added later, set `dark: "/product/keywords-dark.png"` in that map. Do not invent other shot names until real captures exist.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/safari-frame.tsx src/components/marketing/product-shot.tsx public/product/keywords-light.png
git commit -m "feat: add Safari product frame using Keyword Explorer screenshot"
```

---

### Task 6: Homepage

**Files:**
- Create: `src/components/marketing/section.tsx`, `src/components/marketing/feature-block.tsx`, `src/components/marketing/bento-grid.tsx`, `src/components/marketing/proof-strip.tsx`, `src/components/marketing/how-it-works.tsx`, `src/components/marketing/pricing-teaser.tsx`, `src/components/marketing/cta-banner.tsx`, `src/components/marketing/testimonial-marquee.tsx`, `src/components/marketing/faq-list.tsx`, `src/components/animate/number-ticker.tsx`
- Modify: `src/app/page.tsx`
- Test: `e2e/home.spec.ts` (write first)

**Interfaces:**
- Consumes: `hero`, `proofItems`, `walkthrough`, `bento`, `howItWorks`, `testimonials`, `faqs`, `faqPreviewIds`, `plans`, `ProductShot`, `AppLink`, `Button`
- Produces: the homepage composition in spec section 7

- [ ] **Step 1: Write the failing Playwright spec**

Install Playwright for this Next app (not the leftover research install):

```bash
npm install -D @playwright/test
npx playwright install chromium
```

`playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  webServer: {
    command: "npx next dev --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    env: { NEXT_PUBLIC_APP_URL: "https://app.pinitgrow.com" },
  },
  use: { baseURL: "http://127.0.0.1:3100" },
});
```

`e2e/home.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("home explains the product and hands off to the app", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /keywords, pins, and rankings/i,
  );
  const trial = page.getByRole("link", { name: "Start free trial" }).first();
  await expect(trial).toHaveAttribute("href", "https://app.pinitgrow.com/register");
  await expect(page.getByRole("link", { name: "Log in" }).first()).toHaveAttribute(
    "href",
    "https://app.pinitgrow.com/login",
  );
  await expect(page.getByAltText(/Keyword Explorer/i)).toBeVisible();
});
```

- [ ] **Step 2: Run e2e to verify it fails**

Run: `npx playwright test e2e/home.spec.ts`
Expected: FAIL — heading/CTA/image not on the placeholder page.

- [ ] **Step 3: Implement marketing pieces and the homepage**

`src/components/animate/number-ticker.tsx` (Animate UI recipe: Motion count-up; reduced motion shows the end value):

```tsx
"use client";

import { useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";

export function NumberTicker({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }
    if (!inView) return;
    const controls = animate(motionValue, value, { duration: 0.8 });
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, motionValue, rounded, suffix, value]);

  return (
    <span ref={ref} className="font-mono">
      {value}
      {suffix}
    </span>
  );
}
```

`src/components/marketing/section.tsx`:

```tsx
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-4 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="mb-3 text-sm font-medium text-primary">{eyebrow}</p>
        ) : null}
        {title ? (
          <h2 className="mb-8 text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}
```

`src/components/marketing/feature-block.tsx`:

```tsx
import Link from "next/link";
import { ProductShot, type ProductShotName } from "@/components/marketing/product-shot";
import { cn } from "@/lib/utils";

export function FeatureBlock({
  title,
  body,
  href,
  shot,
  imageLeft = false,
}: {
  title: string;
  body: string;
  href?: string;
  shot: ProductShotName;
  imageLeft?: boolean;
}) {
  return (
    <div className={cn("grid items-center gap-10 md:grid-cols-2", imageLeft && "md:[&>figure]:order-first")}>
      <div>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 text-base leading-7 text-muted-foreground">{body}</p>
        {href ? (
          <Link href={href} className="mt-4 inline-block text-sm font-medium text-primary">
            See all features
          </Link>
        ) : null}
      </div>
      <ProductShot name={shot} />
    </div>
  );
}
```

`FeatureBlock` wraps `ProductShot` in a fragment; `SafariFrame` is a `figure`, so the `md:[&>figure]` selector will not match. Put the frame as the second grid child by having `FeatureBlock` render:

```tsx
<div className={cn("grid items-center gap-10 md:grid-cols-2")}>
  <div className={cn(imageLeft && "md:order-2")}>...</div>
  <div className={cn(imageLeft && "md:order-1")}>
    <ProductShot name={shot} />
  </div>
</div>
```

`src/components/marketing/proof-strip.tsx`:

```tsx
import { NumberTicker } from "@/components/animate/number-ticker";
import { proofItems } from "@/lib/site";

export function ProofStrip() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {proofItems.map((item) => (
        <li key={item.label} className="rounded-xl border border-border bg-card p-5">
          <p className="text-3xl font-semibold tracking-tight">
            <NumberTicker value={item.value} suffix={item.suffix} />
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}
```

Proof numbers: use **364** from the supplied Keyword Explorer screenshot for the first ticker. Other three are counts of product surfaces (3 pin tools, 2 trackers, 2 explorers) — not fake user counts.

`src/components/marketing/bento-grid.tsx`:

```tsx
import { bento } from "@/lib/site";

export function BentoGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bento.map((tile) => (
        <article key={tile.title} className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold">{tile.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{tile.body}</p>
        </article>
      ))}
    </div>
  );
}
```

`src/components/marketing/how-it-works.tsx`:

```tsx
import { howItWorks } from "@/lib/site";

export function HowItWorks() {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {howItWorks.map((item) => (
        <li key={item.step} className="rounded-xl border border-border bg-card p-6">
          <p className="font-mono text-sm text-primary">{item.step}</p>
          <h3 className="mt-2 text-base font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
```

`src/components/marketing/pricing-teaser.tsx`:

```tsx
import Link from "next/link";
import { AppLink } from "@/components/marketing/app-link";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/plans";
import { cn } from "@/lib/utils";

export function PricingTeaser() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.code}
            className={cn(
              "flex flex-col rounded-xl border border-border bg-card p-6",
              plan.featured && "border-primary",
            )}
          >
            {plan.featured ? (
              <p className="mb-2 text-xs font-medium text-primary">Most popular</p>
            ) : null}
            <h3 className="text-base font-semibold">{plan.name}</h3>
            <p className="mt-2 text-3xl font-semibold tracking-tight">
              {plan.priceLabel}
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{plan.pitch}</p>
            <Button className="mt-6" asChild>
              <AppLink path="/register">Start free trial</AppLink>
            </Button>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-sm">
        <Link href="/pricing" className="font-medium text-primary">
          Compare plans
        </Link>
      </p>
    </div>
  );
}
```

`src/components/marketing/faq-list.tsx`:

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqList({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

`src/components/marketing/cta-banner.tsx`:

```tsx
import { AppLink } from "@/components/marketing/app-link";
import { Button } from "@/components/ui/button";

export function CtaBanner({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center">
      <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{body}</p>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild>
          <AppLink path="/register">Start free trial</AppLink>
        </Button>
        <Button variant="outline" asChild>
          <AppLink path="/login">Log in</AppLink>
        </Button>
      </div>
    </div>
  );
}
```

`src/components/marketing/testimonial-marquee.tsx`:

```tsx
import { testimonials } from "@/lib/site";

export function TestimonialMarquee() {
  return (
    <div className="overflow-hidden">
      <p className="mb-4 text-xs text-muted-foreground">Illustrative quotes — replace when customer names are available.</p>
      <div className="flex gap-4 motion-safe:animate-none">
        {testimonials.map((item) => (
          <blockquote
            key={item.name}
            className="min-w-[280px] flex-1 rounded-xl border border-border bg-card p-5 text-sm leading-6"
          >
            <p>{item.quote}</p>
            <footer className="mt-3 text-xs text-muted-foreground">{item.name}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
```

Do not CSS-marquee infinitely if it hides the “illustrative” label. Static three-up grid is acceptable and matches reduced-motion. If a CSS marquee is added, pause on hover and disable under `prefers-reduced-motion`.

`src/app/page.tsx`:

```tsx
import { BentoGrid } from "@/components/marketing/bento-grid";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { FaqList } from "@/components/marketing/faq-list";
import { FeatureBlock } from "@/components/marketing/feature-block";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { AppLink } from "@/components/marketing/app-link";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { ProductShot } from "@/components/marketing/product-shot";
import { ProofStrip } from "@/components/marketing/proof-strip";
import { Section } from "@/components/marketing/section";
import { TestimonialMarquee } from "@/components/marketing/testimonial-marquee";
import { Button } from "@/components/ui/button";
import { faqs, faqPreviewIds, hero, walkthrough } from "@/lib/site";
import Link from "next/link";

export default function HomePage() {
  const preview = faqPreviewIds.map((i) => faqs[i]);

  return (
    <main>
      <section className="py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[var(--content-max-width)] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-medium text-primary">{hero.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{hero.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <AppLink path="/register">Start free trial</AppLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{hero.trialNote}</p>
          </div>
          <ProductShot name="keywords" priority />
        </div>
      </section>

      <Section>
        <ProofStrip />
      </Section>

      <Section title="Research that matches how Pinterest actually works">
        <div className="space-y-20">
          {walkthrough.map((item, i) => (
            <FeatureBlock
              key={item.title}
              title={item.title}
              body={item.body}
              href={item.href}
              shot={item.shot}
              imageLeft={i % 2 === 1}
            />
          ))}
        </div>
      </Section>

      <Section>
        <TestimonialMarquee />
      </Section>

      <Section title="The rest of the toolkit">
        <BentoGrid />
      </Section>

      <Section id="how-it-works" title="How it works">
        <HowItWorks />
      </Section>

      <Section title="Simple monthly plans">
        <PricingTeaser />
      </Section>

      <Section title="Questions">
        <FaqList items={preview} />
        <p className="mt-6 text-sm">
          <Link href="/faq" className="font-medium text-primary">
            See all
          </Link>
        </p>
      </Section>

      <Section>
        <CtaBanner
          title="Start researching Pinterest in the browser"
          body="Three days, no card. The workspace is waiting on app.pinitgrow.com."
        />
      </Section>
    </main>
  );
}
```

- [ ] **Step 4: Run e2e**

Run: `npx playwright test e2e/home.spec.ts`
Expected: PASS

Run: `npx tsc --noEmit`
Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/components/marketing src/components/animate e2e playwright.config.ts
git commit -m "feat: build PinitGrow marketing homepage"
```

---

### Task 7: Features, pricing, FAQ, 404

**Files:**
- Create: `src/app/features/page.tsx`, `src/app/pricing/page.tsx`, `src/app/faq/page.tsx`, `src/app/not-found.tsx`, `src/components/marketing/pricing-card.tsx`
- Modify: none required beyond new pages
- Test: extend `e2e/home.spec.ts` or add `e2e/pages.spec.ts`

**Interfaces:**
- Consumes: `tools`, `plans`, `faqs`, `trialDays`, `CtaBanner`, `FaqList`, `FeatureBlock`/`ProductShot`
- Produces: the three inner routes from spec sections 8–10

- [ ] **Step 1: Write failing e2e**

`e2e/pages.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("features lists Keyword Explorer", async ({ page }) => {
  await page.goto("/features");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/every research tool/i);
  await expect(page.getByRole("heading", { name: "Keyword Explorer" })).toBeVisible();
});

test("pricing shows live plan prices", async ({ page }) => {
  await page.goto("/pricing");
  await expect(page.getByText("$9.99")).toBeVisible();
  await expect(page.getByText("$29.99")).toBeVisible();
  await expect(page.getByText("$85.99")).toBeVisible();
  await expect(page.getByRole("link", { name: "Start free trial" }).first()).toHaveAttribute(
    "href",
    "https://app.pinitgrow.com/register",
  );
});

test("faq includes trial length", async ({ page }) => {
  await page.goto("/faq");
  await expect(page.getByText("3-day trial", { exact: false })).toBeVisible();
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx playwright test e2e/pages.spec.ts`
Expected: FAIL 404 on those routes.

- [ ] **Step 3: Implement pages**

`src/app/features/page.tsx`:

```tsx
import { CtaBanner } from "@/components/marketing/cta-banner";
import { ProductShot } from "@/components/marketing/product-shot";
import { Section } from "@/components/marketing/section";
import { tools } from "@/lib/site";

export default function FeaturesPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Every research tool in one workspace.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          Cloud access, not a desktop install.
        </p>
      </Section>
      {tools.map((tool, i) => (
        <Section key={tool.title}>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className={i % 2 ? "md:order-2" : undefined}>
              <h2 className="text-xl font-semibold tracking-tight">{tool.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">You type: </span>
                {tool.input}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">You get: </span>
                {tool.output}
              </p>
            </div>
            <ProductShot name={tool.shot} />
          </div>
          {tool.title === "Top Pins" ? (
            <div className="mt-12">
              <CtaBanner
                title="Try Top Pins on your niche"
                body="Open the 3-day trial and run a keyword you already publish."
              />
            </div>
          ) : null}
        </Section>
      ))}
      <Section>
        <CtaBanner
          title="The workspace is on app.pinitgrow.com"
          body="Create an account in the app. This site does not take passwords."
        />
      </Section>
    </main>
  );
}
```

`src/components/marketing/pricing-card.tsx`:

```tsx
import { AppLink } from "@/components/marketing/app-link";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/lib/plans";
import { cn } from "@/lib/utils";

export function PricingCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border border-border bg-card p-6",
        plan.featured && "border-primary",
      )}
    >
      {plan.featured ? <p className="mb-2 text-xs font-medium text-primary">Most popular</p> : null}
      <h2 className="text-xl font-semibold tracking-tight">{plan.name}</h2>
      <p className="mt-2 text-3xl font-semibold tracking-tight">
        {plan.priceLabel}
        <span className="text-sm font-normal text-muted-foreground">/mo</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{plan.pitch}</p>
      <ul className="mt-6 space-y-2 text-sm">
        {plan.rows.map((row) => (
          <li key={row.label} className="flex justify-between gap-4 border-b border-border py-2">
            <span className="text-muted-foreground">{row.label}</span>
            <span className="font-medium">{row.value}</span>
          </li>
        ))}
      </ul>
      <Button className="mt-6" asChild>
        <AppLink path="/register">Start free trial</AppLink>
      </Button>
    </article>
  );
}
```

`src/app/pricing/page.tsx`:

```tsx
import { PricingCard } from "@/components/marketing/pricing-card";
import { Section } from "@/components/marketing/section";
import { FaqList } from "@/components/marketing/faq-list";
import { plans, trialDays } from "@/lib/plans";
import { faqs } from "@/lib/site";

export default function PricingPage() {
  const billingFaqs = faqs.filter((item) =>
    /trial|app\?|happens when the trial/i.test(item.q),
  );

  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Choose the research capacity you need.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          {trialDays}-day trial on every plan. No card. Daily limits reset on your timezone.
        </p>
      </Section>
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.code} plan={plan} />
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Full product access for 3 days, with the same tool set as paid plans. Limits apply.
          Checkout will open after production billing is approved; trial accounts work now.
        </p>
      </Section>
      <Section title="Compare">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Limit</th>
                {plans.map((plan) => (
                  <th key={plan.code} className="px-4 py-3 font-medium">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans[0].rows.map((row, i) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="px-4 py-3 text-muted-foreground">{row.label}</td>
                  {plans.map((plan) => (
                    <td key={plan.code} className="px-4 py-3">
                      {plan.rows[i]?.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Billing">
        <FaqList items={billingFaqs} />
      </Section>
    </main>
  );
}
```

`src/app/faq/page.tsx`:

```tsx
import { FaqList } from "@/components/marketing/faq-list";
import { Section } from "@/components/marketing/section";
import { faqs } from "@/lib/site";

export default function FaqPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">FAQ</h1>
        <div className="mt-8">
          <FaqList items={faqs} />
        </div>
      </Section>
    </main>
  );
}
```

`src/app/not-found.tsx`:

```tsx
import { AppLink } from "@/components/marketing/app-link";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        That URL is not part of the PinitGrow marketing site.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button variant="outline" asChild>
          <AppLink path="/register">Start free trial</AppLink>
        </Button>
      </div>
    </main>
  );
}
```

Mobile nav: if header links are `hidden md:flex`, add a simple overflow menu on small screens (Button ghost “Menu” that lists `nav` plus trial). Do not ship a desktop-only nav.

- [ ] **Step 4: Run e2e + typecheck**

Run: `npx playwright test e2e/pages.spec.ts`
Expected: PASS

Run: `npx tsc --noEmit`
Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add src/app/features src/app/pricing src/app/faq src/app/not-found.tsx src/components/marketing/pricing-card.tsx e2e/pages.spec.ts
git commit -m "feat: add features, pricing, FAQ, and 404 pages"
```

---

### Task 8: Browser verification and polish

**Files:**
- Modify: header mobile nav if missing; `src/app/globals.css` if focus rings fail
- Test: Playwright + manual browser pass

**Interfaces:**
- Consumes: running `next dev`
- Produces: verified light/dark/responsive site

- [ ] **Step 1: Run the full automated suite**

Run:

```bash
npx vitest run
npx tsc --noEmit
npx playwright test
```

Expected: all PASS.

- [ ] **Step 2: Manual browser pass (required)**

Start `npx next dev`. Check:

- `/` `/features` `/pricing` `/faq` at ~375, 768, 1024, 1440
- Light, dark, and system theme; header toggle cycles all three
- Hero shows `keywords-light.png` in the Safari frame
- Every `Start free trial` → `https://app.pinitgrow.com/register`
- Every `Log in` → `https://app.pinitgrow.com/login`
- Keyboard: header links, accordion, theme toggle, visible focus
- OS reduced-motion: no Lenis smoothing
- No `bg-zinc` / `text-gray` on chrome

Fix any miss in the same task (nav overflow, contrast, image overflow).

- [ ] **Step 3: Commit polish only if files changed**

```bash
git add -u
git commit -m "fix: marketing site theme, motion, and mobile nav polish"
```

Skip the commit if `git status` is clean.

---

## Spec coverage self-review

| Spec section | Task |
|---|---|
| Origins / `NEXT_PUBLIC_APP_URL` / register+login | 2, 4, 6, 7 |
| Stack Next+Tailwind+shadcn+Animate UI+Lenis | 1, 3, 4, 6 |
| Tokens, Geist, light/dark | 1, 4 |
| Header/footer, no legal fake links | 4 |
| Homepage sections 1–10 | 6 |
| Features tools 1–9 + mid CTA | 7 |
| Pricing cards + comparison + checkout note | 2, 7 |
| FAQ questions | 2, 7 |
| Safari frame + `keywords-light.png` | 5, 6 |
| 404, reduced motion, a11y | 4, 7, 8 |
| Tests / typecheck / browser | 1–8 |
| Do not edit Nuxt app | all |

Placeholders removed: dark screenshots are explicitly optional with light fallback; extra product shots reuse `keywords` until real captures exist; marquee may be a static grid.

Type names: `Plan`, `PlanCode`, `PlanRow`, `ProductShotName`, `appUrl(path)`, `AppLink.path` union of `/register` `/login` `/plans`.
