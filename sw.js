/* WA Legislation v3 — offline cache (auto-generated; atomic precache + progress channel) */
const VERSION = "wal3-0f3f769057";
const ASSETS = [
"./",
"./index.html",
"./manifest.webmanifest",
"./icons/icon-180.png",
"./icons/icon-192.png",
"./icons/icon-512.png",
"./icons/icon-maskable-512.png",
"./data/ba.json",
"./data/cc.json",
"./data/ccsa.json",
"./data/cia.json",
"./data/cicpa.json",
"./data/cpa.json",
"./data/cpca.json",
"./data/defs.json",
"./data/docca.json",
"./data/docint.json",
"./data/docinv.json",
"./data/docrom.json",
"./data/docsda.json",
"./data/docsim.json",
"./data/docstyle.json",
"./data/docsus.json",
"./data/docswp.json",
"./data/docwsr.json",
"./data/ea.json",
"./data/ea25.json",
"./data/fa.json",
"./data/ipa.json",
"./data/mda.json",
"./data/rcav.json",
"./data/rcl.json",
"./data/rco.json",
"./data/rcri.json",
"./data/rdc.json",
"./data/rem.json",
"./data/retc.json",
"./data/rhsm.json",
"./data/rid.json",
"./data/rii.json",
"./data/rint.json",
"./data/roa.json",
"./data/rop.json",
"./data/rro.json",
"./data/rsd.json",
"./data/rst.json",
"./data/rsw.json",
"./data/rta.json",
"./data/rtaa.json",
"./data/rti.json",
"./data/rtva.json",
"./data/ryj.json",
"./data/sa.json",
"./data/sda.json",
"./data/study.json",
"./data/tia.json",
"./data/topics.json",
"./data/voc.json",
"./data/wa.json",
"./data/wr.json",
"./data/yoa.json"
];
const bc = ("BroadcastChannel" in self) ? new BroadcastChannel("wal3-sw") : null;
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    let done = 0; const total = ASSETS.length; const Q = [...ASSETS];
    const work = Array.from({ length: 4 }, async () => {
      while (Q.length){
        const a = Q.shift(); if (!a) break;
        const res = await fetch(a, { cache: "no-cache" });
        if (!res.ok) throw new Error("precache " + a + " -> " + res.status);
        await c.put(a, res);
        done++; if (bc) bc.postMessage({ t: "prog", done, total });
      }
    });
    try { await Promise.all(work); }
    catch (err) { await caches.delete(VERSION); throw err; }   /* atomic: no half-cache ever activates */
    if (bc) bc.postMessage({ t: "done", total });
    await self.skipWaiting();
  })());
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
