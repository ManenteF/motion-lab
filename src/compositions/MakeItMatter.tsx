import {AbsoluteFill} from 'remotion';
import {TransitionSeries} from '@remotion/transitions';
import {loadFont} from '@remotion/google-fonts/Anton';

/*
 * MAKE IT MATTER — graphic design edited in time. 1920x1080, 30 fps, 150 frames.
 * No interpolation anywhere: every change is a hard cut.
 *
 * System: the newest word takes the floor (same cap height, same baseline, left-aligned to the
 * margin); every earlier word is demoted into a small stack at the top-left.
 *
 *   f0–f38    S1  MAKE (floor)                              39f
 *   f39–f65   S2  MAKE (stack) + IT (floor)                 27f
 *   f66–f71   --  pure black, silence before the impact      6f
 *   f72–f149  S3  MAKE, IT (stack) + MATTER (floor, final)  78f
 *
 * Ledger: no banned defaults used.
 */

const {fontFamily} = loadFont('normal', {weights: ['400'], subsets: ['latin']});

const BACKGROUND = '#000000';
const WHITE = '#ffffff';

// Grid (px). Rendered Anton, calibrated on pixels: cap heights at these sizes, the baseline row
// below a Word's top edge, and the first glyph's left side bearing (so the ink, not the box, sits on
// the margin).
const MARGIN = 120;
const BIG = 591.4; // floor word: sized so the MATTER ink spans margin to margin (1680px)
const SMALL = 150; // stack words
const CAP_BIG = 508;
const CAP_SMALL = 129;
const BASELINE_OFFSET = {big: 546, small: 138} as const;
const BEARING = {M: 0.0381, I: 0.0305} as const;

// Equal gaps between MAKE, IT and MATTER so S3 reads as one block from the top margin to the floor.
const FLOOR_BASELINE = 1080 - MARGIN; // 960
const STACK_GAP = (FLOOR_BASELINE - MARGIN - 2 * CAP_SMALL - CAP_BIG) / 2; // 37
const MAKE_BASELINE = MARGIN + CAP_SMALL; // 249
const IT_BASELINE = MAKE_BASELINE + STACK_GAP + CAP_SMALL; // 415

const Word = ({
  text,
  size,
  baseline,
  bearing,
}: {
  readonly text: string;
  readonly size: number;
  readonly baseline: number;
  readonly bearing: number;
}) => (
  <div
    style={{
      position: 'absolute',
      left: MARGIN - bearing * size,
      top: baseline - (size === BIG ? BASELINE_OFFSET.big : BASELINE_OFFSET.small),
      fontFamily,
      fontSize: size,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      color: WHITE,
    }}
  >
    {text}
  </div>
);

const MakeFloor = () => (
  <Word text="MAKE" size={BIG} baseline={FLOOR_BASELINE} bearing={BEARING.M} />
);
const MakeStack = () => (
  <Word text="MAKE" size={SMALL} baseline={MAKE_BASELINE} bearing={BEARING.M} />
);
const ItFloor = () => (
  <Word text="IT" size={BIG} baseline={FLOOR_BASELINE} bearing={BEARING.I} />
);
const ItStack = () => (
  <Word text="IT" size={SMALL} baseline={IT_BASELINE} bearing={BEARING.I} />
);
const MatterFloor = () => (
  <Word text="MATTER" size={BIG} baseline={FLOOR_BASELINE} bearing={BEARING.M} />
);

export const MakeItMatter = () => (
  <AbsoluteFill style={{backgroundColor: BACKGROUND}}>
    <TransitionSeries>
      <TransitionSeries.Sequence name="1 MAKE" durationInFrames={39}>
        <MakeFloor />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence name="2 MAKE / IT" durationInFrames={27}>
        <MakeStack />
        <ItFloor />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence name="Black" durationInFrames={6}>
        <AbsoluteFill />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence name="3 MAKE / IT / MATTER" durationInFrames={78}>
        <MakeStack />
        <ItStack />
        <MatterFloor />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
