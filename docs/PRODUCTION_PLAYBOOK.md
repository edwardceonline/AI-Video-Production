# Production playbook — ChatGPT AI Director × Lemo × Remotion

This playbook **adds project operational gates**. The creative method remains upstream `AGENTS.md`, `DIRECTOR.md`, `TECHNIQUE.md` and the original `STYLE.md` at pinned SHA `b5e8ef93930b6d828f352055a689320f138237b1`. Read the upstream docs before producing.

## 0. Preparation and product truth
- Confirm exact brief, platform/aspect ratio, runtime, language/voice, users, desired business outcome, available authentic logo/UI footage and publication rights. Only ask for missing blockers; never use a form by default.
- Read the current application repo/docs when verified product functionality matters. Do not invent features: for EzSites, check actual current code for Website, Domain and Business Email before claiming access/price/quotas. Analytics and BYOD must not be presented as available absent new proof.
- Treat public preview/example webpages and drawn marketing mockups as *conceptual*, not screenshots of the mobile app.
- Separate factual claims from fictional narratives. Create `FACTS.md` whenever claiming measurable facts or using empirical Evidence Film styles.

## 1. Style selection (before story)
- Consult [`LEMO_STYLE_CAPABILITY_MATRIX.md`](LEMO_STYLE_CAPABILITY_MATRIX.md) to choose **2–3 plausible styles**, then read each candidate's actual `STYLE.md` §1, §2, §5–10 and its linked asset prerequisites.
- Compare narrative fit, native moves, authenticity of assets, UI truth, legibility on 9:16, sound palette, extra packages, available GPU and CI cost. Disclose CI test status; only Swiss Motion has a project E2E proof.
- Recommend **one primary style**. If the goal requires combining incompatible styles, instead propose a deliberate custom derivative and follow upstream `MY-STYLES.md`—do not claim a default hybrid is a faithful upstream style.

## 2. Directing plan and user approval
Follow upstream `DIRECTOR.md` exactly: one or two *external* benchmarks (learn vs. never copy); three original candidate story structures with selection; one subject/goal/turn, opening hook in ≤3s, visual bookend, one signature native move. Create `TREATMENT.md` *before opening any demo source*.

Include in the treatment: logline/arc; shot list (framing, movement and **reason**); second-by-second beat sheet; tempo/grid/cue map **before animation**; sound table (ambience/foley/music); CTA; captions/typography; product claim sources; style/asset/licensing decisions.

**For this ChatGPT project: submit the plan to the user, wait for approval.** Prior user approval applies only to that specific brief/version.

## 3. Styleframe gate
- Character style: model sheet (turnaround, poses, expressions, palette) + at least two styleframes. Non-character style: three source-rendered styleframes including signature shot.
- Render from the **real production drawing code**, not an unrelated illustration that cannot be implemented.
- For new or heavy styles, run a 3–5-second smoke test before full production. Do not pretend a style engine is portable without verifying it.

## 4. Implementation and production
- Separate film folder with `TREATMENT.md`, `CREDITS`, code, audio, fonts/assets and one-command build.
- Deterministic timeline: `window.DUR`, `render(t)`, `READY`; export `EV` for action-aligned SFX and `TEXTS` for Lemo's text-readability gate.
- Prefer native Lemo Canvas2D/WebGL/Three when implementing a native style. Use **Remotion to author real React scenes** when needed for actual product/UI footage and cross-scene composition. A Remotion `OffthreadVideo` wrapper is only a wrapper.
- Professional voice, score and foley; the same cue source drives picture and sound. License all voice/music/sample/image/font assets and record in `CREDITS`.
- Use GitHub Actions for the actual MP4 render; branch and PR first, leave `main` unchanged until approved.

## 5. Automated QA — required
- Original upstream style contracts and required visual assets exist; errors fail preflight.
- Native: `events.mjs` → source-derived `still.mjs` review frames and 0.2s transitions → `readcheck.mjs` → `video.mjs` → TTS/Whisper/mix → `mux.sh` (ordering can change when runtime dependencies require).
- Check all voice lines with Whisper; no silent truncation. Match audio cue time to visual frame. Target about −14 LUFS and ≤−1.2 dBTP, with no clipping.
- Render actual target resolution, duration, FPS and both audio/video streams; check black frames, broken assets and missing title.
- For Remotion job, verify it rendered **new frames, not simply re-encoded an old clip** when the brief expects Remotion-authored elements.

## 6. Creative review — mandatory before calling it beautiful
- Review at least two contact-sheet passes, critical 0.2-second transition strips, typography clipping, safe regions, genuine UI/brand marks, storyboard correspondence, meaningful motion and sound.
- View the **actual encoded MP4 at full speed with audio**. If that is technically impossible, explicitly report the creative-review limitation and request user review; do not falsely certify it.
- Each failed review should produce a concrete issue list with timestamps and changes. Edit **the same branch**, re-render and review the **new commit**. Avoid redundant re-renders when a docs-only edit suffices.

## 7. Delivery, provenance and continuity
Provide a durable, existing output link to MP4, poster, SRT, source, credits, plus (where appropriate) contact sheet. GitHub artifacts expire: store publication finals in an authorized durable location if required. Mark native Lemo and Remotion-derived videos accurately.

**At every completed milestone (including partial failures), update `PROJECT_STATE.md`**: exact Git SHA, branch, GitHub Actions run, result, file locations, known bugs, remaining approvals and next steps. This is what a future chat will read.

**Never declare “completed” just because code was committed, GitHub Actions was green, or a demo rendered. Completion for a user-requested video requires an actual downloadable, checked MP4.**
