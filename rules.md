# Pragmatic Planning - Project Rules

**Project:** Pragmatic Planning (Resource Consent Consultancy)
**Client:** Richard Kemp
**Last Updated:** 09 June 2026
**Deployment:** Cloudflare Workers (Workers Assets, not Pages)

---

## Pages

### Core Pages
- `index.html` - Homepage
- `about.html` - Richard Kemp profile
- `blog.html` - Blog index + Feasibility Engine
- `disclaimer.html` - Legal disclaimer
- `privacy-policy.html` - Privacy policy

### Service Pages (added 09 June 2026)
- `pragmaticplanning-resource-consents-queenstown.html` - canonical: `/resource-consents-queenstown/`
- `pragmaticplanning-airbnb-short-term-accommodation-queenstown.html` - canonical: `/airbnb-short-term-accommodation-queenstown/`
- `pragmaticplanning-subdivisions-queenstown-wanaka.html` - canonical: `/subdivisions-queenstown-wanaka/`
- `pragmaticplanning-planning-advice-queenstown.html` - canonical: `/planning-advice-queenstown/`

### Blog Articles (11 posts)
All named `pragmaticplanning-[slug].html`. Canonical URLs use slug format without filename prefix.

### Support Files
- `sitemap.xml` - includes all core, service, and blog pages
- `robots.txt` - Allow: / with sitemap reference
- `llms.txt` - AI system context file (added 09 June 2026)
- `services.md` - Machine-readable service descriptions for AI agents (added 09 June 2026)

---

## Asset Structure

```
assets/
├── css/
│   ├── main.css          (Compiled Tailwind - patch directly, do not rebuild)
│   └── input.css         (Source - has build error: @apply text-ink fails)
├── fonts/
│   ├── PlayfairDisplay-VariableFont_wght.ttf       (fallback)
│   ├── PlayfairDisplay-VariableFont_wght.woff2     (primary)
│   ├── PlayfairDisplay-Italic-VariableFont_wght.ttf
│   ├── PlayfairDisplay-Italic-VariableFont_wght.woff2
│   └── Inter/
│       ├── Inter-VariableFont_opsz,wght.ttf        (fallback)
│       └── Inter-VariableFont_opsz,wght.woff2      (primary)
├── img/
│   ├── pragmaticplanning-social-share.webp         (OG image 1200x630)
│   ├── pragmaticplanning-richard-kemp-profile.webp (desktop, 896x1197)
│   ├── pragmaticplanning-richard-kemp-profile-mobile.webp (mobile copy)
│   ├── pragmaticplanning-hero-bw.mp4               (hero background video)
│   └── [blog article images - WebP]
└── js/
    ├── animate.js        (GSAP scroll animations - service cards use NO stagger)
    ├── cursor.js         (custom cursor with data-cursor-label support)
    ├── feasibility.js    (QLDC feasibility engine - used on blog.html only)
    └── gsap.min.js       (GSAP library)
```

---

## CSS Rules

- `main.css` is compiled Tailwind. Do not run a rebuild - `input.css` has a build error (`@apply text-ink` in `@layer base`). Patch `main.css` directly.
- Fix for build error: define `ink` colour in `tailwind.config.js`, then rebuild will work.
- `@font-face` in `main.css` points to WOFF2. TTF files are retained as browser fallback.
- Font preloads on `index.html` use WOFF2. Other pages rely on `main.css` `@font-face` only.

---

## Design System

### Typography
- **Headings:** Playfair Display Variable (serif)
- **Body:** Inter Variable (sans-serif)

### Colours
- **Background:** `#fcfaf2` (off-white canvas)
- **Text/Dark:** `#0a0a0a`
- **Dark sections:** `#0a0a0a` background with `#fcfaf2` text

### Key CSS Patterns
- `.service-card` - equal height via `grid-auto-rows: 1fr`. Entrance animation has NO stagger (all 4 cards animate together). Root cause of past misalignment: stagger in `animate.js` was removed 09 June.
- `.richard-card-photo` desktop: `position: absolute`, width 380px, height stretches to text column via `align-items: stretch`. DO NOT change width without understanding - height is derived from it.
- Mobile Richard photo: separate `<img class="richard-photo-mobile">` using `-profile-mobile.webp`. `position: absolute; bottom: 0; right: -40px; height: 460px`. Desktop img hidden on mobile, mobile img hidden on desktop.
- Do not use `.visually-hidden` inside `.hero-headline` - the absolute positioning renders visibly at hero scale.

---

## Infrastructure

### Cloudflare Worker
- Worker name: `pragmaticplanning`
- `_worker.js` handles `/api/reviews` endpoint
- `GOOGLE_API_KEY` stored as Worker secret (never in code)
- `.assetsignore` excludes `_worker.js` from static assets
- Allowed origins: `pragmaticplanning.slrclaude.workers.dev` and `pragmaticplanning.co.nz`

### Google API Keys
- **Reviews key:** Server-side Worker secret `GOOGLE_API_KEY` (rolled twice, never in code)
- **Feasibility/Maps key:** `AIzaSyBmjbU31JkagqQhOnU2caCdqGMdTcZwHtA` in `blog.html` line ~471. Restricted to `pragmaticplanning.co.nz` domain. Previous key rotated 09 June after GitGuardian alert.
- **Place ID:** `ChIJa8tLe4Md1akRE1bdhNsvO_g`

### Feasibility Engine
- Lives on `blog.html` only
- Google Maps JS API loaded WITHOUT `loading=async` (required for Places autocomplete timing)
- QLDC detection checks: adminArea, locality, sublocality, AND formatted_address

---

## SEO Configuration

### Schema
- **Homepage:** `["LocalBusiness", "ProfessionalService"]` + `WebSite`
- **About:** `Person` (Richard Kemp, with alumniOf, knowsAbout)
- **Service pages:** `Service` + `FAQPage` (4 Q&A each, `datePublished`, `dateModified`, `author`)
- **Blog pages:** `Article` or `BlogPosting` + `FAQPage`

### Page Titles
- Homepage: `Town Planning Consultants Queenstown & Wanaka | Pragmatic Planning`
- Resource Consents: `Resource Consents Queenstown & Wanaka | Pragmatic Planning`
- Airbnb: `Airbnb & Short-Term Accommodation Consent Queenstown | Pragmatic Planning`
- Subdivisions: `Subdivision Consent Queenstown & Wanaka | Pragmatic Planning`
- Planning Advice: `Planning Advice Queenstown & Wanaka | Pragmatic Planning`
- About: `About Richard Kemp | Pragmatic Planning Queenstown`

### Analytics
- Cloudflare Web Analytics beacon in every `<head>`
- Token placeholder: `REPLACE_WITH_TOKEN` - replace across all 22+ HTML files before go-live

---

## Navigation

Desktop + mobile hamburger drawer. Links:
- About | Services | Airbnb & Short-Term Rentals | Projects | Discuss Your Project

Airbnb link points directly to the Airbnb service page. Updated across all pages 09 June 2026.

Contact bar above nav: `021 104 3405` | `info@pragmaticplanning.co.nz`

---

## Content Rules

### Numbers (locked - do not change)
- **500+** planning approvals
- **2015** established
- **15 years'** experience
- Richard is a **former QLDC planner**

### Writing
- No em dashes. Use hyphens or sentence breaks.
- NZ English spelling.
- No meth protocol content on Airbnb page.

---

## Pending (as at 09 June 2026)

1. **Analytics token** - replace `REPLACE_WITH_TOKEN` across all HTML files
2. **Custom domain** - connect `pragmaticplanning.co.nz` to Cloudflare Workers
3. **Recent Projects section** - 4x placeholder cards need real content from Richard
4. **Google Business Profile** - Richard to remove street address

## On Domain Go-Live
1. `_worker.js` already allows `pragmaticplanning.co.nz` in origins
2. Replace analytics token site-wide
3. Test Core Web Vitals
4. Submit sitemap to Google Search Console
