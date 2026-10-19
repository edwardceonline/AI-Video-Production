#!/usr/bin/env bash
# Fetch pinned, reviewed upstream skill sources. Nothing is uploaded or published.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CACHE="$ROOT/.cache/video-skill-sources"
mkdir -p "$CACHE" "$ROOT/.agents/skills"
fetch_at_commit() {
  local name="$1" remote="$2" sha="$3" dest="$CACHE/$name"
  if [[ -d "$dest/.git" && "$(git -C "$dest" rev-parse HEAD)" == "$sha" ]]; then
    echo "Using pinned skill source $name: $sha"; return
  fi
  rm -rf "$dest"
  mkdir -p "$dest"
  git -C "$dest" init -q
  git -C "$dest" remote add origin "$remote"
  git -C "$dest" fetch -q --depth 1 origin "$sha"
  git -C "$dest" checkout -q --detach FETCH_HEAD
  [[ "$(git -C "$dest" rev-parse HEAD)" == "$sha" ]] || { echo "Pin check failed: $name" >&2; exit 1; }
  echo "Pinned $name at $sha"
}

fetch_at_commit marketing-videos https://github.com/sub-level/marketing-videos.git 696073f596079c137cb8dffa00c4bb56dc508308
fetch_at_commit video-shotcraft https://github.com/Vincentwei1021/video-shotcraft.git 43bd349a136651865ecfa6ea1cf012f6e957d304
fetch_at_commit product-launch-video https://github.com/EveryInc/product-launch-video.git 68660ae0cbbeb2b942addff4c9b2ca6bbefc5721
fetch_at_commit remotion-skills https://github.com/remotion-dev/skills.git 1441a11e95db35443bd76bb318386c0d3ca00053

link_skill() {
  local name="$1" relative_target="$2" dest="$ROOT/.agents/skills/$name"
  [[ -d "$ROOT/$relative_target" ]] || { echo "Missing source: $relative_target" >&2; exit 1; }
  if [[ -e "$dest" && ! -L "$dest" ]]; then
    echo "Refusing to replace existing skill directory: $dest" >&2; return 1
  fi
  ln -sfn "../../$relative_target" "$dest"
  test -f "$dest/SKILL.md"
  echo "Activated skill: $name"
}

link_skill motion-from-reference .cache/video-skill-sources/marketing-videos/.claude/skills/motion-from-reference
link_skill device-3d-stage .cache/video-skill-sources/marketing-videos/.claude/skills/device-3d-stage
link_skill remotion-marketing-video .cache/video-skill-sources/marketing-videos/.claude/skills/remotion-marketing-video
link_skill video-audio-stack .cache/video-skill-sources/marketing-videos/.claude/skills/video-audio-stack
link_skill video-shotcraft .cache/video-skill-sources/video-shotcraft
link_skill product-launch-video .cache/video-skill-sources/product-launch-video/.claude/skills/product-launch-video
for skill in best-practices create markup render studio; do
  link_skill "remotion-$skill" ".cache/video-skill-sources/remotion-skills/skills/remotion-$skill"
done

echo 'Skills ready; read their SKILL.md files before using their commands or assets.'