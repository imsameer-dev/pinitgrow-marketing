# Design System Skill

## Purpose

Use this skill whenever designing, building, reviewing, or refactoring a web interface.

The goal is to produce interfaces that are:

- Visually consistent
- Modern and polished
- Accessible
- Responsive
- Easy to maintain
- Token-driven instead of hardcoded
- Built from reusable primitives
- Consistent across pages, features, and developers

This skill applies to dashboards, SaaS products, landing pages, admin panels, marketplaces, internal tools, consumer apps, and general web applications.

---

# Preferred Design Stack

Use this hierarchy:

```text
Next.js
   ↓
Tailwind CSS
   ↓
shadcn/ui
   ↓
Base UI
   ↓
Project Design System
```

Each layer has a specific responsibility.

## 1. Next.js

Next.js is the application and rendering layer.

Use it for:

- Routing
- Layouts
- Server Components
- Client Components
- Data fetching
- Loading states
- Error states
- Metadata
- Image optimization
- Fonts
- Application structure

UI architecture should follow the application architecture rather than creating one giant global component layer.

Prefer Server Components by default.

Use Client Components only when interaction, browser APIs, local state, or client-side libraries require them.

---

## 2. Tailwind CSS

Tailwind is the styling implementation layer.

Use Tailwind for:

- Layout
- Spacing
- Typography
- Responsive behavior
- State styling
- Container queries when appropriate
- Design-token consumption
- Component composition

Tailwind utilities should consume design-system variables rather than introducing arbitrary visual decisions.

Avoid random values such as:

```tsx
className="rounded-[13px] text-[#18181A] mt-[17px]"
```

Prefer semantic tokens:

```tsx
className="rounded-lg text-foreground mt-4"
```

Arbitrary values are acceptable only when there is a real design requirement that cannot reasonably map to an existing token.

---

# 3. shadcn/ui

shadcn/ui is the main reusable component layer.

Use shadcn components as editable source code, not as an untouchable third-party component library.

Prefer extending an existing shadcn component before creating another implementation of the same pattern.

Common examples:

- Button
- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Switch
- Dialog
- Drawer
- Sheet
- Dropdown Menu
- Popover
- Tooltip
- Tabs
- Accordion
- Table
- Card
- Badge
- Alert
- Breadcrumb
- Pagination
- Skeleton
- Toast
- Command palette

Do not duplicate these patterns with page-specific markup unless there is a strong reason.

Project components should visually inherit from the project's design tokens.

---

# 4. Base UI

Base UI is the headless primitive and interaction layer.

Use Base UI when:

- A shadcn component is based on or compatible with the primitive you need.
- A custom interaction needs strong accessibility behavior.
- You need low-level control over state and markup.
- You need to create a reusable project-specific component without rebuilding keyboard, focus, dismissal, or ARIA behavior from scratch.

Base UI handles behavior.

The project design system handles appearance.

Do not bypass accessible primitives merely to make styling easier.

---

# 5. Project Design System

The project design system is the highest-level source of visual truth.

It defines:

- Color
- Typography
- Spacing
- Radius
- Borders
- Shadows
- Motion
- Density
- Component variants
- Content hierarchy
- Page structure
- Interaction patterns
- Responsive behavior

Every feature should look like it belongs to the same product.

---

# Core Design Principle

## Build from tokens, not isolated decisions

Never repeatedly decide:

- Which gray should this use?
- How rounded should this card be?
- How much padding should this section have?
- Which blue should this button use?
- What shadow should this dropdown have?
- What font size should this label use?

Those decisions belong in the design system.

Components consume the system.

Pages compose the components.

---

# CSS Variable Architecture

Define semantic tokens centrally.

Recommended structure:

```css
:root {
  /* Base surfaces */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;

  --surface: 0 0% 100%;
  --surface-subtle: 210 40% 98%;
  --surface-muted: 210 40% 96%;

  /* Cards / overlays */
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;

  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;

  /* Brand */
  --primary: 222 89% 55%;
  --primary-foreground: 0 0% 100%;

  /* Secondary */
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;

  /* Muted */
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;

  /* Accent */
  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;

  /* Status */
  --success: 142 71% 45%;
  --success-foreground: 0 0% 100%;

  --warning: 38 92% 50%;
  --warning-foreground: 26 83% 14%;

  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;

  --info: 199 89% 48%;
  --info-foreground: 0 0% 100%;

  /* UI */
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 222 89% 55%;

  /* Radius */
  --radius-xs: 0.375rem;
  --radius-sm: 0.5rem;
  --radius-md: 0.625rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.25rem;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgb(0 0 0 / 0.04);
  --shadow-sm: 0 1px 3px rgb(0 0 0 / 0.08);
  --shadow-md: 0 8px 24px rgb(0 0 0 / 0.08);
  --shadow-lg: 0 18px 48px rgb(0 0 0 / 0.12);

  /* Layout */
  --page-max-width: 1440px;
  --content-max-width: 1200px;

  /* Motion */
  --duration-fast: 120ms;
  --duration-normal: 180ms;
  --duration-slow: 280ms;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

Dark mode should override semantic meaning rather than requiring components to use separate hardcoded dark colors.

```css
.dark {
  --background: 222 47% 7%;
  --foreground: 210 40% 98%;

  --surface: 222 47% 9%;
  --surface-subtle: 222 32% 11%;
  --surface-muted: 217 25% 15%;

  --card: 222 47% 9%;
  --card-foreground: 210 40% 98%;

  --popover: 222 47% 9%;
  --popover-foreground: 210 40% 98%;

  --secondary: 217 25% 15%;
  --secondary-foreground: 210 40% 98%;

  --muted: 217 25% 15%;
  --muted-foreground: 215 20% 65%;

  --accent: 217 25% 15%;
  --accent-foreground: 210 40% 98%;

  --border: 217 25% 18%;
  --input: 217 25% 18%;
}
```

---

# Semantic Tokens Over Raw Colors

Prefer:

```tsx
bg-background
bg-card
bg-muted
text-foreground
text-muted-foreground
border-border
bg-primary
text-primary-foreground
bg-destructive
```

Avoid repeated direct palette values:

```tsx
bg-zinc-50
text-zinc-950
border-gray-200
bg-blue-600
```

Raw palette utilities can be used for one-off illustrations, data visualizations, or explicitly branded content.

Core UI should use semantic tokens.

---

# Token Naming Rules

Names should describe purpose, not appearance.

Good:

```text
background
foreground
surface
muted
primary
success
warning
destructive
border
ring
```

Avoid:

```text
light-gray
dark-gray
blue-button
red-error
white-card
```

Semantic tokens survive redesigns.

Appearance-based names do not.

---

# Design Consistency Rules

## 1. One spacing language

Prefer the Tailwind spacing scale.

Common UI spacing:

```text
1 = 4px
2 = 8px
3 = 12px
4 = 16px
5 = 20px
6 = 24px
8 = 32px
10 = 40px
12 = 48px
16 = 64px
20 = 80px
24 = 96px
```

Recommended usage:

- Icon-to-label gap: `gap-2`
- Related controls: `gap-2` or `gap-3`
- Form field groups: `gap-4`
- Card internal padding: `p-4`, `p-5`, or `p-6`
- Section blocks: `gap-6` to `gap-10`
- Major page sections: `py-12` to `py-24`

Do not use many neighboring arbitrary values without reason.

---

## 2. One radius language

A product should not randomly mix:

```text
4px
7px
10px
13px
16px
22px
```

Choose a limited radius hierarchy.

Example:

- Small controls: `rounded-md`
- Buttons / inputs: `rounded-lg`
- Cards: `rounded-xl`
- Large panels / hero containers: `rounded-2xl`
- Pills: `rounded-full`

---

## 3. One shadow language

Use borders first.

Use shadows to communicate elevation, not decoration.

Recommended hierarchy:

- Inputs/cards: border, little or no shadow
- Popovers/dropdowns: small shadow
- Dialogs/drawers: medium/large shadow
- Floating interactive objects: intentional elevation

Avoid giving every card a large shadow.

---

# Typography System

Typography must establish hierarchy before decoration.

Recommended levels:

## Display

Use for marketing hero text only.

```tsx
text-4xl font-semibold tracking-tight
md:text-5xl
lg:text-6xl
```

## Page title

```tsx
text-2xl font-semibold tracking-tight
md:text-3xl
```

## Section title

```tsx
text-xl font-semibold tracking-tight
```

## Card title

```tsx
text-base font-semibold
```

## Body

```tsx
text-sm leading-6
```

or

```tsx
text-base leading-7
```

## Secondary text

```tsx
text-sm text-muted-foreground
```

## Label

```tsx
text-sm font-medium
```

## Caption / metadata

```tsx
text-xs text-muted-foreground
```

Avoid using font weight as the only hierarchy mechanism.

Use size, spacing, contrast, grouping, and position together.

---

# Font Rules

Prefer one primary UI font unless branding requires more.

For Next.js, load fonts through `next/font`.

Avoid:

- Loading many font families
- Using a decorative font for normal interface text
- Extremely light font weights
- Tiny body text
- Excessive uppercase text

Minimum practical UI text is normally around `text-sm`.

Use `text-xs` mainly for metadata, compact labels, or secondary supporting information.

---

# Layout System

Every page should have a predictable outer structure.

Recommended application layout:

```tsx
<div className="min-h-screen bg-background text-foreground">
  <Header />

  <main className="mx-auto w-full max-w-[var(--page-max-width)] px-4 sm:px-6 lg:px-8">
    {children}
  </main>
</div>
```

For content-heavy pages:

```tsx
<div className="mx-auto w-full max-w-[var(--content-max-width)]">
```

Do not let every page invent its own width and horizontal padding.

---

# Responsive Design Rules

Design mobile-first.

Default styles represent small screens.

Enhance progressively:

```text
base
sm
md
lg
xl
2xl
```

Do not blindly convert desktop designs into vertically stacked mobile layouts.

At each breakpoint reconsider:

- Information priority
- Navigation
- Table behavior
- Toolbar density
- Form layout
- Card grouping
- Sidebars
- Empty states
- Modal vs drawer behavior

Recommended behavior:

- Desktop dialog may become mobile drawer.
- Desktop table may become horizontally scrollable or convert into cards.
- Multi-column forms should collapse logically.
- Secondary actions may move into an overflow menu.
- Filters may move into a sheet/drawer.

---

# Component Architecture

Use four conceptual levels.

## Level 1 — Primitives

Examples:

- Button
- Input
- Label
- Badge
- Separator
- Checkbox
- Avatar

Mostly shadcn/Base UI-backed.

## Level 2 — Composite Components

Examples:

- SearchInput
- DateRangePicker
- StatusBadge
- UserMenu
- FormField
- ConfirmDialog
- EmptyState
- DataTableToolbar

## Level 3 — Feature Components

Examples:

```text
OrderSummary
CustomerCard
TradeTicket
AnalyticsOverview
InvoiceDetails
UserPermissionsPanel
```

Feature components can understand domain concepts.

## Level 4 — Page Composition

Pages compose feature components.

Pages should not contain hundreds of lines of repeated low-level UI markup.

---

# Component Reuse Rule

Before creating a component, check:

1. Does shadcn already provide it?
2. Does Base UI provide the accessible primitive?
3. Does the project already contain something similar?
4. Can an existing component support this through a variant?
5. Is the new component genuinely reusable?

Do not create abstractions for trivial one-use markup.

Do create abstractions when repetition introduces visual or behavioral inconsistency.

---

# Variant-Driven Components

Use variants rather than copying components.

Example:

```tsx
<Button variant="default" />
<Button variant="secondary" />
<Button variant="outline" />
<Button variant="ghost" />
<Button variant="destructive" />
```

Also use controlled sizes:

```tsx
<Button size="sm" />
<Button size="default" />
<Button size="lg" />
<Button size="icon" />
```

Avoid:

```tsx
<Button className="h-[41px] bg-blue-500 px-[19px]" />
<Button className="h-[39px] bg-[#246BFD] px-5" />
```

for different pages unless those differences have semantic meaning.

---

# Buttons

Buttons must communicate priority.

Recommended hierarchy:

## Primary

One main action in a local area.

Examples:

- Save
- Continue
- Create project
- Publish

## Secondary

Supporting action.

## Outline

Lower emphasis action.

## Ghost

Toolbar/navigation/tertiary action.

## Destructive

Dangerous action.

Avoid placing multiple visually dominant primary buttons next to each other unless they are genuinely equal actions.

---

# Button Content

Prefer short action verbs:

Good:

```text
Save
Create project
Add member
Send invite
Export
Retry
```

Avoid vague labels:

```text
Okay
Yes
Submit
Click here
Proceed
```

when a clearer action is available.

---

# Forms

A form field generally contains:

```text
Label
Control
Description (optional)
Validation message (when needed)
```

Keep field structure consistent.

Good:

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
  <p className="text-sm text-muted-foreground">
    We will use this for account notifications.
  </p>
</div>
```

Do not rely on placeholders as labels.

Placeholders demonstrate format or examples.

Labels identify fields.

---

# Form Layout

Use:

- One column for complex forms.
- Two columns for strongly related short fields on larger screens.
- Logical section grouping.
- Clear section titles when forms are long.
- Sticky actions only when long forms benefit from them.

Do not build dense four-column forms simply because desktop space exists.

---

# Input States

Every interactive field should support:

- Default
- Hover
- Focus
- Filled
- Disabled
- Invalid
- Read-only when relevant

Focus must remain visible.

Never remove focus outlines without replacing them with an accessible focus indicator.

---

# Cards

A card must represent a meaningful visual group.

Do not wrap every section in a card.

Use cards when they communicate:

- Grouping
- Separation
- Clickability
- Entity boundaries
- Summary modules

Prefer:

```tsx
<Card>
  <CardHeader />
  <CardContent />
  <CardFooter />
</Card>
```

Maintain consistent card padding across the application.

---

# Tables

Use tables for structured comparison, not general layout.

A table should consider:

- Header hierarchy
- Alignment
- Numeric alignment
- Sorting
- Selection
- Pagination
- Loading state
- Empty state
- Error state
- Overflow
- Mobile behavior
- Row actions

Right-align numbers when it improves scanning.

Do not center all table content by default.

---

# Dashboard Design

Dashboard hierarchy should normally be:

```text
Page heading
↓
Primary actions / time filters
↓
Top-level KPI summary
↓
Primary visualization or work area
↓
Secondary analysis
↓
Detailed tables / activity
```

Do not give every widget equal visual weight.

The most important information should be identifiable within a few seconds.

---

# Navigation

Navigation should answer:

- Where am I?
- What can I access?
- What is selected?
- How do I go back?
- Where are account/global controls?

Sidebar navigation should have:

- Consistent icon size
- Clear selected state
- Logical grouping
- Predictable collapsed behavior
- Tooltips when icon-only

Avoid using different navigation styles on different application pages without a product reason.

---

# Iconography

Use one icon family wherever possible.

Recommended for shadcn-style projects:

```text
Lucide
```

Rules:

- Keep icon stroke style consistent.
- Common button icon size: 16px.
- Common standalone control icon: 16–20px.
- Do not mix filled, outlined, 3D, and hand-drawn icon styles.
- Icons should support text, not replace clear labels unnecessarily.

---

# Visual Hierarchy

Every screen needs a clear hierarchy.

Use these tools in order:

1. Position
2. Grouping
3. Spacing
4. Typography
5. Contrast
6. Size
7. Color
8. Decoration

Do not rely on bright colors to create hierarchy that spacing and typography should solve.

---

# Color Usage

Use color intentionally.

Color should communicate:

- Brand
- Selection
- Status
- Interaction
- Emphasis

Avoid large amounts of saturated color in data-heavy interfaces.

Most professional product interfaces should be mostly neutral with deliberate accent usage.

---

# Status Colors

Use consistent meaning.

Example:

```text
Success → green semantic token
Warning → amber semantic token
Error / destructive → red semantic token
Info → blue semantic token
Neutral → muted semantic token
```

Never use color as the only status indicator.

Pair color with text, an icon, shape, or label.

---

# Borders

Borders should usually use:

```tsx
border-border
```

Use stronger borders only when hierarchy requires them.

Avoid a mixture of many border tones throughout the same screen.

---

# Empty States

Every data-driven feature should consider an empty state.

A good empty state answers:

1. What is missing?
2. Why is it empty?
3. What should the user do next?

Example structure:

```text
Icon
Title
Short explanation
Primary action
Optional secondary action
```

Do not show a blank box.

---

# Loading States

Prefer skeletons when the content structure is predictable.

Use spinners for:

- Short isolated actions
- Button submission states
- Small indeterminate processes

Avoid replacing an entire complex page with a giant centered spinner if a skeleton can preserve layout.

Prevent layout shifts where practical.

---

# Error States

Errors should be:

- Human-readable
- Specific
- Recoverable where possible
- Close to the source of the problem

Prefer:

```text
We couldn't load transactions.
Try again.
```

over:

```text
Error 500.
```

Technical details may be logged separately.

---

# Toasts

Use toasts for temporary feedback such as:

- Saved
- Copied
- Deleted
- Invitation sent
- Background operation completed

Do not use a toast for information that the user must retain or act on later.

Important failures should also remain visible in context.

---

# Modals, Dialogs, Sheets, and Drawers

Use a Dialog when the task is:

- Focused
- Short
- Blocking
- Important

Use a Sheet/Drawer when:

- Context should remain partially visible
- The content is taller
- It behaves like a side inspector
- Mobile interaction benefits from a bottom drawer

Do not put an entire full application page inside a modal.

---

# Accessibility

Accessibility is part of the design system, not a final QA step.

Minimum requirements:

- Semantic HTML
- Keyboard access
- Visible focus
- Correct labels
- Appropriate ARIA through accessible primitives
- Sufficient contrast
- Logical heading order
- Accessible error messaging
- Non-color status indicators
- Reduced-motion respect
- Touch-friendly hit areas

Target WCAG AA contrast for normal product interfaces.

---

# Touch Targets

Interactive targets should normally be at least approximately:

```text
40 × 40px
```

Prefer roughly `44 × 44px` for touch-heavy mobile interfaces where practical.

An icon can visually be 16px while its button hit area remains much larger.

---

# Motion

Motion should explain change, not show off.

Use motion for:

- Opening/closing
- Reordering
- Selection feedback
- State transitions
- Context preservation

Default animation timing:

```text
Fast: 120ms
Normal: 180ms
Slow: 280ms
```

Avoid long UI animations.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# Micro-Interaction Rule

Every interaction should provide feedback.

Examples:

- Button → hover/pressed/loading
- Input → focus/invalid
- Row → hover/selected
- Copy action → copied state
- Save action → loading/success/error
- Destructive action → confirmation where appropriate

A clickable interface should feel clickable.

---

# Content Design

UI copy is part of design.

Prefer:

```text
Create account
Delete project
Invite teammate
No transactions yet
Search customers
```

Avoid:

```text
Perform Creation
Are you sure you wish to proceed?
No data is currently available for display
```

Use plain language.

Be concise without becoming unclear.

---

# Density

Match density to product context.

## Marketing

More whitespace, larger type, stronger imagery.

## SaaS / business app

Moderate density.

## Admin / trading / analytics interface

Higher density is acceptable, but hierarchy and scanability must remain strong.

Dense does not mean cramped.

---

# Data Visualization

For charts:

- Use a small, consistent palette.
- Highlight the series that matters.
- De-emphasize gridlines.
- Use readable axis labels.
- Use formatting appropriate to the data.
- Avoid unnecessary 3D effects.
- Avoid rainbow palettes.
- Ensure tooltip styling matches the design system.

Do not add charts simply because a dashboard has empty space.

Every chart must answer a question.

---

# CSS and Tailwind Discipline

## Avoid excessive arbitrary values

Bad:

```tsx
className="w-[317px] mt-[23px] rounded-[11px]"
```

Better:

```tsx
className="w-full max-w-sm mt-6 rounded-xl"
```

## Avoid excessive inline styles

Bad:

```tsx
style={{
  padding: "17px",
  color: "#111827",
  borderRadius: "13px",
}}
```

Prefer tokens and utilities.

## Avoid `!important`

Fix specificity or component architecture instead.

Use `!important` only as a last resort when integrating something outside your control.

---

# CSS Variable First Rule

When a visual value appears in multiple places or represents a product-level decision, make it a token.

Examples:

```text
Brand color
Page background
Card background
Text colors
Border
Radius
Navigation width
Header height
Shadow
Chart colors
Status colors
```

Do not create a variable for every single pixel value.

Tokens represent decisions, not implementation trivia.

---

# Suggested Extended Tokens

Projects may add:

```css
:root {
  --header-height: 4rem;
  --sidebar-width: 16rem;
  --sidebar-width-collapsed: 4.5rem;

  --chart-1: 221 83% 53%;
  --chart-2: 160 84% 39%;
  --chart-3: 38 92% 50%;
  --chart-4: 280 65% 60%;
  --chart-5: 0 72% 51%;
}
```

Keep project-specific tokens centralized.

---

# Design-System Folder Structure

Recommended structure:

```text
src/
├── app/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   │
│   ├── common/
│   │   ├── empty-state.tsx
│   │   ├── page-header.tsx
│   │   ├── status-badge.tsx
│   │   └── ...
│   │
│   └── features/
│       ├── users/
│       ├── billing/
│       └── ...
│
├── lib/
│   ├── utils.ts
│   └── design-system/
│
└── styles/
    └── globals.css
```

`components/ui` should remain the foundational reusable layer.

Feature-specific behavior belongs closer to the feature.

---

# Component API Design

Good components expose meaningful APIs.

Good:

```tsx
<StatusBadge status="active" />
```

Less desirable:

```tsx
<Badge className="border-green-200 bg-green-50 text-green-700">
  Active
</Badge>
```

repeated across dozens of files.

Encode repeated design decisions once.

---

# Page Header Pattern

Use a consistent structure:

```tsx
<PageHeader
  title="Customers"
  description="Manage customer accounts and access."
  actions={<Button>Add customer</Button>}
/>
```

This is preferable to recreating heading spacing and action alignment on every page.

---

# State Coverage

When designing or implementing a component, consider all relevant states:

```text
Default
Hover
Focus
Active
Selected
Disabled
Loading
Empty
Error
Success
Read-only
Expanded
Collapsed
```

Do not design only the happy path.

---

# Responsive State Coverage

Test at minimum:

```text
~375px
~768px
~1024px
~1440px
```

Also test unusually long:

- Names
- Email addresses
- Labels
- Table values
- Error messages

Interfaces should not depend on perfect placeholder content.

---

# Design Review Checklist

Before considering a UI complete, check:

- [ ] Does it use existing shadcn/Base UI primitives where appropriate?
- [ ] Are product colors coming from semantic tokens?
- [ ] Are spacing values consistent?
- [ ] Are radius values consistent?
- [ ] Is typography hierarchy obvious?
- [ ] Is the primary action obvious?
- [ ] Are hover states present?
- [ ] Are focus states visible?
- [ ] Are loading states handled?
- [ ] Are empty states handled?
- [ ] Are errors handled?
- [ ] Is mobile behavior intentional?
- [ ] Is dark mode correct if supported?
- [ ] Is keyboard navigation usable?
- [ ] Does the page avoid unnecessary visual noise?
- [ ] Are repeated patterns turned into reusable components?
- [ ] Are arbitrary CSS values justified?
- [ ] Does the result look like the rest of the product?

---

# Design Decision Priority

When making a UI decision, follow this order:

1. Existing project design-system rule
2. Existing project component
3. Existing shadcn component
4. Base UI primitive
5. Existing design token
6. Common product-design convention
7. New reusable pattern
8. One-off custom styling

Do not start at step 8.

---

# Design Reasoning Framework

For every screen, determine:

## User Goal

What is the primary thing the user came here to do?

## Information Priority

What must they understand first?

## Primary Action

What action should have the strongest emphasis?

## Secondary Actions

What should remain accessible without competing visually?

## Repeated Patterns

What can use existing components?

## States

What happens when data is:

- Loading
- Empty
- Invalid
- Successful
- Unavailable

## Responsive Behavior

What changes when space becomes limited?

## Accessibility

Can the flow be understood and completed without a mouse?

---

# Visual Quality Principles

A polished product usually has:

- Fewer colors
- Fewer font sizes
- Fewer radius values
- Fewer shadow styles
- More consistent spacing
- Stronger alignment
- Better content hierarchy
- Better state design
- Better component reuse

Adding decoration is not the same as improving design.

When a screen feels weak, first fix:

1. Alignment
2. Spacing
3. Hierarchy
4. Typography
5. Grouping
6. Contrast

Only then add decorative detail.

---

# Avoid "AI-Generated UI" Look

Do not default to:

- Huge gradient hero headings
- Excessive glassmorphism
- Glowing borders everywhere
- Purple-to-blue gradients everywhere
- Giant rounded cards everywhere
- Excessive pills
- Random floating decorative blobs
- Too many emoji/icons
- Every section inside a card
- Unnecessary metric cards
- Excessive shadows
- Centered layouts for data-heavy screens
- Identical visual weight for every section

Design according to the product's task and audience.

---

# Avoid Over-Design

A functional interface does not need decoration everywhere.

Prefer:

```text
Clear
Calm
Intentional
Consistent
Fast to understand
```

over:

```text
Flashy
Busy
Novel for novelty's sake
```

---

# New UI Implementation Workflow

When asked to build a new UI:

## Step 1 — Inspect

Check:

- Existing tokens
- Existing components
- Existing layout
- Existing typography
- Existing patterns

## Step 2 — Identify primitives

Map the design to:

- Button
- Input
- Dialog
- Tabs
- Table
- Card
- Dropdown
- etc.

## Step 3 — Define missing reusable patterns

Create only the project-level components that are actually missing.

## Step 4 — Compose

Build the screen from primitives and feature components.

## Step 5 — Cover states

Implement loading, empty, error, disabled, and responsive states.

## Step 6 — Review consistency

Compare against nearby screens.

## Step 7 — Simplify

Remove unnecessary wrappers, custom CSS, duplicated markup, and decorative elements.

---

# Refactoring Existing UI

When improving an existing screen, preserve functionality first.

Then improve in this order:

1. Fix broken layout
2. Remove duplicate styles
3. Replace raw colors with tokens
4. Normalize spacing
5. Normalize typography
6. Normalize radius and borders
7. Replace custom primitives with shared components
8. Improve states
9. Improve responsive behavior
10. Improve accessibility
11. Add visual polish

Do not perform a visual redesign that breaks product behavior or existing workflows.

---

# When Matching an Existing Design

If screenshots, Figma, or an existing application are provided:

First identify:

- Grid
- Container width
- Type scale
- Spacing scale
- Radius
- Border treatment
- Color roles
- Shadow hierarchy
- Component density
- Navigation behavior

Recreate the underlying system rather than matching every screenshot with isolated pixel values.

If the same visual decision appears repeatedly, make it a token or reusable component.

---

# When No Design Exists

If no reference design is provided, use a restrained modern product-design baseline.

Default preference:

```text
Neutral background
High readability
Subtle borders
Limited shadows
One clear brand accent
Consistent 8px-ish spacing rhythm
Moderate radius
Lucide icons
Strong heading hierarchy
Accessible focus states
Responsive layout
```

Do not invent a loud visual identity unless the product context calls for it.

---

# Design System Expansion Rule

Add a new token or variant only when at least one of these is true:

- It represents a new semantic meaning.
- It will be reused.
- Existing tokens cannot express the design correctly.
- It prevents repeated arbitrary styling.
- It is required by the product brand.

Do not expand the system just because another value is possible.

---

# Preferred Utility

Use the project's class-merging helper:

```tsx
import { cn } from "@/lib/utils";
```

Example:

```tsx
<div
  className={cn(
    "rounded-xl border bg-card p-6 text-card-foreground",
    className
  )}
/>
```

This keeps component extension predictable.

---

# Class Ordering

Keep Tailwind classes reasonably grouped:

```text
layout
size
spacing
typography
color
border
effect
interaction
responsive/state
```

Example:

```tsx
className="
  flex items-center justify-between
  min-h-10 w-full
  gap-3 px-4 py-2
  text-sm font-medium
  bg-background text-foreground
  border border-border rounded-lg
  shadow-sm
  transition-colors
  hover:bg-muted
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
"
```

Exact ordering is less important than consistency and readability.

---

# Design Quality Gate

Do not mark a design as complete merely because it:

- Compiles
- Matches a rough screenshot
- Contains all requested fields
- Looks acceptable at one screen size

A completed UI should feel intentional as a system.

The final result should be:

```text
Consistent
Reusable
Responsive
Accessible
Maintainable
Visually balanced
Product-appropriate
```

---

# Final Rule

Whenever there is a conflict between:

```text
a clever one-off design
```

and

```text
a slightly simpler design that preserves system consistency
```

prefer the consistent design unless the one-off interaction provides meaningful user value.

The objective is not to make every component unique.

The objective is to make the entire product feel like one coherent product.
