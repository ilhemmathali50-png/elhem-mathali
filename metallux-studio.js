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
     <p>Des mockups textiles réalistes pour présenter la marque sur un pull, un polo et une collection coordonnée</p>
    </div>
    <div class="mx-realistic-layout mx-reveal">
      <div class="mx-realistic-stage">
        <img id="mxRealisticImage" src="./assets/projects/metallux/native/pull-realistic-photo.webp" alt="Pull MÉTALLUX réaliste bleu marine, col rond et manches longues, détails bleu électrique et marquage argenté" loading="lazy" decoding="async" width="400" height="500">
      </div>
      <div class="mx-realistic-info">
        <span class="mx-eyebrow">TEXTILE / MÉTALLUX</span>
        <h3 id="mxRealisticTitle">Le pull signature</h3>
        <p id="mxRealisticDescription">Sweat à col rond bleu marine, manches longues et finitions bleu électrique. Présentation textile réaliste.</p>
        <div class="mx-realistic-choices" role="group" aria-label="Choisir un visuel textile">
          <button type="button" data-mx-realistic="pull" aria-pressed="true">01 / Pull</button>
          <button type="button" data-mx-realistic="polo" aria-pressed="false">02 / Polo</button>
          <button type="button" data-mx-realistic="collection" aria-pressed="false">03 / Collection</button>
        </div>
        <p class="mx-realistic-honesty">Mockups de présentation · La reproduction du logo sur les vêtements est illustrative. Les fichiers officiels figurent dans la section Identité</p>
        <button type="button" class="mx-realistic-original" id="mxOriginalToggle" aria-expanded="false" aria-controls="mxOriginalPanel">Voir le mockup d’origine</button>
      </div>
    </div>
    <div class="mx-original-panel" id="mxOriginalPanel" hidden>
      <span>RÉFÉRENCE / DOCUMENT ORIGINAL</span>
      <img src="./assets/projects/metallux/native/uniforms.webp" alt="Mockups originaux MÉTALLUX : polo et pull côte à côte" loading="lazy" decoding="async">
    </div>
    <div class="mx-studio-bottom"><span>THE CREATIVE EDITIONS / MÉTALLUX</span><span>MOCKUPS TEXTILES / VISUELS RÉALISTES</span></div>
   </div>`;
  app.insertAdjacentElement('afterend',section);
  // One photorealistic textile showcase. Static images are not described as interactive 360° models.
  const designs={
    pull:{
      src:'./assets/projects/metallux/native/pull-realistic-photo.webp',
      alt:'Pull MÉTALLUX réaliste bleu marine à manches longues avec passepoils bleu électrique et monogramme argenté',
      title:'Le pull signature',
      description:'Sweat à col rond bleu marine, manches longues et finitions bleu électrique. Présentation textile réaliste.'
    },
    polo:{
      src:'./assets/projects/metallux/native/polo-realistic-transparent.png',
      alt:'Polo MÉTALLUX bleu marine, mockup textile réaliste isolé',
      title:'Le polo signature',
      description:'Polo bleu marine à col boutonné, détails bleu électrique et logo brodé en rendu réaliste.'
    },
    collection:{
      src:'./assets/projects/metallux/native/uniforms-realistic-transparent.png',
      alt:'Collection MÉTALLUX avec polo et pull bleu marine en mockups réalistes',
      title:'La collection textile',
      description:'Deux pièces coordonnées, bleu marine et détails bleu électrique, présentées ensemble.'
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