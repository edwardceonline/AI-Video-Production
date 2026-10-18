import React from 'react';
import {Composition} from 'remotion';
import {Benchmark} from './video';
export const Root: React.FC = () => <Composition id="Benchmark" component={Benchmark} width={1080} height={1920} fps={30} durationInFrames={240}/>;