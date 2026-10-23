import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {loadFont} from '@remotion/google-fonts/Archivo';

/*
 * SIGNAL V2 — refinement of SignalTitle (V1 stays untouched for comparison).
 * 1920x1080, 30 fps, 120 frames. Same concept, same move sheet, same title.
 *
 * Move sheet (line tip, px; speeds in px/frame) — unchanged from V1:
 *   f0–f9     HOLD    empty frame
 *   f9–f17    ENTRY   0 → 432      72 → 36   decelerate-only (already moving on entry)
 *   f17–f47   REVEAL  432 → 1512   36        constant speed; tip crosses the word
 *   f47–f62   EXIT    1512 → 2322  36 → 72   accelerate-only (line gone at f60)
 *   f60–f119  HOLD    title still, line gone
 *
 * Changes vs V1:
 *   - Line axis moved from the cap-height middle (y=540) to y=598, inside the bottom stroke
 *     band shared by S/G/L (rows ~591–607), so every letter it meets is crossed inside a stroke,
 *     never tangent to a stroke edge. Reads as a baseline-region scan, not a strike-through.
 *   - Line length 240 → 200 px.
 *   - Velocity-only motion blur on the line during fast entry/exit (see ledger).
 *
 * JUSTIFIED: motion blur on the line only — at 72 px/f un-blurred displacement reads as judder at
 *   30 fps, and the blur communicates that velocity — shutter angle ramps with line speed from 0°
 *   (speed <= 40 px/f) to 180° (72 px/f); active only f10–f16 (entry) and f50–f60 (exit); sharp
 *   (plain element, no blur wrapper) for f0–f9, the whole reveal f17–f49, and the final hold; the
 *   title and the mask edge are never blurred; 16 samples; horizontal motion only.
 *
 * Blur implementation: the official <HtmlInCanvasMotionBlur> is the preferred approach, but its
 * sample capture fails in Chrome 153 (this container); the official fallback <CameraMotionBlur>
 * from the same @remotion/motion-blur package is DOM-only and used instead. CameraMotionBlur
 * samples at (frame + 1 - shutter..), so the line compensates its time to keep the exposure
 * centred on the nominal frame and the blurred frames line up with the sharp ones.
 */

const {fontFamily} = loadFont('normal', {weights: ['500'], subsets: ['latin']});

const WIDTH = 1920;
const HEIGHT = 1080;
const BACKGROUND = '#0f0f0f';
const WHITE = '#ffffff';

const LINE_LENGTH = 200;
const LINE_THICKNESS = 2;
const LINE_Y = 598; // vertical centre of the line

const TIP_FRAMES = [9, 17, 47, 62];
const TIP_X = [0, 432, 1512, 2322];
const brake = (t: number) => (4 / 3) * t - (1 / 3) * t * t; // 72 → 36 px/f
const release = (t: number) => (2 / 3) * t + (1 / 3) * t * t; // 36 → 72 px/f
const TIP_EASING = [brake, Easing.linear, release];

// Unrounded tip position: used by the line so motion-blur sub-frame samples stay smooth.
const tipXExact = (frame: number) =>
  interpolate(frame, TIP_FRAMES, TIP_X, {
    easing: TIP_EASING,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// Shutter angle follows line speed only: sharp at/below the reveal pace, 180° at the 72 px/f peak.
const SHARP_BELOW_SPEED = 40;
const PEAK_SPEED = 72;
const MAX_SHUTTER_ANGLE = 180;
const lineShutterAngle = (frame: number) => {
  const speed = tipXExact(frame) - tipXExact(frame - 1);
  const amount = Math.min(1, Math.max(0, (speed - SHARP_BELOW_SPEED) / (PEAK_SPEED - SHARP_BELOW_SPEED)));
  return MAX_SHUTTER_ANGLE * amount;
};

const BLUR_SAMPLES = 16;

// CameraMotionBlur renders sample i (1..N) at frame - s*(i/N) + 1, with s = shutterAngle / 360.
// Shifting by -1 + s*(N+1)/(2N) centres the exposure on the nominal frame.
const centredShift = (shutterAngle: number) =>
  -1 + (shutterAngle / 360) * ((BLUR_SAMPLES + 1) / (2 * BLUR_SAMPLES));

// Pure function of the (possibly fractional, frozen) frame it is given.
const Line = ({shiftFrames = 0}: {readonly shiftFrames?: number}) => {
  const frame = useCurrentFrame() + shiftFrames;
  return (
    <div
      style={{
        position: 'absolute',
        left: -LINE_LENGTH,
        top: LINE_Y - LINE_THICKNESS / 2,
        width: LINE_LENGTH,
        height: LINE_THICKNESS,
        backgroundColor: WHITE,
        translate: `${tipXExact(frame)}px 0px`,
      }}
    />
  );
};

export const SignalTitleV2 = () => {
  const frame = useCurrentFrame();
  const shutterAngle = lineShutterAngle(frame);
  // The clip edge stays on whole pixels and is never blurred: the reveal edge remains crisp.
  const revealedWidth = Math.min(WIDTH, Math.max(0, Math.round(tipXExact(frame))));

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
            // Optical centering, measured on the rendered ink (same as V1).
            translate: '-4px 1px',
            color: WHITE,
          }}
        >
          SIGNAL
        </h1>
      </Interactive.Div>
      {shutterAngle > 0 ? (
        <CameraMotionBlur shutterAngle={shutterAngle} samples={BLUR_SAMPLES}>
          <Line shiftFrames={centredShift(shutterAngle)} />
        </CameraMotionBlur>
      ) : (
        <Line />
      )}
    </AbsoluteFill>
  );
};
