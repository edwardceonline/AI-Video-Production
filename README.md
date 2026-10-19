# AI Video Production

A code-first production workspace for marketing videos and cybersecurity explainers.

## Engines

- **Lemo-Opuscar (experimental):** the first working trial is in [films/ezsites-lemo-native](films/ezsites-lemo-native/README.md). Its GitHub Actions workflow calls the **upstream** Lemo renderer and audio mastering utilities from a pinned commit, renders a 15-second EzSites motion-graphics proof of concept and uploads an MP4, poster, subtitle and review frames.
- **Remotion (planned):** a separate React/Remotion renderer remains an option for future UI-driven scenes. No Remotion application has been added to this repository yet.

## Native Lemo trial

Look at [the GitHub Actions workflow](.github/workflows/lemo-opuscar-poc.yml). It triggers on experiment-branch pushes, pull requests targeting main, or manual dispatch once the workflow is on the default branch.

The Lemo code is **not vendored or edited**. The film has its own deterministic HTML Canvas source, original procedural audio and a reproducible build script. Review the [film README](films/ezsites-lemo-native/README.md) for prerequisites, license information, current limitations and quality checks.

**Important:** Successfully building the film with the original Lemo renderer is not the same as using the Claude Code directing agent or the Lemo skill end to end. Those require their own separate evaluation.
