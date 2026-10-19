"""Original score and transition SFX; no licensed track needed."""
import numpy as np, wave, os
rate=32000; duration=30.; n=int(rate*duration); t=np.arange(n)/rate
rng=np.random.default_rng(411);score=np.zeros(n,dtype=np.float64)
# four slow evolving chord palettes with shared A-minor / C major harmony
chords=[[110,130.8128,164.8138,220],[87.307,130.8128,174.614,261.626],[98,146.832,196,293.665],[110,146.832,220,329.628]]
for i in range(4):
 start=i*7.5; u=t-start; active=(u>=0)&(u<8.3); env=np.clip(u/.9,0,1)*np.clip((8.3-u)/.9,0,1)*active
 for j,f in enumerate(chords[i]):
  phase=2*np.pi*f*t
  score+=(np.sin(phase)+.17*np.sin(2*phase+.5))*(.015 if j==0 else .010)*env
# warm pulsing sub-bass, eighth-note plucks, wide shimmering lift at the end
bpm=101; beat=t*bpm/60; phase=beat%1
roots=np.choose(np.clip((t//7.5).astype(int),0,3),[55,43.65,49,55])
score+=.046*np.sin(2*np.pi*roots*t)*np.exp(-phase*4)*(.65+.35*(t>6))
plucks=(np.sin(2*np.pi*440*t)+.25*np.sin(2*np.pi*880*t))*np.exp(-(beat*2%1)*26)
score+=.012*plucks*((t>4)&(t<26))
# controlled soft kick at each beat, hi-hat texture on offbeats
kick=np.sin(2*np.pi*(63+105*np.exp(-phase*24))*phase/(bpm/60)) * np.exp(-phase*32)
score+=.058*kick*((t>4)&(t<27))
noise=rng.normal(0,1,n)
shake=np.exp(-((beat*2+.3)%1)*55)
score+=.006*noise*shake*((t>6)&(t<27))
# cinematic downlift and end, no clipping
rise=np.clip((t-22)/5,0,1)
score+=(np.sin(2*np.pi*659.255*t)*.004+np.sin(2*np.pi*783.99*t)*.003)*rise
fade=np.minimum(1,np.clip(t/1.2,0,1))*np.minimum(1,np.clip((30-t)/2.2,0,1))
score*=fade
os.makedirs('public',exist_ok=True)
def save(name,v):
 v=np.clip(v,-.85,.85)
 with wave.open('public/'+name,'wb') as w:
  w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes((v*32767).astype('<i2').tobytes())
save('music.wav',score)
# small transient sounds at transitions, sourced from synthesized signals
sfx=np.zeros(n,dtype=np.float64)
for at in [3.6,6.65,11.65,15.9,21.75,26.1]:
 ix=int(at*rate);span=min(int(.35*rate),n-ix);p=np.arange(span)/rate
 sw=rng.normal(0,1,span)*np.exp(-p*11)*np.sin(np.pi*np.clip(p/.30,0,1))*.028
 sfx[ix:ix+span]+=sw
for at in [12.2,17.4,21.25,24.5]:
 ix=int(at*rate);span=min(int(.18*rate),n-ix);p=np.arange(span)/rate
 sfx[ix:ix+span]+=.055*np.sin(2*np.pi*(880-350*p)*p)*np.exp(-p*24)
save('sfx.wav',sfx)