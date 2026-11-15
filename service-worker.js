const CACHE='em-editions-v49-simple-reviews';
const CORE=['./index.html?v=49','./manifest.webmanifest','./app-icon.svg','./assets/projects/sommaire-covers.webp','./forceclean-native.css?v=30','./forceclean-native.js?v=22','./metallux-native.css?v=25','./metallux-native.js?v=31','./metallux-industrial.css?v=30','./metallux-studio.js?v=31','./metallux-garment3d.js?v=29','./logo-showroom.css?v=34','./logo-showroom.js?v=37','./creative-editorial.css?v=3','./divers-gallery-v2.css?v=2','./iconless-ui.css?v=1','./project-diagnostic.css?v=2','./reviews-second.css?v=3','./assets/reviews/avis-cliente-02.svg','./project-diagnostic.js?v=3','./creative-editorial.js?v=6','./assets/projects/metallux/native/logo-black-transparent.webp'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith('em-editions-')||key.startsWith('elhem-editions-'))&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(new Request(req,{cache:'reload'})).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put('./index.html?v=49',copy));}return res;}).catch(()=>caches.match('./index.html?v=49')));
  return;
 }
 event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(()=>caches.match(req)));
});
