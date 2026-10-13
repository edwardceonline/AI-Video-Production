# Cyber Explained — EP01 English Scene 01

Remotion implementation **in progress; not a verified finished MP4**.

- Composition: `CyberExplained-EP01-EN-S01`
- Format: 1080 × 1920, 30 fps, 300 frames (10 seconds)
- Stack: React 18, Remotion 4, TypeScript
- Animation: layered 2.5D Minh puppet, bank alert, camera push to the phone, SMS → banking site, URL zoom.
- Demonstration domain: `bank.example.com.verify.example.net`. HTTPS alone does not establish legitimacy.

## Local run

```bash
npm install
npm run check
npm run render:en
```

**The binary image/audio assets are now committed.** See [ASSETS_REQUIRED.md](./ASSETS_REQUIRED.md). They are present in the earlier `CyberExplained_EP01_EN_Scene01_Remotion_Source.zip`, but the GitHub connector currently transfers only text in this workflow.

## CI / Rendering

See `.github/workflows/render-cyber-explained-en.yml`. It installs Remotion, checks asset presence, renders MP4, performs FFprobe QC, and uploads the video artifact. The workflow checks assets, renders, validates with FFprobe and uploads an MP4. A passing visual review is required before release.

## Limitations

Original artwork is ~352×337 pixels and the character rig has only three groups; final publication quality requires proper redraw and articulation, plus high-quality licensed voice-over.
