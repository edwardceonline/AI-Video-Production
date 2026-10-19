import React from 'react';
import {AbsoluteFill,Img,OffthreadVideo,Audio,Sequence,staticFile,useCurrentFrame,interpolate,Easing} from 'remotion';

const W=1080,H=1920,BLUE='#129BE8',NAVY='#081A37',NIGHT='#070D17',WARM='#DDBA7F',WHITE='#F9F8F4';
const easing=Easing.bezier(.21,.78,.16,1);
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const tw=(f:number,a:number,b:number,x:number,y:number)=>interpolate(f,[a,b],[x,y],{easing,...clamp});
const on=(f:number,a:number,b=a+18)=>tw(f,a,b,0,1);
const off=(f:number,a:number,b=a+18)=>tw(f,a,b,1,0);
const both=(f:number,s:number,e:number,k=15)=>on(f,s,s+k)*off(f,e-k,e);
const serif:'Georgia, "Times New Roman", serif'='Georgia, "Times New Roman", serif';
const sans='Arial, Helvetica, sans-serif';
const ImgFill:React.FC<{src:string;style?:React.CSSProperties}>=({src,style})=><Img src={staticFile(src)} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',...style}}/>;
const Videofill:React.FC<{src:string;style?:React.CSSProperties}>=({src,style})=><OffthreadVideo src={staticFile(src)} muted volume={0} loop style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',...style}}/>;
const Eyebrow:React.FC<{children:React.ReactNode;light?:boolean;style?:React.CSSProperties}>=({children,light=true,style})=><div style={{fontFamily:sans,fontWeight:600,fontSize:25,letterSpacing:4,textTransform:'uppercase',lineHeight:1.4,color:light?'#D6E8F3':'#526579',...style}}>{children}</div>;
const FilmText:React.FC<{children:React.ReactNode;size?:number;style?:React.CSSProperties}>=({children,size=102,style})=><div style={{fontFamily:serif,fontSize:size,fontWeight:500,lineHeight:1.08,letterSpacing:-3,color:WHITE,...style}}>{children}</div>;
const Logo:React.FC<{width?:number}>=({width=560})=><div style={{background:'#FFFFFF',borderRadius:28,padding:'15px 22px',width,boxShadow:'0px 14px 55px rgba(0,0,0,.2)'}}><Img src={staticFile('ezsites-logo.png')} style={{width:'100%',height:'auto'}}/></div>;
const FineLine:React.FC<{w:number;gold?:boolean}>=({w,gold=false})=><div style={{height:3,width:w,background:gold?WARM:BLUE}}/>;

const Chef:React.FC<{f:number;second?:boolean}>=({f,second})=>{
 const sc=second?tw(f,773,813,1,1.09):tw(f,0,132,1.12,1.03);
 return <AbsoluteFill style={{overflow:'hidden',background:'#10100D'}}>
 <Videofill src="chef.mp4" style={{transform:`scale(${sc})`,objectPosition:'center center',filter:'contrast(1.06) saturate(.80) brightness(.92)'}}/>
 <AbsoluteFill style={{background:second?'linear-gradient(to top,rgba(0,0,0,.68),transparent 72%)':'linear-gradient(180deg,rgba(8,9,10,.17),rgba(4,4,4,.16) 40%,rgba(4,5,5,.69) 100%)'}}/>
 </AbsoluteFill>
};
const Customer:React.FC<{f:number;forContact?:boolean}>=({f,forContact})=>{
 const sc=forContact?tw(f,500,650,1.08,1.18):tw(f,122,267,1.06,1.0);
 return <AbsoluteFill style={{overflow:'hidden',background:'#302825'}}>
  <Videofill src="customer.mp4" style={{transform:`scale(${sc})`,filter:'saturate(.72) contrast(1.02) brightness(.78)',objectPosition:'50% center'}}/>
  <AbsoluteFill style={{background:forContact?'linear-gradient(90deg,rgba(4,13,22,.82),rgba(4,13,22,.26)),linear-gradient(0deg,rgba(3,10,20,.7),transparent 72%)':'linear-gradient(180deg,rgba(0,0,0,.07),rgba(5,10,16,.28) 47%,rgba(5,11,20,.73) 100%)'}}/>
 </AbsoluteFill>
};
const RealSite:React.FC<{f:number;heroOnly?:boolean;scale?:number}>=({f,heroOnly=false,scale=1})=>{
 const y=heroOnly?0:tw(f,289,396,0,-2045);
 return <AbsoluteFill style={{overflow:'hidden',background:'#080908'}}>
 <Img src={staticFile('kurotsuki-mobile.png')} style={{position:'absolute',top:0,left:0,width:W,height:'auto',transform:`translateY(${y}px) scale(${scale})`,transformOrigin:'center top',filter:'contrast(1.06) brightness(1.12)'}}/>
 </AbsoluteFill>;
};

// Opening: the business is a real human endeavor, not a software interface.
const Opening:React.FC<{f:number}>=({f})=><AbsoluteFill style={{opacity:both(f,0,134,10),overflow:'hidden'}}>
 <Chef f={f}/>
 <div style={{position:'absolute',left:70,right:68,bottom:274,transform:`translateY(${tw(f,9,41,72,0)}px)`,opacity:on(f,14,38)}}>
   <FineLine w={tw(f,14,40,0,91)} gold/>
   <FilmText size={100} style={{marginTop:39}}>It starts with<br/><em style={{color:'#F2DDAF'}}>what you do.</em></FilmText>
 </div>
 <Eyebrow style={{position:'absolute',left:70,bottom:116,opacity:on(f,54,83),color:'#E5D6C3'}}>Every business has a beginning.</Eyebrow>
 </AbsoluteFill>;

// Human at another location: customers and business in different physical spaces.
const Discovery:React.FC<{f:number}>=({f})=><AbsoluteFill style={{opacity:both(f,122,283,14),overflow:'hidden'}}>
 <Customer f={f}/>
 <div style={{position:'absolute',left:68,right:64,top:275,opacity:on(f,147,166),transform:`translateY(${tw(f,145,170,80,0)}px)`}}>
  <Eyebrow style={{color:'#D4B788',marginBottom:29}}>Somewhere else, someone is looking.</Eyebrow>
  <FilmText size={98}>Your next<br/>connection<br/><em>starts here.</em></FilmText>
 </div>
 <div style={{position:'absolute',bottom:175,right:78,display:'flex',alignItems:'center',gap:21,opacity:on(f,197,218)}}><div style={{width:10,height:10,background:'#9DDEF9',borderRadius:'50%'}}/><span style={{font:'500 27px Arial',letterSpacing:2.4,color:'#D9E8E8'}}>ONE TAP. A NEW POSSIBILITY.</span></div>
 </AbsoluteFill>;

// Real EzSites-hosted customer demo, not recreated fake UI.
const Web:React.FC<{f:number}>=({f})=>{
 const leave=tw(f,400,435,1,.88);
 return <AbsoluteFill style={{overflow:'hidden',opacity:both(f,263,458,16),background:'#071018'}}>
  <div style={{position:'absolute',inset:0,transform:`scale(${tw(f,268,315,1.12,1)*leave})`,transformOrigin:'50% 33%'}}><RealSite f={f}/></div>
  <AbsoluteFill style={{background:'linear-gradient(0deg,rgba(4,9,15,.94),rgba(4,9,15,.3) 26%,transparent 48%)'}}/>
  <div style={{position:'absolute',left:70,right:67,bottom:148,transform:`translateY(${tw(f,298,331,110,0)}px)`,opacity:on(f,296,326)}}>
   <Eyebrow style={{color:'#E8C98F',marginBottom:21}}>A place to discover you.</Eyebrow>
   <FilmText size={81}>Open for the world<br/>to find.</FilmText>
  </div>
 </AbsoluteFill>;
};

// Domain becomes an editorial identity mark, not a fabricated app screen.
const Identity:React.FC<{f:number}>=({f})=>{
 const p=tw(f,418,471,1.16,1);
 const opacity=both(f,411,525,12);
 return <AbsoluteFill style={{opacity,overflow:'hidden',background:'#F0EEE8'}}>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(130deg,#F3F1EC,#E0E4E3 80%)'}}/>
 <div style={{position:'absolute',right:-180,top:440,width:830,height:830,border:'2px solid #CFD5CF',borderRadius:900,transform:`scale(${p})`}}/>
 <div style={{position:'absolute',top:268,left:68,right:70}}><Eyebrow light={false} style={{color:'#476270',marginBottom:32}}>Give your business an address.</Eyebrow>
  <div style={{fontFamily:serif,fontWeight:600,fontSize:108,lineHeight:1.02,color:'#101A25',letterSpacing:-4,transform:`translateY(${tw(f,426,460,85,0)}px)`,opacity:on(f,423,455)}}>A name<br/>they remember.</div>
 </div>
 <div style={{position:'absolute',top:930,left:67,right:67,padding:'43px 0',borderTop:'2px solid #C4CAC7',borderBottom:'2px solid #C4CAC7',overflow:'hidden'}}>
  <div style={{font:'600 38px Arial',letterSpacing:-1.0,color:'#142B3D',whiteSpace:'nowrap',transform:`translateX(${tw(f,438,482,850,0)}px)`}}>kurotsuki<span style={{color:BLUE}}>.sites.ezsites.app</span></div>
 </div>
 <div style={{position:'absolute',left:69,bottom:195,font:'500 26px Arial',letterSpacing:1.7,color:'#4C6170',opacity:on(f,457,479)}}>YOUR PRESENCE. YOUR IDENTITY.</div>
 </AbsoluteFill>;
};

// Inquiry shown as narrative typography, not an invented screenshot of the EzSites app.
const Contact:React.FC<{f:number}>=({f})=>{
 const type='Hi, could we book two seats this Friday?';
 const typed=Math.round(tw(f,542,607,0,type.length));
 return <AbsoluteFill style={{opacity:both(f,514,664,12),overflow:'hidden'}}>
  <Customer f={f} forContact/>
  <div style={{position:'absolute',left:70,right:65,top:277,opacity:on(f,526,547)}}><Eyebrow style={{color:'#DBBD83',marginBottom:32}}>From interest to connection.</Eyebrow><FilmText size={96}>A conversation<br/>begins.</FilmText></div>
  <div style={{position:'absolute',left:61,right:61,bottom:340,background:'rgba(247,249,247,.95)',padding:'46px 42px 49px',borderRadius:26,boxShadow:'0 30px 90px rgba(0,0,0,.45)',transform:`translateY(${tw(f,531,562,310,0)}px)`,opacity:on(f,528,552)}}>
   <div style={{display:'flex',alignItems:'center',gap:17,marginBottom:26}}><span style={{width:12,height:12,borderRadius:20,background:BLUE}}/><span style={{font:'700 22px Arial',letterSpacing:3,color:'#4D6578'}}>CUSTOMER INQUIRY</span></div>
   <div style={{font:'500 45px Georgia',color:'#101D2B',lineHeight:1.27,minHeight:118}}>{type.slice(0,typed)}{typed<type.length?<span style={{color:BLUE}}>|</span>:null}</div>
   <div style={{height:2,background:'#D0D9D9',marginTop:28}}/>
   <div style={{font:'500 22px Arial',color:'#7A8F9D',marginTop:21}}>Illustrative customer message</div>
  </div>
 </AbsoluteFill>
};

// Business email is represented as an editorial motif, not a mocked first-party EzSites UI.
const EmailStory:React.FC<{f:number}>=({f})=>{
 const s=on(f,665,694); const reply='We would love to welcome you.';
 const typed=Math.round(tw(f,724,764,0,reply.length));
 return <AbsoluteFill style={{overflow:'hidden',opacity:both(f,644,792,12),background:'#071B2B'}}>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 87% 6%,rgba(24,123,194,.34),transparent 46%),radial-gradient(ellipse at 4% 90%,rgba(193,155,104,.13),transparent 48%)'}}/>
  <div style={{position:'absolute',top:275,left:70,right:70,transform:`translateY(${tw(f,657,701,80,0)}px)`,opacity:s}}>
   <Eyebrow style={{color:'#7DBFDE',marginBottom:37}}>And keep it going.</Eyebrow>
   <FilmText size={96}>A professional<br/>way to reply.</FilmText>
  </div>
  <div style={{position:'absolute',left:70,top:878,right:70,borderTop:'1px solid #3E6172',borderBottom:'1px solid #3E6172',padding:'47px 0 45px',opacity:on(f,694,721)}}>
    <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:44}}><div style={{width:12,height:12,borderRadius:16,background:'#7EC9ED'}}/><div style={{font:'600 29px Arial',letterSpacing:1,color:'#D7E4E7'}}>hello<span style={{color:'#7BCBF3'}}>@yourbusiness.com</span></div></div>
    <div style={{fontFamily:serif,fontSize:55,lineHeight:1.15,color:'#F0F1E9',minHeight:140}}>{reply.slice(0,typed)}<span style={{color:BLUE}}>{typed<reply.length?'▌':''}</span></div>
    <div style={{font:'500 23px Arial',marginTop:25,color:'#7397AC'}}>Illustrative business-email example</div>
  </div>
  <div style={{position:'absolute',left:70,bottom:190,font:'600 24px Arial',letterSpacing:4.4,color:'#7FC7EC',opacity:on(f,729,755)}}>WEBSITE. DOMAIN. BUSINESS EMAIL.</div>
 </AbsoluteFill>;
};

const Finale:React.FC<{f:number}>=({f})=>{
 const t=f-768;
 return <AbsoluteFill style={{overflow:'hidden',opacity:on(f,762,776),background:NAVY}}>
  <AbsoluteFill style={{opacity:off(f,800,823)}}><Chef f={f} second/></AbsoluteFill>
  <AbsoluteFill style={{background:NAVY,opacity:on(f,810,839)}}/>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 57% 30%,rgba(20,128,214,.18),transparent 70%)',opacity:on(f,824,847)}}/>
  <div style={{position:'absolute',left:0,right:0,top:646,display:'flex',alignItems:'center',flexDirection:'column',opacity:on(f,827,848),transform:`translateY(${tw(f,823,858,55,0)}px)`}}>
   <Logo width={555}/>
   <div style={{fontFamily:serif,fontSize:82,letterSpacing:-2.5,lineHeight:1.07,color:'#FFFFFF',textAlign:'center',marginTop:56}}>Get your business<br/>online.</div>
   <FineLine w={125}/>
   <div style={{font:'600 25px Arial',color:'#B6D8EC',letterSpacing:3.9,marginTop:35}}>MAKE YOUR FIRST CONNECTION.</div>
  </div>
 </AbsoluteFill>;
};

// All scenes receive one absolute timeline. Avoid useCurrentFrame in nested Sequence for UI choreography.
export const Beyond:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{overflow:'hidden',background:NIGHT}}>
  <Opening f={f}/>
  <Discovery f={f}/>
  <Web f={f}/>
  <Identity f={f}/>
  <Contact f={f}/>
  <EmailStory f={f}/>
  <Finale f={f}/>
  <Audio src={staticFile('score.wav')} volume={.68}/>
  {[[16,'vo-0.mp3'],[139,'vo-1.mp3'],[265,'vo-2.mp3'],[402,'vo-3.mp3'],[508,'vo-4.mp3'],[619,'vo-5.mp3'],[786,'vo-6.mp3']].map(([start,file],i)=><Sequence key={i} from={Number(start)} durationInFrames={Math.min(900-Number(start),132)}><Audio src={staticFile(String(file))} volume={1.0}/></Sequence>)}
 </AbsoluteFill>;
};