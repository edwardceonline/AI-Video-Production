#!/usr/bin/env python3
"""Hard technical gate for video artifacts, not a replacement for creative review."""
import argparse, json, subprocess, sys
from pathlib import Path

p = argparse.ArgumentParser()
p.add_argument('video')
p.add_argument('--min-duration', type=float, default=18)
p.add_argument('--max-duration', type=float, default=35)
p.add_argument('--width', type=int, default=1080)
p.add_argument('--height', type=int, default=1920)
p.add_argument('--fps', type=int, default=30)
a = p.parse_args()
file = Path(a.video)
if not file.is_file() or file.stat().st_size < 500000:
    sys.exit('FAIL: missing or tiny video')
proc = subprocess.run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(file)],capture_output=True,text=True,check=True)
d = json.loads(proc.stdout)
video = next((s for s in d['streams'] if s['codec_type']=='video'), None)
audio = next((s for s in d['streams'] if s['codec_type']=='audio'), None)
errors = []
if not video: errors.append('no video stream')
else:
    if (video['width'],video['height']) != (a.width,a.height): errors.append('wrong resolution')
    if video.get('codec_name') != 'h264': errors.append('video not H.264')
    n,den = map(int, video['avg_frame_rate'].split('/'))
    if den == 0 or abs(n/den-a.fps) > .05: errors.append('unexpected FPS')
if not audio: errors.append('no audio stream')
else:
    if audio.get('codec_name') != 'aac': errors.append('audio not AAC')
duration = float(d['format']['duration'])
if not a.min_duration <= duration <= a.max_duration: errors.append('duration out of target range')
# Detect unintended black frames; a design-intent black slate still needs manual review.
check = subprocess.run(['ffmpeg','-hide_banner','-i',str(file),'-vf','blackdetect=d=0.33:pix_th=0.08', '-an','-f','null','-'],capture_output=True,text=True)
blacks = [line.strip() for line in check.stderr.splitlines() if 'black_start:' in line]
result={'file':str(file),'seconds':round(duration,3),'bytes':file.stat().st_size,'codec':video.get('codec_name') if video else None,'resolution':[video.get('width'),video.get('height')] if video else None,'audio':audio.get('codec_name') if audio else None,'black_intervals':blacks,'errors':errors}
print(json.dumps(result,ensure_ascii=False,indent=2))
if errors: sys.exit(1)