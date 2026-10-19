# AI Video Production: agent instructions

All deliverables must be real rendered MP4 files. A completed code commit is not a completed film.

## Two renderer interfaces
- Lemo-Opuscar: follow its AGENTS.md, DIRECTOR.md, TECHNIQUE.md, a chosen STYLE.md, the scene's TREATMENT.md, and use the **native** frame/audio tools from a pinned upstream version.
- Remotion: use React for UI footage overlays, composition and reusable motion sections. The first integration is a hybrid composition containing a native Lemo clip; no Remotion-only artistic claim.

## Directing contract
1. Write a treatment with at least three distinct narrative structures and pick one before looking at any Lemo demo.
2. Specify actual user-visible product abilities, verified branding, shot list and cue map. Don't invent UI, pricing or features.
3. Produce style frames and storyboard with the same rendering code used for the video. Check legibility at 9:16.
4. Only use original or properly licensed audio, fonts and imagery; add sources to CREDITS.
5. Voice generation must include transcription-based pronunciation checks. No silent fallback to low-quality synthetic TTS.
6. Review 1–2 second contact sheets, 0.2 second transition strips and the complete video with audio.
7. Deliver an artifact containing a real MP4, SRT, poster, source and CREDITS. The reviewed artifact must match the final commit.
8. Keep new changes on an isolated branch; never merge unfinished experimental code without user review.

## Existing production
- Native Lemo EzSites film: `films/ezsites-lemo-native/`
- Native Lemo build: `films/ezsites-lemo-native/build.sh`
- Remotion composing bridge: `films/ezsites-lemo-native/remotion/`
- GitHub Actions: `.github/workflows/lemo-opuscar-poc.yml`

## Agent limitations
The current GitHub Actions pipeline **renders predefined code**. It does not autonomously prompt Claude/Codex, make creative decisions or access connected private EzSites code. Installing the coding agent and providing authorized model credentials are separate explicit steps; do not claim otherwise.
