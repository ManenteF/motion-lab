# Typography in Motion

Type is a **designed object** first and an animated object second. If a frame would be a poor layout as a still, no motion will rescue it. Everything below is a judgment checklist, not a formula; sizes and ratios are starting points to be tuned by eye.

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
- Do not animate tracking by default. If you do (a line "opening up"), it must be the idea; it changes the line width and so the optical center and line breaks mid-move.
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
| **Letter** | Rare: a designed identity move, a hand-set/typewriter/mechanical concept, a single word as the hero | Almost always reads as a plugin; destroys kerning; slows reading |

Rules:
- **Do not animate individual letters by default.**
- **Do not stagger every line or word by default.** Offset only where there is a reason (speech timing, reading emphasis, physical linkage).
- Prefer revealing by **mask/clip along the text's own axis** (a line revealed by a moving edge, a baseline reveal inside a clipped container) over fading/scaling the glyphs, because it keeps the kerned line intact and reads as a designed gesture. Whether that is right for the concept is still a judgment.
- Match direction to reading direction, or break it intentionally.

## 8. Readability during motion

- Text is only readable when it is **still or moving slowly along its reading axis**. Give every title a hold long enough to be read after it stops (see the reading-hold ranges in `timing-and-easing.md`).
- Don't rotate, skew or blur body text while the viewer is meant to read it.
- Avoid fast travel across the full frame for text that must be read; a fast move is fine for text read *after* it lands.
- Keep contrast and legibility at every important frame, including transitions where text overlaps imagery.
- Motion blur on type is a deliberate style choice; keep it off secondary/legal text.
- Numbers/quantities: ease to the final value, hold, no overshoot or bounce.
- Don't loop-animate text the viewer is still reading.

## 9. Typography at transitions

- Text being replaced should leave *and* arrive as designed layouts at the transition frame — check the midpoint frame for overlap collisions.
- Match cuts with type: align baseline/anchor lines across the cut so the cut reads as one continuous system.
- Avoid animating type size mid-read unless scale is the idea (a word growing to fill the frame is a layout gesture, and the filled-frame state must be a designed composition).

## 10. Practical implementation notes

- Load fonts using the official guidance (`google-fonts.md` or `local-fonts.md`) so they are ready before render; a fallback flash is a typography failure, not a loading detail.
- Use official `measuring-text.md` to fit text to containers and check overflow before choosing sizes.
- For RTL/joined scripts, follow `arabic-text.md`: set direction and animate by word; never split joined letters.
- Keep the animation values inline and in the official Remotion shape (see `remotion-markup`); this skill decides what the type does, not how the props are written.

## 11. Typography checklist

- [ ] Hero and end frames laid out as stills: hierarchy, rag, alignment, scale.
- [ ] Kerning checked at final size on display text; split spans have not damaged it.
- [ ] Tracking and leading consistent per hierarchy level.
- [ ] Line breaks by meaning, re-checked for each aspect and language.
- [ ] Optical alignment and baseline verified; resting type pixel-snapped.
- [ ] Unit of motion chosen deliberately (block > line > word > letter, in that order of default).
- [ ] No default per-letter animation and no default stagger.
- [ ] Reading holds tested; text not moving fast while being read.
- [ ] Intermediate frames of any transition checked for collisions and illegibility.
