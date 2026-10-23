# Camera and Composition

Craft reference for camera and composition. Treat the camera as cinematography: a virtual camera can behave like something that could physically exist, or like a deliberately flat graphic world — the difference is whether the move is *intended*. A CSS-style transform applied to everything is a warning sign, not a prohibition. When a reference's camera is the point (handheld, whip, orbit, synthetic zoom), matching it takes precedence over the guidance here.

## 1. Decide the world first

Every shot is one of two kinds. Declare which.

| World | Rules |
|---|---|
| **2D graphic** | Flat layers, designed as a poster that happens to change. Moves are graphic: slides, wipes, cuts, scale-as-layout. No simulated lens. Depth cues are absent or deliberately illustrative. |
| **Perspective (2.5D / 3D)** | A real or believable camera in a space with depth. Lens, parallax, focus and camera inertia matter. Layers sit at real distances. |

Mixing the two without intent produces the "template" look: flat layers scaled and blurred to *suggest* a camera. Pick one per shot; a deliberate cut between worlds is fine.

## 2. The fake-dolly problem

Scaling a whole flat frame (`scale 1.0 → 1.12`) is not a dolly:
- there is no parallax between near and far elements,
- there is no perspective change,
- type and edges simply get larger and softer.

It is a perfectly good **2D graphic move** when intended (a graphic "punch-in" on a poster-like frame, or type that scales as a layout gesture, or the reference does exactly this). It becomes a warning sign when it is passed off as a camera dolly — especially when dressed with blur ramps or depth fakery. Know which one you're making.

For a real push-in: move a perspective camera along its axis through layers/objects at different depths (parallax emerges automatically), or change focal length deliberately and know that a zoom is *not* a dolly (zoom keeps relative depth, dolly changes it).

## 3. Lens and field of view

Choose a lens like a cinematographer. Approximate FOV for a Super 35-style sensor (~24.9 mm wide), 16:9:

| Focal length | Horizontal FOV | Vertical FOV | Feel |
|---|---|---|---|
| 24 mm | ~55° | ~33° | Wide, exaggerated depth, stronger parallax |
| 35 mm | ~39° | ~23° | Natural-wide, versatile |
| 50 mm | ~28° | ~16° | Neutral, calm perspective |
| 85 mm | ~17° | ~9° | Compressed, flattened depth, intimate |

```
hFOV = 2 · atan(sensorWidth / (2 · focalLength))
vFOV = 2 · atan( tan(hFOV/2) · height/width )
```

Three.js (`PerspectiveCamera.fov`) takes the **vertical** FOV. Longer lenses flatten depth and reduce parallax between layers; shorter lenses exaggerate it. Choose from the concept: a wide lens for space and energy, a long lens for intimacy and product beauty. If Remotion is the chosen tool, see the official `3d.md` for the Remotion + Three.js implementation.

## 4. Camera move vocabulary

Name the move and what it does. If you cannot, you do not need it.

| Move | What changes | Use when |
|---|---|---|
| **Static (locked-off)** | Nothing; the world moves | The default. A locked frame with a strong composition is a confident choice |
| **Pan / tilt** | Camera rotates in place; no parallax | Following action, revealing space, a looking motion |
| **Truck / pedestal** | Camera translates sideways/vertically; strong parallax | Reveals depth and layering |
| **Dolly in/out** | Camera moves along its axis; perspective and parallax change | Intimacy, emphasis, reveal |
| **Zoom** | Focal length changes; no parallax change | A graphic, observational feel; use knowingly |
| **Crane / jib / arc** | Combined translation with arc | Establishing, grandeur; needs real depth to read |
| **Orbit** | Camera circles the subject | Product/object showcase; one clear subject |
| **Handheld** | Irregular micro-motion | Documentary/immediate worlds; an automatic "shake" layer on everything is a warning sign |
| **Whip pan** | Fast pan used as a cut | When the whip *is* the cut and is motivated (or the reference does it); otherwise a plain cut may be stronger |
| **Rack focus** | Focus plane shifts between depths | With real depth separation between subjects that matter |

**One intentional camera move** is usually stronger than several simultaneous moves; combined push + pan + rotate works when the combined arc is the idea (and reads clearly), and chaotic multi-axis camera work can be right for chaotic concepts.

## 5. Camera acceleration and deceleration

Real cameras (operators, dollies, cranes, robots) carry inertia:
- They **ramp up** from rest, travel, then **ramp down** — rarely a symmetric, same-length ease.
- Long moves (48–144+ frames at 24 fps) read as committed; short, sudden camera moves read as a cut or a whip.
- A robotic/motion-control look is **constant speed with brief ramps**; a human-operated look has uneven, slightly late ramps.
- Start or stop a move on a hold: a camera that starts the moment a shot begins, and stops the moment it ends, has no composed frame to land on.
- Using the same easing for every camera move, or the same easing as the object animation in the shot, flattens the result; vary by intention.

Designing the move: choose start frame (composed), end frame (composed), travel type (constant, ramped), and total frames; then check the middle frames as compositions (see below).

## 6. Parallax from real depth

Parallax is a **consequence** of depth, not a per-layer multiplier.

- Place layers/objects at real distances in the scene; move the camera; let perspective produce the parallax.
- Foreground / midground / background separation should be designed: what is in front, what is the subject, what is behind, and why. A layer with no depth reason has no reason for parallax.
- Assigning arbitrary speeds (0.2×/0.6×/1.2×) to every layer by habit is a warning sign; derive speeds from depth (or from the reference).
- A flat 2D graphic shot has no parallax; adding it turns it into a faux-3D shot — fine if that's the idea, awkward if it's accidental.

## 7. Depth of field and focus

- Depth blur reads best where depth is established (a foreground/background relationship exists) and the focal plane has a reason to be there.
- Focus choice is composition: it tells the viewer what matters.
- Blurring the background "to look premium," or ramping blur to fake camera movement, is a warning sign.
- A rack focus is strongest between two subjects the viewer cares about.

## 8. Composition: frames are designed, not accidental

Design the frames you care about as standalone compositions (see hero-frame section below).

Principles to evaluate (as judgments, not formulas):
- **Hierarchy** — what is read first, second, third (size, contrast, color, position).
- **Negative space** — emptiness is active; a small hero in a large space is a statement.
- **Weight and balance** — symmetric (formal, calm, iconic) vs asymmetric (dynamic, tense). Centered frames are often exactly right for logos, products and brand statements; thirds are a tool, not a rule.
- **Lead room / look room** — space in the direction of travel or gaze.
- **Headroom and edges** — what crosses the frame edge, and does it feel cropped or intentional?
- **Baseline and grid alignment** — consistent anchor lines across shots so the cut feels designed.
- **Scale relationships** — the ratio between hero and everything else.

## 9. Hero frames and intermediate frames

Per shot define:
1. **Opening frame** — composed.
2. **Hero frame** — the poster frame.
3. **Transition frame** — if a transition exists, the midpoint where A and B overlap.
4. **End frame** — resolved and held.

Then **scrub every in-between**. Questions:
- Is any intermediate frame cluttered, clipped, or unbalanced in a way the keyframes are not?
- Do overlapping elements collide in a way that looks like an accident?
- Does type pass through a state where it is illegible or badly kerned?
- If a frame were exported as a still, would it embarrass the designer?

If intermediate frames are weaker than the keyframes: change the path (so elements avoid collisions), add a holding frame, shorten the travel (reduce the number of exposed frames), cut instead, or change the mechanism.

## 10. Aspect ratios and safe areas

- Choose the **hero aspect** first; adapt others by **restacking**, not cropping.
- Keep critical content inside title-safe margins; verify platform UI zones (they change — treat the numbers in `shot-composition` as a starting point and verify per platform).
- Vertical formats usually need larger type and a higher focal point to clear bottom UI.
- Decide per aspect: new composition, not a rescaled copy. Re-run the hero-frame check for each.
- If Remotion is the chosen tool, the official `remotion-create/video-layout.md` covers video-first layout and sizing guidance.

## 11. Quick camera and composition review

- Is it clear per shot whether the world is a flat graphic one or a perspective one?
- If a flat frame is scaled, is it an intended graphic move rather than a pretend dolly?
- If perspective: is a lens/FOV chosen and the move named?
- Does the camera idea read clearly, with composed start and end frames?
- Are acceleration and deceleration designed, not defaulted?
- Does parallax come from real depth (or the reference), not per-layer multipliers by habit?
- Does depth blur have established depth and a focus reason?
- Are the opening, hero, transition and end frames designed, and the in-betweens scrubbed?
- Is each aspect ratio composed on its own terms?
