import json,subprocess,glob,os
from PIL import Image,ImageOps,ImageDraw
p='output/EzSites-Beyond-Doors-V4.mp4'
if not os.path.isfile(p) or os.stat(p).st_size<1000000:raise SystemExit('FAIL: Missing output MP4')
def run(args):return subprocess.check_output(args,text=True)
meta=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',p]));fm=meta['format'];duration=float(fm['duration']);v=next(i for i in meta['streams'] if i['codec_type']=='video');a=next(i for i in meta['streams'] if i['codec_type']=='audio')
assert 29.9<duration<30.2,duration
assert int(v['width'])==1080 and int(v['height'])==1920
assert a['codec_name']=='aac',a
print('VIDEO QA',json.dumps({'duration':duration,'width':v['width'],'height':v['height'],'video_codec':v['codec_name'],'audio_codec':a['codec_name'],'size_bytes':fm['size']},indent=2))
frames=sorted(glob.glob('output/stills/*.png')); assert len(frames)>=20,len(frames)
thumbs=[]
for pth in frames:
 im=Image.open(pth).convert('RGB').resize((216,384))
 dr=ImageDraw.Draw(im);dr.rectangle((0,0,216,27),fill='#0B1423');dr.text((12,7),os.path.basename(pth).split('.')[0],fill='#FFFFFF')
 thumbs.append(im)
cols=6; rows=(len(thumbs)+cols-1)//cols;canvas=Image.new('RGB',(216*cols,384*rows),'#0A0D12')
for i,im in enumerate(thumbs):canvas.paste(im,((i%cols)*216,(i//cols)*384))
canvas.save('output/review-board.jpg',quality=90)
print('Stills:',len(frames),'review board:',canvas.size)