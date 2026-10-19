from PIL import Image
p='public/ezsites-logo.png'
im=Image.open(p).convert('RGBA')
out=Image.new('RGBA',im.size)
for y in range(im.height):
 for x in range(im.width):
  r,g,b,a=im.getpixel((x,y)); lo=min(r,g,b)
  # Extract logo from white production artwork and preserve antialiased contours.
  intensity=max(0,min(255,round((255-lo)*2.0)))
  if intensity<=2:
   out.putpixel((x,y),(255,255,255,0));continue
  # Deep navy Ez lettering is changed to ice white for dark-film brand reveal.
  if r<74 and g<90 and b<160:
   r,g,b=241,249,255
  out.putpixel((x,y),(r,g,b,intensity))
box=out.getbbox()
if box:out=out.crop((max(0,box[0]-8),max(0,box[1]-7),min(out.width,box[2]+8),min(out.height,box[3]+7)))
out.save(p)
print('Dark-film transparent brand mark',out.size)