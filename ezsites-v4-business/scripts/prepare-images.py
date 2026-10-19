from PIL import Image,ImageOps
from pathlib import Path
pub=Path('public')
for name in ('mobile','desktop'):
 inp=pub/f'kurotsuki-{name}-long.png'
 im=Image.open(inp).convert('RGB')
 if name=='mobile':
  im=im.crop((0,0,im.width,min(im.height,9600)))
 else:im=im.crop((0,0,im.width,min(im.height,6000)))
 im.save(pub/f'site-{name}.png',optimize=True)
 print(name,im.size)
# Preserve actual official EzSites logo; use its original white mark on light brand background.
logo=Image.open(pub/'ezsites-logo.png')
print('Official logo',logo.size)