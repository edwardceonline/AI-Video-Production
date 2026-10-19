"""Original royalty-free instrumental cue synthesized for the 26s EzSites creative preview.
No existing commercial composition or recording is sampled.
"""
import numpy as np, wave
from pathlib import Path
SR=32000; DUR=26.0; n=int(DUR*SR);t=np.arange(n)/SR
beat=60/94
rng=np.random.default_rng(20261019)
a=np.zeros(n,dtype=np.float64)
# A restrained cinematic score: dark analogue pads, brushed percussion and gentle arpeggios.
chords=[(146.83,174.61,220.0,293.66), (116.54,146.83,174.61,233.08), (130.81,164.81,196.0,261.63),(130.81,164.81,196.0,246.94)]
def add(t0,x,vol=1):
 i=int(t0*SR);en=min(n,i+len(x));
 if en>i:a[i:en]+=x[:en-i]*vol
# layered warm sustained chords
for k in range(12):
 pos=k*2.12;notes=chords[k%4]; dur=3.3;u=np.arange(int(dur*SR))/SR
 env=np.minimum(u/.52,1)*np.minimum((dur-u)/1.4,1);env=np.clip(env,0,1)
 for j,f in enumerate(notes):
  wave1=(np.sin(2*np.pi*f*u)+.23*np.sin(2*np.pi*(f*2.003)*u)+.09*np.sin(2*np.pi*(f*.498)*u))
  add(pos,wave1*env,vol=.018*(1-.14*j))
 # occasional muted pluck near chord change
 for j,f in enumerate(notes[:3]):
  tt=np.arange(int(.85*SR))/SR;env2=np.exp(-tt*4.9)*(1-np.exp(-tt*80));
  pluck=(np.sin(2*np.pi*f*tt)+.18*np.sin(2*np.pi*2*f*tt))*env2
  add(pos+j*.22,pluck,.027)
# pulse: soft low kick and dry grain tick, build only mid-video
for k in range(int(DUR/beat)+1):
 pos=k*beat;u=np.arange(int(.42*SR))/SR
 if k%4==0 or k%4==2:
  phase=2*np.pi*(57*u+42*(1-np.exp(-u*40))/40)
  add(pos,np.sin(phase)*np.exp(-u*15),.067)
 if k%2==1:
  short=rng.normal(0,1,int(.085*SR)); short=np.convolve(short,np.ones(12)/12,mode='same')
  env=np.exp(-np.arange(len(short))/SR*52)
  add(pos,short*env,.022)
# music rises during cinematic->product reveal with a soft airy swell
for pos in [5.1,10.6,15.8,20.1,22.5]:
 duration=.9;nn=int(duration*SR);u=np.arange(nn)/SR
 noise=rng.normal(0,1,nn);smooth=np.convolve(noise,np.ones(47)/47,mode='same')
 env=(u/duration)**1.9*(1-u/duration)**.65
 add(pos,smooth*env,.036)
# add a soft upper melodic idea across brand reveal
for pos,note in [(19.5,392),(20.2,440),(20.9,349.23),(22.5,392),(23.4,523.25),(24.1,587.33)]:
 nn=int(1.4*SR);u=np.arange(nn)/SR;env=(1-np.exp(-u*18))*np.exp(-u*2.6)
 add(pos,np.sin(2*np.pi*note*u)*env,.023)
# roll off overall before tail and fade in opening
fade=np.minimum(1,t/.7)*np.minimum(1,(DUR-t)/1.75)
a*=np.clip(fade,0,1)
a=np.tanh(a*1.8);peak=np.max(np.abs(a));a=a*min(.75/max(peak,1e-6),1.0)
a16=np.int16(np.clip(a*32767,-32768,32767))
p=Path('public/score.wav');p.parent.mkdir(exist_ok=True)
with wave.open(str(p),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(a16.tobytes())
print('Original score',len(a16),peak,p.stat().st_size)