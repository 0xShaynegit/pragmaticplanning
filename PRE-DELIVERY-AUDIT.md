# Pragmatic Planning - Pre-Delivery Audit

**Last Updated:** 09 June 2026
**Status:** READY - pending analytics token and custom domain
**Live URL:** https://pragmaticplanning.slrclaude.workers.dev

---

## Page Inventory

| Page | File | Status |
|------|------|--------|
| Homepage | `index.html` | Live |
| About | `about.html` | Live |
| Blog index + Feasibility Engine | `blog.html` | Live |
| Disclaimer | `disclaimer.html` | Live |
| Privacy Policy | `privacy-policy.html` | Live |
| Resource Consents (service) | `pragmaticplanning-resource-consents-queenstown.html` | Live |
| Airbnb & Short-Term Accommodation (service) | `pragmaticplanning-airbnb-short-term-accommodation-queenstown.html` | Live |
| Subdivisions (service) | `pragmaticplanning-subdivisions-queenstown-wanaka.html` | Live |
| Planning Advice (service) | `pragmaticplanning-planning-advice-queenstown.html` | Live |
| 11 blog articles | `pragmaticplanning-*.html` | Live |
| Sitemap | `sitemap.xml` | Live |
| Robots | `robots.txt` | Live |
| AI context | `llms.txt` | Live |
| AI agent services | `services.md` | Live |

**Total: 20 HTML pages + support files**

---

## SEO Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Unique title tags | Pass | All pages unique, all under 60 chars |
| Meta descriptions | Pass | All pages |
| Canonical URLs | Pass | Trailing-slash format, matches sitemap |
| Open Graph tags | Pass | All pages |
| Twitter Card tags | Pass | All pages |
| JSON-LD schema | Pass | LocalBusiness+ProfessionalService on homepage, Service+FAQPage on service pages, Person on about |
| FAQPage schema | Pass | All 4 service pages + blog pages (4 Q&A each) |
| Sitemap.xml | Pass | Includes all pages including 4 new service pages |
| robots.txt | Pass | Allow: / with sitemap reference |
| llms.txt | Pass | Added 09 June 2026 |
| No duplicate titles | Pass | Homepage title updated 09 June 2026 |
| Numbers consistent | Pass | 500+, 2015, 15 years across all pages |
| No em dashes | Pass | Removed 09 June 2026 |

---

## Technical Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Fonts local (WOFF2) | Pass | PlayfairDisplay + Inter variable fonts, WOFF2 primary, TTF fallback |
| Font preloads | Pass | index.html has WOFF2 preloads; other pages via @font-face in main.css |
| Images WebP | Pass | All images WebP; hero uses MP4 video |
| No external CDN dependencies | Pass | All fonts, CSS, JS local |
| Relative paths only | Pass | No absolute asset paths |
| Mobile responsive | Pass | Hamburger nav, flexible grid, mobile-specific Richard photo |
| No horizontal scroll | Pass | overflow-x: hidden on html and body |
| Cloudflare Worker | Pass | /api/reviews endpoint live |
| API keys secure | Pass | Reviews key in Worker secret; Maps key domain-restricted |
| Service card animation | Pass | No stagger - all 4 cards animate together |

---

## Outstanding Before Go-Live

| Item | Owner | Priority |
|------|-------|----------|
| Replace `REPLACE_WITH_TOKEN` in all 22+ HTML files | Shayne (needs token from Richard) | Critical |
| Connect `pragmaticplanning.co.nz` to Cloudflare Workers | Richard / Shayne | Critical |
| Add real content to Recent Projects (4x placeholder cards) | Richard | Medium |
| Remove street address from Google Business Profile | Richard | Low |

---

## Known Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| `input.css` has build error (`@apply text-ink`) | Low - main.css is patched directly | Define `ink` in `tailwind.config.js` to re-enable Tailwind rebuilds |
| Maps API key visible in blog.html source | Accepted risk - Maps JS keys are always client-side | Key is domain-restricted to pragmaticplanning.co.nz |

---

## Dependency Audit

| Dependency | Type | Status |
|------------|------|--------|
| Cloudflare Web Analytics | External script | Placeholder token - must replace before go-live |
| Cloudflare Worker | Serverless | Live |
| Google Maps JS API | External (blog.html only) | Domain-restricted |
| GSAP | Local JS | assets/js/gsap.min.js |
| Playfair Display | Local WOFF2 + TTF | assets/fonts/ |
| Inter | Local WOFF2 + TTF | assets/fonts/Inter/ |

---

## Session History (09 June 2026)

- Mobile Richard photo: separate img element with independent CSS, anchored to card bottom
- Google Maps API key rotated after GitGuardian alert; new key domain-restricted
- 4 service pages created (resource consents, airbnb, subdivisions, planning advice)
- Service card stagger animation removed from animate.js - was causing visual misalignment
- Airbnb nav link updated to direct service page URL across all 22 pages
- SEO audit actioned: unique homepage title, sitemap updated, schema upgraded to ProfessionalService, Airbnb title/meta rewritten, service page titles shortened
- Font conversion: WOFF2 files added to project, @font-face in main.css updated, preloads updated
- AI SEO: FAQPage schema injected on all 4 service pages, llms.txt created, services.md created, author and dateModified added to Service schema
- Em dashes removed site-wide; credential hyphens corrected on about.html
