// sw.js
const CACHE_NAME = 'christube-v1';
const ASSETS = [
  '/', 
  '/index.html',
  '/adblocker.js',
  '/enhancements.js',
  // …add any other static assets you need cached
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', evt => {
  // try cache, then network, then offline fallback
  evt.respondWith(
    caches.match(evt.request).then(cached => {
      return cached || fetch(evt.request)
        .then(res => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(evt.request, res.clone());
            return res;
          });
        })
        .catch(() => {
          // optional: return a generic offline page for navigation requests
          if (evt.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
    })
  );
});
