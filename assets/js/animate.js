// animate.js - Scroll reveals, count-up, heading clip reveals
// Requires GSAP core (loaded before this script). No plugins needed.

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  // ── INTERSECTION HELPER ─────────────────────────────────────────────
  function onEnterAll(selector, callback, threshold) {
    var nodes = document.querySelectorAll(selector);
    if (!nodes.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: threshold || 0.15 });
    nodes.forEach(function (n) { observer.observe(n); });
  }

  // ── COUNT-UP UTILITY ────────────────────────────────────────────────
  function countUp(el, from, to, duration, format) {
    var proxy = { val: from };
    gsap.to(proxy, {
      val: to,
      duration: duration,
      ease: 'power2.out',
      onUpdate: function () {
        el.textContent = format(proxy.val);
      }
    });
  }

  // ── HERO HEADLINE WORD SPLIT ────────────────────────────────────────
  // Double rAF ensures first paint completes before GSAP hides anything (LCP fix)
  var heroHeadline = document.querySelector('.hero-headline');
  if (heroHeadline) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var raw = heroHeadline.textContent.trim();
        var words = raw.split(' ');
        heroHeadline.innerHTML = words.map(function (w) {
          return '<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="hero-word" style="display:inline-block;">' + w + '</span></span>';
        }).join(' ');

        var wordEls = heroHeadline.querySelectorAll('.hero-word');
        gsap.set(wordEls, { y: '110%' });
        gsap.to(wordEls, {
          y: '0%',
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.09,
          delay: 0.1
        });

        var lastWordDelay = 0.1 + (words.length - 1) * 0.09 + 0.1;
        var heroSubtext = document.querySelector('.hero-subtext');
        var heroCta = document.querySelector('.hero-cta');
        if (heroSubtext) {
          gsap.set(heroSubtext, { opacity: 0, y: 18 });
          gsap.to(heroSubtext, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: lastWordDelay });
        }
        if (heroCta) {
          gsap.set(heroCta, { opacity: 0, y: 18 });
          gsap.to(heroCta, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: lastWordDelay + 0.15 });
        }
      });
    });
  }

  // ── STAT CELLS REVEAL THEN COUNT ───────────────────────────────────
  onEnterAll('.stats-row', function (row) {
    var cells = row.querySelectorAll('.stat-cell');
    gsap.from(cells, { opacity: 0, y: 22, duration: 0.55, ease: 'power2.out', stagger: 0.14 });

    cells.forEach(function (cell) {
      var numEl = cell.querySelector('.stat-number');
      if (!numEl) return;
      var text = numEl.getAttribute('data-stat') || numEl.textContent.trim();
      numEl.setAttribute('data-stat', text);

      if (text === '98%') {
        countUp(numEl, 0, 98, 1.6, function (v) { return Math.round(v) + '%'; });
      } else if (text === '250+') {
        countUp(numEl, 0, 250, 1.8, function (v) { return Math.round(v) + '+'; });
      } else if (text === '$5K-$8K') {
        var proxy = { v1: 0, v2: 0 };
        gsap.to(proxy, {
          v1: 5, v2: 8,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: function () {
            numEl.textContent = '$' + Math.round(proxy.v1) + 'K-$' + Math.round(proxy.v2) + 'K';
          }
        });
      }
    });
  }, 0.3);

  // ── MOAT BLOCK "15 YEARS" COUNT ─────────────────────────────────────
  onEnterAll('.moat-headline', function (el) {
    var html = el.innerHTML;
    if (html.indexOf('15') === -1) return;
    el.innerHTML = html.replace('15', '<span class="moat-count">0</span>');
    var span = el.querySelector('.moat-count');
    if (span) countUp(span, 0, 15, 1.3, function (v) { return Math.round(v); });

    // Slide in both columns of the moat block
    var moat = el.closest('.moat-block');
    if (moat) {
      var cols = moat.children;
      if (cols[1]) gsap.from(cols[1], { opacity: 0, x: 28, duration: 0.75, ease: 'power2.out', delay: 0.2 });
    }
  }, 0.4);

  // ── SECTION HEADING CLIP REVEALS ────────────────────────────────────
  onEnterAll('.section-heading', function (el) {
    gsap.from(el, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 0.85,
      ease: 'power3.out'
    });
  }, 0.2);

  // Also reveal richard-card-name with clip
  onEnterAll('.richard-card-name', function (el) {
    gsap.from(el, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 0.85,
      ease: 'power3.out'
    });
  }, 0.3);

  // ── OUTCOME CARDS STAGGER ────────────────────────────────────────────
  onEnterAll('.outcomes-grid', function (el) {
    gsap.from(el.querySelectorAll('.outcome-card'), {
      opacity: 0, y: 32, duration: 0.6, ease: 'power2.out', stagger: 0.13
    });
  }, 0.1);

  // ── SERVICE CARDS STAGGER ────────────────────────────────────────────
  onEnterAll('.services-grid', function (el) {
    gsap.from(el.querySelectorAll('.service-card'), {
      opacity: 0, y: 32, duration: 0.6, ease: 'power2.out', stagger: 0.13
    });
  }, 0.1);

  // ── BLOG CARDS STAGGER ──────────────────────────────────────────────
  onEnterAll('.blog-grid', function (el) {
    gsap.from(el.querySelectorAll('.blog-card'), {
      opacity: 0, y: 24, scale: 0.97, duration: 0.5, ease: 'power2.out', stagger: 0.08
    });
  }, 0.1);

  // ── VALUE CELLS STAGGER ─────────────────────────────────────────────
  onEnterAll('.values-grid', function (el) {
    gsap.from(el.querySelectorAll('.value-cell'), {
      opacity: 0, y: 24, duration: 0.55, ease: 'power2.out', stagger: 0.11
    });
  }, 0.1);

  // ── RICHARD CARD ─────────────────────────────────────────────────────
  onEnterAll('.richard-card', function (el) {
    var textCol = el.querySelector('.richard-card-text');
    var photoCol = el.querySelector('.richard-card-photo');
    if (textCol) gsap.from(textCol, { opacity: 0, x: -28, duration: 0.75, ease: 'power2.out' });
    if (photoCol) gsap.from(photoCol, { opacity: 0, x: 28, duration: 0.75, ease: 'power2.out', delay: 0.12 });
  }, 0.2);

  // ── TESTIMONIALS ────────────────────────────────────────────────────
  onEnterAll('.testimonials-grid', function (el) {
    gsap.from(el.children, {
      opacity: 0, y: 24, duration: 0.55, ease: 'power2.out', stagger: 0.12
    });
  }, 0.1);

  // ── FEASIBILITY SECTION REVEAL ───────────────────────────────────────
  onEnterAll('.feasibility-section', function (el) {
    var header = el.querySelector('.feasibility-header');
    var inputRow = el.querySelector('.feasibility-input-row');
    if (header) gsap.from(header, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' });
    if (inputRow) gsap.from(inputRow, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', delay: 0.15 });
  }, 0.1);

}());
