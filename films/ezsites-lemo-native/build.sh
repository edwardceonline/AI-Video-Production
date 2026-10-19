#!/usr/bin/env bash
# Unmodified native Lemo tools + mandatory director review artifacts.
set -euo pipefail
FILM="$(cd "$(dirname "$0")" && pwd)"
if [ -z "$LEMO_LIB" ];then echo 'Set LEMO_LIB' >&2;exit 1;fi
LEMO_LIB="$(cd "$LEMO_LIB" && pwd)"
test -f "$LEMO_LIB/core/render/video.mjs"
mkdir -p "$FILM/out/stills"
cd "$LEMO_LIB"
python3 "$FILM/scripts/preflight.py"
"$LEMO_LIB/.venv/bin/python" core/tts/tts.py "$FILM/lines.json" "$FILM/out/voice"
"$LEMO_LIB/.venv/bin/python" core/tts/asr_check.py "$FILM/lines.json" "$FILM/out/voice" --lang en
node core/render/events.mjs "$FILM" --out "$FILM/events.json" --size 1080x1920
"$LEMO_LIB/.venv/bin/python" "$FILM/audio.py"
node core/render/still.mjs "$FILM" 2.4 6.2 10.2 14.2 18.1 --size 1080x1920 --out "$FILM/out/stills"
for rg in '3.6:4.4:0.2' '7.6:8.4:0.2' '11.6:12.4:0.2' '15.6:16.4:0.2'; do
  node core/render/still.mjs "$FILM" --range "$rg" --size 1080x1920 --out "$FILM/out/stills"
done
"$LEMO_LIB/.venv/bin/python" core/render/sheet.py \
    "$FILM/out/contact-sheet.jpg" \
    "$FILM/out/stills/t_2.4.jpg" "$FILM/out/stills/t_6.2.jpg" \
    "$FILM/out/stills/t_10.2.jpg" "$FILM/out/stills/t_14.2.jpg" \
    "$FILM/out/stills/t_18.1.jpg" --cols 5 --w 250
node core/render/readcheck.mjs "$FILM" --size 1080x1920 --step 0.08
node core/render/video.mjs "$FILM" --size 1080x1920 --fps 24 --workers 2 --out "$FILM/out/raw.mp4"
LEMO_COLOR=bt709 sh core/render/mux.sh "$FILM/out/raw.mp4" "$FILM/out/mix.wav" "$FILM/out/ezsites-lemo-native.mp4" 24 0
ffmpeg -hide_banner -loglevel error -y -ss 19.1 -i "$FILM/out/ezsites-lemo-native.mp4" -frames:v 1 -q:v 2 "$FILM/out/poster.jpg"
python3 - "$FILM/out/ezsites-lemo-native.mp4" <<'PY'
import json,subprocess,sys
src=sys.argv[1]
data=json.loads(subprocess.check_output(["ffprobe","-v","error","-show_entries","stream=codec_type,width,height,r_frame_rate:format=duration","-of","json",src]))
v=next(s for s in data["streams"] if s["codec_type"]=="video")
assert (v["width"],v["height"],v["r_frame_rate"])==(1080,1920,"24/1"),v
assert any(s["codec_type"]=="audio" for s in data["streams"])
assert abs(float(data["format"]["duration"])-20)<.1,data["format"]
print("QC OK — 1080x1920, 24fps, 20s, video+audio")
PY
LOG=$(mktemp)
ffmpeg -hide_banner -loglevel info -i "$FILM/out/ezsites-lemo-native.mp4" -vf 'blackdetect=d=0.18:pix_th=0.08' -an -f null - 2>"$LOG"
if grep -q 'black_start:' "$LOG";then grep 'black_start:' "$LOG";rm -f "$LOG";echo 'QC failed: black interval' >&2;exit 1;fi
rm -f "$LOG"
cp "$FILM/TREATMENT.md" "$FILM/out/TREATMENT.md"
cp "$FILM/CREDITS" "$FILM/out/CREDITS"
cp "$FILM/lines.json" "$FILM/out/lines.json"
echo "DELIVERABLE=$FILM/out/ezsites-lemo-native.mp4"
