import React from 'react';
import {Composition} from 'remotion';
import {SignalTitle} from './compositions/SignalTitle';

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
    </>
  );
};
