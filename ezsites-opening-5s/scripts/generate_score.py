"""Original 5-second ambient score for the EzSites florist opening.
Stdlib-only deterministic offline synthesis; rights: original composition.
"""
import wave, math, random, struct
from pathlib import Path
sr=24000
n=sr*5
rng=random.Random(42)
notes=[(0.03,146.83,.20),(0.22,220,.16),(.55,293.66,.15),(1.06,349.23,.12),(1.5,293.66,.12),(1.99,220,.13),(2.6,174.61,.14),(3.05,233.08,.18),(3.4,293.66,.17),(3.9,349.23,.13),(4.3,293.66,.13)]
fl=[]
for i in range(n):
 t=i/sr
 fade=min(1.,t/1.1,max(0.,(5-t)/.65))
 x=0.
 for onset,hz,vv in notes:
  if t<onset: continue
  q=t-onset
  env=(1-math.exp(-q*85))*math.exp(-q*3.3)
  x+=vv*env*(.7*math.sin(2*math.pi*hz*q+.12)+.14*math.sin(2*math.pi*2.005*hz*q)+.045*math.sin(2*math.pi*3.01*hz*q))
 for j,hz in enumerate((146.83,174.61,220,293.66)):
  x+=.018*fade*math.sin(2*math.pi*hz*t+math.sin(2*math.pi*.14*t)*(j+1)*.1)
 for onset,amp in ((0.,.13),(3.,.19)):
  if t>=onset:
   q=t-onset
   x+=amp*math.exp(-q*10)*math.sin(2*math.pi*(64*q+30*q*q))
 x+=.003*math.exp(-((t-2.94)/.22)**2)*(rng.random()*2-1)
 x*=min(1,t/.12,max(0,(5-t)/.30))
 fl.append(max(-.94,min(.94,x)))
raw=bytearray()
for i,x in enumerate(fl):
 l=round(x*32767)
 r=round(fl[max(0,i-31)]*.93*32767)
 raw+=struct.pack('<hh',l,r)
out=Path('public/original-score.wav')
out.parent.mkdir(parents=True,exist_ok=True)
with wave.open(str(out),'wb') as w:
 w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes(raw)
print(f'Original audio: {out}: {len(raw)} PCM bytes')