import React from 'react';
import {Composition} from 'remotion';
import {SignalTitle} from './compositions/SignalTitle';
import {SignalTitleV2} from './compositions/SignalTitleV2';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SignalTitle"
        component={SignalTitle}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SignalTitleV2"
        component={SignalTitleV2}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
