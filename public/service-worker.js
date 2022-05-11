const cacheName = "cache-v1";
const dataCacheName = "data-cache-v1";

const cacheFiles = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
  "/js/idb.js",
  "/js/index.js",
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.client.claim();
});

self.addEventListener("fetch", function (e) {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
