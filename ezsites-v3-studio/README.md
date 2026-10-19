# EzSites V3 — "A story worth discovering"

A premium vertical 26-second Remotion creative preview based on an actual, published EzSites demonstration website and original EzSites logo. All UI screenshots are captured using Playwright from **https://kurotsuki.sites.ezsites.app/** during the workflow, and must be reviewed for any changes before releasing the ad. The website's restaurant claims and booking text belong to demo content; EzSites is **not** presented as having a booking engine.

## Art direction

- A cinematic, dark fine-dining world with carefully controlled gold highlights.
- Cut to a **real captured website**, slowly exploring its editorial typography and content.
- Transform to a **real mobile screenshot** in a CSS 3D device, keeping the content readable.
- Close on the **original EzSites asset**, ivory/blue and a quiet CTA. No numbered storyboard labels, gratuitous progress indicators, glass cards or new product claims.

## Sequence (30fps, 1080 x 1920)

| Time | Motion/visual | English narration |
|---|---|---|
| 0–5.3 | Real sushi making footage, two angles, warm black fade | Every business has a story worth discovering. |
| 5.3–10.6 | Published Kurotsuki website materializes in an editorial browser | Give yours a beautiful place to live online. |
| 10.6–15.8 | Camera pushes into the authentic captured page | A website that brings your brand to life. |
| 15.8–20.1 | Website switches from browser to actual mobile capture on 3D phone | And puts your business in their hands. |
| 20.1–22.6 | Published actual EzSites subdomain revealed | (instrumental) |
| 22.6–26 | Authentic EzSites logo + brand CTA | EzSites. Bring your business online. |

### Public-use notes

- Chef clips are *Pexels stock illustrations* and do **not** represent the restaurant, its customers, or a product endorsement.
- Stock footage: https://www.pexels.com/video/a-chef-placing-salmon-on-top-of-sushi-rice-8908410/ and https://www.pexels.com/video/close-up-shot-of-a-person-preparing-sushi-8908334/. Usage is subject to Pexels terms: https://www.pexels.com/license/.
- Music is newly synthesized for this film, no sampled third-party recording.
- Neural English preview voice is from an external TTS provider; **verify provider commercial-use terms before publishing**.
- `kurotsuki.party` is **not** presented as the custom domain of `kurotsuki.sites.ezsites.app` as the pages currently contain different business details.

## Build

`npm install && npm run studio` or `npm run render` after generating the `public/` assets from the GitHub Actions workflow. The workflow renders stills before the full MP4 and uploads both for creative QA.