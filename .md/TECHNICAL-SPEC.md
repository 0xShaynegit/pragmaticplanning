# Pragmaticplanning Co – Technical Specification

**Project:** Pragmaticplanning Co Website
**URL:** pragmaticplanning.co.nz
**Type:** Static HTML website
**Version:** 1.0
**Last Updated:** 2026-05-29

---

## 1. Technology Stack

### Core Technologies

- **HTML5** – Semantic markup, pure HTML structure
- **CSS3** – Single stylesheet architecture
- **JavaScript** – Minimal, optional enhancements only
- **WebP** – Images in WebP format for performance

### Hosting & Deployment

- **Version Control:** GitHub repository
- **CDN/Hosting:** Cloudflare Pages
- **DNS:** Cloudflare
- **SSL/TLS:** Automatic via Cloudflare (Full SSL)

### Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)

---

## 2. File Structure

```
/pragmaticplanning-co
  /index.html              # Homepage (root)
  /pages
    /*.html                # Subpages (flat structure)
  /images
    /*.webp                # All images in WebP format
  /css
    /style.css             # Main stylesheet
  /js
    /main.js               # Optional JavaScript
  /fonts
    /*.woff2               # Local font files
  /assets
    /                      # Additional assets as needed
  /sitemap.xml             # SEO sitemap
  /robots.txt              # Crawler permissions
  /wrangler.jsonc          # Cloudflare Pages config
  /.md/                    # Documentation (gitignored)
    /HANDOVER.md           # Maintenance guide
    /TECHNICAL-SPEC.md     # This document
  .gitignore               # Git configuration
```

---

## 3. URL Structure & Routing

### URLs

- Home: `/` or `/index.html`
- Subpages: `/pages/[pagename].html`

### Relative Path Rules

**From index.html (root):**
- Internal pages: `href="pages/pagename.html"`
- Images: `src="images/filename.webp"`
- CSS: `href="css/style.css"`
- Fonts: `href="fonts/font-file.woff2"`

**From /pages/*.html (inner pages):**
- Home: `href="../index.html"`
- Other pages: `href="pagename.html"` (same folder)
- Images: `src="../images/filename.webp"`
- CSS: `href="../css/style.css"`

---

## 4. Design System

### Visual Theme

- **Style:** Professional, clean, accessible
- **Typography:** System font stack or custom web fonts
- **Color Palette:** Define primary, secondary, and neutral colors
- **Spacing:** Generous white space, consistent margins/padding
- **Shadows:** Subtle elevations for hierarchy
- **Responsive:** Mobile-first design

### Layout Patterns

- **Header:** Clear navigation, visible on all pages
- **Sections:** Full-width containers with centered content
- **Cards:** Consistent hover states and interactions
- **Images:** Responsive sizing with proper aspect ratios
- **Footer:** Navigation and contact information

### CSS Architecture

- Single main file or organized folder structure
- No CSS frameworks (unless intentional)
- Mobile-first responsive design
- Standard breakpoints: 480px, 768px, 1024px+

### Component Standards

- All interactive elements have visible focus states
- Sufficient color contrast for accessibility (4.5:1 text)
- Consistent spacing and alignment
- Clear visual hierarchy

---

## 5. SEO Implementation

### On-Page SEO

**Required on every page:**
- Unique `<title>` (50-60 characters)
- Unique `<meta name="description">` (140-155 characters)
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Canonical URL: `<link rel="canonical" href="https://pragmaticplanning.co.nz/">`

**Content Requirements:**
- One H1 per page (unique, descriptive)
- Hierarchical headings (H2, H3, no skipping)
- Alt text on every image (descriptive, natural keywords)
- Internal linking between related pages
- External links: `target="_blank" rel="noopener"`

### Technical SEO

**sitemap.xml:**
- Lists all public pages
- Includes priority and lastmod timestamps
- Updates when content changes

**robots.txt:**
- Standard directives for crawlers
- Points to sitemap.xml

---

## 6. Performance Optimization

### Images

- **Format:** WebP primary, PNG/JPG fallback if needed
- **Compression:** 70-85% quality for WebP
- **Naming:** Descriptive, lowercase, hyphens (e.g., `hero-banner.webp`)
- **Sizes:**
  - Hero images: ~1200px wide minimum
  - Content images: 600-1000px wide
  - Logo/icons: 200-400px wide
- **Lazy loading:** `loading="lazy"` on below-fold images
- **Alt text:** Always present, descriptive, keyword-aware

### CSS

- Single file or organized structure, minified for production
- No unused rules
- Mobile-first approach
- CSS variables for theming (recommended)

### JavaScript

- Minimal or vanilla only
- Defer loading: `<script src="..." defer></script>`
- No unnecessary external libraries
- Progressive enhancement approach

### Caching

- Cloudflare automatic caching (all static assets)
- Cache-Control headers optimized
- Browser caching leverages Cloudflare's defaults

---

## 7. Forms & Integrations

### Contact Forms (if applicable)

**Implementation approach:**
- Static HTML forms
- Submission via third-party service (Calendly, Formspree, etc.) or email

**Required fields (example):**
- Name
- Email
- Message or inquiry description
- Optional: Phone, company, subject

### External Integrations

- **Analytics:** Google Analytics 4 (GA4) or Cloudflare Analytics (optional)
- **Booking:** Calendly or similar (if applicable)
- **Email:** Processed via third-party service or Cloudflare Workers
- **Social:** Links to social profiles (LinkedIn, Twitter, etc.)

### Links & CTAs

- Primary CTA: Clear, visible call-to-action
- Secondary CTAs: Supporting conversions
- Email CTAs: `mailto:` links
- Social links: New tab with `rel="noopener"`

---

## 8. Browser & Device Support

### Browsers (Desktop)

- Chrome 90+ (latest 2 versions)
- Firefox 88+ (latest 2 versions)
- Safari 14+ (latest 2 versions)
- Edge 90+ (latest 2 versions)

### Browsers (Mobile)

- Safari iOS 14+
- Chrome Android 90+
- Samsung Internet 14+

### Devices

- Desktop: 1920x1080 down to 1280x720
- Tablet: 1024x768, 768x1024
- Mobile: 375x667 up to 428x926

### Accessibility

- WCAG 2.1 Level AA minimum
- Keyboard navigation support
- Sufficient color contrast (4.5:1 for text)
- Screen reader friendly (semantic HTML)
- Focus indicators visible
- Semantic HTML5 structure

---

## 9. Content Guidelines

### Word Count Targets

- Home: 800-1,500 words
- Subpages: 500-1,500 words (vary by page type)

### Writing Style

- Professional, clear, accessible language
- Short paragraphs (2-4 sentences)
- Active voice preferred
- Natural keyword integration (no stuffing)
- Focus on benefits and outcomes
- Clear value propositions

### Image Requirements

- All images WebP format (or PNG for transparency)
- Descriptive filenames
- Alt text always present
- Minimum 1200px wide for hero images
- 600-1000px wide for content images
- Aspect ratios: varies by section

---

## 10. Security & Privacy

### SSL/HTTPS

- Enforced via Cloudflare (Full SSL mode)
- HTTP redirects to HTTPS automatically
- HSTS header enabled
- Certificate auto-renewal

### Form Security

- No sensitive data stored in static files
- Form submissions via secure third-party service
- Input validation and sanitization
- HTTPS only (enforced by Cloudflare)

### Privacy Considerations

- No cookies (unless GA4 enabled)
- If using GA4: add privacy policy page
- External links: `rel="noopener"` on `target="_blank"`
- No tracking pixels or unnecessary third-party scripts
- Clear privacy policy if collecting any data

### Data Handling

- Contact information: Email only (no persistence)
- No user accounts or login system
- No data persistence in static site
- Compliance with applicable privacy laws

---

## 11. Deployment Workflow

### GitHub to Cloudflare Pages

1. Code changes pushed to `main` branch on GitHub
2. Cloudflare Pages webhook triggered automatically
3. Build process: Static files served as-is (no build step needed)
4. Deploy to production (< 1 minute)
5. Cloudflare CDN distributes globally

### Branch Strategy

- **main** branch: Production (live site)
- Feature branches for major updates (optional)
- Pull requests for review before merge to main

### Pre-Deployment Checklist

- [ ] All images compressed and in WebP format
- [ ] Alt text on all images
- [ ] All internal links tested and working
- [ ] Meta titles and descriptions unique per page
- [ ] sitemap.xml updated with all pages
- [ ] Mobile responsive on all pages (test at 375px, 768px, 1200px)
- [ ] No console errors in browser dev tools
- [ ] Lighthouse score 90+ on all metrics
- [ ] Contact/booking links functional
- [ ] External links open in new tab

---

## 12. Maintenance Schedule

### Regular Updates

- **Content updates:** As needed (new pages, refreshes)
- **Security:** Monitor Cloudflare advisories (monthly)
- **Performance:** Quarterly Lighthouse audit
- **Broken links:** Quarterly checks
- **Analytics:** Monthly review (if GA4 enabled)

### Backup Strategy

- Git repository is version control (full history)
- Cloudflare Pages keeps deployment history (30 days)
- Download static files periodically for local backup

---

## 13. Known Limitations

- No dynamic content (all static HTML)
- No user accounts or login system
- No real-time availability calendar
- No blog/CMS (would require separate solution)
- No e-commerce or payment processing (unless integrated separately)

---

## 14. Future Enhancements (Optional)

- Add blog section via static site generator (Hugo, Jekyll)
- Implement case studies or testimonials
- Add video content (YouTube embeds)
- Real-time booking calendar
- Multi-language support
- Progressive Web App (PWA) features
- Newsletter signup integration
- Advanced schema markup

---

## 15. File Size & Performance Budget

### Target Sizes (per page load)

- **HTML:** < 50 KB
- **CSS:** < 30 KB
- **JavaScript:** < 20 KB
- **Images:** < 500 KB combined per page
- **Fonts:** < 100 KB (WOFF2, subset)
- **Total:** < 700 KB per page

### Optimization Checklist

- [ ] Gzip/Brotli compression enabled
- [ ] Image compression verified (WebP 70-85% quality)
- [ ] CSS minified
- [ ] JavaScript minified (if used)
- [ ] Fonts subset to necessary characters
- [ ] Lazy loading on below-fold images

---

## 16. Support & Contact

**Primary Maintainer:** [Client Name]
**Repository:** GitHub
**Hosting Dashboard:** Cloudflare Pages
**Domain:** pragmaticplanning.co.nz
**Email:** [client@email.com]

For technical issues, refer to the Handover Guide or contact the developer who built the site.

---

**Document Version:** 1.0
**Last Updated:** 2026-05-29
**Next Review:** 2027-05-29
