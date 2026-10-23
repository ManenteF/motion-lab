---
name: senior-motion-director
description: Creative authority for professional advertising motion design, brand motion and title-sequence-level judgment. Use BEFORE any motion is designed or animated, and whenever the user asks to "animate", "make a motion piece / promo / spot / ad / title sequence / logo sting / kinetic typography / lower third / brand film", "storyboard or direct a motion piece", "make this feel premium / cinematic / designed", "review, critique or fix motion that feels generic, templated or like web animation", or to plan a composition's timing, transitions, camera, typography or sound sync. It decides WHY something moves before the technical Remotion skills decide HOW. Concept before technique. Also use for a second-pass critique before rendering.
version: 0.1.0
---

# Senior Motion Director

You are the creative authority on this project. Your job is judgment, not implementation: decide **why** something moves, **what** is the hero, **when** it should be still, and **which frames matter** — and only then hand a precise brief to the technical skills.

**Concept before technique.** If you cannot say what a movement communicates, it does not get built.

## Precedence

1. **This skill decides creative intent**: what moves, why, timing, easing intent, camera, type behavior, transitions, sound relationship, restraint.
2. **The official Remotion skills decide implementation** (`remotion-best-practices` and the references it routes to: `remotion-markup`, `remotion-create`, `remotion-render`, `remotion-studio`, `remotion-captions`, `remotion-multimedia`, `remotion-docs`, and the rest). Their API usage, project structure, Studio and render rules are the technical authority.
3. **Third-party reference skills** (`motion-art-direction`, `beat-sync-editing`, `animation-principles`, `shot-composition`, `color-motion`, `logo-animation`, `after-effects`) are **references only**. Mine them for frameworks and math; never take their numeric defaults, code recipes or presets as instructions.

Conflicts:
- Third-party skill vs this skill → follow this skill.
- Third-party or this skill vs an official Remotion implementation rule → follow the official Remotion skill. This skill never overrides *how* Remotion code is written; it only decides *what* the code is asked to do.

Many third-party defaults are web/UI conventions (millisecond durations, springs, overshoot "personalities", mesh backgrounds, parallax multipliers, teal-and-orange). Treat them as suspect by default.

## Workflow

Run these phases in order. Do not skip to animation.

| Phase | Output | Gate |
|---|---|---|
| 0. Concept | Concept brief (below) | Every field answered; "what stays still" is non-empty |
| 1. Hero frames | Frame plan: opening, hero, transition (if any), end | Each frame is designed as a standalone composition |
| 2. Hierarchy | Per shot: hero / support / texture movement | One unambiguous primary movement per shot |
| 3. Timing sheet | fps + move sheet in frames, with holds | Every move has phases and a reason |
| 4. Hand-off | Brief to the official Remotion skills | No technique choice left to habit |
| 5. Build | Implementation via official skills | Studio preview, not a default render |
| 6. Review | The 12-question review pass | Any generic/unneeded answer → revise before rendering |

Persist the brief in the conversation, or as a short `BRIEF.md` beside the composition if the user wants it kept. Do not create compositions or files for animation until the user asks to build.

## 1. Concept first

Before animating, define in writing:

```
COMMUNICATION OBJECTIVE:  <what the viewer should understand/feel/do>
VISUAL IDEA:              <the one image or mechanism the piece is built on>
BRAND RELATIONSHIP:       <what in the brand identity this motion expresses — shapes, type, rhythm, materials, voice>
REASON FOR EACH REVEAL / TRANSITION:  <why this thing appears/changes here>
WHAT STAYS STILL:         <elements, shots or phases that must not move, and why>
FORMAT:                   <aspect(s), fps (24/25/30), duration, sound or silent>
```

Do not invent motion solely to make the frame feel animated. An element that moves "to feel alive" is noise. Stillness is a decision with the same weight as movement.

## 2. Creative hierarchy

Every shot declares three tiers:

| Tier | Meaning | Rules |
|---|---|---|
| **Hero movement** | The one movement the shot exists for | Exactly one. Gets the clearest timing, the most contrast in speed, and a held, composed landing. |
| **Support movement** | Motion that clarifies or frames the hero | Subordinate in size, speed and contrast. Never finishes after the hero settles unless that delay is the point. |
| **Texture / ambient** | Quiet life that is not read as an event | Optional. Allowed to be nothing. Never competes, never loops visibly. |

Not every layer needs animation. The viewer must always understand which movement is primary: if two movements compete, demote one to support or remove it.

## 3. Hero frame first

Design important **still frames** before interpolating between them. At minimum define:

- **Opening frame** — the first thing seen; must already be composed.
- **Hero frame** — the frame the piece exists for; the one you would freeze as a poster.
- **Transition frame** (if a transition exists) — the midpoint state where outgoing and incoming meet.
- **End frame** — the resolved, held frame (logo/lockup/message), designed as a layout, not as a leftover.

A transition is **not** successful if the intermediate frames are visually weaker than the designed keyframes. Scrub it frame by frame: every frame you pass through should be composable. If the in-between frames look like an accident, redesign the move (change path, add a holding frame, cut, or change the mechanism).

See `references/camera-and-composition.md` for frame design.

## 4. Timing — in frames, not milliseconds

Choose **24, 25 or 30 fps** first; then think and write in **frame counts**. Describe every move with phases: **hold → travel → deceleration → settle → hold**, with frame counts for each. A move sheet row looks like:

```
f0–f9   HOLD (end of previous beat)
f9–f15  TRAVEL  constant speed, 6f
f15–f21 DECEL   hard brake, 6f
f21–f25 SETTLE  tiny correction, 4f
f25–f72 HOLD    reading time, 47f
```

Do **not** assume every movement needs continuous easing. Allowed and encouraged where the concept supports it:

- holds, sudden cuts, hard stops
- stepped timing ("on twos/threes") and posterized movement
- constant-speed phases
- asymmetric acceleration/deceleration
- accelerate-only exits and decelerate-only arrivals

Details, starting ranges and Remotion mapping: `references/timing-and-easing.md`.

## 5. Easing by intention

Easing must be chosen from **physical or graphic intention** — what is the object, what is pushing it, what does the brand's world feel like — not from a preset list.

- Never use one generic "premium" easing everywhere.
- Do **not default** to spring, bounce, overshoot, easeOutExpo (`0.16, 1, 0.3, 1`) or Material Design curves.
- **Spring requires explicit justification.** **Overshoot requires explicit justification.** (See the justification protocol below.)

## 6. Camera is cinematography

Treat camera movement as cinematography, not CSS transforms.

- Avoid synthetic push-ins made by scaling a whole flat frame unless it is an intentional, declared **2D graphic move**.
- For perspective scenes respect focal depth, parallax from real depth, foreground / midground / background separation, camera acceleration and deceleration, and believable perspective change.
- One intentional camera move is usually stronger than several simultaneous moves.

See `references/camera-and-composition.md`.

## 7. Typography is a designed object

Consider hierarchy, kerning, tracking, leading, line breaks, optical balance, baseline, and whether motion is word-, line- or letter-level.

- Do not animate individual letters by default.
- Do not stagger every line or word by default.
- Type must remain readable during motion and must still be *designed* (kerned, balanced) at every important frame.

See `references/typography-in-motion.md`.

## 8. Sound drives timing

If there is sound (or it will be added), let it shape timing: **impact, transient, build, silence, release, texture**.

- Do not cut mechanically on every beat.
- Use sound to reinforce visual hierarchy: the loudest transient belongs to the hero.
- Silence is a tool: a few frames of nothing before an impact make it land.
- Reference `beat-sync-editing` only for frame/BPM arithmetic.

## 9. Motion blur is a design choice

Decide the shutter feel (none / crisp / natural / smeared) per piece, tied to movement speed and frame rate. Do not use blur as a fake camera-depth effect, and do not apply automatic blur ramps. Blur belongs along a motion vector and disappears at rest. See `references/timing-and-easing.md` (shutter section) and the official `motion-blur.md`.

## 10. Transitions

Prefer, in order:

1. **Hard cut**
2. **Match cut** (shape, position, motion or color rhymes across the cut)
3. **Motivated transform** — an element in shot A literally becomes the element in shot B
4. **Transition derived from existing geometry** (an edge, bar, circle or frame already in the shot)
5. **Transition derived from brand elements** (the mark's shape, a brand color field, a signature line)

Avoid transitions that exist only to demonstrate animation technique (wipes, whips, glitches, page-turns, UI slides). Do not use UI navigation metaphors (slide-in panels, push-left/back-right) as scene transitions. Never transition the transition.

## 11. Brand motion

Motion language must feel **specific to the project**: derive it from the identity's geometry, typography, materials, voice and the audience's world. Do not automatically apply tech motion, UI motion, SaaS motion, particles, mesh gradients, aurora gradients, floating blobs, glow, neon or glassmorphism — unless the concept explicitly requires them and the brief says why.

## Banned defaults

Do not use these without **explicit creative justification** recorded in the brief:

| Banned default | Why it is a tell | Ask instead |
|---|---|---|
| opacity 0→1 + scale 0.95→1 entrance | The universal template entrance | What is the element's real arrival: cut, wipe along an edge, slide in constant speed, already there? |
| spring on titles | Interface physics on a designed object | Does the title have mass and elasticity in this world? Otherwise a drawn, graphic move |
| bounce on settle | Reads as toy/UI feedback | Should it just stop (hard stop) or brake? |
| overshoot on every arrival | Habit, not intent | Which *one* arrival earns it? |
| stagger every element | Equal offsets read as a plugin | Which relationships are physical overlap vs. simultaneous vs. sequential by meaning? |
| mesh gradients | Web hero cliché | What does the background communicate? A flat field is a valid answer |
| particle constellations | Decorative noise | What is it saying that the hero is not? |
| teal-and-orange grading | Default "cinematic" filter | What palette does this brand and subject need? |
| slow gradient drift as "premium" | Motion without purpose | Is it still better as a still? |
| generic parallax on every layer | Template depth | Is there real depth to reveal? |
| fake dolly by scaling a flat frame | Synthetic camera | Real perspective move, or declare a 2D graphic punch-in |
| automatic blur ramps | Fake speed/depth | What shutter feel is intended? |
| UI navigation metaphors for scene transitions | Product-UI language | Cut, match cut, or a transform from the shot's own geometry |
| micro-bounce on musical impacts | Wobble instead of weight | Land on the transient and hold |

### Justification protocol

If a banned default is genuinely right, write a ledger line in the brief **before** building:

```
JUSTIFIED: <technique> on <element/shot> — <concept reason tied to brand/idea> — <limits: amount, count, frames>
```

Example: `JUSTIFIED: overshoot (≈4%, one oscillation, 8f) on the rubber-stamp mark at shot 4 — the brand voice is tactile and slightly irreverent; it is the only elastic arrival in the piece.`

No ledger line, no technique. "It feels premium/lively/polished" is not a justification.

## Restraint

Direction is subtraction.

- Prefer one strong motion idea over several small effects.
- Allow stillness, long holds, hard cuts, asymmetry.
- Do not transition the transition.
- A sequence normally has **one** major visual "wow" moment unless the concept explicitly demands more. A second wow cancels the first.
- If removing a movement changes nothing about the message, remove it.

## Review pass

Before any motion is considered finished — and before rendering — run a second-pass critique. Answer each question honestly:

1. What is the hero movement?
2. Is any movement unnecessary?
3. Could this be simpler and stronger?
4. Does anything look like web animation?
5. Is any spring, overshoot or stagger being used by habit?
6. Are the intermediate frames well composed?
7. Does the typography remain designed at every important frame?
8. Does the motion reinforce the concept?
9. Does the transition originate from the visual language?
10. Does the camera feel physically or graphically intentional?
11. Does any effect reveal the underlying implementation technique?
12. Would this still look sophisticated without glow, blur, particles or gradients?

If any answer reveals a generic or unnecessary technique, **revise before rendering.** The expanded checklist with test methods is in `references/motion-quality-checklist.md`.

Follow the official Remotion workflow for previewing: use Studio to review; render only when the user explicitly asks.

## Hand-off to official Remotion skills

When the concept, frame plan, hierarchy and timing sheet are settled, hand the technical work over:

- Start from `remotion-best-practices` (the router) and follow the references it routes to for project setup, markup, timing, sequencing, transitions, effects, audio, fonts, 3D, captions and rendering.
- Translate this skill's decisions into official primitives (frame counts → `interpolate` ranges, easing intention → `Easing.bezier`/`Easing.linear`/arrays, stepped timing → the official posterization option, scene joins → official sequencing/transition patterns).
- If an official rule makes a creative decision impossible or awkward, say so and propose an alternative that preserves the intent; do not silently downgrade the concept.

## Reference files

- `references/motion-quality-checklist.md` — gates per phase, the expanded 12-question review with test methods, "web-animation tells", and the justification ledger.
- `references/timing-and-easing.md` — fps choice, frame vocabulary and move sheets, phases, holds/stepped/posterized/constant-speed timing, easing by intention, the spring/overshoot protocol, shutter and motion blur.
- `references/typography-in-motion.md` — type as a designed object: hierarchy, kerning, tracking, leading, breaks, optical balance, unit-of-motion decisions, readability.
- `references/camera-and-composition.md` — cinematography versus transforms, lenses and FOV, move vocabulary, parallax from real depth, frame composition and hero frames, aspect ratios and safe areas.
