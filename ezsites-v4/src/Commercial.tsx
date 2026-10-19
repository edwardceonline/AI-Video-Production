import React from 'react';
import {AbsoluteFill,Img,OffthreadVideo,Audio,Sequence,staticFile,useCurrentFrame,interpolate,Easing} from 'remotion';

const W=1080,H=1920,GOLD='#E9B856',CREAM='#F7F2E7',NAVY='#0A1733',INK='#070A10',BLUE='#129BE8';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=Easing.bezier(0.18,0.82,0.19,1);
const easeIn=Easing.bezier(0.55,0.05,0.9,0.5);
const m=(f:number,a:number,b:number,x:number,y:number,e=ease)=>interpolate(f,[a,b],[x,y],{...clamp,easing:e});
const op=(f:number,a:number,b:number,fi=12,fo=12)=>Math.max(0,Math.min(1,(f-a)/fi,(b-f)/fo));
const makeGradient=(a=0.06,b=0.85)=>`linear-gradient(180deg,rgba(4,7,12,${a}) 0%,rgba(4,7,12,.02) 31%,rgba(3,5,8,.25) 50%,rgba(2,4,8,${b}) 100%)`;

const Film:React.FC<{src:string;start:number;end:number;f:number;scale?:number;pos?:string;dark?:number;panX?:number;panY?:number}>=({src,start,end,f,scale=1.11,pos='center',dark=.0,panX=0,panY=0})=>{
  const t=m(f,start,end-8,0,1);
  return <AbsoluteFill style={{opacity:op(f,start,end,9,10),overflow:'hidden',background:INK}}>
    <Sequence from={start} durationInFrames={end-start} layout="none">
      <OffthreadVideo src={staticFile(src)} muted style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',objectPosition:pos,transform:`translate(${panX*t}px,${panY*t}px) scale(${scale+0.08*t})`,filter:`saturate(.78) contrast(1.08) brightness(${1-dark})`}} />
    </Sequence>
    <AbsoluteFill style={{background:makeGradient(.04,.83)}}/>
  </AbsoluteFill>;
};
const Texture:React.FC<{f:number;src:string;start:number;end:number;top?:number;endTop?:number;scale?:number;opacity?:number}>=({f,src,start,end,top=0,endTop=0,scale=1,opacity=1})=>{
 const t=m(f,start,end,0,1);
 return <Img src={staticFile(src)} style={{position:'absolute',top:top+(endTop-top)*t,left:-(W*(scale-1))/2,width:W*scale,height:'auto',opacity,filter:'contrast(1.06) saturate(.88)',willChange:'transform'}}/>;
};
const DriftTitle:React.FC<{f:number;at:number;lines:string[];x?:number;y:number;size?:number;align?:'left'|'center';color?:string;weight?:number;italicIndexes?:number[]}>=({f,at,lines,x=74,y,size=116,align='left',color=CREAM,weight=500,italicIndexes=[]})=> <div style={{position:'absolute',left:align==='center'?40:x,right:align==='center'?40:38,top:y,textAlign:align,zIndex:16}}>{lines.map((line,i)=><div key={i} style={{overflow:'hidden',height:size*1.18,marginTop:-3}}><div style={{fontFamily:'Georgia,serif',fontSize:size,fontWeight:weight,lineHeight:1.12,letterSpacing:-3.7,fontStyle:italicIndexes.includes(i)?'italic':'normal',color,whiteSpace:'nowrap',opacity:m(f,at+i*9,at+i*9+13,0,1),transform:`translateY(${m(f,at+i*9,at+i*9+22,Math.round(size*.9),0)}px)`}}>{line}</div></div>)}</div>;
const SmallEyebrow:React.FC<{f:number;at:number;children:React.ReactNode;y:number;x?:number;color?:string}>=({f,at,children,y,x=78,color:GOLD})=><div style={{position:'absolute',top:y,left:x,right:60,letterSpacing:4.2,textTransform:'uppercase',color,font:'600 25px Arial,sans-serif',opacity:m(f,at,at+16,0,1),transform:`translateX(${m(f,at,at+17,-18,0)}px)`,zIndex:17}}>{children}</div>;
const Hairline:React.FC<{f:number;at:number;y:number;x?:number;color?:string;wide?:number}>=({f,at,y,x=78,color:GOLD,wide=110})=><div style={{position:'absolute',top:y,left:x,height:3,width:m(f,at,at+22,0,wide),background:color,zIndex:17}}/>;

const Discover:React.FC<{f:number}>=({f})=>{
 const appear=op(f,215,414,10,14);const t=m(f,226,390,0,1);
 return <AbsoluteFill style={{opacity:appear,background:INK,overflow:'hidden'}}>
   <Texture f={f} src="site-top.png" start={225} end={395} top={-95} endTop={-520} scale={1.10}/>
   <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(0,0,0,.03) 0%,rgba(0,0,0,.04) 50%,rgba(0,0,0,.76) 86%,rgba(0,0,0,.88) 100%)'}} />
   <div style={{position:'absolute',left:75,bottom:192,opacity:m(f,240,262,0,1)*(1-m(f,367,389,0,1))}}>
    <div style={{font:'500 26px Arial',letterSpacing:4,color:GOLD,marginBottom:27}}>BE DISCOVERED</div>
    <div style={{font:'500 122px Georgia',letterSpacing:-5,color:CREAM,lineHeight:1.03}}>Your story.<br/>Online.</div>
   </div>
   <div style={{position:'absolute',right:68,top:110,height:2,width:120,background:GOLD,opacity:.55,transform:`scaleX(${.2+.8*t})`,transformOrigin:'right'}}/>
 </AbsoluteFill>;
};
const Identity:React.FC<{f:number}>=({f})=>{
 const alpha=op(f,398,546,10,12);const t=m(f,403,534,0,1);
 return <AbsoluteFill style={{opacity:alpha,overflow:'hidden',background:'#0B0F11'}}>
   <Texture f={f} src="site-top.png" start={398} end={541} top={-275} endTop={-510} scale={1.04} opacity={.68}/>
   <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(6,8,9,.72),rgba(3,6,11,.42)),linear-gradient(180deg,transparent,rgba(1,3,6,.88))'}}/>
   <SmallEyebrow f={f} at={418} y={875}>Your identity</SmallEyebrow>
   <DriftTitle f={f} at={432} lines={['A name', 'of your own.']} y={935} size={116} italicIndexes={[1]}/>
   <div style={{position:'absolute',left:78,right:72,bottom:270,height:3,background:'#584D37',opacity:m(f,446,480,0,.7)}} />
   <div style={{position:'absolute',left:78,bottom:209,color:'#EBD5AE',font:'500 34px Arial,sans-serif',letterSpacing:2,opacity:m(f,451,471,0,1)}}>Custom domains</div>
   <div style={{position:'absolute',right:72,bottom:211,width:90,height:90,border:'2px solid rgba(233,184,86,.5)',borderRadius:'50%',transform:`translateX(${(1-t)*20}px) rotate(${(1-t)*-45}deg)`,color:GOLD,fontSize:46,display:'flex',alignItems:'center',justifyContent:'center'}}>↗</div>
 </AbsoluteFill>;
};
const Contact:React.FC<{f:number}>=({f})=>{
 const alpha=op(f,534,685,13,18),t=m(f,558,644,0,1);
 return <AbsoluteFill style={{opacity:alpha,background:INK,overflow:'hidden'}}>
    <Film src="customer.mp4" start={534} end={685} f={f} pos="center" scale={1.09} dark={.1} panX={-26}/>
    <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(4,7,10,.10),rgba(4,7,10,.2) 38%,rgba(3,5,9,.90) 80%)'}}/>
    <SmallEyebrow f={f} at={555} y={1195}>Not just visitors</SmallEyebrow>
    <DriftTitle f={f} at={570} lines={['Real people.', 'Real interest.']} y={1265} size={104} italicIndexes={[1]}/>
    <div style={{position:'absolute',left:80,bottom:193,opacity:m(f,587,615,0,1),color:'#F9EBD6',font:'500 31px Arial',letterSpacing:.5}}>Contact forms make it easy to reach you.</div>
    <div style={{position:'absolute',left:80,top:210,width:4,height:m(f,568,657,0,188),background:GOLD,opacity:.75}}/>
 </AbsoluteFill>;
};
const Conversation:React.FC<{f:number}>=({f})=>{
 const alpha=op(f,676,814,12,19);
 return <AbsoluteFill style={{opacity:alpha,overflow:'hidden',background:INK}}>
   <Film src="laptop.mp4" start={676} end={814} f={f} pos="center" scale={1.12} dark={.18} panX={-19} />
   <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(1,4,8,.02),rgba(2,4,8,.16) 30%,rgba(2,4,8,.88) 75%)'}} />
   <SmallEyebrow f={f} at={691} y={1129}>Then stay connected</SmallEyebrow>
   <DriftTitle f={f} at={700} y={1204} lines={['The first hello', 'is just the start.']} size={98} italicIndexes={[1]} />
   <div style={{position:'absolute',bottom:194,left:80,color:GOLD,font:'500 31px Arial',letterSpacing:1.0,opacity:m(f,736,760,0,1)}}>Business email. Professional conversations.</div>
 </AbsoluteFill>;
};
const Finale:React.FC<{f:number}>=({f})=>{
 const alpha=op(f,801,900,8,4);
 const p=m(f,809,848,0,1),shine=m(f,807,896,0,1);
 return <AbsoluteFill style={{opacity:alpha,background:NAVY,overflow:'hidden'}}>
   <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 40%,rgba(18,155,232,.24) 0%,rgba(12,40,76,.12) 38%,rgba(4,14,34,0) 70%)'}} />
   <div style={{position:'absolute',top:470,left:0,right:0,display:'flex',justifyContent:'center',opacity:p,transform:`translateY(${m(f,808,846,84,0)}px) scale(${m(f,808,846,.87,1)})`}}>
      <Img src={staticFile('ezsites-logo.png')} style={{width:550,objectFit:'contain'}}/>
   </div>
   <div style={{position:'absolute',top:855,left:50,right:50,textAlign:'center',color:'#F5F8FF',font:'500 106px Georgia,serif',letterSpacing:-4.8,lineHeight:1.12,opacity:m(f,827,857,0,1),transform:`translateY(${m(f,821,853,35,0)}px)`}}>Get your business<br/><span style={{fontStyle:'italic',color:'#CDEEFF'}}>online.</span></div>
   <div style={{position:'absolute',left:360,right:360,top:1261,height:2,background:`rgba(137,205,246,${.55*shine})`}}/>
   <div style={{position:'absolute',left:40,right:40,top:1325,textAlign:'center',color:'#C6DDF2',font:'500 29px Arial',letterSpacing:3,opacity:m(f,849,869,0,1)}}>WEBSITE · DOMAIN · BUSINESS EMAIL</div>
   <div style={{position:'absolute',left:40,right:40,bottom:180,textAlign:'center',color:'#F5FBFF',font:'600 29px Arial',letterSpacing:2,opacity:m(f,864,880,0,1)}}>EzSites</div>
 </AbsoluteFill>;
};

const VO=[{f:19,file:'vo0.mp3'},{f:137,file:'vo1.mp3'},{f:252,file:'vo2.mp3'},{f:420,file:'vo3.mp3'},{f:556,file:'vo4.mp3'},{f:699,file:'vo5.mp3'},{f:812,file:'vo6.mp3'}];
export const BeyondYourDoors:React.FC=()=>{
 const f=useCurrentFrame();
 const duck=VO.reduce((q,v)=>Math.min(q,1-.48*m(f,v.f-8,v.f+12,0,1)*(1-m(f,v.f+88,v.f+109,0,1))),1);
 return <AbsoluteFill style={{background:INK,overflow:'hidden'}}>
  {/* One physical business, then the outside world: the product's true website and real customer interactions. */}
  <Film src="chef-a.mp4" start={0} end={132} f={f} pos="center 52%" scale={1.06} dark={.08} panX={13}/>
  <AbsoluteFill style={{pointerEvents:'none',opacity:op(f,0,135,12,22)}}>
   <SmallEyebrow f={f} at={28} y={1172}>It starts somewhere</SmallEyebrow>
   <DriftTitle f={f} at={34} y={1244} lines={['Made with', 'passion.']} size={125} italicIndexes={[1]}/>
  </AbsoluteFill>
  <Film src="customer.mp4" start={121} end={245} f={f} pos="center 40%" scale={1.12} dark={.13} panX={-8}/>
  <AbsoluteFill style={{pointerEvents:'none',opacity:op(f,127,240,14,16)}}>
   <SmallEyebrow f={f} at={141} y={1168}>Beyond your doors</SmallEyebrow>
   <DriftTitle f={f} at={151} y={1235} lines={['Someone', 'is looking.']} size={123} italicIndexes={[1]}/>
  </AbsoluteFill>
  <Discover f={f}/>
  <Identity f={f}/>
  <Contact f={f}/>
  <Conversation f={f}/>
  <Finale f={f}/>
  <Audio src={staticFile('score.wav')} volume={()=>.66*duck}/>
  {[125,226,400,534,676,803].map((at,i)=><Sequence key={i} from={at} durationInFrames={38} layout="none"><Audio src={staticFile('soft-transition.wav')} volume={i===5?.22:.27}/></Sequence>)}
  {VO.map(v=><Sequence key={v.file} from={v.f} durationInFrames={Math.max(1,900-v.f)} layout="none"><Audio src={staticFile(v.file)} volume={1}/></Sequence>)}
 </AbsoluteFill>;
};