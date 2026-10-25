/* VOLTSMITH demo: count-up stats on scroll + mailto quote form (placeholder address). */
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
  const f = document.querySelector('.quote');
  if (f) f.addEventListener('submit', (e) => {
    e.preventDefault(); if (!f.reportValidity()) return;
    const d = new FormData(f);
    const body = `Name: ${d.get('name')}\nPhone: ${d.get('phone')}\nPostcode: ${d.get('postcode')}\nJob: ${d.get('job')}\n\n${d.get('details')}`;
    location.href = `mailto:hello@example.com?subject=${encodeURIComponent('Quote request: ' + d.get('job'))}&body=${encodeURIComponent(body)}`;
  });
})();
