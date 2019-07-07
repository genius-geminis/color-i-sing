const {Image} = require('image-js')

Image.load('ice-cream.jpg').then(image => {
  const grey = image.grey()
  console.log(grey.getPixelXY(200, 59))
})
