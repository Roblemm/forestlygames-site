# AI RULES

## Purpose of This Document

Define how AI tools should behave when working on the ForestlyGames website codebase.

This document exists to prevent common AI failure modes such as:
- random design drift
- overbuilding features
- messy file structure
- overanimation in the wrong places
- unnecessary library additions
- broad rewrites that break working code

Use this document alongside:
- Project Brief
- UX Direction
- Motion Spec
- Architecture

## Core Rule

AI must prioritize alignment over creativity.

A solution that follows the project direction and architecture is better than a flashy solution that ignores the rules.

## Project Context (Non-Negotiable)

This project is:
- a code-first marketing website for ForestlyGames
- motion-forward and scroll-driven
- designed to impress talent, collaborators, partners, and investors first
- mobile-friendly and performance-aware

This project is not:
- a dashboard
- a SaaS product
- a backend-heavy platform
- a login or account system

Do not invent features outside this scope unless explicitly asked.

## Before You Edit Anything

For any medium or large change, AI should do this first:

1. Read the relevant docs.
2. Summarize understanding of the request and constraints.
3. Propose a scoped plan.
4. Then implement.

Relevant docs usually include:
- `docs/PROJECT_BRIEF.md`
- `docs/UX_DIRECTION.md`
- `docs/MOTION_SPEC.md`
- `docs/ARCHITECTURE.md`
- `docs/AI_RULES.md`

## Editing Behavior Rules

### 1) Make Scoped Changes
Prefer small, targeted edits over broad rewrites.

Good:
- update one section
- add one component
- refactor one repeated pattern
- improve one motion scene

Avoid:
- rewriting multiple unrelated files
- changing architecture while fixing visuals
- restyling the entire site when only one section was requested

### 2) Preserve Working Code
If a feature works, do not rewrite it unless the user asked for a change.

When improving code, preserve:
- behavior
- layout intent
- content
- file ownership boundaries

### 3) Do Not Freestyle the Product Direction
Do not invent:
- new pages
- auth systems
- dashboards
- CMS integrations
- APIs
- backend services
- extra dependencies

unless explicitly requested.

### 4) Follow Existing Patterns First
Before creating a new pattern, check whether the codebase already has:
- a reusable UI primitive
- a section wrapper
- a motion scene pattern
- a data shape
- a naming convention

Reuse or extend the approved pattern when possible.

## Architecture Compliance Rules

AI must follow the Architecture document.

### File Placement Rules
- Route and page composition belongs in `src/app/*`
- Reusable UI primitives belong in `src/components/ui/*`
- Layout chrome belongs in `src/components/layout/*`
- Page sections belong in `src/components/sections/*`
- Major motion logic belongs in `src/components/motion/scenes/*`
- Structured content belongs in `src/data/*`

Do not place code in the wrong folder just because it is convenient.

### Server vs Client Rules
Default to Server Components.

Use `"use client"` only when needed for:
- GSAP or ScrollTrigger
- browser APIs
- interactive state

Do not convert whole pages to client components because one child needs animation.

## Motion-Specific Rules

Motion is a core identity of this site, but it must follow the Motion Spec.

### Motion Priority Rules
- Scroll choreography is more important than hover effects.
- Layered and relative movement is preferred over generic reveals.
- Pacing matters, not every section should be max intensity.
- Smoothness matters more than animation count.

### GSAP and ScrollTrigger Rules
Use GSAP and ScrollTrigger for:
- scroll-linked timelines
- layered parallax
- scrubbed animation
- short, purposeful pinning

Do not:
- sprinkle random ScrollTriggers across small components
- animate every element separately without a scene concept
- use GSAP for simple button hovers or basic transitions

### Motion Scene Rule
If a section needs major scroll choreography, implement it as a motion scene component.

Do not bury scroll logic in unrelated child components.

## Styling Rules (Tailwind)

Tailwind is the primary styling system.

### Use Tailwind For
- layout
- spacing
- typography
- color
- borders
- responsive rules
- standard transitions

### Reuse UI Primitives
If a pattern appears 3 or more times, prefer a reusable component instead of duplicating long class strings.

### Avoid
- adding large custom CSS files for normal component styling
- moving component styles into `globals.css` without a strong reason
- introducing a second styling system without approval

## Data and Content Rules

### Keep Data Separate
Store structured content in `src/data/*` when practical:
- games
- stats
- nav links
- contact info
- page copy blocks

Do not hardcode large content blocks inside motion components if data files exist.

### Do Not Invent Fake Claims
AI may improve wording and structure, but must not fabricate:
- performance metrics
- partnerships
- investors
- awards
- user counts
- timelines
- shipped features

If real values are not provided, use placeholders clearly or ask for data.

## Dependency Rules

### Do Not Add New Libraries Without Approval
This includes:
- animation libraries
- UI kits
- state management libraries
- carousel libraries
- smooth-scroll libraries
- icon packs

If a new library would help, propose it first with:
- reason
- tradeoff
- alternative using current stack

## Change Management Rules

### For Medium or Large Changes, AI Should Provide
- what files will change
- why those files need changes
- any architecture or motion implications
- any risks (mobile, performance, regressions)

### After Implementing, AI Should Summarize
- files changed
- what was done
- what to test
- any follow-up suggestions

## Code Quality Rules

### Keep Code Readable
Prefer:
- clear component names
- typed props
- small focused components
- comments only where they add intent, especially for motion trigger ranges

Avoid:
- vague names (`NewSection`, `Card2`, `animHelper`)
- giant components doing layout, content, and motion at once
- magic numbers without explanation in motion code

### Preserve Type Safety
Use or extend existing types in `src/types/*` and typed data in `src/data/*` when possible.

Do not remove types just to make code compile quickly.

## Mobile and Performance Rules

This site must feel premium on mobile too.

AI must consider mobile impact when adding visuals or motion.

### Required Checks (Mentally and in Summary)
- Does this still read clearly on mobile?
- Did motion get too heavy for smaller devices?
- Are transforms and opacity doing most of the animation work?
- Is there any likely scroll jank risk?

If the change increases motion intensity, mention mobile impact explicitly.

## Approval Boundaries

### Allowed Without Extra Approval
- small layout improvements
- component refactors within existing architecture
- section polish
- motion improvements that follow Motion Spec
- Tailwind styling cleanup
- data file additions in existing shapes

### Ask Before Doing
- adding libraries
- changing folder structure
- changing page scope
- adding backend features
- changing major motion philosophy
- converting many components to client components

## When Unsure

If the request is ambiguous or conflicts with the docs:
- do not guess aggressively
- state the conflict briefly
- propose 1 to 2 safe options
- proceed with the most conservative option if asked to continue

## Review Checklist For AI (Before Finishing)

1. Did I stay within Project Brief scope?
2. Did I match the UX Direction and avoid stylistic drift?
3. Did I follow the Motion Spec, especially motion pacing and scene-based animation?
4. Did I follow the Architecture document for file placement and component ownership?
5. Did I avoid unnecessary libraries and rewrites?
6. Did I preserve mobile and performance quality?
7. Did I summarize changes and what to test?

If multiple answers are no, revise before finalizing.

## Suggested Prompt Pattern For Future AI Sessions

Use this before asking for implementation work:

"Read `docs/PROJECT_BRIEF.md`, `docs/UX_DIRECTION.md`, `docs/MOTION_SPEC.md`, `docs/ARCHITECTURE.md`, and `docs/AI_RULES.md`. Summarize your understanding, propose a scoped plan, then implement only the requested change."

## Summary

AI should behave like a disciplined teammate, not an unpredictable creative director.

The priority is to build a premium, scroll-driven, motion-forward ForestlyGames site with clean architecture, controlled complexity, and consistent execution.
