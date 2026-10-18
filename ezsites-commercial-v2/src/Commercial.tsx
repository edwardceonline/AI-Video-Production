import React from 'react';
import {AbsoluteFill, Sequence, Img, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio, Video} from '@remotion/media';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/500-italic.css';

/**
 * Editorial 28-second EzSites concept commercial, V2.
 * Key art = licensed live-action and stills. Website and email are fictional
 * representative interfaces, NOT EzSites screenshots or customer testimonials.
 * No unlaunched EzSites capabilities depicted. All motion is frame-driven.
 */
const C = {cream:'#F8F6F1',paper:'#FFFDF9',ink:'#17261F',forest:'#243A2D',blue:'#129BE8',navy:'#0A1733',warm:'#D8BA9D'};
const Sans='DM Sans, sans-serif';
const Serif='Cormorant Garamond, Georgia, serif';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const smooth=Easing.bezier(.40,0,.16,1);
const eased=Easing.bezier(.17,.85,.28,1);
const I=(f:number,aa:number,bb:number,a:number,b:number,e=eased)=>interpolate(f,[aa,bb],[a,b],{...clamp,easing:e});
const opacity=(f:number,start:number,end:number,fade=18)=>Math.min(I(f,start,start+fade,0,1),I(f,end-fade,end,1,0));
const Photo:React.FC<{src:string;style?:React.CSSProperties;}>=({src,style})=><Img src={staticFile(src)} style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',...style}}/>;
const MaskText:React.FC<{children:React.ReactNode;f:number;at:number;duration?:number;offset?:number;style?:React.CSSProperties}>=({children,f,at,duration=22,offset=90,style})=>
  <div style={{overflow:'hidden',...style}}><div style={{opacity:I(f,at,at+duration,0,1),transform:`translateY(${I(f,at,at+duration,offset,0)}px)`}}>{children}</div></div>;

const Opening:React.FC<{f:number}>=({f})=>{
 const {fps}=useVideoConfig();
 const light=I(f,0,140,.86,1);
 return <AbsoluteFill style={{overflow:'hidden',opacity:I(f,154,185,1,0),background:'#485446'}}>
   <Sequence from={0} durationInFrames={92} premountFor={fps}>
     <Video src={staticFile('florist.mp4')} premountFor={fps} muted objectFit="cover" style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:`brightness(${light}) saturate(.78) contrast(1.08)`,transform:`scale(${I(f,0,92,1.04,1.09)}) translateX(${I(f,0,92,0,-14)}px)`}}/>
   </Sequence>
   <Sequence from={92} durationInFrames={93} premountFor={fps}>
     <Video src={staticFile('florist.mp4')} premountFor={fps} trimBefore={94} muted objectFit="cover" style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.94) saturate(.76) contrast(1.06)',transform:`scale(${I(f,92,184,1.28,1.42)}) translateY(${I(f,92,184,-54,-92)}px)`}}/>
   </Sequence>
   <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(12,16,11,.08) 0%,rgba(18,27,17,.02) 45%,rgba(12,20,16,.72) 89%,rgba(10,18,16,.78))'}}/>
   <div style={{position:'absolute',left:78,right:50,bottom:360,color:'#FFFDF8'}}>
     <MaskText f={f} at={32}><div style={{fontFamily:Serif,fontSize:136,lineHeight:.91,letterSpacing:-3}}>You built</div></MaskText>
     <MaskText f={f} at={54}><div style={{fontFamily:Serif,fontStyle:'italic',fontWeight:500,fontSize:146,lineHeight:1.0,letterSpacing:-4}}>the business.</div></MaskText>
   </div>
 </AbsoluteFill>;
};

const FlowerWebsite:React.FC<{f:number}>=({f})=>{
 // This is a single persistent website coordinate space for all product shots.
 // The virtual camera scroll is one continuous, eased timeline, not six cards.
 const scroll=I(f,275,347,0,390,smooth)+I(f,465,556,0,1800,smooth);
 const browser=I(f,360,392,0,1,smooth);
 const brExit=I(f,455,480,1,0,smooth);
 const chrome=Math.min(browser,brExit);
 const chromeH=chrome*127;
 const domain='petalandpaper.ch';
 const n=Math.round(I(f,388,434,0,domain.length));
 const heroY=I(f,180,345,0,-66,smooth);
 const goEmail=I(f,632,677,0,1,smooth);
 return <AbsoluteFill style={{background:C.cream,overflow:'hidden',opacity:I(f,145,180,0,1)}}>
   {/* Page and browser share the same world. Nothing is a hovering feature card. */}
   <div style={{position:'absolute',top:chromeH,left:0,right:0,bottom:0,overflow:'hidden',background:C.paper}}>
     <div style={{height:160,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 71px',background:C.paper,borderBottom:'1px solid #E8E5DC',position:'relative',zIndex:3}}>
       <div style={{fontFamily:Serif,fontWeight:600,fontSize:55,letterSpacing:-1.6,color:C.forest}}>Petal & Paper</div>
       <div style={{fontFamily:Sans,fontSize:21,color:C.ink,fontWeight:600,letterSpacing:.3}}>OUR STORY　 MENU</div>
     </div>
     <div style={{position:'absolute',left:0,right:0,top:160,bottom:0,overflow:'hidden'}}>
       <div style={{transform:`translateY(${-scroll}px)`,position:'relative',height:3450,willChange:'transform'}}>
         {/* HERO — product photo is independent from real JSX text */}
         <div style={{height:1070,position:'relative',overflow:'hidden'}}>
           <Photo src="florals-main.jpg" style={{objectPosition:'center 47%',filter:'saturate(.85) contrast(.98)',transform:`scale(1.08) translateY(${heroY}px)`}}/>
           <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(4,20,11,.03) 20%,rgba(8,28,20,.66) 100%)'}}/>
           <div style={{position:'absolute',left:74,bottom:100,right:69,color:'#FFFDF6'}}>
             <MaskText f={f} at={184} duration={35}>
               <div style={{fontFamily:Serif,fontSize:154,fontWeight:500,lineHeight:.84,letterSpacing:-5}}>Flowers for</div>
             </MaskText>
             <MaskText f={f} at={204} duration={34}>
               <div style={{fontFamily:Serif,fontSize:141,fontWeight:500,fontStyle:'italic',lineHeight:.96,letterSpacing:-4}}>every moment.</div>
             </MaskText>
           </div>
         </div>
         {/* CONTENT: editorial type, full-bleed page not an inset UI card */}
         <div style={{height:680,padding:'88px 75px 70px',background:C.paper}}>
           <div style={{fontFamily:Serif,fontSize:109,lineHeight:.98,color:C.forest,letterSpacing:-3}}>Thoughtfully made.<br/><em>Personally yours.</em></div>
           <div style={{fontFamily:Sans,fontWeight:400,fontSize:35,color:'#5A6C5E',marginTop:39,lineHeight:1.55}}>Seasonal arrangements for the everyday and the unforgettable.</div>
           <div style={{display:'flex',alignItems:'center',fontFamily:Sans,fontSize:28,fontWeight:700,letterSpacing:1.0,color:C.forest,marginTop:47,gap:24}}>GET IN TOUCH <div style={{height:2,width:170,background:C.forest}}/><span style={{fontSize:38}}>↗</span></div>
         </div>
         {/* CONTACT — same web page, naturally revealed through scrolling. */}
         <div style={{height:1640,background:'#EFE9E0',padding:'75px 76px',position:'relative'}}>
           <div style={{height:470,overflow:'hidden',position:'relative',marginBottom:62}}>
             <Photo src="florals-detail.jpg" style={{objectPosition:'center 47%',filter:'saturate(.78) contrast(.94)'}}/>
           </div>
           <div style={{fontFamily:Serif,fontSize:122,lineHeight:.86,color:C.forest,letterSpacing:-3}}>Let's make<br/><em>something lovely.</em></div>
           <div style={{fontFamily:Sans,fontSize:33,color:'#506155',lineHeight:1.38,marginTop:25}}>We'd love to hear from you.</div>
           <div style={{marginTop:52}}>
             <div style={{display:'flex',gap:33,marginBottom:40}}>
               <div style={{flex:1}}><div style={label}>YOUR NAME</div><div style={value}>Alex Morgan</div></div>
               <div style={{flex:1}}><div style={label}>EMAIL</div><div style={value}>alex@email.com</div></div>
             </div>
             <div style={{...label,marginBottom:12}}>YOUR MESSAGE</div>
             <div style={{fontFamily:Sans,fontSize:32,color:C.forest,padding:'14px 0 28px',borderBottom:'1px solid #C1C4BA',lineHeight:1.35}}>Hi! Could I order flowers for Saturday?</div>
             <div style={{background:C.forest,height:107,marginTop:65,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 42px',color:'white',fontFamily:Sans,fontWeight:600,fontSize:34,position:'relative'}}>
               SEND ENQUIRY <span style={{fontSize:50}}>↗</span>
               <div style={{position:'absolute',inset:0,background:'#425D48',opacity:I(f,602,616,0,.3)}}/>
             </div>
             <div style={{marginTop:38,fontSize:30,fontFamily:Sans,fontWeight:600,color:'#386E4C',opacity:I(f,608,629,0,1)}}>✓　Thanks! Your message has been sent.</div>
           </div>
         </div>
       </div>
     </div>
   </div>
   {/* Top chrome enters only for the domain shot; website itself remains underneath. */}
   <div style={{position:'absolute',left:0,right:0,top:0,height:127,background:'#EAEDE7',borderBottom:'1px solid #D0D9D1',transform:`translateY(${-127*(1-chrome)}px)`,display:'flex',alignItems:'center',padding:'0 42px',gap:21,zIndex:10}}>
     <div style={{fontFamily:Sans,fontSize:36,color:'#65756B'}}>‹</div>
     <div style={{flex:1,height:76,display:'flex',alignItems:'center',padding:'0 28px',borderRadius:18,background:'white',border:'1px solid #CFD8CF',gap:15}}>
       <span style={{fontFamily:Sans,fontSize:28,color:'#3C845E'}}>⌁</span>
       <span style={{fontFamily:Sans,fontSize:30,fontWeight:700,color:C.ink}}>{domain.slice(0,n)}</span>
       <span style={{height:36,width:2,background:C.blue,opacity:f<433&&f%20<10?1:0}} />
     </div>
     <div style={{fontFamily:Sans,fontSize:29,color:'#6E7E6E'}}>⋯</div>
   </div>
   {/* Domain accent: typography anchored to real browser URL, no oversized floating badge. */}
   <div style={{position:'absolute',left:70,top:156,right:68,opacity:opacity(f,392,469),pointerEvents:'none'}}>
     <div style={{fontFamily:Serif,fontSize:100,lineHeight:1.1,color:C.paper,textShadow:'0 4px 24px rgba(20,32,20,.45)'}}>Your name.<br/><em>Your domain.</em></div>
   </div>
   {/* Business email emerges as a real workspace, tightly related to the earlier enquiry. */}
   <div style={{position:'absolute',inset:0,zIndex:12,background:C.paper,transform:`translateX(${(1-goEmail)*1100}px)`,boxShadow:'-35px 0 110px rgba(15,37,22,.12)',overflow:'hidden'}}>
     <div style={{height:135,background:C.cream,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 68px',borderBottom:'1px solid #E3E1D9'}}>
       <div style={{fontFamily:Sans,fontSize:31,fontWeight:700,color:C.forest}}>hello@petalandpaper.ch</div>
       <div style={{width:44,height:44,borderRadius:'50%',background:C.forest,color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:Sans,fontSize:24}}>P</div>
     </div>
     <div style={{padding:'100px 75px 0'}}>
       <div style={{display:'flex',alignItems:'center',gap:23,marginBottom:68}}>
         <div style={{width:73,height:73,borderRadius:99,background:'#D8E6D8',color:C.forest,fontFamily:Serif,fontSize:44,display:'flex',alignItems:'center',justifyContent:'center'}}>A</div>
         <div style={{fontFamily:Sans,color:C.forest,fontSize:33,fontWeight:700}}>Alex Morgan<div style={{fontWeight:400,fontSize:25,color:'#76867C'}}>To: hello@petalandpaper.ch</div></div>
       </div>
       <div style={{height:2,width:'100%',background:'#E7E6E0'}}/>
       <div style={{fontFamily:Serif,color:C.forest,fontSize:118,lineHeight:.97,marginTop:88}}>A lovely<br/><em>new enquiry.</em></div>
       <div style={{fontFamily:Sans,fontSize:36,color:'#546659',lineHeight:1.52,marginTop:61}}>Hi there! Your flowers are beautiful. Could I arrange a bouquet for Saturday?</div>
       <div style={{height:2,width:'100%',background:'#E7E6E0',marginTop:70}}/>
       <div style={{display:'flex',alignItems:'center',gap:23,color:C.forest,marginTop:55,fontFamily:Sans,fontSize:31,fontWeight:600}}>
         <div style={{width:63,height:63,borderRadius:100,background:'#E7F1E9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:41}}>↩</div>
         Reply to Alex
       </div>
     </div>
     <div style={{position:'absolute',bottom:95,left:77,right:77,color:C.forest,fontFamily:Serif,fontSize:80,lineHeight:1.04,opacity:I(f,680,702,0,1)}}>Keep the conversation<br/><em>going.</em></div>
   </div>
 </AbsoluteFill>;
};
const label:React.CSSProperties={fontFamily:Sans,fontWeight:700,fontSize:22,letterSpacing:1.4,color:'#5F6D62'};
const value:React.CSSProperties={fontFamily:Sans,fontSize:31,color:C.forest,padding:'17px 0 23px',borderBottom:'1px solid #C1C4BA'};

const BrandEnd:React.FC<{f:number}>=({f})=>{
 const t=I(f,716,760,0,1,smooth);
 return <AbsoluteFill style={{background:'#FFFFFF',opacity:t}}>
   <div style={{position:'absolute',top:0,left:0,right:0,height:830,overflow:'hidden'}}>
     <Photo src="florals-main.jpg" style={{objectPosition:'center 53%',filter:'saturate(.85) contrast(.98)',transform:`scale(${I(f,710,838,1.19,1.06,smooth)})`}}/>
     <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(255,255,255,0) 35%,rgba(255,255,255,.72) 100%)'}}/>
   </div>
   <div style={{position:'absolute',top:855,left:83,right:75}}>
      <MaskText f={f} at={744} duration={28}><div style={{fontFamily:Serif,color:C.navy,fontSize:147,lineHeight:.90,letterSpacing:-3}}>Your business.</div></MaskText>
      <MaskText f={f} at={758} duration={28}><div style={{fontFamily:Serif,fontStyle:'italic',color:C.navy,fontSize:150,lineHeight:1.04,letterSpacing:-3}}>Online.</div></MaskText>
   </div>
   <div style={{position:'absolute',top:1270,left:64,right:64,display:'flex',alignItems:'center',justifyContent:'center',opacity:I(f,772,798,0,1)}}>
      <Img src={staticFile('ezsites-logo.png')} style={{height:195,width:540,objectFit:'contain'}}/>
   </div>
   <div style={{position:'absolute',bottom:172,left:85,right:85,opacity:I(f,793,816,0,1),display:'flex',justifyContent:'space-between',alignItems:'center'}}>
     <div style={{fontFamily:Sans,fontWeight:700,fontSize:32,color:C.navy,letterSpacing:.2}}>Bring your business online.</div>
     <div style={{color:C.blue,fontSize:48,fontWeight:600}}>↗</div>
   </div>
   <div style={{position:'absolute',bottom:145,left:85,right:85,height:2,background:'#E9ECED'}}/>
 </AbsoluteFill>;
};
const VO=[{at:21,file:'vo-01.mp3'},{at:162,file:'vo-02.mp3'},{at:369,file:'vo-03.mp3'},{at:490,file:'vo-04.mp3'},{at:647,file:'vo-05.mp3'},{at:731,file:'vo-06.mp3'}];
export const EzSitesV2:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:C.cream}}>
   <FlowerWebsite f={f}/>
   <Opening f={f}/>
   <BrandEnd f={f}/>
   <Audio src={staticFile('score.wav')} premountFor={fps} volume={.37}/>
   {VO.map((v,k)=><Sequence key={k} from={v.at} premountFor={fps}><Audio src={staticFile(v.file)} volume={1}/></Sequence>)}
 </AbsoluteFill>;
};