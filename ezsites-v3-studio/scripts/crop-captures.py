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