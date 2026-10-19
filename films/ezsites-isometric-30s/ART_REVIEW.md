# Art review — first source-code style proof REJECTED

Status: **REJECTED BY USER** on 2026-10-19. Do not continue the full 30-second film using the current code artwork simply because 5s preview rendered.

## User's concrete criticisms
- Decorative metadata (`CHAPTER 03`, `A BUSINESS STORY`, `CONCEPT FILM`) feels cheap.
- Oversized title cards do not relate causally to world objects.
- Overall graphics are not premium; models are too primitive.

## Diagnosed sources
`index.html` has `base()`, `titles()`, `caption()` drawing generic editorial poster chrome. `shop()`, `tree()`, `webStation()`, `domainStation()` and `emailStation()` rely on simple box primitives without subject-defining craft or lived-in surroundings. Rendering correctness is **not** art-direction quality.

## Failed V2 internal code experiment (not approved)
Tried source-code revisions with café windows/awning, textured storefront, richer foliage, and removal of generic labels. Improved detail slightly but was still a primitive low-poly diorama and **did not reach commercial quality**. Do not mark it approved or treat source render as a match for any cinematic art reference.

## Candidate creative change (NOT YET APPROVED)
Keep the user's 30-second approved **Beyond Your Front Door** story, English narration, 9:16 output and three real product pillars. Change primary Lemo style from **`iso-infographic`** (flat three-tone diagrams) to **`tilt-shift`** (cinematic miniature worlds, modeled facades, detailed shop props, simulated people, physically plausible lighting, strong depth of field and compositing), which better matches the desired premium mini-world aesthetic. Original style guide: `styles/tilt-shift/STYLE.md` at pinned Lemo SHA.

A concept storyboard image was generated purely to **establish visual quality**; its objects/logos/UI and text are **not approved or validated film assets** and are NOT the output of working scene code. It cannot be used to assert renderability. Verify logo shape using genuine EzSites app asset and UI labels/flows against active code; no invented business capabilities or claims.

## Release gate
1. Ask user to approve changing the primary style to `tilt-shift`, which is materially different from initial `iso-infographic`.
2. If approved, write revised treatment BEFORE looking into upstream tilt-shift demo, then prototype detailed native Three.js shop and camera/lens proof, using original source-rendered frames only as implemented evidence.
3. Only accept style frame when the café reads immediately as an actual café (signage, glazed entrance, counter, seating, windows, vegetation, scale), digital stations look like convincing software/communication metaphors and every shot has intentional camera design.
4. No generic “CHAPTER”, “STORY”, “CONCEPT FILM” labels or arbitrary footer blocks in the paid advertisement. Text appears in the scene as signage/legible UI, voice captions or CTA.
5. Never present an AI-generated style reference as a source-rendered proof. Render 3–5s native original film code (test Three.js/DOF/GPU on CI) before greenlighting all 30s.
