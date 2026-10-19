import math, wave, struct, random, os
random.seed(77);rate=32000;duration=25;pcm=[];chords=[(110,164.81,220),(98,146.83,196),(130.81,164.81,261.63),(110,146.83,220)]
for i in range(rate*duration):
 t=i/rate;section=min(int(t//6.25),3);ch=chords[section];env=min(1,t/1.2,(duration-t)/1.35);env=max(0,env);beat=(t*1.3)%1
 pad=sum(math.sin(2*math.pi*h*t)*.045 for h in ch)+math.sin(2*math.pi*55*t)*.037
 kick=math.sin(2*math.pi*(55+90*math.exp(-beat*34))*beat)*math.exp(-beat*30)*.11
 snap=(random.random()-.5)*math.exp(-((t*1.3+.5)%1)*75)*.023
 hi=math.sin(2*math.pi*880*t)*max(0,math.sin(math.pi*beat))**9*.009
 pcm.append(int(max(-.9,min(.9,(pad+kick+snap+hi)*env))*32767))
os.makedirs('public',exist_ok=True)
with wave.open('public/score.wav','wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(struct.pack('<%sh'%len(pcm),*pcm))