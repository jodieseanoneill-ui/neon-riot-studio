/* GRILL CRIMES demo: shows "open now" / "closed" from the (fictional) hours. */
(() => {
  const s = document.querySelector('.status');
  if (!s) return;
  const d = new Date(), day = d.getDay(), h = d.getHours();
  const open = (day === 4 && h >= 18) || (day === 5 && (h >= 18 || h < 1)) || (day === 6 && (h >= 17 || h < 2)) || (day === 0 && h < 2);
  if (!open) s.firstChild.nextSibling.textContent = ' Grill is cold right now · back Thursday 6pm ';
})();
