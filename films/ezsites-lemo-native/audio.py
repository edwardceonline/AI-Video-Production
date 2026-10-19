#!/usr/bin/env python3
"""Original music, procedural foley, offline English voice test; consumes Lemo events.json."""
import json
import math
import subprocess
import tempfile
from pathlib import Path
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly

HERE = Path(__file__).resolve().parent
OUT = HERE / "out"
OUT.mkdir(exist_ok=True)
SR, DUR = 48000, 15.0
N = int(SR * DUR)
rng = np.random.default_rng(20261019)
music = np.zeros((N, 2), dtype=np.float32)
foley = np.zeros_like(music)
narration = np.zeros_like(music)

def add(dst, sound, t, gain=1.0, pan=0):
    start = max(0, round(t * SR))
    end = min(N, start + len(sound))
    if end <= start:
        return
    s = sound[:end-start] * gain
    dst[start:end, 0] += s * math.sqrt((1-pan)/2)
    dst[start:end, 1] += s * math.sqrt((1+pan)/2)

def note(freq, dur, attack=.004, decay=6.5, extra=.2):
    times = np.arange(round(dur*SR), dtype=np.float32) / SR
    env = (1-np.exp(-times/attack))*np.exp(-decay*times)
    return (np.sin(2*np.pi*freq*times)+extra*np.sin(2*np.pi*2*freq*times))*env

def kick():
    t = np.arange(round(.24*SR),dtype=np.float32)/SR
    frequency = 50+125*np.exp(-t*26)
    return np.sin(2*np.pi*np.cumsum(frequency)/SR)*np.exp(-t*21)

def click():
    t=np.arange(round(.10*SR),dtype=np.float32)/SR
    return (np.sin(2*np.pi*1700*t)+.32*rng.standard_normal(len(t)))*np.exp(-t*66)

def whoosh():
    t=np.arange(round(.36*SR),dtype=np.float32)/SR
    return rng.standard_normal(len(t)) * (np.sin(np.pi*t/.36)**2) * .25

# Written for this production: 120 BPM, gradual layering, break before EzSites reveal.
chords=[(220,261.63,329.63),(174.61,220,293.66),(196,246.94,329.63),(164.81,207.65,261.63)]
for n in range(30):
    at = n * .5
    if 11.48 < at < 12.1:
        continue
    chord=chords[min(3,int(at/3.75))]
    add(music,note(chord[n%3]*(2 if n%7==0 else 1),.34),at,.085 if at<3.4 else .155,(-1 if n%2 else 1)*.2)
    if (3.4<at<11.45) or at>=12.0:
        add(music,kick(),at,.16)
        if n%2:
            hat=rng.standard_normal(round(.07*SR))*np.exp(-np.arange(round(.07*SR))/SR*48)
            add(music,hat,at+.25,.018,.45)
    if 3.5<at<11.45:
        add(music,note(chord[0]/2,.35,decay=7),at,.10)
for f in (220,261.63,329.63):
    add(music,note(f,2.3,attack=.08,decay=.65,extra=.04),12.32,.07)

# Read action timings directly from the original Lemo page using events.mjs.
events=json.loads((HERE/"events.json").read_text())["ev"]
for event in events:
    kind, at = event.get("type"),float(event["t"])
    if kind=="whoosh":add(foley,whoosh(),at,.28)
    elif kind=="impact":add(foley,note(155,.28,decay=12),at,.22)
    else:add(foley,click(),at,.12)

lines=[
    (0.20,"Your business deserves to be seen."),
    (3.72,"Bring it online, with a website that works."),
    (7.54,"Your website, domain, and business email. Connected."),
    (12.03,"EzSites. Get your business online.")
]
cues=[]
duck=np.ones(N,dtype=np.float32)
for i,(at,line) in enumerate(lines,1):
    with tempfile.TemporaryDirectory() as temp:
        wav=Path(temp)/"voice.wav"
        subprocess.run(["espeak-ng","-v","en-us+f3","-s","174","-p","52","-w",str(wav),line],check=True)
        speech,sr=sf.read(wav)
    if speech.ndim==2:speech=speech.mean(axis=1)
    if sr!=SR:speech=resample_poly(speech,SR,sr)
    above=np.flatnonzero(np.abs(speech)>.001)
    if len(above):
        speech=speech[max(0,above[0]-int(.035*SR)):min(len(speech),above[-1]+int(.14*SR))]
    speech=np.asarray(speech,dtype=np.float32)
    rms=np.sqrt(np.mean(speech*speech)+1e-12)
    speech *= min(.16/max(rms,1e-5),10)
    nfade=min(len(speech)//2,round(.035*SR))
    if nfade:
        speech[:nfade] *= np.linspace(0,1,nfade)
        speech[-nfade:] *= np.linspace(1,0,nfade)
    add(narration,speech,at,.78)
    end=min(DUR,at+len(speech)/SR)
    cues.append({"t0":at,"t1":max(at+1.8,end+.12),"text":line})
    a=max(0,round((at-.14)*SR))
    b=min(N,round((end+.25)*SR))
    duck[a:b]=.34

# Smooth control signal to remove abrupt gain edges without delaying speech.
fade=round(.12*SR)
kernel=np.ones(fade,dtype=np.float32)/fade
# Efficient moving average implemented via cumulative sums.
cs=np.concatenate(([0],np.cumsum(duck.astype(np.float64))))
smoothed=np.empty(N,dtype=np.float32)
half=fade//2
pos=np.arange(N)
left=np.maximum(0,pos-half)
right=np.minimum(N,pos+half)
smoothed[:]=((cs[right]-cs[left]) / np.maximum(1,right-left)).astype(np.float32)
mix=music*.70*smoothed[:,None]+foley*.78+narration
mix=np.tanh(mix*1.45)/1.45
sf.write(OUT/"mix.wav",mix,SR,subtype="PCM_24")
(OUT/"cues.json").write_text(json.dumps(cues,indent=2))
def timestamp(s):
    m,sec=divmod(float(s),60)
    return f"00:{int(m):02d}:{int(sec):02d},{int((sec%1)*1000):03d}"
(OUT/"ezsites-lemo-native.srt").write_text("\n\n".join(
    f"{i}\n{timestamp(v['t0'])} --> {timestamp(min(DUR-.05,v['t1']))}\n{v['text']}"
    for i,v in enumerate(cues,1))+"\n")
print("audio:",OUT/"mix.wav","peak",float(np.max(np.abs(mix))))
for cue in cues:print("voice:",cue)
