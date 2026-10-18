import React from 'react';
import {AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Audio} from '@remotion/media';

const C={ink:'#151917',ivory:'#F3EDE2',paper:'#E8DFD0',accent:'#BC8860',blue:'#129BE8'};
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=Easing.bezier(.19,1,.22,1);
const prog=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:ease});
const lerp=(f:number,a:number,b:number,from:number,to:number)=>interpolate(f,[a,b],[from,to],{...clamp,easing:ease});
const Photo:React.FC<{src:string;scale?:number;pos?:string;style?:React.CSSProperties}>=({src,scale=1,pos='center',style})=><img src={staticFile(src)} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',objectPosition:pos,transform:`scale(${scale})`,...style}}/>;

const Grain:React.FC=()=> <div style={{position:'absolute',inset:0,opacity:.105,pointerEvents:'none',backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 180 180\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' opacity=\'.3\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',backgroundSize:'190px 190px',mixBlendMode:'soft-light'}}/>;

const FilmHeader:React.FC<{dark?:boolean}>=({dark=false})=><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontFamily:'Arial,sans-serif',fontSize:21,letterSpacing:5,fontWeight:650,color:dark?C.ink:'#FFF',textTransform:'uppercase'}}><span>EST. <b>2026</b></span><span>BUSINESS / ONLINE</span></div>;

const CafeShot:React.FC<{f:number}>=({f})=>{
 const exit=prog(f,63,82), inFade=prog(f,0,15); const push=lerp(f,0,78,1.02,1.17);
 return <AbsoluteFill style={{overflow:'hidden',opacity:1-exit,transform:`scale(${lerp(f,65,80,1,1.055)})`}}>
    <Photo src="cafe-main.jpg" scale={push} pos="center 46%" style={{filter:'brightness(.81) saturate(.68) contrast(1.08)'}}/>
    <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(6,9,8,.50) 0%,transparent 34%,rgba(8,14,12,.1) 44%,rgba(9,12,10,.88) 100%)'}}/>
    <div style={{position:'absolute',top:114,left:74,right:74,opacity:inFade}}><FilmHeader/></div>
    <div style={{position:'absolute',left:74,right:54,bottom:235,opacity:prog(f,8,27),transform:`translateY(${lerp(f,7,30,76,0)}px)`}}>
      <div style={{fontFamily:'Arial',fontSize:24,letterSpacing:7,color:'#F7E8CE',fontWeight:700,marginBottom:38}}>THE PEOPLE BEHIND EVERY BUSINESS</div>
      <div style={{fontFamily:'Georgia,serif',fontSize:131,lineHeight:1.04,letterSpacing:-5,color:'#F7F2E7',fontWeight:400}}>Built with<br/><i>passion.</i></div>
      <div style={{width:122,height:3,background:'#CDA781',marginTop:46}}/>
      <div style={{fontFamily:'Arial',fontSize:25,letterSpacing:1.1,color:'#FFF9EB',marginTop:25,opacity:.88}}>IT DESERVES TO BE SEEN.</div>
    </div>
    <div style={{position:'absolute',left:74,bottom:98,display:'flex',gap:18,alignItems:'center',fontSize:20,fontFamily:'Arial',letterSpacing:2,color:'#FFF',opacity:inFade}}><div style={{width:53,height:53,border:'1px solid #fff9',borderRadius:27,display:'grid',placeItems:'center',fontSize:27}}>↗</div><span>01 / THE STORY</span></div>
  </AbsoluteFill>
};

const FauxSite:React.FC<{f:number}>=({f})=>{
 const p=prog(f,71,102); const lift=lerp(f,70,104,270,0);
 return <div style={{width:948,height:1308,borderRadius:19,background:C.ivory,overflow:'hidden',boxShadow:'0 50px 110px rgba(0,0,0,.33),border:'1px solid rgba(255,255,255,.6)',position:'relative',transform:`translateY(${lift}px)`,opacity:p}}>
  <div style={{height:73,background:'#FBF8F2',display:'flex',alignItems:'center',padding:'0 28px',borderBottom:'1px solid #d1c7b8',gap:17}}><div style={{display:'flex',gap:8}}>{['#CC8068','#EBC383','#A3BEA5'].map((v,i)=><div key={i} style={{width:12,height:12,borderRadius:20,background:v}}/>)}</div><div style={{margin:'auto',width:450,padding:'12px 26px',borderRadius:10,background:'#F1EBDF',color:'#73695F',fontSize:19,fontFamily:'Arial',textAlign:'center',letterSpacing:.3}}>sundaycoffee.example</div><div style={{width:48,textAlign:'right',fontSize:24,color:'#75695D'}}>↗</div></div>
  <div style={{position:'relative',height:1235,background:'#E4DAC8'}}>
    <div style={{height:106,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 50px',background:C.ivory,color:C.ink}}><span style={{fontFamily:'Georgia,serif',fontSize:41,letterSpacing:-2}}>sunday<span style={{fontStyle:'italic',fontWeight:400}}>.</span></span><span style={{fontFamily:'Arial',fontSize:17,letterSpacing:3,fontWeight:700}}>MENU&nbsp;&nbsp;&nbsp; ABOUT &nbsp;&nbsp;&nbsp; VISIT ↗</span></div>
    <div style={{position:'relative',height:815,overflow:'hidden'}}>
      <Photo src="cafe-detail.jpg" scale={lerp(f,76,175,1.03,1.15)} pos="center 45%" style={{filter:'brightness(.72) saturate(.69) contrast(1.04)'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#0001 15%,#0009 100%)'}}/>
      <div style={{position:'absolute',top:51,left:51,background:C.ivory,color:C.ink,padding:'15px 23px',fontSize:16,letterSpacing:3,fontWeight:700,fontFamily:'Arial'}}>INDEPENDENT COFFEE HOUSE</div>
      <div style={{position:'absolute',bottom:60,left:50,color:'#fff',fontFamily:'Georgia,serif',fontSize:104,lineHeight:1.03,letterSpacing:-4}}>More than<br/><i>good coffee.</i></div>
    </div>
    <div style={{height:310,display:'flex',padding:'45px 50px',gap:28,alignItems:'flex-start',background:'#F3EDE2',color:C.ink}}><div style={{flex:1,fontSize:20,fontFamily:'Arial',letterSpacing:1.1,lineHeight:1.5}}>GOOD COFFEE.<br/>REAL CONVERSATIONS.<br/>A PLACE TO BELONG.</div><div style={{flex:1,fontFamily:'Georgia,serif',fontSize:38,lineHeight:1.1}}>Every great day<br/>starts somewhere.</div></div>
  </div>
 </div>
};

const WebsiteShot:React.FC<{f:number}>=({f})=>{
 const enter=prog(f,64,87);const blur=lerp(f,63,90,12,0); const exit=prog(f,177,198);
 const cam=lerp(f,74,180,.81,1.08);const yaw=lerp(f,73,110,-12,-2);const tilt=lerp(f,73,115,7,0);
 return <AbsoluteFill style={{opacity:enter*(1-exit),background:'#201E1A',overflow:'hidden'}}>
  <Photo src="cafe-main.jpg" scale={1.22} pos="center" style={{filter:'blur(26px) brightness(.34) saturate(.65)'}}/>
  <div style={{position:'absolute',top:91,left:74,right:74,opacity:prog(f,93,113)}}><FilmHeader/></div>
  <div style={{position:'absolute',top:258,left:0,right:0,bottom:0,display:'flex',justifyContent:'center',alignItems:'flex-start',perspective:1700}}>
    <div style={{transform:`scale(${cam}) rotateY(${yaw}deg) rotateX(${tilt}deg) translateX(${lerp(f,75,151,96,0)}px)`,transformStyle:'preserve-3d',filter:`drop-shadow(0px 55px ${Math.max(16,blur*8)}px #0008)`}}>
      <FauxSite f={f}/>
    </div>
  </div>
  <div style={{position:'absolute',top:157,left:75,right:60,display:'flex',justifyContent:'space-between',alignItems:'center',opacity:prog(f,107,127)}}><div style={{fontFamily:'Arial',fontSize:22,letterSpacing:4,color:'#FCF4E8'}}>02 / ONLINE PRESENCE</div><div style={{width:78,height:2,background:'#EFC7A4'}}/></div>
  <div style={{position:'absolute',bottom:104,left:74,right:60,display:'flex',alignItems:'center',justifyContent:'space-between',opacity:prog(f,126,145)}}><div style={{fontFamily:'Georgia,serif',fontSize:62,lineHeight:1.03,color:'#FCF4E8'}}>Your business.<br/><i>Beyond your door.</i></div><span style={{padding:'22px 26px',background:'#FCF4E8',fontFamily:'Arial',fontSize:18,letterSpacing:2,fontWeight:700,color:C.ink}}>BE FOUND ONLINE ↗</span></div>
 </AbsoluteFill>
};

const EndShot:React.FC<{f:number}>=({f})=>{
 const enter=prog(f,180,202),title=prog(f,202,220);const drop=lerp(f,182,204,130,0);
 return <AbsoluteFill style={{opacity:enter,background:C.ivory,color:C.ink,overflow:'hidden'}}>
   <div style={{position:'absolute',width:880,height:880,right:-460,top:-200,borderRadius:1000,background:'#D9EAF0',filter:'blur(60px)',opacity:.5}}/>
   <div style={{position:'absolute',top:116,left:75,right:75}}><FilmHeader dark/></div>
   <div style={{position:'absolute',left:76,right:76,top:478,transform:`translateY(${drop}px)`}}>
      <div style={{fontFamily:'Arial',color:'#7F8277',fontSize:25,letterSpacing:5,marginBottom:28,fontWeight:700}}>BUILT FOR REAL BUSINESS</div>
      <h1 style={{fontSize:122,fontFamily:'Georgia,serif',lineHeight:.99,letterSpacing:-7,margin:'0 0 66px',fontWeight:400}}>Bring your<br/><i>business</i><br/>online<span style={{color:C.blue}}>.</span></h1>
      <div style={{height:2,background:'#C5C4B5',width:'100%',transform:`scaleX(${title})`,transformOrigin:'left'}}/>
      <div style={{fontFamily:'Arial',fontSize:27,lineHeight:1.55,marginTop:36,opacity:title,color:'#555B57'}}>Your work deserves a world beyond your door.</div>
   </div>
   <div style={{position:'absolute',left:75,right:75,bottom:162,display:'flex',justifyContent:'space-between',alignItems:'center',opacity:title}}>
      <div style={{width:380,height:170,display:'flex',alignItems:'center',justifyContent:'flex-start'}}><img src={staticFile('ezsites-logo.png')} style={{width:'100%',height:160,objectFit:'contain'}}/></div>
      <div style={{background:C.ink,color:'#FDF7EE',fontFamily:'Arial',fontSize:20,padding:'27px 25px',fontWeight:700,letterSpacing:2,whiteSpace:'nowrap'}}>GET STARTED ↗</div>
   </div>
   <div style={{position:'absolute',bottom:69,left:75,right:75,height:2,background:'#D5D1C5'}}/>
  </AbsoluteFill>
};

export const Benchmark:React.FC=()=>{
 const f=useCurrentFrame(); const flash=interpolate(f,[65,68,71,187,190,194],[0,.28,0,0,.22,0],clamp);
 return <AbsoluteFill style={{background:C.ink}}>
     <CafeShot f={f}/><WebsiteShot f={f}/><EndShot f={f}/>
     <AbsoluteFill style={{background:'#fff',opacity:flash,pointerEvents:'none'}}/>
     <Grain/>
     <Audio src={staticFile('score.wav')} volume={0.8}/>
   </AbsoluteFill>;
};