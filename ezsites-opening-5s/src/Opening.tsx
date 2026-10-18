import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig, staticFile, Sequence} from 'remotion';
import {Video, Audio} from '@remotion/media';

/**
 * EzSites 5-second opening. Two independent live-action video layers (not a static screenshot),
 * subtle per-shot virtual camera, gradient scrim, and deterministic masked typography.
 * The clips are editorial stock examples; never imply the person endorses EzSites.
 */
const ease = Easing.bezier(0.22, 0.68, 0.16, 1);
const clamp = {extrapolateLeft:'clamp' as const, extrapolateRight:'clamp' as const};
const W = 1080;
const H = 1920;
const C = {ivory:'#FFF6E8', white:'#FDF8F0', ink:'#122033', blue:'#129BE8'};
const curve = (f:number, a:number, b:number, from:number, to:number) => interpolate(f,[a,b],[from,to],{...clamp,easing:ease});

const Picture:React.FC<{src:string; zoomFrom:number; zoomTo:number; xFrom:number; xTo:number; yFrom:number; yTo:number; duration:number; offset?:number;}>=({src,zoomFrom,zoomTo,xFrom,xTo,yFrom,yTo,duration,offset=0})=>{
  const frame=useCurrentFrame();
  return <AbsoluteFill style={{overflow:'hidden',background:'#2A231C'}}>
    <Video name="Actual florist live-action footage" src={staticFile(src)} premountFor={30} trimBefore={offset} muted
      objectFit="cover" style={{width:'100%',height:'100%',position:'absolute',objectFit:'cover',
      transform:`translate3d(${curve(frame,0,duration,xFrom,xTo)}px, ${curve(frame,0,duration,yFrom,yTo)}px,0) scale(${curve(frame,0,duration,zoomFrom,zoomTo)})`,
      filter:'brightness(.9) contrast(1.08) saturate(.85)'}} />
  </AbsoluteFill>;
};

const Matte:React.FC=()=> <AbsoluteFill style={{pointerEvents:'none',background:
  'linear-gradient(180deg,rgba(13,18,18,.27) 0%,rgba(9,15,20,.03) 34%,rgba(8,15,19,.12) 46%,rgba(10,17,21,.70) 79%,rgba(9,16,22,.88) 100%)'}}/>;

const TitleLine:React.FC<{text:string;start:number;duration?:number;fontSize:number;italic?:boolean;}>=({text,start,duration=22,fontSize,italic=false})=>{
 const frame=useCurrentFrame();
 const opacity=curve(frame,start,start+duration,0,1);
 const y=curve(frame,start,start+duration,110,0);
 return <div style={{overflow:'hidden',height:fontSize*1.27,marginLeft:-2}}>
   <div style={{fontFamily:'Georgia,Times New Roman,serif',color:C.white,fontWeight:500,fontStyle:italic?'italic':'normal',fontSize,
      lineHeight:1.13,letterSpacing:-3.0,whiteSpace:'nowrap',textShadow:'0 2px 28px rgba(0,0,0,.17)',transform:`translateY(${y}px)`,opacity}}>
      {text}
   </div>
 </div>;
};

const EditorialTitle:React.FC=()=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{pointerEvents:'none'}}>
   {/* editorial running identity */}
   <div style={{position:'absolute',top:132,left:80,right:82,display:'flex',alignItems:'center',gap:20,
     opacity:curve(frame,2,23,0,1)}}>
     <div style={{width:30,height:3,background:C.ivory,opacity:.92}}/>
     <div style={{fontFamily:'Arial, sans-serif',fontWeight:700,fontSize:24,letterSpacing:6,color:C.ivory}}>STORIES START SOMEWHERE</div>
   </div>
   <div style={{position:'absolute',left:72,right:45,top:1060}}>
     <div style={{display:'flex',alignItems:'center',gap:17,marginBottom:42,opacity:curve(frame,8,28,0,1)}}>
       <div style={{width:57,height:3,background:'#E9C49D'}}/>
       <div style={{fontFamily:'Arial,sans-serif',fontSize:24,letterSpacing:5,fontWeight:600,color:'#EDD9C2'}}>FOR THE MAKERS & DREAMERS</div>
     </div>
     <TitleLine start={26} fontSize={119} text="YOU BUILT"/>
     <TitleLine start={48} fontSize={105} italic text="THE BUSINESS."/>
     <div style={{height:3,background:'rgba(255,246,232,.72)',width:curve(frame,66,102,0,606),marginTop:35}}/>
     <div style={{fontFamily:'Arial,sans-serif',fontSize:28,lineHeight:1.5,letterSpacing:1.7,color:'rgba(255,246,232,.89)',marginTop:35,
       opacity:curve(frame,86,105,0,1)}}>EVERY GREAT BUSINESS BEGINS WITH A STORY.</div>
   </div>
   <div style={{position:'absolute',left:78,right:80,bottom:115,display:'flex',alignItems:'center',justifyContent:'space-between',
     fontSize:24,fontFamily:'Arial,sans-serif',fontWeight:700,letterSpacing:3.1,color:'rgba(255,250,242,.84)',opacity:curve(frame,8,29,0,1)}}>
      <div>01 <span style={{opacity:.5,padding:'0 12px'}}> / </span> THE BUSINESS</div>
      <div style={{display:'flex',gap:10}}>{[0,1,2].map((n)=><div key={n} style={{width:n===0?54:12,height:3,background:n===0?'#D4E3EA':'rgba(255,255,255,.4)'}} />)}</div>
   </div>
 </AbsoluteFill>;
};

export const Opening:React.FC=()=>{
 const frame=useCurrentFrame();
 const {fps}=useVideoConfig();
 const cut=3*fps;
 const cutFlash=interpolate(frame,[cut-2,cut,cut+2],[0,.17,0],clamp);
 return <AbsoluteFill style={{background:'#171E1C'}}>
   <Sequence name="Shot A / owner in motion" from={0} durationInFrames={cut} premountFor={fps}>
     <Picture src="florist-wide.mp4" zoomFrom={1.025} zoomTo={1.07} xFrom={10} xTo={-19} yFrom={0} yTo={-13} duration={cut} offset={0}/>
   </Sequence>
   <Sequence name="Shot B / bouquet craft detail" from={cut} durationInFrames={150-cut} premountFor={fps}>
     <Picture src="florist-detail.mp4" zoomFrom={1.30} zoomTo={1.40} xFrom={-30} xTo={-54} yFrom={-70} yTo={-98} duration={150-cut} offset={95}/>
   </Sequence>
   <Matte/>
   <EditorialTitle/>
   {/* Mild exposure change is only at the intentional editorial picture cut. */}
   <AbsoluteFill style={{background:'#FAE7C9',opacity:cutFlash,pointerEvents:'none'}}/>
   <Audio src={staticFile('original-score.wav')} premountFor={fps} volume={0.95} />
 </AbsoluteFill>;
};