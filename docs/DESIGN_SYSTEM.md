# DESIGN SYSTEM

## Purpose of This Document

Define the visual rules and theme direction for the ForestlyGames website so AI tools can make consistent design decisions without making the site feel rigid or overdesigned.

This is a **guided system**, not a strict enterprise token specification.

The goal is consistency with room for creative exploration.

Use this document alongside:

* Project Brief  
* UX Direction  
* Motion Spec  
* Architecture  
* AI Rules

## Why This Matters

Without a design system, AI often creates patchwork visuals:

* inconsistent spacing  
* mismatched button styles  
* random card treatments  
* too many visual motifs  
* sections that feel like different websites

This document sets the theme and the guardrails while keeping creative flexibility.

## Design System Philosophy

### Core Principle

Keep the visual language consistent, while allowing controlled variation in standout sections.

### Balance Rule

* **Consistent foundation** for most of the site  
* **Controlled variation** for section identity  
* **Standout moments** for hero and featured experiences

### What This Means Practically

AI should not redesign the whole visual language per section.

AI may vary:

* image treatment  
* accent intensity  
* card presentation details  
* section atmosphere

AI should keep consistent:

* color direction  
* spacing rhythm  
* typography hierarchy  
* button language  
* shape language (radius/borders)  
* layering logic

## Color Direction (High Level)

### Core Theme Direction

ForestlyGames should use a:

* **dark base**  
* **green primary identity color**  
* **gold accent for premium emphasis**

This should feel:

* modern  
* sleek  
* cinematic  
* premium  
* game-native  
* credible

### Color Role Strategy (Not Hardcoded Yet)

Use color by role, not random taste.

#### **1) Base Colors (Dark Neutrals)**

Used for:

* page backgrounds  
* surfaces  
* panels  
* deep section layers

Visual intent:

* cinematic depth  
* strong contrast for motion and overlays  
* premium, not flat black everywhere

#### **2) Primary Accent (Forestly Green)**

Used for:

* brand emphasis  
* active states  
* highlights  
* motion accents  
* selected lines, glows, visual anchors

Visual intent:

* identity signal  
* energy and momentum  
* modern creative-tech feel

#### **3) Premium Accent (Gold)**

Used for:

* premium emphasis  
* selective CTA support  
* badge-like moments  
* framing details  
* high-importance highlights

Visual intent:

* prestige  
* polish  
* confidence

Important:  
Gold should be used intentionally, not sprayed across every component.

### Color Usage Rules

* Dark neutrals should dominate the composition.  
* Green should be the primary brand signal.  
* Gold should be a selective premium accent.  
* Most sections should feel restrained, not neon-heavy.  
* Premium feel should come from contrast, composition, and motion, not color intensity alone.

### Avoid (Color)

* Rainbow palettes  
* Equally strong green and gold everywhere  
* Neon overload across all sections  
* Flat SaaS blue tones unless explicitly requested  
* Bright white cards that break the cinematic dark theme

## Typography Scale (Flexible but Consistent)

### Typography Goals

Typography should feel:

* modern  
* confident  
* readable  
* premium  
* strong on mobile

### Typography Hierarchy (Role-Based)

Define typography by role, not one-off styling.

Use these roles consistently:

* **Display** (hero headlines, major statements)  
* **H1 / Page Title**  
* **H2 / Section Title**  
* **H3 / Subsection Title / Card Title**  
* **Body Large**  
* **Body**  
* **Support / Meta / Caption**

### Typography Rules

* Keep a clear hierarchy between section title and body copy.  
* Do not use wildly different heading sizes between sections without intent.  
* Favor strong headline readability over decorative styling.  
* Support text should stay readable over motion backgrounds.  
* Mobile typography should preserve hierarchy, not just shrink everything equally.

### Typography Flexibility

AI may test:

* different display sizes by section importance  
* tighter or looser tracking in hero headlines  
* stronger weight for impact sections

AI should not:

* invent inconsistent type hierarchy per section  
* use too many text styles in one section  
* reduce readability for style

## Spacing Scale (High Priority Consistency)

### Spacing Philosophy

Spacing rhythm is a core part of premium feel.

Even when visuals vary, spacing should remain disciplined.

### Spacing Rules

* Use a consistent spacing scale across components and sections.  
* Prefer generous spacing over cramped layouts.  
* Keep internal card spacing consistent across similar cards.  
* Keep section spacing intentional so pacing feels authored.  
* Preserve clear separation between motion-heavy sections and cooldown sections.

### Spacing Flexibility

AI may vary spacing for:

* hero sections (usually larger)  
* compact utility bands (usually tighter)  
* mobile adjustments

AI should not:

* use random spacing values section by section  
* compress spacing just to fit more content  
* create inconsistent gaps between similar UI patterns

## Radius and Shadow Rules

### Shape Language (Radius)

ForestlyGames should feel modern and polished, with a consistent rounded shape language.

Use a small family of radius sizes and reuse them.

### Radius Guidelines

* Buttons, cards, panels, and overlays should feel like part of one system.  
* Hero panels and premium containers may use slightly larger radius.  
* Tiny and extra sharp corners should be used sparingly unless intentional.

### Shadow and Glow Philosophy

Shadows and glows should support depth, not become the design.

Use shadows and glows to:

* separate layers  
* support focus  
* reinforce premium lighting feel

### Shadow / Glow Rules

* Subtle by default  
* Stronger only for focal elements  
* Use green glow as identity support, not everywhere  
* Use gold glow sparingly for premium emphasis

### Avoid (Radius / Shadows)

* Mixing many different corner styles  
* Heavy shadows on every component  
* Constant glow on all cards/buttons  
* Cheap neon look from overused outer glow

## Button Styles (System, Not One-Off)

### Button Role Types

Define and reuse a small set of button roles:

* **Primary Button** (main CTA)  
* **Secondary Button** (alternate CTA)  
* **Ghost / Tertiary Button** (low emphasis actions)

### Button Design Intent

Buttons should feel:

* confident  
* modern  
* premium  
* tactile but not noisy

### Button Rules

* Keep button shape language consistent across pages.  
* Primary CTA should stand out clearly, but not look like a different brand.  
* Hover and press states should feel polished and responsive.  
* Motion polish is allowed, but button interactions should remain fast.

### Button Flexibility

AI may vary:

* fill vs outline emphasis by section  
* accent use (green vs selective gold emphasis)  
* subtle lighting treatment for hero CTA

AI should not:

* invent a totally new button style for each section  
* overanimate button hovers with complex effects  
* reduce text contrast for style

## Card Styles (Especially Game Cards)

### Card Philosophy

Cards are a major visual system for this website and should feel premium, readable, and reusable.

Game cards are not just content boxes, they are part of the brand presentation.

### Card Design Intent

Cards should feel:

* structured  
* cinematic  
* layered  
* polished  
* easy to scan

### Card Rules

* Maintain a consistent card anatomy for similar content types.  
* Keep title and supporting text hierarchy consistent.  
* Preserve image readability and crop quality.  
* Use overlays, borders, and accents intentionally.  
* Cards should remain readable even when motion is present nearby.

### Card Variants (Allowed)

AI may create controlled variants, for example:

* image-heavy feature cards  
* compact info cards  
* stat / proof cards  
* premium spotlight card

All variants should still feel part of one visual family.

### Avoid (Cards)

* Random radius/border treatment by card  
* Cluttered overlays and labels  
* Too many accent colors inside one card  
* Inconsistent text placement rules across similar cards

## Section Spacing Rules

### Section Rhythm Philosophy

Section spacing is part of the UX pacing, especially in a motion-heavy site.

The spacing between sections should help the page breathe and support motion intensity changes.

### Section Spacing Rules

* Hero and major showcase sections usually get more breathing room.  
* Proof strips and utility sections can be tighter.  
* Maintain consistent vertical rhythm between section title, content, and CTA areas.  
* Use spacing to create clear separation after high-motion scenes.

### Pacing Alignment

Spacing should support the Motion Spec pacing model:

* high-impact scene  
* cooldown  
* high-impact scene  
* clean close

## Z-Index and Layering Guidelines (Very Important for Motion)

### Layering Philosophy

Layering should feel intentional and stable.

This site uses motion and depth, so stacking order must be predictable.

### Layer Role Bands (Conceptual)

Use stable layering bands for:

* background atmosphere layers  
* content surfaces/cards  
* section overlays  
* sticky navbar  
* menus and panels  
* modal or full-screen overlays (if used later)

### Layering Rules

* Keep the navbar above content and motion layers.  
* Keep text readability layers above decorative motion layers.  
* Avoid ad hoc z-index values unless needed.  
* Reuse a small, documented z-index scale in code.

### Motion Layering Rule

Decorative motion should never visually overpower critical text or CTA elements.

### Avoid (Layering)

* Random z-index numbers across components  
* Text falling behind decorative assets  
* Overlapping sections caused by unmanaged stacking contexts  
* Using z-index to patch layout issues that should be solved structurally

## Creative Flexibility Rules (Important)

This design system is intentionally not fully hardcoded.

AI is allowed to explore visual options within the established theme.

### Safe Areas for Creative Exploration

* hero composition style  
* image treatments  
* section atmosphere  
* accent intensity by section  
* card variant presentation  
* border and glow nuance

### Guardrails for Exploration

Exploration must still preserve:

* dark + green core identity  
* gold as selective premium accent  
* typography hierarchy  
* spacing rhythm  
* button and card family consistency  
* mobile readability

## Anti-Drift Rules

If a design change makes the site feel like one of these, pull it back:

* generic SaaS product site  
* cluttered arcade page  
* over-glowing neon gamer template  
* over-corporate investor deck  
* patchwork of unrelated section styles

## AI Design Decision Filter

Before finalizing visual changes, AI should check:

1. Does this still feel like a dark, premium ForestlyGames experience?  
2. Is green clearly the primary identity color?  
3. Is gold being used as selective premium emphasis, not everywhere?  
4. Do buttons and cards still look like they belong to the same site?  
5. Does spacing still feel intentional and premium?  
6. Does motion layering preserve readability and hierarchy?  
7. Does this still work on mobile?

If multiple answers are no, revise before shipping.

## Summary

The ForestlyGames design system should create a consistent visual foundation with room for creative experimentation.

The core direction is:

* dark cinematic base  
* green primary identity accent  
* gold premium accent  
* modern, sleek, game-native presentation

Consistency matters, but the system should still allow the site to feel alive, expressive, and motion-forward.
