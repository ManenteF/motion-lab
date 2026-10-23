# Motion Quality: Review Lens

Use this to review a motion — a first version, a refinement, or an existing piece. It is a **lens for judging**, not a set of pre-creation rules. High-quality motion can be restrained, aggressive, chaotic, precise, minimal, maximal, cinematic, graphic, typographic, procedural, 3D, flat, fast or slow. The standard is whether it **serves this specific motion** — its reference, brand, concept, content, assets, audience and duration.

## 1. Inspect the actual result

The result is the authority, not the code or the timing numbers.

**What to look at**
- The **opening frame** and **final frame** as compositions (is the first frame composed? does the end frame hold up and match the source assets?).
- **Key states** (the frames you would freeze as stills) and the **intermediate frames** between them.
- **Transitions** and **cut points** — the frames just before/after, and the middle of any move.
- **Hero moments** and places where speed or direction changes.
- **Playback feel**: rhythm, judder, flow, and density over time.
- The **reference at the same moments**, when there is one.

**How to inspect (what you can do)**
- Render stills of specific frames and view them; build contact sheets (every N frames overall, every frame around transitions).
- Spot-check frames from the **encoded video**, not just from the source composition (compression and encode issues show up there).
- Measure motion: track an element's position/scale per frame to see speed profiles, holds and ramps; compute frame-difference energy to see cuts and rhythm.
- Compare against the reference with matched frames or speed profiles.

**Be honest about limits.** You can inspect frames and measured curves; you cannot watch playback at speed. Judder, rhythm and "feel" inferred from frames and measurements are provisional. State which judgments are based on what, and invite the user's playback judgment on feel-based questions. Never declare a motion visually successful on the basis of timing values or implementation logic alone.

## 2. The review pass

Answer honestly. These are questions about *this* motion, not a compliance gate.

1. **What is the primary movement** (or primary moment)? Is it unambiguous? (Chaotic or maximal pieces may have many; the viewer should still know where to look.)
2. **Is any movement unnecessary** — would the piece lose anything if it stayed still?
3. **Could it be simpler and stronger?** (Or, for an under-animated piece: is it missing the movement that would carry the idea?)
4. **Does anything look like generic web/UI animation** that doesn't belong in this piece?
5. **Are springs, overshoot, easing choices, or staggers there by habit** rather than by intent?
6. **Are the intermediate frames well composed**, not just the keyframes?
7. **Is the typography designed at every important frame** (hierarchy, kerning, breaks, balance, legibility during motion)?
8. **Does the motion reinforce the concept** and the brand?
9. **Does each transition come from the piece's own visual language** (geometry, brand elements, reference behavior)?
10. **Does the camera (if any) feel physically or graphically intentional**?
11. **Does any effect reveal the technique** (plugin-look cascades, regular parallax ratios, visibly cyclic loops) rather than the idea?
12. **Would it still hold up with the decorative layer removed** (glow, blur, particles, gradients) — and if it relies on them, does the concept call for them?
13. **If there is a reference:** where does it match the reference's behavior, and where does it deviate?
14. **Do the assets keep their identity** (logo geometry, colors, type, photographic quality)? Does the end frame match the source?

If a question reveals something generic or unnecessary, fix it before presenting — or flag it and say why it's staying.

## 3. Review criteria (for strict critique)

When reviewing an existing motion (Mode 3), evaluate and be specific:

- **Timing** — phases, holds, density, rhythm across the piece; asymmetry and variety.
- **Easing / acceleration** — appropriate to the object and intention; constant-speed, stepped or hard-stop phases where they fit.
- **Visual hierarchy** — what leads, what supports; competing movement.
- **Motion density** — too busy, too sparse, or well paced.
- **Composition** — frame balance, alignment, negative space, margins.
- **Typography** — as above.
- **Intermediate frames** — in-betweens that are weaker than the keyframes.
- **Effects** — purposeful or decorative.
- **Transitions** — motivated by the piece.
- **Camera** — believable or synthetic; one clear idea or several competing.
- **Relation to the reference** — behavior match, not just mood.
- **Execution quality** — edge cleanliness, pixel alignment, flicker, aliasing, compression artifacts, sync.

Name what exactly looks **generic, amateur, stiff, floaty, over-animated, under-animated, too web-like, too mechanical, visually weak, or inconsistent with the reference**, with the frames/ranges where it happens, then propose **targeted** changes (see `iterative-feedback.md`). Don't rebuild what is working.

## 4. Warning signs (not bans)

Each can be right. Use them as prompts to look harder, and ask: *does this serve this specific motion?*

| Warning sign | Why it often indicates a problem | When it is right |
|---|---|---|
| Automatic opacity + scale entrances | The default arrival for everything | The element genuinely materializes/grows in this world |
| Spring used everywhere | Interface physics applied regardless of object | Elastic or hung objects; a brand voice that is playful; a single deliberate beat |
| Blanket stagger | Equal offsets read as a plugin | Sequence has meaning (reading order, physical chain, musical pattern) |
| Unnecessary overshoot | Habitual "polish" | One arrival where a recoil sells weight or personality |
| Generic easing | One curve everywhere, picked from a menu | The curve was chosen for this object/intention |
| Random particles | Decoration without narrative role | They carry meaning or are the concept |
| Decorative glow | Fake finish | A light source or luminous subject in the concept |
| Meaningless blur | Hides a weak move or fakes depth | It communicates velocity or genuine depth/shutter feel |
| Fake depth | Flat scaling dressed as a camera | A deliberate flat/graphic move, or real depth is present |
| Arbitrary parallax | Per-layer multipliers by habit | Layers have real depth relationships |
| Generic SaaS motion | Product-UI language on a non-UI piece | The piece is a product/UI piece |
| Transitions unrelated to the piece | Wipes/whips/slides from a menu | The transition derives from the content, brand or reference |
| Animation because an element exists | Motion with no purpose | The element's movement carries meaning |
| Mechanical rhythm | Regular intervals, no holds | A deliberately metronomic concept |
| Every layer moving at once | No hierarchy | A chaotic/maximal concept that still reads |
| Weak intermediate frames | Keyframes designed, in-betweens accidental | The in-betweens are brief enough not to register |
| Un-designed type in motion | Kerning/breaks/hierarchy broken mid-move | — |

If you knowingly keep one, a one-line note on why is enough.

## 5. Useful tests

- **Remove-one:** disable each animated layer in turn; keep what changes the message.
- **Strip:** turn off decorative effects (glow, blur, particles, gradients); does the piece still hold? If not, is the effect the concept?
- **Scrub:** step through transitions frame by frame; export 3–5 in-betweens and judge them as layouts.
- **Freeze:** pause on the opening, hero, transition and end frames; check composition and type.
- **Mute:** watch without sound; then with: does sound reinforce the primary movement or fight it?
- **Thumbnail/squint:** is the key frame still clear when small?
- **Reference A/B:** same moments, side by side.
- **Hold count:** count holds; none usually means no rhythm (unless that is the concept).
- **Final-frame test:** is the end frame a designed layout, and does it match the source assets?

## 6. Review output format (keep it short)

When reporting a review to the user:

- **Verdict** in a sentence.
- **What works** (keep).
- **What doesn't** — specific, with frame ranges.
- **Proposed targeted changes** (or the changes you made).
- **What was verified and how**, and what needs the user's playback judgment.
