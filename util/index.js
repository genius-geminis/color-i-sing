// ctx.fillStyle = 'blue'
// ctx.fillRect(10, 10, 150, 100)

function visualize() {
  const WIDTH = canvas.width
  const HEIGHT = canvas.height

  analyser.fftSize = 2048
  let bufferLengthAlt = analyser.frequencyBinCount
  let dataArrayAlt = new Uint8Array(bufferLengthAlt)

  let x = 0
  let y = 0

  drawAlt()
}

let drawAlt = function() {
  let drawVisual = requestAnimationFrame(drawAlt)

  const {maxColor, barWidth, barHeight} = getColor()

  ctx.fillStyle = maxColor
  ctx.fillRect(x, y, barWidth, barHeight)
}

const getColor = function() {
  const newLength = 150

  const maxColor = colors[max]

  let barWidth = WIDTH / newLength
  let barHeight = WIDTH / newLength

  x += barWidth + 1

  if (x > WIDTH) {
    y += barHeight + 1
    x = 0
  }

  return {maxColor, barWidth, barHeight}
}