import React from 'react';
import {Composition} from 'remotion';
import {BeyondDoors} from './BeyondDoors';
export const Root:React.FC=()=> <Composition id="BeyondDoors" component={BeyondDoors} fps={30} width={1080} height={1920} durationInFrames={900}/>;