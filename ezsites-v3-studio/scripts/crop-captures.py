from PIL import Image
from pathlib import Path
for name in ['desktop','mobile']:
 path=Path(f'public/web-{name}-full.png')
 im=Image.open(path).convert('RGB')
 print('original website capture',name,im.size)
 w,h=im.size
 if name=='desktop':
  im.crop((0,0,w,min(3700,h))).save('public/web-desktop-long.png',quality=91,optimize=True)
  im.crop((0,0,w,min(1150,h))).save('public/web-desktop-top.png',quality=91,optimize=True)
 else:
  im.crop((0,0,w,min(4400,h))).save('public/web-mobile-long.png',quality=91,optimize=True)
  im.crop((0,0,w,min(1900,h))).save('public/web-mobile-top.png',quality=91,optimize=True)
 path.unlink(missing_ok=True)

# Preserve exact official brand mark while removing only blank canvas edges.
brand=Image.open('public/ezsites-logo.png').convert('RGBA')
from PIL import ImageChops
bg=Image.new('RGBA',brand.size,(255,255,255,255))
diff=ImageChops.difference(brand,bg)
box=diff.convert('RGB').getbbox()
print('brand raw shape',brand.size,'nonwhite bbox',box)
if box:
 b=brand.crop((max(0,box[0]-12),max(0,box[1]-12),min(brand.width,box[2]+12),min(brand.height,box[3]+12)))
 # White backing to alpha with tolerance keeps the colors of the official icon and wordmark.
 pixels=b.load()
 for y in range(b.height):
  for x in range(b.width):
   r,g,blue,a=pixels[x,y]
   whiten=min(r,g,blue)
   if whiten>252: pixels[x,y]=(r,g,blue,0)
   elif whiten>242: pixels[x,y]=(r,g,blue,round(a*(252-whiten)/10))
 b.save('public/ezsites-logo-cropped.png')