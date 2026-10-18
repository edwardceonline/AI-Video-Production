import React from 'react';
import {AbsoluteFill, Sequence, Img, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio, Video} from '@remotion/media';

/**
 * 27s 9:16 business-first EzSites concept film.
 * Screens are editorial demo representations, NOT captures of the live EzSites app.
 * No chapter numbers, scene labels, progress indicators, generic tech icons or fake testimonials.
 */
const C={ink:'#102339',blue:'#129BE8',navy:'#0A1733',cream:'#F9F7F3',paper:'#FFFDF8',muted:'#7F8281',olive:'#3E4638',warm:'#E5DED0'};
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=Easing.bezier(0.18,0.86,0.25,1);
const smooth=Easing.bezier(0.45,0,0.2,1);
const I=(f:number,a:number,b:number,x:number,y:number,e= ease)=>interpolate(f,[a,b],[x,y],{...clamp,easing:e});
const alpha=(f:number,show:number,end:number,dur=16)=>Math.min(I(f,show,show+dur,0,1),I(f,end-dur,end,1,0));
const typeSans='Arial, Helvetica, sans-serif';
const typeSerif='Georgia, Times New Roman, serif';
const Bg:React.FC<{src:string;scale?:number;style?:React.CSSProperties}>=({src,scale=1,style={}})=>
 <Img src={staticFile(src)} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',transform:`scale(${scale})`,...style}}/>;
const Hairline:React.FC<{color?:string}>=({color='rgba(11,27,32,.16)'})=><div style={{height:1,background:color,width:'100%'}}/>;
const Reveal:React.FC<{children:React.ReactNode;frame:number;start:number;duration?:number;y?:number;style?:React.CSSProperties}>=({children,frame,start,duration=20,y=80,style={}})=>
 <div style={{overflow:'hidden',...style}}><div style={{opacity:I(frame,start,start+duration,0,1),transform:`translateY(${I(frame,start,start+duration,y,0)}px)`}}>{children}</div></div>;

const FilmShot:React.FC<{trim?:number;zoomStart?:number;zoomEnd?:number;dx?:number;dy?:number;frames:number}>=({trim=0,zoomStart=1,zoomEnd=1.06,dx=-20,dy=-24,frames})=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{overflow:'hidden'}}>
   <Video src={staticFile('florist.mp4')} muted trimBefore={trim} premountFor={30} objectFit="cover" style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:'saturate(.78) contrast(1.08)',transform:`translate3d(${I(f,0,frames,0,dx,smooth)}px,${I(f,0,frames,0,dy,smooth)}px,0) scale(${I(f,0,frames,zoomStart,zoomEnd,smooth)})`}}/>
 </AbsoluteFill>;
};

const Opening:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:'#253129'}}>
   <Sequence from={0} durationInFrames={90} premountFor={30}><FilmShot frames={90} zoomStart={1.02} zoomEnd={1.07}/></Sequence>
   <Sequence from={90} durationInFrames={60} premountFor={30}><FilmShot frames={60} trim={95} zoomStart={1.29} zoomEnd={1.39} dx={-45} dy={-110}/></Sequence>
   <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(0,0,0,.02) 10%,rgba(9,15,17,.08) 43%,rgba(8,15,17,.76) 80%,rgba(4,13,15,.84) 100%)'}}/>
   <div style={{position:'absolute',left:68,top:1110,right:45,color:'#F9F4EB',textShadow:'0 2px 22px rgba(0,0,0,.18)'}}>
     <Reveal frame={f} start={26} duration={25}><div style={{fontFamily:typeSerif,fontSize:124,letterSpacing:-4.5,lineHeight:1.17}}>YOU BUILT</div></Reveal>
     <Reveal frame={f} start={49} duration={24}><div style={{fontFamily:typeSerif,fontSize:108,letterSpacing:-3.2,fontStyle:'italic',lineHeight:1.15}}>THE BUSINESS.</div></Reveal>
   </div>
 </AbsoluteFill>;
};

/** A film-to-product match cut: the same flower palette resolves into a real photo-based website demo. */
const Website:React.FC=()=>{
 const f=useCurrentFrame();
 const t=I(f,0,41,0,1,smooth);
 const scale=I(f,0,41,1.22,1,smooth);
 const rise=I(f,0,43,610,0,smooth);
 const scroll=I(f,104,174,0,320,smooth);
 return <AbsoluteFill style={{background:C.cream,color:C.ink}}>
   <Bg src="florals-detail.jpg" scale={1.1} style={{filter:'saturate(.67) blur(9px)',opacity:.27}}/>
   <div style={{position:'absolute',left:62,top:85,right:62,display:'flex',alignItems:'center',justifyContent:'space-between',color:C.ink,opacity:I(f,15,36,0,1)}}>
     
     <div style={{width:50,height:1,background:C.ink}}/>
   </div>
   <div style={{position:'absolute',left:54,top:210,width:972,height:1450,background:C.paper,overflow:'hidden',borderRadius:18,
     boxShadow:'0 38px 100px rgba(10,23,32,.19)',transform:`translateY(${rise}px) scale(${scale})`,transformOrigin:'50% 20%',opacity:Math.max(.35,t)}}>
     <div style={{height:116,padding:'0 56px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(0,0,0,.07)',background:'#FDFBF6'}}>
       <div style={{fontSize:42,fontFamily:typeSerif,letterSpacing:-1.6,color:'#27352D'}}>Petal & Paper</div>
       <div style={{fontSize:19,fontFamily:typeSans,fontWeight:700,letterSpacing:1.5,color:'#465147'}}>OUR STORY　　FLOWERS　　CONTACT</div>
     </div>
     <div style={{position:'relative',height:1320,overflow:'hidden'}}>
       <div style={{transform:`translateY(${-scroll}px)`}}>
         <div style={{height:715,position:'relative',overflow:'hidden'}}>
           <Bg src="florals-main.jpg" scale={1.035} style={{objectPosition:'center 42%',filter:'saturate(.80)'}}/>
           <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 20%,rgba(15,30,25,.55) 100%)'}}/>
           <div style={{position:'absolute',left:55,bottom:68,right:48,color:'white'}}>
             <div style={{fontSize:25,fontFamily:typeSans,letterSpacing:4,marginBottom:25}}>HANDCRAFTED WITH CARE</div>
             <div style={{fontFamily:typeSerif,fontSize:100,lineHeight:1.03,letterSpacing:-3}}>Flowers for<br/>every moment.</div>
           </div>
         </div>
         <div style={{padding:'65px 59px',display:'flex',flexDirection:'column',gap:26,alignItems:'flex-start'}}>
           <div style={{fontFamily:typeSerif,fontSize:73,lineHeight:1.14,letterSpacing:-2}}>Small details.<br/>Lasting memories.</div>
           <p style={{fontFamily:typeSans,fontSize:28,color:'#677168',lineHeight:1.7,margin:0}}>Thoughtfully arranged flowers for the people and moments that matter most.</p>
           <div style={{background:'#26382E',color:'white',padding:'25px 47px',fontFamily:typeSans,fontSize:26,fontWeight:600,marginTop:22}}>Get in touch　↗</div>
         </div>
       </div>
     </div>
   </div>
   <div style={{position:'absolute',left:85,bottom:80,right:85,color:C.ink,opacity:alpha(f,30,180,18)}}>
     <Reveal frame={f} start={44}><div style={{fontSize:74,fontFamily:typeSans,fontWeight:700,letterSpacing:-3}}>A place to be found.</div></Reveal>
   </div>
 </AbsoluteFill>;
};

const BrowserScene:React.FC=()=>{
 const f=useCurrentFrame();
 const siteScale=I(f,0,43,1.07,.95,smooth);
 const bar=I(f,21,53,370,0,smooth);
 const focus=I(f,38,78,0,1);
 const typed='petalandpaper.ch';
 const count=Math.round(I(f,58,99,0,typed.length));
 return <AbsoluteFill style={{background:'#EEE8DD',color:C.ink}}>
   <Bg src="florals-main.jpg" scale={1.19} style={{filter:'blur(18px) saturate(.56)',opacity:.45}} />
   <div style={{position:'absolute',top:185,left:65,right:65,height:1360,borderRadius:24,overflow:'hidden',boxShadow:'0 45px 95px rgba(25,25,20,.14)',transform:`scale(${siteScale})`,transformOrigin:'50% 28%',background:C.paper}}>
      <div style={{height:145,display:'flex',alignItems:'center',padding:'0 44px',gap:24,background:'#F4F3EF',borderBottom:'1px solid #E5E2DB'}}>
        <div style={{display:'flex',gap:11}}>{['#F3C3B6','#E5D8A8','#B6C9B6'].map((color,k)=><div key={k} style={{width:16,height:16,borderRadius:20,background:color}}/>)}</div>
        <div style={{height:78,borderRadius:14,background:'white',border:'1px solid #E6E5E0',flex:1,display:'flex',alignItems:'center',paddingLeft:24,marginLeft:6}}>
          <div style={{fontSize:24,color:'#47705B',marginRight:16}}>⌁</div>
          <span style={{fontFamily:typeSans,fontSize:27,color:'#283E35',fontWeight:600}}>{f<58?'':typed.slice(0,count)}</span>
          <div style={{width:2,height:35,background:'#41865A',opacity:f>57&&f<101&&f%18<9?1:0,marginLeft:2}}/>
        </div>
      </div>
      <div style={{position:'relative',height:655,overflow:'hidden'}}>
        <Bg src="florals-main.jpg" scale={1.05} style={{filter:'saturate(.82)'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(0,0,0,.02),rgba(12,29,20,.51))'}}/>
        <div style={{position:'absolute',left:67,bottom:60,fontFamily:typeSerif,fontSize:99,lineHeight:1.06,color:'white'}}>Petal & Paper.</div>
      </div>
      <div style={{height:560,padding:'62px 68px',background:'#FFFDF9'}}>
        <div style={{fontFamily:typeSerif,fontSize:64,lineHeight:1.15,color:'#334239'}}>A beautiful business,<br/>with an address of its own.</div>
        <div style={{fontSize:26,lineHeight:1.6,fontFamily:typeSans,color:'#718073',marginTop:35}}>Find us, explore our work, and get in touch.</div>
      </div>
   </div>
   <div style={{position:'absolute',left:64,right:64,top:150+bar,padding:'29px 37px',background:C.navy,color:'white',borderRadius:18,
       transform:`translateY(${bar}px)`,opacity:focus,boxShadow:'0 25px 70px rgba(4,16,28,.24)'}}>
       
       <div style={{fontFamily:typeSans,fontSize:54,fontWeight:700,letterSpacing:-1.6}}>Your name. Your domain.</div>
   </div>
   <div style={{position:'absolute',left:68,right:68,bottom:105,fontFamily:typeSerif,fontSize:61,color:C.navy,opacity:I(f,76,98,0,1)}}>More than a link. An identity.</div>
 </AbsoluteFill>;
};

const EmailScene:React.FC=()=>{
 const f=useCurrentFrame();
 const enter=I(f,0,37,560,0,smooth);
 const progress=I(f,24,71,0,1,smooth);
 return <AbsoluteFill style={{background:C.navy,color:'#FFFDF9'}}>
   <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 10% 18%,rgba(18,155,232,.20),transparent 46%)'}}/>
   <div style={{position:'absolute',top:200,left:70,right:70}}>
     <Reveal frame={f} start={10} duration={24} style={{marginBottom:20}}><div style={{fontFamily:typeSerif,fontStyle:'italic',fontSize:112}}>Make every</div></Reveal>
     <Reveal frame={f} start={25} duration={23}><div style={{fontFamily:typeSans,fontWeight:700,fontSize:95,letterSpacing:-4}}>conversation count.</div></Reveal>
   </div>
   <div style={{position:'absolute',top:660,left:68,width:944,height:770,background:'#FBFAF7',borderRadius:26,overflow:'hidden',color:C.ink,
     boxShadow:'0 45px 120px rgba(0,0,0,.24)',transform:`translateY(${enter}px)`}}>
     <div style={{height:119,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 52px',borderBottom:'1px solid #E4E8E6'}}>
       <div style={{fontFamily:typeSans,fontSize:31,fontWeight:700}}>Business email</div>
       <div style={{fontFamily:typeSans,fontSize:23,color:'#5F766E'}}>INBOX</div>
     </div>
     <div style={{padding:'48px 52px'}}>
       <div style={{fontFamily:typeSans,fontSize:26,color:'#7B867F',marginBottom:11}}>From</div>
       <div style={{fontFamily:typeSans,fontSize:38,fontWeight:700,letterSpacing:-.3}}>hello@petalandpaper.ch</div>
       <Hairline/>
       <div style={{marginTop:45,fontFamily:typeSans,fontSize:27,color:'#819087'}}>Subject</div>
       <div style={{marginTop:16,fontFamily:typeSerif,fontSize:55,color:'#2B3B31'}}>A new floral enquiry</div>
       <div style={{marginTop:28,background:'#F3F0E9',height:1}} />
       <div style={{marginTop:39,fontFamily:typeSans,fontSize:29,lineHeight:1.72,color:'#445448'}}>
           Hello! I love your arrangements.<br/> Could I place an order for Saturday?
       </div>
       <div style={{marginTop:49,display:'inline-flex',padding:'24px 35px',background:'#E7F2EC',color:'#316348',borderRadius:9,fontFamily:typeSans,fontSize:26,fontWeight:700,
          transform:`translateX(${I(f,59,94,48,0)}px)`,opacity:I(f,59,94,0,1)}}>Reply to customer ↗</div>
     </div>
   </div>
   <div style={{position:'absolute',bottom:165,left:74,right:74,fontFamily:typeSans,fontSize:41,color:'rgba(255,255,255,.78)',lineHeight:1.5,opacity:progress}}>
     A professional address, built around your business.
   </div>
 </AbsoluteFill>;
};

const FormField:React.FC<{label:string;value:string;frame:number;start:number}>=({label,value,frame,start})=>
 <div style={{marginBottom:36,opacity:I(frame,start,start+15,0,1),transform:`translateY(${I(frame,start,start+19,26,0)}px)`}}>
   <div style={{fontFamily:typeSans,fontSize:21,color:'#67756D',marginBottom:14,letterSpacing:1.1}}>{label.toUpperCase()}</div>
   <div style={{fontFamily:typeSans,fontSize:28,color:'#26382D',paddingBottom:17,borderBottom:'2px solid #E0E4DA'}}>{value}</div>
 </div>;
const ContactScene:React.FC=()=>{
 const f=useCurrentFrame();
 const sent=I(f,92,105,0,1);
 const sendEffect=I(f,77,96,1,.98);
 return <AbsoluteFill style={{background:'#EDE7DC',color:C.ink}}>
   <div style={{position:'absolute',left:0,top:0,width:1080,height:780,overflow:'hidden'}}>
     <Video src={staticFile('florist.mp4')} muted trimBefore={61} premountFor={30} objectFit="cover" style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:'saturate(.82) contrast(1.07)',transform:'scale(1.07)'}}/>
     <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(9,22,16,.01),rgba(9,22,16,.40))'}}/>
   </div>
   <div style={{position:'absolute',top:175,left:75,right:75,color:'white'}}>
     <Reveal frame={f} start={8}><div style={{fontFamily:typeSerif,fontSize:104,letterSpacing:-2.3,lineHeight:1.08}}>Good things start<br/>with a hello.</div></Reveal>
   </div>
   <div style={{position:'absolute',left:61,right:61,top:730,height:1040,background:C.paper,padding:'59px 61px',borderRadius:21,boxShadow:'0 36px 90px rgba(32,33,25,.18)',
        transform:`translateY(${I(f,0,29,370,0,smooth)}px)`}}>
      <div style={{fontFamily:typeSerif,fontSize:70,color:'#2E4135',marginBottom:45}}>Get in touch.</div>
      <FormField frame={f} start={17} label="Name" value="Alex Morgan"/>
      <FormField frame={f} start={32} label="Email" value="alex@example.com"/>
      <FormField frame={f} start={46} label="Message" value="Could I order a bouquet for Saturday?"/>
      <div style={{background:'#314639',color:'#FFF',display:'flex',alignItems:'center',justifyContent:'center',height:94,borderRadius:9,
       fontFamily:typeSans,fontSize:31,fontWeight:700,transform:`scale(${sendEffect})`,marginTop:54}}>Send message　↗</div>
      <div style={{fontSize:27,fontFamily:typeSans,fontWeight:700,color:'#2D694C',marginTop:42,opacity:sent,textAlign:'center'}}>✓ Your message has been sent.</div>
   </div>
 </AbsoluteFill>;
};

const EndCard:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:'#FFFFFF',color:C.navy}}>
   <div style={{position:'absolute',left:0,right:0,top:0,height:650,overflow:'hidden'}}>
     <Bg src="florals-main.jpg" scale={I(f,0,120,1.12,1.0,smooth)} style={{filter:'saturate(.70) contrast(.93)',objectPosition:'center 38%'}} />
     <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(0,0,0,0),rgba(255,253,249,.14))'}}/>
   </div>
   <div style={{position:'absolute',left:75,right:75,top:760}}>
     <Reveal frame={f} start={7} duration={28}><div style={{fontFamily:typeSans,fontSize:85,letterSpacing:-3.2,lineHeight:1.15,fontWeight:750}}>BRING YOUR<br/>BUSINESS ONLINE.</div></Reveal>
     <div style={{width:I(f,33,62,0,255),height:6,background:C.blue,marginTop:43}}/>
     <Reveal frame={f} start={45} duration={22}><div style={{fontSize:45,color:'#3F4C57',fontFamily:typeSerif,fontStyle:'italic',marginTop:43}}>Made simpler with EzSites.</div></Reveal>
   </div>
   <div style={{position:'absolute',top:1210,left:72,right:72,display:'flex',alignItems:'center',justifyContent:'center',opacity:I(f,36,60,0,1)}}>
     <Img src={staticFile('ezsites-logo.png')} style={{width:615,height:290,objectFit:'contain'}}/>
   </div>
   <div style={{position:'absolute',left:120,right:120,top:1575,height:98,borderRadius:15,background:C.blue,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontFamily:typeSans,fontSize:35,fontWeight:700,opacity:I(f,61,80,0,1)}}>
     Get started with EzSites　↗
   </div>
 </AbsoluteFill>;
};

const VO=[{from:24,file:'vo-01.mp3'},{from:162,file:'vo-02.mp3'},{from:336,file:'vo-03.mp3'},{from:455,file:'vo-04.mp3'},{from:574,file:'vo-05.mp3'},{from:703,file:'vo-06.mp3'}];
export const Commercial:React.FC=()=>{
 const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:C.navy}}>
   <Sequence from={0} durationInFrames={5*fps} premountFor={fps}><Opening/></Sequence>
   <Sequence from={5*fps} durationInFrames={6*fps} premountFor={fps}><Website/></Sequence>
   <Sequence from={11*fps} durationInFrames={4*fps} premountFor={fps}><BrowserScene/></Sequence>
   <Sequence from={15*fps} durationInFrames={4*fps} premountFor={fps}><EmailScene/></Sequence>
   <Sequence from={19*fps} durationInFrames={4*fps} premountFor={fps}><ContactScene/></Sequence>
   <Sequence from={23*fps} durationInFrames={4*fps} premountFor={fps}><EndCard/></Sequence>
   <Audio src={staticFile('score.wav')} premountFor={fps} volume={0.50}/>
   {VO.map((v,index)=><Sequence key={index} from={v.from} premountFor={fps}>
        <Audio src={staticFile(v.file)} volume={1}/>
   </Sequence>)}
 </AbsoluteFill>;
};