---
name: ezsites-commercial
summary: An art-directed, reference-measured, production-grade Remotion pipeline for honest EzSites business advertising.
---

# EzSites Commercial Production

## Product truth and brief

- EzSites positioning: **Bring Your Business Online**. Sell online presence, not "AI website builder" as the sole message.
- Use true public Kurotsuki capture from `https://kurotsuki.sites.ezsites.app` (or an authorized private preview capture) as the product hero. Do not present content on `kurotsuki.party` and the EzSites subdomain as the same unmodified deployment; the sites have different copy, locations, and details.
- Respect the actual React Native UI in `Games-Viet-GbR/Website-Assistant/apps/mobile-manager/src/screens` and the palette in `src/theme.ts`. Source code is UI reference, not proof of pixels; capture from a running app for production footage. Never fabricate dashboard data or pretend that booking, BYOD, or analytics are EzSites product features.
- The preview URL supplied in chat is unlisted. **Never commit a preview token, private URL, or website screenshot containing private information to this public repository.** Use an authorized private capture; otherwise use the public published site.
- Keep the initial ~4 seconds of the previously approved V3 film as the anchor. Redesign its entire remainder; do not preserve rejected card/slideshow scenes.

## Required process

1. **Measure references first.** Run `scripts/analyze-reference.py` against the user-provided video files locally. Read `.agents/skills/motion-from-reference/SKILL.md`. Frame-by-frame timing and movement matter more than vague adjectives. Commit only derived motion specs, not the reference MP4 files or source frames.
2. **Create look bible.** Decide palette, lens/lighting, typography, set design, reference beat mapping, physical transition continuity. Use actual EzSites and Kurotsuki design cues, not generic SaaS glassmorphism.
3. **Shot cards.** Read `.agents/skills/video-shotcraft/SKILL.md` and its **actual reference implementation** from the pinned checkout for each selected shot. Copy mechanics (easing, timing, shape continuity) with license attribution; do not copy the marketing video's brand assets or music.
4. **Implementation.** Keep scenes in React/TypeScript Remotion, separating real footage, real product capture, typography, device/camera and audio. Read `.agents/skills/remotion-best-practices/SKILL.md`. Use `.agents/skills/device-3d-stage/SKILL.md` only when a real 3D phone makes the scene better than a two-dimensional capture.
5. **Audio.** Original/licensed music and SFX; commercial-use-cleared neural narration. Sync voice beat boundaries, duck BGM, fade tails, no clipping. An available TTS is not automatically commercially licensed.
6. **Dual QA loop.** Render 15+ representative stills, include transition boundary frames, and preview **the actual MP4 at normal playback speed**. Use `.agents/skills/product-launch-video/SKILL.md` to separately critique design/layout, readability, narrative/pacing, and brand/product authenticity. Run `scripts/qa-render.py` for technical facts; it does not certify creative quality.
7. **Delivery gate.** Deliver a playable H.264/AAC MP4, storyboard, GitHub Actions successful run and notes on any unresolved licensing/demonstration limitations. Successful CI alone is never "beautiful" or "production ready".

## Rejection rules

Reject cards appearing independently each scene, rotating fake HTML phones, editorial labels like `01 / THE BUSINESS`, random decorations, falsely implied features, tiny unreadable UI, transitions without shared geometry, repeated fade/zoom, hard cuts not motivated by music or a story, black frames, and UIs unlike actual EzSites. Preserve original reference authorship: use reference **motion grammar**, not copyrighted source media.

## Upstream resources (pinned by bootstrap)

- Motion From Reference / device-3d-stage / marketing-video: MIT (`sub-level/marketing-videos`)
- Video-shotcraft: Apache-2.0 (`Vincentwei1021/video-shotcraft`)
- Product Launch Video: MIT (`EveryInc/product-launch-video`)
- Remotion official Agent Skills: (`remotion-dev/skills`)

See `docs/ezsites-v4-integration.md` for exact checkout pins and commands.