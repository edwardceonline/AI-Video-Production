# AI Video Production — AI Director Protocol (ChatGPT + Lemo-Opuscar)

**Canonical source of truth:** the pinned upstream Lemo-Opuscar files are binding; this file does not invent a substitute directing framework.

## Read at the START of every NEW film, in order
1. `$LEMO_LIB/AGENTS.md`: source workflow; topic, brief, style; treatment before opening demos.
2. `$LEMO_LIB/DIRECTOR.md`: entire directing grammar, benchmark, three structures, sound-first, story/shot/cue map, three source-derived frames, camera reasons, rhythm, silences, legibility and QA.
3. `$LEMO_LIB/TECHNIQUE.md`: render, sound, TTS/ASR, final mix, review.
4. **Exactly one** `$LEMO_LIB/styles/<slug>/STYLE.md`; style invariants cannot be overridden by convenience.
5. This project's `TREATMENT.md`, approved facts, user-controlled source assets and `CREDITS`.

The Github Actions checkout is **not** automatically imported into the current ChatGPT context. Any coding agent/chat director must fetch or read the actual pinned upstream documents afresh before starting a new film. CI `preflight.py` verifies they exist; it cannot substitute for creative judgement.

## Lemo Director's production stages
1. Brief and ownership: verified product claims, actual logos/UI; get approval for materially ambiguous claims or assets.
2. Choose two independent benchmarks; write three story structures and pick one; write a treatment *before* examining a demo.
3. Beat-grid/score before animation; define sound ambience, per-action foley, at least two silences and two sonic J/L-cuts.
4. Draw three production-source style frames, including the signature shot, then complete animation with four meaningful camera moves.
5. Run native Lemo TTS with Whisper check, source-derived stills and 0.2s transition strips, `readcheck.mjs`, native frame render and mastering.
6. Check final MP4/bitstream/black frames, compare real art with treatment; inspect the actual exported file. Mark full-speed video **with sound** as a human-review gate if not performed.
7. Correct specific errors and rerun the exact updated SHA. Export MP4 + poster + SRT + treatment + credits + source.

## Division of responsibilities
**ChatGPT here:** AI Director only while this conversation runs: interprets original Lemo rules, directs the film, executes authorized Github operations, inspects render evidence, iterates. It is **not** a background independent Claude/Opus agent.
**Github Actions:** deterministic rendering / QA worker, not the director.
**Lemo-Opuscar:** primary animation, voice, ASR and mastering runtime from a pinned commit.
**Remotion:** optional compositing, verified as its own job; not a replacement for the upstream directing method.
**Owner:** retains approval for brand, factual claims, commercial music/license, final creative release.

Current film: `films/ezsites-lemo-native/TREATMENT.md`; GitHub Actions: `.github/workflows/lemo-opuscar-poc.yml`; film build: `films/ezsites-lemo-native/build.sh`.
