Design System: TB7 Landing Refresh (2025)

Overview

- Purpose: Elevate the TB7 single-product landing to a premium, modern, and trustworthy aesthetic using a dark, gradient-forward look paired with subtle glassmorphism and purposeful motion.
- Scope: Color palette, typography, glass panel styles, component primitives, and micro-interaction guidance. Includes implementation notes for Hydrogen/Oxygen.

Color Palette

- Background: Deep charcoal/navy blend — `rgb(var(--color-contrast))` (default body background) with gradient helpers `--gradient-hero`, `--gradient-section`.
- Text: Near-white — `rgb(var(--color-primary))` used via Tailwind color `text-contrast`.
- Accent (Muted Sapphire): `--color-accent: 76 110 168` (#4C6EA8) with `--color-accent-hover: 64 95 146` (#405F92).
- Support: Green (`--color-success`) and Yellow (`--color-warning`) unchanged.

Typography

- Sans: Existing `font-sans` for UI and body copy.
- Serif: Existing `font-serif` (IBM Plex Serif) for long-form content (unchanged).
- Hierarchy: `display`, `heading`, `lead`, `copy`, and `fine` responsive scales preserved.

Glass Panel Styles

- `.glass`: Premium frosted card for hero and product cards. Semi-transparent with blur and subtle ring.
- `.glass-soft`: Softer frosted background for secondary panels (habits, specs, testimonials).
- `.glass-tint`: Glass with subtle sapphire tint for emphasis (comparison panel).
- Button: `.btn-accent` uses vertical accent gradient with high-contrast text.

Micro-Interactions

- Scroll reveal: `Reveal` wrapper component adds `reveal` → `inview` classes via IntersectionObserver for fade/slide-in.
- Hover lifts: Cards use `transform hover:-translate-y-0.5` where meaningful.
- Buttons: Gradient accent with slight brightness on hover; focus-visible outline for accessibility.
- Timeline: Alternating nodes with subtle line and sapphire chips.

Component Mapping

- Hero: Dark gradient background (`.bg-hero`) with a `.glass` text card and product render on the right.
- Product Card/Offer: `.glass` card for price, rating, benefits; accent badge for savings; CTA uses `.btn-accent`.
- Story: `.glass-soft` narrative card + KPI trio (grip width, lab tested, install time).
- Comparison: `.glass-tint` table with accent column for TB7.
- Fit Checker: `.glass` interactive card with input + slider; contextual feedback in success/error tints.
- Habits: Three `.glass-soft` cards with icons and hover lift.
- Timeline: `.glass-soft` items along a subtle center line.
- Specs: `.glass-soft` grid cards with clear labels and values.
- Testimonials: `.glass-soft` quote cards with rating stars.
- Trust Strip: `.glass-soft` strip above CTA area.
- Footer: Already dark and minimal; retained.

Accessibility

- Contrast: All dark-on-light and light-on-dark combinations meet or exceed WCAG AA where used. Glass tints increase ring/outline for readability.
- Keyboard: Buttons/links have visible focus; slider labeled; range and numeric input paired.
- Motion: Reveal animations use low distance and easing; content remains readable without animation.
- Media: Provide alt text for imagery; video should include captions/transcripts.

Performance (Hydrogen/Oxygen)

- Backdrop blur: Use `.glass`/`.glass-soft` sparingly on key panels to limit paint cost; avoid nested blurs.
- Images: Use appropriately sized images; set `loading="eager"` only for hero; use `loading="lazy"` elsewhere. Prefer AVIF/WEBP when possible.
- CSS: Gradients and translucent overlays are GPU-friendly; prefer transforms over box-shadows for motion.
- Suspense/Streaming: Keep product queries streaming as implemented; avoid blocking above-the-fold where not necessary.
- Lighthouse: Target LCP < 2.5s on mid-tier devices; keep main-thread work minimal.

Handoff Notes

- Tokens live in `app/styles/app.css` under `:root`. Tailwind consumes colors via CSS vars (`text-contrast`, etc.).
- Reusable effects: `.bg-hero`, `.glass`, `.glass-soft`, `.glass-tint`, `.btn-accent`, and reveal utilities.
- If adding 3D/spins in hero, prefer `<model-viewer>` with `poster` and `reveal="interaction"` to protect LCP.
- Iconography: Replace emoji with custom line icons when available; keep sizes 20–24px for lists; ensure stroke contrast on dark.

