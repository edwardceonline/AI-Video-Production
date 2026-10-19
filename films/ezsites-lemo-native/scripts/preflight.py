#!/usr/bin/env python3
"""Mandatory gate for Lemo source guides, treatment and genuine EzSites brand."""
from pathlib import Path
import hashlib,json,os,subprocess
HERE=Path(__file__).resolve().parents[1]
LIB=Path(os.environ["LEMO_LIB"])
required=[
  "AGENTS.md","DIRECTOR.md","TECHNIQUE.md","styles/swiss-motion/STYLE.md",
  "core/render/video.mjs","core/render/still.mjs","core/render/readcheck.mjs",
  "core/tts/tts.py","core/tts/asr_check.py"]
for x in required:assert (LIB/x).is_file(),f"Missing upstream Lemo-Opuscar guide/tool: {x}"
for x in ("TREATMENT.md","CREDITS","index.html","audio.py","lines.json"):
    assert (HERE/x).is_file(),f"Missing film source: {x}"
t=(HERE/"TREATMENT.md").read_text().lower()
for must in ("three candidate structures","benchmark","cue map","sound design",
             "shot list","rights","20-second","srt"):
    assert must in t,f"Treatment lacks Lemo DIRECTOR requirement: {must}"
for path,expect in {
    "assets/ezsites-logo-full.png":"89038e52be405f1649771298c53aa49dad58dd0b",
    "assets/ezsites-logo-icon.png":"075e60150fb4910a563088346dcab7cf6771c3c8"
}.items():
    raw=(HERE/path).read_bytes()
    actual=hashlib.sha1(b"blob "+str(len(raw)).encode()+b"\0"+raw).hexdigest()
    assert actual==expect,"Brand mismatch from original EzSites app repo: "+path
lines=json.loads((HERE/"lines.json").read_text())
assert len(lines)==5 and len(set(v["id"] for v in lines))==5
assert all(v["text"] and v["voice"].startswith("af_") for v in lines)
code=(HERE/"index.html").read_text()
assert "window.DUR=20" in code and "window.TEXTS" in code and "window.EV" in code
sha=subprocess.check_output(["git","-C",str(LIB),"rev-parse","HEAD"],text=True).strip()
manifest={
 "method":"Canonical upstream Lemo-Opuscar AI Director, not a substitute local guide",
 "upstream_sha":sha,"primary_style":"styles/swiss-motion/STYLE.md",
 "directing_guides":["AGENTS.md","DIRECTOR.md","TECHNIQUE.md","styles/swiss-motion/STYLE.md"],
 "storyboard":"TREATMENT.md","source":"index.html",
 "voice":"Kokoro, Whisper verified at runtime","render":"Native Lemo Chromium",
 "review":"3 source style frames, 0.2s transition strips, native readcheck, MP4 QC",
 "chat_director":"Human-in-loop ChatGPT. No standalone autonomous Claude agent is claimed."
}
(HERE/"out").mkdir(exist_ok=True)
(HERE/"out/director-manifest.json").write_text(json.dumps(manifest,indent=2))
print("DIRECTOR PREFLIGHT PASS",sha[:10],"5 voice lines, official EzSites logos, Lemo guides")
