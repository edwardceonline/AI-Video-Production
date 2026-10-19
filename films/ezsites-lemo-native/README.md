# EzSites — One Sign, Three Places (20s)
A new 20-second **English** vertical advertising film, built according to the **pinned original Lemo-Opuscar AI Directing method**, with Swiss Motion Graphics as its only primary style.

## Story & assets
One local café's blue sign transforms into a website, a custom-domain identity, a professional email and the verified official EzSites logo. The website and domain are **clearly illustrative concepts**, not an actual EzSites app UI or a claimed registered domain. No invented analytics, BYOD or subscriptions included in the visuals.

## Canonical method
The coding/creative agent must read original upstream `AGENTS.md`, `DIRECTOR.md`, `TECHNIQUE.md` and `styles/swiss-motion/STYLE.md` at the SHA pinned in [workflow](../../.github/workflows/lemo-opuscar-poc.yml). Their method takes precedence over our own `AGENTS.md`. The treatment documents three structures, references, camera reasons, second-by-second beats, 120 BPM grid, three-layer sound table and review gates.

## Run (macOS/Linux)
Checkout upstream Lemo at the pinned SHA, install Node20+, Python3.11+, FFmpeg and run:
```bash
cd /path/to/lemo-opuscar
sh plugin/skills/lemo-opuscar/scripts/setup.sh deps voice
cd /path/to/AI-Video-Production
LEMO_LIB=/path/to/lemo-opuscar bash films/ezsites-lemo-native/build.sh
```
GitHub Actions renders and exports `films/ezsites-lemo-native/out/ezsites-lemo-native.mp4` (1080×1920, 24fps, 20s), subtitle SRT, verified official logo end poster, contact sheet, 0.2s transition stills, score cue map, treatment, CREDITS and director manifest. The native voice is Kokoro; Whisper verifies every line. The secondary Remotion job re-composes the *same actual* native MP4, checks the presence of audio and uploads its own artifact.

## Rights / unfinished business
- Brand image comes from the linked user-managed EzSites app repo, checked by exact Git blob hash.
- Film artwork, music, and foley are original code; see CREDITS for upstream tool/voice/model licenses.
- Published mobile UI isn't shown; only example business graphics are drawn.
- `AGENTS.md` is a protocol for ChatGPT, not evidence an autonomous Claude agent ran.
- Creative review involves listening and looking at the final video; passing CI does **not** alone certify commercial creative quality or third-party licensing.
