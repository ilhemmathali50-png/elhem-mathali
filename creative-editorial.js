/* THE CREATIVE EDITIONS · Divers gallery controls. */
(()=>{
'use strict';
function initDivers(){
 const section=document.querySelector('[data-view="divers"]');
 if(!section)return;
 const filters=[...section.querySelectorAll('[data-divers-filter]')];
 const cards=[...section.querySelectorAll('[data-divers-type]')];
 const film=section.querySelector('#portfolioFilm');
 function selectFilter(type){
  filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.diversFilter===type)));
  cards.forEach(card=>card.hidden=type!=='all'&&card.dataset.diversType!==type);
  if(type==='posts' && film) film.pause();
 }
 filters.forEach(b=>b.addEventListener('click',()=>selectFilter(b.dataset.diversFilter)));
 selectFilter('all');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initDivers);
else initDivers();
})();
