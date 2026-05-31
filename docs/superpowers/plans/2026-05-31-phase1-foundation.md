# Pragmatic Planning Phase 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the Pragmatic Planning site with Tailwind CLI design tokens, local fonts, and a complete Homepage with GRANTED Hero and Success Feed Status Tag Grid.

**Architecture:** Pure HTML5 + compiled Tailwind CSS. No frameworks. No CDN scripts. Fonts served locally (Inter from team vault; Playfair Display via Google Fonts CDN until localised pre-ship). Tailwind CLI compiles `assets/css/input.css` to `assets/css/main.css`. All custom design tokens live in `tailwind.config.js`.

**Tech Stack:** Tailwind CLI v3, Vanilla HTML5/CSS3, Inter (local WOFF2), Playfair Display (Google Fonts CDN - flag for localisation), zero JS in Phase 1.

**Stop Criteria:** Show `index.html` and `tailwind.config.js` to user for visual approval before Phase 2 (GSAP + Google Places API).

---

## File Structure

```
C:\1myguy\projects\pragmaticplanning\
├── package.json                        # tailwindcss dev dependency
├── tailwind.config.js                  # Design system tokens (colours, fonts, border widths)
├── assets/
│   ├── css/
│   │   ├── input.css                   # Tailwind directives + @font-face + custom utilities
│   │   └── main.css                    # Compiled output (do not edit manually)
│   ├── fonts/
│   │   └── Inter/                      # Copied from C:\1myguy\team\fonts\Inter\static\
│   ├── js/                             # Empty - Phase 2 (GSAP + Places API)
│   └── img/                            # Empty - placeholder for project/hero assets
└── index.html                          # Homepage
```

---

## Task 1: Initialise Tailwind CLI project

**Files:**
- Create: `C:\1myguy\projects\pragmaticplanning\package.json`
- Create: `C:\1myguy\projects\pragmaticplanning\tailwind.config.js`
- Create: `C:\1myguy\projects\pragmaticplanning\assets\css\input.css`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "pragmaticplanning",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "npx tailwindcss -i ./assets/css/input.css -o ./assets/css/main.css --minify",
    "dev": "npx tailwindcss -i ./assets/css/input.css -o ./assets/css/main.css --watch"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0"
  }
}
```

- [ ] **Step 2: Install Tailwind CLI**

Run from `C:\1myguy\projects\pragmaticplanning\`:
```powershell
npm install
```
Expected: `node_modules/` created, `package-lock.json` created, no errors.

- [ ] **Step 3: Create tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        canvas: '#FCFAF2',
        ink: '#0A0A0A',
        'accent-green': '#005F4B',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      maxWidth: {
        'editorial': '1440px',
      },
      letterSpacing: {
        'mono': '0.15em',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Create assets/css/input.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Inter - local */
@font-face {
  font-family: 'Inter';
  src: url('../fonts/Inter/Inter-VariableFont_opsz,wght.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@layer base {
  html {
    background-color: #FCFAF2;
    color: #0A0A0A;
    font-family: 'Inter', system-ui, sans-serif;
  }

  body {
    @apply bg-canvas text-ink antialiased;
  }

  /* Mono-line separator utility */
  .mono-line {
    border-top: 0.5px solid #0A0A0A;
  }

  .mono-line-b {
    border-bottom: 0.5px solid #0A0A0A;
  }
}

@layer components {
  /* Status tag base */
  .status-tag {
    @apply inline-block uppercase text-xs font-sans tracking-mono border border-0.5 border-ink px-2 py-0.5;
  }

  .status-tag--data {
    @apply bg-ink text-canvas;
  }

  .status-tag--product {
    @apply bg-accent-green text-canvas;
  }

  .status-tag--outcome {
    @apply border-ink text-ink bg-transparent;
  }

  .status-tag--process {
    @apply border-ink text-ink bg-transparent;
  }

  .status-tag--moat {
    @apply bg-ink text-canvas;
  }
}
```

- [ ] **Step 5: Run a test build to verify compilation**

```powershell
npm run build
```
Expected: `assets/css/main.css` is created. No errors. File size should be under 50KB (purged).

- [ ] **Step 6: Commit**

```powershell
git init
git add package.json tailwind.config.js assets/css/input.css
git commit -m "feat: initialise Tailwind CLI with PP design tokens"
```

---

## Task 2: Scaffold directories and copy Inter font

**Files:**
- Create: `assets/fonts/Inter/` (directory with WOFF2 files)
- Modify: `assets/css/input.css` (verify font path matches)

- [ ] **Step 1: Create required directories**

```powershell
New-Item -ItemType Directory -Force "C:\1myguy\projects\pragmaticplanning\assets\fonts\Inter"
New-Item -ItemType Directory -Force "C:\1myguy\projects\pragmaticplanning\assets\js"
New-Item -ItemType Directory -Force "C:\1myguy\projects\pragmaticplanning\assets\img"
```

- [ ] **Step 2: Convert Inter TTF to WOFF2 OR copy static subset**

Check if WOFF2 files already exist in the vault's static subfolder:
```powershell
ls "C:\1myguy\team\fonts\Inter\static\" | Select-String "woff2"
```

If no WOFF2 files, copy the TTF variable font and note for conversion:
```powershell
Copy-Item "C:\1myguy\team\fonts\Inter\Inter-VariableFont_opsz,wght.ttf" `
  "C:\1myguy\projects\pragmaticplanning\assets\fonts\Inter\"
```

> NOTE: TTF works in all modern browsers. For production, convert to WOFF2 using Fonttools or Squoosh for ~30% size reduction.

- [ ] **Step 3: Update @font-face in input.css to use TTF path (if no WOFF2)**

If the font extension is `.ttf` not `.woff2`, update `assets/css/input.css` line:
```css
src: url('../fonts/Inter/Inter-VariableFont_opsz,wght.ttf') format('truetype');
```

- [ ] **Step 4: Rebuild CSS to verify font path compiles without error**

```powershell
npm run build
```
Expected: No errors. Font path is copied into compiled CSS.

- [ ] **Step 5: Commit**

```powershell
git add assets/fonts/ assets/css/input.css
git commit -m "feat: add local Inter variable font and directory scaffold"
```

---

## Task 3: Build index.html scaffold

**Files:**
- Create: `C:\1myguy\projects\pragmaticplanning\index.html`

- [ ] **Step 1: Create index.html with full document structure**

```html
<!DOCTYPE html>
<html lang="en-NZ">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO -->
  <title>Pragmatic Planning | Resource Consents Queenstown &amp; Wanaka</title>
  <meta name="description" content="Resource consents approved in 8-12 weeks. Not 12 months. Town planning consultancy for Queenstown, Wanaka, Hawea and Glenorchy. 250+ projects granted.">
  <link rel="canonical" href="https://pragmaticplanning.co.nz/">

  <!-- Open Graph -->
  <meta property="og:title" content="Pragmatic Planning | We Get It Granted">
  <meta property="og:description" content="Resource consents approved in 8-12 weeks. 98% approval rate. 250+ projects granted across Queenstown and Wanaka.">
  <meta property="og:url" content="https://pragmaticplanning.co.nz/">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_NZ">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Pragmatic Planning | We Get It Granted">
  <meta name="twitter:description" content="Resource consents approved in 8-12 weeks. 98% approval rate. 250+ projects granted.">

  <!-- Fonts: Playfair Display via Google Fonts (TODO: localise before ship) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">

  <!-- Compiled Tailwind CSS -->
  <link rel="stylesheet" href="assets/css/main.css">

  <!-- LocalBusiness Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pragmatic Planning",
    "description": "Resource consent and town planning consultancy in Queenstown and Wanaka, New Zealand.",
    "url": "https://pragmaticplanning.co.nz",
    "telephone": "+64-21-104-3405",
    "email": "info@pragmaticplanning.co.nz",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Queenstown",
      "addressRegion": "Otago",
      "addressCountry": "NZ"
    },
    "areaServed": ["Queenstown", "Wanaka", "Glenorchy", "Hawea", "Kingston"],
    "founder": {
      "@type": "Person",
      "name": "Richard Kemp",
      "jobTitle": "Town Planning Consultant"
    }
  }
  </script>

  <!-- Cloudflare Web Analytics -->
  <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "REPLACE_WITH_TOKEN"}'></script>
</head>
<body class="bg-canvas text-ink font-sans">

  <!-- NAV -->
  <nav class="mono-line-b sticky top-0 z-50 bg-canvas">
    <div class="max-w-editorial mx-auto px-6 flex items-center justify-between h-14">
      <a href="/" class="font-serif text-sm font-bold tracking-mono uppercase">Pragmatic Planning</a>
      <div class="flex items-center gap-8 text-xs tracking-mono uppercase">
        <a href="#services">Services</a>
        <a href="#why-us">Why Us</a>
        <a href="#contact" class="border border-ink px-4 py-2 hover:bg-ink hover:text-canvas transition-colors duration-200">Get Started</a>
      </div>
    </div>
  </nav>

  <!-- HERO: GRANTED -->
  <!-- [Replaced by Task 4] -->
  <section id="hero" class="mono-line-b">
    <div class="hero-placeholder bg-canvas h-screen flex items-center justify-center">
      <p class="text-xs tracking-mono text-ink opacity-40 uppercase">[Hero Section - Task 4]</p>
    </div>
  </section>

  <!-- SUCCESS FEED: STATUS TAG GRID -->
  <!-- [Replaced by Task 5] -->
  <section id="success-feed" class="mono-line-b py-24">
    <div class="max-w-editorial mx-auto px-6">
      <p class="text-xs tracking-mono text-ink opacity-40 uppercase">[Status Tag Grid - Task 5]</p>
    </div>
  </section>

  <!-- SERVICES -->
  <section id="services" class="mono-line-b py-24">
    <div class="max-w-editorial mx-auto px-6">
      <p class="font-serif text-5xl font-bold mb-2">Services</p>
    </div>
  </section>

  <!-- WHY US / MOAT -->
  <section id="why-us" class="mono-line-b py-24 bg-ink text-canvas">
    <div class="max-w-editorial mx-auto px-6">
      <p class="font-serif text-5xl font-bold mb-2">Why Us</p>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact" class="mono-line-b py-24">
    <div class="max-w-editorial mx-auto px-6">
      <p class="font-serif text-5xl font-bold mb-2">Contact</p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="mono-line py-12">
    <div class="max-w-editorial mx-auto px-6">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p class="text-xs tracking-mono uppercase">
          Pragmatic Planning &copy; 2026 Queenstown / Wanaka / Hawea / Glenorchy
        </p>
        <p class="text-xs tracking-mono uppercase opacity-60">
          A Town Planning Consultancy for the Outcomes-Obsessed.
        </p>
        <div class="flex gap-6 text-xs tracking-mono uppercase">
          <a href="/agent-portal">Agent Portal</a>
          <a href="/resource-hub">Resource Hub</a>
          <a href="/compliance-pack">Compliance Pack</a>
        </div>
      </div>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Rebuild CSS to include all classes used in HTML**

```powershell
npm run build
```
Expected: `main.css` grows to include all new utility classes. No warnings.

- [ ] **Step 3: Open in browser and verify scaffold renders**

Open `C:\1myguy\projects\pragmaticplanning\index.html` in a browser. Confirm:
- Canvas (#FCFAF2) background visible
- Ink (#0A0A0A) text visible
- Nav sticky at top with mono-line bottom border
- Section placeholders visible
- Footer renders at bottom

- [ ] **Step 4: Commit**

```powershell
git add index.html
git commit -m "feat: add index.html editorial scaffold with nav, sections, footer, schema"
```

---

## Task 4: Build GRANTED Hero Section

**Files:**
- Modify: `C:\1myguy\projects\pragmaticplanning\index.html` (replace hero placeholder)
- Modify: `C:\1myguy\projects\pragmaticplanning\assets\css\input.css` (hero custom CSS)

- [ ] **Step 1: Add hero custom CSS to input.css**

Append to `assets/css/input.css`:
```css
/* Hero Section */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #0A0A0A;
}

/* Fallback: Canvas noise gradient (used when no video asset) */
.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 60% 40%, rgba(252, 250, 242, 0.06) 0%, transparent 60%),
    radial-gradient(ellipse at 30% 70%, rgba(0, 95, 75, 0.08) 0%, transparent 50%),
    #0A0A0A;
  z-index: 0;
}

/* Subtle noise texture overlay */
.hero-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  opacity: 0.15;
  z-index: 1;
  pointer-events: none;
}

/* Video element (drop in when asset is ready) */
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) brightness(0.35);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 1.5rem;
  max-width: 900px;
}

.hero-headline {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(3.5rem, 10vw, 9rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: #FCFAF2;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.hero-subtext {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  line-height: 1.7;
  color: rgba(252, 250, 242, 0.75);
  max-width: 560px;
  margin: 0 auto 2.5rem;
  letter-spacing: 0.01em;
}

.hero-cta {
  display: inline-block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #0A0A0A;
  background-color: #FCFAF2;
  padding: 0.875rem 2rem;
  border: 0.5px solid #FCFAF2;
  transition: background-color 0.2s ease, color 0.2s ease;
  text-decoration: none;
}

.hero-cta:hover {
  background-color: transparent;
  color: #FCFAF2;
}

/* Scroll indicator */
.hero-scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hero-scroll-hint span {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(252, 250, 242, 0.4);
}

.hero-scroll-hint::after {
  content: '';
  display: block;
  width: 0.5px;
  height: 2.5rem;
  background-color: rgba(252, 250, 242, 0.25);
}
```

- [ ] **Step 2: Replace hero placeholder in index.html**

Replace the entire `<section id="hero" ...>` block with:
```html
<!-- HERO: GRANTED -->
<section id="hero" class="hero-section mono-line-b">

  <!--
    VIDEO ASSET: Drop your grayscale MP4 here when ready.
    Recommended: 1920x1080, ~5-10MB, looping, no audio.
    Remove the class="hidden" attribute to activate.
  -->
  <video
    class="hero-video hidden"
    autoplay
    muted
    loop
    playsinline
    aria-hidden="true">
    <source src="assets/img/hero.mp4" type="video/mp4">
  </video>

  <!-- Hero content -->
  <div class="hero-content">
    <h1 class="hero-headline">We Get It Granted.</h1>
    <p class="hero-subtext">
      Resource consents approved in 8-12 weeks. Not 12 months.
      We navigate the 2026 Planning Bill transition so your project stays on schedule.
      No stress. No jargon. Just outcomes.
    </p>
    <a href="#contact" class="hero-cta">Start Your Project</a>
  </div>

  <!-- Scroll hint -->
  <div class="hero-scroll-hint" aria-hidden="true">
    <span>Scroll</span>
  </div>

</section>
```

- [ ] **Step 3: Rebuild CSS**

```powershell
npm run build
```
Expected: No errors.

- [ ] **Step 4: Verify hero in browser**

Open `index.html`. Confirm:
- Full-viewport black hero with subtle texture gradient
- "We Get It Granted." headline renders in Playfair Display, large and bold
- Subtext readable in Inter, muted white
- "Start Your Project" CTA button visible
- Scroll indicator line at bottom

- [ ] **Step 5: Commit**

```powershell
git add index.html assets/css/input.css
git commit -m "feat: add GRANTED hero section with video placeholder and Canvas fallback"
```

---

## Task 5: Build Success Feed Status Tag Grid

**Files:**
- Modify: `C:\1myguy\projects\pragmaticplanning\index.html` (replace success-feed placeholder)
- Modify: `C:\1myguy\projects\pragmaticplanning\assets\css\input.css` (success feed CSS)

- [ ] **Step 1: Add Success Feed CSS to input.css**

Append to `assets/css/input.css`:
```css
/* Success Feed */
.success-feed {
  padding: 0;
}

/* Data Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 0.5px solid #0A0A0A;
}

.stat-cell {
  padding: 3rem 2.5rem;
  border-right: 0.5px solid #0A0A0A;
}

.stat-cell:last-child {
  border-right: none;
}

.stat-tag {
  display: inline-block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background-color: #0A0A0A;
  color: #FCFAF2;
  padding: 0.25rem 0.5rem;
  margin-bottom: 1.25rem;
}

.stat-number {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1;
  color: #0A0A0A;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(10, 10, 10, 0.5);
}

/* Service Outcome Cards Grid */
.outcomes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 0.5px solid #0A0A0A;
}

.outcome-card {
  padding: 3rem 2.5rem;
  border-right: 0.5px solid #0A0A0A;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.outcome-card:last-child {
  border-right: none;
}

.outcome-tag {
  display: inline-block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border: 0.5px solid #0A0A0A;
  align-self: flex-start;
}

.outcome-tag--product {
  background-color: #005F4B;
  color: #FCFAF2;
  border-color: #005F4B;
}

.outcome-tag--outcome {
  background-color: transparent;
  color: #0A0A0A;
}

.outcome-tag--process {
  background-color: transparent;
  color: #0A0A0A;
}

.outcome-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.15;
  color: #0A0A0A;
  text-transform: uppercase;
}

.outcome-body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1.65;
  color: rgba(10, 10, 10, 0.65);
}

.outcome-meta {
  display: inline-block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(10, 10, 10, 0.4);
  margin-top: auto;
}

/* Knowledge Moat Block */
.moat-block {
  padding: 4rem 2.5rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3rem;
  align-items: center;
}

.moat-tag {
  display: inline-block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background-color: #0A0A0A;
  color: #FCFAF2;
  padding: 0.25rem 0.5rem;
  margin-bottom: 1rem;
}

.moat-headline {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  line-height: 1;
  color: #0A0A0A;
  text-transform: uppercase;
}

.moat-body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(10, 10, 10, 0.65);
  max-width: 600px;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-row,
  .outcomes-grid {
    grid-template-columns: 1fr;
  }

  .stat-cell,
  .outcome-card {
    border-right: none;
    border-bottom: 0.5px solid #0A0A0A;
  }

  .moat-block {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

- [ ] **Step 2: Replace success-feed placeholder in index.html**

Replace the entire `<section id="success-feed" ...>` block with:
```html
<!-- SUCCESS FEED: STATUS TAG GRID -->
<section id="success-feed" class="success-feed mono-line-b">
  <div class="max-w-editorial mx-auto">

    <!-- DATA STATS ROW -->
    <div class="stats-row">
      <div class="stat-cell">
        <span class="stat-tag">[Data]</span>
        <p class="stat-number">98%</p>
        <p class="stat-label">Approval Rate</p>
      </div>
      <div class="stat-cell">
        <span class="stat-tag">[Data]</span>
        <p class="stat-number">$5K-$8K</p>
        <p class="stat-label">Typical Engagement</p>
      </div>
      <div class="stat-cell">
        <span class="stat-tag">[Data]</span>
        <p class="stat-number">250+</p>
        <p class="stat-label">Projects Granted</p>
      </div>
    </div>

    <!-- SERVICE OUTCOME CARDS -->
    <div class="outcomes-grid">

      <!-- Compliance Pack -->
      <div class="outcome-card">
        <span class="outcome-tag outcome-tag--product">[Product]</span>
        <h2 class="outcome-title">The Compliance Pack</h2>
        <p class="outcome-body">
          Maximize your yield. Minimize your risk. A complete turn-key solution
          for Queenstown and Wanaka short-term rental compliance. Includes the
          April 2026 meth-testing protocols and full QLDC filing.
        </p>
        <span class="outcome-meta">[Status: Ready to Deploy]</span>
      </div>

      <!-- Subdivision Certainty -->
      <div class="outcome-card">
        <span class="outcome-tag outcome-tag--outcome">[Outcome]</span>
        <h2 class="outcome-title">Subdivision Certainty</h2>
        <p class="outcome-body">
          15 Subdivisions. 15 Approvals. Zero Rejections. Complexity is our
          specialty. We manage the neighbours, the council, and the technical
          hurdles so you can focus on the build.
        </p>
        <span class="outcome-meta">[Timeline: 10-16 Weeks]</span>
      </div>

      <!-- The Pragmatic Path -->
      <div class="outcome-card">
        <span class="outcome-tag outcome-tag--process">[Process]</span>
        <h2 class="outcome-title">The Pragmatic Path</h2>
        <p class="outcome-body">
          Your building project, unlocked. Most consents are approved in half
          the industry average time. We don't sugar-coat the truth; we just
          find the path to "Granted."
        </p>
        <span class="outcome-meta">[Most consents: 8-12 Weeks]</span>
      </div>

    </div>

    <!-- KNOWLEDGE MOAT BLOCK -->
    <div class="moat-block mono-line">
      <div>
        <span class="moat-tag">[The Moat]</span>
        <p class="moat-headline">15 Years<br>Inside the<br>System.</p>
      </div>
      <div>
        <p class="moat-body">
          We know the rules because we've helped write them. From local government
          experience to private practice, our relationships with QLDC are your
          competitive advantage. We speak the language of the 2026 Natural
          Environment Bill fluently.
        </p>
      </div>
    </div>

  </div>
</section>
```

- [ ] **Step 3: Rebuild CSS**

```powershell
npm run build
```
Expected: No errors.

- [ ] **Step 4: Verify status tag grid in browser**

Open `index.html`. Confirm:
- Three data stat cells render in a row with 0.5px dividers between them
- Numbers render in large Playfair Display
- Three outcome cards render below with correct tag colours (green for Product, outlined for Outcome/Process)
- Moat block spans full width with large serif headline left, body text right
- Mono-lines visible between all sections
- Mobile: stacks to single column

- [ ] **Step 5: Commit**

```powershell
git add index.html assets/css/input.css
git commit -m "feat: add Success Feed status tag grid with data stats, outcome cards, and moat block"
```

---

## Task 6: Final CSS build and verification

**Files:**
- No new files. Final build and review.

- [ ] **Step 1: Run production build (minified)**

```powershell
npm run build
```
Expected: `assets/css/main.css` is minified. No errors. File should be under 30KB.

- [ ] **Step 2: Open index.html and do a full visual pass**

Check these items in the browser:

| Item | Expected |
|------|----------|
| Background colour | Canvas #FCFAF2 |
| Text colour | Ink #0A0A0A |
| Nav | Sticky, mono-line bottom border, Inter uppercase tracking |
| Hero | Full-viewport black with noise texture, large Playfair headline, Inter subtext, Canvas CTA button |
| Stats row | 3 cells, [DATA] black tags, large numbers, 0.5px dividers |
| Outcome cards | 3 cards, correct tag colours, 0.5px dividers |
| Moat block | 2-column layout, [THE MOAT] tag, large serif headline |
| Footer | Canvas background, mono-line top border, uppercase Inter |
| Mobile (< 768px) | Stats/cards stack vertically |

- [ ] **Step 3: Commit final state**

```powershell
git add .
git commit -m "feat: Phase 1 complete - foundation, hero, success feed ready for visual approval"
```

---

## Pre-Ship TODOs (Flag Before Cloudflare Deploy)

These are not Phase 1 blockers but must be resolved before going live:

1. **Playfair Display localisation** - Download WOFF2 from Google Fonts, add to `assets/fonts/`, swap out the Google Fonts CDN `<link>` for a local `@font-face`.
2. **Cloudflare Analytics token** - Replace `REPLACE_WITH_TOKEN` in the analytics script with the real token from Cloudflare Pages dashboard.
3. **Hero video asset** - Drop `assets/img/hero.mp4` and remove `class="hidden"` from the `<video>` element.
4. **Canonical URL** - Confirm final domain and update all canonical/OG URLs.
5. **Schema address** - Add street address once confirmed with Richard.
