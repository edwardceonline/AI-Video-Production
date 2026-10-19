#!/usr/bin/env python3
"""Reject unverified logos, missing production instructions and malformed line scripts."""
import hashlib
import json
from pathlib import Path
HERE=Path(__file__).resolve().parents[1]
logos={
  "assets/ezsites-logo-full.png":"89038e52be405f1649771298c53aa49dad58dd0b",
  "assets/ezsites-logo-icon.png":"075e60150fb4910a563088346dcab7cf6771c3c8",
}
for name,expected in logos.items():
    blob=(HERE/name).read_bytes()
    actual=hashlib.sha1(b"blob "+str(len(blob)).encode()+b"\0"+blob).hexdigest()
    assert actual==expected, f"EzSites brand asset mismatch: {name}; expected real app logo"
for fn in ("TREATMENT.md","CREDITS","lines.json","index.html"):
    assert (HERE/fn).is_file(), f"Missing mandatory production file: {fn}"
treatment=(HERE/"TREATMENT.md").read_text()
for heading in ("Three competing structures","Shot list","Music","Text and brand QC"):
    assert heading.lower() in treatment.lower(), f"Treatment lacks: {heading}"
voice=json.loads((HERE/"lines.json").read_text())
assert len(voice)==4 and len(set(x['id'] for x in voice))==4
assert all(x.get("voice","").startswith("af_") and x.get("text") for x in voice)
print("PREFLIGHT PASS: verified brand assets, treatment and 4 Kokoro lines")
