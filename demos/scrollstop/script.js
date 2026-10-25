/* SCROLLSTOP demo: count-up stats on scroll + mailto booking form (placeholder address). */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('[data-count]');
  const run = (el) => {
    const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || '';
    if (reduce || !end) { el.textContent = end.toFixed(dec) + suf; return; }
    const t0 = performance.now(), dur = 1400;
    const step = (t) => { const k = Math.min(1, (t - t0) / dur), v = end * (1 - Math.pow(1 - k, 3));
      el.textContent = v.toFixed(dec) + (k === 1 ? suf : ''); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: .5 });
    els.forEach((el) => io.observe(el));
  }
  const f = document.querySelector('.book-form');
  if (f) f.addEventListener('submit', (e) => {
    e.preventDefault(); if (!f.reportValidity()) return;
    const d = new FormData(f);
    const body = `Name: ${d.get('name')}\nEmail: ${d.get('email')}\nHandle: ${d.get('handle')}\nMain platform: ${d.get('platform')}`;
    location.href = `mailto:hello@example.com?subject=${encodeURIComponent('Strategy call request: ' + (d.get('handle') || d.get('name')))}&body=${encodeURIComponent(body)}`;
  });
})();
