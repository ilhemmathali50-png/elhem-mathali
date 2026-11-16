/* THE CREATIVE EDITIONS · Divers / real work supplied by the designer.
   All artwork is kept as an image, never repainted or re-typeset.
*/
(()=>{
'use strict';
/* Keep the rest of the work available, but lead with six selected pieces. */
const FEATURED=new Set([7154,7155,7156,7150,7151,7152,7153,7149,7148,7144,7140,7137,7133]);
const POSTERS=[
 [7154,'وسّع بالك · Motif pour hoodie 01','Design textile'],
 [7155,'يا حسرة على اللي فات · Motif pour hoodie 02','Design textile'],
 [7156,'الدنيا دوّارة · Motif pour hoodie 03','Design textile'],
 [7150,'موش كيف كيف · Motif tunisien','Créations tunisiennes'],
 [7151,'على كيفي · Expression tunisienne','Créations tunisiennes'],
 [7152,'تونسي ونفتخر · Typographie et patrimoine','Créations tunisiennes'],
 [7153,'Hoodie asymétrique · Collection 01','Design textile'],
 [7149,'L’installation, une question de confiance','TrackSolid Pro'],
 [7148,'Quand les GPS s’affrontent','TrackSolid Pro'],
 [7147,'Votre confort, notre priorité','TrackSolid Pro'],
 [7146,'Installation GPS professionnelle','TrackSolid Pro'],
 [7145,'Let Google Find You','TrackSolid Pro'],
 [7144,'GT06S · Géolocalisation moto','TrackSolid Pro'],
 [7143,'Offre GPS moto','TrackSolid Pro'],
 [7142,'Concept créatif · La sécurité','TrackSolid Pro'],
 [7141,'Suivi intelligent de véhicule','TrackSolid Pro'],
 [7140,'Campagne GT06N','TrackSolid Pro'],
 [7137,'Suivi GPS au quotidien','TrackSolid Pro'],
 [7136,'Communication GPS moto','TrackSolid Pro'],
 [7138,'Particuliers & entreprises','TrackSolid Pro'],
 [7139,'Protection de la famille','TrackSolid Pro'],
 [7131,'Votre voiture, en temps réel','TrackSolid Pro'],
 [7132,'GPS moto · Réseaux sociaux','TrackSolid Pro'],
 [7133,'Roll-on anti-migraine','Élya Natura']
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function initDivers(){
 const page=document.querySelector('.divers-view');
 if(!page || page.dataset.diversV2==='true')return;
 page.dataset.diversV2='true';
 const grid=page.querySelector('#diversGrid');
 if(!grid)return;
 // Replace only temporary portfolio preview cards, preserving supplied artwork.
 grid.querySelectorAll('.divers-card[data-divers-type="posts"]').forEach(el=>el.remove());
 const posterById=new Map(POSTERS.map(p=>[String(p[0]),p]));
 const imageCards=POSTERS.map(([id,title,brand],index)=>{
  const category=brand==='Élya Natura'?'elya':brand==='TrackSolid Pro'?'tracksolid':brand==='Design textile'?'textile':'tunisie';
  const item=document.createElement('article');
  item.className='divers-card divers-poster-card'+(id>=7150?' divers-poster-card--new':'')+(id>=7154?' divers-poster-card--hoodie':'');
  item.dataset.diversType='posts';
  item.dataset.diversProject=category;
  item.hidden=!FEATURED.has(id);
  item.innerHTML=`<button class="divers-poster-open" type="button" data-poster-id="${id}" aria-label="Agrandir le visuel ${esc(title)}, ${esc(brand)}">
    <span class="divers-poster-media"><img src="./assets/divers/poster-${id}.webp" alt="${esc(title)} · ${esc(brand)}" loading="${index<2?'eager':'lazy'}" decoding="async"></span>
    <span class="divers-poster-caption"><small>${esc(brand.toUpperCase())} · POST ${String(index+1).padStart(2,'0')}</small><strong>${esc(title)}</strong><span>Voir le visuel en grand </span></span>
   </button>`;
  return item;
 });
 grid.append(...imageCards);
 // The user's vertical video is a separate native player, not part of the image lightbox.
 const videoCard=grid.querySelector('.divers-video-card');
 const video=videoCard?.querySelector('video');
 const playButton=videoCard?.querySelector('.divers-video-play');
 if(video && playButton){
   playButton.addEventListener('click',()=>{
     playButton.hidden=true;
     video.controls=true;
     video.preload='metadata';
     const maybePlay=video.play();
     if(maybePlay?.catch)maybePlay.catch(()=>{video.controls=true;});
   });
   video.addEventListener('error',()=>{
     if(video.dataset.fallbackTried==='true')return;
     video.dataset.fallbackTried='true';
     video.src='./assets/divers/formation-acupuncture.mp4';
     video.load();
     if(playButton.hidden){const maybePlay=video.play();if(maybePlay?.catch)maybePlay.catch(()=>{});}
   });
 }
 const count=page.querySelector('.divers-count');
 const more=page.querySelector('#diversMore');
 const footerInfo=page.querySelector('.divers-footer p');
 if(footerInfo)footerInfo.textContent=POSTERS.length+' illustrations et 1 montage vidéo à découvrir. Touchez un dessin pour le voir en grand, sans recadrage.';
 const rest=POSTERS.length-FEATURED.size;
 if(count)count.textContent='Une sélection de '+FEATURED.size+' visuels'+(videoCard?' et 1 vidéo':'');
 if(more && rest>0){
   more.hidden=false;
   more.textContent='Voir les '+rest+' autres visuels';
   let expanded=false;
   more.addEventListener('click',()=>{
     expanded=!expanded;
     grid.querySelectorAll('.divers-poster-card').forEach(card=>{
       card.hidden=!expanded&&!FEATURED.has(Number(card.querySelector('[data-poster-id]')?.dataset.posterId));
     });
     more.setAttribute('aria-expanded',String(expanded));
     more.textContent=expanded?'Réduire la galerie':'Voir les '+rest+' autres visuels';
     if(count)count.textContent=expanded?(POSTERS.length+' visuels'+(videoCard?' et 1 vidéo':'')):'Une sélection de '+FEATURED.size+' visuels'+(videoCard?' et 1 vidéo':'');
   });
 }
 const dialog=document.createElement('dialog');
 dialog.className='divers-lightbox';dialog.setAttribute('aria-label','Agrandissement des créations');
 dialog.innerHTML=`<div class="divers-lightbox-inner">
 <div class="divers-lightbox-head"><span class="divers-lightbox-brand"></span><button class="divers-lightbox-close" type="button" aria-label="Fermer le visuel">Fermer</button></div>
 <div class="divers-lightbox-stage"><img alt=""></div>
 <div class="divers-lightbox-foot"><button type="button" class="divers-lightbox-prev" aria-label="Voir la création précédente">Précédent</button><div><strong class="divers-lightbox-title"></strong><small class="divers-lightbox-counter"></small></div><button type="button" class="divers-lightbox-next" aria-label="Voir la création suivante">Suivant</button></div>
 </div>`;
 page.append(dialog);
 const img=dialog.querySelector('.divers-lightbox-stage img');
 const brand=dialog.querySelector('.divers-lightbox-brand');
 const title=dialog.querySelector('.divers-lightbox-title');
 const counter=dialog.querySelector('.divers-lightbox-counter');
 let active=0,opener=null;
 const visiblePosters=()=>POSTERS.filter(p=>{
  const selector='[data-poster-id="'+p[0]+'"]';
  const card=grid.querySelector(selector)?.closest('.divers-poster-card');
  return card&&!card.hidden;
 });
 function show(p){
  const scope=visiblePosters();
  active=Math.max(0,scope.findIndex(x=>x[0]===p[0]));
  img.src='./assets/divers/poster-'+p[0]+'.webp';
  img.alt=p[1]+' · '+p[2];
  brand.textContent=p[2].toUpperCase();title.textContent=p[1];
  counter.textContent=(active+1)+' / '+scope.length;
 }
 function move(delta){const scope=visiblePosters();if(!scope.length)return;active=(active+delta+scope.length)%scope.length;show(scope[active]);}
 grid.addEventListener('click',e=>{
  const b=e.target.closest('[data-poster-id]');if(!b)return;
  const p=posterById.get(b.dataset.posterId);if(!p)return;
  opener=b;show(p);dialog.showModal();dialog.querySelector('.divers-lightbox-close').focus({preventScroll:true});
 });
 dialog.querySelector('.divers-lightbox-close').addEventListener('click',()=>dialog.close());
 dialog.querySelector('.divers-lightbox-prev').addEventListener('click',()=>move(-1));
 dialog.querySelector('.divers-lightbox-next').addEventListener('click',()=>move(1));
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}else if(e.key==='ArrowRight'){e.preventDefault();move(1)}});
 dialog.addEventListener('close',()=>{img.removeAttribute('src');if(opener)opener.focus({preventScroll:true});});
 let touchX=null;
 dialog.querySelector('.divers-lightbox-stage').addEventListener('touchstart',e=>{touchX=e.touches[0]?.clientX??null},{passive:true});
 dialog.querySelector('.divers-lightbox-stage').addEventListener('touchend',e=>{
  if(touchX===null)return;const dx=(e.changedTouches[0]?.clientX??touchX)-touchX;
  if(Math.abs(dx)>55)move(dx<0?1:-1);touchX=null;
 },{passive:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initDivers);else initDivers();
})();

/* About page: scroll-driven editorial reveal, progressive enhancement */
(()=>{
  'use strict';
  function initAboutMotion(){
    const about=document.querySelector('.about-view');
    if(!about || about.dataset.motionInit==='yes')return;
    about.dataset.motionInit='yes';
    const nodes=[...about.querySelectorAll('.about-hero > div:first-child,.about-visual,.about-chapter-heading,.about-chapter > p,.about-path-item,.about-service,.about-value,.about-connect > *, .about-thanks')];
    nodes.forEach((node,i)=>{node.classList.add('about-reveal');node.style.setProperty('--about-delay',String((i%3)*80)+'ms')});
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)){
      nodes.forEach(node=>node.classList.add('is-visible'));
      return;
    }
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:'0px 0px -3% 0px'});
    nodes.forEach(node=>observer.observe(node));
    about.classList.add('about-motion-ready');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initAboutMotion,{once:true});else initAboutMotion();
})();
