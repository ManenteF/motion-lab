import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Archivo';

/*
 * SIGNAL — title card. 1920x1080, 30 fps, 120 frames.
 *
 * Concept: one thin line is the only moving object. A clip edge locked to the
 * line's leading tip uncovers the word; the word itself never animates.
 *
 * Move sheet (line tip, px; speeds in px/frame):
 *   f0–f9     HOLD    empty frame
 *   f9–f17    ENTRY   0 → 432      72 → 36   decelerate-only (already moving on entry)
 *   f17–f47   REVEAL  432 → 1512   36        constant speed; tip crosses the word
 *   f47–f62   EXIT    1512 → 2322  36 → 72   accelerate-only (leaves at speed; tail clears the frame at f60)
 *   f60–f119  HOLD    title still, line gone
 * Shutter feel: none (no motion blur). Ledger: no banned defaults used.
 */

const {fontFamily} = loadFont('normal', {weights: ['500'], subsets: ['latin']});

const WIDTH = 1920;
const HEIGHT = 1080;
const BACKGROUND = '#0f0f0f';
const WHITE = '#ffffff';

const LINE_LENGTH = 240;
const LINE_THICKNESS = 2;

const TIP_FRAMES = [9, 17, 47, 62];
const TIP_X = [0, 432, 1512, 2322];
// Piecewise speed ramps with a linear-in-speed profile; k sets the start/end speed ratio.
const brake = (t: number) => (4 / 3) * t - (1 / 3) * t * t; // 72 → 36 px/f
const release = (t: number) => (2 / 3) * t + (1 / 3) * t * t; // 36 → 72 px/f
const TIP_EASING = [brake, Easing.linear, release];

// Single source of truth for the line tip: the line and the clip edge must stay locked.
const tipX = (frame: number) =>
  Math.round(
    interpolate(frame, TIP_FRAMES, TIP_X, {
      easing: TIP_EASING,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

export const SignalTitle = () => {
  const frame = useCurrentFrame();
  const x = tipX(frame);
  const revealedWidth = Math.min(WIDTH, Math.max(0, x));

  return (
    <AbsoluteFill style={{backgroundColor: BACKGROUND}}>
      <Interactive.Div
        name="Title"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          clipPath: `inset(0 ${WIDTH - revealedWidth}px 0 0)`,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily,
            fontWeight: 500,
            fontSize: 200,
            lineHeight: 1,
            letterSpacing: '0.1em',
            marginRight: '-0.1em',
            // Optical centering, measured on the rendered ink: S/L side bearings and the
            // flat cap-height sit 3.5px right of and 1.5px above the frame/line centre.
            translate: '-4px 1px',
            color: WHITE,
          }}
        >
          SIGNAL
        </h1>
      </Interactive.Div>
      <Interactive.Div
        name="Line"
        style={{
          position: 'absolute',
          left: -LINE_LENGTH,
          top: HEIGHT / 2 - LINE_THICKNESS / 2,
          width: LINE_LENGTH,
          height: LINE_THICKNESS,
          backgroundColor: WHITE,
          translate: `${x}px 0px`,
        }}
      />
    </AbsoluteFill>
  );
};
