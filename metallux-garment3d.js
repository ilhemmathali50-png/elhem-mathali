/* METALLUX | Procedural WebGL clothing, genuine 360° mesh rotation.
   Concept models intentionally do not claim to be photographic reconstructions of the source mockups.
   Three.js is lazy-loaded only when the workshop is opened. */
const threeURL='https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';
let libraryPromise;
const reduceMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const TWO_PI=Math.PI*2;
function getThree(){return libraryPromise||(libraryPromise=import(threeURL));}
const activeStages=new WeakSet();
const tempColor='#153a5e';

function clothTexture(T){
 const cv=document.createElement('canvas');cv.width=cv.height=256;
 const c=cv.getContext('2d');
 c.fillStyle='#173b59';c.fillRect(0,0,256,256);
 for(let i=0;i<256;i+=2){c.fillStyle=i%4===0?'#cde8ff0c':'#0000000e';c.fillRect(i,0,1,256)}
 for(let y=0;y<256;y+=3){c.fillStyle='#d9f1ff10';c.fillRect(0,y,256,1)}
 const img=c.getImageData(0,0,256,256);
 // Deterministic weave highlights to avoid tiled noise randomness.
 for(let y=0;y<256;y++)for(let x=0;x<256;x++){
  const offset=(y*256+x)*4;
  const add=Math.round(6*Math.sin(x*1.73+y*.83));
  img.data[offset]=Math.max(0,Math.min(255,img.data[offset]+add));
  img.data[offset+1]=Math.max(0,Math.min(255,img.data[offset+1]+add));
  img.data[offset+2]=Math.max(0,Math.min(255,img.data[offset+2]+add));
 }
 c.putImageData(img,0,0);
 const texture=new T.CanvasTexture(cv);texture.wrapS=texture.wrapT=T.RepeatWrapping;
 texture.repeat.set(2.5,3.8);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;
 return texture;
}
function cylinderBetween(T,a,b,r1,r2,material,radial=22){
 const start=new T.Vector3(...a),end=new T.Vector3(...b);const delta=end.clone().sub(start);
 const geometry=new T.CylinderGeometry(r1,r2,delta.length(),radial,1,false);
 const cylinder=new T.Mesh(geometry,material);
 cylinder.position.copy(start).add(end).multiplyScalar(.5);
 cylinder.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());
 return cylinder;
}
function torsoGeometry(T,type){
 const rings=type==='polo'?
 [ [-1.17,.59,.26],[-1.10,.59,.28],[-.75,.57,.31],[-.22,.57,.36],[.35,.63,.38],[.87,.67,.38],[1.06,.60,.32],[1.20,.39,.27] ]:
 [ [-1.2,.61,.26],[-1.10,.61,.29],[-.65,.58,.32],[-.05,.6,.38],[.6,.68,.4],[.99,.67,.37],[1.20,.39,.28] ];
 const N=48,vertices=[],indices=[],uv=[];
 for(let j=0;j<rings.length;j++){
  let [y,rx,rz]=rings[j];
  for(let i=0;i<N;i++){
   const phi=i/N*TWO_PI;
   const fold=(.009*Math.sin(phi*5+y*7)+.007*Math.sin(phi*9+y*11))*Math.sin((j/(rings.length-1))*Math.PI);
   vertices.push((rx+fold)*Math.sin(phi),y,(rz+fold)*Math.cos(phi));
   uv.push(i/N,j/(rings.length-1));
  }
 }
 for(let j=0;j<rings.length-1;j++)for(let i=0;i<N;i++){
  const a=j*N+i,b=j*N+(i+1)%N,c=(j+1)*N+i,d=(j+1)*N+(i+1)%N;
  indices.push(a,b,c,b,d,c);
 }
 const geometry=new T.BufferGeometry();
 geometry.setAttribute('position',new T.Float32BufferAttribute(vertices,3));
 geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
 geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
function addRib(T,parent,y,radius,width,material){
 const geom=new T.CylinderGeometry(radius,radius+.012,width,42,1,true);
 const m=new T.Mesh(geom,material);m.position.y=y;parent.add(m);return m;
}
function labelMaterial(T){
 const canvas=document.createElement('canvas');canvas.width=640;canvas.height=160;
 const ctx=canvas.getContext('2d');ctx.clearRect(0,0,640,160);
 // Brand lettering as a small conceptual embroidery mark, not a replacement for the logo artwork.
 ctx.font='800 64px Arial,sans-serif';ctx.fillStyle='#d8e8f3';ctx.textAlign='center';
 ctx.fillText('MÉTALLUX',320,104);
 ctx.fillStyle='#58a9e0';ctx.fillRect(150,118,340,3);
 const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
 return new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,side:T.DoubleSide});
}
function garment(T,type,textile,rib,print){
 const group=new T.Group();
 const mesh=new T.Mesh(torsoGeometry(T,type),textile);
 mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
 const armLength=type==='sweat'?.98:.53;
 const armEndY=type==='sweat'?-0.45:.56;
 for(const side of [-1,1]){
  const upper=[side*.62,1.02,.0], lower=[side*(type==='sweat'?1.04:1.07),armEndY,.0];
  const sleeve=cylinderBetween(T,upper,lower,.33,type==='sweat'?.235:.24,textile,28);
  sleeve.castShadow=true;group.add(sleeve);
  const cuffStart=[side*(type==='sweat'?1.013:1.065),armEndY+.065,0];
  const cuffEnd=[side*(type==='sweat'?1.075:1.092),armEndY-.07,0];
  const cuff=cylinderBetween(T,cuffStart,cuffEnd,.245,.237,rib,24);group.add(cuff);
 }
 // Collar and hem are actual volumetric geometry.
 addRib(T,group,-1.18,.595,.13,rib);
 const neck=new T.Mesh(new T.TorusGeometry(.295,.087,14,56),rib);
 neck.rotation.x=Math.PI/2;neck.position.set(0,1.2,.025);group.add(neck);
 if(type==='polo'){
  // Two pointed polo collar flaps, an inset placket, and three buttons.
  const collarMesh=(sign)=>{
   const g=new T.BufferGeometry();
   const v=sign<0?[-.29,1.22,.27,-.03,1.12,.40,-.22,.83,.43]:[.29,1.22,.27,.03,1.12,.40,.22,.83,.43];
   g.setAttribute('position',new T.Float32BufferAttribute(v,3));g.setIndex([0,1,2]);g.computeVertexNormals();
   const m=new T.Mesh(g,rib);m.material.side=T.DoubleSide;return m;
  };
  group.add(collarMesh(-1),collarMesh(1));
  const placket=new T.Mesh(new T.PlaneGeometry(.10,.39),rib);placket.position.set(0,1.0,.407);group.add(placket);
  for(let i=0;i<3;i++){const button=new T.Mesh(new T.SphereGeometry(.019,12,9),new T.MeshStandardMaterial({color:'#c2d4df',roughness:.4,metalness:.2}));button.position.set(.01,1.1-i*.13,.414);group.add(button)}
 }
 const sign=new T.Mesh(new T.PlaneGeometry(.52,.14),print);
 sign.position.set(-.13,.48,.395);group.add(sign);
 const back=new T.Mesh(new T.PlaneGeometry(.47,.12),print);
 back.position.set(0,.48,-.403);back.rotation.y=Math.PI;group.add(back);
 group.rotation.y=.04;
 return group;
}
function attachViewer(stage,T){
 if(!stage.isConnected)return;
 const id=stage.id;const section=stage.closest('.mx-showroom');if(!section)return;
 const prev=section.querySelector('[data-mx-garment="polo"]'),next=section.querySelector('[data-mx-garment="sweat"]');
 const slider=section.querySelector('#mxGarmentAngle'),degrees=section.querySelector('#mxGarmentDegrees');
 const auto=section.querySelector('#mxGarmentAuto'),reset=section.querySelector('#mxGarmentReset');
 const title=section.querySelector('#mxGarmentTitle'),fallback=section.querySelector('#mxGLFallback');
 let renderer;
 try{renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}catch(error){throw new Error('WebGL unavailable: '+error.message)}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.55));
 renderer.setSize(Math.max(1,stage.clientWidth),Math.max(1,stage.clientHeight),false);
 renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.2;
 renderer.setClearColor(0x000000,0);
 renderer.domElement.setAttribute('role','img');renderer.domElement.setAttribute('aria-label','Vêtement 3D MÉTALLUX, glissez horizontalement pour tourner');
 stage.append(renderer.domElement);
 const scene=new T.Scene();
 const camera=new T.PerspectiveCamera(33,1,.1,50);camera.position.set(0,.1,5.8);camera.lookAt(0,0,0);
 scene.add(new T.HemisphereLight(0xe5f4ff,0x1b273b,2.2));
 const key=new T.DirectionalLight(0xdcefff,3.6);key.position.set(-3,5,5);scene.add(key);
 const fill=new T.DirectionalLight(0x3c9aff,2.8);fill.position.set(2,2,-3);scene.add(fill);
 const rim=new T.DirectionalLight(0xffffff,1.3);rim.position.set(4,-1,3);scene.add(rim);
 const cloth=clothTexture(T);
 const textile=new T.MeshStandardMaterial({color:'#eaf2f9',map:cloth,metalness:.02,roughness:.95,side:T.DoubleSide});
 const rib=new T.MeshStandardMaterial({color:'#0b2942',metalness:.04,roughness:.96,side:T.DoubleSide});
 const print=labelMaterial(T);
 let shape=garment(T,'polo',textile,rib,print);scene.add(shape);
 let yaw=0,autoOn=false,pointer=null,last=performance.now(),visible=true,frame=0;
 const setAngle=rad=>{yaw=((rad%TWO_PI)+TWO_PI)%TWO_PI;shape.rotation.y=yaw;const deg=Math.round(yaw*180/Math.PI)%360;degrees.textContent=deg+'°';slider.value=String(deg)};
 function changeGarment(nextType){
  scene.remove(shape);shape.traverse(o=>{if(o.isMesh&&o.geometry)o.geometry.dispose()});
  shape=garment(T,nextType,textile,rib,print);scene.add(shape);setAngle(yaw);
  prev.setAttribute('aria-pressed',String(nextType==='polo'));
  next.setAttribute('aria-pressed',String(nextType==='sweat'));
  title.textContent=nextType==='sweat'?'Pull signature':'Polo signature';
 }
 prev.addEventListener('click',()=>changeGarment('polo'));
 next.addEventListener('click',()=>changeGarment('sweat'));
 slider.addEventListener('input',()=>{autoOn=false;updateAuto();setAngle(Number(slider.value)*Math.PI/180)});
 function updateAuto(){auto.setAttribute('aria-pressed',String(autoOn));auto.textContent=autoOn?'Ⅱ Pause rotation':'▶ Activer la rotation'}
 auto.addEventListener('click',()=>{autoOn=!autoOn;updateAuto()});
 reset.addEventListener('click',()=>{autoOn=false;updateAuto();setAngle(0)});
 const cvs=renderer.domElement;
 cvs.addEventListener('pointerdown',e=>{pointer={id:e.pointerId,x:e.clientX,y:e.clientY,yaw};autoOn=false;updateAuto();cvs.setPointerCapture(e.pointerId)});
 cvs.addEventListener('pointermove',e=>{if(!pointer||e.pointerId!==pointer.id)return;const dx=e.clientX-pointer.x;setAngle(pointer.yaw+dx*.011)});
 cvs.addEventListener('pointerup',()=>{pointer=null});cvs.addEventListener('pointercancel',()=>{pointer=null});
 cvs.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();autoOn=false;updateAuto();setAngle(yaw+(e.key==='ArrowRight'?-.12:.12))}});
 cvs.setAttribute('tabindex','0');
 const ro=new ResizeObserver(()=>resize());ro.observe(stage);
 function resize(){const w=Math.max(1,stage.clientWidth),h=Math.max(1,stage.clientHeight);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)}
 const io=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false},{threshold:.01});io.observe(stage);
 if(fallback)fallback.hidden=true;
 function render(now){
  if(!stage.isConnected){cleanup();return}
  frame=requestAnimationFrame(render);
  if(!visible||document.hidden)return;
  const dt=Math.min((now-last)/1000,.065);last=now;
  if(autoOn&&!reduceMotion())setAngle(yaw+dt*.42);
  renderer.render(scene,camera);
 }
 function cleanup(){cancelAnimationFrame(frame);ro.disconnect();io.disconnect();scene.remove(shape);shape.traverse(o=>{if(o.isMesh&&o.geometry)o.geometry.dispose()});cloth.dispose();textile.dispose();rib.dispose();print.map.dispose();print.dispose();renderer.dispose();cvs.remove()}
 resize();setAngle(0);frame=requestAnimationFrame(render);
}
async function init(stage){
 if(!stage||activeStages.has(stage))return;activeStages.add(stage);
 const fallback=stage.querySelector('#mxGLFallback');
 try{const T=await getThree();if(stage.isConnected)attachViewer(stage,T)}catch(error){
  if(fallback){fallback.hidden=false;const p=fallback.querySelector('p');if(p)p.textContent='Aperçu interactif non disponible sur ce navigateur, les mockups originaux restent visibles'}
  console.warn('MÉTALLUX 3D viewer:',error);
  const section=stage.closest('.mx-showroom');section?.querySelectorAll('button,input').forEach(x=>x.disabled=true);
 }
}
window.addEventListener('metallux-studio-mounted',event=>init(event.detail.section.querySelector('#mxGLViewer')));
document.querySelectorAll('#mxGLViewer').forEach(init);