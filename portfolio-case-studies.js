/* The Creative Editions · project narratives grounded in supplied artwork.
   These are design observations, not fabricated client briefs or commercial results. */
(()=>{
'use strict';
const projects={
 'herbtresor':{
  title:'HerbTrésor',type:'Brand identity · Étiquettes',accent:'#35634a',
  intro:'Un univers végétal construit autour d’un signe dessiné et d’une gamme d’étiquettes',
  brief:'Présenter une identité inspirée de la nature et ses applications sur les produits de la gamme',
  challenge:'Conserver un même langage visuel sur plusieurs huiles, avec des informations et formats différents',
  decision:'Développer la feuille calligraphique comme symbole, accompagnée d’une palette végétale et de déclinaisons d’étiquettes',
  outcome:'Logotype, croquis, palette, typographies, étiquettes et mockups de produits',
  images:[
   ['assets/projects/herbtresor/sketch.jpg','01 · Recherche','Croquis du symbole végétal'],
   ['assets/projects/herbtresor/palette.webp','02 · Système','Palette et couleurs de la charte'],
   ['assets/projects/herbtresor/mock_ricin.webp','03 · Application','Mockup du produit ricin']
  ]
 },
 'fait-maison':{
  title:'Fait Maison',type:'Brand identity · Packaging',accent:'#ac5139',
  intro:'Une identité artisanale pensée pour réunir une collection de produits variés',
  brief:'Présenter le langage de marque et ses applications, des produits alimentaires aux eaux florales',
  challenge:'Créer de la cohérence sur des bocaux, des étiquettes et des packagings de formats différents',
  decision:'Décliner les signes, les couleurs et les règles typographiques de la charte sur chaque support sans refaire les étiquettes originales',
  outcome:'Variantes de logo, palette, typographies, étiquettes, packagings et mockups',
  images:[
   ['assets/projects/fait-maison/book-logos.webp','01 · Identité','Planche des versions du logo'],
   ['assets/projects/fait-maison/book-palette.webp','02 · Système','Palette de couleurs'],
   ['assets/projects/fait-maison/mock-geranium.webp','03 · Application','Mockup de l’eau de géranium']
  ]
 },
 'forceclean':{
  title:'ForceClean',type:'Identité · Packaging',accent:'#176a9d',
  intro:'Une gamme de produits d’entretien portée par un langage de fraîcheur et de mouvement',
  brief:'Relier visuellement plusieurs catégories de produits, notamment liquide vaisselle, savon liquide et Air Fresh',
  challenge:'Permettre d’identifier rapidement le produit et son volume tout en gardant une unité de gamme',
  decision:'Utiliser les bleus, les jeux d’eau et un symbole dynamique comme fil conducteur entre identité et packaging',
  outcome:'Croquis, logo, système graphique, étiquettes à plat et mises en situation produit',
  images:[
   ['assets/projects/forceclean/native/sketch.webp','01 · Recherche','Croquis du symbole ForceClean'],
   ['assets/projects/forceclean/native/logo-clean.webp','02 · Identité','Logo ForceClean'],
   ['assets/projects/forceclean/native/air-mockup.webp','03 · Application','Mockup Air Fresh']
  ]
 },
 'metallux':{
  title:'MÉTALLUX',type:'Brand identity · Applications',accent:'#166bc0',
  intro:'Une identité construite autour de la précision et des matières métalliques',
  brief:'Présenter le monogramme, la direction artistique industrielle et ses applications',
  challenge:'Traduire des codes de construction métallique en langage de marque lisible sur plusieurs supports',
  decision:'Associer bleu électrique, argent brossé, structures géométriques et contraste typographique',
  outcome:'Monogramme, palette, recherches visuelles, carte de visite et applications textiles',
  images:[
   ['assets/projects/metallux/native/industrial-gate.webp','01 · Inspiration','Référence de structure métallique'],
   ['assets/projects/metallux/native/logo-original.webp','02 · Identité','Logo original MÉTALLUX'],
   ['assets/projects/metallux/native/card-front.webp','03 · Application','Carte de visite MÉTALLUX']
  ]
 }
};
const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const panel=(number,title,content)=>'<div class="case-fact"><span>'+number+'</span><h3>'+esc(title)+'</h3><p>'+esc(content)+'</p></div>';
window.renderPortfolioCaseStudy=function(id,target){
 const p=projects[id];
 if(!p||!target)return;
 target.querySelector('.case-study-intro')?.remove();
 const section=document.createElement('section');
 section.className='case-study-intro';
 section.setAttribute('aria-label','Présentation du projet '+p.title);
 section.style.setProperty('--case-accent',p.accent);
 const shareUrl=new URL('./',location.href);
 shareUrl.searchParams.set('projet',id);
 section.innerHTML='<div class="case-study-inner">'+
 '<div class="case-study-top"><span>ÉTUDE DE PROJET / THE CREATIVE EDITIONS</span><span>'+esc(p.type)+'</span></div>'+
 '<div class="case-study-introduction"><div><h2>'+esc(p.title)+'</h2><p>'+esc(p.intro)+'</p></div>'+
 '<div class="case-study-actions"><button type="button" class="case-share" title="Copier un lien direct vers ce projet">Copier le lien du projet</button><a href="https://wa.me/21622271913?text='+encodeURIComponent('Bonjour Elhem, je viens de découvrir '+p.title+' dans votre portfolio et j’aimerais discuter d’un projet.')+'" target="_blank" rel="noopener noreferrer">Discuter d’un projet</a></div></div>'+
 '<div class="case-facts">'+
 panel('01 / LE CONTEXTE','Le brief',p.brief)+
 panel('02 / L’ENJEU','Le challenge',p.challenge)+
 panel('03 / LE CHOIX','Design decision',p.decision)+
 panel('04 / LE RÉSULTAT','Ce qui est présenté',p.outcome)+
 '</div>'+
 '<div class="case-process-head"><span>DU CONCEPT AUX APPLICATIONS</span><small>Extraits des réalisations ci-dessous</small></div>'+
 '<div class="case-process">'+p.images.map(([src,label,alt])=>
 '<figure><img src="./'+esc(src)+'" alt="'+esc(alt)+'" loading="lazy" decoding="async"><figcaption>'+esc(label)+'</figcaption></figure>').join('')+
 '</div><p class="case-note">Cette présentation explique les choix visibles dans le projet. Elle ne revendique aucun résultat commercial non documenté</p>'+
 '</div>';
 const copy=section.querySelector('.case-share');
 copy.addEventListener('click',async()=>{
   try{await navigator.clipboard.writeText(shareUrl.href);copy.textContent='Lien copié';}
   catch(error){copy.textContent='Lien à copier';const a=document.createElement('input');a.value=shareUrl.href;a.setAttribute('aria-label','Lien du projet');a.readOnly=true;section.querySelector('.case-study-actions').append(a);a.select();}
 });
 target.prepend(section);
};
})();