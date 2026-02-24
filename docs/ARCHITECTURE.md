# ARCHITECTURE

## Purpose of This Document

Define how the ForestlyGames website codebase is organized so AI tools can make changes without creating a messy structure.

This document establishes:

- stack responsibilities
- folder structure
- component categories
- server vs client component rules
- data organization rules
- animation ownership rules
- naming conventions
- implementation boundaries for AI edits

Use this document alongside:

- Project Brief
- UX Direction
- Motion Spec
- AI Rules

## Why This Matters

Without architecture rules, AI tools often:

- mix content, layout, and motion logic in one file
- make too many components client-side
- duplicate UI patterns instead of reusing them
- put GSAP logic in random components
- create inconsistent naming and folder structure
- make future changes slower and riskier

This website needs strong visual polish and motion, so the codebase must stay clean.

## Stack (Locked for Phase 1)

- **Next.js (App Router)**, application framework and routing
- **TypeScript**, type safety and maintainability
- **Tailwind CSS**, styling and responsive layout system
- **GSAP + ScrollTrigger**, scroll choreography and major motion scenes
- **Vercel**, deployment and preview environments

## Architecture Principles

### 1) Marketing Site First

Build this like a premium marketing site, not a dashboard app.

### 2) Motion is Scene-Based

Major motion belongs in dedicated motion scene components, not scattered across the app.

### 3) Default to Server Components

Only use client components when interactivity or scroll animation requires browser APIs.

### 4) Content and Presentation Stay Separate

Keep game data, stats, and copy separate from UI and motion logic.

### 5) Reuse Beats Reinventing

AI should extend approved primitives and patterns before creating new variants.

## High-Level App Structure

The site should be organized into clear layers:

1. **App Layer**

   - routes, layouts, page composition

2. **Section Layer**

   - homepage and page sections

3. **UI Primitives Layer**

   - reusable cards, buttons, containers, headings, badges

4. **Motion Scene Layer**

   - GSAP/ScrollTrigger choreography for high-impact sections

5. **Data Layer**

   - typed content objects for games, stats, links, and page content

6. **Utility Layer**

   - helpers, constants, hooks, motion config, type definitions

## Recommended Folder Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    games/
      page.tsx
    about/
      page.tsx
    contact/
      page.tsx

  components/
    layout/
      Navbar.tsx
      MobileMenu.tsx
      Footer.tsx
      PageShell.tsx

    ui/
      Container.tsx
      Section.tsx
      SectionHeading.tsx
      Button.tsx
      LinkButton.tsx
      Badge.tsx
      StatItem.tsx
      GameCard.tsx
      GameCardMedia.tsx

    sections/
      home/
        HeroSection.tsx
        FeaturedGamesSection.tsx
        ProofStripSection.tsx
        StudioStorySection.tsx
        CtaSection.tsx
      shared/
        PageHero.tsx

    motion/
      scenes/
        HeroScene.tsx
        GamesShowcaseScene.tsx
        StudioStoryScene.tsx
      wrappers/
        MotionSceneRoot.tsx
      config/
        motionTokens.ts
        parallaxProfiles.ts

  data/
    site.ts
    nav.ts
    games.ts
    stats.ts
    contact.ts

  lib/
    gsap/
      register.ts
      media.ts
    utils/
      cn.ts

  hooks/
    usePrefersReducedMotion.ts
    useIsMobile.ts

  types/
    game.ts
    site.ts
```

## Folder Responsibilities

### `src/app/`

Next.js routes and layout composition only.

Allowed:

- route files
- page composition
- metadata exports
- layout shells

Avoid:

- heavy GSAP logic
- deeply styled one-off markup that belongs in components
- large content blobs

### `src/components/layout/`

Global site chrome and shared layout wrappers.

Examples:

- Navbar
- MobileMenu
- Footer
- PageShell

### `src/components/ui/`

Reusable design primitives and visual building blocks.

Examples:

- Button
- Section
- Container
- GameCard
- Badge
- SectionHeading

Rule:
These should be mostly presentation-focused and reusable across pages.

### `src/components/sections/`

Page sections assembled from UI primitives and data.

Examples:

- HeroSection
- FeaturedGamesSection
- ProofStripSection

Rule:
Sections can choose whether to render a motion scene component or a static version.

### `src/components/motion/`

All major motion scene logic and shared motion configuration.

This is where GSAP and ScrollTrigger primarily live.

Subfolders:

- `scenes/` for section-level motion choreography
- `config/` for shared motion constants and parallax settings
- `wrappers/` for shared scene mounting patterns if needed

### `src/data/`

Typed content and structured page data.

Examples:

- game metadata
- stats values
- nav links
- contact links
- homepage copy blocks

Rule:
Do not hardcode major content inside motion scene files if it can live in data.

### `src/lib/`

Reusable utilities and integration helpers.

Examples:

- GSAP registration helper
- shared media query helpers
- utility functions

### `src/hooks/`

Reusable React hooks for client-side behavior.

Examples:

- reduced motion preference
- mobile checks

### `src/types/`

Type definitions for structured data and component contracts.

Examples:

- `Game`
- `Stat`
- navigation item types

## Server vs Client Component Rules

This is one of the most important parts of the architecture.

### Default Rule

All components should be Server Components unless they need client-side behavior.

### Use Client Components Only When Needed

Mark a component as client (`"use client"`) only if it needs:

- GSAP or ScrollTrigger
- browser APIs (`window`, `document`, `ResizeObserver`, etc.)
- interactive state (mobile menu open/close, tabs, carousels)
- event-driven UI state beyond simple links

### Typical Server Components (Preferred)

- page layout composition
- content sections with static markup
- text/image blocks
- data-driven lists with no client interactivity
- footer and most page chrome, unless interactive

### Typical Client Components (Allowed)

- `Navbar` if it changes on scroll and uses client scroll state
- `MobileMenu`
- motion scenes like `HeroScene`, `GamesShowcaseScene`, `StudioStoryScene`
- interactive carousels or filters, if added later

### Anti-Patterns To Avoid

- Making entire pages client components because one child needs animation
- Putting GSAP code directly in `app/page.tsx`
- Marking all section components as client by default

## Motion Ownership Rules (GSAP / ScrollTrigger)

Motion logic should be isolated and predictable.

### Where GSAP Belongs

Primary location:

- `src/components/motion/scenes/*`

Secondary location, only if clearly justified:

- a small interactive component with contained motion behavior

### Where GSAP Should Not Live

- `src/app/*` route files
- generic UI primitives like `Button`, `Badge`, `Container`
- data files
- utility files that do not own DOM elements

### Scene Pattern (Recommended)

Each motion scene component should:

- own its refs
- register its timeline(s)
- create scene-level ScrollTrigger(s)
- clean up animations and triggers on unmount
- keep comments for key trigger ranges and intent

### Motion Scene Boundary Rule

If a section needs scroll choreography, create or use a motion scene component.
Do not inject random ScrollTriggers into unrelated child components.

## Page Composition Pattern

Use a composition pattern where sections remain readable at a glance.

### Example, Home Page

`src/app/page.tsx` should compose sections in order, not contain motion implementation details.

Conceptually:

- Hero section
- Featured games section
- Proof strip
- Studio story section
- CTA section

Each section decides whether it renders:

- a motion scene version, or
- a static/cooldown implementation

## Data Separation Rules

### Keep Content in `src/data/*`

Store structured content separately from JSX where practical.

Examples:

- game list entries
- stats values
- nav items
- contact links
- page copy blocks and labels

### Why This Matters

- AI can redesign layout without accidentally rewriting content
- easier to reuse content across pages
- easier to maintain and update
- cleaner component props and types

### Data File Expectations

Data should be:

- typed
- human-readable
- stable in shape
- not mixed with DOM manipulation or animation code

## Styling Rules (Tailwind Architecture)

Tailwind is the primary styling system.

### Use Tailwind For

- layout
- spacing
- typography
- colors
- borders
- responsive behavior
- standard transitions and states

### Use Shared UI Primitives For Repeated Patterns

If the same visual pattern appears 3 or more times, prefer a reusable component instead of duplicating class strings everywhere.

Examples:

- section wrappers
- headings
- buttons
- cards

### Avoid

- large one-off CSS files for normal component styling
- mixed styling approaches without reason
- deeply nested custom class systems that hide layout decisions

### `globals.css` Usage

Keep `globals.css` for:

- Tailwind imports/config integration
- CSS variables/tokens if used
- base resets
- global defaults

Do not move component-specific styling there unless there is a strong reason.

## Naming Conventions

Consistency matters a lot for AI-assisted development.

### Files and Components

- React component files: `PascalCase.tsx`
- Utility files: `camelCase.ts`
- Type files: descriptive noun names, often lowercase (`game.ts`, `site.ts`)
- Route folders: lowercase (`games`, `about`, `contact`)

### Component Naming Pattern

Use names that reveal role clearly:

- `HeroSection` for section composition
- `HeroScene` for motion choreography implementation
- `GameCard` for reusable UI card
- `ProofStripSection` for cooldown content section

Avoid vague names like:

- `SectionOne`
- `CardNew`
- `FancyBlock`
- `Animations`

### Data Names

Prefer explicit arrays and objects:

- `featuredGames`
- `studioStats`
- `primaryNavItems`

## AI Editing Boundaries (Architecture-Specific)

When AI makes changes, it should follow these rules:

### Allowed

- create new UI primitives in the right folder
- build sections using approved composition patterns
- add or improve motion scenes in `components/motion/scenes`
- add typed data entries in `src/data/*`
- refactor duplicate UI into reusable components

### Requires Approval

- adding new libraries
- changing folder structure significantly
- moving GSAP into global app files
- converting many server components to client components
- introducing backend or CMS complexity

### Not Allowed (Without Explicit Request)

- rewrite architecture from scratch
- merge unrelated concerns into single files
- introduce generic animation helpers that bypass Motion Spec rules
- hardcode large content blocks inside motion files when data files exist

## Implementation Sequence (Recommended)

Build in this order to reduce chaos and help AI stay consistent:

1. App shell and routing scaffold (`app/`, layout, page files)
2. Global layout components (`Navbar`, `Footer`, `PageShell`)
3. UI primitives (`Container`, `Section`, `Button`, `GameCard`, `SectionHeading`)
4. Data files (`games`, `stats`, `nav`, `contact`)
5. Static section compositions (no major motion yet)
6. Motion scenes for Hero and Games sections
7. Studio story motion scene
8. Mobile motion adjustments and cleanup
9. Performance polish and scene refinements

## Architecture Review Checklist (Before Accepting AI Changes)

1. Did the change follow the folder responsibilities?
2. Did it keep pages and routes free of heavy motion logic?
3. Are client components only used where necessary?
4. Is GSAP contained to motion scenes or justified interactive components?
5. Was content kept in `src/data/*` when appropriate?
6. Were reusable patterns extracted instead of duplicated?
7. Do names clearly describe roles?
8. Does the change align with Project Brief, UX Direction, and Motion Spec?

If multiple answers are no, revise before merging.

## Summary

The ForestlyGames architecture should support a premium, motion-forward marketing site while staying clean enough for heavy AI-assisted iteration.

The key idea is simple:

- routes and pages stay clean
- sections compose content
- motion scenes own choreography
- data stays separate
- client-side logic is used only where it is needed

This structure protects both UX quality and development speed.
