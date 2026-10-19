"""English narration for editorial creative preview.
Rights for any cloud TTS provider must be checked before public distribution.
"""
import asyncio
from pathlib import Path
import edge_tts
VOICE='en-GB-SoniaNeural'
LINES=[
 'Every business has a story worth discovering.',
 'Give yours a beautiful place to live online.',
 'A website that brings your brand to life.',
 'And puts your business in their hands.',
 'EzSites. Bring your business online.'
]
async def main():
 out=Path('public');out.mkdir(exist_ok=True)
 for i,line in enumerate(LINES,1):
  path=out/f'vo-{i}.mp3'
  await edge_tts.Communicate(line,voice=VOICE,rate='-5%',pitch='+0Hz').save(str(path))
  assert path.stat().st_size>1800,(i,path)
  print('narration',i, path.stat().st_size)
asyncio.run(main())