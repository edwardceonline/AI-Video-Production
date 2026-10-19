# Remotion + Lemo hybrid bridge

This React / Remotion 4 composition receives the finished **native Lemo-Opuscar MP4** and re-renders the same 15-second film. It preserves the full video soundtrack while establishing an editable composition layer for future verified app UI footage, title cards and overlays. The POC deliberately includes **no fabricated EzSites app screenshots**.

### Render locally

Run the native film build first, then:

```sh
cd films/ezsites-lemo-native/remotion
cp ../out/ezsites-lemo-native.mp4 public/ezsites-native.mp4
npm install --no-audit --no-fund
npm run render
```

CI downloads the native Actions artifact into `public/`, renders `out/ezsites-hybrid.mp4` and checks 1080×1920, 24 FPS, 15 seconds and an audio stream.

### Licensing
Remotion is **not simply MIT**; free use depends on individual/entity eligibility. Organizations of 4+ employees generally require a Remotion Company License (see https://www.remotion.dev/docs/license/pricing). This POC evaluates the integration; check licensing before automated commercial production for LMG Group AG.
