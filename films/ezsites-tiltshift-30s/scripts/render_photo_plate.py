#!/usr/bin/env python3
"""Experimental photoreal image-plate motion proof for approved Tilt-Shift story.
Not a 3D object animation, not a finished ad and not a native Lemo renderer.
Requires the AI-generated/owner-approved image asset at:
  films/ezsites-tiltshift-30s/assets/hero-oak-bean.png
Place it from the art-review ZIP before running; it is NOT automatically committed.
"""
from pathlib import Path
import cv2
import numpy as np
import subprocess

HERE=Path(__file__).resolve().parents[1]
SRC=HERE/"assets"/"hero-oak-bean.png"
OUT=HERE/"out"/"cinematic-plate-proof-3s.mp4"
W,H=720,1280
if not SRC.exists():raise FileNotFoundError("Missing approved source plate: "+str(SRC))
image=cv2.cvtColor(cv2.imread(str(SRC)),cv2.COLOR_BGR2RGB)
IH,IW=image.shape[:2]
assert .54<IW/IH<.59,"Plate must have near-portrait 9:16 geometry"
blur=cv2.GaussianBlur(image,(0,0),1.6)
xx=np.linspace(0,1,W,dtype=np.float32)[None,:]
yy=np.linspace(0,1,H,dtype=np.float32)[:,None]
X=np.broadcast_to(xx,(H,W));Y=np.broadcast_to(yy,(H,W))
def smoother(t):
    t=np.clip(t,0,1);return t*t*(3-2*t)
OUT.parent.mkdir(exist_ok=True,parents=True)
args=["ffmpeg","-hide_banner","-loglevel","error","-y","-f","rawvideo","-pix_fmt","rgb24",
      "-s",f"{W}x{H}","-r","24","-i","-","-c:v","libx264",
      "-preset","medium","-crf","18","-pix_fmt","yuv420p","-movflags","+faststart",str(OUT)]
proc=subprocess.Popen(args,stdin=subprocess.PIPE)
try:
    for i in range(72):
        t=i/24;p=smoother(t/3)
        z=1.41-.335*p
        cw=IW/z;ch=IH/z
        cy=(.613*(1-p)+.5*p)*IH
        cx=(.495*(1-p)+.5*p)*IW+np.sin(np.pi*p)*3.8
        left=np.clip(cx-cw/2,0,IW-cw)
        top=np.clip(cy-ch/2,0,IH-ch)
        mx=(left+X*cw).astype(np.float32)
        my=(top+Y*ch).astype(np.float32)
        raw=cv2.remap(image,mx,my,cv2.INTER_CUBIC,borderMode=cv2.BORDER_REFLECT)
        defocus=cv2.remap(blur,mx,my,cv2.INTER_LINEAR,borderMode=cv2.BORDER_REFLECT)
        alpha=np.clip((np.abs(Y-(.58-.03*p))-.33)/.21,0,.32)
        mixed=(raw*(1-alpha[:,:,None])+defocus*alpha[:,:,None])
        mixed=np.clip(mixed*(1+.02*np.sin(2*np.pi*(.7*t+.15))),0,255).astype(np.uint8)
        proc.stdin.write(mixed.tobytes())
finally:
    proc.stdin.close()
    if proc.wait():raise RuntimeError("ffmpeg encoding failed")
print("Wrote",OUT)
