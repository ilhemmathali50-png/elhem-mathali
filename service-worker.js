const CACHE='em-editions-v26-steel-atelier';
const CORE=['./index.html?v=26','./manifest.webmanifest','./app-icon.svg','./assets/projects/sommaire-covers.webp','./forceclean-native.css?v=19','./forceclean-native.js?v=19','./metallux-native.css?v=25','./metallux-native.js?v=25','./metallux-industrial.css?v=26','./metallux-studio.js?v=26','./metallux-garment3d.js?v=26','./assets/projects/metallux/native/logo-black-transparent.webp'];
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
  event.respondWith(fetch(new Request(req,{cache:'reload'})).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put('./index.html?v=26',copy));}return res;}).catch(()=>caches.match('./index.html?v=26')));
  return;
 }
 event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(()=>caches.match(req)));
});
