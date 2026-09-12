# PinitGrow frontend

The marketing site lives in this folder. The product application is separate; signup and login continue to use NEXT_PUBLIC_APP_URL, falling back to https://app.pinitgrow.com.

## Design

The homepage now follows a concise research-to-purchase journey: value proposition, interactive product preview, three research stories, all eleven tools, audience use cases, pricing, FAQs, and a final trial invitation. It uses the supplied product screenshots, warm neutral surfaces, restrained brand red, Inter typography, and a shared spacing system.

Marketing tokens and responsive styles are in src/app/globals.css. Shared buttons, headings, image frames, header, and footer provide consistency across the supporting pages. Product screenshots preserve their original aspect ratios. Mobile previews can be scrolled horizontally.

Plans and trial limits remain sourced from src/lib/plans.ts. The homepage shows a concise comparison; /pricing includes the full entitlement table. No unverified customer quotes or customer-count claims are displayed on the homepage.

## Run and verify

- npm run dev — development preview
- npm run build — optimized production build with TypeScript validation
- npm run start -- --port 3001 — production preview
- npm run lint
- npm run test
- npm run test:e2e

Browser tests use bundled Playwright Chromium by default. Set PLAYWRIGHT_CHANNEL=msedge to use installed Microsoft Edge. Set PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 to test an already-running production preview. The suite checks conversion links, keyboard-accessible preview tabs, FAQ disclosures, mobile navigation, responsive overflow, and every public page.

The redesign is local and has not been deployed. Existing application authentication and billing are outside the marketing frontend.
