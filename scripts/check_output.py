import json,sys
info=json.load(open(sys.argv[1],encoding="utf-8"))
video=[s for s in info["streams"] if s["codec_type"]=="video"]
assert len(video)==1,"Expected one video stream"
s=video[0]
assert (s["width"],s["height"])==(1080,1920),s
assert s["r_frame_rate"]=="30/1",s
assert int(s["nb_read_frames"])==300,s
seconds=float(info["format"]["duration"])
assert 9.8 <= seconds <= 10.2,seconds
print(f"PASS: {s['width']}x{s['height']} 30fps, {seconds:.3f}s, 300 frames")
