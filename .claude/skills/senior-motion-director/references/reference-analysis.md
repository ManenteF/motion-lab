# Reference Analysis

How to read motion references and still references efficiently and turn them into usable direction. The aim is to understand **motion behavior**, not to produce an exhaustive forensic record.

## 1. Decide the reference's role

| Intent | Meaning | What you do |
|---|---|---|
| **A — Close motion match** | The user wants high visual proximity to the reference's motion behavior. | Analyze and reproduce as closely as practical: pacing, acceleration, deceleration, rhythm, sequencing, scale behavior, masks, transitions, typography behavior, spatial movement, camera, blur, distortion, depth, layer relationships, overlaps, cuts, holds, timing density, graphic behavior. Don't just reproduce the mood — translate the actual behavior. |
| **B — Style reference** | The reference is a visual or motion-language influence, not a template. | Extract visual principles, energy, motion density, pacing, graphic language, typographic character, transitions, spatial logic, visual hierarchy — then propose a new motion built on those principles. |

If the intent is not explicit, **infer it from the brief** ("like this", "same feel", "match", "inspired by", "in the style of") and state your reading in one or two sentences ("I'm treating this as a close match for the timing and masks, with your logo swapped in"). Correct course if the user disagrees.

## 2. Get the reference into a usable form

- Locate the actual file (attachments, repo paths) and probe it. If the reference is only a link to a video you can't download, say so and ask for the file or a screen capture; don't pretend to have analyzed it.
- Probe:

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames,duration -of default=nw=1 ref.mp4
```

- Note frame rate and duration first; all timing is expressed in the reference's frames.

## 3. Sample intelligently

Don't dump every frame. Choose sampling density from how fast things change.

1. **Find where things change.** A cheap motion-energy profile shows cuts, bursts and holds at a glance:

```python
# motion_energy.py  — mean absolute change between consecutive frames (downscaled gray)
import subprocess, sys, numpy as np
W, H = 192, 108
p = subprocess.run(['ffmpeg','-v','error','-i',sys.argv[1],'-vf',f'scale={W}:{H},format=gray',
                    '-f','rawvideo','-'], capture_output=True)
f = np.frombuffer(p.stdout, np.uint8).reshape(-1, H, W).astype(np.float32)
e = np.abs(np.diff(f, axis=0)).mean(axis=(1, 2))
for n, v in enumerate(e): print(n, round(float(v), 2))
```

   - Near-zero runs = holds. Spikes = cuts. Plateaus = steady motion. Ramps = acceleration/deceleration.
2. **Cut detection** (hard cuts):

```bash
ffmpeg -i ref.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null - 2>&1 | grep -o "pts_time:[0-9.]*"
```

3. **Coarse overview** — contact sheet every N frames (N=10 for long/simple, 5 for moderate):

```bash
ffmpeg -v error -y -i ref.mp4 -vf "select='not(mod(n,5))',scale=320:-1,tile=6x5" -frames:v 1 -vsync 0 sheet.png
```

4. **Dense sampling where it matters** — every frame (or every 2) around cuts, acceleration changes and hero moments:

```bash
ffmpeg -v error -y -i ref.mp4 -vf "select='between(n,40,64)',scale=480:-1,tile=5x5" -frames:v 1 -vsync 0 dense.png
```

5. **Wide sampling during long holds** — one frame per hold is enough.
6. **Zoom** on details that carry the behavior (type edges, mask boundaries, blur extents) with full-resolution crops.

View the sheets and crops (images can be opened directly) and write down what you see; don't rely on reading numbers alone.

## 4. Measure what you can't judge by eye

When timing or acceleration is the point of the reference, measure it:

- **Position over time** of a key element: threshold/color-key it per frame and take its edge or centroid, then difference it to get speed and acceleration.

```python
# track the right-most bright pixel of a thin element in a row band, per frame
import subprocess, numpy as np
W, H = 1920, 1080
p = subprocess.run(['ffmpeg','-v','error','-i','ref.mp4','-vf','format=gray','-f','rawvideo','-'], capture_output=True)
fr = np.frombuffer(p.stdout, np.uint8).reshape(-1, H, W)
x = [int(np.where((fr[n, 596:600, :] > 128).any(axis=0))[0].max()) for n in range(len(fr))]
speed = np.diff(x)   # px/frame; look for plateaus (constant speed) and ramps
```

- **Scale over time**: bounding-box width/height of a thresholded element per frame.
- **Blur extent**: the length of the intensity ramp at the leading/trailing edge of a moving element → shutter feel (blur length ≈ speed × shutter fraction).
- **Cut frames and hold lengths**: from the energy profile.
- **Rotation / perspective**: compare key frames; estimate from landmark angles or from how parallel edges converge.

Measure only what you need to match or understand the behavior.

## 5. Extract (checklist)

Record what is present; skip what isn't.

- **Start state** and **end state** (the first and last frames as compositions).
- **Major key states** (the frames you'd freeze as stills).
- **Transition moments**: cut, move, mask, transform, overlap — and the frame ranges.
- **Timing relationships**: how long each phase lasts, what overlaps, what waits.
- **Acceleration profile**: constant, ramped, snapped, eased, stepped; asymmetric?
- **Motion paths**: straight, arced, orbital, jittery.
- **Layer hierarchy**: what's foreground/background, what leads, what follows.
- **Scale behavior** and **rotation behavior**.
- **Camera behavior**: locked, handheld, push/pull, orbit, whip; real perspective or flat scale.
- **Blur / shutter feel**: none, crisp, natural, smeared; directional or radial.
- **Motion density**: how much changes per beat; how busy the frame is.
- **Hold durations**: where it rests and for how long.
- **Visual rhythm**: the pattern of fast/slow/held across the whole piece.
- **Graphic language**: type, shapes, color, texture, grain, distortion.

## 6. Write a compact motion spec

Turn the analysis into something you can build from — short, in frames at the reference's fps:

```
REFERENCE MOTION SPEC (24 fps, 96 f)
f0–f10    HOLD    title block static
f10–f16   MOVE    block slides left, decelerate-only (v 80→0 px/f)
f16        CUT     to wide shot; hold 18f
f34–f50   MASK    horizontal edge wipe, constant speed 60 px/f, hard edge, no blur
...
Camera: locked. Blur: none. Rhythm: hold – burst – hold – cut.
Notes: type snaps (no easing) on f34; background never moves.
```

Then map it onto the user's assets (what plays the role of each element in the reference).

## 7. Adapt and report fidelity

- Apply the behavior to the user's assets; adapt geometry, not behavior (a mask edge follows the logo's silhouette, timing stays).
- After building, **compare at the same moments** (side-by-side frames, measured speed profile vs. the reference's). Say where you match and where you deviate, and why.
- If exact matching is impossible, say so **before** investing heavily, classify the gap (see `feasibility-and-tools.md`), and propose the closest high-quality method.

## 8. Still-image references

Extract: composition and grid, hierarchy, scale relationships, negative space, typography (family character, weight, case, tracking), color and contrast, texture/grain/finish, graphic devices, mood. Then ask what motion this *implies* — which parts of the image would move, which would stay, how it would resolve. State clearly what is derived from the still and what is your invention.

## 9. Motion references across several files

If the user supplies several references, say what each contributes ("timing from A, type behavior from B"); don't blend them into an average.
