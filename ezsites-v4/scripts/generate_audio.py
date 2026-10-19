import math,os,asyncio,wave
import numpy as np
os.makedirs('public',exist_ok=True)
rate=44100
D=30.0
n=int(D*rate)
t=np.arange(n,dtype=np.float64)/rate
p=np.zeros(n,dtype=np.float64)
# Minor-key orchestral-electronic music bed, custom synthesized for this ad.
# In A minor / C major with a clean arc, roomy pads, plucked pulse and felt-like highs.
chords=[(110.0,164.81,220.0,329.63),(87.31,130.81,174.61,261.63),(130.81,196.0,261.63,392.0),(98.0,146.83,196.0,293.66)]
bar=60/104*4
for k in range(14):
 st=k*bar
 if st>=D:break
 inds=(int(st*rate),int(min(D,(st+bar+.3))*rate))
 z=np.arange(inds[1]-inds[0],dtype=float)/rate
 progress=st/D
 a,b,c,d=chords[k%4]
 env=np.minimum(1,z/.65)*np.minimum(1,np.maximum(0,(bar+.3-z)/.8))
 pad=(np.sin(2*np.pi*a*z)+.52*np.sin(2*np.pi*b*z)+.32*np.sin(2*np.pi*c*z)+.21*np.sin(2*np.pi*d*z))
 p[inds[0]:inds[1]]+=.058*pad*env*(.76+.31*progress)
 # Plucked dotted eighth melody, restrained and rhythmic.
 for beat in (0,.75,1.5,2.5,3.25):
  start=st+beat*60/104
  j=int(start*rate)
  if j>=n:continue
  length=min(int(.62*rate),n-j)
  tt=np.arange(length)/rate
  freq=[c,d,c,b][(k+int(beat*2))%4]*2
  sig=np.sin(2*np.pi*freq*tt+.004*np.sin(2*np.pi*3*tt))*np.exp(-6.2*tt)
  p[j:j+length]+=.031*sig*(.6+.6*progress)
# Sub pulse and felt percussion follow the beat from second four onwards.
for step in range(int(D/(60/104))+1):
 st=step*60/104
 if st<3.5 or st>D-2:continue
 j=int(st*rate);length=min(int(.19*rate),n-j)
 tt=np.arange(length)/rate
 kick=np.sin(2*np.pi*(65+80*np.exp(-35*tt))*tt)*np.exp(-26*tt)
 p[j:j+length]+=.048*kick
 if step%2:
  rng=np.random.default_rng(5300+step)
  noise=rng.standard_normal(length)
  h=np.append([0],np.diff(noise))[:length]*np.exp(-46*tt)*.012
  p[j:j+length]+=h
# Soft high notes to support the brand reveal.
for st,freq in [(7.45,783.99),(12.9,659.25),(17.8,880.0),(22.4,587.33),(26.7,783.99)]:
 j=int(st*rate);length=min(int(2.7*rate),n-j);z=np.arange(length)/rate
 p[j:j+length]+=.036*(np.sin(2*np.pi*freq*z)+.36*np.sin(2*np.pi*freq*1.5*z))*np.exp(-2.2*z)
# Fade at both ends; retain dynamic headroom.
p*=np.minimum(1,t/.6)*np.minimum(1,(D-t)/1.6)
p/=max(1.0,np.max(np.abs(p))/.65)
# stereo small cross-channel delay and airy width
side=np.concatenate((np.zeros(95),p[:-95]))
left=p*.92+side*.06
right=p*.85+side*.12
x=np.stack([left,right],axis=1)
def wav(path,x):
 y=np.int16(np.clip(x,-.95,.95)*32767)
 with wave.open(path,'wb') as w:
  w.setnchannels(2 if y.ndim==2 else 1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(y.tobytes())
wav('public/score.wav',x)
rng=np.random.default_rng(9891)
length=int(1.26*rate);z=np.arange(length)/rate
noise=rng.standard_normal(length)
smoothed=np.convolve(noise,np.ones(31)/31,mode='same')
whoosh=(smoothed*.06*np.sin(np.pi*np.minimum(1,z/1.26))**2 +.025*np.sin(2*np.pi*(110+470*z)*z)*np.exp(-3.9*z))
ww=np.stack([whoosh,np.roll(whoosh,41)],axis=1)
wav('public/soft-transition.wav',ww)
print('Original score and SFX generated, no borrowed tracks',os.path.getsize('public/score.wav'))

LINES=[
 'Great businesses begin with passion.',
 'But the next customer could be anywhere.',
 'Give them a place to discover you.',
 'A name to remember. A domain of your own.',
 'A way to reach you, whenever they are ready.',
 'Professional email keeps the conversation going.',
 'EzSites. Get your business online.'
]
async def voice():
 import edge_tts
 for i,line in enumerate(LINES):
  await edge_tts.Communicate(line,voice='en-GB-SoniaNeural',rate='-5%',volume='+0%').save(f'public/vo{i}.mp3')
  print('VO segment',i,line)
asyncio.run(voice())