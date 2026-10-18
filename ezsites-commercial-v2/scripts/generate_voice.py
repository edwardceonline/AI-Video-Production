"""Generate per-scene English narrated previews. Commercial-use permission for TTS must be reviewed independently."""
from pathlib import Path
import asyncio,subprocess,shutil,os
text=[
 "You built a business worth discovering.",
 "Give it a home online that feels like you.",
 "Your name. Your domain.",
 "Make it easy for customers to reach you.",
 "And keep the conversation going with business email.",
 "EzSites. Bring your business online."
]
output=Path('public');output.mkdir(exist_ok=True)
async def render_edge(t,path):
 import edge_tts
 async with asyncio.timeout(22):
  await edge_tts.Communicate(t,voice='en-GB-SoniaNeural',rate='-8%').save(str(path))
async def main():
 for idx,t in enumerate(text,1):
  path=output/f'vo-{idx:02}.mp3'
  try:
   await render_edge(t,path)
   if path.stat().st_size<1500:raise RuntimeError('TTS empty')
   print('edge-tts',idx,path.stat().st_size)
   continue
  except Exception as e: print('Edge voice unavailable:',str(e)[:220])
  try:
   from gtts import gTTS
   gTTS(t,lang='en',tld='co.uk',slow=False,timeout=8).save(str(path))
   if path.stat().st_size<1500:raise RuntimeError('gTTS empty')
   print('gTTS',idx,path.stat().st_size)
   continue
  except Exception as e:print('Google voice unavailable:',str(e)[:220])
  cmd='espeak-ng' if shutil.which('espeak-ng') else 'espeak'
  wav=output/f'vo-{idx:02}.wav'
  subprocess.run([cmd,'-v','en-gb','-s','152','-w',str(wav),t],check=True)
  subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-i',str(wav),'-ar','24000','-codec:a','libmp3lame',str(path)],check=True)
  wav.unlink(missing_ok=True)
  print('espeak fallback',idx,path.stat().st_size)
asyncio.run(main())