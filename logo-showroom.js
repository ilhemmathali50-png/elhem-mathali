/* The Logo Atlas · curated identity showroom, supplied images kept unchanged */
(()=>{
'use strict';
const ITEMS=[{"name":"Élya Natura","slug":"elya-natura","category":"Nature","src":"assets/logo-showroom/elya-natura.webp","board":null,"accent":"#aa4726","soft":"#fff0e5","variants":[]},{"name":"Fait Maison","slug":"fait-maison","category":"Food","src":"assets/logo-showroom/fait-maison.webp","board":null,"accent":"#b64428","soft":"#f9ede2","variants":[]},{"name":"ForceClean","slug":"forceclean","category":"Industrie","src":"assets/logo-showroom/forceclean.webp","board":null,"accent":"#006ba9","soft":"#e8f5fc","variants":[]},{"name":"MÉTALLUX","slug":"metallux","category":"Industrie","src":"assets/logo-showroom/metallux.webp","board":null,"accent":"#174674","soft":"#ecf3f8","variants":[]},{"name":"HerbTrésor","slug":"herbtresor","category":"Nature","src":"assets/logo-showroom/herbtresor.webp","board":null,"accent":"#2b503c","soft":"#f0f6ec","variants":[]},{"name":"MyFloria","slug":"myfloria","category":"Nature","src":"assets/logo-showroom/myfloria.webp","board":null,"accent":"#2d6a51","soft":"#e9f3e9","variants":["assets/logo-showroom/myfloria-variant.webp"]},{"name":"MYBIO","slug":"mybio","category":"Nature","src":"assets/logo-showroom/mybio.webp","board":null,"accent":"#178a61","soft":"#eaf8e9","variants":[]},{"name":"Jennys Logistics Ltd","slug":"jennys-logistics","category":"Mode","src":"assets/logo-showroom/jennys-logistics.webp","board":"assets/logo-showroom/jennys-logistics-board.webp","accent":"#e52c47","soft":"#fff0ee","variants":[]},{"name":"Didi’s Kitchen","slug":"didis-kitchen","category":"Food","src":"assets/logo-showroom/didis-kitchen.webp","board":"assets/logo-showroom/didis-kitchen-board.webp","accent":"#e6a900","soft":"#fff8df","variants":[]},{"name":"Pleasure Taste","slug":"pleasure-taste","category":"Food","src":"assets/logo-showroom/pleasure-taste.webp","board":"assets/logo-showroom/pleasure-taste-board.webp","accent":"#18583b","soft":"#eaf4ec","variants":[]},{"name":"ARAAM","slug":"araam","category":"Immobilier","src":"assets/logo-showroom/araam.webp","board":"assets/logo-showroom/araam-board.webp","accent":"#0a91a4","soft":"#ecf7f7","variants":[]},{"name":"Goman TV","slug":"goman-tv","category":"Média","src":"assets/logo-showroom/goman-tv.webp","board":"assets/logo-showroom/goman-tv-board.webp","accent":"#ff8d21","soft":"#f3f1ef","variants":[]},{"name":"Rahaf Bijoux","slug":"rahaf-bijoux","category":"Luxe","src":"assets/logo-showroom/rahaf-bijoux.webp","board":"assets/logo-showroom/rahaf-bijoux-board.webp","accent":"#c3942a","soft":"#fcf2e3","variants":[]},{"name":"Moderno Meubles","slug":"moderno","category":"Lifestyle","src":"assets/logo-showroom/moderno.webp","board":null,"accent":"#0e304c","soft":"#f0f1f2","variants":[]},{"name":"Breakfast News","slug":"breakfast-news","category":"Média","src":null,"board":"assets/logo-showroom/breakfast-news-board.webp","accent":"#243550","soft":"#eef1f4","variants":[]},{"name":"NY Knicks Concept","slug":"ny-knicks","category":"Lifestyle","src":null,"board":"assets/logo-showroom/ny-knicks-board.webp","accent":"#ce2834","soft":"#f6eaea","variants":[]},{"name":"Grès & PAV","slug":"gres-pav","category":"Industrie","src":"assets/logo-showroom/gres-pav.webp","board":null,"accent":"#056ab6","soft":"#edf4fd","variants":[]},{"name":"فخامة العراقي","slug":"fakhama-iraqi","category":"Luxe","src":"assets/logo-showroom/fakhama-iraqi.webp","board":null,"accent":"#c39d3c","soft":"#f9f0dc","variants":[]},{"name":"Toha Store","slug":"toha-store","category":"Lifestyle","src":"assets/logo-showroom/toha-store.webp","board":null,"accent":"#c69d11","soft":"#f8f4e8","variants":[]},{"name":"تحويشة","slug":"tahwissa","category":"Lifestyle","src":"assets/logo-showroom/tahwissa.webp","board":null,"accent":"#b52c31","soft":"#f9efef","variants":[]},{"name":"Imangi Studios","slug":"imangi-studios","category":"Média","src":"assets/logo-showroom/imangi-studios.webp","board":null,"accent":"#308edd","soft":"#eaf3fa","variants":[]},{"name":"Disney Studios","slug":"disney-studios","category":"Média","src":"assets/logo-showroom/disney-studios.webp","board":null,"accent":"#0d8bac","soft":"#edf9fa","variants":[]},{"name":"Location Voiture","slug":"location-voiture","category":"Lifestyle","src":"assets/logo-showroom/location-voiture.webp","board":null,"accent":"#d3a700","soft":"#f9f4df","variants":[]},{"name":"Logo TU","slug":"logo-tu","category":"Identité","src":"assets/logo-showroom/logo-tu.webp","board":null,"accent":"#db7e10","soft":"#f2f2fb","variants":[]},{"name":"Logo Bio","slug":"logo-bio","category":"Nature","src":"assets/logo-showroom/logo-bio.webp","board":null,"accent":"#c8a540","soft":"#f8f3e7","variants":[]},{"name":"ITD","slug":"itd","category":"Immobilier","src":"assets/logo-showroom/itd.webp","board":null,"accent":"#d83730","soft":"#fff0ed","variants":[]}];
const CATS=['Tout','Nature','Food','Industrie','Média','Immobilier','Mode','Luxe','Lifestyle','Identité'];
const safe=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const path=s=>'./'+s;
const markup=(item,src)=>`<img src="${path(src||item.src||item.board)}" alt="${safe(item.name)}" decoding="async">`;
const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.mountLogoShowroom=function(view){
 if(!view||view.dataset.logoAtlasMounted==='true')return;
 view.dataset.logoAtlasMounted='true';
 let selected=0,category='Tout',visible=[...ITEMS],variant=0,animationHandle=0,touchStart=null;
 view.innerHTML=`<div class="la-atelier" id="logoAtlas">
  <header class="la-heading">
   <div class="la-heading-left"><span class="la-overline"><span class="la-orb"></span> THE CREATIVE EDITIONS / LOGO ATELIER</span><h1>Des signes<br><em>qui racontent</em></h1><p>Une collection d’identités, de symboles et de recherches graphiques, présentées dans leur univers d’origine</p></div>
   <div class="la-heading-count"><strong>26</strong><span>IDENTITÉS & CONCEPTS</span><small>SELECTED WORKS · 01—26</small></div>
  </header>
  <nav class="la-filters" aria-label="Filtrer les logos">${CATS.map(x=>`<button type="button" data-la-filter="${safe(x)}" ${x==='Tout'?'aria-pressed="true"':'aria-pressed="false"'}>${safe(x)}</button>`).join('')}</nav>
  <section class="la-feature" aria-label="Logo sélectionné">
    <div class="la-stage" id="laStage" tabindex="0" role="group" aria-roledescription="carrousel" aria-label="Défiler les logos avec les flèches ou le doigt">
      <span class="la-stage-counter" id="laCounter">01 / 26</span>
      <div class="la-stage-grid" aria-hidden="true"></div>
      <div class="la-stage-sheen" aria-hidden="true"></div>
      <div class="la-stage-art" id="laStageArt"></div>
      <div class="la-stage-floor" aria-hidden="true"></div>
      <span class="la-stage-hint">GLISSER POUR EXPLORER <span aria-hidden="true">↔</span></span>
    </div>
    <div class="la-feature-copy">
      <div class="la-feature-top"><span id="laCategory">IDENTITÉ VISUELLE</span><span>LOGO STUDY / 2026</span></div>
      <div class="la-feature-name"><span class="la-feature-no" id="laNo">Nº 01</span><h2 id="laName">Élya Natura</h2><p id="laDescription">Identité & direction graphique</p></div>
      <div class="la-feature-bottom"><div class="la-feature-index"><span class="la-dash"></span><span id="laIndex">01 / 26</span></div><div class="la-feature-actions"><button type="button" id="laPrev" aria-label="Logo précédent">←</button><button type="button" id="laNext" aria-label="Logo suivant">→</button></div></div>
      <button class="la-open" id="laOpen" type="button">Explorer cette identité <span aria-hidden="true">↗</span></button>
    </div>
  </section>
  <div class="la-catalogue-head"><div><span>THE LOGO INDEX</span><h3>Le catalogue</h3></div><span id="laResultCount">26 créations</span></div>
  <div class="la-collection" id="laCollection" role="list" aria-label="Catalogue des logos"></div>
  <footer class="la-footer"><span>FORME · SENS · IDENTITÉ</span><span>END OF THE ATLAS / ELHEM MATHELI</span></footer>
  <dialog class="la-dialog" id="laDialog" aria-label="Détails du logo">
    <div class="la-dialog-wrap"><header class="la-dialog-top"><div><span>THE LOGO ATLAS</span><h3 id="laDialogTitle"></h3></div><button type="button" class="la-dialog-close" id="laClose" aria-label="Fermer">×</button></header>
       <div class="la-dialog-art" id="laDialogArt"></div><div class="la-dialog-controls" id="laDialogControls"></div>
       <div class="la-dialog-board" id="laDialogBoard" hidden><div><span>BRAND VISUAL SYSTEM</span><h4>Charte graphique & applications</h4></div><img id="laBoardImg" alt="Planche de marque originale" loading="lazy" decoding="async"></div>
       <p class="la-dialog-foot">Visuels et compositions d’origine · Aperçu de portfolio</p>
    </div>
  </dialog>
 </div>`;
 const $=s=>view.querySelector(s);
 const stage=$('#laStage'),art=$('#laStageArt'),title=$('#laName'),descr=$('#laDescription'),idx=$('#laIndex'),num=$('#laNo'),counter=$('#laCounter'),catlabel=$('#laCategory'),gallery=$('#laCollection'),dialog=$('#laDialog');
 const current=()=>visible[selected];
 function cards(){
   gallery.innerHTML=visible.map((it,i)=>`<button type="button" class="la-tile" data-la-index="${i}" role="listitem" aria-current="${i===selected?'true':'false'}" aria-label="Voir ${safe(it.name)}"><span class="la-tile-art" style="--la-soft:${it.soft}">${markup(it).replace('<img ','<img loading="lazy" ')}</span><span class="la-tile-foot"><strong>${safe(it.name)}</strong><small>${safe(it.category)}${it.board?' · Charte':''}</small></span><span class="la-tile-arrow" aria-hidden="true">↗</span></button>`).join('');
   $('#laResultCount').textContent=visible.length+' créations';
 }
 function render(options={}){
  const it=current();if(!it)return;
  variant=0;
  const main=it.src||it.board;
  stage.style.setProperty('--la-accent',it.accent);stage.style.setProperty('--la-soft',it.soft);
  art.classList.remove('la-stage-enter');void art.offsetWidth;
  art.innerHTML=markup(it,main);if(!reduced()&&options.animate!==false)art.classList.add('la-stage-enter');
  title.textContent=it.name;
  descr.textContent=it.board?'Identité visuelle · Planche de marque disponible':'Logotype · Étude de marque';
  catlabel.textContent=it.category.toUpperCase();
  num.textContent='Nº '+String(ITEMS.indexOf(it)+1).padStart(2,'0');
  const pos=String(selected+1).padStart(2,'0')+' / '+String(visible.length).padStart(2,'0');
  idx.textContent=pos;counter.textContent=pos;
  $('#laOpen').textContent=it.board?'Voir la charte graphique ↗':'Explorer ce logo ↗';
  gallery.querySelectorAll('[data-la-index]').forEach((c,i)=>c.setAttribute('aria-current',String(i===selected)));
  if(options.scrollTile){gallery.querySelector(`[data-la-index="${selected}"]`)?.scrollIntoView({block:'nearest',inline:'nearest',behavior:reduced()?'instant':'smooth'})}
 }
 function move(d){selected=(selected+d+visible.length)%visible.length;render({scrollTile:false})}
 function pick(i){if(i<0||i>=visible.length)return;selected=i;render();stage.scrollIntoView({block:'center',behavior:reduced()?'instant':'smooth'});}
 function setFilter(next){category=next;visible=category==='Tout'?[...ITEMS]:ITEMS.filter(it=>it.category===category);selected=0;view.querySelectorAll('[data-la-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.laFilter===category)));cards();render({animate:false})}
 function open(){
   const it=current();dialog.dataset.item=it.slug;$('#laDialogTitle').textContent=it.name;
   const container=$('#laDialogArt');container.style.setProperty('--la-soft',it.soft);container.innerHTML=markup(it);
   const controls=$('#laDialogControls');controls.innerHTML='';
   if(it.variants?.length){const arr=[it.src,...it.variants];arr.forEach((src,i)=>{const b=document.createElement('button');b.type='button';b.textContent=i===0?'Version 01':'Version '+String(i+1).padStart(2,'0');b.setAttribute('aria-pressed',String(i===0));b.addEventListener('click',()=>{container.innerHTML=markup(it,src);controls.querySelectorAll('button').forEach((x,k)=>x.setAttribute('aria-pressed',String(i===k)))});controls.append(b)})}
   const board=$('#laDialogBoard');board.hidden=!it.board;if(it.board){const bimg=$('#laBoardImg');bimg.src=path(it.board);bimg.alt='Charte graphique et applications · '+it.name}
   dialog.showModal();
 }
 let opener=null;
 view.addEventListener('click',e=>{
  const filter=e.target.closest('[data-la-filter]');if(filter){setFilter(filter.dataset.laFilter);return}
  const tile=e.target.closest('[data-la-index]');if(tile){pick(Number(tile.dataset.laIndex));return}
 });
 $('#laPrev').addEventListener('click',()=>move(-1));$('#laNext').addEventListener('click',()=>move(1));
 $('#laOpen').addEventListener('click',()=>{opener=document.activeElement;open()});
 $('#laClose').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
 stage.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1)}else if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}else if(e.key==='Enter'){opener=stage;open()}});
 stage.addEventListener('touchstart',e=>{touchStart={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}},{passive:true});
 stage.addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>47&&Math.abs(dx)>Math.abs(dy)*1.2)move(dx<0?1:-1);touchStart=null},{passive:true});
 stage.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||reduced())return;const box=stage.getBoundingClientRect();const x=(e.clientX-box.left)/box.width-.5,y=(e.clientY-box.top)/box.height-.5;stage.style.setProperty('--la-tilt-x',(y*-2.8)+'deg');stage.style.setProperty('--la-tilt-y',(x*4)+'deg')});
 stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--la-tilt-x','0deg');stage.style.setProperty('--la-tilt-y','0deg')});
 cards();render({animate:false});
};
})();