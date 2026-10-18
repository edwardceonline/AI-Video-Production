import React from 'react';
import {Composition, Folder, Still} from 'remotion';
import {Ad, Scene} from './video';

const config = {width: 1080, height: 1920, fps: 30};

export const Root: React.FC = () => <>
  <Composition
    id="EzSitesBusinessCommercial"
    component={Ad}
    {...config}
    durationInFrames={900}
  />
  <Folder name="Keyframes">
    {([1, 2, 3, 4, 5, 6] as const).map((step) =>
      <Still
        key={step}
        id={`EzSitesScene0${step}`}
        component={() => <Scene step={step} isStill />}
        width={config.width}
        height={config.height}
      />
    )}
  </Folder>
</>;