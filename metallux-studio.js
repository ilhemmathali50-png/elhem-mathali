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
  section.className='mx-showroom mx-section';
  section.dataset.mxChapter='atelier';
  section.setAttribute('aria-labelledby','mxAtelierHeading');
  section.innerHTML=`
   <div class="mx-inner">
    <div class="mx-showroom-heading mx-reveal">
     <div><span class="mx-eyebrow">06 / LE SHOWROOM INTERACTIF</span><h2 id="mxAtelierHeading">MÉTALLUX<br><em>en volume</em></h2></div>
     <p>Un aperçu des vêtements de marque à manipuler en trois dimensions. Tournez, explorez, changez de pièce</p>
    </div>
    <div class="mx-showroom-grid mx-reveal">
     <div class="mx-viewport" id="mxGLViewer" aria-label="Visualisation tridimensionnelle interactive d'un vêtement MÉTALLUX">
      <span class="mx-viewport-note">DIGITAL MATERIAL LAB / 01</span>
      <span class="mx-viewport-orbit" aria-hidden="true">360°</span>
      <div class="mx-viewport-fallback" id="mxGLFallback"><div><img src="./assets/projects/metallux/native/uniforms.webp" alt="Polo et sweat MÉTALLUX, mockups originaux" loading="lazy" decoding="async"><p>Chargement de l’aperçu 3D interactif…</p></div></div>
     </div>
     <div class="mx-garment-toolbar">
      <div class="mx-controls-title"><span class="mx-identity">ÉQUIPEMENT / PROTOTYPE NUMÉRIQUE</span><h3 id="mxGarmentTitle">Polo signature</h3><p>Bleu marine, monogramme discret, matière textile</p></div>
      <div class="mx-garment-buttons" role="group" aria-label="Sélection du vêtement">
       <button type="button" data-mx-garment="polo" aria-pressed="true">01 · Polo</button>
       <button type="button" data-mx-garment="sweat" aria-pressed="false">02 · Pull</button>
      </div>
      <div class="mx-garment-slider"><label for="mxGarmentAngle">ROTATION <output id="mxGarmentDegrees">0°</output></label><input id="mxGarmentAngle" type="range" min="0" max="360" step="1" value="0" aria-label="Tourner le vêtement en degrés"></div>
      <div class="mx-controls-actions"><button type="button" id="mxGarmentAuto" class="mx-auto-btn" aria-pressed="false">▶ Activer la rotation</button><button type="button" id="mxGarmentReset" class="mx-reset-btn">↺ Vue de face</button></div>
      <p class="mx-garment-footnote" id="mxGarmentNote">Modèle 3D conceptuel : ouvrez les mockups originaux pour comparer les designs réels</p>
     </div>
    </div>
    <div class="mx-studio-bottom"><span>THE CREATIVE EDITIONS / MÉTALLUX</span><span>INTERACTION AU DOIGT · SOURIS · CURSEUR</span></div>
   </div>`;
  app.insertAdjacentElement('afterend',section);
  const viewport=section.querySelector('#mxGLViewer');
  const originalView=document.createElement('div');
  originalView.className='mx-original-overlay';
  originalView.id='mxOriginalOverlay';
  originalView.hidden=true;
  originalView.setAttribute('aria-label','Mockups originaux des vêtements MÉTALLUX');
  originalView.innerHTML='<img src="./assets/projects/metallux/native/uniforms.webp" alt="Mockups originaux : polo et pull MÉTALLUX côte à côte" loading="lazy" decoding="async"><span>MOCKUPS ORIGINAUX · MÉTALLUX</span>';
  viewport.append(originalView);
  const originalsButton=document.createElement('button');
  originalsButton.type='button';
  originalsButton.id='mxOriginalToggle';
  originalsButton.className='mx-original-toggle';
  originalsButton.setAttribute('aria-controls','mxOriginalOverlay');
  originalsButton.setAttribute('aria-pressed','false');
  originalsButton.textContent='Voir les mockups originaux ↗';
  section.querySelector('.mx-controls-actions').append(originalsButton);
  const setOriginals=(on)=>{
   originalView.hidden=!on;
   originalsButton.setAttribute('aria-pressed',String(on));
   originalsButton.textContent=on?'Revenir à la rotation 3D ↻':'Voir les mockups originaux ↗';
  };
  originalsButton.addEventListener('click',()=>setOriginals(originalView.hidden));
  section.querySelectorAll('[data-mx-garment],#mxGarmentAngle,#mxGarmentAuto,#mxGarmentReset').forEach(control=>{
   control.addEventListener('pointerdown',()=>setOriginals(false),{passive:true});
   control.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' ')setOriginals(false)});
  });
  // Dynamically inserted content must not inherit an invisible reveal state.
  section.querySelectorAll('.mx-reveal').forEach(item=>item.classList.add('is-visible'));
  const nav=root.querySelector('.mx-chapter-nav');
  if(nav){
   const a=document.createElement('a');
   a.href='#mx-atelier';a.dataset.mxLink='atelier';
   a.innerHTML='<span>06</span>Showroom 3D';
   a.addEventListener('click',event=>{
    event.preventDefault();
    section.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    nav.querySelectorAll('[data-mx-link]').forEach(x=>x.removeAttribute('aria-current'));
    a.setAttribute('aria-current','location');
   });
   nav.append(a);
  }
  window.dispatchEvent(new CustomEvent('metallux-studio-mounted',{detail:{section}}));
 };
})();