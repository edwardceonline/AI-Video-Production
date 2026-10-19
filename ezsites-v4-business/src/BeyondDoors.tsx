import React from 'react';
import {AbsoluteFill,Sequence,Img,interpolate,Easing,staticFile,useCurrentFrame,spring,useVideoConfig} from 'remotion';
import {Video,Audio} from '@remotion/media';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';

const W=1080,H=1920,FPS=30;
const C={ink:'#081529',night:'#05080d',gold:'#D8B577',cream:'#F9F7F1',blue:'#129BE8',white:'#FFFFFF',mute:'#B8C4D1'};
const serif='"Cormorant Garamond",Georgia,serif',sans='"DM Sans",Arial,sans-serif';
const ease=Easing.bezier(.19,.91,.21,1);
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const I=(f:number,a:number,b:number,x:number,y:number,e=ease)=>interpolate(f,[a,b],[x,y],{...clamp,easing:e});
const hold=(f:number,d:number,enter=12,exit=12)=>I(f,0,enter,0,1)*I(f,d-exit,d,1,0);
const ThinLine:React.FC<{x?:number;y:number;color?:string;f:number;from?:number;len?:number}>=({x=74,y,color=C.gold,f,from=0,len=100})=><div style={{position:'absolute',left:x,top:y,height:3,width:len,background:color,transform:`scaleX(${I(f,from,from+16,0,1)})`,transformOrigin:'left'}}/>;
const Title:React.FC<{text:string;f:number;from:number;size:number;style?:React.CSSProperties;italic?:boolean}>=({text,f,from,size,style,italic=false})=><div style={{overflow:'hidden',height:size*1.22,whiteSpace:'nowrap',...style}}><div style={{fontFamily:serif,fontSize:size,color:'inherit',lineHeight:1.08,letterSpacing:-size*.027,fontWeight:600,fontStyle:italic?'italic':'normal',opacity:I(f,from,from+15,0,1),transform:`translateY(${I(f,from,from+20,110,0)}px)`}}>{text}</div></div>;
const Stock:React.FC<{file:string;start?:number;local:number;darken?:number;scale?:number;blur?:number;shift?:number}>=({file,start=0,local,darken=.5,scale=1,blur=0,shift=0})=><AbsoluteFill style={{overflow:'hidden'}}><Video src={staticFile(file)} muted trimBefore={start} premountFor={FPS} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',filter:`contrast(1.09) saturate(.76) brightness(${darken}) blur(${blur}px)`,transform:`translateX(${shift}px) scale(${scale+I(local,0,125,0,.07)})`}}/></AbsoluteFill>;
const Grain:React.FC=()=><AbsoluteFill style={{pointerEvents:'none',opacity:.09,mixBlendMode:'overlay',background:'repeating-linear-gradient(0deg,transparent 0px,rgba(255,255,255,.25) 1px,transparent 2px,transparent 4px)'}}/>;

// Film opens with hands crafting a real product. The logo and captions are NEVER labels or numbered sections.
const Craft:React.FC=()=>{
 const f=useCurrentFrame();return <AbsoluteFill style={{overflow:'hidden',background:'#090b0a',opacity:hold(f,120,1,7)}}>
  <Stock file="chef-a.mp4" start={18} local={f} darken={.74} scale={1.03}/>
  <AbsoluteFill style={{opacity:I(f,56,67,0,1)*I(f,103,122,1,.55)}}><Stock file="chef-b.mp4" start={42} local={f} darken={.77} scale={1.04}/></AbsoluteFill>
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(2,4,8,.05) 0%,rgba(2,4,8,.13) 48%,rgba(2,4,8,.9) 100%)'}}/>
  <ThinLine f={f} from={16} y={1294} len={105}/>
  <div style={{position:'absolute',left:75,right:65,top:1346,color:C.cream}}>
   <Title text="Made with care." f={f} from={23} size={120}/>
   <div style={{fontFamily:sans,fontSize:31,color:'#E1D9CC',marginTop:25,letterSpacing:.8,opacity:I(f,48,69,0,1)}}>Every business has a story.</div>
  </div>
  <Grain/>
 </AbsoluteFill>;
};

const Anywhere:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{overflow:'hidden',background:'#1D1917',opacity:hold(f,119,7,13)}}>
 <Stock file="customer.mp4" local={f} darken={.77} scale={1.08} shift={-18}/>
 <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(3,9,16,.67),rgba(3,9,16,.18)),linear-gradient(0deg,rgba(3,9,16,.9),transparent 68%)'}}/>
 <div style={{position:'absolute',left:76,right:52,top:1080,color:'#FFFDF9'}}>
  <Title text="Your next customer" f={f} from={15} size={100}/>
  <Title text="could be anywhere." f={f} from={35} size={110} italic/>
 </div>
 <div style={{position:'absolute',left:79,top:1543,fontFamily:sans,color:'#F0E8DA',letterSpacing:2,fontSize:24,opacity:I(f,65,82,0,1)}}>THE WORLD IS ALREADY ONLINE.</div>
 <Grain/>
 </AbsoluteFill>};

const TrueWebsite:React.FC<{f:number;mini?:boolean;scroll?:number}>=({f,mini=false,scroll=0})=><div style={{position:'relative',width:mini?480:1080,height:mini?1020:1920,overflow:'hidden',background:'#07080A',borderRadius:mini?36:0}}>
 <Img src={staticFile('site-mobile.png')} style={{position:'absolute',left:0,top:0,width:'100%',height:'auto',transform:`translateY(${-scroll}px)`,filter:'contrast(1.01) saturate(.98)'}}/>
 </div>;
const Discovery:React.FC=()=>{const f=useCurrentFrame();const camera=I(f,10,72,.75,1.075);const scroll=I(f,76,152,0,1730);return <AbsoluteFill style={{overflow:'hidden',background:'#060708',opacity:hold(f,170,10,13)}}>
  <div style={{position:'absolute',left:I(f,8,72,169,0),top:I(f,8,72,352,-88),width:1080,height:1920,transform:`perspective(1800px) rotateY(${I(f,8,72,-9,0)}deg) scale(${camera})`,transformOrigin:'center 48%',boxShadow:'0 44px 175px rgba(0,0,0,.60)'}}>
   <TrueWebsite f={f} scroll={scroll}/>
  </div>
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(2,5,9,.65),rgba(2,5,9,0) 22%,rgba(2,5,9,0) 67%,rgba(2,5,9,.67))',pointerEvents:'none'}}/>
  <div style={{position:'absolute',top:106,left:82,fontFamily:sans,fontSize:24,color:'#F9F9F7',fontWeight:600,letterSpacing:2.2,opacity:I(f,38,58,0,1)*I(f,124,155,1,0)}}>A PLACE TO FIND YOU.</div>
  <div style={{position:'absolute',bottom:132,right:68,color:'#F9F9F7',font:'600 24px "DM Sans"',letterSpacing:1,opacity:I(f,55,73,0,1)*I(f,130,155,1,0)}}>kurotsuki.sites.ezsites.app&nbsp; ↗</div>
 </AbsoluteFill>};

const Domain:React.FC=()=>{const f=useCurrentFrame();const move=I(f,0,77,160,-180);const logo='yourbusiness.com';const chars=Math.round(I(f,25,75,0,logo.length));return <AbsoluteFill style={{overflow:'hidden',background:'#F5F2EC',opacity:hold(f,138,12,11)}}>
 <div style={{position:'absolute',left:624,top:112,width:550,height:1160,transform:`perspective(1500px) rotateY(${I(f,3,110,-14,-5)}deg) rotateZ(-7deg) scale(1.12)`,boxShadow:'-30px 50px 125px rgba(9,16,22,.25)',borderRadius:27,overflow:'hidden'}}>
  <TrueWebsite f={f} mini scroll={I(f,0,111,120,400)}/>
 </div>
 <div style={{position:'absolute',left:76,top:345,right:90}}>
  <div style={{fontFamily:sans,color:'#7B776E',fontWeight:700,fontSize:26,letterSpacing:4.5,opacity:I(f,15,31,0,1)}}>A NAME THAT'S YOURS.</div>
  <div style={{fontFamily:serif,color:'#172B3C',fontSize:132,fontWeight:600,lineHeight:.93,marginTop:53,letterSpacing:-5,transform:`translateX(${I(f,10,60,-80,0)}px)`,opacity:I(f,10,33,0,1)}}>Be<br/><i>remembered.</i></div>
 </div>
 <div style={{position:'absolute',left:76,bottom:350,width:929,height:2,background:'#C6C8C2'}}/>
 <div style={{position:'absolute',left:76,bottom:379,fontFamily:sans,fontSize:57,letterSpacing:-2.4,color:'#0A1733',fontWeight:600,whiteSpace:'nowrap'}}>
  <span>{logo.slice(0,chars)}</span><span style={{opacity:(f%18)<10?1:0,color:C.blue}}>│</span>
 </div>
 <div style={{position:'absolute',left:77,bottom:270,fontSize:22,fontFamily:sans,letterSpacing:2,color:'#7B7974',fontWeight:700,opacity:I(f,60,80,0,1)}}>CUSTOM DOMAIN · ILLUSTRATIVE EXAMPLE</div>
 </AbsoluteFill>};

// Illustrative customer interaction, intentionally not shown inside the EzSites application.
const Enquiry:React.FC=()=>{const f=useCurrentFrame();const t=I(f,23,84,0,1),slide=I(f,19,70,230,0);const sentence='Hello! I’d love to visit this weekend.';const typed=sentence.slice(0,Math.round(I(f,63,119,0,sentence.length)));return <AbsoluteFill style={{overflow:'hidden',background:'#091B2A',opacity:hold(f,166,10,12)}}>
 <Stock file="customer.mp4" local={f} darken={.66} blur={2} scale={1.12} shift={110}/>
 <AbsoluteFill style={{background:'linear-gradient(120deg,rgba(4,12,21,.80),rgba(4,12,21,.37) 49%,rgba(9,37,54,.77) 100%),radial-gradient(ellipse at 15% 60%,rgba(18,155,232,.16),transparent 65%)'}}/>
 <div style={{position:'absolute',left:75,top:252,right:60,color:C.cream}}>
  <Title text="A way to" f={f} from={9} size={139}/>
  <Title text="reach out." f={f} from={24} size={148} italic/>
 </div>
 <div style={{position:'absolute',left:86,top:857,right:108,height:474,transform:`translateY(${slide}px)`,opacity:t}}>
  <div style={{position:'absolute',inset:0,borderRadius:31,background:'rgba(246,250,252,.94)',boxShadow:'0 38px 120px rgba(1,7,13,.55)'}}/>
  <div style={{position:'absolute',left:48,top:50,fontFamily:sans,fontSize:25,color:'#647283',fontWeight:700,letterSpacing:3}}>A CUSTOMER INQUIRY</div>
  <div style={{position:'absolute',left:48,top:103,width:786,height:1,background:'#D8E0E7'}}/>
  <div style={{position:'absolute',left:49,top:154,right:48,color:'#132D42',fontFamily:serif,fontSize:67,fontWeight:600,lineHeight:1.14}}>{typed}<span style={{color:C.blue,opacity:(f%20)<12?1:0}}>│</span></div>
  <div style={{position:'absolute',left:48,top:390,width:175,height:5,background:C.blue,transform:`scaleX(${I(f,88,122,0,1)})`,transformOrigin:'left'}}/>
 </div>
 <div style={{position:'absolute',bottom:128,left:82,font:'500 26px "DM Sans"',color:'#C5D6E5',letterSpacing:.4,opacity:I(f,85,112,0,1)}}>From interest to a real conversation.</div>
 <Grain/>
 </AbsoluteFill>};

const Reply:React.FC=()=>{const f=useCurrentFrame();const line='hello@yourbusiness.com';return <AbsoluteFill style={{overflow:'hidden',background:'#09182F',opacity:hold(f,127,11,12)}}>
 <div style={{position:'absolute',top:230,left:-100,right:-100,height:980,background:'radial-gradient(ellipse at 60% 40%,rgba(39,100,156,.38),transparent 66%)',opacity:1}}/>
 <div style={{position:'absolute',top:510,left:80,right:80,color:'#EDF6FC'}}>
   <div style={{fontSize:29,fontFamily:sans,letterSpacing:4.5,fontWeight:700,color:'#79B9E7',opacity:I(f,9,28,0,1)}}>AN EMAIL THAT MEANS BUSINESS.</div>
   <div style={{fontFamily:serif,fontSize:114,marginTop:47,lineHeight:1.02,letterSpacing:-3,transform:`translateY(${I(f,12,36,48,0)}px)`,opacity:I(f,12,35,0,1)}}>Start a conversation.<br/><i>Stay connected.</i></div>
   <div style={{fontFamily:sans,fontSize:45,fontWeight:600,marginTop:118,whiteSpace:'nowrap',color:'#F5F7FB',letterSpacing:-1}}>{line.slice(0,Math.round(I(f,46,90,0,line.length)))}</div>
   <div style={{height:2,background:'#36536A',marginTop:15,width:900}}/><div style={{height:3,background:C.blue,marginTop:-3,width:I(f,46,90,0,900)}}/>
   <div style={{fontFamily:sans,color:'#93AABF',fontSize:25,marginTop:28,letterSpacing:1.1,opacity:I(f,68,93,0,1)}}>A PROFESSIONAL ADDRESS. YOUR OWN BRAND.</div>
 </div>
 </AbsoluteFill>};

const Brand:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{overflow:'hidden',background:'#F9FBFD',opacity:I(f,0,15,0,1)}}>
 <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 55% 26%,#E8F7FF,transparent 66%)'}}/>
 <div style={{position:'absolute',left:-230,top:320,width:900,height:900,borderRadius:'50%',border:'1px solid rgba(18,155,232,.15)',transform:`scale(${I(f,0,94,.48,1.16)})`,opacity:I(f,0,35,0,1)}}/>
 <div style={{position:'absolute',left:78,right:78,top:608,textAlign:'center',color:C.ink}}>
  <div style={{fontFamily:sans,fontSize:27,fontWeight:700,letterSpacing:5,color:C.blue,opacity:I(f,12,30,0,1)}}>WEBSITE · DOMAIN · EMAIL</div>
  <div style={{fontFamily:serif,fontSize:108,fontWeight:600,letterSpacing:-3,lineHeight:1,marginTop:87,opacity:I(f,15,39,0,1),transform:`translateY(${I(f,15,39,60,0)}px)`}}>Get your<br/><i>business online.</i></div>
  <div style={{height:1,background:'#D3DEE9',marginTop:85,marginBottom:61}}/>
  <div style={{width:750,height:200,margin:'auto',opacity:I(f,39,63,0,1),transform:`translateY(${I(f,39,63,30,0)}px)`}}>
   <Img src={staticFile('ezsites-logo.png')} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
  </div>
  <div style={{fontFamily:sans,color:'#52677F',fontSize:26,letterSpacing:1.2,marginTop:63,opacity:I(f,51,77,0,1)}}>Your business deserves to be found.</div>
 </div>
 </AbsoluteFill>};

const Voices:React.FC=()=>{const markers=[{at:10,src:'v1.mp3'},{at:117,src:'v2.mp3'},{at:224,src:'v3.mp3'},{at:383,src:'v4.mp3'},{at:512,src:'v5.mp3'},{at:662,src:'v6.mp3'},{at:789,src:'v7.mp3'}];return <>{markers.map((m,i)=><Sequence key={i} from={m.at} durationInFrames={Math.min(180,900-m.at)}><Audio src={staticFile(m.src)} volume={1}/></Sequence>)}</>};
export const BeyondDoors:React.FC=()=>{
 const f=useCurrentFrame();return <AbsoluteFill style={{background:C.night}}>
  <Sequence from={0} durationInFrames={122} premountFor={FPS}><Craft/></Sequence>
  <Sequence from={110} durationInFrames={119} premountFor={FPS}><Anywhere/></Sequence>
  <Sequence from={214} durationInFrames={170} premountFor={FPS}><Discovery/></Sequence>
  <Sequence from={371} durationInFrames={138} premountFor={FPS}><Domain/></Sequence>
  <Sequence from={498} durationInFrames={166} premountFor={FPS}><Enquiry/></Sequence>
  <Sequence from={651} durationInFrames={127} premountFor={FPS}><Reply/></Sequence>
  <Sequence from={766} durationInFrames={134} premountFor={FPS}><Brand/></Sequence>
  <Audio src={staticFile('music.wav')} volume={(fr)=>{const windows=[[10,110],[117,210],[224,308],[383,456],[512,590],[662,759],[789,876]]; let gain=1;for(const [start,end] of windows){const amount=I(fr,start-8,start+9,0,1,Easing.linear)*I(fr,end-9,end+9,1,0,Easing.linear);gain=Math.min(gain,1-.48*amount)}return (fr<766?.36:.30)*gain}}/>
  <Audio src={staticFile('sfx.wav')} volume={.92}/>
  <Voices/>
 </AbsoluteFill>
};