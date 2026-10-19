# EzSites — Native Lemo-Opuscar Rendering Proof of Concept

This independent **15-second English vertical advertisement** is a practical integration of Lemo-Opuscar's **unmodified native rendering and mastering tools** with GitHub Actions.

It deliberately does not claim to execute the Claude Code directing agent. The film source was authored separately, according to Lemo's guides and Swiss Motion Graphics / Isometric Infographic style references. It exposes window.READY, window.DUR, window.EV, and window.render(t). The **actual** upstream core/render/events.mjs, still.mjs, video.mjs and mux.sh do the media processing.

## Film

00:00–00:03.2 — a local business wants to be seen; isometric shop.
00:03.2–00:07.1 — business website, illustrated concept (not real EzSites UI).
00:07.1–00:11.6 — website, domain, and business email connect.
00:11.6–00:15 — EzSites: Get Your Business Online.

All vector visuals, music and foley are original in code. Narration is **offline eSpeak for technical evaluation**, not a publishable professional voice. Typography says EzSites but is not the official product icon. Do not use as a production ad without replacing these placeholders and reviewing brand/legal details.

## Run locally

Install Node 20+, Python 3.11+, FFmpeg, espeak-ng and git. Check out [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) at the pinned workflow SHA and install dependencies:

    LEMO_LIB=/absolute/path/to/lemo-opuscar
    (cd "$LEMO_LIB" && sh plugin/skills/lemo-opuscar/scripts/setup.sh deps)
    LEMO_LIB="$LEMO_LIB" bash films/ezsites-lemo-native/build.sh

Output: films/ezsites-lemo-native/out/ezsites-lemo-native.mp4, poster, stills and SRT. A workflow uploads deliverables as an Actions artifact. Previous Remotion approach is not removed or modified.

### Pipeline boundary

**Native now:** Lemo page protocol, events extraction, Chromium stills and 360-frame render, two-pass audio mastering, MP4 validation.
**Not native yet:** Lemo/Kokoro neural voice tier, Claude Opus 5.5 autonomous directing, generated real-app assets and end-to-end perceptual review by a human. These are deliberately not disguised as completed.

## Licenses and credits

- Lemo-Opuscar upstream tools and style-guide workflow: MIT, [source](https://github.com/lemomo-ai/lemo-opuscar).
- Original Canvas film, synthesized music and foley: this repository.
- eSpeak NG synthesizer: upstream eSpeak NG license; voice only for prototype testing, review the voice/model license before commercial distribution.
- System font fallback: Arial,sans-serif; installed font substitution is environment-dependent.
- Brand name: EzSites; website artwork is an illustrative concept, not a screenshot.
