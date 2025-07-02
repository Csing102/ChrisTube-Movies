// enhancements.js
(() => {
  'use strict';

  //
  // 1) Service Worker registration for offline mode
  //
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.warn('SW failed:', err));
    });
  }

  //
  // 2) Lazy-load images + skeleton + error handling
  //
  document.addEventListener('DOMContentLoaded', () => {
    const imgs = document.querySelectorAll('img[data-src]');
    if (!imgs.length) return;

    // Add skeleton class to each
    imgs.forEach(img => {
      img.classList.add('skeleton');
    });

    // IntersectionObserver to swap in data-src → src
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        obs.unobserve(img);
        const url = img.getAttribute('data-src');
        if (!url) return;
        img.src = url;

        // Remove skeleton on success
        img.onload = () => img.classList.remove('skeleton');
        // On error show a simple placeholder/error style
        img.onerror = () => {
          img.classList.remove('skeleton');
          img.classList.add('error');
          img.alt = 'Failed to load';
        };
      });
    }, { rootMargin: '100px' });

    imgs.forEach(img => observer.observe(img));
  });

  //
  // 3) Fetch wrapper that shows skeleton cards + error state
  //
  window.fetchWithUI = async function(url, renderFn, {
    container = '#movie-grid',
    skeletonHTML = '<div class="card skeleton-card"></div>'.repeat(8),
    errorHTML = '<p class="error-state">Failed to load content. <button id="retry">Retry</button></p>'
  } = {}) {
    const wrap = document.querySelector(container);
    if (!wrap) return;

    // 3a) show skeleton placeholders
    wrap.innerHTML = skeletonHTML;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      // 3b) render real items
      wrap.innerHTML = '';
      renderFn(data);
    } catch (e) {
      // 3c) show error + retry
      wrap.innerHTML = errorHTML;
      const btn = document.querySelector('#retry');
      if (btn) btn.addEventListener('click', () => {
        window.fetchWithUI(url, renderFn, { container, skeletonHTML, errorHTML });
      });
    }
  };

})();
