# MOTION SPEC

## Purpose of This Document

Define how motion should work across the ForestlyGames website so AI tools do not overanimate the wrong things, underanimate the important things, or create inconsistent motion behavior.

This document defines motion priorities, section-level motion behavior, implementation rules, mobile adjustments, and performance guardrails.

Use this document alongside:

- Project Brief
- UX Direction
- Architecture
- AI Rules

## Why This Matters

Without a motion spec, AI usually does one or more of the following:

- adds too many random entrance animations
- over-focuses on hover effects instead of scroll choreography
- uses inconsistent timing and movement styles
- makes every section equally intense
- creates laggy motion that hurts the experience

This website is motion-forward, so motion needs a system.

## Motion Philosophy

### Core Motion Principle

**Scroll choreography is the main identity of the site, not hover effects.**

Hover effects can add polish, but the primary wow factor should come from how the page behaves while the user scrolls.

### Motion Priorities

1. **Scroll choreography over hover effects**
2. **Layered parallax over flat movement**
3. **Relative movement between elements over synchronized movement**
4. **Pacing over constant intensity**
5. **Smoothness over effect count**

### Desired Motion Feel

Motion should feel:

- cinematic
- layered
- intentional
- responsive to scroll
- premium
- controlled

Motion should not feel:

- noisy
- random
- gimmicky
- over-triggered
- laggy
- exhausting

## Motion Vocabulary (Definitions)

Use these terms consistently in planning and implementation.

### Scroll Choreography

Multiple coordinated motion behaviors tied to scroll progress that make a section feel like a scene.

### Layered Parallax

Different visual layers move at different speeds or distances during scroll.

### Relative Movement

Elements in the same section move by different amounts, directions, or timing, creating depth and hierarchy.

### Motion Scene

A section with intentional, scroll-linked choreography that is central to the site experience.

### Cooldown Section

A section with lower motion intensity to preserve pacing and readability.

### Pacing

Alternating motion intensity across the page so the experience feels authored, not constantly maxed out.

## Motion Hierarchy (What Matters Most)

When tradeoffs exist, prioritize in this order:

1. Scroll smoothness
2. Readability and clarity
3. Motion choreography quality
4. Visual richness
5. Extra polish effects

If an effect hurts smoothness or readability, simplify or remove it.

## Section Motion Map (Homepage)

This is the baseline motion plan for the homepage. AI should not invent different motion intensity levels without approval.

## 1) Hero Section

### Section Role

First impression, cinematic brand statement.

### Motion Role

High-impact motion scene.

### Motion Type

- Layered parallax
- Scroll-linked transforms
- Relative movement between foreground and background layers
- Controlled intro transition on initial page load
- Optional short scrub behavior as user exits hero

### Intensity

High, but controlled.

### Goals

- Immediately feel premium and alive
- Establish scroll-driven identity
- Preserve clear headline and CTA readability

### Avoid

- Overly heavy full-screen video as the only hero visual
- Too many moving layers at once
- Motion that competes with text readability
- Long pinned hero scene on mobile

## 2) Games Section (Featured Games / Showcase)

### Section Role

Primary proof of execution and creativity.

### Motion Role

High-impact motion scene.

### Motion Type

- Scroll-linked grid or card parallax
- Relative movement across cards or card groups
- Staggered section reveals tied to scroll progress
- Inner image motion within cards (subtle, optional)
- Section handoff from hero that feels continuous

### Intensity

High-medium.

### Goals

- Make browsing feel premium and dynamic
- Support discovery, not distract from it
- Keep cards readable and clickable

### Avoid

- Hover-only wow factor
- Aggressive card motion that makes content hard to scan
- Random per-card triggers with inconsistent timing

## 3) Proof Strip (Stats / Credibility Band)

### Section Role

Trust signal, credibility reinforcement.

### Motion Role

Cooldown section.

### Motion Type

- Subtle fade and translate on entry
- Light scroll-linked drift only if smooth
- Optional count-up once per visit or viewport entry

### Intensity

Low.

### Goals

- Let the user breathe
- Reinforce credibility clearly
- Keep pacing strong before next motion-heavy section

### Avoid

- Complex parallax stacks
- Over-stylized effects that reduce legibility

## 4) Studio Story / Identity Section

### Section Role

Explain studio philosophy, direction, and quality bar.

### Motion Role

Medium to high impact motion scene.

### Motion Type

- Layered parallax on supporting visuals
- Scroll-linked content sequencing
- Optional short pinned or semi-pinned storytelling moment
- Masked or directional reveals if performance-safe

### Intensity

Medium-high.

### Goals

- Make studio identity feel authored and premium
- Support storytelling through motion and pacing
- Maintain text readability and scanability

### Avoid

- Long pinned narrative sections, especially on mobile
- Overcomplicated timelines that hide content

## 5) CTA Section / Footer Transition

### Section Role

Confident close, conversion and contact direction.

### Motion Role

Cooldown to medium finish.

### Motion Type

- Crisp reveal motion
- Light depth/parallax only if needed
- Polished button and navigation feedback

### Intensity

Low-medium.

### Goals

- End cleanly and confidently
- Preserve clarity and actionability
- Keep final interaction fast and polished

### Avoid

- Big theatrical ending sequences
- Motion that delays interaction

## Which Sections Are Motion Scenes

These sections are allowed to contain major scroll choreography and should be treated as dedicated motion scenes:

- Hero Section
- Games Showcase Section
- Studio Story / Identity Section (if implemented with layered storytelling)

These sections should generally be lower intensity or cooldown sections:

- Proof Strip / Stats Band
- CTA Section
- Footer

Important:
Not every section should be a motion scene.

## Motion Pacing Rules

Motion should be distributed across the page with intentional intensity changes.

### Pacing Pattern (Default)

- Hero: High impact
- Games: High-medium impact
- Proof strip: Low intensity cooldown
- Studio story: Medium-high impact
- CTA/Footer: Low-medium finish

### Pacing Guidelines

- Do not stack multiple maximum-intensity scenes back to back without a cooldown section
- Do not make every section pinned
- Do not use the same motion pattern in every section
- Let content readability reset between high-motion sections

## GSAP and ScrollTrigger Rules

GSAP and ScrollTrigger are the primary tools for major motion scenes.

### Use GSAP / ScrollTrigger For

- Scroll-linked timelines
- Layered parallax
- Scrubbed motion tied to scroll progress
- Pinned or semi-pinned sections (short and purposeful)
- Coordinated section choreography with multiple elements

### Do Not Use GSAP / ScrollTrigger For

- Basic hover states
- Simple button transitions
- Every small UI element on the page
- Random one-off animations that could be CSS transitions

### ScrollTrigger Usage Rules

- Use scene-level triggers, not dozens of unrelated element-level triggers
- Prefer one coordinated timeline per motion scene when possible
- Keep trigger start/end values intentional and documented in code comments
- Clean up triggers properly in component lifecycle
- Avoid nested trigger complexity unless necessary and tested

### Anti-Pattern To Avoid

Do not sprinkle random scroll triggers throughout the page just because motion is desired.

If a section needs motion, define a clear scene concept first.

## Mobile Motion Rules

Mobile motion should preserve the feeling, not replicate the desktop motion exactly.

### Core Mobile Principle

Reduce motion complexity while preserving premium scroll feel.

### Required Mobile Adjustments

- Reduced parallax distances
- Fewer simultaneous moving layers
- Simpler timelines
- Shorter motion ranges
- Less aggressive transforms

### Mobile Restrictions

- Avoid long pinned scenes
- Avoid complex multi-layer animations that depend on high GPU cost
- Avoid motion that causes text to drift too much while reading
- Avoid effects that delay taps or interfere with scrolling

### Mobile Success Condition

The site should still feel intentional and premium on mobile, even if some desktop effects are reduced or removed.

## Performance Guardrails

These are hard constraints for motion implementation.

### Prioritize These Properties

Animate these first whenever possible:

- `transform`
- `opacity`

These are generally the safest and smoothest for scroll-driven animation.

### Avoid or Limit During Scroll

Use carefully and sparingly, especially on mobile:

- heavy blur filters
- large dynamic shadows
- expensive filter chains
- layout-affecting properties (top, left, width, height)
- too many simultaneously animating elements

### Media and Layering Guardrails

- Compress images and visual assets aggressively
- Limit number of parallax layers per scene
- Avoid massive assets in motion-heavy sections
- Test with realistic content, not tiny placeholders only

### Testing Rules

- Test on a real phone early, not just desktop browser
- Test scroll smoothness before adding more effects
- Validate readability while motion is active
- Check for frame drops in the hero and games sections first

## Accessibility and Readability Rules

Motion should not reduce usability.

### Requirements

- Preserve text contrast and readability during motion
- Do not move critical text so much that it becomes hard to read
- Respect reduced motion preferences when implemented
- Keep navigation interactions fast and understandable

### Motion Restraint Rule

If motion competes with understanding the content, reduce the motion.

## Implementation Intent for AI Tools

AI should treat motion as an authored system, not decorative add-ons.

When implementing motion:

- Start from section purpose
- Decide if the section is a motion scene or cooldown section
- Use GSAP/ScrollTrigger only when scroll choreography is needed
- Keep motion patterns consistent with this spec
- Prefer fewer high-quality effects over many low-quality effects

## Motion Review Checklist (Before Accepting AI Changes)

Use this checklist to review motion work:

1. Is scroll choreography more important than hover effects in this change?
2. Does the motion create layered depth or relative movement, not just generic reveals?
3. Does this section fit its intended intensity level?
4. Is the motion smooth on desktop and acceptable on mobile?
5. Are GSAP/ScrollTrigger used intentionally, not scattered randomly?
6. Are transforms and opacity doing most of the work?
7. Does the motion preserve readability and interaction clarity?

If multiple answers are no, revise before merging.

## Summary

The ForestlyGames website should use motion as a core part of its identity, with scroll-driven choreography, layered parallax, and controlled pacing.

The goal is not maximum animation count.

The goal is a premium, cinematic, scroll-responsive experience that feels smooth, intentional, and credible.
