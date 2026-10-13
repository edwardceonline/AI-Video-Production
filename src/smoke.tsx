import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Two-second CI-only render to verify actual Remotion rendering without external assets. */
export const PipelineSmoke: React.FC=()=>{
  const f=useCurrentFrame();
  const progress=interpolate(f,[0,45],[0,1],{extrapolateRight:'clamp'});
  return <AbsoluteFill style={{
    background:'radial-gradient(circle at 45% 39%, #164A7A 0%, #081A31 67%)',
    fontFamily:'Arial, sans-serif',color:'#F6FBFF',display:'flex',
    flexDirection:'column',alignItems:'center',justifyContent:'center',
  }}>
    <div style={{fontSize:62,fontWeight:900,letterSpacing:2,transform:'translateY('+(30-30*progress)+'px)',opacity:progress}}>CYBER <span style={{color:'#70BFFF'}}>EXPLAINED</span></div>
    <div style={{fontSize:28,marginTop:35,letterSpacing:6,color:'#BBD3EC'}}>REMOTION RENDER PIPELINE TEST</div>
    <div style={{width:670,height:12,borderRadius:20,background:'#173F67',marginTop:95,overflow:'hidden'}}>
      <div style={{height:12,width:(100*progress)+'%',background:'#FFAA58'}}/>
    </div>
    <div style={{fontSize:30,marginTop:35,color:'#BBD3EC'}}>2-second test · 1080×1920 · 30fps</div>
    <div style={{fontSize:23,marginTop:30,color:'#FFAA58'}}>NOT A FINISHED EPISODE</div>
  </AbsoluteFill>;
};
