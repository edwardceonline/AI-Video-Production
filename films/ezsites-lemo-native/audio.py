#!/usr/bin/env python3
"""20s original score: grid-locked 120 BPM motorik, original foley and Kokoro VO."""
from pathlib import Path
import json
import math
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly, lfilter

HERE=Path(__file__).resolve().parent
OUT=HERE/"out"
OUT.mkdir(exist_ok=True)
SR=48000
DUR=20
N=SR*DUR
rng=np.random.default_rng(20261019)
music=np.zeros((N,2),dtype=np.float32)
foley=np.zeros((N,2),dtype=np.float32)
ambience=np.zeros((N,2),dtype=np.float32)
narration=np.zeros((N,2),dtype=np.float32)

def add(dst,s,when,gain=1.,pan=0):
    s=np.asarray(s,dtype=np.float32)
    begin=round(when*SR)
    if begin<0: s=s[-begin:];begin=0
    end=min(N,begin+len(s))
    if end<=begin:return
    a=s[:end-begin]*gain
    dst[begin:end,0]+=a*math.sqrt((1-pan)*.5)
    dst[begin:end,1]+=a*math.sqrt((1+pan)*.5)

def pluck(freq,dur=.35,decay=9,brightness=.19,attack=.006):
    t=np.arange(round(dur*SR),dtype=np.float32)/SR
    env=(1-np.exp(-t/attack))*np.exp(-t*decay)
    return env*(np.sin(2*np.pi*freq*t)+brightness*np.sin(4*np.pi*freq*t)+brightness*.25*np.sin(6*np.pi*freq*t))

def kick():
    t=np.arange(round(.28*SR),dtype=np.float32)/SR
    phase=2*np.pi*np.cumsum(57+160*np.exp(-t*27))/SR
    return np.sin(phase)*np.exp(-t*20)

def closedhat():
    n=round(.12*SR);t=np.arange(n)/SR
    white=rng.standard_normal(n)
    hp=np.r_[0,np.diff(white)]
    return hp*np.exp(-t*70)*.26

def papernoise(duration=.18,decay=15):
    n=round(duration*SR);t=np.arange(n)/SR
    white=rng.standard_normal(n)
    return lfilter([1,-.88],[1,-.40],white).astype(np.float32)*np.exp(-t*decay)*.25

def pen():
    t=np.arange(round(.19*SR))/SR
    return (np.sin(2*np.pi*(410+1900*t)*t)+.19*rng.standard_normal(len(t)))*np.exp(-t*29)*.24

def whoosh():
    t=np.arange(round(.42*SR),dtype=np.float32)/SR
    n=rng.standard_normal(len(t))
    amp=np.sin(np.pi*t/.42)**2
    return lfilter([1,-.98],[1,-.49],n).astype(np.float32)*amp*.12

def impact():
    t=np.arange(round(.52*SR),dtype=np.float32)/SR
    return np.sin(2*np.pi*(66*t+17*(1-np.exp(-t*18))))*np.exp(-t*14)

# Meaningful near-silences: one at the first turn, one before email, one before brand.
SILENCES=[(3.42,3.78),(11.40,11.80),(15.43,15.79)]
def audible(t):
    return not any(a<=t<=b for a,b in SILENCES)

# Ten 2-second bars at 120 BPM, one layer added on each new visual chapter.
chords=[(164.81,196.0,246.94),(146.83,185.0,220.0),
        (174.61,220.0,261.63),(130.81,164.81,196.0),
        (164.81,207.65,261.63)]
for n in range(80):                      # eighth-note grid, 0.25s
    t=n*.25
    if not audible(t):continue
    section=min(4,int(t/4))
    triad=chords[section]
    if n%2==0:                          # beat
        add(music,pluck(triad[(n//2)%3]*2,.27,decay=10),t,.09+section*.012,(-1 if n%4 else 1)*.17)
        if section>0:
            add(music,kick(),t,.12 if section<4 else .17)
    if section>0 and n%2:
        add(music,closedhat(),t,.026+(section-1)*.003,.4)
    if section>=2 and n%4==1:
        add(music,pluck(triad[0]/2,.43,decay=6.2,brightness=.1),t,.11)
    if section>=3 and n%8==3:
        add(music,papernoise(.16,25),t,.040,-.4)
# Brand chord / tail; does not compete with CTA.
for hz in (164.81,207.65,261.63,329.63):
    add(music,pluck(hz,3.7,decay=1.28,attack=.085),16.04,.055)
# A continuous low-room tone, just audible between events.
noisy=rng.standard_normal(N).astype(np.float32)
bed=lfilter([.004],[1,-.996],noisy).astype(np.float32)
bed*=.013
for i,(a,b) in enumerate([(0,4),(4,8),(8,12),(12,16)]):
    s=round(a*SR);e=round(b*SR)
    ambience[s:e,0]+=bed[s:e]
    ambience[s:e,1]+=bed[s:e]*.9
# Score drops out in these deliberate silent pockets.
for a,b in SILENCES:
    i,j=round(a*SR),round(b*SR)
    music[i:j]=0
    ambience[i:j]=0

ev=json.loads((HERE/"events.json").read_text())["ev"]
assert len(ev)>=15, "Animation doesn't expose enough foley actions"
for e in ev:
    t=float(e["t"])
    typ=e["type"]
    if typ=="whoosh":add(foley,whoosh(),t,.27)
    elif typ=="impact":add(foley,impact(),t,.19)
    elif typ=="paper":add(foley,papernoise(),t,.27)
    elif typ=="pen":add(foley,pen(),t,.18)
    elif typ=="type":add(foley,pluck(910,.085,decay=55),t,.084)
    else:add(foley,pluck(650,.13,decay=35,brightness=.36),t,.13)

lines=json.loads((HERE/"lines.json").read_text())
starts=[.30,4.30,8.30,12.30,16.27]
deadlines=[3.70,7.70,11.70,15.73,19.83]
assert len(lines)==len(starts)==5
duck=np.ones(N,dtype=np.float32)
cues=[]
for item,t,deadline in zip(lines,starts,deadlines):
    path=OUT/"voice"/(item["id"]+".wav")
    voice,fs=sf.read(path)
    if voice.ndim>1:voice=voice.mean(1)
    if fs!=SR:voice=resample_poly(voice,SR,fs)
    voice=voice.astype(np.float32)
    duration=len(voice)/SR
    stop=t+duration
    if stop>deadline:raise RuntimeError(f"Narration {item['id']} ends {stop:.3f}s after safe {deadline:.3f}s — shorten or speed it up, never truncate.")
    rms=np.sqrt(np.mean(voice*voice)+1e-10)
    if rms<1e-3:raise RuntimeError(f"Voice almost silent: {item['id']}")
    voice *= min(.155/rms,4)
    fade=min(len(voice)//2,int(.025*SR))
    if fade>0:
        voice[:fade]*=np.linspace(0,1,fade)
        voice[-fade:]*=np.linspace(1,0,fade)
    add(narration,voice,t,.78)
    a=max(0,round((t-.13)*SR))
    b=min(N,round((stop+.28)*SR))
    duck[a:b]=.30
    cues.append({"t0":t,"t1":min(DUR-.05,max(t+1.8,stop+.65)),"text":item["text"]})
# smooth 150ms gain transitions while preserving exact dialogue onsets
fade=round(.15*SR)
cs=np.concatenate(([0],np.cumsum(duck,dtype=np.float64)))
pos=np.arange(N,dtype=np.int32)
left=np.maximum(0,pos-fade//2)
right=np.minimum(N,pos+fade//2)
env=((cs[right]-cs[left])/np.maximum(right-left,1)).astype(np.float32)
mixed=music*.74*env[:,None]+ambience*.45+foley*.70+narration
mixed=np.tanh(mixed*1.32)/1.32
peak=np.abs(mixed).max()
assert 0.001<peak<.95, f"Wrong peak before mastering: {peak}"
sf.write(OUT/"mix.wav",mixed,SR,subtype="PCM_24")

def srt_time(s):
    m,v=divmod(s,60)
    return f"00:{int(m):02d}:{int(v):02d},{round((v%1)*1000):03d}"
(OUT/"ezsites-lemo-native.srt").write_text("\n\n".join(
    f"{i}\n{srt_time(c['t0'])} --> {srt_time(c['t1'])}\n{c['text']}"
    for i,c in enumerate(cues,1))+"\n",encoding="utf-8")
(OUT/"cues.json").write_text(json.dumps(cues,indent=2))
(OUT/"score.json").write_text(json.dumps({"duration":DUR,"bpm":120,"bars":10,
  "cuts":[4,8,12,16],"silences":SILENCES,"events":ev,
  "voice":cues},indent=2))
print("ORIGINAL SCORE 20s:",OUT/"mix.wav","pre-master-peak",round(float(peak),3),"foley-events",len(ev))
for c in cues:print("voice:",c)
