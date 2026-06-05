# Pragmatic Planning   Project Rules

**Project:** Pragmatic Planning (Resource Consent Consultancy)  
**Client:** Richard Kemp  
**Scope:** Static HTML website (11 pages + blog articles)  
**Delivery Date:** 05 June 2026  
**Deployment:** Cloudflare Pages

---

## 📋 Project Architecture

### Pages
- **index.html**   Homepage (value prop + case studies)
- **about.html**   Team + experience
- **blog.html**   Blog index + article listing
- **disclaimer.html**   Legal disclaimer
- **privacy-policy.html**   Privacy policy
- **pragmaticplanning-*.html**   Individual blog articles (11 posts)

### Assets Structure
```
assets/
├── css/
│   └── main.css          (Compiled Tailwind CSS - DO NOT EDIT)
├── fonts/
│   ├── PlayfairDisplay-VariableFont_wght.ttf
│   └── Inter/
│       └── Inter-VariableFont_opsz,wght.ttf
├── img/
│   ├── pragmaticplanning-social-share.webp
│   └── [article images]
└── js/
    └── [no runtime scripts currently]
```

### Build Tools (Included for CSS Customisation)
- `package.json`   NPM dependencies (Tailwind CSS compiler)
- `tailwind.config.js`   Tailwind CSS configuration
- `node_modules/`   NOT included (run `npm install` to create)
- `assets/css/input.css`   Tailwind source CSS (edit this to change styles)
- `.wranglerignore`   Wrangler deploy filter
- `wrangler.jsonc`   Cloudflare Workers configuration

### Archive (Not Deployed)
- `Old Content/`   Legacy WordPress export (read-only reference)
- `.md/`   Markdown source files (reference only)

---

## 🎨 Design System

### Typography
- **Headings:** Playfair Display Variable (serif)
- **Body:** Inter Variable (sans-serif)
- **Weights:** 400 (regular), 600 (semibold), 700 (bold)

### Colours
- **Primary:** Teal/blue (#0369a1 range)
- **Accent:** Warm gold/tan
- **Text:** Dark gray (#0a0a0a)
- **Background:** Off-white (#fcfaf2)

### Spacing System
Tailwind CSS (standard rem scale). See `assets/css/main.css` for compiled utility classes.

---

## 🔗 Technical Constraints

### Portability
✅ **All assets are local**   No external CDNs or remote dependencies  
✅ **Relative paths only**   Assets reference `assets/css/`, `assets/img/`, `assets/fonts/`  
✅ **Self-contained folder**   Can be deployed to any domain/subdirectory  

### Analytics
- **Provider:** Cloudflare Web Analytics
- **Script:** `<script defer src='https://static.cloudflareinsights.com/beacon.min.js'></script>`
- **Token Placeholder:** `"REPLACE_WITH_TOKEN"` (see handover.md for setup)

### SEO
- ✅ JSON-LD schema present (LocalBusiness + Article types)
- ✅ Open Graph tags (all pages)
- ✅ Twitter Card tags
- ✅ Canonical URLs (hardcoded to https://pragmaticplanning.co.nz)
- ✅ Meta descriptions (all pages)
- ✅ sitemap.xml (auto-generated list)
- ✅ robots.txt (standard allow all)

---

## 📝 Content Rules

### Canonical URLs
Hardcoded as `https://pragmaticplanning.co.nz/[slug]/`. Update on redeployment if domain changes.

### Open Graph Images
All OG images reference `https://pragmaticplanning.co.nz/assets/img/pragmaticplanning-social-share.webp`  
File location: `assets/img/pragmaticplanning-social-share.webp` (1200×630px, WebP)

### Navigation
Mobile hamburger menu + responsive nav. Mobile-first CSS with media queries at 768px breakpoint.

---

## 🛠 Deployment Checklist

Before going live:

1. **Analytics Token**   Replace all instances of `"REPLACE_WITH_TOKEN"` with actual Cloudflare token
2. **Canonical URLs**   Verify domain matches (currently pragmaticplanning.co.nz)
3. **OG Images**   Confirm social-share.webp is accessible
4. **Font Preloads**   Verify font files load correctly
5. **Mobile Testing**   Test navigation + layout on 320px, 768px, 1024px
6. **Page Load**   Check Core Web Vitals (LCP, FID, CLS)

---

## 📦 Files NOT Included in Handover

These were removed for portability:
- `node_modules/` (21MB)   Dev dependency
- `package.json` / `package-lock.json`   Build config (if rebuild needed, keep separate)
- `.git/`   Git history (if needed, restore from archive)

---

## 🔄 Future Maintenance

### CSS Changes
`assets/css/main.css` is compiled from `assets/css/input.css` using Tailwind CSS. To edit CSS:

1. **First time:** Run `npm install` (creates node_modules folder with Tailwind)
2. Edit `assets/css/input.css` to add/change styles
3. Run `npm run build` to recompile `main.css` with your changes
4. Refresh browser to see changes (or use `npm run dev` for watch mode)
5. Deploy the updated folder (main.css will have your changes)

### Adding New Pages
1. Use an existing page as template (e.g., copy blog article)
2. Update `<title>`, meta tags, canonical URL
3. Ensure `assets/css/main.css` link is present
4. Test responsive layout

### Blog Articles
Structure: Heading → TL;DR → Content sections → FAQ (optional) → Call-to-action

---

## ✍️ Last Updated
05 June 2026   Pre-handover audit and cleanup
