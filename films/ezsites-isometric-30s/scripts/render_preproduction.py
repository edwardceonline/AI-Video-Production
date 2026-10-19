#!/usr/bin/env python3
"""Preview approved Lemo-style isometric look using exact film drawing code (not mockups)."""
import argparse
import asyncio
from pathlib import Path
import subprocess
from playwright.async_api import async_playwright

async def create(html:Path,out:Path,chrome:str):
    out.mkdir(parents=True,exist_ok=True)
    frames=out/"motion"
    frames.mkdir(exist_ok=True)
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path=chrome,headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
        page=await b.new_page(viewport={"width":1080,"height":1920},device_scale_factor=1)
        errors=[]
        page.on("pageerror",lambda x:errors.append(str(x)))
        await page.set_content(html.read_text(encoding="utf-8"))
        for t in (2.4,14.1,25.2):
            await page.evaluate("(t)=>window.render(t)",t)
            await page.locator("canvas").screenshot(path=str(out/f"style_{t:.1f}.png"))
        # 24fps source video proof 4→9 seconds, scaled screenshot for speed.
        await page.set_viewport_size({"width":720,"height":1280})
        for i in range(120):
            await page.evaluate("(t)=>window.render(t)",4+i/24)
            await page.locator("canvas").screenshot(path=str(frames/f"{i:04d}.png"))
        await b.close()
    if errors:raise RuntimeError("Browser errors: "+" / ".join(errors))
    subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y",
                    "-framerate","24","-i",str(frames/"%04d.png"),
                    "-c:v","libx264","-pix_fmt","yuv420p","-crf","21",
                    "-movflags","+faststart",str(out/"motion_proof_5s.mp4")],check=True)
    print("Created style_2.4.png, style_14.1.png, style_25.2.png, motion_proof_5s.mp4")
    print("WARNING: not the finished 30s video; audio/logo integration pending")

if __name__=="__main__":
    ap=argparse.ArgumentParser()
    ap.add_argument("--html",type=Path,default=Path(__file__).resolve().parents[1]/"index.html")
    ap.add_argument("--output",type=Path,default=Path(__file__).resolve().parents[1]/"out")
    ap.add_argument("--chrome",default="/usr/bin/chromium")
    args=ap.parse_args()
    asyncio.run(create(args.html,args.output,args.chrome))
