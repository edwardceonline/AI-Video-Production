import React from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig, Img} from 'remotion';
import {Video, Audio} from '@remotion/media';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';

/* All on-screen website pixels originate from actual Playwright captures of
   https://kurotsuki.sites.ezsites.app. Device chrome, type and animation are React layers.
   Footage is licensed stock and does not depict the real owner of Kurotsuki. */
const W=1080,H=1920,FPS=30;
const C={obsidian:'#080B10',ink:'#0A1733',muted:'#B7B9BA',cream:'#F8F5EF',gold:'#D4AB54',blue:'#129BE8'};
const serif='"Cormorant Garamond", Georgia, serif';
const sans='"DM Sans", Arial, sans-serif';
const ease=Easing.bezier(.19,1,.22,1);
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const I=(f:number,a:number,b:number,x:number,y:number,e= ease)=>interpolate(f,[a,b],[x,y],{...clamp,easing:e});
const clamp01=(v:number)=>Math.max(0,Math.min(1,v));
const visible=(f:number,enter=0,exit=99999,total=99999)=>clamp01((f-enter)/16)*clamp01((total-f-exit)/18);

const Grains:React.FC<{opacity?:number}>=({opacity=.10})=><AbsoluteFill style={{pointerEvents:'none',mixBlendMode:'overlay',opacity,backgroundImage:'repeating-linear-gradient(0deg, transparent 0px,rgba(255,255,255,.03) 1px,transparent 2px,transparent 4px)',backgroundSize:'4px 4px'}}/>;
const Chevron:React.FC<{color?:string}>=({color=C.gold})=><span style={{fontSize:27,color,fontWeight:700}}>↗</span>;
const TopMark:React.FC<{dark?:boolean}>=({dark=true})=><div style={{position:'absolute',top:98,left:76,right:76,display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:sans,fontSize:22,letterSpacing:5,fontWeight:700,color:dark?C.cream:C.ink}}><span>EZ<span style={{color:C.blue}}>SITES</span></span><span style={{fontSize:17,letterSpacing:2,color:dark?'#D8D3CA':'#64718A'}}>YOUR BUSINESS. ONLINE.</span></div>;
const Reveal:React.FC<{children:React.ReactNode;local:number;from:number;size?:number;align?:'left'|'center';color?:string;weight?:number;family?:string}>=({children,local,from,size=100,align='left',color=C.cream,weight=600,family=serif})=><div style={{overflow:'hidden',textAlign:align,width:'100%',height:size*1.20}}><div style={{fontFamily:family,fontSize:size,letterSpacing:family===serif?-3.5:-2,fontWeight:weight,lineHeight:1.08,color,opacity:I(local,from,from+21,0,1),transform:`translateY(${I(local,from,from+22,110,0)}px)`}}>{children}</div></div>;

const FilmShot:React.FC<{file:string;offset:number;index:number;shift?:number}>=({file,offset,index,shift=0})=>{
  const f=useCurrentFrame();
  const local=f-index;
  const pan=I(local,0,170,0,40);
  return <AbsoluteFill style={{overflow:'hidden',opacity:I(f,index,index+11,0,1)*I(f,index+87,index+105,1,0)}}>
    <Video src={staticFile(file)} muted trimBefore={offset} premountFor={FPS} objectFit="cover" style={{height:'100%',width:'100%',objectFit:'cover',filter:'contrast(1.18) saturate(.79) brightness(.72)',transform:`translate3d(${pan+shift}px,${I(local,0,120,0,-28)}px,0) scale(${I(local,0,155,1.06,1.17)})`}}/>
  </AbsoluteFill>;
};
const Film:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:C.obsidian}}>
   <FilmShot file="chef-a.mp4" index={0} offset={18}/>
   <Sequence from={84} durationInFrames={99} premountFor={FPS}><FilmShot file="chef-b.mp4" index={0} offset={42} shift={-24}/></Sequence>
   <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(1,3,7,.06) 0%,rgba(1,3,7,.20) 41%,rgba(1,3,7,.77) 77%,#070a10 100%)'}}/>
   <div style={{position:'absolute',top:155,left:76,width:80,height:3,background:C.gold,transform:`scaleX(${I(f,5,43,0,1)})`,transformOrigin:'left center'}}/>
   <div style={{position:'absolute',left:75,right:75,bottom:240}}>
    <Reveal local={f} from={18} size={126}>Every business</Reveal>
    <Reveal local={f} from={40} size={126}><span style={{fontStyle:'italic',fontWeight:500}}>has a story.</span></Reveal>
    <div style={{fontFamily:sans,color:'#D2D0CC',fontSize:29,letterSpacing:1.2,marginTop:25,opacity:I(f,66,85,0,1)}}>Make yours worth discovering.</div>
   </div>
   <Grains opacity={.28}/>
  </AbsoluteFill>;
};

const SiteScreen:React.FC<{type:'desktop'|'mobile';f:number;from?:number;scale?:number}>=({type,f,from=0,scale=1})=>{
 const mobile=type==='mobile';
 // Wide and mobile shots are captured from the *published website*, never painted as fake UI.
 return <div style={{width:mobile?752:1550,height:mobile?1500:1150,position:'relative',overflow:'hidden',borderRadius:mobile?20:18,background:'#0b0b0b',boxShadow:'0 60px 160px rgba(0,0,0,.63)',border:'1px solid rgba(225,194,120,.23)',transform:`scale(${scale})`,transformOrigin:'top left'}}>
  {!mobile&&<div style={{height:71,background:'#11151C',display:'flex',alignItems:'center',padding:'0 29px',gap:17,borderBottom:'1px solid rgba(221,179,95,.2)'}}><div style={{display:'flex',gap:10}}>{['#B57563','#D8B367','#709C78'].map(c=><span key={c} style={{width:14,height:14,borderRadius:'50%',background:c}}/>)}</div><div style={{marginLeft:25,background:'#202329',borderRadius:12,height:42,width:970,display:'flex',alignItems:'center',paddingLeft:26,color:'#DFD6CA',fontFamily:sans,fontSize:20}}>🔒 &nbsp; kurotsuki.sites.ezsites.app</div></div>}
  <Img src={staticFile(mobile?'web-mobile-top.png':'web-desktop-top.png')} style={{width:'100%',height:mobile?'100%':'calc(100% - 71px)',objectFit:'cover',objectPosition:'top center',filter:'contrast(1.015)'}}/>
 </div>;
};
const SiteReveal:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{overflow:'hidden',background:'radial-gradient(ellipse at 60% 40%, #28302B, #090E12 75%)'}}>
  <div style={{position:'absolute',top:-240,left:-300,width:1300,height:1250,background:'radial-gradient(ellipse,#6D4B20 0%,transparent 65%)',opacity:.26,filter:'blur(60px)'}}/>
  <div style={{position:'absolute',top:350,left:20,fontFamily:serif,color:C.cream,fontSize:118,lineHeight:.99,letterSpacing:-4,opacity:I(f,0,28,0,1)}}>A place<br/><i style={{color:C.gold}}>to be found.</i></div>
  <div style={{position:'absolute',left:I(f,0,70,1020,-45),top:I(f,0,70,980,640),transform:`rotateY(${I(f,0,70,-18,-5)}deg) rotateZ(${I(f,0,70,7,0)}deg) scale(.62)`,transformOrigin:'center center',perspective:2000}}><SiteScreen type="desktop" f={f}/></div>
  <div style={{position:'absolute',left:80,right:80,bottom:166,fontFamily:sans,fontSize:29,lineHeight:1.4,color:'#C6C9C8',opacity:I(f,40,66,0,1)}}>One beautiful destination.<br/>Built around your business.</div>
  <Grains opacity={.16}/>
 </AbsoluteFill>;
};

const DesktopExplore:React.FC=()=>{
 const f=useCurrentFrame();
 const dolly=I(f,0,145,.96,1.17);
 const sTop=I(f,40,138,-5,-1140);
 return <AbsoluteFill style={{overflow:'hidden',background:'#090C12'}}>
   <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'radial-gradient(circle at 80% 15%,#3B3221, #080a0e 70%)'}}/>
   <div style={{position:'absolute',top:140,left:-490,transform:`translate3d(${I(f,0,145,30,-10)}px,${sTop}px,0) scale(${dolly})`,transformOrigin:'top center',filter:'drop-shadow(0px 20px 75px #000)'}}>
     <div style={{width:1800,height:2790,overflow:'hidden',background:'#050506',borderRadius:28,border:'2px solid rgba(240,215,160,.14)'}}>
       <Img src={staticFile('web-desktop-long.png')} style={{width:'100%',height:'auto'}}/>
     </div>
   </div>
   <div style={{position:'absolute',left:0,right:0,top:0,height:180,background:'linear-gradient(#070a11 0%,rgba(7,10,17,0) 100%)'}}/>
   <div style={{position:'absolute',left:0,right:0,bottom:0,height:350,background:'linear-gradient(0deg,#080b10 0%,rgba(8,11,16,0) 100%)'}}/>
   <div style={{position:'absolute',top:145,left:90,background:'#10191Ccc',border:'1px solid #C7B0726b',padding:'16px 26px',fontSize:23,fontFamily:sans,color:'#E6DECD',borderRadius:999,opacity:I(f,18,35,0,1)*I(f,110,142,1,0)}}>kurotsuki.sites.ezsites.app <Chevron/></div>
   <div style={{position:'absolute',bottom:176,left:82,right:80,opacity:I(f,80,103,0,1),color:'#FAF6EF',fontFamily:serif,fontSize:99,lineHeight:.9,letterSpacing:-2.2}}>Your story.<br/><i style={{color:'#E8C377'}}>Online.</i></div>
 </AbsoluteFill>;
};

const Phone:React.FC<{frame:number;scroll?:number}>=({frame,scroll=0})=>{
 const rotateY=I(frame,0,105,-21,-3);const rotateX=I(frame,0,105,8,0);
 return <div style={{width:742,height:1492,position:'relative',transform:`perspective(1850px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,transformStyle:'preserve-3d',filter:'drop-shadow(25px 40px 68px rgba(0,0,0,.52))'}}>
   <div style={{position:'absolute',inset:0,background:'linear-gradient(125deg,#A5A7A7,#222B33 13%,#060A0D 64%,#71716F)',border:'7px solid #696A69',borderRadius:93,boxShadow:'inset 0 2px 9px rgba(255,255,255,.33),inset 0 -8px 18px #030506'}}/>
   <div style={{position:'absolute',left:19,top:21,width:704,height:1450,borderRadius:75,overflow:'hidden',background:'#030508'}}>
     <div style={{height:71,background:'#040608',position:'absolute',left:0,right:0,top:0,zIndex:2,display:'flex',alignItems:'center',justifyContent:'center',color:'#9D9E9A',fontFamily:sans,fontSize:25,letterSpacing:1.4}}>kurotsuki.sites.ezsites.app</div>
     <div style={{position:'absolute',top:70,left:0,width:704,height:1380,overflow:'hidden'}}>
       <Img src={staticFile('web-mobile-long.png')} style={{width:704,height:'auto',transform:`translateY(${-scroll}px)`,position:'absolute',left:0,top:0}}/>
     </div>
     <div style={{position:'absolute',top:7,left:'50%',transform:'translateX(-50%)',width:168,height:31,background:'#010204',borderRadius:27,zIndex:3}}/>
   </div>
   <div style={{position:'absolute',height:245,width:5,right:-9,top:260,background:'#686C70',borderRadius:5}}/>
 </div>;
};
const MobileScene:React.FC=()=>{
 const f=useCurrentFrame();
 const phoneScroll=I(f,78,165,0,1020);
 return <AbsoluteFill style={{overflow:'hidden',background:'radial-gradient(circle at 60% 35%,#23303A 0%,#0B1320 52%,#05080F 100%)'}}>
   <div style={{position:'absolute',top:205,left:90,fontFamily:serif,color:C.cream,fontSize:112,lineHeight:.96,letterSpacing:-3,opacity:I(f,0,23,0,1)}}>Made for<br/><i style={{color:'#DCC08A'}}>every screen.</i></div>
   <div style={{position:'absolute',top:I(f,0,75,1180,515),left:I(f,0,75,640,185),transform:`scale(${I(f,0,75,.7,.78)})`,transformOrigin:'top left'}}><Phone frame={f} scroll={phoneScroll}/></div>
   <div style={{position:'absolute',bottom:142,left:84,right:84,fontFamily:sans,fontSize:30,color:'#D1D7E0',opacity:I(f,96,124,0,1)}}>The business you built. Now within reach.</div>
   <Grains opacity={.14}/>
 </AbsoluteFill>;
};

const WebDomain:React.FC=()=>{
 const f=useCurrentFrame();
 const domain='kurotsuki.sites.ezsites.app';
 const n=Math.floor(I(f,17,76,0,domain.length));
 return <AbsoluteFill style={{overflow:'hidden',background:'linear-gradient(135deg,#101D29 0%,#0A101C 45%,#05070D 100%)'}}>
  <div style={{position:'absolute',top:190,left:82,right:60}}><Reveal local={f} from={12} size={112}>Take your business</Reveal><Reveal local={f} from={28} size={112}><i style={{color:'#E4C68A'}}>beyond the door.</i></Reveal></div>
  <div style={{position:'absolute',top:620,left:68,right:68,height:185,borderRadius:30,background:'linear-gradient(140deg,#192533,#0E1926)',border:'1px solid #7582936e',boxShadow:'0 34px 88px #0008',display:'flex',alignItems:'center',padding:'0 52px',gap:25,opacity:I(f,28,53,0,1),transform:`translateY(${I(f,28,54,80,0)}px)`}}>
     <div style={{fontSize:51,color:C.gold}}>◎</div>
     <div style={{minWidth:0,fontFamily:sans,fontSize:39,color:'#EDF2F9',whiteSpace:'nowrap'}}>{domain.slice(0,n)}<span style={{color:C.gold,opacity:f%22<15?1:0}}>|</span></div>
  </div>
  <div style={{position:'absolute',top:925,left:84,fontFamily:sans,fontSize:28,lineHeight:1.7,color:'#ACB9C5',opacity:I(f,90,117,0,1)}}>A beautiful online home.<br/>A name customers can remember.<br/>A professional way to connect.</div>
  <div style={{position:'absolute',width:950,height:950,top:1050,right:-370,border:'1px solid #5E89B832',borderRadius:'50%',boxShadow:'0 0 0 130px #5E89B817, 0 0 0 260px #5E89B80C'}}/>
  <div style={{position:'absolute',bottom:157,left:85,right:85,height:3,background:`linear-gradient(90deg,${C.blue},#F6C47B)`,transform:`scaleX(${I(f,0,115,0,1)})`,transformOrigin:'left'}}/>
 </AbsoluteFill>;
};
const EndCard:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:'#FAFAF8',color:C.ink,overflow:'hidden'}}>
   <div style={{position:'absolute',left:-360,top:-420,width:1140,height:1140,border:'1px solid rgba(18,155,232,.11)',borderRadius:'50%',boxShadow:'0 0 0 120px rgba(18,155,232,.024),0 0 0 255px rgba(18,155,232,.021)'}}/>
   <div style={{position:'absolute',left:140,right:140,top:460,textAlign:'center'}}>
     <div style={{fontFamily:serif,fontSize:98,letterSpacing:-2.7,lineHeight:1.1,opacity:I(f,12,40,0,1),transform:`translateY(${I(f,12,41,55,0)}px)`}}>The next chapter<br/><i style={{color:'#188FD7'}}>starts online.</i></div>
   </div>
   <div style={{position:'absolute',top:905,left:156,right:156,background:'white',borderRadius:30,padding:'48px 35px',opacity:I(f,28,50,0,1),transform:`translateY(${I(f,28,58,55,0)}px)`,boxShadow:'0 20px 110px rgba(22,53,90,.085)'}}>
      <Img src={staticFile('ezsites-logo.png')} style={{width:'100%',height:192,objectFit:'contain'}}/>
   </div>
   <div style={{position:'absolute',bottom:490,left:80,right:80,fontFamily:sans,fontSize:29,textAlign:'center',color:'#65728B',letterSpacing:2,opacity:I(f,54,75,0,1)}}>BRING YOUR BUSINESS ONLINE.</div>
   <div style={{position:'absolute',bottom:180,left:80,right:80,display:'flex',alignItems:'center',justifyContent:'center',opacity:I(f,53,78,0,1)}}><div style={{fontFamily:sans,fontSize:27,color:'#167EC8',fontWeight:700,borderBottom:'2px solid #129BE8',paddingBottom:13,letterSpacing:1.1}}>Get started with EzSites &nbsp; ↗</div></div>
 </AbsoluteFill>;
};

const SoftEnter:React.FC<{children:React.ReactNode;duration?:number}>=({children,duration=18})=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{opacity:I(f,0,duration,0,1)}}>{children}</AbsoluteFill>;
};
export const Commercial:React.FC=()=>{
 const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:C.obsidian,fontFamily:sans}}>
   <Sequence name="Film | real sushi craft" from={0} durationInFrames={183} premountFor={fps}><Film/></Sequence>
   <Sequence name="Published Kurotsuki site" from={158} durationInFrames={190} premountFor={fps}><SoftEnter><SiteReveal/></SoftEnter></Sequence>
   <Sequence name="Editorial walkthrough of live website" from={318} durationInFrames={190} premountFor={fps}><SoftEnter><DesktopExplore/></SoftEnter></Sequence>
   <Sequence name="Actual mobile website in device" from={475} durationInFrames={170} premountFor={fps}><SoftEnter><MobileScene/></SoftEnter></Sequence>
   <Sequence name="Published website address" from={603} durationInFrames={99} premountFor={fps}><SoftEnter><WebDomain/></SoftEnter></Sequence>
   <Sequence name="Authentic EzSites identity" from={678} durationInFrames={102} premountFor={fps}><SoftEnter duration={25}><EndCard/></SoftEnter></Sequence>
   <Audio src={staticFile('score.wav')} volume={0.27} premountFor={fps}/>
   <Sequence from={28} durationInFrames={125} premountFor={fps}><Audio src={staticFile('vo-1.mp3')} volume={0.95}/></Sequence>
   <Sequence from={181} durationInFrames={127} premountFor={fps}><Audio src={staticFile('vo-2.mp3')} volume={0.95}/></Sequence>
   <Sequence from={333} durationInFrames={125} premountFor={fps}><Audio src={staticFile('vo-3.mp3')} volume={0.95}/></Sequence>
   <Sequence from={494} durationInFrames={125} premountFor={fps}><Audio src={staticFile('vo-4.mp3')} volume={0.95}/></Sequence>
   <Sequence from={695} durationInFrames={85} premountFor={fps}><Audio src={staticFile('vo-5.mp3')} volume={0.95}/></Sequence>
 </AbsoluteFill>;
};