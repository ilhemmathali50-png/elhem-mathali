/* Logo Gallery · original artwork first, charte opens on selection. */
(()=>{
'use strict';
const ITEMS=[{"name":"Élya Natura","slug":"elya-natura","category":"Nature","src":"assets/logo-showroom/elya-natura.webp","board":null,"accent":"#aa4726","soft":"#fff0e5","variants":[]},{"name":"Fait Maison","slug":"fait-maison","category":"Food","src":"assets/logo-showroom/fait-maison.webp","board":null,"accent":"#b64428","soft":"#f9ede2","variants":[]},{"name":"ForceClean","slug":"forceclean","category":"Industrie","src":"assets/logo-showroom/forceclean.webp","board":null,"accent":"#006ba9","soft":"#e8f5fc","variants":[]},{"name":"MÉTALLUX","slug":"metallux","category":"Industrie","src":"assets/logo-showroom/metallux.webp","board":null,"accent":"#174674","soft":"#ecf3f8","variants":[]},{"name":"HerbTrésor","slug":"herbtresor","category":"Nature","src":"assets/logo-showroom/herbtresor.webp","board":null,"accent":"#2b503c","soft":"#f0f6ec","variants":[]},{"name":"MyFloria","slug":"myfloria","category":"Nature","src":"assets/logo-showroom/myfloria.webp","board":null,"accent":"#2d6a51","soft":"#e9f3e9","variants":["assets/logo-showroom/myfloria-variant.webp"]},{"name":"MYBIO","slug":"mybio","category":"Nature","src":"assets/logo-showroom/mybio.webp","board":null,"accent":"#178a61","soft":"#eaf8e9","variants":[]},{"name":"Jennys Logistics Ltd","slug":"jennys-logistics","category":"Mode","src":"assets/logo-showroom/jennys-logistics.webp","board":"assets/logo-showroom/jennys-logistics-board.webp","accent":"#e52c47","soft":"#fff0ee","variants":[]},{"name":"Didi’s Kitchen","slug":"didis-kitchen","category":"Food","src":"assets/logo-showroom/didis-kitchen.webp","board":"assets/logo-showroom/didis-kitchen-board.webp","accent":"#e6a900","soft":"#fff8df","variants":[]},{"name":"Pleasure Taste","slug":"pleasure-taste","category":"Food","src":"assets/logo-showroom/pleasure-taste.webp","board":"assets/logo-showroom/pleasure-taste-board.webp","accent":"#18583b","soft":"#eaf4ec","variants":[]},{"name":"ARAAM","slug":"araam","category":"Immobilier","src":"assets/logo-showroom/araam.webp","board":"assets/logo-showroom/araam-board.webp","accent":"#0a91a4","soft":"#ecf7f7","variants":[]},{"name":"Goman TV","slug":"goman-tv","category":"Média","src":"assets/logo-showroom/goman-tv.webp","board":"assets/logo-showroom/goman-tv-board.webp","accent":"#ff8d21","soft":"#f3f1ef","variants":[]},{"name":"Rahaf Bijoux","slug":"rahaf-bijoux","category":"Luxe","src":"assets/logo-showroom/rahaf-bijoux.webp","board":"assets/logo-showroom/rahaf-bijoux-board.webp","accent":"#c3942a","soft":"#fcf2e3","variants":[]},{"name":"Moderno Meubles","slug":"moderno","category":"Lifestyle","src":"assets/logo-showroom/moderno.webp","board":null,"accent":"#0e304c","soft":"#f0f1f2","variants":[]},{"name":"Breakfast News","slug":"breakfast-news","category":"Média","src":"assets/logo-showroom/breakfast-news-logo.webp","board":"assets/logo-showroom/breakfast-news-board.webp","accent":"#243550","soft":"#eef1f4","variants":[]},{"name":"NY Knicks Concept","slug":"ny-knicks","category":"Lifestyle","src":"assets/logo-showroom/ny-knicks-logo.webp","board":"assets/logo-showroom/ny-knicks-board.webp","accent":"#ce2834","soft":"#f6eaea","variants":[]},{"name":"Grès & PAV","slug":"gres-pav","category":"Industrie","src":"assets/logo-showroom/gres-pav.webp","board":null,"accent":"#056ab6","soft":"#edf4fd","variants":[]},{"name":"فخامة العراقي","slug":"fakhama-iraqi","category":"Luxe","src":"assets/logo-showroom/fakhama-iraqi.webp","board":null,"accent":"#c39d3c","soft":"#f9f0dc","variants":[]},{"name":"Toha Store","slug":"toha-store","category":"Lifestyle","src":"assets/logo-showroom/toha-store.webp","board":null,"accent":"#c69d11","soft":"#f8f4e8","variants":[]},{"name":"تحويشة","slug":"tahwissa","category":"Lifestyle","src":"assets/logo-showroom/tahwissa.webp","board":null,"accent":"#b52c31","soft":"#f9efef","variants":[]},{"name":"Imangi Studios","slug":"imangi-studios","category":"Média","src":"assets/logo-showroom/imangi-studios.webp","board":null,"accent":"#308edd","soft":"#eaf3fa","variants":[]},{"name":"Disney Studios","slug":"disney-studios","category":"Média","src":"assets/logo-showroom/disney-studios.webp","board":null,"accent":"#0d8bac","soft":"#edf9fa","variants":[]},{"name":"Location Voiture","slug":"location-voiture","category":"Lifestyle","src":"assets/logo-showroom/location-voiture.webp","board":null,"accent":"#d3a700","soft":"#f9f4df","variants":[]},{"name":"Logo TU","slug":"logo-tu","category":"Identité","src":"assets/logo-showroom/logo-tu.webp","board":null,"accent":"#db7e10","soft":"#f2f2fb","variants":[]},{"name":"Logo Bio","slug":"logo-bio","category":"Nature","src":"assets/logo-showroom/logo-bio.webp","board":null,"accent":"#c8a540","soft":"#f8f3e7","variants":[]},{"name":"ITD","slug":"itd","category":"Immobilier","src":"assets/logo-showroom/itd.webp","board":null,"accent":"#d83730","soft":"#fff0ed","variants":[]}];
const CATEGORIES=['Tout','Nature','Food','Industrie','Média','Immobilier','Mode','Luxe','Lifestyle','Identité'];
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const asset=p=>'./'+p;
window.mountLogoShowroom=function(view){
 if(!view||view.dataset.logoGalleryMounted==='true')return;
 view.dataset.logoGalleryMounted='true';
 const boards=ITEMS.filter(item=>item.board).length;
 view.innerHTML=`<div class="lg-showroom" id="logoGallery">
 <header class="lg-intro"><div class="lg-intro-copy"><span class="lg-kicker"><span aria-hidden="true" class="lg-kicker-line"></span> THE CREATIVE EDITIONS / LOGO ATELIER</span><h1>Les logos <em>en lumière</em></h1><p>Une collection d’identités visuelles à découvrir librement · Touchez un logo pour explorer son univers</p></div><div class="lg-intro-number" aria-label="${ITEMS.length} logos"><strong>${String(ITEMS.length).padStart(2,'0')}</strong><span>IDENTITÉS & CONCEPTS</span></div></header>
 <div class="lg-toolbar"><div class="lg-filters" id="lgFilters" role="group" aria-label="Filtrer la galerie">${CATEGORIES.map((cat,i)=>`<button type="button" data-lg-filter="${safe(cat)}" aria-pressed="${i===0?'true':'false'}">${safe(cat)}</button>`).join('')}</div><span class="lg-results" id="lgResults" aria-live="polite">${ITEMS.length} logos</span></div>
 <div id="lgGrid" class="lg-grid" aria-label="Collection complète de logos"></div>
 <div class="lg-end"><span>END OF THE COLLECTION</span><span>ELHEM MATHELI · BRAND IDENTITY DESIGN</span></div>
 <dialog class="lg-dialog" id="lgDialog" aria-label="Présentation du logo">
  <div class="lg-dialog-layout"><div class="lg-dialog-head"><div><span class="lg-dialog-eyebrow" id="lgDialogCat"></span><h2 id="lgDialogTitle"></h2></div><button class="lg-close" id="lgClose" type="button" aria-label="Fermer la présentation">×</button></div>
   <nav class="lg-detail-tabs" id="lgDetailTabs" aria-label="Choix du visuel"></nav>
   <div class="lg-detail-body" id="lgDetailBody"></div>
   <p class="lg-detail-foot">Visuels originaux · Présentation de portfolio</p>
  </div>
 </dialog></div>`;
 const $=s=>view.querySelector(s);
 let filter='Tout',current=null,mode='logo',variant=0,opener=null;
 const grid=$('#lgGrid'),dialog=$('#lgDialog'),tabs=$('#lgDetailTabs'),body=$('#lgDetailBody');
 function tile(it,index){
  const caption=it.board?'Voir la charte graphique':'Agrandir le logo';
  return `<button type="button" class="lg-logo" data-lg-item="${safe(it.slug)}" style="--lg-accent:${it.accent};--lg-soft:${it.soft};--lg-order:${Math.min(index,9)}" aria-label="${safe(it.name)} · ${caption}">
   <span class="lg-logo-stage"><img src="${asset(it.src||it.board)}" alt="Logo ${safe(it.name)}" loading="${index<6?'eager':'lazy'}" decoding="async"><span class="lg-zoom-icon" aria-hidden="true">↗</span></span>
   <span class="lg-logo-meta"><span><strong>${safe(it.name)}</strong><small>${safe(it.category)}</small></span>${it.board?'<span class="lg-logo-label">CHARTE ↗</span>':'<span class="lg-logo-dot" aria-hidden="true">↗</span>'}</span>
  </button>`;
 }
 function renderGallery(){
  const shown=filter==='Tout'?ITEMS:ITEMS.filter(it=>it.category===filter);
  grid.innerHTML=shown.map(tile).join('');
  $('#lgResults').textContent=shown.length+' logo'+(shown.length!==1?'s':'');
  view.querySelectorAll('[data-lg-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lgFilter===filter)));
 }
 function tabButton(id,label,pressed){return `<button type="button" data-lg-mode="${id}" aria-pressed="${pressed?'true':'false'}">${label}</button>`}
 function present(){
  if(!current)return;
  $('#lgDialogTitle').textContent=current.name;$('#lgDialogCat').textContent=current.category.toUpperCase()+' / IDENTITÉ VISUELLE';
  const hasBoard=Boolean(current.board),hasAlt=current.variants?.length>0;
  tabs.innerHTML=(hasBoard?tabButton('board','Charte graphique',mode==='board')+tabButton('logo','Logo seul',mode==='logo'):'')
   +(hasAlt&&!hasBoard?'<span class="lg-tab-note">Versions du logotype</span>':'');
  const source=mode==='board'&&hasBoard?current.board:variant===0?(current.src||current.board):current.variants[variant-1];
  const label=mode==='board'&&hasBoard?'Charte graphique et mockups originaux':'Logotype original';
  body.innerHTML=`<figure class="lg-detail-image ${mode==='board'&&hasBoard?'lg-detail-image--board':'lg-detail-image--logo'}" style="--lg-soft:${current.soft}"><img src="${asset(source)}" alt="${safe(label)} · ${safe(current.name)}" decoding="async"><figcaption>${safe(label)}</figcaption></figure>`;
  if(mode==='logo'&&hasAlt){
   const nav=document.createElement('div');nav.className='lg-variants';nav.setAttribute('role','group');nav.setAttribute('aria-label','Versions du logo');
   [current.src,...current.variants].forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.dataset.lgVariant=String(i);b.setAttribute('aria-pressed',String(i===variant));b.textContent='Version '+String(i+1).padStart(2,'0');nav.append(b)});
   body.append(nav);
  }
 }
 function open(it,trigger){
  current=it;opener=trigger;variant=0;mode=it.board?'board':'logo';
  present();dialog.showModal();$('#lgClose').focus({preventScroll:true});
 }
 $('#lgFilters').addEventListener('click',e=>{const b=e.target.closest('[data-lg-filter]');if(!b)return;filter=b.dataset.lgFilter;renderGallery()});
 grid.addEventListener('click',e=>{const b=e.target.closest('[data-lg-item]');if(!b)return;const it=ITEMS.find(x=>x.slug===b.dataset.lgItem);if(it)open(it,b)});
 tabs.addEventListener('click',e=>{const b=e.target.closest('[data-lg-mode]');if(!b)return;mode=b.dataset.lgMode;variant=0;present()});
 body.addEventListener('click',e=>{const b=e.target.closest('[data-lg-variant]');if(!b)return;variant=Number(b.dataset.lgVariant);present()});
 $('#lgClose').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 dialog.addEventListener('close',()=>{opener?.focus({preventScroll:true});current=null;opener=null});
 renderGallery();
};
})();