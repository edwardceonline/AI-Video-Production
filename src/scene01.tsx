import React from 'react';
import {
  AbsoluteFill, Audio, Sequence, Img, interpolate, spring, staticFile,
  useCurrentFrame, useVideoConfig,
} from 'remotion';

/**
 * Cyber Explained — EP01 EN Scene 01 / 0–10 seconds.
 * Uses the original approved-direction illustration and a three-layer Minh puppet.
 * Required binary assets are listed in ASSETS_REQUIRED.md. Do not claim production quality
 * until those assets exist in public/ and the output has passed the visual review.
 */
const C={navy:'#081A31', blue:'#2563EB', sky:'#9CD8FF', orange:'#FF9B54', ink:'#12243F'};
const FPS=30;
const blend=(a:number,b:number,t:number)=>a+(b-a)*t;
const ease=(v:number)=>{const t=Math.max(0,Math.min(1,v));return t*t*(3-2*t);};
const progress=(frame:number,a:number,b:number)=>ease((frame-a)/(b-a));

const Background:React.FC<{frame:number}>=({frame})=><AbsoluteFill style={{overflow:'hidden',background:'#142E4B'}}>
  <Img src={staticFile('assets/hero.png')} style={{
    width:'100%',height:'100%',position:'absolute',objectFit:'cover',
    filter:'blur(56px) saturate(1.08)',
    transform:'scale(1.37) translateX('+(Math.sin(frame/90)*11)+'px)',
  }}/>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(255,212,163,.70),rgba(246,177,111,.40) 39%,rgba(20,46,76,.18) 75%,rgba(8,25,46,.85))'}}/>
  <div style={{position:'absolute',right:-260,top:-310,width:680,height:1100,borderRadius:1000,background:'rgba(255,250,219,.33)',filter:'blur(120px)',transform:'translateY('+(frame/15)+'px)'}}/>
</AbsoluteFill>;

const Character:React.FC<{frame:number}>=({frame})=>{
  const look=progress(frame,53,90);
  const close=progress(frame,88,124);
  const react=progress(frame,22,45);
  const fade=1-progress(frame,126,167);
  const breathing=Math.sin(frame/30*2.1)*3;
  const blink=(v:number)=>Math.max(0,1-Math.abs(frame-v)/3.4);
  const blinkAmount=Math.max(blink(19),blink(76));
  return <div style={{
    position:'absolute',left:56,top:375,width:965,height:925,opacity:fade,
    transform:'scale('+(1+close*.07)+') translateY('+(breathing-close*20)+'px)',
    filter:'drop-shadow(0 27px 28px rgba(12,26,41,.28))',
  }}>
    <div style={{
      position:'absolute',inset:0,overflow:'hidden',
      maskImage:'radial-gradient(ellipse 56% 49% at 51% 48%,black 63%,transparent 98%)',
      WebkitMaskImage:'radial-gradient(ellipse 56% 49% at 51% 48%,black 63%,transparent 98%)',
    }}>
      <Img src={staticFile('assets/minh_body_inpainted.png')} style={{width:'100%',height:'100%',position:'absolute'}}/>
      <Img src={staticFile('assets/minh_head_rgba.png')} style={{
        width:'100%',height:'100%',position:'absolute',transformOrigin:'55% 34%',
        transform:'translateY('+(-look*4)+'px) rotate('+(Math.sin(frame/30*2.8)*.7-look*4.2)+'deg)',
      }}/>
      <Img src={staticFile('assets/minh_hands_phone_rgba.png')} style={{
        width:'100%',height:'100%',position:'absolute',transformOrigin:'58% 64%',
        transform:'translateY('+(-look*4)+'px) rotate('+(Math.sin(frame/30*2.4)*.65+2.5*look)+'deg)',
      }}/>
      {blinkAmount>.13&&<div style={{position:'absolute',left:427,top:332,width:110,height:5,borderRadius:10,opacity:blinkAmount,background:'#342B2A',transform:'rotate(-7deg)',filter:'blur(1px)'}}/>}
    </div>
    <div style={{position:'absolute',left:606,top:160,opacity:react*(1-close),fontFamily:'Arial',fontWeight:900,fontSize:74,color:'#F26448'}}>!</div>
  </div>;
};

const Heading:React.FC<{frame:number}>=({frame})=><div style={{
  position:'absolute',top:113,left:74,opacity:progress(frame,0,14)*(1-progress(frame,135,163)),
  color:C.navy,fontFamily:'Arial',letterSpacing:1.4,
}}>
  <div style={{fontSize:42,fontWeight:900}}>CYBER <span style={{color:C.blue}}>EXPLAINED</span></div>
  <div style={{fontSize:22,letterSpacing:4,fontWeight:700,marginTop:7}}>THE INVISIBLE THREATS · EP01</div>
  <div style={{marginTop:18,width:154,height:4,borderRadius:10,background:C.orange}}/>
</div>;

const Notification:React.FC<{frame:number}>=({frame})=>{
  const appear=spring({frame:frame-35,fps:30,config:{damping:17,mass:.85,stiffness:140}});
  const alpha=Math.max(0,Math.min(1,appear))*(1-progress(frame,92,114));
  return <div style={{
    position:'absolute',top:1303,left:65,width:940,padding:'30px 38px',boxSizing:'border-box',
    borderRadius:40,background:'rgba(244,249,255,.94)',border:'2px solid white',
    boxShadow:'0 24px 75px rgba(17,43,78,.22)',color:C.ink,fontFamily:'Arial',
    opacity:alpha,transform:'translateY('+((1-appear)*-60)+'px)',
  }}>
    <div style={{display:'flex',alignItems:'center',gap:22}}>
      <div style={{width:78,height:78,borderRadius:25,background:'#EA4A4A',display:'grid',placeItems:'center',color:'white',fontWeight:800,fontSize:38}}>!</div>
      <div><div style={{fontSize:29,fontWeight:900}}>EXAMPLE BANK <span style={{fontSize:20,color:'#7F91A7',fontWeight:400}}>now</span></div>
      <div style={{fontSize:25,marginTop:4}}>Your account will be locked in 10 minutes.</div></div>
    </div>
    <div style={{marginLeft:100,marginTop:6,fontSize:23,color:C.blue}}>Verify your account now ↗</div>
  </div>;
};

const URLText:React.FC<{small?:boolean}>=({small=false})=><div style={{
  fontSize:small?16:23,fontWeight:600,lineHeight:1.25,whiteSpace:'nowrap',letterSpacing:-.6,color:'#1A4C85',
}}>
  <div>https://bank.example.com.verify.</div><div>example.net</div>
</div>;
const Lock:React.FC=()=> <svg width="21" height="26" viewBox="0 0 21 26">
  <path d="M4 12V9a6.5 6.5 0 0 1 13 0v3" fill="none" stroke="#4B719A" strokeWidth="3"/>
  <rect x="2" y="11" width="17" height="13" rx="3" fill="#4B719A"/>
</svg>;
const SmsScreen:React.FC=()=> <div style={{height:'100%',background:'#F9FBFF',color:C.ink,fontFamily:'Arial'}}>
  <div style={{height:82,background:'#EAF2FD',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 34px',fontSize:27,color:'#1C5CAC'}}>
    <span>‹</span><strong style={{fontSize:24,color:C.ink}}>Messages</strong><span>•••</span>
  </div>
  <div style={{padding:'48px 34px 0',textAlign:'center'}}>
    <div style={{width:96,height:96,borderRadius:30,margin:'0 auto 19px',background:'linear-gradient(135deg,#225EC7,#0D387D)',display:'grid',placeItems:'center',fontSize:53,color:'white',fontWeight:900}}>E</div>
    <div style={{fontSize:32,fontWeight:900}}>Example Bank</div><div style={{fontSize:18,color:'#8192A6',marginTop:7}}>Today · 9:41 AM</div>
  </div>
  <div style={{margin:'56px 30px 0',borderRadius:30,background:'#E5EEF9',padding:'28px 27px',fontSize:26,lineHeight:1.55}}>
    <strong>Your account will be locked</strong><br/>in 10 minutes.<br/>Verify now:<br/>
    <div style={{marginTop:14,color:'#135DAE',textDecoration:'underline'}}><URLText/></div>
  </div>
  <div style={{margin:'128px 32px 0',border:'2px solid #E0E9F3',borderRadius:60,height:65,color:'#9EAEC3',fontSize:22,display:'flex',alignItems:'center',paddingLeft:24}}>iMessage</div>
</div>;

const BrowserScreen:React.FC<{frame:number}>=({frame})=>{
  const isLoading=frame>=194&&frame<220;
  return <div style={{height:'100%',background:'#FCFEFF',color:C.ink,fontFamily:'Arial'}}>
    <div style={{height:112,background:'#EAF2FB',display:'flex',alignItems:'center',gap:15,padding:'6px 15px',boxSizing:'border-box'}}>
      <span style={{fontSize:37,color:'#5479A1'}}>‹</span>
      <div style={{background:'white',border:'2px solid #C4D5E8',borderRadius:22,padding:'12px 14px',display:'flex',alignItems:'center',gap:16,flex:1}}><Lock/><URLText small/></div>
    </div>
    {isLoading?<div style={{height:700,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:30,fontSize:28,color:'#7F94AB'}}>
      <div style={{width:60,height:60,border:'7px solid #D4E4F6',borderTopColor:'#2361AD',borderRadius:'50%',transform:'rotate('+(frame*17)+'deg)'}}/>
      Opening website...
    </div>:<>
      <div style={{display:'flex',alignItems:'center',flexDirection:'column',paddingTop:75}}>
        <div style={{width:136,height:136,borderRadius:40,background:'linear-gradient(145deg,#438BE1,#0B3D98)',display:'grid',placeItems:'center',fontSize:71,color:'white',fontWeight:900}}>E</div>
        <h1 style={{fontSize:48,letterSpacing:-1.5,color:'#12438C',margin:'29px 0 2px'}}>Example Bank</h1>
        <div style={{color:'#7E94B0',fontSize:24,marginTop:3}}>Secure. Simple. For Your Future.</div>
      </div>
      <div style={{margin:'75px 31px 0'}}>
        <div style={{fontSize:33,fontWeight:900,marginBottom:34}}>Welcome back</div>
        {['Username or email','Password'].map(label=><div key={label} style={{height:93,border:'2px solid #C6D7E9',background:'white',borderRadius:22,marginBottom:22,color:'#A3B3C8',display:'flex',alignItems:'center',paddingLeft:24,fontSize:25}}>{label}</div>)}
        <div style={{height:95,background:'#1F61D2',color:'white',borderRadius:22,display:'grid',placeItems:'center',fontSize:32,fontWeight:900}}>Sign in</div>
      </div>
      <div style={{fontSize:17,textAlign:'center',color:'#8195AD',marginTop:50,letterSpacing:3}}>DEMO BANK · ILLUSTRATIVE ONLY</div>
    </>}
  </div>;
};

const Phone:React.FC<{frame:number}>=({frame})=>{
  const zoom=progress(frame,104,174),macro=progress(frame,233,296);
  const x=blend(blend(638,159,zoom),-160,macro);
  const y=blend(blend(932,368,zoom),-36,macro);
  const scale=blend(blend(.21,1.29,zoom),1.93,macro);
  const rotate=blend(blend(-15,-5,zoom),0,macro);
  const tap=progress(frame,177,184)*(1-progress(frame,189,200));
  return <div style={{
    position:'absolute',left:x,top:y,width:620,height:1130,
    transform:'scale('+scale+') rotate('+rotate+'deg)',transformOrigin:'top left',
    opacity:progress(frame,105,117),filter:'drop-shadow(28px 42px 35px rgba(4,16,33,.56))',
  }}>
    <div style={{width:'100%',height:'100%',padding:16,boxSizing:'border-box',borderRadius:67,background:'linear-gradient(140deg,#1B2D46,#06152C 64%,#53647A)',border:'4px solid #A2B4C7',overflow:'hidden'}}>
      <div style={{position:'relative',height:'100%',background:'#FBFDFF',borderRadius:50,overflow:'hidden'}}>
        <div style={{height:53,background:'#0D203C',color:'#EAF2FC',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 36px',boxSizing:'border-box',fontFamily:'Arial',fontWeight:800,fontSize:23}}><span>9:41</span><span>●●● ▰</span></div>
        <div style={{position:'relative',height:'calc(100% - 53px)'}}>{frame>=194?<BrowserScreen frame={frame}/>:<SmsScreen/>}</div>
        <div style={{position:'absolute',top:9,left:'calc(50% - 104px)',height:27,width:208,borderRadius:90,background:'#051227'}}/>
        {frame<194&&tap>.001&&<div style={{position:'absolute',left:158,top:570,width:220,height:220,border:'5px solid #45A3EE',boxShadow:'0 0 0 20px rgba(42,160,238,.13)',borderRadius:'50%',opacity:tap*.88,transform:'scale('+blend(.4,1.6,progress(frame,177,201))+')'}}/>}
      </div>
    </div>
  </div>;
};

const Captions:React.FC<{frame:number}>=({frame})=><>
  <div style={{
    position:'absolute',bottom:105,left:78,right:78,textAlign:'center',
    opacity:progress(frame,10,24)*(1-progress(frame,260,290))*(1-.65*progress(frame,148,176)),
    fontFamily:'Arial',color:'white',textShadow:'0 2px 15px rgba(5,20,43,.85)',
  }}>
    <div style={{letterSpacing:4,fontSize:23,fontWeight:800,color:C.sky}}>THE MESSAGE</div>
    <div style={{fontSize:36,fontWeight:800,marginTop:12}}>{frame<130?'A warning that feels urgent.':'One tap opens a convincing website.'}</div>
  </div>
  <div style={{position:'absolute',bottom:165,left:90,right:90,opacity:progress(frame,266,286),display:'flex',justifyContent:'center'}}>
    <div style={{fontFamily:'Arial',borderRadius:24,background:'rgba(9,29,55,.87)',padding:'25px 38px',fontWeight:900,fontSize:42,textAlign:'center',color:'white'}}>HTTPS. <span style={{color:'#73C4FC'}}>Safe, right?</span></div>
  </div>
</>;

export const Scene01:React.FC=()=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  if(fps!==FPS) throw new Error('Scene 01 expects 30fps');
  return <AbsoluteFill style={{background:C.navy,overflow:'hidden'}}>
    <Background frame={frame}/><Character frame={frame}/><Heading frame={frame}/>
    <Notification frame={frame}/><Phone frame={frame}/><Captions frame={frame}/>
    <Audio src={staticFile('audio/original_music_sfx.wav')} volume={0.35}/>
    <Sequence from={20} durationInFrames={160}>
      <Audio src={staticFile('audio/voice_en_scratch.wav')} volume={1}/>
    </Sequence>
  </AbsoluteFill>;
};
