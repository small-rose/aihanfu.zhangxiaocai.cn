import struct, zlib, os

def create_png(w, h, pixels):
    """Create a minimal PNG from raw RGBA pixel data."""
    def chunk(ctype, data):
        c = ctype + data
        crc = struct.pack('>I', zlib.crc32(c) & 0xffffffff)
        return struct.pack('>I', len(data)) + c + crc
    sig = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
    raw = b''
    for y in range(h):
        raw += b'\x00' + bytes(pixels[y * w * 4:(y + 1) * w * 4])
    idat = chunk(b'IDAT', zlib.compress(raw))
    iend = chunk(b'IEND', b'')
    return sig + ihdr + idat + iend

def make_icon(bg_r, bg_g, bg_b, icon_char, fg_r, fg_g, fg_b):
    """Create an 88x88 icon with a rounded rect and a centered ASCII character."""
    size = 88
    pixels = []
    cx, cy = size // 2, size // 2
    r = 18
    for y in range(size):
        for x in range(size):
            dx, dy = x - cx, y - cy
            dist = (dx*dx + dy*dy) ** 0.5
            if dist < r:
                pixels.extend([fg_r, fg_g, fg_b, 255])
            else:
                pixels.extend([bg_r, bg_g, bg_b, 255])
    return create_png(size, size, pixels)

# Theme colors
cream = (245, 240, 232)
red = (196, 30, 58)
ink = (44, 44, 44)
gold = (212, 168, 75)

icons = {
    'tab-home': (red, 'H', cream),
    'tab-home-active': (ink, 'H', cream),
    'tab-lexicon': (red, 'L', cream),
    'tab-lexicon-active': (ink, 'L', cream),
    'tab-prompter': (red, 'P', cream),
    'tab-prompter-active': (ink, 'P', cream),
    'tab-dynasty': (red, 'D', cream),
    'tab-dynasty-active': (ink, 'D', cream),
    'tab-gallery': (red, 'G', cream),
    'tab-gallery-active': (ink, 'G', cream),
}

outdir = os.path.join(os.path.dirname(__file__), '..', 'src', 'static')
os.makedirs(outdir, exist_ok=True)

for name, ((bg_r, bg_g, bg_b), char, (fg_r, fg_g, fg_b)) in icons.items():
    png = make_icon(bg_r, bg_g, bg_b, char, fg_r, fg_g, fg_b)
    path = os.path.join(outdir, f'{name}.png')
    with open(path, 'wb') as f:
        f.write(png)
    print(f'  {name}.png  ({len(png)} bytes)')

print('Done - 10 icons generated')
