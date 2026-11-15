/* The Creative Editions | Creative Welcome
   Lightweight personalised reply based on the visitor's choice.
   WhatsApp and e-mail open in the visitor's apps; nothing is sent automatically. */
(()=>{
'use strict';
const root=document.querySelector('#creativeWelcome');
if(!root)return;
const choices=Array.from(root.querySelectorAll('[data-creative-need]'));
const response=root.querySelector('#creativeResponse');
const responseKicker=root.querySelector('#creativeResponseKicker');
const responseTitle=root.querySelector('#creativeResponseTitle');
const responseText=root.querySelector('#creativeResponseText');
const note=root.querySelector('#creativeNote');
const whatsApp=root.querySelector('#creativeWhatsApp');
const email=root.querySelector('#creativeEmail');
const choiceLabel=root.querySelector('#creativeChoiceLabel');
const topics={
  brand:{
    choice:'Créer une identité de marque',
    title:'Donnons une personnalité à votre marque',
    reply:'Un univers fort commence par une idée claire. Ensemble, nous pouvons créer un logo, une palette et un langage visuel qui racontent votre histoire'
  },
  refresh:{
    choice:'Faire évoluer mon identité',
    title:'Votre marque a déjà une histoire. Faisons-la évoluer',
    reply:'Pas besoin de tout recommencer. Je peux vous aider à moderniser son image et à retrouver une cohérence entre vos supports'
  },
  packaging:{
    choice:'Créer un packaging ou des étiquettes',
    title:'Votre produit mérite le premier regard',
    reply:'Une étiquette bien pensée valorise le produit et transmet le bon message. Parlons du format, de son univers et de ce que vous voulez faire ressentir'
  },
  social:{
    choice:'Créer du contenu pour les réseaux',
    title:'Faisons reconnaître votre marque au premier coup d’œil',
    reply:'Posts, carrousels, campagnes ou reels : nous pouvons créer un univers éditorial cohérent qui se distingue sans se répéter'
  },
  digital:{
    choice:'Concevoir une expérience digitale',
    title:'Transformons votre idée en expérience claire',
    reply:'Site, page de présentation ou interface : je peux vous aider à structurer un parcours agréable et cohérent avec votre identité'
  },
  explore:{
    choice:'Discuter de mon idée',
    title:'Vous n’avez pas besoin d’avoir toutes les réponses',
    reply:'Une idée encore floue ? Racontez-moi ce que vous imaginez. Nous identifierons ensemble la direction créative la plus pertinente'
  }
};
let active=null;
function message(){
  const topic=topics[active];
  if(!topic)return '';
  const details=note.value.trim();
  return [
    'Bonjour Elhem,',
    'Je viens de découvrir votre portfolio The Creative Editions.',
    'J’aimerais échanger avec vous sur mon projet : '+topic.choice+'.',
    details?'Quelques détails : '+details:'',
    'Pouvez-vous m’accompagner ?'
  ].filter(Boolean).join('\n\n');
}
function updateLinks(){
  if(!active)return;
  const body=message();
  whatsApp.href='https://wa.me/21622271913?text='+encodeURIComponent(body);
  email.href='mailto:contactmathali@gmail.com?subject='+
    encodeURIComponent('Projet créatif · '+topics[active].choice)+
    '&body='+encodeURIComponent(body);
}
function choose(key){
  const topic=topics[key];
  if(!topic)return;
  active=key;
  choices.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.creativeNeed===key)));
  responseKicker.textContent='UNE PREMIÈRE IDÉE POUR VOTRE PROJET';
  responseTitle.textContent=topic.title;
  responseText.textContent=topic.reply;
  choiceLabel.textContent=topic.choice;
  note.value='';
  response.hidden=false;
  updateLinks();
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(()=>{
    response.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest'});
  });
}
choices.forEach(button=>button.addEventListener('click',()=>choose(button.dataset.creativeNeed)));
note.addEventListener('input',updateLinks);
})();
