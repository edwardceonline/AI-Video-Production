import React from 'react';
import {AbsoluteFill,Sequence,Img,Audio,interpolate,Easing,staticFile,useCurrentFrame,useVideoConfig,spring} from 'remotion';
const W=1080,H=1920;
const GOLD='#D8BC80',INK='#070A0A',BONE='#EAE4D6',BLUE='#129BE8';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const smooth=Easing.bezier(.19,.81,.18,1);
const v=(f:number,a:number,b:number,x:number,y:number)=>interpolate(f,[a,b],[x,y],{...clamp,easing:smooth});
const reveal=(f:number,a:number,d=18)=>v(f,a,a+d,0,1);
const Fade:React.FC<{opacity?:number;children:React.ReactNode;style?:React.CSSProperties}>=({opacity=1,children,style})=><AbsoluteFill style={{opacity,...style}}>{children}</AbsoluteFill>;
const Shot:React.FC<{src:string;pos?:string;scale?:number;dx?:number;dy?:number;filter?:string}>=({src,pos='center',scale=1,dx=0,dy=0,filter=''})=><Img src={staticFile(src)} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',objectPosition:pos,transform:`translate(${dx}px,${dy}px) scale(${scale})`,filter}}/>;
const TopTag:React.FC<{light?:boolean}>=({light=true})=><div style={{position:'absolute',left:76,right:76,top:111,display:'flex',alignItems:'center',justifyContent:'space-between',color:light?'#FBF8F0':'#1A2228',font:'600 21px Arial',letterSpacing:4.0}}><span>EZ SITES</span><span style={{fontSize:19,letterSpacing:3,color:light?GOLD:BLUE}}>YOUR BUSINESS. ONLINE.</span></div>;
const TextReveal:React.FC<{lines:string[];start:number;size?:number;light?:boolean;family?:string;spacing?:number;lineHeight?:number}>=({lines,start,size=115,light=true,family='Georgia,serif',spacing=-4,lineHeight=1.03})=>{const f=useCurrentFrame();return <div style={{display:'flex',flexDirection:'column',gap:6}}>{lines.map((line,i)=><div key={line} style={{overflow:'hidden',height:size*1.14}}><div style={{fontFamily:family,fontSize:size,fontWeight:500,letterSpacing:spacing,lineHeight,transform:`translateY(${v(f,start+i*10,start+i*10+18,135,0)}px)`,opacity:reveal(f,start+i*10),color:light?BONE:'#0B1115',whiteSpace:'nowrap'}}>{line}</div></div>)}</div>};
const CutMask:React.FC<{f:number;start:number;dur:number;color:string}>=({f,start,dur,color})=> <AbsoluteFill style={{background:color,transform:`translateX(${v(f,start,start+dur,-W,W)}px)`,zIndex:28,pointerEvents:'none'}}/>;

// A restaurant story: real rendered production websites, no fabricated app UI.
const Intro:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{overflow:'hidden',background:INK}}>
  <Shot src="kurotsuki-desktop.png" pos="center top" scale={1.98+v(f,0,120,0,.12)} dy={870-v(f,0,120,0,105)} filter="contrast(1.08) brightness(.62) saturate(.8)"/>
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(0,0,0,.14) 0%,rgba(0,0,0,.10) 42%,rgba(0,0,0,.82) 100%)'}}/>
  <TopTag/>
  <div style={{position:'absolute',left:74,top:1030,right:50}}><div style={{height:3,width:v(f,14,36,0,95),background:GOLD,marginBottom:41}}/><TextReveal lines={['Every business','has a story.']} start={18} size={104}/></div>
  <div style={{position:'absolute',left:80,bottom:142,font:'500 27px Arial',letterSpacing:3,color:'#E0D1B0',opacity:reveal(f,55)}}>LET YOURS BE DISCOVERED.</div>
</AbsoluteFill>};

const Interlude:React.FC=()=>{const f=useCurrentFrame();const t=f-125;return <AbsoluteFill style={{overflow:'hidden',background:'#0B0D0C'}}>
 <Shot src="kurotsuki-desktop.png" pos="center 33%" scale={1.65+v(t,0,70,.12,0)} dx={v(t,0,70,-45,-120)} filter="grayscale(.3) brightness(.46) contrast(1.16)"/>
 <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(3,7,8,.92),rgba(3,7,8,.22)),linear-gradient(0deg,rgba(3,7,8,.6),transparent 55%)'}}/>
 <div style={{position:'absolute',left:74,top:370}}><div style={{font:'600 25px Arial',letterSpacing:6,color:GOLD,marginBottom:32,opacity:reveal(t,0)}}>BUILT FOR THE REAL WORLD</div><TextReveal lines={['Crafted offline.','Found online.']} start={5} size={105}/></div>
 <div style={{position:'absolute',right:80,bottom:150,width:240,height:1,background:GOLD,transform:`scaleX(${reveal(t,35)})`,transformOrigin:'right'}}/>
</AbsoluteFill>};

// Animatable real browser captured page; independent address/chrome, camera, and viewport.
const Browser:React.FC<{f:number;mini?:boolean}>=({f,mini=false})=>{const begin=205;const start=mini?0:begin;const t=f-start;const s=mini?1: v(t,0,47,.72,1);const posX=mini?0:v(t,0,47,230,0);const tilt=mini?0:v(t,0,47,-8,0);const y=mini?0:v(t,0,47,70,0);
 return <div style={{width:1000,height:mini?1400:1410,borderRadius:26,overflow:'hidden',background:'#0B1113',border:'1px solid rgba(255,255,255,.15)',boxShadow:'0 38px 120px rgba(0,0,0,.68)',transform:`translate(${posX}px,${y}px) perspective(2000px) rotateY(${tilt}deg) scale(${s})`,transformOrigin:'50% 50%'}}>
 <div style={{height:76,background:'#F0F0EE',display:'flex',alignItems:'center',padding:'0 25px',gap:18}}><div style={{display:'flex',gap:10}}>{['#FE6760','#FEBE39','#30C553'].map(x=><div key={x} style={{width:14,height:14,borderRadius:20,background:x}} />)}</div><div style={{flex:1,height:46,borderRadius:12,background:'#FFFFFF',display:'flex',alignItems:'center',paddingLeft:30,font:'500 23px Arial',color:'#27383E',letterSpacing:.25}}><span style={{color:'#7F948B',marginRight:13}}>⌁</span>kurotsuki.sites.ezsites.app</div></div>
 <div style={{height:1340,overflow:'hidden',position:'relative',background:'#0C0C0A'}}><Img src={staticFile('kurotsuki-mobile.png')} style={{position:'absolute',width:'100%',height:'auto',top:0,left:0,transform:`translateY(${-v(f,286,450,0,2110)}px)`,willChange:'transform'}}/><div style={{position:'absolute',inset:'0 0 auto 0',height:150,background:'linear-gradient(180deg,rgba(4,6,7,.2),transparent)',pointerEvents:'none'}}/></div>
 </div>};
const Product:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{overflow:'hidden',background:'#0C1115'}}>
 <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 70% 50%,rgba(43,87,99,.33),transparent 60%)'}}/>
 <div style={{position:'absolute',left:68,top:123,color:BONE,font:'700 28px Arial',letterSpacing:4,opacity:reveal(f,213)}}>ONE BUSINESS. A WORLD OF POSSIBILITIES.</div>
 <div style={{position:'absolute',left:45,top:268}}><Browser f={f}/></div>
 <div style={{position:'absolute',left:74,bottom:105,color:'#D1D9D8',font:'500 27px Arial',letterSpacing:2,opacity:reveal(f,263)}}>A WEBSITE MADE FOR YOUR BRAND</div>
 </AbsoluteFill>};
const Domain:React.FC=()=>{const f=useCurrentFrame();const t=f-460;return <AbsoluteFill style={{background:'#ECEDE9',overflow:'hidden'}}>
 <div style={{position:'absolute',left:-230,top:135,width:1250,height:1400,transform:`perspective(1400px) rotateY(${v(t,0,90,10,-2)}deg) rotateZ(-7deg) scale(${v(t,0,100,1,1.06)})`,transformOrigin:'center'}}><Browser f={490} mini/></div>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(10,17,21,.05),rgba(10,17,21,.54))'}}/>
 <div style={{position:'absolute',left:75,right:70,bottom:230,background:'#FAFBFA',padding:'33px 39px',borderRadius:22,boxShadow:'0 32px 90px rgba(0,0,0,.2)',transform:`translateY(${v(t,12,38,340,0)}px)`,opacity:reveal(t,12)}}>
 <div style={{font:'700 20px Arial',color:'#6C797D',letterSpacing:3,marginBottom:21}}>YOUR BUSINESS. YOUR ADDRESS.</div>
 <div style={{font:'500 46px Arial',letterSpacing:-1.5,color:'#172A35',whiteSpace:'nowrap',overflow:'hidden'}}>kurotsuki<span style={{color:BLUE}}>.sites.ezsites.app</span></div></div>
 </AbsoluteFill>};
const Link:React.FC=()=>{const f=useCurrentFrame();const t=f-560;return <AbsoluteFill style={{overflow:'hidden',background:'#050D13'}}>
 <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 75%,rgba(18,155,232,.18),transparent 48%)'}}/>
 <div style={{position:'absolute',top:270,left:75,right:70}}><div style={{font:'700 23px Arial',letterSpacing:5,color:BLUE,opacity:reveal(t,0),marginBottom:46}}>IT STARTS WITH BEING FOUND</div><TextReveal lines={['Your next customer','is looking.']} start={10} size={105}/></div>
 <div style={{position:'absolute',left:70,right:70,top:850,height:500,borderRadius:35,border:'1px solid #244456',background:'#102332',transform:`translateY(${v(t,18,43,270,0)}px) rotate(${v(t,18,43,5,0)}deg)`,opacity:reveal(t,18),overflow:'hidden'}}>
 <div style={{padding:'51px 53px',font:'700 25px Arial',letterSpacing:3,color:'#8CBAD4'}}>INQUIRY RECEIVED</div><div style={{margin:'0 53px',height:1,background:'#314A58'}}/><div style={{padding:'55px 55px',color:BONE,font:'500 45px Georgia',lineHeight:1.3}}>A connection begins with a conversation.</div><div style={{margin:'0 55px',display:'inline-block',padding:'19px 27px',borderRadius:14,background:'#129BE8',font:'600 23px Arial',color:'#fff'}}>CONTACT YOUR BUSINESS</div>
 </div>
 </AbsoluteFill>};
const End:React.FC=()=>{const f=useCurrentFrame();const t=f-663;return <AbsoluteFill style={{overflow:'hidden',background:'#08172E'}}>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 55% 26%,rgba(18,155,232,.27),transparent 65%)'}}/>
 <div style={{position:'absolute',width:1000,height:1000,left:40,top:135,border:'1px solid rgba(150,196,231,.2)',borderRadius:'50%',transform:`scale(${v(t,0,65,.65,1.06)})`,opacity:reveal(t,0)}}/>
 <div style={{position:'absolute',top:550,left:80,right:80,display:'flex',alignItems:'center',flexDirection:'column',gap:40,opacity:reveal(t,6),transform:`translateY(${v(t,0,35,80,0)}px)`}}>
 <div style={{background:'#FFFFFF',borderRadius:31,padding:'23px 43px',width:570,height:205,display:'flex',alignItems:'center',justifyContent:'center'}}><Img src={staticFile('ezsites-logo.png')} style={{width:515,height:164,objectFit:'contain'}}/></div>
 <div style={{font:'500 77px Georgia',letterSpacing:-2.5,color:'#fff',marginTop:24,textAlign:'center'}}>Bring your business<br/>online.</div><div style={{font:'700 25px Arial',letterSpacing:5,color:'#71C9FA',marginTop:35}}>GET STARTED WITH EZSITES</div></div>
 </AbsoluteFill>};
export const Commercial:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:INK}}>
 <Fade opacity={v(f,116,128,1,0)}><Intro/></Fade>
 <Fade opacity={v(f,121,128,0,1)*v(f,197,210,1,0)}><Interlude/></Fade>
 <Fade opacity={v(f,202,214,0,1)*v(f,451,464,1,0)}><Product/></Fade>
 <Fade opacity={v(f,458,467,0,1)*v(f,551,568,1,0)}><Domain/></Fade>
 <Fade opacity={v(f,557,569,0,1)*v(f,654,670,1,0)}><Link/></Fade>
 <Fade opacity={v(f,661,676,0,1)}><End/></Fade>
 <CutMask f={f} start={117} dur={13} color="#0B0D0C"/>
 <CutMask f={f} start={199} dur={13} color="#0C1115"/>
 <CutMask f={f} start={452} dur={15} color="#ECEDE9"/>
 <CutMask f={f} start={550} dur={15} color="#050D13"/>
 <CutMask f={f} start={655} dur={14} color="#08172E"/>
 <Audio src={staticFile('score.wav')} volume={0.48}/>
 {[[16,'v1.mp3'],[136,'v2.mp3'],[230,'v3.mp3'],[471,'v4.mp3'],[572,'v5.mp3'],[676,'v6.mp3']].map(([at,src])=><Sequence key={String(src)} from={Number(at)} durationInFrames={Math.min(750-Number(at),140)}><Audio src={staticFile(String(src))} volume={1}/></Sequence>)}
 </AbsoluteFill>};