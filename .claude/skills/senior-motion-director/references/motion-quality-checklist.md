# Motion Quality Checklist

Use this at three gates: before building (concept and frames), before rendering (review pass), and when critiquing existing work. The goal is to find generic or unnecessary technique **before** it reaches a render.

## Gate A — Before building

### Concept
- [ ] Communication objective written in one sentence.
- [ ] Visual idea named (a mechanism or an image, not an adjective).
- [ ] Brand relationship stated: which shapes, type, materials, rhythm or voice of the identity does the motion express?
- [ ] Reason for every transition/reveal written down.
- [ ] "What stays still" lists at least one element/phase and says why.
- [ ] fps chosen (24 / 25 / 30) from the delivery target.

### Hero frames
- [ ] Opening, hero, transition (if any), and end frames defined as compositions.
- [ ] Each frame works as a still (hierarchy, balance, type, margins).
- [ ] Per-aspect compositions considered, not rescaled copies.

### Hierarchy
- [ ] For every shot: one hero movement, support movement, texture/ambient (texture may be none).
- [ ] No two movements compete for primary.

### Timing sheet
- [ ] Moves written in frames with phases and holds.
- [ ] Easing chosen by intention; no unjustified spring/bounce/overshoot/easeOutExpo/Material curve.
- [ ] Justification ledger complete for every banned default being used.

## Gate B — The review pass (before rendering)

Answer each question honestly. "I don't know" counts as a failure.

| # | Question | How to test it |
|---|---|---|
| 1 | What is the hero movement? | Say it in one sentence per shot. If you need "and", there are two heroes. |
| 2 | Is any movement unnecessary? | **Remove-one test**: disable each animated layer in turn. If the message survives, delete it. |
| 3 | Could this be simpler and stronger? | Try a version with half the movements, longer holds and one hard cut. Compare. |
| 4 | Does anything look like web animation? | Check the **web-animation tells** below. Watch it muted on a large screen. |
| 5 | Is any spring, overshoot or stagger used by habit? | List every one. Each needs a ledger line with a concept reason. No line → remove. |
| 6 | Are the intermediate frames well composed? | **Scrub test**: step through the transition frame by frame; export 3–5 in-betweens as stills and judge them as layouts. |
| 7 | Does the typography remain designed at every important frame? | **Freeze test**: pause at the hero frame, the transition frame and the end frame; check kerning, breaks, balance, margins. |
| 8 | Does the motion reinforce the concept? | State the concept; ask whether each movement is an instance of it. |
| 9 | Does the transition originate from the visual language? | Name the shape, edge, color or brand element the transition is built from. If none, it is decoration. |
| 10 | Does the camera feel physically or graphically intentional? | Is it a declared 2D graphic move or a believable camera with depth? Any flat-frame scale "dolly" must be declared. |
| 11 | Does any effect reveal the underlying implementation technique? | Look for the **technique-reveal list** below. |
| 12 | Would this still look sophisticated without glow, blur, particles or gradients? | **Strip test**: turn them all off. If the piece collapses, the idea was in the effects, not the design. |

If any answer reveals a generic or unnecessary technique, revise before rendering.

### Extra tests

- **Mute test:** watch without sound. Is the hierarchy clear? Then with sound: does sound reinforce the hero rather than every beat?
- **Squint / thumbnail test:** at tiny size, is the hero frame still the clearest frame?
- **Reverse test:** play the beat backwards mentally — does the order of events have a reason?
- **End-frame test:** is the end frame a designed layout that holds without motion?
- **Hold test:** count the holds in the piece. None means no rhythm.
- **One-wow test:** identify the single biggest moment. If you can name two, one is cancelling the other.

## Web-animation tells

If several of these appear, the piece reads as interface motion rather than motion design:

- Every element enters with the same fade + small scale or rise.
- One easing curve used on everything; one duration repeated.
- Equal-interval staggers on lists, words or letters.
- Soft bounce/overshoot on arrivals, especially titles and icons.
- Content "slides in from the right/below" as in a navigation UI.
- Hover/press/toggle gestures used as storytelling devices.
- Everything is always moving (ambient drift, floating, pulsing loops).
- Gradient blobs, glow, particles, glass panels as a background "for depth".
- Camera = whole-frame scale with a blur ramp.
- Transitions are wipes/whips/slides chosen from a menu.

## Technique-reveal list

An effect "reveals the technique" when the viewer sees the tool instead of the idea:

- A transition that is obviously a stock preset.
- Per-letter/per-word cascades that look like a plugin.
- Parallax at suspiciously regular ratios.
- Blur ramps/vignettes added to hide a weak move.
- Loops that are visibly cyclic.
- Particles with no narrative role.
- A glow added to make flat elements feel "finished".
- Text that clearly reflows or snaps between layout states mid-animation.

## Gate C — Critiquing an existing piece

1. Watch it once without stopping; write what you *felt* and what you *understood*.
2. Identify the hero in every shot. Mark shots that have none or two.
3. Run the remove-one, strip and scrub tests.
4. List all banned defaults present and ask for the ledger line.
5. Recommend changes in order: remove → simplify → re-time (holds, hard stops) → change mechanism → only then add anything.

## Justification ledger (template)

Keep in the brief; update as decisions are made.

```
JUSTIFICATION LEDGER
- JUSTIFIED: <technique> on <element/shot> — <concept reason tied to brand/idea> — <limits: amount, count, frames>
- JUSTIFIED: ...
(Banned defaults NOT on this list are not allowed in the build.)
```

Banned-default reminder: opacity 0→1 + scale 0.95→1 entrances · spring on titles · bounce on settle · overshoot on every arrival · stagger every element · mesh gradients · particle constellations · teal-and-orange grading · slow gradient drift as "premium" · generic parallax on every layer · fake dolly by scaling a flat frame · automatic blur ramps · UI navigation metaphors for scene transitions · micro-bounce on musical impacts.

## Gate D — Release

- [ ] Review pass completed; revisions made.
- [ ] Studio preview checked at full frame rate (not just stills).
- [ ] Ledger matches what is actually in the build.
- [ ] Render only on explicit user request (official Remotion workflow).
