import asyncio,os,subprocess,json
os.makedirs('public',exist_ok=True)
voices=[
 ('Every great business starts with something real.','v1.mp3'),
 ('But the next customer could be anywhere.','v2.mp3'),
 ('Give them a place to find you.','v3.mp3'),
 ('A name to remember.','v4.mp3'),
 ('A simple way to reach out.','v5.mp3'),
 ('And an email that means business.','v6.mp3'),
 ('EzSites. Get your business online.','v7.mp3'),
]
async def make():
 import edge_tts
 for txt,f in voices:
  await edge_tts.Communicate(txt,voice='en-GB-SoniaNeural',rate='-8%',pitch='-5Hz').save('public/'+f)
  d=subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1','public/'+f],capture_output=True,text=True)
  print(f,'duration',d.stdout.strip(),txt)
asyncio.run(make())