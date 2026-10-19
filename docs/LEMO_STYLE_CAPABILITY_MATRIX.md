# Lemo-Opuscar — 51-style production capability matrix

**Canonical snapshot:** [Lemo-Opuscar `b5e8ef93930b6d828f352055a689320f138237b1`](https://github.com/lemomo-ai/lemo-opuscar/tree/b5e8ef93930b6d828f352055a689320f138237b1); original [style index](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/README.md). 51 public styles, **10 groups**; `styles/_template` is scaffolding, **not style #52**.

**How to interpret this matrix:** This is a source-backed *pre-production assessment*, not measured FPS, output quality, or proof of commercial readiness. The medium/engine and native moves were cross-checked against each `STYLE.md`'s `§1`, `§8` and `§10`. **Complexity** (Trung bình / Cao / Rất cao) is a qualitative engineering estimate, not a cost or runtime benchmark. **Fit** is an editorial estimate for the *current product* (EzSites small-business app) or a cybersecurity explainer; it does not imply that a style is technically incompatible. **CI** status is independent from suitability.

**Warning:** All examples/demos show possibilities. For a fresh film, original `STYLE.md` must be read in full, treatment written **before** inspecting `DEMO.md`, and demo code borrowed only for techniques. No style instantly transforms an existing video; the film needs its own deterministic drawing code and licensed assets.

## Full audit: 51 styles

### Evidence Films

| Style / upstream guide | Drawing medium / engine family | Defining move | Inputs, extras and authenticity | Effort* | EzSites | Cybersecurity |
|---|---|---|---|---|---|---|
| [Satellite Briefing](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/satellite-briefing/STYLE.md) | WebGL2, multi-scale imagery plates | Satellite-to-ground scan, georeferenced measurements | Real, licensed satellite images; geometry, dated measurements (FACTS); cache ~GB | Rất cao | Thấp | Cao |
| [Engineering Briefing Board](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/briefing-board/STYLE.md) | Canvas/WebGL board + real cut-out photos | Camera follows drawn measurement line across a physical whiteboard | Own/licensed photos; sourced facts; photo masking may need ONNX | Cao | Trung bình | Cao |
| [LiDAR Survey](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/lidar-survey/STYLE.md) | WebGL2 point cloud + terrain mesh | LiDAR canopy peel, point-to-surface condensation | Authentic LAZ/EPT scan, DTM, measurements; laspy/lazrs/scikit-image | Rất cao | Thấp | Cao |
| [Projection on White Model](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/white-model/STYLE.md) | Three.js projected-light architecture | A projector reveals layers on a constant white massing model | Real building/model geometries, datasets, source-specific adapters | Rất cao | Thấp | Trung bình |
| [Data Physicalization](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/data-physical/STYLE.md) | Three.js physical instancing | Real counts become exact-scale stacked objects | Verified numeric datasets, units, material HDRI; FACTS | Cao | Thấp | Cao |
| [Exploded Teardown](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/teardown/STYLE.md) | Three.js exploded CAD/PCB | Lift product layers; camera enters part gaps | Real product engineering CAD/KiCad/BOM, model-prep, permission | Rất cao | Thấp | Cao |
| [Microscope Story](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/microscope/STYLE.md) | Image plates + microscope scan/render | Dive between true magnification levels and measure specimens | Real slide images and scale bars; TIFF reader packages | Rất cao | Thấp | Cao |
| [Archive Light Table](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/archive-lighttable/STYLE.md) | Canvas/WebGL scans + moving loupe | Develop a negative under magnifier, animate a marked archive line | Licensed authentic scans, photographs, source catalogue | Cao | Thấp | Cao |

### Hand-drawn & Painting

| Style / upstream guide | Drawing medium / engine family | Defining move | Inputs, extras and authenticity | Effort* | EzSites | Cybersecurity |
|---|---|---|---|---|---|---|
| [Crayon Picture Book](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/crayon-book/STYLE.md) | Canvas2D + WebGL paper/brush compositor | Hidden white wax emerges under color wash | Original illustration/model sheets and crayon rigs | Cao | Trung bình | Trung bình |
| [Watercolor Brush](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/watercolor/STYLE.md) | Canvas2D raster wash/strokes | Subject paints itself stroke-by-stroke | Original drawings, brush shapes, font | Cao | Trung bình | Trung bình |
| [Chinese Ink Wash](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/ink-wash/STYLE.md) | Canvas2D + WebGL ink on paper | One living calligraphic stroke becomes scene | Original brush paths, characters/scenery, stroke order | Cao | Thấp | Trung bình |
| [Impasto Oil Painting](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/impasto/STYLE.md) | Canvas2D knife-stroke rendering | Repaint grey world in thick impasto color | Original reference plates/stroke maps and lighting textures | Cao | Trung bình | Trung bình |
| [One-line Drawing](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/one-line/STYLE.md) | SVG path → Canvas2D ink | Never-lifting line morphs object A into B | Original SVG continuous paths, arc-length layout | Trung bình | Trung bình | Trung bình |
| [Whiteboard Explainer](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/whiteboard/STYLE.md) | Canvas2D vector stroke engine | Pen writes an explainer in stroke order; magnet navigation | Original diagrams, stroke-font glyphs, narration facts | Trung bình | Cao | Cao |
| [Urban Sketch · Pen & Wash](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/urban-sketch/STYLE.md) | Canvas2D fineliner + WebGL wash | Outline first, wet color arrives second | Hand-built subject outlines and washes | Cao | Trung bình | Trung bình |

### East Asian Traditions

| Style / upstream guide | Drawing medium / engine family | Defining move | Inputs, extras and authenticity | Effort* | EzSites | Cybersecurity |
|---|---|---|---|---|---|---|
| [Shadow Puppetry](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/shadow-puppet/STYLE.md) | Canvas2D cutout rigs + WebGL lamp screen | Backlight, cut hide puppets and articulated silhouettes | Original puppet cuts, joints, pattern assets | Cao | Thấp | Trung bình |
| [Ukiyo-e](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/ukiyoe/STYLE.md) | Canvas2D block-print engine | Scroll through a set of woodblock views | Original print plates, carved strokes, landscape shapes | Cao | Thấp | Trung bình |
| [Red Paper-cut](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/papercut-red/STYLE.md) | Canvas2D paper cuts + WebGL lightmap | Fold, cut, unfold symmetrical paper into a scene | Original silhouette and cut patterns; joint rigs | Cao | Thấp | Trung bình |
| [Paper-cut Lightbox](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/paper-lantern/STYLE.md) | Three.js multilayer illuminated paper | Lamp lights 6–9 stacked cut-paper sheets | Original die-cut layers, scene props, 3D lighting | Cao | Trung bình | Trung bình |

### Print & Printmaking

| Style / upstream guide | Drawing medium / engine family | Defining move | Inputs, extras and authenticity | Effort* | EzSites | Cybersecurity |
|---|---|---|---|---|---|---|
| [Risograph Print](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/risograph/STYLE.md) | Canvas2D + WebGL stencil/registration | Spot-color plates overprint to reveal a subject | Original separations / plate masks | Cao | Trung bình | Trung bình |
| [Halftone Dossier](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/halftone-dossier/STYLE.md) | DOM/Canvas graphics + dot screen | Case-file accusation, halftone stamps and pop titles | Original dossier story, original icons, sourced claims | Trung bình | Cao | Cao |
| [Woodcut Print](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/woodcut/STYLE.md) | Canvas2D carved-mask renderer | Carve light into black block | Original SVG paths/masks, hand-cut tone fields | Cao | Thấp | Trung bình |
| [Copperplate Engraving](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/engraving/STYLE.md) | Canvas2D burin stroke engine | Outline, cross-hatch, ink/pull the printed plate | Original contours / SVG paths, period textures | Cao | Thấp | Trung bình |
| [Silkscreen Travel Poster](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/silkscreen-poster/STYLE.md) | Canvas2D silkscreen paths | One opaque spot-ink print per beat | Original poster/vector contours, 4–6 color separations | Trung bình | Trung bình | Trung bình |

### Graphic & Type

| Style / upstream guide | Drawing medium / engine family | Defining move | Inputs, extras and authenticity | Effort* | EzSites | Cybersecurity |
|---|---|---|---|---|---|---|
| [Swiss Motion Graphics](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/swiss-motion/STYLE.md) | Canvas2D typography and grid clips | Title/grid reflow; crisp knife-edge cuts | Verified brand logo/text, brand palette; no fake product UI | Trung bình | Cao | Cao |
| [60s Spy Title Sequence](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/spy-titles/STYLE.md) | Canvas2D cut-paper/animated title silhouettes | Letters become physical scenery, scored brass cuts | Original silhouette rigs and cut-paper type | Cao | Trung bình | Trung bình |
| [Art Deco](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/art-deco/STYLE.md) | Canvas2D gold/airbrush geometric layout | Lit marquee bulbs and axis-locked reveals | Licensed type, original decorative shapes | Trung bình | Trung bình | Trung bình |
| [Blueprint](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/blueprint/STYLE.md) | Canvas2D drafting + WebGL paper | Technical strokes laid down in engineering order | Original diagrams, scale and factual measurements | Trung bình | Trung bình | Cao |
| [Stained Glass](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/stained-glass/STYLE.md) | Canvas2D/ WebGL lead and lighting | Moving beam brings one pane to life | Original glass-piece geometry and 2D rigs | Cao | Thấp | Trung bình |
| [Pictogram Motion](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/pictogram-motion/STYLE.md) | Canvas2D geometric icons + beat EDL | One beat-locked action per flat flash card | Original pictograms, accurately countable items | Trung bình | Cao | Cao |
| [ASCII / CRT Terminal](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/ascii-crt/STYLE.md) | Canvas2D monospace glyphs + WebGL CRT | Characters recompose into images inside phosphor grid | Custom character-grid art, typography and ASCII assets | Trung bình | Trung bình | Cao |

### Information & Keynote

| Style / upstream guide | Drawing medium / engine family | Defining move | Inputs, extras and authenticity | Effort* | EzSites | Cybersecurity |
|---|---|---|---|---|---|---|
| [Data Storytelling](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/dataviz/STYLE.md) | Canvas2D pencil marks, verified charts | Data marks sonify real values; meaningful axes grow | Traceable numeric dataset with FACTS, chart specification | Cao | Trung bình | Cao |
| [Isometric Infographic](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/iso-infographic/STYLE.md) | Canvas2D true-isometric projector/depth queue | Physical cutaway, isotype count, routes | Original isometric scene geometry and labelled content | Trung bình | Cao | Cao |
| [Dark Tech Keynote](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/dark-keynote/STYLE.md) | Canvas2D 2.5D precise keynote UI | Grid accumulation, one meaningful light/UI reveal | Original illustrative software UI and verified statements | Trung bình | Cao | Cao |
| [Living Screencast](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/living-screencast/STYLE.md) | HTML/CSS/SVG live DOM UI + 2D pixel mascot | UI-born pixel mascot; cursor tracking and zoom | Accurate real app structure/states & text; no fake screenshots | Cao | Rất cao | Cao |
| [Sci-fi Hologram HUD](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/hologram-hud/STYLE.md) | Canvas/WebGL wireframe + HUD overlays | Object scans into wireframe and tracked exploded callouts | Model/geometry/specifications with verified measurements | Cao | Trung bình | Cao |

### Cartoon & Anime

| Style / upstream guide | Drawing medium / engine family | Defining move | Inputs, extras and authenticity | Effort* | EzSites | Cybersecurity |
|---|---|---|---|---|---|---|
| [1930s Rubber Hose Cartoon](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/rubber-hose/STYLE.md) | Canvas2D boiling-ink rigs | Every character and prop bounces on a jazz beat | Original cast rigs/model sheets, license-safe instrumentation | Cao | Trung bình | Trung bình |
| [80s Cel Anime](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/cel-anime-80s/STYLE.md) | Canvas2D cel rigs + WebGL VHS | Limited anime cels over painterly backdrops | Original anime model sheets, painted backgrounds, lighting | Rất cao | Trung bình | Cao |
| [Sci-Fi Sitcom Toon](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/scifi-toon/STYLE.md) | Canvas2D articulated cartoon characters | Duo contrast, portal to alternate palette worlds | New character rigs, dialogue casting, lipsync | Rất cao | Trung bình | Rất cao |
| [Mid-century Cartoon](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/midcentury-toon/STYLE.md) | Canvas2D 1950s two-plate limited animation | Off-register print + presenter gesture explains a step | Original presenter rigs, factual explainer diagrams | Trung bình | Cao | Cao |

### Games

| Style / upstream guide | Drawing medium / engine family | Defining move | Inputs, extras and authenticity | Effort* | EzSites | Cybersecurity |
|---|---|---|---|---|---|---|
| [16-bit Pixel RPG](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/pixel-rpg/STYLE.md) | Canvas2D indexed 320×180 framebuffer | Palette flood and dialogue/save-file reveals | Original pixel sprites, maps, UI copy, chiptune | Cao | Trung bình | Cao |
| [HD-2D](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/hd-2d/STYLE.md) | Three.js 3D scenes + billboard pixel rigs | Sprite shadows react to lights in diorama | Original pixel sprite sheets, 3D kit and lighting | Rất cao | Trung bình | Cao |
| [Microgame Frenzy](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/microgame/STYLE.md) | Canvas2D + multi-medium WebGL shaders | Every 2.5–4s task switches medium and speeds up | Many original mini-scenes, playable rules, original characters | Rất cao | Trung bình | Cao |
| [Game Show Flat](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/game-show/STYLE.md) | SVG/DOM vector + synth score | Beat-locked call-and-response judged on stage | Original toy-like characters, rounds, results, music | Cao | Trung bình | Trung bình |

### Cinema & Eras

| Style / upstream guide | Drawing medium / engine family | Defining move | Inputs, extras and authenticity | Effort* | EzSites | Cybersecurity |
|---|---|---|---|---|---|---|
| [1920s Silent Film](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/silent-film/STYLE.md) | Canvas2D ink redraw + WebGL print damage | Pantomime chain reaction, iris and title cards | Original acting rigs, historically styled cards | Cao | Thấp | Cao |
| [Liminal Found Footage](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/backrooms/STYLE.md) | Three.js procedural spaces + VHS pass | Focus/exposure hunt through unsettling empty interiors | Original sets, generated textures, music and soundscape | Rất cao | Thấp | Cao |

### Materials & 3D

| Style / upstream guide | Drawing medium / engine family | Defining move | Inputs, extras and authenticity | Effort* | EzSites | Cybersecurity |
|---|---|---|---|---|---|---|
| [Brick Toy](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/brick-toy/STYLE.md) | Three.js physical bricks and stop-motion rigs | Brick-by-brick build with snap foley | Custom brick designs / models, macro lighting | Rất cao | Trung bình | Trung bình |
| [Paper Pop-up Book](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/paper-popup/STYLE.md) | Three.js paper geometry + Canvas illustration | Book page turns and sets unfold into 3D stage | Original pop-up spreads, cutout figures and textures | Rất cao | Trung bình | Trung bình |
| [Tilt-Shift Miniature](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/tilt-shift/STYLE.md) | Three.js miniature city/traffic + post DoF | Time-lapse then speed crash to a human-scale beat | 3D mini-world, vehicles/crowd simulation, lighting | Rất cao | Trung bình | Trung bình |
| [Low-poly Isometric Island](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/lowpoly-island/STYLE.md) | Three.js faceted procedural island | Objects pop in on notes; one build becomes a song | Original 3D props, music events, world layout | Cao | Trung bình | Trung bình |
| [Glass Product Render](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/glass-product/STYLE.md) | Three.js transmission/PMREM studio | Glass-and-light reveal with exploded fictional object | Original fictional glass geometry, robust GPU/3D lighting | Rất cao | Thấp | Trung bình |

## CI evidence vs. capability

- **Only `swiss-motion` has a verified integration** in this project: EzSites native Lemo 20s and Remotion *bridge*, run [#52](https://github.com/edwardceonline/AI-Video-Production/actions/runs/39300769977), 1080×1920/24 fps/H.264+AAC, native 480 frames. **The Remotion bridge just re-encodes the Lemo MP4; it is not a Remotion-authored scene.**
- **50 other styles are not E2E-tested in this project's GitHub Actions.** Their example demo films exist upstream, but they are NOT proof that a new user film will render, preserve visual fidelity, or meet resource limits on our runner.
- Availability of shared renderer, core sound tools and source guides does **not** mean every specialist engine is vendored, or that third-party libraries/assets (CAD, LiDAR, 3D scenes, TIFF) have been downloaded.
- The repository `AGENTS.md` and `docs/AI_DIRECTOR_START_HERE.md` define the procedure to choose and validate one primary style at a time.

## Product-appropriate shortlist and limitations

| Product objective | Start with | Reason | Condition before approval |
|---|---|---|---|
| EzSites 15–30s brand ad and CTA | `swiss-motion`, `pictogram-motion` | Distinctive advertising graphics, fast readability | Validate on a 9:16 frame; logo and factual claims correct |
| Show **real app** create → preview → publish | `living-screencast` as base for a custom mobile variant | Motion follows actual UI interactions, not made-up functionality | Need authentic mobile UI data, exact states and labels; upstream style redraws the UI and adds a pixel mascot (not generic screen capture). Design adaptation requires approval |
| Premium *software* feature launch | `dark-keynote` | Native UI-motion grammar, restrained highlights | Original illustrative UI only unless rebuilt faithfully from verified assets |
| Explain website + domain + business email as a system | `iso-infographic` | True-isometric connections and continuous visual causality | Prevent slide-like feature cards and falsely implied integrated billing/pricing |
| Product tutorial / FAQ | `whiteboard`, `midcentury-toon` | Clear sequential explanations | Sourced features, accessible subtitles, safe timing |
| Cybersecurity story/incident | `ascii-crt`, `blueprint`, `halftone-dossier` | Strong metaphor and technical language | Avoid fake console logs presented as real forensic data |
| Cybersecurity empirical analysis | `briefing-board`, `dataviz`, `satellite-briefing` only if pertinent | Facts supported by real measurements and sources | `FACTS.md` and licenses mandatory |
| Photoreal glass product spot | `glass-product` **NOT the default for actual EzSites mobile app** | Original style requires a *fictional physical object* | Do not silently rewrite native style to depict real phone/UI; formally create a custom derivative if needed |

## Reusable style-selection scorecard (not yet automated)

Score each proposed style 1–5, supported by a sentence of evidence: (a) audience and communication goal, (b) product/brand truth, (c) appropriateness of its native moves, (d) authentic assets available, (e) runtime / dependencies / runner fit, (f) 9:16 legibility and sound. Keep actual runtime/test status separate from the score. Present **2–3 candidate styles**, select **one** primary style only after discussing the trade-offs; do not blend two incompatible style invariants without following upstream `MY-STYLES.md`.

For a previously untested style: create an authentic **one-frame style proof**, then a **3–5 s motion/voice/SFX smoke test** (where useful), and only then commit to the full film. Gate on real MP4; don't call compile/run success a creatively approved video.

## Audit trail and license boundary

Upstream files reviewed: `AGENTS.md`, `DIRECTOR.md`, `TECHNIQUE.md`, `MY-STYLES.md`, `styles/README.md`, each of the **51** `styles/<slug>/STYLE.md` files, `core/README.md`, `core/render/*`, `core/tts/*`, `core/audio/*`, `plugin/skills/lemo-opuscar/SKILL.md`. Code/docs MIT; upstream demo films CC BY 4.0; model voices/sample libraries/fonts/third-party media maintain separate rights. See upstream [README license section](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/README.md#licence). Always write `CREDITS` and, for factual films, `FACTS.md`.

*Complexity is preliminary and relative, not a claim of tested speed, budget, or guaranteed fidelity.*
