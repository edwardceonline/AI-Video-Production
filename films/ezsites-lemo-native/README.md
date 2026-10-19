# EzSites — Lemo-Opuscar × Remotion Video Pipeline

This is a **15-second, 1080×1920, 24fps English EzSites advertisement proof of concept**. It is based on a custom visual script following Lemo-Opuscar's Swiss Motion Graphics / Isometric Infographic directing grammar.

## What is actually integrated

- **Native Lemo tools:** upstream-pinned `events.mjs`, `still.mjs`, `video.mjs`, and `mux.sh` extract timing, render 360 frames, and master the audio.
- **Natural voice:** upstream Lemo **Kokoro** offline English TTS, each line checked with `faster-whisper` ASR (all four lines verified in CI). Four cues are synchronized with the music's gain automation, and the build stops if narration exceeds its allowed scene.
- **Authentic brand identity:** the official EzSites logo is copied from the mobile product repository and validated against its original Git blob hash in `scripts/preflight.py`. No invented product logo.
- **Original soundtrack:** procedural music and action-aligned foley, final loudness targeted at −14 LUFS.
- **Visual QC:** poster, five frames, MP4/codec/fps/duration/audio assertions and FFmpeg blackdetect.
- **Remotion bridge:** `remotion/` is an actual React/Remotion composition that takes the native Lemo MP4 as a video source, preserves its audio and re-renders a second verified H.264 MP4 in a separate CI job.
- **Directing contract:** a film-specific `TREATMENT.md` and repo `AGENTS.md` record the approved story, shot list, cue map and self-checks.

## Story

1. 0–3.2 s — local business deserves to be seen.
2. 3.2–7.1 s — online presence represented by a conceptual website (NOT EzSites app UI).
3. 7.1–11.6 s — website, domain and business email together.
4. 11.6–15 s — official EzSites logo and “Get Your Business Online” ending.

**This film does not show actual in-app screens.** It would be misleading to market the conceptual browser card as a screenshot of the product. To add verified screenshots, obtain current EzSites screenshots or screen recordings from a released build and compose them in the Remotion layer.

## Rebuild native film locally

Install Node 20+, Python 3.11+ and FFmpeg; clone [upstream Lemo](https://github.com/lemomo-ai/lemo-opuscar) at the commit pinned in the Actions workflow, then:

```sh
LEMO_LIB=/absolute/path/to/lemo-opuscar
(cd "$LEMO_LIB" && sh plugin/skills/lemo-opuscar/scripts/setup.sh deps voice)
LEMO_LIB="$LEMO_LIB" bash films/ezsites-lemo-native/build.sh
```

Build outputs under `films/ezsites-lemo-native/out/`. The CI artifact contains MP4, poster, SRT and stills. See [the Remotion bridge](remotion/README.md) for the optional second-stage render.

## Pipeline limits

**Verified by CI:** native Lemo rendering, Kokoro synthesis, ASR transcript, scene timing, original soundtrack, branding integrity and final MP4. **Separately tested by CI:** React/Remotion round-trip composition once the second job passes.

**Not yet executed end to end:** an autonomous Claude Code director using the Lemo plugin, current application-screen capture (the source app is private), and human review of final exported advertising for commercial deployment. The `AGENTS.md` is a contract for an authorized coding agent, not proof that Claude Opus was invoked.

Check `CREDITS` and the [Remotion licensing note](remotion/README.md) before commercial release. Remotion company-licensing eligibility depends on team size.
