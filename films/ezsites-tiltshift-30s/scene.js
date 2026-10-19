import * as T from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';

const R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,powerPreference:'high-performance'});
R.setSize(720,1280,false);R.setPixelRatio(1);
R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.35;
R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;document.body.appendChild(R.domElement);
const S=new T.Scene();S.background=new T.Color('#bad1de');S.fog=new T.Fog('#bad1de',24,85);
const C=new T.PerspectiveCamera(30,720/1280,.1,150);C.up.set(0,0,1);
const mat=(col,roughness=.78,metalness=0)=>new T.MeshStandardMaterial({color:col,roughness,metalness});
const M={brick:mat('#b87658'),brick2:mat('#a76552'),brick3:mat('#cc9270'),
cream:mat('#e9d8bd'),ink:mat('#233440'),roof:mat('#30434e'),
wood:mat('#78533b'),glass:new T.MeshPhysicalMaterial({color:'#638e9d',metalness:.12,roughness:.16,transmission:.14,transparent:true,opacity:.84,clearcoat:.8}),
blue:mat('#1872ec'),stone:mat('#bfb6a4'),road:mat('#4c5a60'),lamp:mat('#ffd7a0'),
green:mat('#39714c'),green2:mat('#658a53'),green3:mat('#8eac65'),
black:mat('#1c2c31'),white:mat('#fff5e3'),pot:mat('#9f6545'),coffee:mat('#c89b67')};
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
function tree(x,y,height=2.8){
 box(x,y,.3,.63,.64,.65,M.pot);rod(x,y,height/2,.12,height,M.wood);
 for(let i=0;i<24;i++){const angle=i*2.4,r=.30+.16*(i%4),z=height+.2+.43*Math.sin(i*2.2);
  ball(x+r*Math.cos(angle),y+r*Math.sin(angle),z,.34+.09*(i%3),[M.green,M.green2,M.green3][i%3]);}
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
S.add(new T.HemisphereLight('#f5edda','#617181',2.5));
const sun=new T.DirectionalLight('#ffe0b0',3.2);sun.position.set(-10,-13,23);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-20;sun.shadow.camera.right=20;sun.shadow.camera.top=20;sun.shadow.camera.bottom=-20;sun.shadow.bias=-.0007;S.add(sun);
const P=new EffectComposer(R);P.addPass(new RenderPass(S,C));
// Tilt-shift lens: sharp band tracks the shop, with blurred distant / foreground surfaces.
const lens=new ShaderPass({uniforms:{tDiffuse:{value:null},focusY:{value:.56},blur:{value:5.8},resolution:{value:new T.Vector2(720,1280)}},
vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
fragmentShader:'varying vec2 vUv;uniform sampler2D tDiffuse;uniform float focusY,blur;uniform vec2 resolution;void main(){float b=clamp((abs(vUv.y-focusY)-.15)*3.2,0.,1.);vec2 d=b*blur/resolution;vec4 c=texture2D(tDiffuse,vUv)*.24;c+=.13*(texture2D(tDiffuse,vUv+d)+texture2D(tDiffuse,vUv-d));c+=.12*(texture2D(tDiffuse,vUv+vec2(d.x,-d.y))+texture2D(tDiffuse,vUv+vec2(-d.x,d.y)));c+=.08*(texture2D(tDiffuse,vUv+vec2(d.x,0.))+texture2D(tDiffuse,vUv-vec2(d.x,0.)));c+=.05*(texture2D(tDiffuse,vUv+vec2(0.,d.y))+texture2D(tDiffuse,vUv-vec2(0.,d.y)));gl_FragColor=c;}'});
P.addPass(lens);P.addPass(new OutputPass());
window.DUR=30;const ease=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};
window.render=t=>{let p=ease(t/4);
 C.position.set(13+2*p,-23-5*p,17+6*p);
 C.lookAt(0,-1.6,2.15);C.updateProjectionMatrix();
 for(let i=0;i<people.length;i++)people[i].position.x+=0; // stable deterministic frame
 lens.uniforms.focusY.value=.55-.035*p;P.render();
};
window.READY=true;window.render(0.2);