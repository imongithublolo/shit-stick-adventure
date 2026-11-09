/* ============================================================
   SHIT STICK ADVENTURE — service worker
   strategy:
   - navigation + boot/files.js -> network-first (update checks),
     fall back to cache (offline)
   - everything else same-origin GET -> cache-first, then network
     (the boot loader fills the cache with the full game manifest)
   ============================================================ */

importScripts("boot/files.js");

var CACHE = "ssa-" + (self.__SSA_FILES ? self.__SSA_FILES.version : "v0");

self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (k) {
          if (k.indexOf("ssa-") === 0 && k !== CACHE) return caches.delete(k);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;

  if (req.method !== "GET") return;

  var url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.protocol !== "http:" && url.protocol !== "https:") return;
  if (url.pathname === "/sw.js") return;

  // partial content requests (audio/video seeking) — pass through
  if (req.headers.get("range")) return;

  var isNav = req.mode === "navigate" || (req.destination === "document");
  var isManifest = url.pathname.indexOf("boot/files.js") !== -1;
  // boot scripts (loader/crt/css) are network-first too: boot logic must
  // always run the newest code, with the cache as offline fallback
  var isBootAsset =
    url.pathname.indexOf("/boot/") !== -1 &&
    url.pathname.indexOf("boot/files.js") === -1;

  if (isNav || isManifest || isBootAsset) {
    event.respondWith(
      fetch(req).then(function (resp) {
        // keep a fresh copy in the cache for offline fallback
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return resp;
      }).catch(function () {
        return caches.match(req, { ignoreSearch: true }).then(function (m) {
          if (m) return m;
          return caches.match("./").then(function (m2) {
            if (m2) return m2;
            return caches.match("./index.html").then(function (m3) {
              if (m3) return m3;
              return new Response("offline and not cached yet :(", {
                status: 503,
                headers: { "Content-Type": "text/plain" }
              });
            });
          });
        });
      })
    );
    return;
  }

  // cache-first for everything else
  event.respondWith(
    caches.match(req, { ignoreSearch: false }).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (resp) {
        if (resp && resp.ok && resp.type === "basic") {
          var copy = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return resp;
      }).catch(function () {
        return new Response("offline", { status: 503 });
      });
    })
  );
});
