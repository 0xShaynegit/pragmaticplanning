# Pragmatic Planning - Handover

**Date:** 09 June 2026 (updated x7)
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

## SEO Fixes (09 June 2026)

All 8 audit items actioned:
- Homepage title changed to `Town Planning Consultants Queenstown & Wanaka` (was duplicate of resource consents page)
- 4 service pages added to sitemap.xml with 2026-06-09 lastmod, priority 0.8
- Airbnb page title/meta rewritten -- meth references removed, clean keyword title
- Subdivisions title: `Subdivision Consent Queenstown & Wanaka` (47 chars)
- Planning Advice title: `Planning Advice Queenstown & Wanaka` (36 chars)
- Homepage H1: visually-hidden keyword H1 added, brand line `We Get It Granted.` preserved visually
- About H1: same pattern -- `Richard Kemp, Town Planning Consultant Queenstown` hidden
- LocalBusiness schema upgraded to `[`LocalBusiness`, `ProfessionalService`]`
- Fonts converted to WOFF2: PlayfairDisplay and Inter variable fonts copied from master vault, @font-face in main.css updated, preload tags on index.html updated
- Numbers audit: 250+ corrected to 500+ in homepage meta/OG/Twitter descriptions

Skipped (still pending):
- Analytics token: replace `REPLACE_WITH_TOKEN` across all 22 HTML files once Cloudflare token available
- Font WOFF2 files exist at `assets/fonts/` -- TTF files retained as fallback

## AI SEO (09 June 2026)

All 5 audit items actioned:
- **FAQPage schema** added to all 4 service pages. 4 Q&A pairs per page extracted from existing accordion content. Directly extractable by Google AI Overviews and Perplexity.
- **datePublished + dateModified** (2026-06-09) added to Service schema on all 4 service pages.
- **Author attribution** (Richard Kemp, Town Planning Consultant, with about/ URL) added to Service schema on all 4 service pages.
- **`llms.txt`** created at site root. Gives AI systems quick context: what the business does, key facts (500+, 15 years, 2015), all service page URLs.
- **`services.md`** created at site root. Machine-readable structured service descriptions with timeframes and pricing signals for AI agents.

Note: statistics in service page body copy reference QLDC rules and RMA directly in context but do not have inline hyperlinks to source documents. Adding source links to body stats is a future improvement if AI citation rate needs further boosting.

## Contact Form (added 09 June 2026)

- `/api/contact` endpoint added to `_worker.js`
- Sends to `richard@pragmaticplanning.co.nz` via Resend API
- Reply-to set to submitter's email so Richard can reply directly
- Honeypot spam protection (hidden `website` field)
- Input validation and sanitisation in Worker
- Success/error UI states on form in `index.html`
- `RESEND_API_KEY` stored as Worker secret on Richard's Cloudflare account
- `pragmaticplanning.co.nz` verified in Resend dashboard
- From address: `noreply@pragmaticplanning.co.nz`
- Delivery confirmed working 09 June 2026

### DNS fixes applied (09 June 2026)
- Cloudflare Email Routing disabled (was intercepting inbound mail)
- Duplicate DMARC record removed
- SPF cleaned up: `v=spf1 include:_spf.google.com include:resend.com ~all`
- Old cPanel records removed (`default._domainkey`, `websitewelcome.com` SPF include)
- Google Workspace DKIM signing enabled in Google Admin (Apps > Gmail > Authenticate email)
- MX records confirmed pointing to Google

## GitHub Actions (added 09 June 2026)

- `.github/workflows/deploy.yml` - auto-deploys to Cloudflare Workers on every push to `main`
- `CLOUDFLARE_API_TOKEN` stored as GitHub repo secret
- No manual `wrangler deploy` needed going forward

## Infrastructure Notes

- Worker now on Richard's Cloudflare account: `pragmaticplanning.richmannz.workers.dev`
- Git remote updated to `https://github.com/richmannz/pragmaticplanning.git`
- `.assetsignore` updated to exclude `.git/`, `.md/`, `node_modules/` from asset uploads

---

## Git - Latest Commits
- `881abb6` - ci: add GitHub Actions auto-deploy to Cloudflare Workers on push to main
- `7f2d130` - fix: update CORS allowed origin to richmannz.workers.dev
- `7f78db7` - fix: exclude .git, .md, node_modules from Workers asset upload
- `f855c23` - feat: Contact form with Resend email delivery
- `3cce1ad` - AI SEO: FAQPage schema, author/date on Service schema, llms.txt, services.md
- `03d7b32` - Update handover.md
- `0fd06bd` - Convert fonts to WOFF2
- `4645a50` - SEO fixes: titles, H1s, schema type, sitemap, Airbnb meta
- `6026d00` - Fix 250+ to 500+ in homepage meta descriptions
- `82b1d1c` - Update Airbnb nav link to point directly to service page on all pages
- `a71d5c7` - Remove stagger from service cards, all animate together
- `909979d` - Reduce service card entrance animation y distance and stagger
- `75ca848` - Reduce service card hover lift to 1px
- `2bab156` - Remove translateY hover on service cards to fix alignment
- `b79938e` - Simplify card CSS, keep title min-height only
- `b5c60b6` - Rotate Google Maps API key
