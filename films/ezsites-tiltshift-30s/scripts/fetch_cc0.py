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
        url=meta["url"];relative=Path(name)
        if relative.is_absolute() or '..' in relative.parts:raise RuntimeError("Invalid asset path "+name)
        f=folder/relative;f.parent.mkdir(parents=True,exist_ok=True)
        f.write_bytes(get(url))
        print("asset",slug,f.name,len(f.read_bytes()),flush=True)
        return f
    root=write(Path(gltf["url"].split("?")[0]).name,gltf)
    for name,ref in gltf.get("include",{}).items():
        if isinstance(ref,dict) and ref.get("url"):write(name,ref)
    # Missing binary or texture references are an asset-fetch failure, not a rendering fallback.
    try:
        refs=json.loads(root.read_text())
        uris=[x["uri"] for group in ("buffers","images") for x in refs.get(group,[]) if x.get("uri") and not x["uri"].startswith("data:")]
        for uri in uris:
            if not (folder/uri).is_file():raise RuntimeError("glTF missing referenced dependency: "+uri)
    except UnicodeDecodeError:
        pass
    results[alias]={"slug":slug,"file":root.name,"license":"CC0","url":f"https://polyhaven.com/a/{slug}","creator":"See Poly Haven asset page"}
# PBR surface: real weathered clay brick (CC0) rather than repeating generated canvas noise.
brick=json.loads(get("https://api.polyhaven.com/files/brick_wall_001"))
surface=OUT/"surfaces";surface.mkdir(parents=True,exist_ok=True)
def texture_map(kind):
    candidates=[]
    for key in brick:
        label=key.lower()
        if kind=="diff" and ("diff" in label or "color" in label or "albedo" in label):candidates.append(key)
        if kind=="normal" and ("nor_gl" in label or "normal gl" in label):candidates.append(key)
    if not candidates:return None
    for key in candidates:
        variants=brick[key]
        if not isinstance(variants,dict):continue
        entry=variants.get("1k") or variants.get("2k")
        if not isinstance(entry,dict):continue
        for ext in ("jpg","png"):
            meta=entry.get(ext)
            if isinstance(meta,dict) and meta.get("url"):
                output=surface/("brick_"+kind+"."+ext)
                output.write_bytes(get(meta["url"]))
                print("surface",key,output.name,output.stat().st_size,flush=True)
                return "surfaces/"+output.name
    return None
d=texture_map("diff")
n=texture_map("normal")
if not d:raise RuntimeError("Poly Haven brick_wall_001 missing 1k/2k base color map")
results["brick_surface"]={"slug":"brick_wall_001","diff":d,"normal":n,"license":"CC0","url":"https://polyhaven.com/a/brick_wall_001"}
(OUT/"manifest.json").write_text(json.dumps(results,indent=2))
print("Wrote",OUT/"manifest.json")
