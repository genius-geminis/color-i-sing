from PIL import Image
import operator
from collections import defaultdict
import re
from functools import reduce
import numpy as np
from enum import Enum

input_path = "../public/balloon.jpg"

output_width = 297
output_height = 421


palette = [(0, 0, 0), (255, 255, 255)]

while len(palette) < 256:
    palette.append(palette[0])

flat_palette = reduce(lambda a, b: a + b, palette)
assert len(flat_palette) == 768

palette_img = Image.new("P", (1, 1), 0)
palette_img.putpalette(flat_palette)

img = Image.open(input_path)
input_size = img.size

output_size = (output_width, output_height)

multiplier = 8
img = img.resize(
    (output_size[0] * multiplier, output_size[1] * multiplier), Image.BICUBIC
)
# img = img.convert('RGB')
img = img.quantize(palette=palette_img)  # reduce the palette

img = img.convert("RGB")

out = Image.new("L", (output_size[0], output_size[1]), 0)


for x in range(output_size[0]):
    for y in range(output_size[1]):
        # sample at get average color in the corresponding square
        histogram = defaultdict(int)
        for x2 in range(x * multiplier, (x + 1) * multiplier):
            for y2 in range(y * multiplier, (y + 1) * multiplier):
                histogram[img.getpixel((x2, y2))] += 1
        color = max(histogram.items(), key=operator.itemgetter(1))[0]
        if color == palette[0]:
            out.putpixel((x, y), 0)
        else:
            out.putpixel((x, y), 255)

out.save("../public/balloon", "jpeg")

