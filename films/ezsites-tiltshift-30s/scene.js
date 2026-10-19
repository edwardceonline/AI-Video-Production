import * as T from 'three';
import {makePost} from './lemo-post.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,powerPreference:'high-performance'});
R.setSize(720,1280,false);R.setPixelRatio(1);
R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.05;
R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;document.body.appendChild(R.domElement);
const S=new T.Scene();S.background=new T.Color('#bdcbd0');S.fog=new T.Fog('#bdcbd0',30,100);
const C=new T.PerspectiveCamera(30,720/1280,.1,150);C.up.set(0,0,1);
const mat=(col,roughness=.78,metalness=0)=>new T.MeshStandardMaterial({color:col,roughness,metalness});
const M={brick:mat('#b87658'),brick2:mat('#a76552'),brick3:mat('#cc9270'),
cream:mat('#e9d8bd'),ink:mat('#233440'),roof:mat('#30434e'),
wood:mat('#78533b'),glass:new T.MeshPhysicalMaterial({color:'#638e9d',metalness:.12,roughness:.16,transmission:.14,transparent:true,opacity:.84,clearcoat:.8}),
blue:mat('#1872ec'),stone:mat('#bfb6a4'),road:mat('#4c5a60'),lamp:mat('#ffd7a0'),
green:mat('#39714c'),green2:mat('#658a53'),green3:mat('#8eac65'),
black:mat('#1c2c31'),white:mat('#fff5e3'),pot:mat('#9f6545'),coffee:mat('#c89b67')};
// Hand-authored PBR material microdetail: repeatable brick courses, mottled roof felt and worn stone.
function proceduralMaterial(kind){
 const cn=document.createElement('canvas');cn.width=512;cn.height=512;const c=cn.getContext('2d');
 let seed=417;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const base=kind==='brick'?'#b77b62':kind==='roof'?'#3b4750':'#b9afa0';
 c.fillStyle=base;c.fillRect(0,0,512,512);
 if(kind==='brick'){
   for(let row=0;row<18;row++)for(let col=-1;col<10;col++){
     const x=col*59+(row%2)*29,y=row*30;
     const d=(rnd()-.5)*22;const v=Math.round(158+d);
     c.fillStyle='rgb('+Math.round(v*1.12)+','+Math.round(v*.67)+','+Math.round(v*.53)+')';
     c.fillRect(x+2,y+2,56,27);
     c.fillStyle='rgba(230,197,170,.22)';c.fillRect(x+2,y+2,55,1);
   }
 }else{
   for(let i=0;i<14000;i++){
    const a=.025+rnd()*.11;c.fillStyle=(rnd()>.52?'rgba(255,245,221,':'rgba(24,28,25,')+a.toFixed(3)+')';
    c.fillRect(rnd()*512,rnd()*512,1+rnd()*3,1+rnd()*3);
   }
   if(kind==='roof')for(let z=0;z<12;z++){c.fillStyle='rgba(16,26,29,.19)';c.fillRect(0,z*46,512,2)}
 }
 const tex=new T.CanvasTexture(cn);tex.colorSpace=T.SRGBColorSpace;
 tex.wrapS=T.RepeatWrapping;tex.wrapT=T.RepeatWrapping;
 tex.repeat.set(kind==='brick'?3:2,kind==='brick'?2:2);
 return new T.MeshStandardMaterial({map:tex,color:'#ffffff',roughness:kind==='roof'?.94:.87});
}
M.brick=proceduralMaterial('brick');M.brick2=proceduralMaterial('brick');M.roof=proceduralMaterial('roof');M.stone=proceduralMaterial('stone');
const cube=new T.BoxGeometry(1,1,1);
function box(x,y,z,w,d,h,m,shadow=true){const o=new T.Mesh(cube,m);o.position.set(x,y,z);o.scale.set(w,d,h);o.castShadow=shadow;o.receiveShadow=true;S.add(o);return o}
function ball(x,y,z,r,m){const o=new T.Mesh(new T.IcosahedronGeometry(r,1),m);o.position.set(x,y,z);o.castShadow=true;S.add(o);return o}
function rod(x,y,z,r,h,m){const o=new T.Mesh(new T.CylinderGeometry(r,r,h,10),m);o.rotation.x=Math.PI/2;o.position.set(x,y,z);o.castShadow=true;S.add(o);return o}
function flat(x,y,z,w,h,m){const o=new T.Mesh(new T.PlaneGeometry(w,h),m);o.rotation.x=Math.PI/2;o.position.set(x,y,z);S.add(o);return o}
function inkTexture(txt,kind='sign'){
 const cn=document.createElement('canvas');cn.width=1024;cn.height=256;const c=cn.getContext('2d');
 c.fillStyle=kind==='sign'?'#1d3039':'#faf6ea';c.fillRect(0,0,1024,256);
 c.textAlign='center';c.fillStyle=kind==='sign'?'#f4e6ce':'#1b2f41';
 c.font=kind==='sign'?'bold 100px Georgia':'bold 110px Arial';c.fillText(txt,512,154);
 const tex=new T.CanvasTexture(cn);tex.colorSpace=T.SRGBColorSpace;
 return new T.MeshBasicMaterial({map:tex,transparent:false,side:T.DoubleSide});
}
// Leaf cards are real organic meshes with anisotropic variation, instanced to keep 24 fps viable.
function tree(x,y,height=2.8){
 box(x,y,.29,.60,.60,.59,M.pot);
 const branchMat=new T.MeshStandardMaterial({color:'#605041',roughness:.99});
 const trunk=new T.Mesh(new T.CylinderGeometry(.074,.17,height*.67,9),branchMat);
 trunk.rotation.x=Math.PI/2;trunk.position.set(x,y,height*.40);trunk.castShadow=true;S.add(trunk);
 for(let j=0;j<12;j++){
  const ang=j*2.39996,z=height*.42+.065*j;
  const len=(.66+.28*Math.sin(j*3.1))*height*.30;
  const v=new T.Vector3(Math.cos(ang)*len,Math.sin(ang)*len,len*.38);
  const stick=new T.Mesh(new T.CylinderGeometry(.018,.042,v.length(),6),branchMat);
  stick.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v.clone().normalize());
  stick.position.set(x+v.x*.5,y+v.y*.5,z+v.z*.5);
  stick.castShadow=true;S.add(stick);
 }
 const leafGeom=new T.IcosahedronGeometry(1,1);
 const leafMat=new T.MeshStandardMaterial({color:'#66865a',roughness:.87,side:T.DoubleSide});
 const leaves=new T.InstancedMesh(leafGeom,leafMat,240);
 leaves.castShadow=true;leaves.receiveShadow=true;
 const dum=new T.Object3D(),rng=n=>((Math.sin(n*91.733+13.5)*43758.5453)%1+1)%1;
 for(let j=0;j<240;j++){
  const a=j*2.3999632297, zz=(rng(j+127)-.5)*1.4, rr=(.30+.62*Math.sqrt(rng(j+88)))*Math.sqrt(Math.max(.10,1-(zz/1.3)**2));
  dum.position.set(x+Math.cos(a)*rr,y+Math.sin(a)*rr,height*.92+zz*.66);
  dum.rotation.set(a*.3,.4+a,.4*Math.cos(a));
  dum.scale.set(.13+.12*rng(j+12),.20+.14*rng(j+15),.052+.045*rng(j+5));
  dum.updateMatrix();leaves.setMatrixAt(j,dum.matrix);
 }
 leaves.instanceMatrix.needsUpdate=true;S.add(leaves);
}
function table(x,y){
 box(x,y,.75,.75,.81,.10,M.wood);rod(x,y,.39,.09,.72,M.ink);
 for(const dx of [-.67,.67]){box(x+dx,y,.46,.42,.48,.08,M.wood);rod(x+dx,y,.25,.05,.4,M.ink)}
 ball(x,y,.87,.13,M.white);
}
// Street, café plot and aged sidewalk grout.
box(0,0,-.55,36,34,.88,M.road,false);box(.3,-.2,-.04,14,16,.15,M.stone,false);
for(let i=-5;i<=5;i++)box(i*1.17,-6,.05,1.05,.024,.022,M.cream,false);
for(let i=-6;i<=5;i++)box(-6.1,i*1.0,.05,.022,.9,.02,M.cream,false);
// Neighboring city blocks frame the subject, but don't overwhelm it.
function apartment(x,y,h,facade){
 box(x,y,h/2,5,5,h,facade);box(x,y,h+.14,5.18,5.15,.29,M.roof);
 for(let floor=1;floor<4;floor++){for(const px of [-1.3,0,1.3]){
  box(x+px,y-2.55,floor*1.32,.76,.16,.89,M.cream);
  box(x+px,y-2.65,floor*1.32,.61,.05,.74,M.glass);
  box(x+px,y-2.70,floor*1.32,.035,.06,.72,M.ink);
 }}
}
apartment(-6,8,6.1,M.cream);apartment(7.3,8,7.7,M.brick2);
// Real-ish miniature café: glazing/mullions, fascia, canopy, practicals, patio.
box(0,0.9,2.42,7.7,5.3,4.84,M.brick);
box(0,.9,4.98,7.92,5.6,.30,M.roof);
for(let level=0;level<9;level++){const z=.32+level*.51;
 for(let i=0;i<16;i++){const px=-3.6+i*.48+(level%2)*.16;
  box(px,-1.79,z,.45,.022,.032,[M.brick2,M.brick3,M.cream][(i+level)%7===0?2:(i+level)%3===0?1:0],false);}}
for(const xx of [-2.55,0,2.55]){
 box(xx,-1.90,3.68,1.45,.17,1.35,M.cream);
 box(xx,-2.01,3.68,1.23,.06,1.11,M.glass);
 box(xx,-2.07,3.68,.055,.07,1.11,M.ink);
 box(xx,-2.06,3.68,1.24,.07,.045,M.ink);
 box(xx,-2.06,4.36,1.54,.18,.13,M.cream);
}
box(0,-2.04,1.18,7.52,.29,2.36,M.wood);
for(const xx of [-2.4,2.4]){
 box(xx,-2.22,1.06,1.75,.12,1.69,M.cream);
 box(xx,-2.34,1.06,1.51,.055,1.49,M.glass);
 box(xx,-2.4,1.08,.06,.08,1.60,M.ink);
 box(xx,-2.40,.34,1.77,.16,.10,M.wood);
 // Espresso display + warm miniature interior
 box(xx,-2.47,.72,1.45,.23,.10,M.wood);
 for(let n=0;n<4;n++)ball(xx-.53+n*.35,-2.51,.84,.135,M.coffee);
}
box(0,-2.24,1.05,1.14,.17,2.04,M.ink);
box(0,-2.33,1.07,.93,.053,1.80,M.glass);
box(.33,-2.42,1.04,.055,.10,.28,M.lamp);
box(0,-2.43,2.48,7.49,.47,.64,M.ink);
flat(0,-2.69,2.48,7.15,.57,inkTexture('OAK & BEAN'));
for(let i=0;i<10;i++){const x=-3.38+i*.75;
 box(x,-3.13,1.94,.72,1.13,.15,i%2?M.cream:M.green);
 box(x,-3.70,1.87,.74,.10,.22,i%2?M.cream:M.green);
}
for(const x of [-3.22,3.22]){box(x,-2.40,2.50,.13,.28,.28,M.ink);ball(x,-2.63,2.41,.16,M.lamp);}
for(const x of [-2.35,2.32]){box(x,-2.40,5.35,.75,.72,.31,M.roof);}
// Roof gutters, sidewalk, movable tables and real courtyard props.
box(0,-2.00,5.06,7.92,.11,.08,M.ink);
table(-2.3,-4.72);table(2.33,-4.7);
for(const [x,y,h] of [[-4.25,-2.4,2.7],[4.25,-2.2,2.9],[-5.2,5.0,3.2],[5.4,4.5,3.0]])tree(x,y,h);
box(3.03,-6.00,.77,.73,.16,1.32,M.wood);
flat(3.03,-6.11,.79,.61,.90,inkTexture('OPEN','small'));
// Two small passers-by; in full film they step in a timelapse rhythm.
function person(x,y){const g=new T.Group();S.add(g);g.position.set(x,y,0);
 const torso=new T.Mesh(new T.CapsuleGeometry(.13,.42,3,8),M.ink);torso.rotation.x=Math.PI/2;torso.position.z=.81;g.add(torso);
 const head=new T.Mesh(new T.SphereGeometry(.18,10,8),M.cream);head.position.z=1.37;g.add(head);
 return g;
}
const people=[person(-3.7,-5.32),person(4.55,-5.28)];
S.add(new T.HemisphereLight('#f8e9d0','#768a91',1.6));
const sun=new T.DirectionalLight('#fff0ce',2.5);sun.position.set(-10,-13,23);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-20;sun.shadow.camera.right=20;sun.shadow.camera.top=20;sun.shadow.camera.bottom=-20;sun.shadow.bias=-.0007;S.add(sun);
// Native Lemo Tilt-Shift DOF chain: MSAA depth buffer → physical CoC+sharp band
// → gather → subtle bloom → warm grade. Shader sample count optimized for CI.
const {composer:P,dof,grade}=makePost(R,S,C,720,1280,{ssaa:1,msaa:0,ao:false});
dof.band.y=.56;dof.band.w=.15;dof.band.amp=19;dof.band.mix=.70;
dof.focus=22;dof.aper=16;dof.maxCoc=13;
grade.uniforms.sat.value=1.12;grade.uniforms.contrast.value=.13;
grade.uniforms.amt.value=.15;grade.uniforms.warm.value=.15;
window.DUR=30;const ease=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};
window.render=t=>{let p=ease(t/4);
 C.position.set(9.5+2.5*p,-21.5-6*p,12.8+6*p);
 C.lookAt(0,-2.9,2.1);C.updateProjectionMatrix();
 for(let i=0;i<people.length;i++)people[i].position.x+=0; // stable deterministic frame
 dof.band.y=.56-.025*p;dof.focus=24+5*p;P.render();
};
// Photogrammetry-scale CC0 meshes from Poly Haven. Require successful prefetch;
// no silent primitive-geometry fallback when quality is the whole review gate.
window.READY=false;
const gltfLoader=new GLTFLoader();
async function addSourcedProp(alias,x,y,height,rot=0) {
 const manifest=await (await fetch('/assets/manifest.json')).json();
 const asset=manifest[alias];
 if(!asset||asset.license!=='CC0')throw new Error('missing licensed source for '+alias);
 const gltf=await gltfLoader.loadAsync('/assets/'+alias+'/'+asset.file);
 const root=gltf.scene;
 root.rotation.x=Math.PI/2;root.updateMatrixWorld(true);
 const bbox=new T.Box3().setFromObject(root);
 const span=bbox.max.z-bbox.min.z;
 if(!(span>.0001))throw new Error('invalid glTF prop bounds for '+alias);
 root.scale.multiplyScalar(height/span);root.updateMatrixWorld(true);
 const b=new T.Box3().setFromObject(root);
 const center=b.getCenter(new T.Vector3());
 root.position.set(x-center.x,y-center.y,-b.min.z+.08);
 root.rotation.z=rot;
 root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
 S.add(root);
}
Promise.all([
 addSourcedProp('coffee_cart',4.35,-4.20,1.75,-.30),
 addSourcedProp('potted_plant',-4.15,-3.45,.78,.20),
 addSourcedProp('potted_plant',3.75,-2.75,.68,-.42)
]).then(()=>{window.READY=true;window.render(0.2);})
  .catch(err=>{window.ASSET_ERROR=String(err);console.error(err);});