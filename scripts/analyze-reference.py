#!/usr/bin/env python3
"""Measure source video metadata + candidate scene boundaries for Remotion shot design.

Only records timing and metadata; never republishes source media or copyrighted frames.
Candidates are estimates to be visually verified; they are not manual shot annotations.
"""
import argparse
import json
import re
import subprocess
from pathlib import Path


def run(argv):
    return subprocess.run(argv, capture_output=True, text=True, check=True)


def inspect(path, threshold):
    source = Path(path)
    info = json.loads(run(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(source)]).stdout)
    video = next(stream for stream in info['streams'] if stream['codec_type'] == 'video')
    duration = float(info['format']['duration'])
    fr = video['avg_frame_rate']
    n, d = map(int, fr.split('/'))
    fps = round(n / d, 5) if d else 0
    # ffmpeg's scene-change confidence is heuristic. showinfo emits timestamp per selected frame.
    proc = run(['ffmpeg', '-hide_banner', '-nostats', '-i', str(source),
                '-vf', f"scale=320:-2,select='gt(scene,{threshold})',showinfo",
                '-an', '-f', 'null', '-'])
    candidates = []
    for line in proc.stderr.splitlines():
        if 'showinfo' not in line or 'pts_time:' not in line:
            continue
        found = re.search(r'pts_time:\s*([0-9.]+)', line)
        if not found:
            continue
        t = round(float(found.group(1)), 3)
        if not candidates or t > candidates[-1] + .08:
            candidates.append(t)
    points = [0.0] + candidates + [round(duration, 3)]
    beats = [{'from': points[i], 'to': points[i+1], 'seconds': round(points[i+1]-points[i], 3)} for i in range(len(points)-1)]
    return {
        'filename': source.name,
        'duration_seconds': round(duration, 3),
        'video': {'width': video['width'], 'height': video['height'], 'fps': fps},
        'has_audio': any(s['codec_type'] == 'audio' for s in info['streams']),
        'method': f"FFmpeg scene selection threshold {threshold} at 320px; estimated only",
        'candidate_cuts_seconds': candidates,
        'candidate_shots': beats,
        'note': 'Human motion designer must validate cut, typography, camera, and matched geometry against reference. Do not copy original assets.'
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('media', nargs='+')
    parser.add_argument('--threshold', type=float, default=.28)
    parser.add_argument('--output', default='reference-analysis/measurements.json')
    args = parser.parse_args()
    if not 0 < args.threshold < 1:
        parser.error('threshold must lie in (0,1)')
    result = [inspect(path, args.threshold) for path in args.media]
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    print(json.dumps([{'name': r['filename'], 'duration': r['duration_seconds'], 'candidate_cuts': len(r['candidate_cuts_seconds'])} for r in result]))

if __name__ == '__main__':
    main()