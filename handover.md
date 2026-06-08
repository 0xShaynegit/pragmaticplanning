# Pragmatic Planning - Handover

**Date:** 09 June 2026 (updated x3)
**Status:** Live on workers.dev - pending custom domain connection

---

## Current State

Site is live at: `https://pragmaticplanning.slrclaude.workers.dev`

---

## Homepage Section Order

1. Hero
2. Services (4x cards - SEE PROJECT cursor NOT on these)
3. Why Pragmatic Planning (values grid - dark bg)
4. Recent Projects (4x placeholder cards - SEE PROJECT cursor on all four)
5. Testimonials (3 quotes + Google Reviews stars block - dark bg)
6. About (Richard card only - dark bg) - definition block removed
7. Contact

### Navigation
- Links: About | Services | Airbnb & Short-Term Rentals | Projects | Discuss Your Project
- Contact bar above nav: phone + email always visible (dark strip)
- Blog removed from nav; "News" link in footer
- All non-index pages use index.html header and footer (updated 09 June)

### About Section (Homepage)
- Single richard-card, no definition block
- Copy: Founded by Richard Kemp, 500+ approvals, former QLDC planner, established 2015
- CTA: "Learn More" links to about.html
- Desktop photo: absolutely positioned inside container, width 380px, height locked to text column height via `align-items: stretch`. Wrapped in `@media (min-width: 768px)`. DO NOT change width without understanding this - height stays fixed regardless of width changes.
- Mobile photo: separate img element (`richard-photo-mobile`) using `pragmaticplanning-richard-kemp-profile-mobile.webp`. Position absolute, anchored to bottom of card, right: -40px, height: 460px, margin-top: -1rem on container. Desktop img hidden on mobile, mobile img hidden on desktop.

### About Page
- Stats updated: 500+ planning approvals (was 250+), 2015 founding confirmed
- All meta descriptions, JSON-LD, hero stat, timeline copy updated

### Google Reviews Button
- Links to Google Maps business profile
- URL includes `#lrd=` hash to open reviews panel

---

## Infrastructure

### Cloudflare Worker
- Worker name: `pragmaticplanning`
- `_worker.js` in project root handles API routing
- `GOOGLE_API_KEY` bound as a secret directly on the Worker
- `.assetsignore` excludes `_worker.js` and `_worker/` from static assets
- No CORS references in code - variable named `responseHeaders`

### Google API Keys
- **Reviews key**: Server-side only, stored as Worker secret `GOOGLE_API_KEY` (rolled twice)
- **Feasibility key**: `AIzaSyBmjbU31JkagqQhOnU2caCdqGMdTcZwHtA` - in blog.html, restricted to pragmaticplanning.co.nz domain. Previous key rotated 09 June 2026 after GitGuardian flagged it in repo history.
- Place ID: `ChIJa8tLe4Md1akRE1bdhNsvO_g`

### Feasibility Engine
- Lives on blog.html (removed from homepage)
- Google Maps JS API loaded without `loading=async` (required for Places autocomplete timing)
- QLDC locality list includes: jack's point, frankton, fernhill, kelvin heights, lake hayes, shotover, closeburn, albert town, hawea flat, makarora, cardrona, etc.
- Checks adminArea, locality, sublocality AND formatted_address for QLDC detection

### Known Issue
- `assets/css/input.css` has a pre-existing build error: `@apply text-ink` in `@layer base`. `main.css` must be patched directly. Fix: define `ink` colour in `tailwind.config.js`.

---

## Pending

- **Recent Projects**: 4x placeholder cards need real content from Richard
- **Analytics token**: Replace `REPLACE_WITH_TOKEN` in all HTML files with Cloudflare Web Analytics token
- **Custom domain**: Connect `pragmaticplanning.co.nz` to Cloudflare Workers deployment
- **Google Business Profile**: Richard to remove street address to prevent property listings appearing behind reviews panel

## On Domain Go-Live
1. `_worker.js` already includes `pragmaticplanning.co.nz` in allowed origins
2. No changes needed to `reviews.js` - uses relative `/api/reviews` path
3. Replace analytics token in all HTML files
4. Test Core Web Vitals

---

## Service Pages (added 09 June)

Four service pages created and linked from homepage service cards:
- `pragmaticplanning-resource-consents-queenstown.html`
- `pragmaticplanning-airbnb-short-term-accommodation-queenstown.html`
- `pragmaticplanning-subdivisions-queenstown-wanaka.html`
- `pragmaticplanning-planning-advice-queenstown.html`

Content sourced from QLDC rules and user-supplied briefs. Airbnb page covers activity status (Homestay/Unhosted VA/Structure Plan Areas), not meth protocols. Subdivisions page covers UIV 11m density rules and Section 224(c) path.

### Service Cards Animation Fix
- Root cause of cards appearing misaligned: GSAP stagger in `assets/js/animate.js` was animating card 01 in first (y:32, 0.13s stagger) while card 02 sat at rest, creating apparent height difference during entrance.
- Fix: removed stagger so all 4 cards animate in together. CSS hover `transform: none` override also added to `#services` but the JS stagger was the real culprit.

## Git - Latest Commits
- `a71d5c7` - Remove stagger from service cards, all animate together
- `909979d` - Reduce service card entrance animation y distance and stagger
- `75ca848` - Reduce service card hover lift to 1px
- `2bab156` - Remove translateY hover on service cards to fix alignment
- `b79938e` - Simplify card CSS, keep title min-height only
- `b5c60b6` - Rotate Google Maps API key
