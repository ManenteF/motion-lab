# Iterative Feedback

The user steers by giving creative feedback in natural language. Treat it as **direction**, change **only what is necessary**, and keep everything that is approved.

## Principles

1. **Targeted changes.** Identify the exact part the feedback is about (an entrance, an exit, one layer, one timing, the typography) and change that. Don't rebuild the piece.
2. **Preserve approved elements.** If the user says "the entrance is good", "keep everything except the typography", or hasn't criticized something, leave it as it is — same timing, same assets, same look.
3. **Don't reset.** Work on the existing version. Create a new version (V2, V3…) beside the previous one rather than overwriting, so comparison is possible.
4. **Don't reintroduce rejected ideas** (a technique, an easing character, an effect the user rejected) unless there is a clear reason — and if so, say why.
5. **Interpret, then act.** Translate the feedback into a concrete change, apply it, and tell the user in one or two lines what changed and what to watch.
6. **Ask only when the feedback is ambiguous in a way that changes the result materially.** Otherwise make the best interpretation and note it.
7. **Look at the result.** After each change, inspect the relevant frames/ranges before reporting. Say which part you changed and which you left alone.

## Feedback → what to look at (starting points, not a script)

| Feedback | Likely causes to check | Typical targeted changes |
|---|---|---|
| "This feels amateur" | Generic easing, uniform timing, everything moving at once, unclear hierarchy, weak intermediate frames, decorative effects, un-designed typography | Re-time phases (holds, accelerations), cut movement that has no purpose, rework the weakest in-between frames, tidy hierarchy and alignment |
| "Make the movement drier" | Too much ease/overshoot/softness, long glides, blur, bounce | Shorten decelerations, harder stops, constant-speed phases, reduce/remove overshoot and blur, add holds |
| "More snappy / punchier" | Slow starts, long settles, low contrast between fast and slow | Faster launches, shorter settles, bigger speed contrast, tighter holds before impacts |
| "Too slow" | Long durations/holds, gentle easing, sparse density | Cut frames from travel and holds, increase density, trim dead time |
| "Too fast / frantic" | Little rest, similar speeds, dense cuts | Add holds, vary speed contrast, spread events |
| "Floaty" | Long ease-outs, no impact, no weight | Sharper deceleration, firmer arrivals, add anticipation/weight cues |
| "Stiff / mechanical" | Linear/symmetrical motion, regular intervals, no overlap | Asymmetric timing, irregular rhythm, purposeful overlap, arcs where natural |
| "The entrance is good but the exit is weak" | Exit shares entrance logic, no intent, abrupt | Rebuild the exit only (own timing/easing/direction); leave the entrance untouched |
| "The camera is too synthetic" | Flat scale as dolly, symmetric ease, no parallax | Real perspective or declare a flat graphic move; ramp the move like a real camera; remove fake depth cues |
| "Too much going on" | Competing movement, too many effects | Rank elements, remove/soften lower-priority motion, add stillness |
| "Not enough going on" | Large static areas without purpose, thin rhythm | Add support motion or texture that serves the idea, or strengthen the hero's motion |
| "Looks like web animation" | Uniform easing, fade+scale entrances, UI-style transitions | Replace defaults with behavior from the reference/concept; vary timing; use cuts/holds |
| "The typography is wrong" | Hierarchy, kerning, breaks, motion unit | Refine type design; change unit of motion (word/line/block) |
| "This doesn't match the reference closely enough" | Timing, acceleration, path, scale, mask or camera behavior diverge | Re-measure the reference vs. your result at the same moments; correct the specific behavior; report remaining gaps |
| "Keep everything except X" | — | Change X only; confirm unchanged elements are untouched (diff frames) |

## Working method

1. Restate the feedback as a concrete target in a sentence (internally or briefly to the user).
2. Locate the exact frames/layers/parameters involved.
3. Make the smallest change that addresses it.
4. Re-render only what's necessary (a preview of the affected range if possible).
5. Inspect: the changed range, plus the frames just before and after, plus a frame from an unchanged area to confirm it is untouched.
6. Report: what changed, what you deliberately left alone, what to review. Attach the new version.

## Keeping track

- Keep a short running list in the conversation (or a small notes file beside the project) of: approved elements, rejected ideas, open questions. Refer to it before changing things.
- Version names: `name-v1`, `name-v2`… Keep earlier files so the user can compare.

## When to step back and re-propose

Only when feedback implies the **direction** itself isn't working ("this isn't what I meant", "the whole idea feels wrong"), or when several rounds of targeted fixes keep failing. Then offer 2–3 new, distinct directions (see `ideation-and-directions.md`) and keep what the user liked.
