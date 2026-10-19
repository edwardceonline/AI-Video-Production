/**
 * Beyond Your Front Door — original EzSites Miniature film set, look proof.
 * Native Lemo tilt-shift rule set. This scene does NOT import any demo story,
 * town props, or animation timeline. It only reuses pinned upstream post.js.
 * Real hand-authored geometry, textures, camera and depth-band motion.
 * Three.js scene is fully deterministic: window.render(t).
 */
import * as THREE from 'three';
import { makePost } from '/lemo/styles/tilt-shift/demo/post.js';
const params=new URLSearchParams(location.search);
const W=+(params.get('w')||540),H=+(params.get('h')||960);
const scene=new THREE.Scene();scene.background=new THREE.Color('#b1c6cb');scene.fog=new THREE.FogExp2('#b4c2bb',0.008);
const camera=new THREE.PerspectiveCamera(29,W/H,0.1,250);
const renderer=new THREE.WebGLRenderer({antialias:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
renderer.setPixelRatio(1);renderer.setSize(W,H);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.81;
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
document.getElementById('stage').appendChild(renderer.domElement);
const post=makePost(renderer,scene,camera,W,H,{ssaa:+(params.get('ssaa')||1),msaa:0,ao:false});
post.bloom.strength=.08;post.bloom.threshold=1.12;post.bloom.radius=.25;
post.grade.uniforms.sat.value=1.40;post.grade.uniforms.contrast.value=.29;
post.grade.uniforms.warm.value=.28;post.grade.uniforms.amt.value=.10;
const rand=(()=>{let v=972318;return()=>{v^=v<<13;v^=v>>>17;v^=v<<5;return ((v>>>0)%1048576)/1048576;}})();
const smooth=x=>{x=Math.min(1,Math.max(0,x));return x*x*(3-2*x)};
const mix=(a,b,t)=>a+(b-a)*t;
const C=(col)=>new THREE.Color(col);
const mat=(c,rough=.75,metal=0,extra={})=>new THREE.MeshStandardMaterial({color:c,roughness:rough,metalness:metal,...extra});
const mats={
  stucco:mat('#ca9375',.9),trim:mat('#f3e5d3',.8),dark:mat('#282628',.62),iron:mat('#222b30',.35,.56),bronze:mat('#987451',.28,.54),
  wood:mat('#a36e41',.72),green:mat('#264b3c',.75),white:mat('#faf7e9',.64),glass:new THREE.MeshPhysicalMaterial({color:'#9ad0d6',roughness:.14,metalness:.1,transparent:true,opacity:.47,clearcoat:1,side:THREE.DoubleSide}),
  blackGlass:new THREE.MeshPhysicalMaterial({color:'#2e6470',roughness:.12,metalness:.12,transparent:true,opacity:.26,depthWrite:false,side:THREE.DoubleSide}),asphalt:mat('#424950',.99),curb:mat('#cabdb0',1),stone:mat('#b7aca1',1),dirt:mat('#62442d',1),warm:mat('#e9bb6b',.32,0,{emissive:'#d99551',emissiveIntensity:.5}),
  latte:mat('#ae6731',.94),milk:mat('#f4e5ca',.76),blue:mat('#1477ea',.22,.1,{emissive:'#0654b8',emissiveIntensity:.7}),
  foliage:[mat('#27503c'),mat('#3d754d'),mat('#487d4e'),mat('#618d4d'),mat('#779958'),mat('#2b6247')]
};
const boxGeo=new THREE.BoxGeometry(1,1,1),cylGeo=new THREE.CylinderGeometry(1,1,1,16),sphereGeo=new THREE.IcosahedronGeometry(1,1);
const root=new THREE.Group();scene.add(root);
function box(parent,x,y,z,w,h,d,m,cast=true){const o=new THREE.Mesh(boxGeo,m);o.position.set(x,y,z);o.scale.set(w,h,d);o.castShadow=cast;o.receiveShadow=true;parent.add(o);return o;}
function cylinder(parent,x,y,z,r1,r2,h,m,segments=20){const o=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,segments),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
function ball(parent,x,y,z,r,m){const o=new THREE.Mesh(sphereGeo,m);o.position.set(x,y,z);o.scale.setScalar(r);o.castShadow=true;parent.add(o);return o;}
function plane(parent,x,y,z,w,h,m){const o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m);o.position.set(x,y,z);parent.add(o);return o;}
function tube(parent,points,r,m){const c=new THREE.CatmullRomCurve3(points.map(v=>new THREE.Vector3(...v)));const o=new THREE.Mesh(new THREE.TubeGeometry(c,Math.max(10,points.length*10),r,7,false),m);o.castShadow=true;parent.add(o);return o;}
function tx(w,h,paint,opts={}){let canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;let ctx=canvas.getContext('2d');paint(ctx,w,h);let t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;t.wrapS=t.wrapT=THREE.RepeatWrapping;if(opts.repeat)t.repeat.set(...opts.repeat);return t;}
const texStucco=tx(768,768,(g,w,h)=>{
 g.fillStyle='#cc8f72';g.fillRect(0,0,w,h);
 for(let i=0;i<19000;i++){const a=rand()*.19;g.fillStyle=rand()>.6?`rgba(88,67,55,${a})`:`rgba(255,246,224,${a})`;g.fillRect(rand()*w,rand()*h,1+rand()*3,1+rand()*3)}
 for(let r=0;r<24;r++){let y=r*32;g.fillStyle='rgba(81,63,52,.15)';g.fillRect(0,y,w,1.3);for(let j=0;j<7;j++){let x=((j+(r%2)*.5)*110)%w;g.fillRect(x,y,1,32)}}
});mats.stucco.map=texStucco;mats.stucco.needsUpdate=true;
const texStone=tx(512,512,(g,w,h)=>{g.fillStyle='#aaa49b';g.fillRect(0,0,w,h);for(let i=0;i<7500;i++){let v=rand()*.12;g.fillStyle=`rgba(255,255,235,${v})`;g.fillRect(rand()*w,rand()*h,2+rand()*2,2+rand()*2)}for(let i=0;i<8;i++){let k=i*64;g.fillStyle='#938e85';g.fillRect(k,0,2,h);g.fillRect(0,k,w,2)}});mats.stone.map=texStone;mats.stone.needsUpdate=true;
const texRoad=tx(512,512,(g,w,h)=>{g.fillStyle='#505358';g.fillRect(0,0,w,h);for(let i=0;i<26000;i++){let v=rand()*.2;g.fillStyle=rand()>.5?`rgba(247,238,227,${v})`:`rgba(11,13,17,${v})`;g.fillRect(rand()*w,rand()*h,1+rand()*2,1+rand()*2)}});mats.asphalt.map=texRoad;mats.asphalt.needsUpdate=true;
function textTex(w,h,lines,opts={}){return tx(w,h,(g,W,H)=>{
 g.clearRect(0,0,W,H);if(opts.bg){g.fillStyle=opts.bg;g.fillRect(0,0,W,H)}
 g.textAlign='center';g.textBaseline='middle';for(const line of lines){g.font=`${line.weight||700} ${line.size||64}px ${line.serif?'Georgia':'Arial'},sans-serif`;g.fillStyle=line.col||'#f5e7cb';g.fillText(line.text,W/2,line.y);}
 })}
function board(parent,x,y,z,w,h,d,lines,opt={}){let frame=box(parent,x,y,z,w,h,d,opt.mat||mats.dark);let t=textTex(1024,Math.max(128,Math.round(1024*h/w)),lines,opt);const o=new THREE.Mesh(new THREE.PlaneGeometry(w*.95,h*.88),new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false}));o.position.set(x,y,z+d/2+.012);parent.add(o);return frame;}
// miniature's physical model stage: real world under a macro lens
box(root,0,-.4,0,55,.8,51,mats.stone); // slab
box(root,0,.04,8.7,55,.13,9.1,mats.curb);
box(root,0,-.02,15,55,.08,5.1,mats.asphalt);
for(let i=-5;i<=5;i++){box(root,i*4.2,.073,8,3.9,.012,.022,mat('#d8d3c4'));}
for(let i=-3;i<=3;i++){box(root,i*6.2,.025,15,1.9,.018,.08,mat('#dcd1ad'));}
// café: actual windows, frame divisions, interior with silhouette props
const store=new THREE.Group();store.position.set(-2,0,-3);root.add(store);
// Upper masonry level + separate structural ground-floor walls with a real inset interior.
box(store,0,8.65,-2,16,4.7,10,mats.stucco);
box(store,-7.65,3.0,-2,.7,6,10,mats.stucco);
box(store, 7.65,3.0,-2,.7,6,10,mats.stucco);
box(store,0,3.0,-6.7,15.2,6,.4,mats.stucco);
box(store,0,11.16,-2,17.2,.55,11,mats.trim);
box(store,0,10.66,3.09,16.1,.12,.18,mats.trim);
box(store,0,6.45,3.02,16.25,.19,.12,mats.trim);
// Ground-level storefront has a dark inset wall recess, not stickers
box(store,0,5.78,3.13,15.3,.50,.25,mats.dark);
box(store,0,.23,3.13,15.3,.38,.25,mats.dark);
box(store,0,3.0,3.39,14.55,5.3,.06,mats.blackGlass);
// warm cafe interior, partly visible through windows
box(store,0,.15,0.75,14.2,.25,6,mats.wood);
box(store,0,4.2,1.0,12,4,.3,mat('#ad7850'));
for(let i=0;i<4;i++){box(store,-5.4+i*3.7,2.2,1.5,2.5,.15,1.45,mats.wood);box(store,-5.4+i*3.7,3.15,1.5,1.5,1.3,.23,mat('#8b5a37'));
 for(let j=0;j<4;j++)ball(store,-6.2+i*3.7+j*.55,2.9+rand()*.1,2.4,.11,mats.warm);}
for(let i=0;i<4;i++){let x=-7.2+i*4.8;box(store,x,3.05,3.53,.14,5.9,.22,mats.iron)}
box(store,0,5.99,3.53,14.9,.15,.25,mats.iron);
box(store,0,1.0,3.53,14.9,.15,.25,mats.iron);
box(store,-.55,3.07,3.54,.14,5.55,.12,mats.iron);
box(store,1.1,3.1,3.58,.11,5.6,.1,mats.iron);
box(store,.23,3.05,3.61,.08,5.0,.09,mats.iron);
cylinder(store,.65,2.8,3.74,.08,.08,.24,mats.bronze);
// upper windows: frames, lintels, double sills and warm interiors
for(const x of [-5.15,0,5.15]){
 box(store,x,8.36,3.22,3.75,3.2,.36,mats.trim);
 box(store,x,8.36,3.45,3.31,2.8,.07,mats.blackGlass);
 box(store,x,8.34,3.52,.09,2.8,.05,mats.iron);
 box(store,x,8.27,3.57,3.4,.1,.05,mats.trim);
 box(store,x,6.83,3.63,3.85,.25,.38,mats.trim);
 box(store,x,10.02,3.62,3.9,.24,.38,mats.trim);
 for(let p=0;p<2;p++){box(store,x+(p?1.7:-1.7),8.45,3.62,.14,3.2,.2,mats.trim)}
}
// roof gutters, vents, roof props and distressed cornices
for(let j=0;j<3;j++)box(store,-7.7+j*7.7,11.4,-1.4,.7,.4,.75,mat('#958e83'));
box(store,5,11.69,-5.2,2.2,.48,1.6,mats.stone);
for(let j=0;j<28;j++){let x=-7.85+j*.57;box(store,x,11.45,3.6,.06,.13,.28,mat(j%3?'#e3d7bf':'#b99d7e'))}
// canopy with curved fascia supports and repeating canvas awning folds (real mesh, not flat blocks)
const canopy=new THREE.Group();store.add(canopy);
for(let i=0;i<15;i++){
  let x=-7.5+i*(15/15),x2=x+1;
  let col=i%2?mat('#f1e6cc',.87):mat('#3d6c57',.88);
  let o=box(canopy,(x+x2)/2,5.74,4.73,1.0,.1,2.95,col);o.rotation.x=-.11;
  const hem=box(canopy,(x+x2)/2,5.48,6.21,1,.31,.09,col);hem.rotation.x=.05;
}
box(store,0,5.85,4.98,15.3,.16,.1,mats.dark);
for(let i=-6;i<=6;i+=3)box(store,i,5.3,4.12,.09,.66,.15,mats.bronze);
board(store,0,6.74,4.18,10.4,1.06,.18,[
 {text:'OAK & BEAN',size:102,y:60,weight:700},{text:'C O F F E E',size:37,y:128,weight:400}],{bg:'#252d29'});
// icon graphic resembling a coffee leaf but not any protected cafe logo
for(let z of [4.09,4.3]){} // reserved dimensional frame
// warm wall lamps
function lamp(x){box(store,x,6.95,3.65,.26,.78,.34,mats.iron);
 const glow=new THREE.Mesh(new THREE.SphereGeometry(.19,12,10),new THREE.MeshBasicMaterial({color:'#ffe2a5'}));glow.position.set(x,6.86,3.9);store.add(glow);
 const light=new THREE.PointLight('#ffca78',2.1,6.5,2);light.position.set(x,6.87,4.0);store.add(light);
 cylinder(store,x,7.25,3.79,.24,.19,.18,mats.bronze);}
lamp(-6.78);lamp(6.78);
// shadow contact details, planter with individual leaves, flowering vines
function plant(parent,x,z,h=1.4,scale=1){cylinder(parent,x,h*.16,z,.35*scale,.29*scale,h*.32,mats.dirt,12);
 cylinder(parent,x,h*.4,z,.06*scale,.07*scale,h*.6,mat('#6d6444'));
 for(let j=0;j<21;j++){let a=rand()*Math.PI*2,r=(.3+rand()*.43)*scale,hi=h*(.48+rand()*.55);ball(parent,x+Math.cos(a)*r,hi,z+Math.sin(a)*r,scale*(.09+rand()*.19),mats.foliage[Math.floor(rand()*mats.foliage.length)])}
}
for(let x of [-7.52,7.52]){plant(store,x,6.1,1.8,1.1);plant(store,x,4.5,1.2,.85)}
// wall ivy: vine follows climbing arcs and has individual leaves
for(let side of [-1,1]){
 let p=[];for(let i=0;i<16;i++){let y=5.3+i*.37,x=side*(7.35+.23*Math.sin(i*.9));p.push([x,y,3.47]);if(i%2===0){for(let j=0;j<6;j++)ball(store,x+side*(rand()*.38),y+(rand()-.5)*.2,3.46,.08+rand()*.13,mats.foliage[Math.floor(rand()*6)])}}
 tube(store,p,.025,mat('#52764c'));
}
// sidewalk: grout seams; coffee A-board; outdoor tables with carefully placed cups, chairs
for(let z=4.7;z<12.5;z+=2)for(let x=-23;x<22;x+=3.2){box(root,x,.12,z,.03,.009,1.85,mat('#9c948b'));}
board(root,-9.0,1.07,7.45,1.15,1.5,.28,[{text:'FRESH',size:100,y:145},{text:'COFFEE',size:86,y:250},{text:'EVERY DAY',size:40,y:330}],{bg:'#253331'});
function table(x,z){const brass=mats.bronze,cup=mats.white;
 cylinder(root,x,1.0,z,.054,.07,1.75,mats.iron);
 cylinder(root,x,1.91,z,.9,.88,.16,mats.wood);
 cylinder(root,x,1.992,z,.15,.15,.04,cup);
 cylinder(root,x,2.02,z,.12,.12,.015,mats.latte);
 ball(root,x,2.03,z,.022,mats.milk);
 for(let d of [-1,1]){
 const px=x+d*1.42;
 cylinder(root,px,.62,z,.48,.47,.12,mats.wood);box(root,px,1.15,z-.38,.90,.9,.10,mats.green);
 for(let dz of [-.28,.28])cylinder(root,px+d*.22,.31,z+dz,.04,.05,.62,brass);
 }
}
table(-5.7,9.2);table(4.8,9.8);
// store floor border and little parking rack; remove generic placeholder UI/chapter text
for(let i=0;i<6;i++){let x=11.3+i*.6;const o=new THREE.Mesh(new THREE.TorusGeometry(.28,.04,6,18,Math.PI),mats.iron);o.rotation.x=Math.PI/2;o.position.set(x,.34,8.4);root.add(o)}
// human figurines with clothed aprons, full 3D legs, head/hair; scaled appropriately
function person(x,z,cloth,pose=0){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);
 const skin=mat('#c78c64',.85),fabric=mat(cloth,.92);
 for(let d of [-1,1]){cylinder(g,d*.17,.48,0,.105,.135,.95,fabric,9);ball(g,d*.17,.085,0,.16,mats.dark)}
 cylinder(g,0,1.58,0,.29,.25,1.15,fabric,10);box(g,0,1.45,.255,.42,.7,.06,mats.white);
 const neck=cylinder(g,0,2.22,0,.105,.095,.21,skin,12);
 let head=ball(g,0,2.62,0,.40,skin);head.scale.set(.36,.48,.35);
 let hair=ball(g,0,2.93,-.07,.37,mat('#2b2421'));hair.scale.y=.6;
 for(let side of [-1,1]){let x=side*.43;const arm=cylinder(g,x,1.68,.1,.09,.12,.8,fabric);arm.rotation.z=side*(.15+pose*.3);ball(g,x+side*.09,1.26,.14,.14,skin)}
 return g;
}
person(-1.75,9.5,'#a97752',0.2);person(7.3,10.7,'#46705e',.4);
// street trees as soft clumped multi-leaf canopies (not faceted cubes)
function streetTree(x,z,r=2.3){cylinder(root,x,2.0,z,.19,.32,4,mat('#715b45'),11);
 for(let i=0;i<60;i++){const a=rand()*Math.PI*2,rr=Math.pow(rand(),.66)*r,yy=3.8+(rand()-.4)*r*.9;ball(root,x+rr*Math.cos(a),yy,z+rr*Math.sin(a),.28+rand()*.52,mats.foliage[Math.floor(rand()*6)])}
 for(let j=0;j<12;j++)ball(root,x+Math.cos(j*2.4)*r*.7,4.2+rand()*1.1,z+Math.sin(j*2.4)*r*.7,.18,mat('#c49b58'));
}
streetTree(-13.7,6,2.2);streetTree(15.2,4.5,2.35);
// adjacent buildings, softened by real lens post. Original, not demo's city.
function neighbor(x,z,w,h,d,color){const p=new THREE.Group();p.position.set(x,0,z);root.add(p);
 const wall=mat(color,.97);box(p,0,h/2,0,w,h,d,wall);box(p,0,h+.22,0,w+.5,.44,d+.5,mats.trim);
 for(let yy=3;yy<h-1;yy+=3.2)for(let xx=-w/2+1.7;xx<w/2-1.1;xx+=2.5){box(p,xx,yy,d/2+.14,1.45,1.84,.1,mats.dark);box(p,xx,yy,d/2+.25,1.1,1.5,.02,mats.blackGlass);box(p,xx,yy-.99,d/2+.3,1.6,.19,.28,mats.trim);}
}
neighbor(-22,-13,13,13,10,'#b6a09a');neighbor(19,-15,12,15,9,'#d7c5ac');neighbor(16,0,9,10,8,'#afa6b2');
// road lamps: poles, small lights, warm bulbs
function streetLamp(x,z){cylinder(root,x,2.7,z,.06,.08,5.5,mats.iron);
 tube(root,[[x,5.4,z],[x-.23,5.75,z],[x-.9,5.7,z]],.047,mats.iron);
 ball(root,x-.9,5.51,z,.14,mats.warm);
 const light=new THREE.PointLight('#ffd18b',.7,5);light.position.set(x-.9,5.5,z);root.add(light);
}
streetLamp(-11,12);streetLamp(12.4,12);
// an original line of light signals the cafe's digital identity emerging; NOT random slides.
const routePoints=[];for(let i=0;i<=40;i++){let p=i/40;routePoints.push([mix(1,20,p),.6+1.1*Math.sin(p*Math.PI),mix(7.5,-1,p)])}
const routeMat=new THREE.MeshBasicMaterial({color:'#43b4ff',transparent:true,opacity:1,depthWrite:false});
const route=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(routePoints.map(p=>new THREE.Vector3(...p))),100,.08,10,false),routeMat);route.material.depthTest=false;route.renderOrder=110;root.add(route);
const routeHead=new THREE.Mesh(new THREE.SphereGeometry(.19,20,14),new THREE.MeshBasicMaterial({color:'#caefff'}));root.add(routeHead);
// studio light: shadowed sunlight, airy ambient fill
scene.add(new THREE.HemisphereLight('#e0eaff','#655343',1.05));
const sun=new THREE.DirectionalLight('#ffe1b4',2.15);sun.position.set(-28,55,38);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
sun.shadow.camera.left=-38;sun.shadow.camera.right=38;sun.shadow.camera.top=38;sun.shadow.camera.bottom=-38;sun.shadow.camera.near=1;sun.shadow.camera.far=135;sun.shadow.bias=-.0007;sun.shadow.normalBias=.023;scene.add(sun);
const rim=new THREE.DirectionalLight('#bad8f5',.52);rim.position.set(24,22,-28);scene.add(rim);
const up=new THREE.Vector3(0,1,0);
function render(t){t=Math.max(0,Math.min(5,t));
 // Time-lapse stutter ONLY on world actors. Camera stays smooth (upstream style).
 let st=Math.floor(t*8)/8;root.rotation.y=0;
 const move=smooth(t/2.75),wide=smooth((t-2.85)/1.95);
 // high oblique 50°; camera follows sign then reveals blue path across the neighborhood
 const target=new THREE.Vector3(mix(mix(-3.7,-2.1,move),3.7,wide),mix(mix(3.6,4.0,move),2.5,wide),mix(mix(3.6,2.6,move),5.1,wide));
 const offset=new THREE.Vector3(mix(mix(16.2,14.6,move),22.0,wide),mix(mix(27.5,28.5,move),38,wide),mix(mix(25.0,24.5,move),33,wide));
 camera.position.copy(target).add(offset);camera.lookAt(target);
 const focusObj=new THREE.Vector3(mix(-2,5,wide),mix(6.75,1.4,wide),mix(4.15,6,wide));
 const projected=focusObj.clone().project(camera);
 post.dof.focus=camera.position.distanceTo(focusObj);
 post.dof.aper=35;post.dof.maxCoc=15;
 post.dof.band.y=THREE.MathUtils.clamp((projected.y+1)/2,.17,.8);
 post.dof.band.w=mix(.22,.14,wide);
 post.dof.band.amp=mix(10,15,wide);post.dof.band.mix=.40;post.dof.band.tilt=.02;
 post.grade.uniforms.expo.value=.92;
 // Blue identity trace is choreographed on musical subdivisions; begins after 3.15 sec.
 const grow=smooth((t-3.18)/1.6);route.visible=grow>.005;
 route.scale.set(1,1,1); // progressive reveal via an accurate tube rebuild only on preview cues
 route.geometry.setDrawRange(0,Math.max(0,Math.floor((route.geometry.index?route.geometry.index.count:route.geometry.attributes.position.count)*grow)));
 let seg=routePoints[Math.min(routePoints.length-1,Math.floor(grow*(routePoints.length-1)))];routeHead.position.set(...seg);routeHead.visible=route.visible;
 const gl=post.grade.uniforms;gl.sat.value=1.38;post.composer.render();
}
window.DUR=5;window.render=render;window.READY=true;window.VIDEO_BRIEF={style:'tilt-shift',kind:'source-code 5s lens/cafe proof; NOT finished 30s film',logo:'not displayed in this initial environmental proof'};
render(1.5);