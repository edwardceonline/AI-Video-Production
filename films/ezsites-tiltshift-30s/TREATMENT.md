# EzSites / BEYOND YOUR FRONT DOOR — Cinematic Tilt-Shift (revised treatment)

**Approved:** User approved 30s English vertical story, and then specifically approved replacing the flat isometric style with Lemo-Opuscar **Tilt-Shift Miniature** after rejecting the first primitive artwork. **Review gate now is a real code-rendered 3–5-second shop lens/camera proof, not a complete 30-second film.**

## Source of truth and creative corrections

- Lemo-Opuscar pinned SHA `b5e8ef93930b6d828f352055a689320f138237b1`; source files: `AGENTS.md`, `DIRECTOR.md`, `TECHNIQUE.md`, **`styles/tilt-shift/STYLE.md`**. Preserve tilt-shift invariants: macro-look high vantage, thin focus strip, saturated miniature paint, real facade detail, time-lapse low-rate actor motion, smooth camera, aperture and distance-aware DOF, sun/shadow, no bright interface plates overpowering physical storefront.
- Previous `iso-infographic` proof was **rejected** because of cheap `CHAPTER 03`, `A BUSINESS STORY` metadata, disconnected text and simplistic box-shaped people/trees/buildings. This redesign removes all presentation chrome. Text appears only as meaningful café sign/menus, stylized yet accurate software UI or the EzSites CTA; voice captions only where useful.
- The user's artwork direction reference (eight-panel cinematic miniature storyboard) is **a quality/lighting target only**. It is not source-rendered output and contains generated/unverified UI, names and logo. Never claim its visual quality has been implemented just because it is a reference.
- EzSites app allows a **stylized recreation of UI and logo**, provided visual identity and feature flow remain **faithful to original**. Genuine asset in user repo `Games-Viet-GbR/Website-Assistant/apps/mobile-manager/assets/EzSites_full_logo_with_text.png`, verified Git blob `89038e52be405f1649771298c53aa49dad58dd0b`, must be used in final end card or faithfully vector-rebuilt with a visual comparison. A temporary illustration is not a final app screenshot.

## Three original structures (selected structure unchanged, medium redesigned)

A. **Your Business Never Stops:** café closes at night while web presence is always available. Not chosen: could suggest unsupported all-hours response or customer traffic.

B. **Beyond Your Front Door** (CHOSEN): tiny café gets a website preview; owner publishes; domain and business email represent an integrated professional online identity; camera rises over miniature city and CTA. One small business, one desire to be online, one actual transformation. Macro shallow depth and time ramp express the turn.

C. **Customer's Journey:** person outside café visits website and sends message. Not chosen: weak picture of what EzSites allows business owner to set up.

## External benchmarks, lessons and exclusions

- Sam O'Hare, *The Sandpit* (2010): learn high-oblique lens/compression, tilt-shift band, time-lapse miniaturization, textured facades. Do **not** use its shots, city, soundtrack or trademarks.
- Real commercial coffee-product table-top macro photography: learn wood grain, worn painted awnings, window reflection, miniature greenery, warmth, accurate light; no copying any concrete product or studio composition.

## Revised shot list and visual constraints (30s / 24 fps / 1080×1920)

| Time | Framing/camera reason | Story and *in-world* imagery | Speech / video text |
|---|---|---|---|
| 0–4 | High 50° oblique medium → slightly wider, focus band tracks café entrance | The real-looking miniature coffee shop comes alive. Animated 8Hz passers-by against 24fps camera; OPEN sign/coffee-cup props are physically in the set. | “You opened your doors for business.” |
| 4–8 | Lateral follow of one sharp blue ribbon originating at the café | Speed-ramp past corner shops; one blue digital trace leads from the physical door to its web identity; city around grows bokeh. | “Now open a door online.” |
| 8–12 | Smooth dive/closer view of conceptual in-world product station | Owner describes café through stylized, product-faithful EzSites mobile UI. No invented buttons, subscriptions or analytics. | “Tell EzSites about your business.” |
| 12–16 | Camera cuts to 3D website preview tabletop / review and publish action | Actual content, website preview then a user-triggered Publish; no automatic publishing claim. | “Preview it. Publish when you're ready.” |
| 16–20 | Follow white/burnished metal business nameplate to site | Domain represented by purchased eligibility; sample `.example` reserved. | “Give it a domain that's yours.” |
| 20–24 | Cinematic follow on physical letter passing into digital mailbox | Business email as professional correspondence; optional paid eligibility is not implied free. | “And keep conversations going with business email.” |
| 24–26 | Rapid vertical logarithmic rise; at most one blue system line remains vivid | **Signature tilt-shift scale reveal:** neighborhood becomes one coherent business system, no infographic cards. Score drops to natural ambience. | (silence) |
| 26–30 | Branded end card, deliberate 4s hold | **Official, accurate EzSites mark**. Tagline GET YOUR BUSINESS ONLINE with Website · Domain · Business Email small and optional. | “EzSites. Get your business online.” |

## Cue map / music rhythm BEFORE animation

120 BPM, 4/4, 15 two-second bars. Macro opening 0–4 warm mallet motif, shop bell first beat; route 4–8 soft synth pulse adds, timelapse speed increases and passers-by step at 8 Hz; 7.5s pre-UI near-silence. App section 8–12 dry UI clicks but real 3D miniature surroundings, 11.75s publish sound J-cut. Preview/publish 12–16 airy strings/chime resolving exactly when owner presses publish; domain 16–20 neat wood/metal click at 16.5; 19.75s email chime J-cut; email 20–24 soft paper foley with warm pads; reveal 24–26 final logarithmic camera rise with music dropping away 25.25–25.75s; 26–30 low clean brand impact, closing chord, no CTA crowding.

**Three layers:** miniature street ambience (café air, street sound); action-locked small material foley (bell, paper, keypad, sign placement); warm upbeat original music (marimba, bass, woodblock, subtle synth). Voice warm English, natural, Whisper check, duck original score ~8dB, target −14 LUFS, peak ≤−1.2 dBTP. Two J-cuts / two breathing silences, no unrelated whoosh library.

## Current proof only — commercial artwork gate

Source [1m`main.js`[0m builds an original 3D café using procedural masonry/stone/asphalt textures, genuine inset windows/interior, awnings, sign, outdoor seats, cups, greenery, two styled human figurines, road, lamps and surrounding buildings. Imports the **original upstream tilt-shift post pipeline** (`styles/tilt-shift/demo/post.js`) only for optical/colour techniques; no demo story, ducks or urban traffic are reproduced. Three.js original set; 24fps camera and stepped 8Hz world actors. This is a **look/motion prototype**, not a full ad. No unverified EzSites logo is shown.

The next approval gate is 3–4 styleframes from this **same source code** and a 5s silent film proof. On review, critique detail, materials, light, camera focus, scale, frame safety and similarity to approved quality reference; only then greenlight full 30s animation and sound.

## Rights/claims

No use of real third-party photos, copyrighted characters or protected brands besides authorized EzSites mark in final. Café name is fictional “OAK & BEAN”. All 3D objects, textures and music are original; dependencies `three` + native upstream Lemo; record third-party licenses in CREDITS. Domain and email depend on paid plan / activation, never state free or instant included. Remotion is optional only if it authors real UI compositing elements rather than merely re-encodes an MP4.