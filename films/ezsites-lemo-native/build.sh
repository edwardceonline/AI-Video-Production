#!/usr/bin/env bash
# Uses original Lemo-Opuscar core without modifying or copying it.
set -euo pipefail
FILM="$(cd "$(dirname "$0")" && pwd)"
if [ -z "$LEMO_LIB" ];then echo 'Set LEMO_LIB to a checked-out Lemo-Opuscar directory' >&2;exit 1;fi
LEMO_LIB="$(cd "$LEMO_LIB" && pwd)"
test -f "$LEMO_LIB/core/render/video.mjs"
mkdir -p "$FILM/out/stills"
cd "$LEMO_LIB"
node core/render/events.mjs "$FILM" --out "$FILM/events.json"
"$LEMO_LIB/.venv/bin/python" "$FILM/audio.py"
node core/render/still.mjs "$FILM" 1.8 4.8 8.6 12.7 14.3 --size 1080x1920 --out "$FILM/out/stills"
node core/render/video.mjs "$FILM" --size 1080x1920 --fps 24 --workers 2 --out "$FILM/out/raw.mp4"
LEMO_COLOR=bt709 sh core/render/mux.sh "$FILM/out/raw.mp4" "$FILM/out/mix.wav" "$FILM/out/ezsites-lemo-native.mp4" 24 0
ffmpeg -hide_banner -loglevel error -y -ss 13.7 -i "$FILM/out/ezsites-lemo-native.mp4" -frames:v 1 -q:v 2 "$FILM/out/poster.jpg"
python3 - "$FILM/out/ezsites-lemo-native.mp4" <<'PY'
import json,subprocess,sys
src=sys.argv[1]
data=json.loads(subprocess.check_output(["ffprobe","-v","error","-show_entries","stream=codec_type,width,height,r_frame_rate:format=duration","-of","json",src]))
v=next(s for s in data["streams"] if s["codec_type"]=="video")
a=next(s for s in data["streams"] if s["codec_type"]=="audio")
assert (v["width"],v["height"],v["r_frame_rate"])==(1080,1920,"24/1"),v
assert abs(float(data["format"]["duration"])-15)<.1,data["format"]
print("QC OK — 1080x1920, 24fps, 15s, video+audio")
PY
# Detect long black intervals: these are unintended in the vector visual.
LOG=$(mktemp)
ffmpeg -hide_banner -loglevel info -i "$FILM/out/ezsites-lemo-native.mp4" -vf 'blackdetect=d=0.18:pix_th=0.08' -an -f null - 2>"$LOG"
if grep -q 'black_start:' "$LOG";then grep 'black_start:' "$LOG";rm -f "$LOG";echo 'QC failed: black interval' >&2;exit 1;fi
rm -f "$LOG"
echo "DELIVERABLE=$FILM/out/ezsites-lemo-native.mp4"
