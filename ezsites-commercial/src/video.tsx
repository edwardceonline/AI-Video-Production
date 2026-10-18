import React from 'react';
import {AbsoluteFill, interpolate, Series, useCurrentFrame, useVideoConfig} from 'remotion';
import {sceneHTML} from './visuals.js';
import './styles.css';

const timings = [120, 180, 150, 150, 150, 150] as const; // 900 @ 30fps

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export const Scene: React.FC<{step:Step; isStill?:boolean}> = ({step,isStill=false}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const duration = isStill ? 150 : timings[step-1];
  const opacity = isStill ? 1 : interpolate(f, [0, 14, duration-13, duration], [0,1,1,0], {extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const translateY = isStill ? 0 : interpolate(f, [0, 23], [55,0], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const scale = isStill ? 1 : interpolate(f, [0,duration], [1.028,1], {extrapolateRight:'clamp'});
  const reveal = isStill ? 1 : interpolate(f, [6,30], [0,1], {extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill>
    <AbsoluteFill
      className={`ad-scene scene-${step}`}
      style={{opacity, transform:`scale(${scale})`, '--reveal':reveal} as React.CSSProperties}
    >
      <div className="scene-inner" style={{transform:`translateY(${translateY}px)`}} dangerouslySetInnerHTML={{__html:sceneHTML(step)}}/>
    </AbsoluteFill>
  </AbsoluteFill>
}

export const Ad: React.FC = () => <AbsoluteFill style={{background:'#09152d'}}>
  <Series>
    <Series.Sequence name="01 · Your business" durationInFrames={120}><Scene step={1}/></Series.Sequence>
    <Series.Sequence name="02 · Online presence" durationInFrames={180}><Scene step={2}/></Series.Sequence>
    <Series.Sequence name="03 · Domain" durationInFrames={150}><Scene step={3}/></Series.Sequence>
    <Series.Sequence name="04 · Business email" durationInFrames={150}><Scene step={4}/></Series.Sequence>
    <Series.Sequence name="05 · Customer enquiries" durationInFrames={150}><Scene step={5}/></Series.Sequence>
    <Series.Sequence name="06 · Brand end card" durationInFrames={150}><Scene step={6}/></Series.Sequence>
  </Series>
</AbsoluteFill>;