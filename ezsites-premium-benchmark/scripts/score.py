"""Generate an original understated 8-second electronic soundtrack; no third-party audio samples."""
import math,random,wave,struct
random.seed(34918)
RATE=32000
DUR=8.0
N=int(DUR*RATE)
# 112 bpm = 0.5357 sec/beat, opening soft chord + propulsive warm groove
beat=60/112
notes=[(0.0,55.0),(0.0,65.41),(0.0,82.41),(2.13,49.0),(2.13,58.27),(2.13,73.42),(4.28,55.0),(4.28,65.41),(4.28,82.41),(6.43,65.41),(6.43,82.41),(6.43,98.0)]
chords=[(t,fr) for t,fr in notes]
raw=bytearray()
def synth(t):
 v=0.0
 for start,hz in chords:
  age=t-start
  if 0<=age<2.25:
   env=(1-math.exp(-age*16))*math.exp(-age*.72)
   # warm plucked synth, reduced upper partials
   v+=.095*env*(math.sin(2*math.pi*hz*age)+.16*math.sin(2*math.pi*(hz*2.005)*age))
 # kick on 112bpm beat
 phase=t%beat
 if phase<.19:
  env=math.exp(-phase*35)
  v+=.22*env*math.sin(2*math.pi*(58*phase+55*phase*phase))
 # small closed hats 8ths
 hh=t%(beat/2)
 if hh<.055:
  v+=.045*math.exp(-hh*78)*(random.random()*2-1)
 # 2 main transition whooshes (band-limited atmospheric noise / synth)
 for cue in [2.23,6.26]:
  age=t-cue
  if -.23<age<.3:
   p=(age+.23)/.53
   shape=math.sin(math.pi*p)**2
   v+=(random.random()*2-1)*.1*shape*math.sin(2*math.pi*900*t)
 # click impact
 for cue in [2.28,6.3]:
  age=t-cue
  if 0<age<.23:
   v+=.2*math.exp(-age*26)*math.sin(2*math.pi*(100-age*160)*age)
 # fade
 v*=min(1,t/.22,max(0,(DUR-t)/.5))
 return max(-.88,min(.88,v))
with wave.open('public/score.wav','wb') as wf:
 wf.setnchannels(1);wf.setsampwidth(2);wf.setframerate(RATE)
 for i in range(N):
  v=synth(i/RATE)
  raw.extend(struct.pack('<h',int(v*32767)))
 wf.writeframes(raw)
print('Rendered original music: public/score.wav')