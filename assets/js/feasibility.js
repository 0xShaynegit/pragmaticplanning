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

    const locality    = getComponent('locality');
    const sublocality = getComponent('sublocality') || getComponent('sublocality_level_1');
    const route       = getComponent('route');
    const adminArea   = getComponent('administrative_area_level_2');

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
        routeLower.includes('waterfront') || routeLower.includes('shore'))   score += 2;
    if (routeLower.includes('alpine') || routeLower.includes('mountain') ||
        routeLower.includes('skifield') || routeLower.includes('coronet'))   score += 1;

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

    // Reset meter then animate (let panel render first)
    scoreFill.style.width = '0%';
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
  // Wait for DOM, then init — Google script loads async so we use the
  // standard callback pattern if API is already present, else degrade gracefully.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutocomplete);
  } else {
    initAutocomplete();
  }

})();
