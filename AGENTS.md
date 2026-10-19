# AI Video Production — persistent AI Director contract

**Read first in EVERY new coding-agent / ChatGPT session.** This repository is the durable state of the project. The previous chat's memory, status summaries and screenshots are **not authoritative**.

## Mandatory startup — no skipping on a new conversation

1. Verify the live repository/branch; while [PR #3](https://github.com/edwardceonline/AI-Video-Production/pull/3) is Draft, use working branch `experiment/lemo-opuscar-native`, **not a stale `main` copy**.
2. Open [`docs/AI_DIRECTOR_START_HERE.md`](docs/AI_DIRECTOR_START_HERE.md), [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md), [`docs/LEMO_STYLE_CAPABILITY_MATRIX.md`](docs/LEMO_STYLE_CAPABILITY_MATRIX.md), [`docs/PRODUCTION_PLAYBOOK.md`](docs/PRODUCTION_PLAYBOOK.md). Do not assume you've read them because they are listed here.
3. When directing a **new Lemo film**, READ THE UNMODIFIED UPSTREAM FILES (pinned commit `b5e8ef93930b6d828f352055a689320f138237b1`) in order: `AGENTS.md` → `DIRECTOR.md` → `TECHNIQUE.md` → the chosen **single** `styles/<slug>/STYLE.md` (in full). For changing a style, read upstream `MY-STYLES.md`. Original Lemo method remains authoritative for visual/animation decisions.
4. Inspect the actual product repo/files and verify current app features before writing factual advertising. Never invent a screenshot, feature, commercial claim, or finished video; say when a source cannot be accessed.

## Production contract

- **ChatGPT = AI Director in the active chat**, not an always-running Claude Code agent. GitHub Actions = deterministic install/render/QA; it does not execute ChatGPT or Claude autonomously.
- **Style before storyboard:** shortlist 2–3 compatible styles with [capability evidence](docs/LEMO_STYLE_CAPABILITY_MATRIX.md), then recommend one primary style; differentiate 51 documented styles from the ONE style verified on this project's CI (`swiss-motion`).
- **Treatment before demo:** 1–2 reference benchmarks and what *not* to copy; three alternative structures; one story goal/turn; shot reasons; signature native move; score grid/silences/SFX; character model/style frames. Only afterwards read the upstream demo for techniques.
- **User review gate:** for a new/changed brief, propose storyboard, style, voice and audio then wait for explicit approval before implementation; if the user already authorized that precise work, proceed.
- **Real output gate:** build an actual MP4, verify frame/audio stream/duration, subtitles/readcheck/Whisper/credits and source-derived review frames, inspect the delivered artifact and fix issues. CI green or a commit alone does not constitute a completed video.
- **Assets and rights:** genuine EzSites logo and UI only where verified; illustrative designs must be distinguished from actual app screenshots. `CREDITS` and factual `FACTS.md` as appropriate. Check all font/music/model/Remotion commercial license requirements.
- **Remotion truth:** do not claim the current `OffthreadVideo` **bridge** is a from-scratch Remotion-rendered design. Compose true React/Remotion scenes only when needed/actually implemented.
- **Branches and release:** use topic branches / Draft PR. PR #3 must stay Draft until the user approves. No unsolicited production merges.
- **Continuity:** update [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md) after any significant decision, status change, render, or blocker; include repo SHA/run/artifact IDs, verified vs unverified, approvals, known limitations. Never invent a `sandbox:/mnt/data` file link.

## For new ChatGPT Project conversations

To make the above bootstrap appear in the **new chat's instructions**, the user needs to add [`docs/CHATGPT_PROJECT_INSTRUCTIONS.md`](docs/CHATGPT_PROJECT_INSTRUCTIONS.md) to the ChatGPT Project instructions **once**. A GitHub README alone cannot cause new chats to automatically fetch files.

**Upstream priority:** Lemo's original `AGENTS.md`/`DIRECTOR.md`/`TECHNIQUE.md`/`STYLE.md` remain the authority for Lemo's directing/stylistic invariants. This file adds ChatGPT Project continuity, verified product facts, review/approval and delivery rules only.
