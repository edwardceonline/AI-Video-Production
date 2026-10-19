# AI Video Production — live project state

> **Last manually reconciled:** 2026-10-19. **Never treat this as live GitHub status without checking current refs, runs and artifacts.** Update on meaningful changes so a fresh chat can recover without guessing from history.

## Branches and approvals
- Primary repository: [edwardceonline/AI-Video-Production](https://github.com/edwardceonline/AI-Video-Production).
- **Active branch:** `experiment/lemo-opuscar-native`. Draft [PR #3](https://github.com/edwardceonline/AI-Video-Production/pull/3) targets `main` and **must not be merged without user approval**.
- **Upstream original Lemo release pinned:** `b5e8ef93930b6d828f352055a689320f138237b1` (2026-10-19). All guides and engines read against that commit.
- Current request is **documentation and reusable 51-style audit**, NOT authorization to make a new EzSites film.

## Audited capability
- 51 of 51 styles in 10 groups documented in [capability matrix](LEMO_STYLE_CAPABILITY_MATRIX.md). Not all 51 verified on this project's Actions runner.
- Original [`DIRECTOR.md`](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/DIRECTOR.md) is canonical. ChatGPT is director during the active session; GitHub Actions only renders/validates.
- Initial project instructions are distributed in [`CHATGPT_PROJECT_INSTRUCTIONS.md`](CHATGPT_PROJECT_INSTRUCTIONS.md); **user must paste them into the ChatGPT Project settings** to make new chats consistently read the repo. No GitHub commit can directly configure the ChatGPT Project UI.

## Last VERIFIED render (EzSites advertising)
- Film: `films/ezsites-lemo-native` — *One sign, three places*: conceptual small-business storefront → sample website → domain → business email → official EzSites logo.
- Film source commit: `3418ddb58ad88abcd1923fa4da6e4f0a01210c52`.
- [GitHub Actions #52](https://github.com/edwardceonline/AI-Video-Production/actions/runs/39300769977) **two jobs success**: native Lemo 20s + Remotion hybrid.
- Native video: `ezsites-lemo-native-20s`, artifact `12212096564`. 1080×1920, 24 fps, H.264/AAC, 20.0s, 480 frames; Whisper 5/5, 0 mismatches; title readability 5/5; −14.2 LUFS; no black frames reported.
- Remotion bridge: `ezsites-remotion-hybrid-20s`, artifact `12211553234`; re-encodes the native MP4 via `OffthreadVideo`—**not a separately authored Remotion film**.
- **Art/creative boundary:** source-derived review stills/contact sheets were checked; no credible claim of professional end-to-end audio creative review at playback speed. The website depiction is an *illustration*, not actual mobile-app screenshot/recording. User has not approved a release/merge.
- **Artifact retention:** workflow declares `retention-days: 14`; links to original GitHub Actions artifacts may expire. Do not invent sandbox MP4 links in a new chat. Fetch a new/existing artifact or require a durable archive.

## Current documentation deliverables
- Root `AGENTS.md` — AI Director bootstrap rule.
- `docs/AI_DIRECTOR_START_HERE.md` — zero-context start.
- `docs/LEMO_STYLE_CAPABILITY_MATRIX.md` — 51-style audit, inputs, engine, effort and 2-use-case fit.
- `docs/PRODUCTION_PLAYBOOK.md` — milestones / implementation / QA / reporting.
- `docs/CHATGPT_PROJECT_INSTRUCTIONS.md` — short copy-paste instructions for ChatGPT Project settings.
- `docs/templates/VIDEO_BRIEF.md` — optional brief; do not present as a form in chat unless truly necessary.

## On next conversation
1. Verify branch/PR/run state LIVE through GitHub connector.
2. Read `AGENTS.md` and `docs/AI_DIRECTOR_START_HERE.md`, then this file.
3. If user asks for a film, select styles using the matrix, read the selected full upstream `STYLE.md`, propose story and wait for approval.
4. Never infer old app capabilities or artifact availability from this snapshot.
5. Update this file after new commitments, render or product decisions.


## New film — EzSites 30s Isometric (2026-10-19, user-approved storyboard)
- User approved the new 30s 9:16 English **BEYOND YOUR FRONT DOOR** treatment and explicitly allowed **stylized advertising UI** and **logo artwork derived faithfully from the original**. Must retain recognizable EzSites appearance, no false buttons/features.
- New topic branch: `feature/ezsites-isometric-30s` from Draft PR #3 branch; target PR remains draft and **does not change the verified 20s Swiss-motion film**.
- 3 real source-rendered styleframes (2.4s storefront; 14.1s Preview/Publish; 25.2s connected overview) and 5-second 4–9s silent proof at 24fps prepared, reviewed and corrected two layout issues. User visual approval of these **art proofs still pending**; not a full ad.
- Storyboard/voice/audio/claim boundaries: `films/ezsites-isometric-30s/TREATMENT.md`. Exact drawing source: `films/ezsites-isometric-30s/index.html`; reproduction: `scripts/render_preproduction.py`.
- **Unfinished:** the film's end card has a *temporary stand-in* NOT a valid EzSites logo. MUST replace using genuine source asset before production render. Full 30s animation, Kokoro/Whisper, 120BPM score, FFmpeg mastering, CI render and QC are **not yet completed**. Do not represent 5s proof as completed final.
