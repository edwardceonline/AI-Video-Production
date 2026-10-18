# EzSites — Your Business. Online. (V2)

28-second vertical editorial **creative preview**, rendered in Remotion. Two connected visual worlds: real florist footage and a persistent, responsive-looking sample flower-shop website that scrolls through product moments, ending on real EzSites branding.

## Product claims and assets

- Store footage: Pexels video 5405545 (Amina Filkins); visual example only; no customer endorsement.
- Editorial floral photography: Pexels photo IDs 931177 and 1070850. See the upstream Pexels license for commercial usage.
- Brand mark: EzSites original asset, copied from `ezsites-commercial/public/EzSites_full_logo_with_text.png` in this repo.
- Product UI: deliberately illustrative **fictional Petal & Paper demo website**; not an EzSites screen capture. Website, own domain, email, contact form are supported service categories, not feature-specific UI claims.
- English neural VO is for creative review. Confirm TTS commercial rights before publication. Original score generated via deterministic Python.

## Creative changes relative to V1

1. Remove all scene labels/numbers and meaningless UI furniture.
2. Unify website/domain/contact as ONE animated page space. No center-of-screen feature cards.
3. Convert the contact workflow into actual page scroll and controlled interactions.
4. Match domain and email via a common fictional domain and customer request.
5. Replace app-style blue CTA button with restrained brand end card and genuine EzSites logo.
6. Two font families, generous editorial typography; no gradients used as independent slides.

## Run

```sh
npm install
npm run studio
npm run stills
npm run render
```

Main composition `EzSitesV2` — 1080 × 1920, 30fps, 840f = 28 seconds. Frame QA and full MP4 uploaded by GitHub Actions. Source stills are NOT sufficient QA: inspect video at actual speed with audio.