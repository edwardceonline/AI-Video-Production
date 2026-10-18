import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// Three-second character-acting proof of concept. Not part of the final 100-second episode.
// The illustration uses a modest two-layer puppet (body + separate head), and a deliberate
// reaction key pose. It does not pretend to be full skeletal character animation.
const smooth=(frame:number,from:number,to:number)=>interpolate(frame,[from,to],[0,1],{
  extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(0.22,1,0.36,1)
});
const B='#0B2141';

const ArtShot:React.FC<{frame:number; reaction:boolean}>=({frame,reaction})=>{
  const sources=reaction ? ['reacts_rig_background.webp','reacts_head_alpha.webp'] : ['coffee_rig_background.webp','coffee_head_alpha.webp'];
  const pan=smooth(frame,0,90);
  const pivotX=reaction?'56%':'57%';
  const pivotY=reaction?'67%':'61%';
  const turn=smooth(frame,reaction?61:38,reaction?84:62);
  const titleCover= 'linear-gradient(180deg,rgba(0,0,0,.38),transparent 22%)';
  return <div style={{position:'absolute',top:335,left:0,width:1080,height:980,overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,background:'#B66E40'}}/>
    <div style={{position:'absolute',left:-70,top:-8,width:1240,height:960,
      transform:`scale(${1+.04*pan}) translate(${-13*pan}px,${-12*pan}px)`,transformOrigin:'50% 45%'}}>
      <Img src={staticFile('assets/'+sources[0])} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 50%'}}/>
      <Img src={staticFile('assets/'+sources[1])} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 50%',
        transformOrigin:pivotX+' '+pivotY,transform:`rotate(${(reaction?-1:0)+(reaction?1.5:-3)*turn+Math.sin(frame/12)*.24}deg) translate(${turn*(reaction?-3:5)}px,${turn*(reaction?4:6)}px)`}}/>
    </div>
    <div style={{position:'absolute',inset:0,background: titleCover,pointerEvents:'none'}}/>
    <div style={{position:'absolute',bottom:0,left:0,right:0,height:185,background:'linear-gradient(0deg,#0B2141,transparent)',pointerEvents:'none'}} />
  </div>;
};

const Phone:React.FC<{frame:number}>=({frame})=>{
  const emerge=spring({frame:frame-27,fps:30,config:{damping:18,stiffness:145,mass:.8}});
  const show=Math.max(0,Math.min(1,emerge));
  const pulse=frame>=30&&frame<61?Math.sin((frame-30)*2.8)*Math.exp(-(frame-30)/23)*7:0;
  const alert=smooth(frame,36,51);
  const lift=smooth(frame,55,78);
  const x=interpolate(lift,[0,1],[245,132]);
  const y=interpolate(lift,[0,1],[1140,1070]);
  const tilt=interpolate(lift,[0,1],[-11,-4]);
  return <div style={{position:'absolute',left:x,top:y,width:750,height:680,
    opacity:show,transform:`translateY(${(1-show)*620+pulse}px) rotate(${tilt}deg) scale(${.8+.14*show+.14*lift})`,transformOrigin:'50% 20%',filter:'drop-shadow(14px 24px 22px rgba(0,10,32,.6))'}}>
    <div style={{position:'relative',background:'linear-gradient(120deg,#142840,#051225)',border:'6px solid #8295A8',borderRadius:62,padding:20,height:810,overflow:'hidden'}}>
      <div style={{height:'100%',background:'linear-gradient(150deg,#173F73,#061B36)',borderRadius:38,color:'white',position:'relative',overflow:'hidden'}}>
        <div style={{height:56,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 30px',fontSize:23,fontWeight:800,fontFamily:'Arial'}}>9:41 <span>●●● ▰</span></div>
        <div style={{fontFamily:'Arial',textAlign:'center',marginTop:34,color:'#EAF7FF',fontSize:82,fontWeight:200}}>9:41</div>
        <div style={{fontFamily:'Arial',textAlign:'center',color:'#B7D2E5',fontSize:24,marginTop:8}}>Tuesday, October 13</div>
        <div style={{position:'absolute',top:275,left:35,right:35,background:'rgba(244,249,255,.97)',borderRadius:30,padding:'24px 27px',boxSizing:'border-box',color:B,opacity:alert,transform:`translateY(${(1-alert)*-75}px)`,boxShadow:'0 13px 35px rgba(0,0,0,.22)'}}>
          <div style={{display:'flex',alignItems:'center',gap:20}}>
            <div style={{width:63,height:63,borderRadius:18,background:'#E74A4A',display:'grid',placeItems:'center',fontSize:39,fontWeight:900,color:'white'}}>!</div>
            <div style={{fontSize:28,fontFamily:'Arial',fontWeight:800}}>Example Bank</div>
            <div style={{fontSize:20,marginLeft:'auto',color:'#7488A4'}}>now</div>
          </div>
          <div style={{marginLeft:85,fontFamily:'Arial',fontSize:25,lineHeight:1.32,marginTop:8}}>
            Your account will be locked<br/>in 10 minutes. Verify now.
          </div>
        </div>
        <div style={{position:'absolute',bottom:19,left:'calc(50% - 77px)',width:154,height:7,borderRadius:4,background:'#B6CDE1',opacity:.6}} />
      </div>
    </div>
  </div>;
};

export const MinhActingTest:React.FC=()=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const switchToReaction=smooth(frame,63,68);
  const camera=smooth(frame,0,90);
  const headline=smooth(frame,0,14);
  return <AbsoluteFill style={{background:B,fontFamily:'Arial',overflow:'hidden'}}>
    <Img src={staticFile('assets/hero.png')} style={{position:'absolute',inset:-300,width:1680,height:2350,objectFit:'cover',filter:'blur(68px) saturate(1.25)',opacity:.75,
      transform:`scale(${1+camera*.08})`}} />
    <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#112A4A 0%,rgba(10,33,65,.2) 30%,rgba(10,33,65,.15) 63%,#091D3C 95%)'}} />
    <div style={{position:'absolute',top:140,left:83,right:83,opacity:headline}}>
      <div style={{fontSize:47,fontWeight:900,letterSpacing:3,color:'white'}}>CYBER <span style={{color:'#75C3FF'}}>EXPLAINED</span></div>
      <div style={{fontSize:25,letterSpacing:5,fontWeight:700,color:'#FFD7A2',marginTop:12}}>EP01 · THE MESSAGE</div>
      <div style={{height:5,width:130,borderRadius:8,background:'#FF9A60',marginTop:27}} />
    </div>
    <div style={{opacity:1-switchToReaction}}><ArtShot frame={frame} reaction={false}/></div>
    {switchToReaction>0 && <div style={{opacity:switchToReaction}}><ArtShot frame={frame} reaction /></div>}
    <Phone frame={frame}/>
    <div style={{position:'absolute',right:74,top:270,fontSize:23,letterSpacing:4,color:'#D2E7FA',fontWeight:800}}>VISUAL ACTING TEST · 03 SEC</div>
    <Audio src={staticFile('audio/acting_sfx.m4a')} volume={.62}/>
  </AbsoluteFill>;
};