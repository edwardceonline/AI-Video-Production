import asyncio, os, subprocess, glob
LINES=["Every business has a story. Let yours be discovered.","Crafted offline. Found online.","Your website is where your business meets the world.","Your business. Your online address.","Your next customer is looking for you.","EzSites. Bring your business online."]
os.makedirs('public',exist_ok=True)
async def run():
 try:
  import edge_tts
  for i,t in enumerate(LINES,1):
   speech=edge_tts.Communicate(t,voice='en-US-JennyNeural',rate='-11%',volume='+0%')
   await speech.save(f'public/v{i}.mp3')
  print('Neural voice generated')
 except Exception as e:
  print('VOICE FALLBACK',e)
  for i,t in enumerate(LINES,1):
   subprocess.run(['espeak','-v','en-us','-s','142','-w',f'public/v{i}.wav',t],check=True)
   subprocess.run(['ffmpeg','-v','error','-y','-i',f'public/v{i}.wav',f'public/v{i}.mp3'],check=True)
asyncio.run(run())