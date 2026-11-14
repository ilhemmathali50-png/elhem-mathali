/* ForceClean interactive chapter. Real product artwork extracted from the supplied charte. */
(function(){
'use strict';
const base='./assets/projects/forceclean/native/';
const asset=name=>base+name+'.webp';
const products=[
 {id:'dish',number:'01',title:'Liquide vaisselle',volume:'1,25 L',description:'L’éclat de la vaisselle, un visuel qui traduit la fraîcheur au premier regard.',label:'dish-label',photo:'dish-mockup',tone:'ice'},
 {id:'soap',number:'02',title:'Savon liquide',volume:'5 L',description:'Fraîcheur & propreté. Une hiérarchie claire pour le format familial et professionnel.',label:'soap-label',photo:'soap-mockup',tone:'deep'},
 {id:'air',number:'03',title:'Air Fresh',volume:'500 ml',description:'Fraîcheur florale : mouvement, fleurs et légèreté dans un langage visuel cohérent.',label:'air-label',photo:'air-mockup',tone:'ice'}
];
function water(){return '<div class="fc-water-surface" aria-hidden="true"><span class="fc-water-drop"></span><span class="fc-water-drop"></span><span class="fc-water-drop"></span><span class="fc-water-drop"></span></div>'}
function product(p){
 const idx=p.number;
 return `<section class="fc-product fc-product-${p.tone}" id="fc-${p.id}" data-fc-chapter="products" aria-labelledby="fc-title-${p.id}">
 <div class="fc-inner">
 <div class="fc-product-head fc-reveal"><div><span class="fc-eyebrow">04 / PACKAGING · ${idx}</span><h2 id="fc-title-${p.id}">${p.title}</h2><p class="fc-product-info">${p.description}</p></div><span class="fc-product-volume">${p.volume}</span></div>
 <div class="fc-product-stage fc-reveal"><img class="fc-product-photo" src="${asset(p.photo)}" alt="Mockup original · ${p.title}" loading="lazy" decoding="async"><img class="fc-product-label" src="${asset(p.label)}" alt="Étiquette originale à plat · ${p.title}" loading="lazy" decoding="async"></div>
 <div class="fc-product-actions fc-reveal"><button type="button" data-fc-zoom="${asset(p.label)}" data-fc-title="${p.title} · Étiquette">Étiquette originale ↗</button><button type="button" data-fc-zoom="${asset(p.photo)}" data-fc-title="${p.title} · Mockup">Voir le mockup ↗</button></div>
 </div></section>`;
}
window.renderForceCleanNative=function renderForceCleanNative(detail){
 if(!detail)return;
 detail.innerHTML=`<article class="fc-native" id="fcNative" aria-label="ForceClean · Art Book interactif">
 <section class="fc-hero" id="fc-intro" aria-labelledby="fc-hero-title">${water()}
  <div class="fc-inner fc-hero-content">
   <div class="fc-hero-copy"><span class="fc-eyebrow">THE CREATIVE EDITIONS / CHAPTER 03</span><h2 id="fc-hero-title">La fraîcheur<br><em>en mouvement.</em></h2><p class="fc-hero-description">ForceClean. Une identité visuelle qui puise sa force dans l’eau, la brillance et la fraîcheur. Logo, direction artistique et packaging.</p><a class="fc-hero-cta" href="#fc-story">Découvrir le projet <span aria-hidden="true">↓</span></a></div>
   <div class="fc-hero-brand"><img src="${asset('logo-clean')}" alt="Logo original ForceClean, produits d’entretien" fetchpriority="high" decoding="async"></div>
  </div>
 </section>
 <nav class="fc-chapter-nav" aria-label="Navigation ForceClean">
  <button type="button" data-fc-target="fc-story">Le projet</button><button type="button" data-fc-target="fc-identity">Identité</button><button type="button" data-fc-target="fc-palette">Couleurs</button><button type="button" data-fc-target="fc-type">Typographies</button><button type="button" data-fc-target="fc-dish">Packaging</button>
 </nav>
 <section class="fc-section fc-story" id="fc-story" data-fc-chapter="story"><div class="fc-inner">
  <header class="fc-section-header fc-reveal"><span class="fc-eyebrow">01 / DESIGN STRATEGY</span><h2>Une identité<br><em>qui fait sensation.</em></h2><p>Une direction artistique pensée pour relier propreté, énergie et reconnaissance immédiate sur chaque produit.</p></header>
  <div class="fc-story-points fc-reveal"><div class="fc-story-point"><span>01 / LE PROJET</span><h3>ForceClean</h3><p>Une marque tunisienne de produits d’entretien pour la maison et les espaces professionnels.</p></div><div class="fc-story-point"><span>02 / L’OBJECTIF</span><h3>Unifier la gamme</h3><p>Rendre la catégorie, le parfum et le volume faciles à reconnaître, même en un coup d’œil.</p></div><div class="fc-story-point"><span>03 / LA DÉCISION</span><h3>L’eau comme signature</h3><p>Vagues, reflets, bulles et accents verts : un langage visuel frais, fluide et cohérent.</p></div></div>
 </div></section>
 <section class="fc-section fc-identity" id="fc-identity" data-fc-chapter="identity"><div class="fc-inner">
  <header class="fc-section-header fc-reveal"><span class="fc-eyebrow">02 / BRAND IDENTITY</span><h2>Du croquis<br><em>à la signature.</em></h2></header>
  <div class="fc-logo-display fc-reveal"><img src="${asset('logo-clean')}" alt="ForceClean · logo principal en couleurs" loading="lazy" decoding="async"></div>
  <div class="fc-sketch-row"><figure class="fc-reveal"><img src="${asset('sketch')}" alt="Croquis ForceClean au stylo bleu, avec recherches du symbole" loading="lazy" decoding="async"></figure><div class="fc-sketch-copy fc-reveal"><span class="fc-eyebrow">THE MAKING OF</span><h3>Une feuille.<br>Un mouvement.<br>Une signature.</h3><p>Le symbole construit autour du F associe courbe, éclat et feuille verte. La version couleur préserve le contraste entre les bleus et la fraîcheur végétale.</p></div></div>
  <div class="fc-identity-meta fc-reveal"><span>LOGO DESIGN · VISUAL SYSTEM</span><span>Étude de construction et applications</span></div>
 </div></section>
 <section class="fc-section fc-palette" id="fc-palette" data-fc-chapter="palette"><div class="fc-inner">
  <header class="fc-section-header fc-reveal"><span class="fc-eyebrow">03 / COLOR DIRECTION</span><h2>Le bleu a<br><em>du caractère.</em></h2><p>Cinq teintes choisies pour exprimer l’eau, l’énergie, la profondeur et la fraîcheur.</p></header>
  <div class="fc-swatches fc-reveal">
   <div class="fc-swatch" style="--tone:#064B9B"><span class="fc-swatch-ball"></span><strong>Bleu Force</strong><code>#064B9B</code></div>
   <div class="fc-swatch" style="--tone:#05AFE5"><span class="fc-swatch-ball"></span><strong>Bleu Clean</strong><code>#05AFE5</code></div>
   <div class="fc-swatch" style="--tone:#062F6B"><span class="fc-swatch-ball"></span><strong>Bleu Nuit</strong><code>#062F6B</code></div>
   <div class="fc-swatch" style="--tone:#56B63A"><span class="fc-swatch-ball"></span><strong>Vert Fresh</strong><code>#56B63A</code></div>
   <div class="fc-swatch" style="--tone:#FFFFFF"><span class="fc-swatch-ball"></span><strong>Blanc</strong><code>#FFFFFF</code></div>
  </div>
 </div></section>
 <section class="fc-section fc-type" id="fc-type" data-fc-chapter="type"><div class="fc-inner">
  <header class="fc-section-header fc-reveal"><span class="fc-eyebrow">04 / TYPOGRAPHIE</span><h2>Une identité<br><em>qui respire.</em></h2><p>Deux typographies complémentaires pour une identité claire et lisible.</p></header>
  <div class="fc-type-pair fc-reveal"><div class="fc-type-item montserrat"><span class="fc-letter">Aa</span><h3>Montserrat</h3><p>Pour les titres, affirmés et lisibles.</p></div><div class="fc-type-item poppins"><span class="fc-letter">Aa</span><h3>Poppins</h3><p>Pour les informations essentielles.</p></div></div>
 </div></section>
 ${products.map(product).join('')}
 <section class="fc-product fc-product-deep" id="fc-ocean" data-fc-chapter="products"><div class="fc-inner">
  <div class="fc-product-head fc-reveal"><div><span class="fc-eyebrow">04 / PACKAGING · 04</span><h2>Océan<br><em>&amp; textile.</em></h2><p class="fc-product-info">Deux déclinaisons de 500 ml, une même direction artistique pour l’Air Fresh Essence Océan et le Parfum de linge.</p></div><span class="fc-product-volume">500 ml</span></div>
  <div class="fc-product-duo fc-reveal"><img src="${asset('ocean-label')}" alt="Étiquette originale Air Fresh Essence Océan 500 ml" loading="lazy" decoding="async"><img src="${asset('textile-label')}" alt="Étiquette originale Parfum de linge Fraîcheur textile 500 ml" loading="lazy" decoding="async"></div>
  <div class="fc-product-actions fc-reveal"><button type="button" data-fc-zoom="${asset('ocean-label')}" data-fc-title="Air Fresh · Essence Océan">Essence Océan ↗</button><button type="button" data-fc-zoom="${asset('textile-label')}" data-fc-title="Parfum de linge · Fraîcheur textile">Parfum de linge ↗</button></div>
 </div></section>
 <footer class="fc-outro"><div class="fc-inner"><strong>La propreté, mise en scène.</strong><p>ForceClean · Brand identity &amp; packaging design · Elhem Matheli</p></div></footer>
 <dialog class="fc-modal" id="fcNativePreview" aria-label="Agrandir un design ForceClean"><div class="fc-modal-head"><h3 id="fcNativePreviewTitle"></h3><button type="button" id="fcNativeClose" class="fc-modal-close" aria-label="Fermer">×</button></div><div class="fc-modal-scene"><img id="fcNativePreviewImage" alt=""></div><button type="button" class="fc-modal-zoom" id="fcNativeZoom" aria-pressed="false">Agrandir +</button></dialog>
 </article>`;
 const root=detail.querySelector('#fcNative');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const navBtns=[...root.querySelectorAll('[data-fc-target]')];
 navBtns.forEach(btn=>btn.addEventListener('click',()=>{
  const target=document.getElementById(btn.dataset.fcTarget);
  target?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
 }));
 if(!reduced&&'IntersectionObserver' in window){
  root.classList.add('fc-motion-on');
  const revealObserver=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}});
  },{rootMargin:'0px 0px -8% 0px',threshold:.02});
  root.querySelectorAll('.fc-reveal').forEach(el=>revealObserver.observe(el));
 }
 if('IntersectionObserver' in window){
  const sections=[...root.querySelectorAll('[data-fc-chapter]')];
  const navObserver=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(!entry.isIntersecting)return;
    const chapter=entry.target.dataset.fcChapter;
    const id={story:'fc-story',identity:'fc-identity',palette:'fc-palette',type:'fc-type',products:'fc-dish'}[chapter];
    navBtns.forEach(btn=>btn.setAttribute('aria-current',String(btn.dataset.fcTarget===id)));
   });
  },{rootMargin:'-33% 0px -52% 0px',threshold:0});
  sections.forEach(el=>navObserver.observe(el));
 }
 const dialog=root.querySelector('#fcNativePreview'),viewer=root.querySelector('#fcNativePreviewImage'),zoom=root.querySelector('#fcNativeZoom');
 const title=root.querySelector('#fcNativePreviewTitle');let opener,oldOverflow='';
 root.querySelectorAll('[data-fc-zoom]').forEach(btn=>btn.addEventListener('click',()=>{
  opener=btn;viewer.src=btn.dataset.fcZoom;viewer.alt=btn.dataset.fcTitle;title.textContent=btn.dataset.fcTitle;
  dialog.classList.remove('fc-zoomed');zoom.setAttribute('aria-pressed','false');zoom.textContent='Agrandir +';
  oldOverflow=document.body.style.overflow;dialog.showModal();document.body.style.overflow='hidden';
 }));
 zoom.addEventListener('click',()=>{const active=dialog.classList.toggle('fc-zoomed');zoom.setAttribute('aria-pressed',String(active));zoom.textContent=active?'Réduire −':'Agrandir +'});
 root.querySelector('#fcNativeClose').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;opener?.focus({preventScroll:true})});
};
})();