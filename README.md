# AI Video Production

**Code-first video production with ChatGPT as AI Director, Lemo-Opuscar style guidance, React/Remotion composition, Kokoro voice, original sound design and FFmpeg mastering.** The goal is a **real downloadable MP4**, not a script or a repository commit.

## New ChatGPT conversation? START HERE

The project's durable source of truth is GitHub, **not** the transient memory of an earlier chat.

1. Read [**`AGENTS.md`**](AGENTS.md) — always-read AI Director instructions.
2. Read [**`docs/AI_DIRECTOR_START_HERE.md`**](docs/AI_DIRECTOR_START_HERE.md) — zero-context onboarding and current branch.
3. Read [**`docs/PROJECT_STATE.md`**](docs/PROJECT_STATE.md) — latest documented status; verify live GitHub data.
4. Use the [**51-style capability matrix**](docs/LEMO_STYLE_CAPABILITY_MATRIX.md) and [**production playbook**](docs/PRODUCTION_PLAYBOOK.md).
5. **One-time setup:** add the text in [`docs/CHATGPT_PROJECT_INSTRUCTIONS.md`](docs/CHATGPT_PROJECT_INSTRUCTIONS.md) to the **AI Video Production ChatGPT Project instructions** so new project chats know to perform steps 1–4. GitHub documents do not load themselves into a new chat.

Example new-chat prompt:
> Bắt đầu theo AI Director workflow của AI Video Production. Đọc AGENTS.md, START_HERE, PROJECT_STATE và style matrix trên GitHub trước khi làm. Tôi muốn tạo video quảng cáo 30 giây cho EzSites.

## What we learned from Lemo-Opuscar

- 51 public documented styles in 10 groups, each with a `STYLE.md`, reference demo, assets and varying drawing engines. **They are not 51 turnkey video templates.**
- Canonical [upstream Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar), fixed at `b5e8ef93930b6d828f352055a689320f138237b1`, supplies agent director instructions, specialist Canvas/WebGL/Three.js style demos, frame renderer, Kokoro/Whisper, synthesized/sampled scores, foley and loudness mastering.
- No upstream autonomous video-directing model, existing-user app assets, or native Remotion scenes. A coding agent reads the guides and writes original film code. See the capability matrix for per-style dependencies and CI limits.

## Verified experiment: EzSites 20s

Working branch: `experiment/lemo-opuscar-native` — [**Draft PR #3**](https://github.com/edwardceonline/AI-Video-Production/pull/3). Do not merge without user approval.

- **Native Lemo film:** [`films/ezsites-lemo-native`](films/ezsites-lemo-native/README.md). Real English vertical 20s EzSites ad: conceptual local shop → illustrative website → domain → business email → authentic EzSites end card. Original procedural music and action-locked SFX, Kokoro voice with faster-whisper line check.
- **Render validation:** [GitHub Actions #52](https://github.com/edwardceonline/AI-Video-Production/actions/runs/39300769977) successfully built native and Remotion hybrid jobs from film commit `3418ddb58ad88abcd1923fa4da6e4f0a01210c52`. 1080×1920, 24fps, native 480 frames / 20s, H.264/AAC, Whisper 5/5. See [`PROJECT_STATE.md`](docs/PROJECT_STATE.md) for artifact IDs and quality limitations.
- **Remotion status:** a 480-frame React composition currently wraps/re-encodes the real native film via `OffthreadVideo`. This confirms integration, **not** that the film's animation scenes were authored in Remotion.
- **Commercial/creative limits:** illustrated website isn't a real app screen; final full-speed audio creative judgement and release approval remain user gates. Workflow artifacts expire (14-day retention in the current workflow).

## Pipeline and responsibilities

```text
User brief → ChatGPT AI Director → Lemo guides + 51-style selection
    → TREATMENT.md / storyboard / 120-BPM cue map → user approval
    → source code + authentic assets + voice + music + foley
    → native Lemo render + optional original Remotion compositions
    → FFmpeg master + Whisper / readcheck / ffprobe + visual review
    → actual downloadable MP4 → user approval
```

**Execution:** GitHub Actions uses the upstream renderer at a pinned commit and Ubuntu 22.04 with Python 3.12, Node 22, FFmpeg. See `.github/workflows/lemo-opuscar-poc.yml` and the film's `build.sh`. The live rendering state is in GitHub Actions; do not infer it from this README.

## Documents

| File | Use |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Agent contract for *every* conversation |
| [`docs/AI_DIRECTOR_START_HERE.md`](docs/AI_DIRECTOR_START_HERE.md) | New-chat bootstrap |
| [`docs/LEMO_STYLE_CAPABILITY_MATRIX.md`](docs/LEMO_STYLE_CAPABILITY_MATRIX.md) | Source-backed comparison of **all 51 styles** |
| [`docs/PRODUCTION_PLAYBOOK.md`](docs/PRODUCTION_PLAYBOOK.md) | End-to-end production gates and review |
| [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md) | Facts, SHA, pending approvals, recent artifacts |
| [`docs/CHATGPT_PROJECT_INSTRUCTIONS.md`](docs/CHATGPT_PROJECT_INSTRUCTIONS.md) | One-time ChatGPT Project settings copy |
| [`docs/templates/VIDEO_BRIEF.md`](docs/templates/VIDEO_BRIEF.md) | Internal brief template (not a mandatory user form) |
