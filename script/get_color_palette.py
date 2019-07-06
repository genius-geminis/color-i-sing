
start_hex = 'ff0000'
end_hex = '0000ff'
total_colors = 160
palette = []
start_10 = []
end_10 = []
rgb_increment = []

for i in range(3):
  start_index = i * 2
  end_index = (i + 1) * 2
  start_hex_to_10 = int(start_hex[start_index:end_index], 16)
  end_hex_to_10 = int(end_hex[start_index:end_index], 16)

  start_10.append(start_hex_to_10)
  end_10.append(end_hex_to_10)

  rgb_increment.append((end_hex_to_10 - start_hex_to_10) / total_colors)

for i in range(total_colors):
  new_hex = ''
  for j in range(3):
    to_add = hex(round(start_10[j] + (rgb_increment[j] * i)))[2:]
    if len(to_add) < 2:
      to_add = '0' + to_add
    new_hex += to_add
  palette.append(f'{i}: #{new_hex}')

print(palette)
