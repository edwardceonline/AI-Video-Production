import React from 'react';
import {AbsoluteFill, Composition, OffthreadVideo, staticFile} from 'remotion';

/**
 * Hybrid proof of concept: recompose the actual native Lemo film in Remotion.
 * OffthreadVideo preserves video audio by default. Future verified in-app UI
 * footage may be layered here rather than drawn as fictional screenshots.
 */
const EzSitesHybrid: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#F4F3ED'}}>
    <OffthreadVideo
      src={staticFile('ezsites-native.mp4')}
      style={{width: '100%', height: '100%', objectFit: 'contain'}}
    />
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <Composition
    id="EzSitesHybrid"
    component={EzSitesHybrid}
    durationInFrames={360}
    fps={24}
    width={1080}
    height={1920}
  />
);
