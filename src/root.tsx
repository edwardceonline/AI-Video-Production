import React from 'react';
import {Composition} from 'remotion';
import {Scene01} from './scene01';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="CyberExplained_EP01_EN_S01"
    component={Scene01}
    fps={30}
    durationInFrames={300}
    width={1080}
    height={1920}
  />
);
