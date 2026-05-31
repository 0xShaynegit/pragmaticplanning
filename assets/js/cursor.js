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

  // Dark sections where cursor should flip to Canvas colour
  const darkSections = new Set(['hero', 'why-us']);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Section-aware colour swap
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const section = el && el.closest('section');
    const onDark = section && darkSections.has(section.id) && !el.closest('.richard-card');
    cursor.classList.toggle('on-dark', onDark);
    ring.classList.toggle('on-dark', onDark);
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
      gsap.to(ring, { scale: 1.5, opacity: 0.4, duration: 0.35, ease: 'power2.out' });
      gsap.to(label, { opacity: 1, duration: 0.2, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
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
