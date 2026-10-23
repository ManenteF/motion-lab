# motion-lab

Remotion + TypeScript project for motion design experiments.

```bash
npm install
npm run dev        # open Remotion Studio
npm run typecheck  # tsc --noEmit
npm run render -- <composition-id> out/<file>.mp4
```

- `src/index.ts` – entry point, registers the root
- `src/Root.tsx` – declares compositions
- `src/compositions/` – one folder/file per animation
- `src/lib/` – shared helpers
- `public/` – static assets (`staticFile()`)
- `out/` – render output (git-ignored)
