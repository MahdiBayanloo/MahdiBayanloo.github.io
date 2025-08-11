// === Responsive Enhancements (added by assistant) ===
(function(){
  const d = document;
  const hasSidebar = d.querySelector('.sidebar, .side-bar, nav, .nav, .navigation, .menu');
  if(!hasSidebar) return;

  // Create overlay
  const overlay = d.createElement('div');
  overlay.className = 'mobile-overlay';
  overlay.addEventListener('click', () => {
    d.documentElement.classList.remove('mobile-menu-open');
  });
  d.body.appendChild(overlay);

  // Create toggle button (hamburger) in top-right
  const btn = d.createElement('button');
  btn.className = 'mobile-nav-toggle';
  btn.setAttribute('aria-label','Toggle menu');
  btn.innerHTML = '☰';
  btn.addEventListener('click', () => {
    const open = d.documentElement.classList.toggle('mobile-menu-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  d.body.appendChild(btn);
})();
// === End Responsive Enhancements ===