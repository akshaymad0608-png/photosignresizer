/* PhotoResizer service worker — offline shell + runtime asset cache. */
const VERSION = 'pr-v3';
const SHELL = `${VERSION}-shell`;
const ASSETS = `${VERSION}-assets`;
const OFFLINE_URL = '/';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL).then(c => c.addAll([OFFLINE_URL, '/manifest.json'])).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations: network first, fall back to the cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(res => {
          const copy = res.clone();
          caches.open(SHELL).then(c => c.put(OFFLINE_URL, copy));
          return res;
        })
        .catch(() => caches.match(OFFLINE_URL).then(r => r || Response.error()))
    );
    return;
  }

  // Hashed build assets: cache first, they never change under one URL.
  if (url.pathname.startsWith('/assets/') || /\.(css|js|mjs|woff2?|png|svg|ico|wasm)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(hit =>
        hit ||
        fetch(request).then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(ASSETS).then(c => c.put(request, copy));
          }
          return res;
        })
      )
    );
  }
});
