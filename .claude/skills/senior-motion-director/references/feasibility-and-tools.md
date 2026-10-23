# Feasibility and Tool Selection

Be honest about what is achievable **before** investing heavily, and choose the implementation tool **after** the visual direction is understood. Remotion is one possible tool, not the center of the system.

## 1. Feasibility assessment

Do a quick assessment as soon as you know the direction (and again if the direction changes). Check:

- **Source layers**: are the needed elements separable (layers, alpha, vector)?
- **3D / depth**: is there geometry or depth to support the camera or parallax the idea needs?
- **Rendering limits**: can the chosen renderer produce the effect at video quality and a sane render time (shaders, many layers, heavy blur, huge canvases)?
- **Plugins / effects**: does the reference rely on a specific tool's effect (e.g. After Effects plugins, particle systems, optical flow) that isn't available?
- **Codecs / formats**: alpha, ProRes, HEVC, HDR, specific delivery specs.
- **Shader behavior**: unsupported GLSL features, headless GPU limitations.
- **Fonts**: licensed/missing typefaces; need for the exact font.
- **Asset resolution**: enough for the largest scale the motion implies?
- **Environment limits**: browser version/flags, network allowlist, missing binaries, memory/time limits.
- **External tools**: access to something required (After Effects, Blender, a render farm).

### Classify

| Level | Meaning |
|---|---|
| **Fully achievable** | The visual behavior can be reproduced as intended with available tools and assets. |
| **Visually approximable** | Looks very close to the intent but built differently (e.g. faux-3D from layered 2D; procedural stand-in for a plugin effect). |
| **Partially achievable** | Some elements of the idea work; others need missing assets/tools. Say exactly which. |
| **Not realistically achievable here** | Needs something unavailable in the current environment. Say what, and what would unlock it. |

### Say it early, concretely, and offer the closest alternative

Template (keep it short):

> **Feasibility:** the camera move through the scene is *visually approximable*: the key visual has no layers or depth, so I'd fake modest parallax from a cut-out and an estimated depth map. A full orbit isn't realistic from a flat image. Closest high-quality alternative: a locked frame with a slow lateral drift on three separated layers. If you can send the layered PSD, the orbit becomes achievable.

**Never silently downgrade the visual idea** because implementation is difficult. If the plan changes, say what changed and why, and let the user react.

## 2. Tool selection

Pick the method that best serves the *visual problem*. Typical mapping (not exclusive; combine freely):

| Visual problem | Good candidates |
|---|---|
| Typographic edits, cuts and layouts; data/templated video; programmatic timing; reproducible renders | Remotion (React), or HTML/CSS + a frame-stepping capture loop |
| Vector/line-work, logo construction, path draw/morph, shape geometry | SVG (+ JS/CSS/GSAP-style animation), Remotion with SVG, Canvas |
| Procedural graphics, particles, generative patterns, many-element simulations, pixel-level control | Canvas 2D, WebGL, GLSL shaders |
| Real perspective camera, 3D objects, lighting, depth | Three.js / React Three Fiber (in a browser or Remotion), Blender if available |
| Image-based motion: parallax from layers, cut-out animation, photographic moves | Layered 2D with a perspective/2.5D setup (Three.js planes, CSS 3D), plus image preprocessing |
| Distortion, displacement, chromatic effects, liquid/flow looks | GLSL/WebGL, FFmpeg filters for simple versions |
| Compositing, retiming, speed ramps, transcoding, stitching, overlays, audio muxing | FFmpeg |
| Asset prep: cut-outs, masks, tracing, upscaling, depth maps, color work | Python (PIL/NumPy/ONNX), ImageMagick, vector tools, generated intermediates |
| Expression-driven rigs or AE-native effects (when the user works in After Effects) | After Effects scripting/expressions (deliver scripts/projects) |
| Large batches or heavy renders | External/render pipelines when available |

Rules of thumb:
- **Start from the look**, ask "what's the least-friction route to *this look*?", then choose.
- It is fine to **mix tools**: e.g. preprocess a key visual in Python, animate layers in Three.js, stitch and mux with FFmpeg.
- Do **not** force a motion into Remotion because it is installed; do **not** simplify the design because another route is harder.
- Prefer a tool that lets you **preview and inspect real frames quickly**.
- Technical elegance is secondary to visual quality. A throwaway script that produces the right frames beats a clean framework that can't.

### When Remotion is chosen

Use the official Remotion skills as the technical authority — start from `remotion-best-practices` and follow the references it routes to (markup, timing, sequencing, transitions, effects, fonts, 3D, audio, captions, studio, render). They govern *how the Remotion code is written*; they don't dictate creative direction. Remotion-specific notes seen in this container are below.

## 3. Environment notes (observed in this container; re-verify, they can change)

- **Available:** Node 22 + npm (registry reachable, `npm install` works), Python 3 with PIL/NumPy/onnxruntime (pip works for additional packages), FFmpeg/FFprobe (libx264, libx265, ProRes, AV1, GIF; no libvpx seen), ImageMagick (`convert`), Xvfb, a pre-installed Chromium/Chrome (Chrome for Testing 153) usable with Playwright and with Remotion via `--browser-executable`.
- **Not available:** After Effects, Blender, Inkscape, potrace (trace via npm/pip packages instead), GPU. Remotion's own Chrome Headless Shell download is blocked (`remotion.media` is not reachable) — use the pre-installed Chrome via `--browser-executable=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome` (path may differ).
- **Network:** package registries and Google Fonts were reachable; some hosts are blocked by the proxy. Check before assuming a font/CDN/model download will work.
- **Remotion + HTML-in-canvas:** `<HtmlInCanvasMotionBlur>` failed to capture samples in Chrome 153 here (even the official example); the DOM-based `<CameraMotionBlur>` from `@remotion/motion-blur` worked. Other HTML-in-canvas features may be affected.
- **Rendering:** headless software rendering works; heavy WebGL/Three.js scenes may be slow; use `--gl=angle`/`swangle` where needed and test a still before a full render.
- **Previews:** stills and short ranges are cheap; full renders cost time. Use frame stills/contact sheets for iteration.

If something you need seems missing, check `read_documentation` for the environment (network, setup scripts, installed tools) before concluding it's impossible.

## 4. Producing and delivering results

- Render a **short preview** (a key range, or lower resolution) for early iterations; render the full piece when a version is ready for judgment.
- Verify the file (`ffprobe`: resolution, fps, frame count, duration, codec) and spot-check frames from the **encoded file**, not only from the source.
- **Make the result accessible:** attach it (file-delivery tool) so the user can watch or download it. Don't only report a container path.
- Name versions clearly (`name-v1.mp4`, `name-v2.mp4`) and keep earlier versions available for comparison.
