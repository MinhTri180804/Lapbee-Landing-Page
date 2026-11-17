(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.2 });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    window.__lenis = lenis;
  }
  window.lbScrollTo = (target, opts = {}) => {
    const el = typeof target === 'string' ? document.querySelector(target) : null;
    const y = el ? el.getBoundingClientRect().top + window.scrollY + (opts.offset || 0) : (typeof target === 'number' ? target : 0);
    if (lenis) { if (opts.immediate) { lenis.stop(); window.scrollTo(0, y); lenis.resize(); lenis.scrollTo(y, { immediate: true, force: true }); lenis.start(); } else lenis.scrollTo(y, { duration: 1.1, force: true }); }
    else window.scrollTo({ top: y, behavior: opts.immediate || reduce ? 'auto' : 'smooth' });
  };
  const SEL = ['.lb-sechead','.lb-grid-2>*','.lb-grid-3>*','.lb-grid-4>*','.lb-proc-side','.lb-proc-card','.lb-stats>div','.lb-jr-text>*','.lb-pr-head>*','.lb-pr-grid>*','[data-reveal-clip]','.lb-biz>*','.lb-biz-list>li','.lb-prose>*','.lb-filter','.lb-book>*','.lb-reveal','footer .lb-footer-grid>*','main article>*'].join(',');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  const scan = () => document.querySelectorAll(SEL).forEach(el => {
    if (el.dataset.rv || el.closest('.lb-postlist')) return; el.dataset.rv = '1';
    const sibs = el.parentElement ? [...el.parentElement.children].filter(c => c.matches(SEL)) : [el];
    el.style.setProperty('--i', Math.min(sibs.indexOf(el), 6));
    if (reduce) { el.classList.add('in'); return; }
    io.observe(el);
  });
  new MutationObserver(() => requestAnimationFrame(scan)).observe(document.getElementById('root'), { childList: true, subtree: true });
  let last = -1;
  const onScroll = () => {
    if (document.documentElement.classList.contains('lb-menu-open')) return;
    const y = window.scrollY;
    document.documentElement.classList.toggle('lb-scrolled', y > 12);
    const h = document.querySelector('.lb-header');
    if (h && last >= 0 && y !== last) { const hide = y > 240 && y > last && !document.documentElement.classList.contains('lb-menu-open'); h.classList.toggle('lb-hide', hide); document.documentElement.classList.toggle('lb-hdr-hidden', hide); }
    if (h) document.querySelector('.lb-progress') && document.querySelector('.lb-progress').style.setProperty('top', document.documentElement.classList.contains('lb-hdr-hidden') ? '0px' : h.offsetHeight - 1 + 'px');
    last = y;
    const p = document.querySelector('.lb-hero-media');
    if (p && !reduce && innerWidth > 820) p.style.transform = 'translateY(' + (y * -0.06).toFixed(1) + 'px)';
    const bar = document.querySelector('.lb-progress');
    if (bar) { const max = document.documentElement.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')'; }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();
