"""Original procedural cinematic score and on-beat SFX; no licensed third-party music required."""
import numpy as np, wave,math, os
from pathlib import Path
Path('public').mkdir(exist_ok=True)
rate=32000; duration=30.0; t=np.arange(int(duration*rate),dtype=np.float64)/rate
# progression Dm(add9), Bbmaj7, F(add9), C(sus2) at 2 bar harmonic phrase
notes=[(146.83,174.61,220.,293.66),(116.54,146.83,174.61,233.08),(130.81,164.81,196.,261.63),(130.81,146.83,196.,261.63)]
chord=np.zeros_like(t)
for i,ns in enumerate(notes):
 start=i*7.5; l=np.clip((t-start)/1.2,0,1)*np.clip((start+7.5-t)/1.4,0,1)
 for n in ns:
  chord+=.014*l*(np.sin(2*np.pi*n*t)+.30*np.sin(2*np.pi*n*.501*t))
# low pulse, warm and restrained with deep movement between visual beats
bass=np.zeros_like(t);bpm=96;beat=60/bpm
for bt in np.arange(0,duration,beat*2):
 idx=(t>=bt)&(t<bt+.49);tt=t[idx]-bt
 bass[idx]+=.13*np.sin(2*np.pi*(65+26*np.exp(-tt*18))*tt)*np.exp(-tt*9)
# restrained tick texture after website reveal
hats=np.zeros_like(t)
for bt in np.arange(8.0,25.5,beat/2):
 idx=(t>=bt)&(t<bt+.07);tt=t[idx]-bt
 # Deterministic synthetic transients via many sine partials (not white noise)
 hats[idx]+=.007*np.exp(-tt*48)*(np.sin(2*np.pi*3600*tt)+.5*np.sin(2*np.pi*4200*tt))
# shimmer/rise into reveal & finale
sh=np.zeros_like(t)
for at in (7.75,13.4,19.8,25.3):
 idx=(t>=at-.28)&(t<=at+.35); tt=t[idx]-(at-.28); env=np.sin(np.pi*tt/.63)**2
 sh[idx]+=.018*env*(np.sin(2*np.pi*(450*tt+500*tt**2))+.40*np.sin(2*np.pi*1100*tt))
# beginning softer, end confident
vol=np.interp(t,[0,2.5,4.1,8,15,21,26,28.8,30],[.25,.30,.48,.72,.85,.90,.86,.60,0])
score=(chord+bass+hats+sh)*vol
score=np.tanh(score*1.5)*.84
pcm=(np.clip(score,-1,1)*32767).astype('<i2')
with wave.open('public/score.wav','wb') as wav:
 wav.setnchannels(1);wav.setsampwidth(2);wav.setframerate(rate);wav.writeframes(pcm.tobytes())
print('original score saved:',len(pcm)/rate)