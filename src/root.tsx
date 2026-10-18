import React from 'react';
import {Composition} from 'remotion';
import {Scene01} from './scene01';
import {PipelineSmoke} from './smoke';
import {MinhActingTest} from './MinhActingTest';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="CyberExplained-EP01-EN-S01"
      component={Scene01}
      fps={30}
      durationInFrames={300}
      width={1080}
      height={1920}
    />
    <Composition
      id="CyberExplained-Pipeline-Smoke"
      component={PipelineSmoke}
      fps={30}
      durationInFrames={60}
      width={1080}
      height={1920}
    />
    <Composition
      id="CyberExplained-Minh-Acting-3s"
      component={MinhActingTest}
      fps={30}
      durationInFrames={90}
      width={1080}
      height={1920}
    />
  </>
);
