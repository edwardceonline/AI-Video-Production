# EzSites / Beyond Your Front Door — Isometric 30s

**Preproduction / STYLEFRAME + 5-second MOTION PROOF ONLY. The approved 30-second storyboard is not yet a rendered full ad.**

## Creative contract
Use original upstream [Lemo `styles/iso-infographic/STYLE.md`](https://github.com/lemomo-ai/lemo-opuscar/blob/b5e8ef93930b6d828f352055a689320f138237b1/styles/iso-infographic/STYLE.md): true 30° isometric axes (projection never rotates), fixed three-tone solids, drawn route leads camera, label pins and a final zoom-out scale reveal. Source `index.html` is hand-authored to depict a fictional coffee shop, stylized product-accurate EzSites UI, domain and business email. **Phone UI is an advertising visualization rather than an authentic screenshot.**

User approved a *faithful stylized reconstruction* of both UI and logo. The official EzSites full-wordmark end-card asset is **not yet imported into this proof**; the draft contains an explicit temporary placeholder to prevent anyone mistaking it for the genuine final logo. It must be replaced and compared with the app-owned logo PNG before full video delivery.

See [`TREATMENT.md`](TREATMENT.md) for full 30s storyboard, verified claim scope, 120 BPM cue map, rights and QA gates.

## Preview from true production drawing code
`index.html` exposes deterministic `window.render(t)`, `window.DUR=30`, `window.READY=true`. It was rendered in Chromium using Python Playwright and screenshots of its canvas for style frames and a five-second motion test (4–9s).

Reproduce after installing `playwright` Python and Chromium:

```bash
python scripts/render_preproduction.py --html index.html --output out
```

The proof video is **silent**; voice, original musical score, sound effects and completed transitions are production tasks still outstanding. Do not advertise this as the finished product or conflate it with GitHub Actions #52 (that is the different Swiss Motion 20s film).
