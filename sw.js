// litestreamsite service worker
// - App shell + data: network-first, falling back to cache when offline.
// - Other same-origin assets (images/icons): cache-first.
// - Video/subtitle streams and third-party requests are never intercepted.
const CACHE_NAME = 'litestreamsite-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './manifest.json',
  './images/icons/favicon.svg',
  './images/icons/icon-192.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

const STREAM_RE = /\.(m3u8|ts|mp4|m4s|m4v|webm|mov|mkv|vtt)$/i;

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (STREAM_RE.test(url.pathname)) return;

  const sameOrigin = url.origin === location.origin;
  if (!sameOrigin) return;

  const isAppShell = e.request.mode === 'navigate' || /\.(css|js|html|json)$/i.test(url.pathname);
  if (isAppShell) {
    // Ignore the ?v= cache-buster when keying the offline copy.
    const cacheKey = url.origin + url.pathname;
    e.respondWith(
      fetch(e.request).then(r => {
        if (r && r.ok) {
          const clone = r.clone();
          caches.open(CACHE_NAME).then(c => c.put(cacheKey, clone));
        }
        return r;
      }).catch(() =>
        caches.match(cacheKey, { ignoreSearch: true }).then(r => r ||
          (e.request.mode === 'navigate' ? caches.match('./index.html', { ignoreSearch: true }) : Response.error()))
      )
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(resp => {
      if (resp && resp.ok) {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      }
      return resp;
    }))
  );
});
