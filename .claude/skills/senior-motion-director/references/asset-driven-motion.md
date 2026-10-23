# Asset-Driven Motion

How to create motion from supplied material: logos, key visuals, illustrations, photographs, product images, brand elements, typography, existing compositions, and still frames. **Preserve the asset's visual identity** unless the user asks for a transformation.

## 1. Intake audit (do this before choosing motion)

For every supplied asset, work out:

| Question | Why it matters |
|---|---|
| **Fixed** — what must not change? | Logo geometry, colors, lockup proportions, product silhouette, legal text. |
| **May move** — what is free to move or transform? | Defines the motion budget. |
| **Can be masked** — are there clean edges/alpha? | Reveal and transition options. |
| **Can be separated into layers** — is it already layered, or can it be cut apart cleanly? | Independent motion, parallax, staggers by meaning. |
| **Must be reconstructed** — is anything hidden behind other elements or missing? | Inpainting/redrawing cost and quality risk. |
| **Depth** — can depth be inferred (overlaps, perspective, scale cues, a depth map)? | Real 2.5D/3D camera vs. flat graphic moves. |
| **Resolution** — is it enough for the largest crop/scale the motion implies? | Push-ins and scale-ups expose low resolution. |
| **Vector vs. raster** — is there an SVG/PDF/AI source? | Vector enables clean draws, morphs and scaling; raster may need vectorization. |
| **Typography** — is the text live (font known/available) or baked into pixels? | Live type can be re-set and animated at any level; baked type needs the font, a vector, or a rebuild. |
| **Additional source assets** — would one more file materially improve the result? | Ask early and specifically. |

Open the files and look at them (images can be read directly); check dimensions, alpha, color mode, and whether the edges are clean at 100–200% zoom.

## 2. Say it early when the asset is not enough

If the desired motion needs information the asset doesn't contain, say so **before** building and name what would fix it:

- "The logo is a 400px PNG; the push-in would need an SVG or a 2000px export."
- "The key visual is flat; separating the figure from the background needs layers (PSD/PNG sets) or I can approximate with a cut-out and may see edge artifacts."
- "The type is baked into the photograph — I can rebuild it in the closest available font, or you can send the font/vector."
- "A real camera move through this scene needs depth; I can fake limited parallax from a depth estimate, but large moves will show artifacts."

Offer the closest high-quality alternative (see `feasibility-and-tools.md`).

## 3. Preparing assets

Choose the lightest prep that achieves the motion; check each result visually.

- **Layer separation**: use existing layers/alpha when available. Otherwise cut by color/threshold, edge-aware masks or manual polygon masks; verify edges at 200% zoom on both dark and light backgrounds.
- **Vectorization**: for flat logos/line art, trace to SVG and **check the trace against the original** (corners, counters, curve fidelity). A bad trace damages brand identity — if it can't be made faithful, don't use it.
- **Reconstruction / inpainting**: only where unavoidable; keep the reconstructed area small and away from edges the motion will expose.
- **Depth**: from clear overlaps and perspective, from a supplied depth map, or estimated; treat estimated depth as approximate and keep parallax/camera moves modest unless verified.
- **Upscaling**: acceptable for modest scale-ups; call out softness if the motion exposes it.
- **Color handling**: keep brand colors exact; avoid unintended color shifts from conversions.
- **Typography**: identify the font (or request it), rebuild lines with correct hierarchy, kerning and tracking; animate at the level (block, line, word, letter, glyph path) the concept needs.

Intermediate assets (cut-outs, masks, traced SVGs, depth maps, cleaned plates) are normal — generate them with whatever tools are available and keep them organized beside the project.

## 4. Existing compositions and starting points

When the user points at an existing composition (or an earlier version):
- Read it first: what is the structure, what is approved, what is up for change.
- Treat it as source material or a baseline; keep working elements; change only what the request implies.
- Create a new version beside it (V2, V3…) instead of overwriting, unless the user asks otherwise.
- Prior test pieces in the repository are examples, not templates — reuse structure only when it serves the new motion.

## 5. Using a still image as the base composition

- Treat its composition as designed: alignment, spacing, hierarchy, color.
- Decide which parts are the motion's subject and which remain as stable context.
- Decide whether the still is the *start*, the *end*, or a *mid* state. Often the strongest solution builds toward the designed still as the resolved frame — and the motion must arrive at it exactly.
- Preserve the still's final-frame fidelity: when the motion settles, compare it with the source image.

## 6. Multiple assets

- Decide the hierarchy among them (which is the hero).
- Keep a consistent scale, color and edge treatment so they read as one piece.
- Check that their resolutions and styles are compatible; flag mismatches.

## 7. Logos specifically

- The logo's geometry is part of the brand: be explicit about what may be distorted, split, or reassembled (and whether the static lockup must end exactly as supplied).
- Clearspace and the final locked frame matter; build motion toward a faithful end state.
- Derive motion from the mark's own geometry (edges, counters, symmetries, construction lines) whenever possible; that is what makes a logo animation specific.
- Always confirm the final frame matches the supplied logo exactly.

## 8. Photographs and key visuals

- Honest about what a photo can do: it can be panned/scaled/cropped, masked, color-treated, and given limited parallax; it cannot be re-lit or re-posed.
- Separate subject from background only when it can be done cleanly.
- Preserve photographic quality (grain, contrast); avoid effects that mask low quality unless that is the concept.

## 9. Illustrations

- Check for existing layers or shape structure (SVG/AI/PSD). Illustrations often separate well; use their native construction for motion.
- Keep line weights, texture and palette intact; animate in the illustration's own graphic language.
