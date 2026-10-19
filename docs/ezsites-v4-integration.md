# EzSites V4: integrated video production skills

This branch adds the actual skill loader, a production-specific agent brief, and a repeatable reference-analysis script. It does **not** claim that the EzSites V4 film has already been rendered or visually approved.

## Start

```bash
bash scripts/bootstrap-skills.sh
cat .agents/skills/ezsites-commercial/SKILL.md
python3 scripts/analyze-reference.py /absolute/path/to/Bring-your-ideas.mp4 /absolute/path/to/10-Best-App.mp4 --output reference-analysis/measurements.json
```

The bootstrap pins the following publicly published revisions before creating local agent-skill links:

| Repo | Pinned Git SHA | License / role |
| --- | --- | --- |
| `sub-level/marketing-videos` | `696073f596079c137cb8dffa00c4bb56dc508308` | MIT; reference measurement, 3D devices, sound |
| `Vincentwei1021/video-shotcraft` | `43bd349a136651865ecfa6ea1cf012f6e957d304` | Apache-2.0; shot recipes and implementations |
| `EveryInc/product-launch-video` | `68660ae0cbbeb2b942addff4c9b2ca6bbefc5721` | MIT; multi-critic QA |
| `remotion-dev/skills` | `1441a11e95db35443bd76bb318386c0d3ca00053` | Official Remotion workflow skills |

This does not install ChatGPT plugins or require Claude. These are local *agent instructions / code reference sources*, compatible with agents that read `.agents/skills` (or by pointing an agent to each `SKILL.md`). Runtime Remotion dependencies remain in each video package.

## References and business assets

- User-provided Base44 and App Promotion MP4s are input media for **local reference study only**. Never publish their MP4s or copy footage/music into the ad.
- Derived machine-detected candidate scene-cut timestamps are in `reference-analysis/measurements.json`; these need human validation. Timing examples are *not* exact camera/easing analyses.
- Approved live site: `https://kurotsuki.sites.ezsites.app` (published publicly). The unlisted user-provided preview URL is not committed.
- React Native UI truth: private `Games-Viet-GbR/Website-Assistant` repo. Get authorized screenshot/recording from a running test build; do not include secrets or actual customer inboxes in captures.

## QA gate

Before release, extract representative frames and review each transition; render/watch the entire MP4; verify video length, codec, aspect ratio and audio with `scripts/qa-render.py`. Independently review motion against measured reference. Fix failures and re-render. Never use a self-assigned numerical score as a substitute for visual quality or user acceptance.

## Production decisions

- Keep the approved first four seconds from V3; redo the rest as a continuous product narrative.
- Product display must be the real Kurotsuki site, never a fake generated page.
- End card must show the exact original EzSites logo, no fake decorative navigation or section labels.
- Use 9:16, English narration, mastered background score with ducking and SFX, 1080x1920 at 30 fps, with a final downloadable file.