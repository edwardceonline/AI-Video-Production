import asyncio,subprocess,os
from pathlib import Path
Path('public').mkdir(exist_ok=True)
# The full story stays consistent with available EzSites functionality; UI mock emails only represent illustrative examples.
CUES=[
 (16,'Great businesses begin in the real world.'),
 (139,'But the next connection can start anywhere.'),
 (265,'Give people a place to discover you.'),
 (402,'A name they can remember.'),
 (508,'A way to reach out.'),
 (619,'And a professional way to reply.'),
 (786,'EzSites. Get your business online.'),
]
async def main():
 import edge_tts
 for i,(at,text) in enumerate(CUES):
  mp3=f'public/vo-{i}.mp3'
  await edge_tts.Communicate(text,voice='en-GB-SoniaNeural',rate='-8%',pitch='-1Hz').save(mp3)
  dur=subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nk=1:nw=1',mp3]).decode().strip()
  print(i,at,text,'duration',dur,flush=True)
asyncio.run(main())