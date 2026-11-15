/* THE CREATIVE EDITIONS / Project Match.
   Guided project enquiry, not a chatbot or an automated sending service.
   Matching is transparent and based only on options chosen by the visitor. */
(()=>{
'use strict';
const root=document.getElementById('projectDiagnostic');
if(!root)return;

const kinds={
  launch:{
    label:'Je lance une marque',
    service:'Identité de marque',
    intro:'Créer une base graphique claire et reconnaissable avant de multiplier les supports.',
    outcomes:[
      {label:'Donner une personnalité à ma marque',hint:'Définir une direction visuelle qui me ressemble.'},
      {label:'Créer mon logo et mon univers graphique',hint:'Rassembler les éléments essentiels de mon identité.'},
      {label:'Préparer les supports de lancement',hint:'Passer de l’idée à des applications cohérentes.'}
    ],
    deliverables:['Logo & déclinaisons','Couleurs & typographies','Mini-charte']
  },
  evolve:{
    label:'Je veux faire évoluer ma marque',
    service:'Refonte & direction artistique',
    intro:'Conserver ce qui fonctionne, tout en rendant la marque plus cohérente et actuelle.',
    outcomes:[
      {label:'Moderniser mon identité',hint:'Évoluer sans perdre ma personnalité.'},
      {label:'Retrouver de la cohérence',hint:'Unifier mes différents supports.'},
      {label:'Repenser ma direction artistique',hint:'Trouver une nouvelle façon de raconter ma marque.'}
    ],
    deliverables:['Audit visuel','Nouvelle direction','Applications de marque']
  },
  product:{
    label:'Je prépare un produit',
    service:'Packaging & étiquettes',
    intro:'Valoriser le produit avec un design lisible, cohérent et pensé pour son support réel.',
    outcomes:[
      {label:'Créer une étiquette',hint:'Hiérarchiser les informations et l’identité.'},
      {label:'Concevoir un packaging',hint:'Faire exister le produit dès le premier regard.'},
      {label:'Présenter ma gamme en mockups',hint:'Montrer mes produits dans un univers cohérent.'}
    ],
    deliverables:['Étiquette ou packaging','Hiérarchie visuelle','Mockups produits']
  },
  content:{
    label:'Je veux communiquer autrement',
    service:'Social Media & création de contenu',
    intro:'Construire une communication cohérente sans répéter le même visuel partout.',
    outcomes:[
      {label:'Organiser mon feed',hint:'Unifier mes publications tout en variant les idées.'},
      {label:'Créer des campagnes visuelles',hint:'Faire passer un message plus efficacement.'},
      {label:'Créer des reels et vidéos courtes',hint:'Raconter mon produit avec du mouvement.'}
    ],
    deliverables:['Direction de contenu','Posts & carrousels','Reels selon le besoin']
  },
  digital:{
    label:'J’ai un projet digital',
    service:'Design digital & UI',
    intro:'Prolonger l’identité de la marque dans une interface claire, surtout sur mobile.',
    outcomes:[
      {label:'Concevoir une page web',hint:'Présenter mon activité de manière claire.'},
      {label:'Améliorer une interface existante',hint:'Rendre le parcours plus simple et agréable.'},
      {label:'Créer une direction UI pour mon produit',hint:'Harmoniser l’expérience et le visuel.'}
    ],
    deliverables:['Structure de page','Maquettes UI','Direction responsive']
  }
};

let step=1;
let kind=null;
let outcome=null;
const panels=[...root.querySelectorAll('[data-pd-panel]')];
const stepValue=root.querySelector('#pdStepValue');
const track=root.querySelector('#pdTrackFill');
const goalList=root.querySelector('#pdGoalChoices');
const serviceName=root.querySelector('#pdServiceName');
const serviceCopy=root.querySelector('#pdServiceCopy');
const deliverables=root.querySelector('#pdDeliverables');
const chosen=root.querySelector('#pdSelected');
const form=root.querySelector('#pdDetailsForm');
const whatsApp=root.querySelector('#pdWhatsApp');
const copy=root.querySelector('#pdCopy');
const status=root.querySelector('#pdCopyStatus');

const scrollIntoView=()=>{
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
};
function go(next){
  if(next===2&&!kind)return;
  if(next===3&&(!kind||!outcome))return;
  step=next;
  for(const panel of panels)panel.hidden=Number(panel.dataset.pdPanel)!==step;
  stepValue.textContent=String(step).padStart(2,'0');
  track.style.width=(step*100/3)+'%';
  root.setAttribute('data-pd-current',String(step));
  status.textContent='';
  scrollIntoView();
}

function updateMessage(){
  if(!kind||!outcome)return '';
  const cfg=kinds[kind];
  const name=form.elements.name.value.trim();
  const brand=form.elements.brand.value.trim();
  const notes=form.elements.goal.value.trim();
  return [
    'Bonjour Elhem,',
    'Je souhaite discuter de mon projet créatif.',
    '',
    'Nom : '+(name||'À préciser'),
    'Marque : '+(brand||'À préciser'),
    'Mon projet : '+cfg.label,
    'Ma priorité : '+outcome,
    'Piste proposée par le site : '+cfg.service,
    'Description : '+(notes||'À discuter ensemble'),
    '',
    'Pouvons-nous échanger à ce sujet ?'
  ].join('\n');
}
function updateWhatsApp(){
  const base='https://wa.me/21622271913?text=';
  whatsApp.href=base+encodeURIComponent(updateMessage());
}
function renderRecommendation(){
  if(!kind||!outcome)return;
  const cfg=kinds[kind];
  chosen.textContent=cfg.label+' · '+outcome;
  serviceName.textContent=cfg.service;
  serviceCopy.textContent=cfg.intro;
  deliverables.replaceChildren();
  for(const value of cfg.deliverables){
    const el=document.createElement('span');
    el.textContent=value;
    deliverables.append(el);
  }
  updateWhatsApp();
}

root.addEventListener('click',event=>{
  const category=event.target.closest('[data-pd-kind]');
  if(category){
    kind=category.dataset.pdKind;
    outcome=null;
    const cfg=kinds[kind];
    if(!cfg)return;
    goalList.replaceChildren();
    cfg.outcomes.forEach((item,index)=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='pd-choice';
      btn.dataset.pdOutcome=item.label;
      const small=document.createElement('small');small.textContent='0'+(index+1)+' / OBJECTIF';
      const heading=document.createElement('strong');heading.textContent=item.label;
      const hint=document.createElement('span');hint.textContent=item.hint;
      btn.append(small,heading,hint);
      goalList.append(btn);
    });
    root.querySelector('#pdKindSelected').textContent=cfg.label;
    go(2);
    return;
  }
  const objective=event.target.closest('[data-pd-outcome]');
  if(objective){
    outcome=objective.dataset.pdOutcome;
    renderRecommendation();
    go(3);
    return;
  }
  const back=event.target.closest('[data-pd-back]');
  if(back){go(Number(back.dataset.pdBack));return;}
});

form.addEventListener('input',()=>{
  status.textContent='';
  updateWhatsApp();
});

whatsApp.addEventListener('click',event=>{
  if(!form.reportValidity()){
    event.preventDefault();
    return;
  }
  updateWhatsApp();
});

copy.addEventListener('click',async()=>{
  if(!form.reportValidity())return;
  try{
    await navigator.clipboard.writeText(updateMessage());
    status.textContent='Résumé copié. Vous pouvez le partager avec Elhem.';
  }catch(_error){
    status.textContent='Copie indisponible. Vous pouvez utiliser le bouton WhatsApp.';
  }
});
updateWhatsApp();
})();
