const CACHE_NAME = "sauna-counter-v1";
const assets = [
  "./",
  "./index.html",
  "./manifest.json",
  "./favicon.svg",
  "./icons/icon-192x192.png",
  "./icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(assets))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});
