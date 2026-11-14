/* MÉTALLUX: Interactive metal art book made from the original supplied brand artwork. */
(function(){
'use strict';
const base='./assets/projects/metallux/native/';
const A=name=>base+name+'.webp';
const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.renderMetalluxNative=function(detail){
 const menu=[['intro','Cover'],['art','Direction artistique'],['logo','Le logo'],['colors','Palette & typo'],['apps','Applications']];
 const zoom=(img,name,extra='')=>`<button class="mx-zoom-open ${extra}" type="button" data-mx-zoom="${A(img)}" data-mx-zoom-title="${name}" aria-label="Agrandir ${name}"><img src="${A(img)}" alt="${name}" loading="lazy" decoding="async"></button>`;
 detail.innerHTML=`<article id="mxBook" class="mx-book" aria-label="MÉTALLUX, art book animé et charte graphique">
 <section class="mx-section mx-hero" id="mx-intro" data-mx-chapter="intro">
  <div class="mx-inner mx-hero-grid">
   <div class="mx-hero-copy mx-reveal"><span class="mx-eyebrow">THE CREATIVE EDITIONS · ÉDITION 04</span><h1>Le métal<br><em>devient identité.</em></h1><p class="mx-hero-intro">MÉTALLUX. Une signature visuelle où la précision de l’assemblage rencontre l’éclat du bleu électrique.</p><div class="mx-hero-rule">ART DIRECTION · BRAND IDENTITY · APPLICATIONS</div></div>
   <div class="mx-hero-image" aria-label="Couverture originale de l'Art Book MÉTALLUX"><div class="mx-hero-aura" aria-hidden="true"></div><div class="mx-book-object"><img src="${A('cover-book')}" alt="Couverture originale de l’Art Book MÉTALLUX, livre bleu marine métallisé" fetchpriority="high" decoding="async"></div></div>
  </div>
 </section>
 <nav class="mx-chapter-nav" aria-label="Sommaire de MÉTALLUX">${menu.map(([id,title],i)=>`<a href="#mx-${id}" data-mx-link="${id}"${i===0?' aria-current="location"':''}><span>${String(i+1).padStart(2,'0')}</span>${title}</a>`).join('')}</nav>
 <section class="mx-section mx-art" id="mx-art" data-mx-chapter="art"><div class="mx-inner">
   <div class="mx-art-head mx-reveal"><div><span class="mx-eyebrow">01 / DIRECTION ARTISTIQUE</span><h2>Du métal<br><em>à l’identité.</em></h2></div><p>Des lignes verticales, des motifs ajourés et des finitions métalliques. Un univers graphique pensé à partir de ces codes.</p></div>
   <div class="mx-photo-grid mx-reveal">
    <figure class="mx-photo"><img src="${A('industrial-gate')}" alt="Portail métallique à lames verticales et détails bronze" loading="lazy"><figcaption>01 · Structures & rythme</figcaption></figure>
    <figure class="mx-photo"><img src="${A('industrial-door')}" alt="Portes métalliques ajourées encadrant une entrée" loading="lazy"><figcaption>02 · Géométrie & matière</figcaption></figure>
    <figure class="mx-photo"><img src="${A('industrial-detail-4')}" alt="Porte métallique contemporaine" loading="lazy"><figcaption>03 · Précision</figcaption></figure>
   </div>
   <div class="mx-photo-strip mx-reveal"><figure class="mx-photo"><img src="${A('industrial-detail-1')}" alt="Portail noir à motifs géométriques" loading="lazy"></figure><figure class="mx-photo"><img src="${A('industrial-detail-5')}" alt="Détails de lames et finitions métalliques" loading="lazy"></figure><figure class="mx-photo"><img src="${A('industrial-detail-8')}" alt="Portes métalliques et poignées" loading="lazy"></figure></div>
 </div></section>
 <section class="mx-section mx-assembly" id="mx-logo" data-mx-chapter="logo"><div class="mx-inner">
  <div class="mx-assembly-head mx-reveal"><span class="mx-eyebrow">02 / LE LOGO</span><h2>Une signature<br><em>personnelle.</em></h2><p>L’icône MÉTALLUX est un monogramme inspiré du prénom et du nom de Bilel Oueslati, dirigeant de la marque. L’argent brossé et le bleu électrique relient cette signature à l’univers de la construction métallique.</p></div>
  <div class="mx-logo-display mx-reveal" data-mode="light" id="mxLogoDisplay"><img src="${A('logo-original')}" id="mxLogoImage" alt="Logo final MÉTALLUX fourni par la designer" decoding="async"></div>
  <div class="mx-logo-controls mx-reveal" role="group" aria-label="Versions du logo">
   <button type="button" data-mx-variant="main" aria-pressed="true">Logo final</button><button type="button" data-mx-variant="dark" aria-pressed="false">Sur bleu marine</button><button type="button" data-mx-variant="symbol" aria-pressed="false">Symbole</button><button type="button" data-mx-variant="mono" aria-pressed="false">Monochrome</button>
  </div>
  <div class="mx-concept-row mx-reveal"><img src="${A('logo-icon-hd')}" alt="Icône MÉTALLUX en haute résolution, monogramme inspiré du nom de Bilel Oueslati" loading="lazy" decoding="async" width="1156" height="640"><div><strong>Le nom derrière le symbole.</strong><p>Le concept naît du prénom et du nom de Bilel Oueslati, CEO de MÉTALLUX. Son interprétation graphique garde la silhouette originale et les finitions métalliques de la marque.</p></div></div>
 </div></section>
 <section class="mx-section mx-colors" id="mx-colors" data-mx-chapter="colors"><div class="mx-inner">
  <span class="mx-eyebrow mx-reveal">03 / SYSTÈME GRAPHIQUE</span><h2 class="mx-reveal">Couleur<br><em>et caractère.</em></h2><p class="mx-colors-intro mx-reveal">Bleu marine pour l’ancrage, bleu électrique pour les détails, argent pour la référence au métal brossé. Cinq teintes présentées comme des pièces de métal façonnées, entre matières brutes et lumière.</p>
  <div class="mx-swatch-list mx-reveal" aria-label="Palette officielle MÉTALLUX">
   <div class="mx-swatch" style="--mx-c:#001F4D"><span class="mx-swatch-sculpture" aria-hidden="true"><span class="mx-swatch-grain"></span><span class="mx-swatch-engrave">01</span></span><strong>Marine</strong><code>#001F4D</code></div>
   <div class="mx-swatch" style="--mx-c:#0066FF"><span class="mx-swatch-sculpture" aria-hidden="true"><span class="mx-swatch-grain"></span><span class="mx-swatch-engrave">02</span></span><strong>Électrique</strong><code>#0066FF</code></div>
   <div class="mx-swatch" style="--mx-c:#C0C4CC"><span class="mx-swatch-sculpture" aria-hidden="true"><span class="mx-swatch-grain"></span><span class="mx-swatch-engrave">03</span></span><strong>Argent</strong><code>#C0C4CC</code></div>
   <div class="mx-swatch" style="--mx-c:#E6E8ED"><span class="mx-swatch-sculpture" aria-hidden="true"><span class="mx-swatch-grain"></span><span class="mx-swatch-engrave">04</span></span><strong>Gris clair</strong><code>#E6E8ED</code></div>
   <div class="mx-swatch" style="--mx-c:#FFFFFF"><span class="mx-swatch-sculpture" aria-hidden="true"><span class="mx-swatch-grain"></span><span class="mx-swatch-engrave">05</span></span><strong>Blanc</strong><code>#FFFFFF</code></div>
  </div>
  <div class="mx-type mx-reveal"><div class="mx-type-title" aria-label="Montserrat">Aa</div><div class="mx-type-caption"><strong>Montserrat</strong><p>La typographie de l’identité : nette, structurée et contemporaine.</p></div></div>
 </div></section>
 <section class="mx-section mx-application" id="mx-apps" data-mx-chapter="apps"><div class="mx-inner">
  <div class="mx-application-head mx-reveal"><div><span class="mx-eyebrow">04 / APPLICATIONS</span><h2>La marque<br><em>en usage.</em></h2></div><p>Du concept à des supports réels. Les compositions d’origine restent intactes.</p></div>
  <div class="mx-card-caption mx-reveal"><span>CARTE DE VISITE · 3D FLIP</span><span>Appuie pour retourner ↻</span></div>
  <div class="mx-flip-stage mx-reveal"><button class="mx-card-flipper" id="mxCardFlipper" type="button" data-flipped="false" aria-label="Retourner la carte de visite pour voir le verso" aria-pressed="false">
   <span class="mx-card-side front"><img src="${A('card-front')}" alt="Carte de visite MÉTALLUX, recto original" loading="lazy"></span><span class="mx-card-side back"><img src="${A('card-back')}" alt="Carte de visite MÉTALLUX, verso original" loading="lazy"></span>
  </button></div>
  <button class="mx-card-toggle mx-reveal" id="mxCardToggle" type="button">Découvrir le verso <span aria-hidden="true">↻</span></button>
  <div class="mx-app-divider" aria-hidden="true"></div>
  <div class="mx-uniform-layout mx-reveal"><div><span class="mx-eyebrow">05 / APPLICATION TEXTILE</span><h3>Une identité<br><em>jusque dans le détail.</em></h3><p>Le symbole et la signature MÉTALLUX prennent place sur les supports textiles présentés dans l’Art Book original.</p></div><img src="${A('uniforms')}" alt="Mockups originaux : polo et sweat MÉTALLUX bleu marine" loading="lazy"></div>
 </div></section>
 <footer class="mx-end"><span class="mx-eyebrow">THE CREATIVE EDITIONS · MÉTALLUX</span><strong>Du métal à l’identité.</strong><p>BRAND IDENTITY · ART DIRECTION · APPLICATIONS</p></footer>
 <dialog id="mxModal" class="mx-modal" aria-label="Agrandir un visuel MÉTALLUX"><div class="mx-modal-head"><h3 id="mxModalTitle"></h3><button id="mxClose" type="button" aria-label="Fermer">×</button></div><div class="mx-modal-body"><img id="mxModalImage" alt=""></div></dialog>
 </article>`;
 const root=detail.querySelector('#mxBook');
 const flip=root.querySelector('#mxCardFlipper'),flipButton=root.querySelector('#mxCardToggle');
 const flipCard=()=>{const on=flip.dataset.flipped!=='true';flip.dataset.flipped=String(on);flip.setAttribute('aria-pressed',String(on));flip.setAttribute('aria-label',on?'Retourner la carte de visite pour voir le recto':'Retourner la carte de visite pour voir le verso');flipButton.innerHTML=on?'Revoir le recto <span aria-hidden="true">↻</span>':'Découvrir le verso <span aria-hidden="true">↻</span>'};
 flip.addEventListener('click',flipCard);flipButton.addEventListener('click',flipCard);
 const display=root.querySelector('#mxLogoDisplay'),logoImage=root.querySelector('#mxLogoImage');
 const variants={main:{img:'logo-original',mode:'light',alt:'Logo final MÉTALLUX fourni, version couleur complète'},dark:{img:'logo-panel',mode:'dark',alt:'Logo MÉTALLUX couleur sur fond bleu marine'},symbol:{img:'logo-icon-hd',mode:'light',alt:'Symbole MÉTALLUX original, qualité haute résolution, argent et bleu électrique'},mono:{src:base+'logo-monochrome-vector.svg',mode:'light',alt:'Logo MÉTALLUX monochrome vectoriel, bleu marine, texte net et lisible'}};
 root.querySelectorAll('[data-mx-variant]').forEach(button=>button.addEventListener('click',()=>{
  const next=variants[button.dataset.mxVariant];display.dataset.mode=next.mode;logoImage.src=next.src||A(next.img);logoImage.alt=next.alt;
  root.querySelectorAll('[data-mx-variant]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 }));
 if(!reduced()){
  display.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=display.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;display.style.setProperty('--mx-rx',(x*10).toFixed(2)+'deg');display.style.setProperty('--mx-ry',(-y*8).toFixed(2)+'deg')});
  display.addEventListener('pointerleave',()=>{display.style.removeProperty('--mx-rx');display.style.removeProperty('--mx-ry')});
 }
 const links=[...root.querySelectorAll('[data-mx-link]')];
 links.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const target=root.querySelector(a.getAttribute('href'));target?.scrollIntoView({block:'start',behavior:reduced()?'instant':'smooth'});if(target)history.replaceState(null,'','#'+target.id)}));
 if('IntersectionObserver' in window){
  if(!reduced())root.classList.add('mx-animations');
  const revealObs=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('is-visible');revealObs.unobserve(item.target)}}),{threshold:.07,rootMargin:'0px 0px -20px 0px'});
  root.querySelectorAll('.mx-reveal').forEach(node=>revealObs.observe(node));
  const activeObs=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){const id=item.target.dataset.mxChapter;links.forEach(a=>{if(a.dataset.mxLink===id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}),{rootMargin:'-25% 0px -55% 0px',threshold:0});
  root.querySelectorAll('[data-mx-chapter]').forEach(node=>activeObs.observe(node));
 }
 const modal=root.querySelector('#mxModal'),modalImg=root.querySelector('#mxModalImage'),modalTitle=root.querySelector('#mxModalTitle'),close=root.querySelector('#mxClose');let opener=null;
 root.querySelectorAll('[data-mx-zoom]').forEach(button=>button.addEventListener('click',()=>{opener=button;modalImg.src=button.dataset.mxZoom;modalImg.alt=button.dataset.mxZoomTitle;modalTitle.textContent=button.dataset.mxZoomTitle;modal.showModal()}));
 close.addEventListener('click',()=>modal.close());modal.addEventListener('click',event=>{if(event.target===modal)modal.close()});modal.addEventListener('close',()=>opener?.focus({preventScroll:true}));
};
})();