# Typography in Motion

Craft reference for motion that involves type. Type is a **designed object** first and an animated object second: if a frame would be a poor layout as a still, motion rarely rescues it. Everything below is guidance to consult when relevant, not a formula; sizes and ratios are starting points to be tuned by eye. A reference's typographic behavior (snappy cuts, kinetic per-letter work, mechanical typing, chaotic scatter) takes precedence when matching it.

## 1. Design the still first

Before animating any text, produce the resolved layout at the hero and end frames:
- **Hierarchy** — how many levels (headline / sub / meta)? Each level differs clearly by size, weight, case or color; not by a tiny increment.
- **Typeface and weight** — chosen by brand and concept; weight and width are expressive decisions.
- **Alignment and anchor** — flush-left/right/center chosen for a reason; shared anchor lines with the rest of the frame.
- **Rag** — shape of the unjustified edge; avoid awkward steps and trapped single words.
- **Scale** — nothing so small it fails on a phone. Starting points: on 1080p horizontal, avoid text under ~28 px; on 1080×1920, avoid under ~40 px. Verify on a real small screen.

## 2. Kerning

- Optical kerning matters most at display sizes. Check the pairs that go wrong: `AV`, `AT`, `AY`, `LT`, `LV`, `TA`, `To`, `Ty`, `Te`, `r.`, `y.`, `P,`, `W.`, and anywhere round meets straight.
- Prefer the font's own kerning; do not disable it. In CSS, kerning is on by default; keep `font-kerning: normal` and check that your font features are not being reset.
- Manually adjust a pair only after viewing the final rendered size, because browser hinting/rendering can differ from your design tool.
- **Splitting text into spans breaks kerning between the split pieces** (inline-block spans do not kern across their boundary). Letter-level or word-level splits can therefore wreck the carefully kerned line. If you must split, measure and compensate, or keep the line as one text node and reveal it with a mask/clip (see below). Official `measuring-text.md` covers measuring and fitting text; `arabic-text.md` covers joined scripts where splitting letters breaks the script.

## 3. Tracking

- Large display type often benefits from slightly **tighter** tracking; small text and all-caps often need **looser** tracking. Judge by color (the even texture of the line), not by numbers.
- Animating tracking (a line "opening up") is a strong gesture: it changes the line width, the optical center and possibly the line breaks mid-move, so check those frames. Use it when it is the idea.
- Keep tracking consistent within a level of hierarchy across shots.

## 4. Leading

- Tight display leading (roughly 0.9–1.1× the font size for large headlines) gives a solid, poster-like block; looser leading (roughly 1.2–1.5×) suits reading text.
- Check descender/ascender collisions in multi-line display type and in every language the piece ships in.
- Leading is part of the hierarchy: keep it consistent per level.

## 5. Line breaks

- **Break by meaning**, not by width. Keep phrases together; avoid breaking after a one-letter or very short word, and avoid orphans.
- Balance line lengths where appropriate (CSS `text-wrap: balance` can help in Chromium-based rendering; verify the result and prefer explicit breaks for hero text).
- Re-check breaks for each aspect ratio and each language. A break designed at 16:9 is not valid at 9:16.
- Do not animate between line-break states unless that reflow is the concept (it is rarely a good frame in the middle).

## 6. Optical balance and baseline

- Align by **optical** edges, not boxes: round glyphs (O, C, S) should overshoot baselines/cap height slightly; a quote or hyphen at the line start may need to hang.
- Keep a shared **baseline** across lines/columns that belong together; mixed sizes on one line should share a baseline (or a deliberately chosen alignment, such as cap-height).
- Check optical centering of text blocks inside shapes: text that is mathematically centered often looks low or off to one side.
- Snap resting type to the pixel grid so hairlines and small text don't shimmer when the motion ends.

## 7. Choose the unit of motion

| Unit | Use when | Risks |
|---|---|---|
| **Whole block / title** | Most of the time: the message moves as one object | Can feel heavy if travel is long |
| **Line** | Multi-line statements where reading order is the point | Equal stagger per line reads like a template; only offset where reading order demands |
| **Word** | Emphasis, rhythm tied to speech/sound, words with distinct meaning | Kerning/spacing between split words; keep word spaces exact |
| **Letter** | A designed identity move, a hand-set/typewriter/mechanical concept, kinetic type, a single word as the hero | Easily reads as a plugin when generic; breaks kerning between split pieces; can slow reading |

Guidance:
- Per-letter motion and staggered lines/words are legitimate when the concept or reference calls for them (speech timing, reading emphasis, physical linkage, kinetic type). As a *default applied to everything*, they are a warning sign.
- Revealing by **mask/clip along the text's own axis** (a line revealed by a moving edge, a baseline reveal inside a clipped container) keeps a kerned line intact and can read as a designed gesture; fading/scaling glyphs is another option. Choose by the concept.
- Match direction to reading direction, or break it on purpose.

## 8. Readability during motion

- Text is only readable when it is **still or moving slowly along its reading axis**. Give every title a hold long enough to be read after it stops (see the reading-hold ranges in `timing-and-easing.md`).
- Rotating, skewing or blurring body text while the viewer is meant to read it usually costs legibility.
- Fast travel across the full frame is hard to read; it is fine for text that is read *after* it lands (or when illegibility-in-motion is the effect).
- Keep contrast and legibility at every important frame, including transitions where text overlaps imagery.
- Motion blur on type is a deliberate style choice; keep it off secondary/legal text.
- Numbers/quantities read best when they settle on the final value and hold; overshoot or bounce undermines credibility.
- Looping animation on text the viewer is still reading competes with reading.

## 9. Typography at transitions

- Text being replaced should leave *and* arrive as designed layouts at the transition frame — check the midpoint frame for overlap collisions.
- Match cuts with type: align baseline/anchor lines across the cut so the cut reads as one continuous system.
- Animating type size mid-read is risky unless scale is the idea (a word growing to fill the frame is a layout gesture, and the filled-frame state should be a designed composition).

## 10. Practical implementation notes

Whatever the tool, make sure the real font is loaded before frames are captured (a fallback flash is a typography failure, not a loading detail), measure ink and baselines on rendered frames rather than trusting box metrics, and check RTL/joined scripts (splitting joined letters breaks the script).

If Remotion is the chosen tool, the official skills are the technical authority: `google-fonts.md` / `local-fonts.md` for loading, `measuring-text.md` for fitting and overflow, `arabic-text.md` for RTL, and `remotion-markup` for how animation values are written.

## 11. Quick typography review

- Are the hero and end frames good layouts as stills (hierarchy, rag, alignment, scale)?
- Is kerning right at final size on display text, and undamaged by any split spans?
- Are tracking and leading consistent per hierarchy level?
- Are line breaks by meaning, and re-checked per aspect and language?
- Are optical alignment and baselines verified, with resting type pixel-snapped?
- Was the unit of motion (block, line, word, letter) chosen for the concept or the reference rather than by default?
- Are reading holds long enough for the real text, and is text not moving fast while being read?
- Were the intermediate frames of any transition checked for collisions and illegibility?
