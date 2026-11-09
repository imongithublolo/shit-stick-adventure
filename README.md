# Shit Stick Adventure — Web Port

<p align="center"><img src="icons/icon-192.png" width="120" alt="the shitstick"></p>

**Shit Stick Adventure** as a standalone website — fully playable, fully offline-capable PWA, with an optional downloadable CRT shader pack.

> port and optimization by **b29s**

- Original game: [ShitStickAdventure by TMX2023 on GameJolt](https://gamejolt.com/@TMX2023) (RPG Maker MZ)
- CRT shader: ["Serenity Shader"](https://github.com/gingerbeardman/webgl-crt-shader) by gingerbeardman (MIT)

---

## Play it / Deploy it

The site is 100% static — no build step, no config. Push to any static host and it works.

**One-click deploy to Vercel:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fimongithublolo%2Fshit-stick-adventure&project-name=shitstick-adventure&repository-name=shitstick-adventure)

or manually:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import this repository
3. Click **Deploy** — nothing else to configure

(Or run `npx vercel` from this folder.)

Local dev: `python3 -m http.server` and open `http://localhost:8000`.

## The boot flow

1. **CRT shader setup** — before anything downloads, the player is asked if they also want the CRT shader pack. Full settings (scanlines, scanline count, adaptive glow, brightness, contrast, saturation, bloom, threshold, RGB shift, vignette, curvature, flicker, pixel smoothing + 3 presets) with a **live preview**, and a simple "nah, no CRT for me" decline. If declined, the shader pack is never fetched or cached.
2. **Cache download** — minimal comic-sans loading bar + big percentage. Byte-accurate (streams every file), resumable, caches the whole game for offline play. Only happens once (or when the site updates).
3. **PWA install prompt** — "for the best experience" — with the native install button, an iOS hint, and "nah, just play".
4. **Credits** — `port and optimization by b29s` (Comic Sans) fades away into the game.
5. **Game** — if the CRT pack was accepted, it renders as a real WebGL post-process over the game canvas (scanlines, curvature, the works), with a small `CRT` toggle + `⚙ settings` in the corner.

## Tech notes

- `boot/loader.js` — the setup flow, download engine, PWA logic
- `boot/crt.js` — CRT shader pack (shader adapted from gingerbeardman's, MIT) — preview, settings UI and the in-game post-processor. Only cached if accepted.
- `boot/files.js` — **generated** file manifest (path + size + version hash) used for byte-accurate progress and cache versioning. Regenerate with `python3 ../scripts/make_manifest.py` after changing files.
- `sw.js` — service worker. Navigations, `boot/` scripts and the manifest are network-first (so updates land immediately), everything else cache-first.
- Version = hash of every file's path+size. Change any file → bump the manifest → returning players get a quick "UPDATING SHITSTICK" pass.

## Repo contents

```
index.html          entry point (boot overlay + game bootstrap)
manifest.json       PWA manifest
sw.js               service worker (offline)
boot/               setup screens + CRT shader pack + generated manifest
icons/              PWA icons (the shitstick)
js/ img/ audio/ data/ fonts/ effects/ uicustom/ css/   the game (RPG Maker MZ web build)
```
