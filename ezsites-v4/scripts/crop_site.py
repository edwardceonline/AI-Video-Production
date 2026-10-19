from PIL import Image
im=Image.open('public/site-full.png').convert('RGB')
print('Public Kurotsuki capture',im.size)
assert im.size[0]>=900 and im.size[1]>=2200, 'Website capture insufficient for camera motion'
for name,a,b in [('site-top.png',0,3600),('site-middle.png',1100,4600)]:
 crop=im.crop((0,a,min(im.width,1080),min(im.height,b)))
 crop.save('public/'+name,quality=95,optimize=True)