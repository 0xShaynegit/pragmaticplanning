# Pragmatic Planning - Handover

**Date:** 06 June 2026
**Status:** Live on workers.dev - pending custom domain connection

---

## Current State

Site is live at: `https://pragmaticplanning.slrclaude.workers.dev`

---

## Recent Changes (06 June)

### Homepage Restructure
Page layout - section order:
1. Hero
2. Services (4x cards, equal height)
3. Why Pragmatic Planning (values grid - dark bg)
4. Recent Projects (4x placeholder cards - content TBC from Richard)
5. Testimonials (3 existing quotes - dark bg)
6. About (Pragmatic definition + Richard card - dark bg)
7. Google Reviews (live - dark bg)
8. Contact

### Navigation
- Links: About | Services | Airbnb & Short-Term Rentals | Projects | Discuss Your Project
- Contact bar above nav: phone + email always visible (dark strip)
- Blog removed from nav; "News" link in footer

### Hero
- Eyebrow: QUEENSTOWN LAKES PLANNING SPECIALISTS
- New subtext copy
- Credentials line: 500+ Planning Approvals Secured · Queenstown Based · Former QLDC Planner
- CTA: Discuss Your Project

### Live Google Reviews Section
- Fetches from `/api/reviews` - handled by `_worker.js` in project root
- `_worker.js` intercepts `/api/reviews`, calls Google Places API server-side, serves static assets for everything else
- Full review text shown, no truncation
- Footer shows live rating + review count
- "Read All Reviews on Google" button links to Google profile

---

## Infrastructure

### Cloudflare Worker
- Worker name: `pragmaticplanning`
- `_worker.js` in project root handles API routing
- `GOOGLE_API_KEY` bound as a secret directly on the Worker (set via API)
- `.assetsignore` excludes `_worker.js` and `_worker/` from static assets

### Google Places API
- Place ID: `ChIJa8tLe4Md1akRE1bdhNsvO_g`
- API key restriction: **None** (key is server-side only, never exposed to browser)
- Key stored as Worker secret `GOOGLE_API_KEY`

### Known Issue
- `assets/css/input.css` has a pre-existing build error: `@apply text-ink` in `@layer base` - `text-ink` not defined as Tailwind utility. `main.css` must be patched directly. Fix: define `ink` colour in `tailwind.config.js`.

---

## Pending

- **Recent Projects**: 4x placeholder cards need real content from Richard
- **Analytics token**: Replace `REPLACE_WITH_TOKEN` in `index.html` with Cloudflare Web Analytics token
- **Custom domain**: Connect `pragmaticplanning.co.nz` to Cloudflare Workers deployment

## On Domain Go-Live
1. `_worker.js` already includes `pragmaticplanning.co.nz` in allowed origins
2. No changes needed to `reviews.js` - uses relative `/api/reviews` path
3. Replace analytics token
4. Test Core Web Vitals

---

## Git - Latest Commits
- `48cc508` - Show full review text
- `a90ac1d` - Trigger redeploy
- `f58d94b` - Add .assetsignore
- `b136a7b` - Fix reviews API via _worker.js
- `5cbca61` - Add Google Reviews section
