(() => {
  const header = document.querySelector('.header');
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const closeMenu = () => { toggle?.setAttribute('aria-expanded','false'); nav?.classList.remove('open'); };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .08, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  const imageMap = {
    ostadjohar: ['img/johar-desk.webp','نمای دسکتاپ فروشگاه استادجوهر'],
    aram: ['img/aram-desk.webp','نمونه‌طراحی آرام زیستن'],
    elora: ['img/elora-desk.webp','نمونه‌طراحی ÉLORA'],
    glowe: ['img/glowe-desk.webp','نمونه‌طراحی GLOWÉ'],
    zarine: ['img/zarine-desk.webp','نمونه‌طراحی زرینه'],
    mehr: ['img/mehr-desk.webp','نمای دسکتاپ فروشگاه استادمهر']
  };
  const dialog = document.getElementById('lightbox');
  const dialogImage = document.getElementById('lightboxImage');
  const close = () => { if (dialog?.open) dialog.close(); };
  document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => {
    const data = imageMap[button.dataset.preview];
    if (!data || !dialog || !dialogImage) return;
    dialogImage.src = data[0]; dialogImage.alt = data[1];
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open','');
  }));
  document.getElementById('closeLightbox')?.addEventListener('click', close);
  dialog?.addEventListener('click', event => { if (event.target === dialog) close(); });
})();
