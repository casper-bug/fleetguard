/* ══ FleetGuard Service Worker ══════════════════════════════════════
   Works on GitHub Pages where the app may be served from a subpath
   e.g. https://username.github.io/fleetguard/
   Uses relative caching so no hardcoded origin needed.
═══════════════════════════════════════════════════════════════════ */

const CACHE_VERSION = 'fleetguard-v2';

// Files to cache — relative paths only
const SHELL_FILES = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.webmanifest',
  './favicon.svg',
  // External CDN scripts cached on first fetch
];

// ── Install: cache app shell ─────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      return Promise.allSettled(
        SHELL_FILES.map(url =>
          cache.add(new Request(url, { cache: 'reload' }))
            .catch(err => console.warn('[SW] Failed to cache:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: clean old caches ───────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: network-first for Firebase, cache-first for shell ─────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and non-http(s)
  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // Always go to network for Firebase, CDN, analytics
  const networkOnly = [
    'firebasestorage', 'firebaseio', 'googleapis',
    'gstatic.com', 'firebase', 'jsDelivr', 'jsdelivr',
    'fonts.googleapis', 'chart.js'
  ];
  if (networkOnly.some(d => url.hostname.includes(d) || url.href.includes(d))) {
    return; // let browser handle natively
  }

  // Cache-first for same-origin shell assets
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
        return response;
      }).catch(() => {
        // Offline fallback: return index.html for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// ── Background push messages (Firebase) ─────────────────────────
try {
  importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

  const firebaseConfig = {
    apiKey: "AIzaSyDZA3FhOAmV_W3HHR2Ha6dMzok1HksJmTE",
    authDomain: "fleetguard-51628.firebaseapp.com",
    projectId: "fleetguard-51628",
    storageBucket: "fleetguard-51628.firebasestorage.app",
    messagingSenderId: "590670304554",
    appId: "1:590670304554:web:a881e05e6a9e6093447a53"
  };

  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(payload => {
    const title   = payload.notification?.title || 'FleetGuard';
    const options = {
      body: payload.notification?.body || 'You have a new fleet alert.',
      icon: './favicon.svg',
      badge: './favicon.svg'
    };
    self.registration.showNotification(title, options);
  });
} catch (e) {
  // Firebase messaging optional — SW still works without it
  console.log('[SW] Firebase messaging not loaded:', e.message);
}
