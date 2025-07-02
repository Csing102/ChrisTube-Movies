// adblocker.js
(() => {
  'use strict';

  // 1) List of CSS selectors matching common ad elements:
  const adSelectors = [
    '[id^="ad-"]',
    '[class*=" ad-"]',
    '[class^="ad-"]',
    '[class*="advert"]',
    'iframe[src*="ads"]',
    'iframe[src*="doubleclick"]',
    '.popup',
    '.overlay',
    '.banner-ad',
    '.sponsored'
  ];

  // 2) Function to remove matching elements:
  function removeAds(root = document) {
    adSelectors.forEach(sel => {
      root.querySelectorAll(sel).forEach(el => {
        el.remove();
      });
    });
  }

  // 3) Block window.open to stop pop-ups:
  window.open = function(...args) {
    console.warn('Blocked popup:', args);
    return null;
  };

  // 4) Observe DOM mutations and clean up new ads:
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType === 1) { // ELEMENT_NODE
          removeAds(node);
        }
      });
    });
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // 5) Initial pass on load:
  window.addEventListener('load', () => {
    removeAds();
  });

  // 6) Optional: intercept XHR/fetch to block known ad domains
  const blockedDomains = ['doubleclick.net','googlesyndication.com','adservice.google.com'];
  // Override fetch
  const _fetch = window.fetch;
  window.fetch = function(input, init) {
    let url = (typeof input === 'string') ? input : input.url;
    if (blockedDomains.some(d => url.includes(d))) {
      console.warn('Blocked fetch to ad domain:', url);
      return Promise.resolve(new Response(null, { status: 204 }));
    }
    return _fetch(input, init);
  };
  // Override XMLHttpRequest
  const _open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    if (blockedDomains.some(d => url.includes(d))) {
      console.warn('Blocked XHR to ad domain:', url);
      this.abort();
    } else {
      return _open.call(this, method, url, ...rest);
    }
  };

  console.log('Adblocker.js loaded — ad selectors:', adSelectors);
})();
