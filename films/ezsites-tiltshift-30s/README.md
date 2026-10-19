# EzSites 30s — Tilt-Shift Miniature style/motion proof

**User approved changing the primary style from Isometric Infographic to Tilt-Shift Miniature due to failed primitive artwork.** The 30s storyboard is still approved; this folder currently contains **only a 5-second silent 24fps source-rendered look proof**, not a complete ad. Do not confuse this output with old 20s Lemo/Remotion videos.

Uses original upstream Lemo-Opuscar `styles/tilt-shift/demo/post.js` at pinned `b5e8ef93930b6d828f352055a689320f138237b1` for tilt-shift DOF and film grade; the shop, scene geometry, physics and camera animation are original Three.js code.

Source assets are procedural canvas textures; logo not used in this first shop proof. Before full 30s render, obtain original EzSites mark from user-controlled app repo and verify all visual identity/claims.

## Build proof

```bash
# install Node22/FFmpeg/Chromium from workflow or locally
npm ci  # or npm install when no lock is available
npx playwright install chromium
LEMO_LIB=/path/to/pinned/lemo npm run render
```

GitHub Actions workflow `ezsites-tiltshift-lookproof.yml` installs npm dependencies and renders `out/frame_*.png` + `out/tiltshift_5s_proof.mp4` then uploads an Actions artifact. The last successful run must be read from GitHub; source commit alone is not a rendered proof.