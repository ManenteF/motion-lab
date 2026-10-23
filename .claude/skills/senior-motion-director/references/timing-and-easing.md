# Timing and Easing

Craft reference: timing is best thought of in **frames**, easing in **intention**. Numbers here are **starting points to be judged by eye on real frames/playback**, not presets and not rules. They describe common ranges; a reference, a concept or a brand will often call for something quite different. Consult this when it helps; don't apply it automatically.

## 1. Choose the frame rate first

| fps | Where it belongs | Feel |
|---|---|---|
| **24** | Cinema, film-style spots, title sequences, anything that should feel photographic | Slight strobe on fast moves; motion blur matters; holds feel weighty |
| **25** | PAL/European broadcast and many European deliverables | Close to 24; the same frame-thinking applies |
| **30** | Web/social, US broadcast graphics, UI-adjacent content | Smoother, more "digital"; the same frame count moves ~25% faster than at 24 |
| **60** (and others) | Smooth UI-like motion, high-frame-rate delivery, slow-motion source | Very smooth; needs fewer blur tricks, shifts the feel toward interface/gaming; use when delivery or concept calls for it |

A reference's frame rate is a strong hint: match it when matching its behavior.

Rules:
- Pick fps from the **delivery target**, then write all timing in frames. Do not design in seconds and convert at the end: the same 12-frame move is a different gesture at 24 and 30 fps.
- If a piece may ship at two frame rates, re-time it; do not just re-label it.
- When seconds are unavoidable (e.g. audio markers), derive them from the project's fps in code instead of hard-coding, but keep the *creative* timing sheet in frames. (In Remotion, read `fps` from `useVideoConfig()` — official rule.)

### Frames ↔ time

| Frames | 24 fps | 25 fps | 30 fps |
|---|---|---|---|
| 1 | 0.042 s | 0.040 s | 0.033 s |
| 2 | 0.083 s | 0.080 s | 0.067 s |
| 3 | 0.125 s | 0.120 s | 0.100 s |
| 6 | 0.250 s | 0.240 s | 0.200 s |
| 12 | 0.500 s | 0.480 s | 0.400 s |
| 24 | 1.000 s | 0.960 s | 0.800 s |
| 48 | 2.000 s | 1.920 s | 1.600 s |

## 2. The phase model

Describe every movement as phases, not as "a 0.5 s ease":

| Phase | What it is | Notes |
|---|---|---|
| **Hold-in** | Stillness before the move | Gives the eye time to find the object; an unannounced move gets missed |
| **Anticipation** (optional) | A small counter-move before the main action | Only if the object has physical mass worth telegraphing |
| **Travel** | The body of the move | Can be constant speed, accelerating, or decelerating |
| **Deceleration** | Arrival braking | How the object loses speed: hard brake, long glide, none (hard stop) |
| **Settle** | Tiny corrections after arrival | Optional; only with a physical reason |
| **Hold-out** | Resolved, composed stillness | Readable; the hero frame lives here |

### Move sheet format

```
SHOT 3 — HERO: title bar crosses frame            24 fps
f0–f10    HOLD     previous beat finishing; bar offscreen
f10–f16   TRAVEL   constant speed, enters from frame edge, 6f
f16–f22   DECEL    hard brake to rest on baseline grid, 6f
f22–f26   SETTLE   none (hard stop) — deliberate: brand is architectural
f26–f74   HOLD     reading time for 3-word title, 48f
SUPPORT: rule line draws under the title f20–f28, constant speed (arrives after the hero lands)
TEXTURE: none
```

## 3. Starting ranges (frames at 24 fps — scale thoughtfully, don't multiply blindly)

| Role | Frames | Notes |
|---|---|---|
| Hit / flash / cut-level accent | 1–3 | Lands on a sound transient; do not ease something this short |
| Snap / slam travel | 3–6 | Aggressive, graphic; hard brake or hard stop |
| Standard element travel | 8–16 | Most supporting elements |
| Hero element travel | 14–30 | Longer = heavier or more elegant, not automatically better |
| Type resolve (a line or word arriving) | 8–20 | Readable only once it stops (see typography) |
| Settle tail | 4–10 | If used at all |
| Camera move | 48–144+ | Long, committed; see camera reference |
| Pre-impact silence / hold | 4–12 | Makes a transient land |
| Reading hold, 1–3 words | 24–48 | Test by watching at speed, then add a little |
| Reading hold, each extra word | +6–10 | Longer for unfamiliar language/legal supers |
| End frame hold | 48–120+ | Let the lockup breathe; longer than feels necessary |

Speed/distance: if a body travels the same distance in half the frames it reads as lighter or more aggressive; heavy or elegant objects take longer *and* often have a longer deceleration, not a longer constant-speed travel.

## 4. Timing modes beyond "continuous easing"

All are valid when the concept calls for them.

**Holds.** Identical values across a frame range. The most underused tool: a held composition is a hero frame being given time to be read.

**Hard cuts.** A cut is a zero-frame transition. Use when a transition would only decorate.

**Stepped timing ("on twos / threes").** Update the value every N frames (N = 2 at 24 fps gives a 12 fps feel). Good for hand-made, tactile, graphic or stop-motion-like worlds. Do not mix stepped and smooth movement for the *same* layer unless contrast is the idea.

**Posterized movement.** Sample the motion only every Nth frame. In other tools, quantize the frame number before evaluating the curve (`f = floor(frame / N) * N`). In Remotion, use the official `posterize` option on `interpolate` (see the official `timing.md`):

```ts
interpolate(frame, [0, 24], [0, 1], {
  easing: Easing.linear,
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  posterize: 3, // only every 3rd frame is sampled
});
```

**Constant-speed phases.** `Easing.linear` is correct for: pass-bys, tickers, conveyors, camera mid-move, a bar crossing a frame, anything being carried at a constant rate. Linear is not "robotic" when the object is mechanical or carried.

**Asymmetric acceleration/deceleration.** Long acceleration + short brake (heavy launch, sudden stop), or the reverse (a fast launch + long glide). Choose the asymmetry from the object.

**Accelerate-only / decelerate-only.** Leaving the frame at speed (no deceleration — it should be gone before it slows). Arriving at speed and braking (no acceleration — it was already moving before we saw it).

**Multi-phase moves.** Give each phase its own character (piecewise curves in any tool). In Remotion, per official `timing.md`, pass an easing **array** with `n − 1` entries to `interpolate` with multiple keyframes, so each phase gets its own character:

```ts
interpolate(frame, [0, 6, 22, 28], [0, 0.35, 0.95, 1], {
  easing: [Easing.linear, Easing.bezier(/* travel→brake */ 0.2, 0.6, 0.4, 1), Easing.linear],
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```
(Values are illustrative; derive yours from the move sheet.)

**Overlap by relationship, not by plugin.** Offset linked elements by the amount a physical or logical link implies (a trailing label "dragged" 2–5 frames behind a bar; a shadow that tracks its object with 1–2 frames lag). Elements with no relationship move together or not at all. Never apply one uniform stagger to a list by default.

## 5. Easing by intention

Ask: **What is the object? What moves it? What does it do on arrival?**

| Intention | Character | Starting shape (Remotion `Easing` shown; the shape transfers to any tool — tune by eye) |
|---|---|---|
| Carried at constant rate (conveyor, ticker, camera mid-move) | Constant speed | `Easing.linear` |
| Mechanical slide that brakes at a stop (rail, slider, shutter) | Fast mid-travel, hard brake | `Easing.bezier(0.2, 0.6, 0.4, 1)` → brake gets harder as the first control rises and the second control approaches 1 |
| Thrown object landing / arrival at speed | Decelerate-only | `Easing.bezier(0, 0.7, 0.3, 1)` |
| Leaving frame (already gone before slowing) | Accelerate-only | `Easing.bezier(0.6, 0, 1, 0.6)` |
| Heavy object starting and stopping | Slow start, committed middle, controlled stop | A custom asymmetric `bezier`; long first half |
| Graphic snap (typographic slam, architectural stop) | Near-instant, hard stop | 3–6 frames with `Easing.bezier(0, 0.8, 0.2, 1)` or a straight cut |
| Tactile/hand-made world | Uneven, stepped | `posterize` + modest easing |
| Calm drift (rare, justified) | Barely perceptible constant speed | `Easing.linear`, very low velocity |

### Reading a bezier

`Easing.bezier(x1, y1, x2, y2)`:
- `y1` high relative to `x1` → fast start; `y1 ≈ 0` → slow start.
- `x2` low / `y2` near 1 → long soft approach; `x2 ≈ 1` with `y2 < 1` → arrives at speed (hard).
- Control `y` values outside 0–1 produce overshoot or anticipation (see the spring/overshoot section).

Draw it, then judge the **speed curve**, not the position curve. Position S-curves all look alike; speed curves differ.

### Habit warnings (not bans)

These are common reflexes that make motion feel generic when used everywhere. Any of them can be exactly right for a specific motion.

- **spring** on titles, logos or lockups by default
- **bounce** on settle by default
- **overshoot** on every arrival
- one **easeOutExpo** `(0.16, 1, 0.3, 1)` curve on everything — it makes everything feel identical
- **Material Design** curves — they encode UI navigation logic
- the curves in framework docs are API demonstrations, not creative recommendations

If you notice yourself reaching for one by reflex, ask: *what object is this, and why would it move this way?* If the answer is good (or the reference does exactly that), use it.

### Perceptual scale

Linear interpolation of scale looks front-loaded (the perceived size change is faster at small sizes). Interpolate scale perceptually (e.g. exponentially) in any tool; in Remotion the official guidance is `output: 'perceptual-scale'`. This is an implementation detail; it doesn't change the creative decision of whether to scale at all.

## 6. Springs, overshoot and bounce: when they work

They are tools like any other. They work when something in the piece has the physics, personality or reference behavior that calls for them.

Good reasons:
- The object is physically elastic or hung (rubber, cloth, pendulum, spring-loaded stamp), or the brand world is tactile.
- The brand voice or the reference is playful, bouncy or irreverent.
- A weighted object stops abruptly and the stop reads wrong without a small recoil.
- The reference does it.

Weak reasons: "it feels premium," "it feels alive," "everything else does it," "looks polished."

Tuning notes:
- Overshoot amplitude, count of oscillations and tail length define the character: a few percent and one oscillation reads as weight; large and many reads as cartoon. Choose deliberately.
- Concentrate them on the hero or on designed beats; using them on every element flattens hierarchy.
- Be careful with numbers/quantities, serious or financial content, and legal text, where bounce undermines credibility.
- A critically damped spring that does not oscillate is just a deceleration shape — judge it as that.
- A one-line note on why a spring/overshoot is there is enough; no ledger is required.

## 7. Holds are timing

- **Hold-to-read** — protects legibility; see the reading-time ranges above.
- **Hold-for-weight** — the held hero frame after an impact; stillness sells scale.
- **Pre-roll hold** — silence/stillness before the hit (4–12 frames); the hit is felt because of the gap.
- **Hold-out** — the end frame; hold longer than feels comfortable in review. If you are not sure, add 12 frames.

A piece with no holds has no rhythm. Count your holds in the review.

## 8. Shutter and motion blur

Motion blur is a **look decision**: choose it once per piece.

| Shutter feel | Angle (fraction of frame time) | Use |
|---|---|---|
| None / flat | 0° | Graphic, flat-design, stepped or posterized worlds |
| Crisp / staccato | ~45–90° | Hard, sharp, energetic; fast moves look cut-out |
| Natural | ~180° (0.5) | The default film look at 24 fps |
| Smeared | ~270–360° | Dreamlike, high-velocity smear; use with intent |

Blur length ≈ `speed (px per frame) × shutter fraction`. At rest it is zero. Therefore:

- Blur should follow the **motion vector**, scale with speed, and vanish when the object stops.
- Blur works when it communicates velocity or genuine depth/shutter feel; as a fake depth-of-field or "premium softness" it is a warning sign. Real depth blur needs an established depth relationship (see camera reference).
- Be careful with automatic ramps ("blur in, blur out") that exist to hide a weak move — fix the move first.
- Check at 24 fps: fast, un-blurred moves strobe — add intentional blur, shorten the move so it reads as a cut, or accept the strobe if the look calls for it.
- Blur can be applied selectively (e.g. only on the fast phases, sharp during measured phases) and tied to measured speed.
- Implementation depends on the tool. If Remotion is chosen, the official `motion-blur.md` states the preferred approach and preview requirements.

## 9. Quick timing review

- Is fps matched to delivery (or to the reference)?
- Do moves have phases, and are the holds placed on purpose?
- Is easing chosen from the object/intention (or the reference), not a reflex curve?
- Were constant-speed, stepped, accelerate-only or hard-stop options considered where they fit?
- Do overlaps come from relationships rather than a uniform stagger?
- Are reading holds long enough for the real text?
- Is the end hold generous?
- Is the shutter feel a decision, and does blur follow motion vectors?
