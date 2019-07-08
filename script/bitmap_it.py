from PIL import Image
import operator
from collections import defaultdict
import re
from functools import reduce
import numpy as np
from enum import Enum

# Instantiate a new Clarifai app by passing in your API key.
class YarnSizes(Enum):
    LACE = 8
    SUPER_FINE = 30 / 4
    FINE = 6
    LIGHT = 22 / 4
    MEDIUM = 18 / 4
    BULKY = 13 / 4
    SUPER_BULKY = 9 / 4
    JUMBO = 6 / 4


class NeedleSizes(Enum):
    LACE = "000 to 1"
    SUPER_FINE = "1 to 3"
    FINE = "3 to 5"
    LIGHT = "5 to 7"
    MEDIUM = "7 to 9"
    BULKY = "9 to 11"
    SUPER_BULKY = "11 to 17"
    JUMBO = "17 and larger"


input_path = "../public/balloon.jpg"

output_width = 297
output_height = 421

# def bitmap_it():

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
# out = [[None] * output_size[0] for i in range(output_size[1])]

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

