/* WA Legislation — offline cache (auto-generated) */
const VERSION = "wal-3f648910df";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest",
  "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png",
  "./data/cc.json",
  "./data/cia.json",
  "./data/ipa.json",
  "./data/mda.json",
  "./data/ea.json",
  "./data/ea25.json",
  "./data/cpa.json",
  "./data/roa.json",
  "./data/sa.json",
  "./data/rta.json",
  "./data/fa.json",
  "./data/voc.json",
  "./data/cicpa.json",
  "./data/sda.json",
  "./data/ba.json",
  "./data/yoa.json",
  "./data/ccsa.json",
  "./data/tia.json",
  "./data/rtaa.json",
  "./data/rtva.json",
  "./data/cpca.json",
  "./data/wa.json",
  "./data/wr.json"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(VERSION).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
