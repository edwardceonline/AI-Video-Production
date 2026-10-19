#!/usr/bin/env python3
"""Fetch two original CC0 photogrammetry/PBR props from Poly Haven API.
This runs in GitHub Actions before render, not at page load. No resale of raw assets.
API docs: https://github.com/Poly-Haven/Public-API
Asset licenses: https://polyhaven.com/license
"""
from pathlib import Path
import json, urllib.request, time

OUT=Path(__file__).resolve().parents[1]/"assets"
OUT.mkdir(exist_ok=True)
AGENT="AI-Video-Production/1.0 (public sourced CC0 film assets)"
ASSETS=[("CoffeeCart_01","coffee_cart"),("potted_plant_04","potted_plant")]
results={}
def get(url,retries=3):
    last=None
    for i in range(retries):
        try:
            req=urllib.request.Request(url,headers={"User-Agent":AGENT})
            with urllib.request.urlopen(req,timeout=90) as r:return r.read()
        except Exception as e:
            last=e;time.sleep(2*(i+1))
    raise RuntimeError(f"Cannot fetch {url}: {last}")
for slug,alias in ASSETS:
    data=json.loads(get(f"https://api.polyhaven.com/files/{slug}"))
    maps=data.get("gltf",{})
    choice=maps.get("1k") or maps.get("2k")
    if not choice:raise RuntimeError(f"Poly Haven missing glTF 1k/2k for {slug}: {list(data)}")
    gltf=choice.get("gltf")
    if not gltf or "url" not in gltf:raise RuntimeError(f"Model URL missing for {slug}: {choice}")
    folder=OUT/alias;folder.mkdir(parents=True,exist_ok=True)
    def write(name,meta):
        url=meta["url"];f=folder/Path(name).name
        f.write_bytes(get(url))
        print("asset",slug,f.name,len(f.read_bytes()),flush=True)
        return f
    root=write(Path(gltf["url"].split("?")[0]).name,gltf)
    for name,ref in gltf.get("include",{}).items():
        if isinstance(ref,dict) and ref.get("url"):write(name,ref)
    results[alias]={"slug":slug,"file":root.name,"license":"CC0","url":f"https://polyhaven.com/a/{slug}","creator":"See Poly Haven asset page"}
(OUT/"manifest.json").write_text(json.dumps(results,indent=2))
print("Wrote",OUT/"manifest.json")
