/* MÉTALLUX / Industrial Atelier chapter enhancement.
   The original logo, card faces, mockups, and project pages remain intact. */
(()=>{
 'use strict';
 const original=window.renderMetalluxNative;
 if(typeof original!=='function')return;
 const MONO='./assets/projects/metallux/native/logo-black-transparent.webp';
 window.renderMetalluxNative=function(detail){
  original(detail);
  const root=detail.querySelector('#mxBook');
  if(!root)return;
  root.classList.add('mx-steel-edition');
  // Curated editorial cover, using the supplied MÉTALLUX mark rather than a flattened mockup.
  const hero=root.querySelector('.mx-hero-image');
  if(hero){
   hero.setAttribute('aria-label','Couverture éditoriale MÉTALLUX, identité métallisée et inspiration architecturale');
   hero.innerHTML=`<div class="mx-cover-compose">
      <div class="mx-cover-edition"><span>THE CREATIVE EDITIONS</span><span>VOL. 04 / 2026</span></div>
      <div class="mx-cover-hero-mark"><img src="./assets/projects/metallux/native/logo-panel.webp" alt="Logo officiel MÉTALLUX, bleu électrique et argent" fetchpriority="high" decoding="async"></div>
      <span class="mx-cover-vertical" aria-hidden="true">STRUCTURE / PRECISION / IDENTITY</span>
      <div class="mx-cover-foot"><strong>MÉTALLUX</strong><span>BRAND IDENTITY<br>ART DIRECTION</span></div>
     </div>`;
  }
  const coverTitle=root.querySelector('.mx-hero-copy h1');
  if(coverTitle)coverTitle.innerHTML='La force<br><em>du détail.</em>';
  const coverIntro=root.querySelector('.mx-hero-intro');
  if(coverIntro)coverIntro.textContent='Une identité construite comme le métal : lignes précises, matières affirmées et lumière bleu électrique';
  const heroCopy=root.querySelector('.mx-hero-copy');
  if(heroCopy){
   const stamp=document.createElement('p');
   stamp.className='mx-industrial-stamp';
   stamp.textContent='STEEL / FORM / IDENTITY';
   heroCopy.append(stamp);
  }
  // This is the supplied black artwork, cleaned to native transparency.
  // It is a high-resolution raster, not an invented vector logo.
  const mono=root.querySelector('[data-mx-variant="mono"]');
  if(mono){
   mono.addEventListener('click',event=>{
    event.stopImmediatePropagation();
    const display=root.querySelector('#mxLogoDisplay');
    const img=root.querySelector('#mxLogoImage');
    display.dataset.mode='light';
    img.src=MONO;
    img.alt='Logo MÉTALLUX monochrome original, noir sur fond transparent';
    root.querySelectorAll('[data-mx-variant]').forEach(b=>b.setAttribute('aria-pressed',String(b===mono)));
   },{capture:true});
  }
  const logoNote=root.querySelector('.mx-concept-row p');
  if(logoNote)logoNote.textContent='Le monogramme fait référence à Bilel Oueslati, dirigeant de MÉTALLUX, avec des courbes qui évoquent le mouvement et la précision du travail du métal';
  const app=root.querySelector('#mx-apps');
  if(!app)return;
  // One textile experience only: remove the old static textile block.
  // Keep the supplied original artwork accessible on demand inside the 3D showroom.
  app.querySelector('.mx-uniform-layout')?.remove();
  app.querySelector('.mx-app-divider')?.remove();
  const section=document.createElement('section');
  section.id='mx-atelier';
  section.className='mx-showroom mx-realistic-showroom mx-section';
  section.dataset.mxChapter='atelier';
  section.setAttribute('aria-labelledby','mxAtelierHeading');
  section.innerHTML=`
   <div class="mx-inner">
    <div class="mx-showroom-heading mx-reveal">
     <div><span class="mx-eyebrow">06 / APPLICATIONS TEXTILES</span><h2 id="mxAtelierHeading">La marque <em>en situation</em></h2></div>
     <p>Des mockups 3D réalistes, isolés sur fond transparent pour mettre les volumes et les finitions en valeur</p>
    </div>
    <div class="mx-realistic-layout mx-reveal">
      <div class="mx-realistic-stage">
        <img id="mxRealisticImage" src="./assets/projects/metallux/native/polo-realistic-transparent.png" alt="Polo MÉTALLUX bleu marine, mockup 3D réaliste isolé sur fond transparent" loading="lazy" decoding="async" width="1189" height="1323">
      </div>
      <div class="mx-realistic-info">
        <span class="mx-eyebrow">TEXTILE / MÉTALLUX</span>
        <h3 id="mxRealisticTitle">Le polo signature</h3>
        <p id="mxRealisticDescription">Coupe structurée, tissu bleu marine et finitions bleu électrique, présentés sous forme de rendu 3D</p>
        <div class="mx-realistic-choices" role="group" aria-label="Choisir un visuel textile">
          <button type="button" data-mx-realistic="polo" aria-pressed="true">01 / Polo</button>
          <button type="button" data-mx-realistic="collection" aria-pressed="false">02 / Collection</button>
        </div>
        <p class="mx-realistic-honesty">Rendus visuels 3D · Le logo sur les mockups est une simulation graphique, les versions officielles se trouvent dans la section Identité</p>
        <button type="button" class="mx-realistic-original" id="mxOriginalToggle" aria-expanded="false" aria-controls="mxOriginalPanel">Voir le mockup d’origine</button>
      </div>
    </div>
    <div class="mx-original-panel" id="mxOriginalPanel" hidden>
      <span>RÉFÉRENCE / DOCUMENT ORIGINAL</span>
      <img src="./assets/projects/metallux/native/uniforms.webp" alt="Mockups originaux MÉTALLUX : polo et pull côte à côte" loading="lazy" decoding="async">
    </div>
    <div class="mx-studio-bottom"><span>THE CREATIVE EDITIONS / MÉTALLUX</span><span>RENDUS 3D / FOND TRANSPARENT</span></div>
   </div>`;
  app.insertAdjacentElement('afterend',section);
  // Actual geometry-based 360-degree viewer. Photorealistic stills remain below as design references.
  const viewer=document.createElement('div');
  viewer.className='mx-showroom-grid mx-interactive-3d mx-reveal';
  viewer.innerHTML=`
    <div class="mx-viewport" id="mxGLViewer" aria-label="Visionneuse interactive 3D des vêtements MÉTALLUX">
      <span class="mx-viewport-note">ROTATION LIBRE · 360°</span><span class="mx-viewport-orbit" aria-hidden="true">360°</span>
      <div class="mx-viewport-fallback" id="mxGLFallback"><div>
        <img src="./assets/projects/metallux/native/uniforms-realistic-transparent.png" alt="Collection textile MÉTALLUX, aperçu lorsque la 3D n’est pas disponible" loading="lazy">
        <p>Le modèle 3D se charge. Les visuels originaux restent disponibles plus bas.</p>
      </div></div>
    </div>
    <aside class="mx-garment-toolbar" aria-label="Contrôles de la rotation textile 3D">
      <div class="mx-controls-title"><span class="mx-identity">MÉTALLUX / ATELIER 360°</span><h3 id="mxGarmentTitle">Polo signature</h3>
        <p>Un modèle 3D volumétrique à tourner librement pour explorer la coupe. Les rendus réalistes se trouvent juste en dessous.</p></div>
      <div class="mx-garment-buttons" role="group" aria-label="Sélection du vêtement">
        <button type="button" data-mx-garment="polo" aria-pressed="true">01 / Polo</button>
        <button type="button" data-mx-garment="sweat" aria-pressed="false">02 / Pull</button>
      </div>
      <div class="mx-garment-slider"><label for="mxGarmentAngle">ANGLE DE VUE <strong id="mxGarmentDegrees">0°</strong></label><input type="range" id="mxGarmentAngle" min="0" max="359" value="0" step="1" aria-label="Faire tourner le vêtement sur 360 degrés"></div>
      <div class="mx-controls-actions"><button type="button" id="mxGarmentAuto" class="mx-auto-btn" aria-pressed="true">Ⅱ Pause rotation</button><button type="button" id="mxGarmentReset" class="mx-reset-btn">↺ Vue de face</button></div>
      <p class="mx-garment-footnote">Glissez avec le doigt sur le vêtement pour le faire tourner. Modèle 3D d’interprétation, non une reproduction exacte du patron ou du logo imprimé.</p>
    </aside>`;
  section.querySelector('.mx-realistic-layout').before(viewer);
  viewer.insertAdjacentHTML('afterend','<p class="mx-reference-label">APERÇUS RÉALISTES / POLO ET COLLECTION</p>');
  window.dispatchEvent(new CustomEvent('metallux-studio-mounted',{detail:{section}}));
  const designs={
    polo:{
      src:'./assets/projects/metallux/native/polo-realistic-transparent.png',
      alt:'Polo MÉTALLUX bleu marine, mockup 3D réaliste transparent',
      title:'Le polo signature',
      description:'Coupe structurée, tissu bleu marine et finitions bleu électrique, présentés sous forme de rendu 3D'
    },
    collection:{
      src:'./assets/projects/metallux/native/uniforms-realistic-transparent.png',
      alt:'Polo et pull MÉTALLUX bleu marine, rendus 3D réalistes isolés sur fond transparent',
      title:'La collection textile',
      description:'Deux silhouettes coordonnées, avec des détails bleus et argentés sur des textiles bleu marine'
    }
  };
  const preview=section.querySelector('#mxRealisticImage');
  const title=section.querySelector('#mxRealisticTitle');
  const description=section.querySelector('#mxRealisticDescription');
  section.querySelectorAll('[data-mx-realistic]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.mxRealistic;
    const design=designs[key];
    if(!design)return;
    preview.classList.add('is-changing');
    preview.src=design.src;
    preview.alt=design.alt;
    title.textContent=design.title;
    description.textContent=design.description;
    section.querySelectorAll('[data-mx-realistic]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    const clear=()=>preview.classList.remove('is-changing');
    if(preview.complete)clear();
    else preview.addEventListener('load',clear,{once:true});
  }));
  const originalButton=section.querySelector('#mxOriginalToggle'),originalPanel=section.querySelector('#mxOriginalPanel');
  originalButton.addEventListener('click',()=>{
    const expanded=originalButton.getAttribute('aria-expanded')==='true';
    originalButton.setAttribute('aria-expanded',String(!expanded));
    originalPanel.hidden=expanded;
    originalButton.textContent=expanded?'Voir le mockup d’origine':'Masquer le mockup d’origine';
  });
  section.querySelectorAll('.mx-reveal').forEach(item=>item.classList.add('is-visible'));
  const nav=root.querySelector('.mx-chapter-nav');
  if(nav){
   const a=document.createElement('a');a.href='#mx-atelier';a.dataset.mxLink='atelier';
   a.innerHTML='<span>06</span>Textile';
   a.addEventListener('click',event=>{
      event.preventDefault();
      section.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
      nav.querySelectorAll('[data-mx-link]').forEach(x=>x.removeAttribute('aria-current'));
      a.setAttribute('aria-current','location');
   });
   nav.append(a);
  }
 };
})();