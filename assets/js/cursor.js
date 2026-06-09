// cursor.js   GSAP magnetic cursor with dynamic dark/light background detection
// Requires GSAP loaded before this script.

(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  const label = document.querySelector('.cursor-label');

  if (!cursor || !ring || !label) return;

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

  // Walk up DOM to find nearest background with alpha > 0.5 (ignores low-opacity overlays)
  function getBgColor(el) {
    while (el && el !== document.documentElement) {
      const bg = window.getComputedStyle(el).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const m = bg.match(/[\d.]+/g);
        const alpha = m && m.length >= 4 ? parseFloat(m[3]) : 1;
        if (alpha > 0.5) return bg;
      }
      el = el.parentElement;
    }
    return 'rgb(252, 250, 242)'; // canvas fallback
  }

  // Returns true if an rgb/rgba colour string is dark (luminance < 0.4)
  function isDark(rgb) {
    const m = rgb.match(/[\d.]+/g);
    if (!m) return false;
    const r = parseInt(m[0]) / 255;
    const g = parseInt(m[1]) / 255;
    const b = parseInt(m[2]) / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance < 0.4;
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el) {
      const bg = getBgColor(el);
      const onDark = isDark(bg);
      cursor.classList.toggle('on-dark', onDark);
      ring.classList.toggle('on-dark', onDark);
    }
  });

  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * 0.9;
    pos.y += (mouse.y - pos.y) * 0.9;
    dotXSet(pos.x);
    dotYSet(pos.y);

    ringPos.x += (mouse.x - ringPos.x) * 0.12;
    ringPos.y += (mouse.y - ringPos.y) * 0.12;
    ringXSet(ringPos.x);
    ringYSet(ringPos.y);

    labelXSet(mouse.x + 20);
    labelYSet(mouse.y - 10);
  });

  document.querySelectorAll('[data-cursor-label]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const text = el.dataset.cursorLabel;
      label.textContent = text;
      gsap.to(ring, { scale: 1.5, opacity: 0.4, duration: 0.35, ease: 'power2.out' });
      gsap.to(label, { opacity: 1, duration: 0.2, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.inOut' });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    });
  });

  document.addEventListener('mousedown', () => {
    gsap.to(cursor, { scale: 0.6, duration: 0.1 });
  });
  document.addEventListener('mouseup', () => {
    gsap.to(cursor, { scale: 1, duration: 0.15 });
  });
})();
