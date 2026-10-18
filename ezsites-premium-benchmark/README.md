# EzSites — 8-second premium production benchmark

**Concept:** a real business deserves a real online presence. A visual treatment test — not a launch-ready advertisement.

- Main composition: `Benchmark`, 1080x1920, 30fps, 240 frames.
- Visual language: cinematic cafe photography → editorial website reveal → 2.5D camera move → clean EzSites end card.
- Motion: frame-authored 2.5D zoom and tilt, deliberate timing; inspired by `video-shotcraft` `depth-layer-moves` and `crash-zoom-punch` recipes (not an installation of that skill).
- Brand: official EzSites PNG from linked Website-Assistant repository, included in existing `ezsites-commercial/public` path.
- Website of `sunday.` is an **illustrative fictional customer website**, not an app screenshot or proven generated output. `sundaycoffee.example` is a reserved example domain.
- Photography: two Pexels photos downloaded during GitHub Actions. Photo 33790118 by Việt Anh Nguyễn and photo 15476691 by Paul Seling. The Pexels License allows commercial use, but do not imply the depicted people/business endorse EzSites. Photos are cropped and color-graded for the motion test.
- Sound: original synthesized music + impacts (created in `scripts/score.py`), no third-party samples. No voice-over in this visual quality benchmark.

## Rendering

On GitHub Actions, `scripts/score.py` generates `public/score.wav`; `curl` downloads the original photos; the logo is copied from the previous project. Then `npm run stills` produces 8 still frames and `npm run render` produces an 8-second MP4, with a GitHub Actions artifact.

## Evaluation

Compare to the previous flat 30-second preview. Criteria: immediate visual credibility, legibility at 9:16, quality of visual hierarchy, motion smoothness at transition frames, no fake product capabilities, and audio quality. If the photographed media source cannot be fetched the render fails instead of silently swapping in a generic placeholder.