/* NeonSites — script.js
   Mobile menu, font switcher (remembered in localStorage), mailto contact form. */
(() => {
  'use strict';

  // ---- Mobile menu ----
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close main navigation' : 'Open main navigation');
    nav.toggleAttribute('open', open);
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }

  // ---- Font switcher ----
  const KEY = 'neonriot-font';
  const section = document.getElementById('concepts');
  const chips = Array.from(document.querySelectorAll('.font-chip'));
  const label = document.querySelector('.font-live-name');
  const allowed = chips.map((c) => c.dataset.font);
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ } },
  };
  const setFont = (name, save) => {
    if (!allowed.includes(name)) return;
    section.style.setProperty('--concept-font', `'${name}'`);
    if (label) label.textContent = name;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.font === name)));
    if (save) store.set(name);
  };
  if (section && chips.length) {
    const fromUrl = new URLSearchParams(location.search).get('font');
    const initial = [fromUrl, store.get(), allowed[0]].find((f) => f && allowed.includes(f));
    setFont(initial, false);
    chips.forEach((c) => c.addEventListener('click', () => setFont(c.dataset.font, true)));
  }

  // ---- Contact form: opens the visitor's email app (placeholder address) ----
  const TO = 'hello@example.com'; // PLACEHOLDER: replace with the real studio address
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const d = new FormData(form);
      const type = form.querySelector('#project-type');
      const typeText = type && type.value ? type.options[type.selectedIndex].text : 'Not specified';
      const subject = `New project enquiry: ${typeText}`;
      const body = `Name: ${d.get('name')}\nEmail: ${d.get('email')}\nProject type: ${typeText}\n\n${d.get('message') || ''}`;
      window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
