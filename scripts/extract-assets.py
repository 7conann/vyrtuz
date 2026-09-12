from pathlib import Path
import fitz
from PIL import Image, ImageDraw

root = Path('/vercel/share/v0-project')
doc = fitz.open(root / 'public/vyrtuz-apresentacao.pdf')
out = root / 'public/images'
out.mkdir(parents=True, exist_ok=True)
thumbs = []
for n in [0, 9, 11, 12, 17, 22, 27, 28]:
    page = doc[n]
    pix = page.get_pixmap(matrix=fitz.Matrix(0.5, 0.5))
    image = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
    image.thumbnail((640, 360))
    thumbs.append((n, image))
    print('PAGE', n + 1, 'SIZE', page.rect)
    for index, info in enumerate(page.get_images(full=True)):
        xref = info[0]
        data = doc.extract_image(xref)
        print('IMAGE', index, xref, data['width'], data['height'], data['ext'])
        if data['width'] > 400 and data['height'] > 300:
            image_path = out / f'pdf-{n+1}-{index}.{data["ext"]}'
            image_path.write_bytes(data['image'])
canvas = Image.new('RGB', (1280, 4 * 390), '#171717')
draw = ImageDraw.Draw(canvas)
for i, (n, image) in enumerate(thumbs):
    x, y = (i % 2)*640, (i//2)*390
    canvas.paste(image, (x,y+25))
    draw.text((x+10, y+5), str(n+1), fill='white')
canvas.save('/tmp/vyrtuz-contact-sheet.jpg')

pos = Image.open(out / 'pdf-10-0.jpeg')
pos.crop((1170, 0, 1920, 990)).save(out / 'maquininha.webp', quality=93)
cover = Image.open(out / 'pdf-1-0.jpeg')
logo = cover.crop((1140, 478, 1750, 625)).convert('RGBA')
pixels = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r,g,b,a = pixels[x,y]
        alpha = max(0, min(255, int((min(r,g,b)-125)*3)))
        pixels[x,y] = (247,248,252,alpha)
logo.save(out / 'vyrtuz-logo.png')
Image.open(out / 'pdf-12-0.jpeg').crop((0, 0, 960, 405)).save(out / 'empreendedor.webp', quality=90)
Image.open(out / 'pdf-13-0.jpeg').crop((0, 0, 1920, 400)).save(out / 'tap-on-phone.webp', quality=90)
Image.open(out / 'pdf-28-0.jpeg').crop((1010, 0, 1920, 1080)).save(out / 'negocio-em-movimento.webp', quality=90)
Image.open(out / 'pdf-23-0.jpeg').crop((1060, 0, 1920, 465)).save(out / 'cartoes.webp', quality=90)
background = Image.new('RGB', (1600, 900), '#080d14')
product = pos.crop((1170, 0, 1920, 990))
product.thumbnail((750, 900))
background.paste(product, (1600-product.width, 0))
background.save(out / 'filme-poster.jpg', quality=93)

import subprocess
import imageio_ffmpeg
subprocess.run([
    imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-i', str(out / 'filme-poster.jpg'),
    '-vf', "scale=2560:-1,zoompan=z='1+0.0015*on':x='iw-iw/zoom':y='ih/2-ih/zoom/2':d=180:s=1280x720:fps=30",
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '22', '-g', '1', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', '-an', str(root / 'public/vyrtuz-motion.mp4')
], check=True)
