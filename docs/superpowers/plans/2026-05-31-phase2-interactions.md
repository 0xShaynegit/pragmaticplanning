# Pragmatic Planning Phase 2: Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a GSAP magnetic cursor with context labels and a Google Places Feasibility Engine that scores property complexity and promotes the Compliance Pack.

**Architecture:** Two independent JS modules loaded as plain ES6 scripts. `cursor.js` handles all GSAP mouse tracking and hover-label reveals. `feasibility.js` owns the Places Autocomplete, logic tree scoring, and result UI. GSAP is served locally (copied from npm). Google Places API loads from Google CDN (required — cannot be self-hosted). All CSS additions go into `input.css` and get compiled into `main.css` via Tailwind CLI.

**Tech Stack:** GSAP 3 (local), Google Places API (CDN with placeholder key), Vanilla JS ES6, Tailwind CLI.

---

## File Structure

```
assets/
├── js/
│   ├── gsap.min.js          # Copied from node_modules/gsap/dist/gsap.min.js
│   ├── cursor.js            # Custom magnetic cursor + hover-label reveals
│   └── feasibility.js       # Google Places Autocomplete + scoring logic tree + UI
├── css/
│   └── input.css            # Extended with cursor and feasibility section styles
index.html                   # Extended: cursor HTML, feasibility section, script tags
```

---

## Task 1: Install GSAP locally

**Files:**
- Create: `assets/js/gsap.min.js`

- [ ] **Step 1: Install GSAP via npm**

```powershell
cd "C:\1myguy\projects\pragmaticplanning"
npm install gsap
```
Expected: `node_modules/gsap/` appears. No errors.

- [ ] **Step 2: Copy GSAP dist to assets**

```powershell
Copy-Item "node_modules/gsap/dist/gsap.min.js" "assets/js/gsap.min.js"
```
Expected: `assets/js/gsap.min.js` exists (~75KB).

- [ ] **Step 3: Verify file is present and readable**

```powershell
Get-Item "assets/js/gsap.min.js" | Select-Object Name, Length
```
Expected: `gsap.min.js` with size between 60000 and 90000 bytes.

- [ ] **Step 4: Commit**

```powershell
git add assets/js/gsap.min.js
git commit -m "feat: add GSAP locally from npm dist"
```

---

## Task 2: GSAP magnetic cursor

**Files:**
- Create: `assets/js/cursor.js`
- Modify: `assets/css/input.css` (append cursor styles)
- Modify: `index.html` (add cursor HTML, data-cursor-label attributes, script tags)

- [ ] **Step 1: Append cursor CSS to input.css**

Append to the bottom of `assets/css/input.css`:

```css
/* Custom Cursor */
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: #0A0A0A;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  will-change: transform;
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 0.5px solid rgba(10, 10, 10, 0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  will-change: transform;
}

.cursor-label {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10000;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #FCFAF2;
  background-color: #0A0A0A;
  padding: 0.375rem 0.625rem;
  opacity: 0;
  white-space: nowrap;
  transform: translate(16px, 16px);
}

/* Hide custom cursor on touch devices */
@media (hover: none) {
  .cursor,
  .cursor-ring,
  .cursor-label {
    display: none;
  }
}
```

- [ ] **Step 2: Create assets/js/cursor.js**

```js
// cursor.js — GSAP magnetic cursor with context label reveals
// Requires GSAP loaded before this script.

(function () {
  // Only run on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  const label = document.querySelector('.cursor-label');

  if (!cursor || !ring || !label) return;

  // Position cursor at centre to avoid flash from top-left on load
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  const ringPos = { x: pos.x, y: pos.y };

  gsap.set([cursor, ring, label], { xPercent: -50, yPercent: -50 });

  const dotXSet = gsap.quickSetter(cursor, 'x', 'px');
  const dotYSet = gsap.quickSetter(cursor, 'y', 'px');
  const ringXSet = gsap.quickSetter(ring, 'x', 'px');
  const ringYSet = gsap.quickSetter(ring, 'y', 'px');
  const labelXSet = gsap.quickSetter(label, 'x', 'px');
  const labelYSet = gsap.quickSetter(label, 'y', 'px');

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  gsap.ticker.add(() => {
    // Dot follows instantly
    pos.x += (mouse.x - pos.x) * 0.9;
    pos.y += (mouse.y - pos.y) * 0.9;
    dotXSet(pos.x);
    dotYSet(pos.y);

    // Ring follows with lag
    ringPos.x += (mouse.x - ringPos.x) * 0.12;
    ringPos.y += (mouse.y - ringPos.y) * 0.12;
    ringXSet(ringPos.x);
    ringYSet(ringPos.y);

    // Label tracks mouse directly
    labelXSet(mouse.x + 20);
    labelYSet(mouse.y - 10);
  });

  // Context label reveals on [data-cursor-label] elements
  document.querySelectorAll('[data-cursor-label]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const text = el.dataset.cursorLabel;
      label.textContent = text;
      gsap.to(cursor, { scale: 4, duration: 0.35, ease: 'power2.out' });
      gsap.to(ring, { scale: 1.5, opacity: 0.4, duration: 0.35, ease: 'power2.out' });
      gsap.to(label, { opacity: 1, duration: 0.2, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.35, ease: 'power2.inOut' });
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.inOut' });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    });
  });

  // Shrink on mousedown
  document.addEventListener('mousedown', () => {
    gsap.to(cursor, { scale: 0.6, duration: 0.1 });
  });
  document.addEventListener('mouseup', () => {
    gsap.to(cursor, { scale: 1, duration: 0.15 });
  });
})();
```

- [ ] **Step 3: Add cursor HTML to index.html**

Add these three lines immediately after the opening `<body>` tag:

```html
<body class="bg-canvas text-ink font-sans">

  <!-- Cursor -->
  <div class="cursor" aria-hidden="true"></div>
  <div class="cursor-ring" aria-hidden="true"></div>
  <div class="cursor-label" aria-hidden="true"></div>
```

- [ ] **Step 4: Add data-cursor-label attributes to outcome cards**

In `index.html`, find each `.outcome-card` div and add `data-cursor-label` to the outer div:

```html
<!-- Compliance Pack -->
<div class="outcome-card" data-cursor-label="VIEW COMPLIANCE PACK">

<!-- Subdivision Certainty -->
<div class="outcome-card" data-cursor-label="VIEW OUTCOME">

<!-- The Pragmatic Path -->
<div class="outcome-card" data-cursor-label="START PROJECT">
```

Also add to the moat block:
```html
<div class="moat-block mono-line" data-cursor-label="ABOUT RICHARD KEMP">
```

- [ ] **Step 5: Add GSAP and cursor.js script tags before </body>**

Add just before the closing `</body>` tag:

```html
  <!-- GSAP (local) -->
  <script src="assets/js/gsap.min.js"></script>
  <!-- Cursor -->
  <script src="assets/js/cursor.js"></script>
</body>
```

- [ ] **Step 6: Rebuild CSS**

```powershell
cd "C:\1myguy\projects\pragmaticplanning"
npm run build
```
Expected: No errors. `main.css` grows slightly with cursor classes.

- [ ] **Step 7: Verify cursor in browser**

Open `index.html`. Confirm:
- Default browser cursor is replaced by small black dot
- A faint ring follows the dot with lag
- Hovering over any outcome card shows the context label text
- Moving off the card hides the label
- On mobile/touch (simulate in DevTools): cursor elements are hidden

- [ ] **Step 8: Commit**

```powershell
git add assets/js/cursor.js assets/css/input.css index.html
git commit -m "feat: add GSAP magnetic cursor with context label reveals"
```

---

## Task 3: Feasibility Engine section HTML and CSS

**Files:**
- Modify: `index.html` (add feasibility section between success-feed and services)
- Modify: `assets/css/input.css` (append feasibility styles)

- [ ] **Step 1: Append feasibility CSS to input.css**

Append to the bottom of `assets/css/input.css`:

```css
/* Feasibility Engine */
.feasibility-section {
  padding: 0;
}

.feasibility-header {
  padding: 3rem 2.5rem 2rem;
  display: flex;
  align-items: baseline;
  gap: 2rem;
  border-bottom: 0.5px solid #0A0A0A;
}

.feasibility-header-tag {
  display: inline-block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background-color: #005F4B;
  color: #FCFAF2;
  padding: 0.25rem 0.5rem;
}

.feasibility-header-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 900;
  line-height: 1;
  color: #0A0A0A;
  text-transform: uppercase;
}

.feasibility-header-sub {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.8rem;
  color: rgba(10, 10, 10, 0.5);
  letter-spacing: 0.05em;
  margin-left: auto;
}

.feasibility-input-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0;
  border-bottom: 0.5px solid #0A0A0A;
}

.feasibility-address-wrap {
  position: relative;
  border-right: 0.5px solid #0A0A0A;
}

#feasibility-address {
  width: 100%;
  padding: 1.5rem 2.5rem;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.9rem;
  color: #0A0A0A;
  background: transparent;
  border: none;
  outline: none;
  letter-spacing: 0.02em;
}

#feasibility-address::placeholder {
  color: rgba(10, 10, 10, 0.35);
}

.feasibility-submit {
  padding: 1.5rem 2.5rem;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #FCFAF2;
  background-color: #0A0A0A;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
}

.feasibility-submit:hover {
  background-color: #005F4B;
}

/* Result panel (hidden until score calculated) */
.feasibility-result {
  display: none;
  grid-template-columns: 240px 1fr;
  border-bottom: 0.5px solid #0A0A0A;
}

.feasibility-result.is-visible {
  display: grid;
}

.score-panel {
  padding: 3rem 2.5rem;
  border-right: 0.5px solid #0A0A0A;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.score-label-tag {
  display: inline-block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border: 0.5px solid #0A0A0A;
}

.score-number {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
  color: #0A0A0A;
}

.score-band {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.score-band--low    { color: #005F4B; }
.score-band--medium { color: #B45309; }
.score-band--high   { color: #991B1B; }

/* Score meter bar */
.score-meter {
  width: 100%;
  height: 3px;
  background-color: rgba(10, 10, 10, 0.1);
  position: relative;
  overflow: hidden;
}

.score-meter-fill {
  height: 100%;
  width: 0%;
  background-color: #0A0A0A;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.recommendation-panel {
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.rec-address {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: rgba(10, 10, 10, 0.45);
  text-transform: uppercase;
}

.rec-headline {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.15;
  color: #0A0A0A;
}

.rec-body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1.65;
  color: rgba(10, 10, 10, 0.65);
  max-width: 480px;
}

.rec-cta {
  display: inline-block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #FCFAF2;
  background-color: #005F4B;
  padding: 0.875rem 1.75rem;
  border: 0.5px solid #005F4B;
  text-decoration: none;
  align-self: flex-start;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.rec-cta:hover {
  background-color: transparent;
  color: #005F4B;
}

.rec-cta--standard {
  background-color: #0A0A0A;
  border-color: #0A0A0A;
}

.rec-cta--standard:hover {
  background-color: transparent;
  color: #0A0A0A;
}

/* Error state */
.feasibility-error {
  display: none;
  padding: 1rem 2.5rem;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.75rem;
  color: #991B1B;
  letter-spacing: 0.05em;
  border-bottom: 0.5px solid #0A0A0A;
}

.feasibility-error.is-visible {
  display: block;
}

/* Loading state on input row */
.feasibility-input-row.is-loading .feasibility-submit {
  opacity: 0.5;
  pointer-events: none;
}

@media (max-width: 768px) {
  .feasibility-input-row {
    grid-template-columns: 1fr;
  }

  .feasibility-address-wrap {
    border-right: none;
    border-bottom: 0.5px solid #0A0A0A;
  }

  .feasibility-result {
    grid-template-columns: 1fr;
  }

  .score-panel {
    border-right: none;
    border-bottom: 0.5px solid #0A0A0A;
  }

  .feasibility-header {
    flex-direction: column;
    gap: 0.75rem;
  }

  .feasibility-header-sub {
    margin-left: 0;
  }
}
```

- [ ] **Step 2: Add feasibility section to index.html**

Insert this entire block in `index.html`, between the closing `</section>` of `id="success-feed"` and the opening `<section id="services"`:

```html
  <!-- FEASIBILITY ENGINE -->
  <section id="feasibility" class="feasibility-section mono-line-b">
    <div class="max-w-editorial mx-auto">

      <!-- Header -->
      <div class="feasibility-header">
        <span class="feasibility-header-tag">[Engine]</span>
        <h2 class="feasibility-header-title">Feasibility Engine</h2>
        <span class="feasibility-header-sub">Enter a property address to get your complexity score.</span>
      </div>

      <!-- Address input row -->
      <div class="feasibility-input-row" id="feasibility-input-row">
        <div class="feasibility-address-wrap">
          <input
            type="text"
            id="feasibility-address"
            placeholder="Start typing a Queenstown or Wanaka address..."
            autocomplete="off"
            aria-label="Property address for feasibility assessment"
          >
        </div>
        <button class="feasibility-submit" id="feasibility-submit" aria-label="Assess this property">
          Assess Property
        </button>
      </div>

      <!-- Error state -->
      <div class="feasibility-error" id="feasibility-error" role="alert" aria-live="polite"></div>

      <!-- Result panel (shown after scoring) -->
      <div class="feasibility-result" id="feasibility-result" aria-live="polite">

        <!-- Score panel -->
        <div class="score-panel">
          <span class="score-label-tag">[Complexity Score]</span>
          <p class="score-number" id="score-number">--</p>
          <p class="score-band" id="score-band"></p>
          <div class="score-meter" role="meter" aria-label="Complexity score meter">
            <div class="score-meter-fill" id="score-meter-fill"></div>
          </div>
        </div>

        <!-- Recommendation panel -->
        <div class="recommendation-panel">
          <p class="rec-address" id="rec-address"></p>
          <h3 class="rec-headline" id="rec-headline"></h3>
          <p class="rec-body" id="rec-body"></p>
          <a href="#contact" class="rec-cta" id="rec-cta"></a>
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

- [ ] **Step 4: Verify section renders in browser**

Open `index.html`. Confirm the Feasibility Engine section is visible between the Success Feed and Services sections. The input field and "Assess Property" button should be visible. The result panel should be hidden.

- [ ] **Step 5: Commit**

```powershell
git add index.html assets/css/input.css
git commit -m "feat: add Feasibility Engine section HTML and CSS"
```

---

## Task 4: Feasibility Engine JS logic tree

**Files:**
- Create: `assets/js/feasibility.js`
- Modify: `index.html` (add Google Places script tag + feasibility.js script tag)

- [ ] **Step 1: Add Google Places API script to index.html head**

Add this line to the `<head>` section of `index.html`, after the Tailwind CSS link and before the closing `</head>`:

```html
  <!-- Google Places API - replace YOUR_GOOGLE_PLACES_API_KEY before deploy -->
  <script
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_PLACES_API_KEY&libraries=places&loading=async"
    defer>
  </script>
```

- [ ] **Step 2: Create assets/js/feasibility.js**

```js
// feasibility.js — Google Places Autocomplete + property complexity scoring
// Requires Google Maps JS API with Places library loaded before this script.

(function () {
  'use strict';

  // ─── DOM refs ────────────────────────────────────────────────────────────
  const addressInput  = document.getElementById('feasibility-address');
  const submitBtn     = document.getElementById('feasibility-submit');
  const inputRow      = document.getElementById('feasibility-input-row');
  const errorEl       = document.getElementById('feasibility-error');
  const resultPanel   = document.getElementById('feasibility-result');
  const scoreNumber   = document.getElementById('score-number');
  const scoreBand     = document.getElementById('score-band');
  const scoreFill     = document.getElementById('score-meter-fill');
  const recAddress    = document.getElementById('rec-address');
  const recHeadline   = document.getElementById('rec-headline');
  const recBody       = document.getElementById('rec-body');
  const recCta        = document.getElementById('rec-cta');

  if (!addressInput) return;

  // ─── Recommendations by complexity band ─────────────────────────────────
  const RECOMMENDATIONS = {
    low: {
      headline: 'Standard Consent Path',
      body: 'This property looks straightforward. A non-notified resource consent is likely, with approval in 4-8 weeks. Our Building Projects service is the right fit.',
      ctaText: 'Start Your Consent',
      ctaClass: 'rec-cta rec-cta--standard',
    },
    medium: {
      headline: 'Professional Guidance Advised',
      body: 'This property has characteristics that add complexity — zoning, proximity to sensitive areas, or rural character rules. We recommend a strategy session before lodging.',
      ctaText: 'Book a Strategy Session',
      ctaClass: 'rec-cta rec-cta--standard',
    },
    high: {
      headline: 'You Need the Compliance Pack.',
      body: 'High complexity. This property sits in a zone where council scrutiny is elevated and rejection risk is real without expert preparation. Our Compliance Pack is built for exactly this scenario.',
      ctaText: 'Get the Compliance Pack',
      ctaClass: 'rec-cta',
    },
  };

  // ─── Scoring logic tree ──────────────────────────────────────────────────
  // Returns an integer 0-7. Bands: 0-2 = low, 3-4 = medium, 5+ = high.
  function scorePlace(place) {
    let score = 0;
    const types = place.types || [];
    const components = place.address_components || [];

    // Helper: extract component by type
    function getComponent(type) {
      const comp = components.find(c => c.types.includes(type));
      return comp ? comp.long_name.toLowerCase() : '';
    }

    const locality       = getComponent('locality');
    const sublocality    = getComponent('sublocality') || getComponent('sublocality_level_1');
    const route          = getComponent('route');
    const adminArea      = getComponent('administrative_area_level_2');

    // Must be within Queenstown Lakes District to score meaningfully
    const inQLDC = adminArea.includes('queenstown') || locality.includes('queenstown') ||
                   locality.includes('wanaka') || locality.includes('glenorchy') ||
                   locality.includes('hawea') || locality.includes('arrowtown') ||
                   locality.includes('kingston') || locality.includes('luggate');

    if (!inQLDC) {
      // Outside QLDC — return null to trigger out-of-area message
      return null;
    }

    // Property type factors
    if (types.includes('establishment') || types.includes('point_of_interest')) score += 1;
    if (types.includes('natural_feature') || types.includes('park'))            score += 2;

    // Location factors
    if (locality === 'glenorchy' || locality === 'hawea flat' || locality === 'luggate') score += 2;
    if (locality === 'arrowtown')                                                          score += 1;
    if (sublocality.includes('frankton') || sublocality.includes('arthurs point'))        score += 1;

    // Route/address name signals (lakefront, nature proximity)
    const routeLower = route.toLowerCase();
    if (routeLower.includes('lake') || routeLower.includes('lakeside') ||
        routeLower.includes('waterfront') || routeLower.includes('shore'))     score += 2;
    if (routeLower.includes('alpine') || routeLower.includes('mountain') ||
        routeLower.includes('skifield') || routeLower.includes('coronet'))     score += 1;

    return Math.min(score, 7);
  }

  function getBand(score) {
    if (score <= 2) return 'low';
    if (score <= 4) return 'medium';
    return 'high';
  }

  function getMeterWidth(score) {
    return Math.round((score / 7) * 100);
  }

  // ─── UI helpers ──────────────────────────────────────────────────────────
  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.add('is-visible');
    resultPanel.classList.remove('is-visible');
  }

  function hideError() {
    errorEl.classList.remove('is-visible');
  }

  function renderResult(place, score) {
    hideError();

    const band = getBand(score);
    const rec  = RECOMMENDATIONS[band];
    const formattedAddress = place.formatted_address || addressInput.value;

    // Score display
    scoreNumber.textContent = score;
    scoreBand.textContent   = band.toUpperCase();
    scoreBand.className     = 'score-band score-band--' + band;

    // Animate meter fill after a short delay (let panel render first)
    setTimeout(() => {
      scoreFill.style.width = getMeterWidth(score) + '%';
    }, 80);

    // Recommendation copy
    recAddress.textContent  = formattedAddress;
    recHeadline.textContent = rec.headline;
    recBody.textContent     = rec.body;
    recCta.textContent      = rec.ctaText;
    recCta.className        = rec.ctaClass;

    resultPanel.classList.add('is-visible');
    resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ─── Places Autocomplete setup ───────────────────────────────────────────
  function initAutocomplete() {
    // Guard: Places API may not have loaded (e.g., placeholder key)
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.warn('Feasibility Engine: Google Places API not available. Add a valid API key.');
      addressInput.placeholder = 'Enter address (Places API key required for autocomplete)';
      return;
    }

    const autocomplete = new google.maps.places.Autocomplete(addressInput, {
      componentRestrictions: { country: 'nz' },
      fields: ['address_components', 'formatted_address', 'geometry', 'types'],
      types: ['address'],
    });

    // Store the selected place for the submit handler
    let selectedPlace = null;

    autocomplete.addListener('place_changed', () => {
      selectedPlace = autocomplete.getPlace();

      if (!selectedPlace.address_components) {
        showError('Please select an address from the dropdown.');
        selectedPlace = null;
        return;
      }

      // Auto-score on selection
      assessPlace(selectedPlace);
    });

    // Allow manual submit (in case user types without selecting autocomplete)
    submitBtn.addEventListener('click', () => {
      if (selectedPlace) {
        assessPlace(selectedPlace);
      } else {
        showError('Please select an address from the dropdown suggestions.');
      }
    });
  }

  function assessPlace(place) {
    inputRow.classList.add('is-loading');
    hideError();

    const score = scorePlace(place);

    inputRow.classList.remove('is-loading');

    if (score === null) {
      showError('This address appears to be outside the Queenstown Lakes District. We work within QLDC boundaries: Queenstown, Wanaka, Glenorchy, Hawea, Arrowtown and Kingston.');
      return;
    }

    renderResult(place, score);
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  // Wait for Google Maps API to load before initialising autocomplete
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutocomplete);
  } else {
    initAutocomplete();
  }

})();
```

- [ ] **Step 3: Add feasibility.js script tag to index.html**

Add this line just before the closing `</body>` tag, after the cursor scripts:

```html
  <!-- Feasibility Engine -->
  <script src="assets/js/feasibility.js"></script>
</body>
```

- [ ] **Step 4: Rebuild CSS**

```powershell
npm run build
```
Expected: No errors.

- [ ] **Step 5: Verify engine behaviour in browser (manual test)**

Open `index.html`. Perform these checks:

| Test | Expected |
|------|----------|
| Load page | Feasibility section visible, no JS console errors (except Places API warning about placeholder key) |
| Click "Assess Property" with empty input | Error message appears: "Please select an address from the dropdown suggestions." |
| Type into address field | Placeholder text "Enter address (Places API key required...)" confirms API not loaded — this is correct with placeholder key |
| Console warning | `Feasibility Engine: Google Places API not available. Add a valid API key.` — this is expected |

To verify the scoring logic works independently, run this in browser console:

```js
// Simulate a low-score residential address in Queenstown
const mockPlace = {
  types: ['street_address'],
  formatted_address: '12 Example Street, Queenstown 9300, New Zealand',
  address_components: [
    { long_name: 'Queenstown', types: ['locality'] },
    { long_name: 'Queenstown-Lakes District', types: ['administrative_area_level_2'] },
    { long_name: 'Example Street', types: ['route'] }
  ]
};
// Should score 0 and trigger low band
// (Call assessPlace directly from console after removing IIFE wrapper for testing)
```

- [ ] **Step 6: Commit**

```powershell
git add assets/js/feasibility.js index.html
git commit -m "feat: add Feasibility Engine logic tree with Places Autocomplete and complexity scoring"
```

---

## Task 5: Final Phase 2 build and verification

**Files:**
- No new files. Final CSS build, git log review.

- [ ] **Step 1: Run production build**

```powershell
cd "C:\1myguy\projects\pragmaticplanning"
npm run build
```
Expected: No errors. `main.css` under 30KB.

- [ ] **Step 2: Full visual checklist in browser**

Open `index.html`. Check each item:

| Item | Expected |
|------|----------|
| Cursor | Small black dot + faint ring follow mouse |
| Cursor on outcome cards | Label appears ("VIEW COMPLIANCE PACK", etc.) |
| Cursor on moat block | Label "ABOUT RICHARD KEMP" appears |
| Cursor on touch sim | DevTools mobile sim: cursor elements hidden |
| Feasibility section | Visible between Success Feed and Services |
| Address input | Renders correctly, mono-line borders intact |
| Console | Only expected Places API warning, no other errors |
| Result panel | Hidden on load |
| Mobile (< 768px) | Input stacks vertically, section readable |

- [ ] **Step 3: Check git log**

```powershell
git log --oneline
```
Expected output:
```
[hash] feat: add Feasibility Engine logic tree with Places Autocomplete and complexity scoring
[hash] feat: add Feasibility Engine section HTML and CSS
[hash] feat: add GSAP magnetic cursor with context label reveals
[hash] feat: add GSAP locally from npm dist
[hash] chore: add .gitignore, exclude Old Content and node_modules
[hash] feat: Phase 1 complete - foundation, hero, success feed ready for visual approval
[hash] feat: add index.html editorial scaffold with nav, sections, footer, schema
[hash] feat: add local Inter variable font and directory scaffold
[hash] feat: initialise Tailwind CLI with PP design tokens
```

- [ ] **Step 4: Commit**

```powershell
git add .
git commit -m "feat: Phase 2 complete - GSAP cursor and Feasibility Engine ready for review"
```

---

## Pre-Ship TODOs (Phase 2)

1. **Google Places API key** - Replace `YOUR_GOOGLE_PLACES_API_KEY` in `index.html` with the real key from Google Cloud Console. Restrict the key to `pragmaticplanning.co.nz` referrer.
2. **Scoring calibration** - Once real addresses are tested, adjust score thresholds in `feasibility.js` `getBand()` if results feel off.
3. **Compliance Pack URL** - The `rec-cta` links to `#contact`. Update to the real Compliance Pack page URL once it exists.
