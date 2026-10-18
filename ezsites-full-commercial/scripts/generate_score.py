"""Deterministic, original 27-second sound bed for a commercial preview; stdlib only."""
from pathlib import Path
import wave,math,random,struct
sr=22050; duration=27; rng=random.Random(27018)
out=Path('public/score.wav');out.parent.mkdir(parents=True,exist_ok=True)
chords=[(146.83,174.61,220.,293.66),(130.81,164.81,196.0,261.63),(174.61,220.,261.63,349.23),(146.83,185.0,220.0,293.66)]
beat=60/110
notes=[(t,([293.66,349.23,392,349.23,329.63,293.66,261.63,293.66][(int(t/beat))%8]),0.14) for t in [beat*i for i in range(50)]]
raw=bytearray()
for i in range(sr*duration):
 t=i/sr
 fade=min(1,t/.65, (duration-t)/.95)
 if fade<0:fade=0
 chord=chords[int(t/5.8)%len(chords)]
 x=0.0
 for j,n in enumerate(chord):
  x+=(0.031 if t>=4.8 else 0.025)*math.sin(2*math.pi*n*t+0.035*math.sin(2*math.pi*.14*t*(j+1)))
  x+=.009*math.sin(2*math.pi*n*2.004*t+.3)
 for on,hz,volume in notes:
  dt=t-on
  if 0<=dt<.75:
   attack=min(1,dt*100);env=attack*math.exp(-dt*(7.7 if t>=5 else 10))
   x+=(volume if t>=5 else volume*.27)*env*(.7*math.sin(2*math.pi*hz*dt)+.08*math.sin(2*math.pi*hz*2.01*dt))
 if t>=4.8:
  phase=t%beat
  if phase<.17:
   x+=.095*math.exp(-phase*19)*math.sin(2*math.pi*(70*phase+48*phase*phase))
  hat=(t+beat/2)%(beat/2)
  if hat<.055:x+=.023*math.exp(-hat*78)*(rng.random()*2-1)
  cl=(t+beat*.02)%(beat*2)
  if .545<cl<.635:
   d=cl-.545;x+=.028*math.exp(-d*34)*(rng.random()*2-1)
 for onset,amp in [(5,.16),(11,.15),(15,.14),(19,.17),(23,.24)]:
  q=t-onset
  if 0<=q<.65:
   x+=amp*math.exp(-q*9)*math.sin(2*math.pi*(82*q+25*q*q))
 x*=max(0,min(1,fade))
 x=max(-.82,min(.82,x))
 l=int(x*32767);r=int(max(-.82,min(.82,x*.965))*32767)
 raw+=struct.pack('<hh',l,r)
with wave.open(str(out),'wb') as f:
 f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr);f.writeframes(raw)
print('Rendered original score',out,len(raw),'bytes')