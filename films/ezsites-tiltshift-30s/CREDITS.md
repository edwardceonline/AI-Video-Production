# CREDITS / licenses — EzSites Tilt-Shift Miniature look test

**No final film yet.** This is a development-stage visual proof; commercial license review must be repeated for the final MP4.

- **EzSites brand assets** — user-controlled Games-Viet-GbR/Website-Assistant mobile assets; official logo NOT yet composited into this first 3D café proof. Source must be image-exact and visually checked before end card.
- **Lemo-Opuscar (MIT)** — original native Tilt-Shift `styles/tilt-shift/demo/post.js` pinned source SHA `b5e8ef93930b6d828f352055a689320f138237b1`; `lemo-post.js` in this repo is adapted for constrained software CI by reducing the gather's taps from 128 to 24; AO is disabled in first pass, not an exact copy of full demo-quality pipeline. Sound and storyboard are original; not copying the demo film.
- **Three.js** — npm package `three@0.178.0`, MIT.
- **Playwright / Chromium** — browser-based deterministic source render; current runner uses SwiftShader.
- **Poly Haven — public domain CC0**: [Coffee Cart 01](https://polyhaven.com/a/CoffeeCart_01) by Joe Seabuhr, and [Potted Plant 04](https://polyhaven.com/a/potted_plant_04) by James Ray Cock. 1K glTF including PBR textures retrieved through [the public Poly Haven API](https://api.polyhaven.com/), filenames and origin recorded in generated `assets/manifest.json`. These two CC0 models are **new** PBR props and their inclusion must be confirmed by a successful CI asset download + visual render. If not loaded, do not claim they appear in the film.
- **Film scene geometry, animated camera and original signage** — scripted procedural meshes by this AI video production project.
- **Typography and model license** — the fictional coffee shop sign uses system Georgia; final EzSites logo/wordmark must preserve original official artwork and commercial rights.
- **No music/voice yet** — 3-second visual proof intentionally silent.

### Quality caveats
The art goal is *premium cinematic miniature*, not a vector-ish low-poly mockup. Real physical PBR assets help but do not alone satisfy the premium review gate. Require actual viewed source frames, sharp café storefront, convincing silhouettes and finished native depth-based lens motion before expanding to the whole 30s.
