const CACHE='em-editions-v74-elya-original-terracotta';
const CORE=['./index.html?v=74','./manifest.webmanifest','./app-icon.svg','./assets/projects/sommaire-covers.webp','./forceclean-native.css?v=30','./forceclean-native.js?v=22','./metallux-native.css?v=25','./assets/projects/metallux/native/couverture-metallux-2026.jpg','./assets/projects/metallux/native/polo-realistic-transparent.png','./assets/projects/metallux/native/uniforms-realistic-transparent.png','./metallux-native.js?v=33','./metallux-industrial.css?v=31','./metallux-realistic.css?v=2','./metallux-mobile-layout.css?v=2','./portfolio-refinement.css?v=2','./portfolio-case-studies.js?v=2','./metallux-studio.js?v=35','./logo-showroom.css?v=37','./logo-showroom.js?v=40','./creative-editorial.css?v=3','./divers-gallery-v2.css?v=4','./divers-video.css?v=1','./assets/divers/formation-acupuncture-poster.jpg','./iconless-ui.css?v=1','./project-diagnostic.css?v=2','./reviews-second.css?v=8','./about-toolkit.css?v=3','./about-welcome-tn.css?v=1','./assets/divers/poster-7154.webp','./assets/divers/poster-7155.webp','./assets/divers/poster-7156.webp','./assets/portfolio/bouquet-surprise.svg','./assets/cv/CV_Elhem_Mathali_2026.pdf','./assets/reviews/avis-cliente-02.svg','./assets/reviews/avis-client-fait-maison-poster.jpg','./project-diagnostic.js?v=3','./creative-editorial.js?v=10','./assets/projects/metallux/native/logo-black-transparent.webp'];
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
  event.respondWith(fetch(new Request(req,{cache:'reload'})).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put('./index.html?v=74',copy));}return res;}).catch(()=>caches.match('./index.html?v=74')));
  return;
 }
 event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(()=>caches.match(req)));
});
