import {rainbow, sunset, redBlue, mermaid} from './colors'

const WHITE = '#FAEDE5'
const humanVocalRange = [0, 159]
let refImage
let coloredPix = new Set()
let initialY = 0
const minLightness = 200

export const getColor = (analyser, dataArray, colorPalette) => {
  analyser.getByteFrequencyData(dataArray)
  const amplitudeOfInput = dataArray.slice(...humanVocalRange)
  let i = 0
  const minAmplitude = 100
  while (
    amplitudeOfInput[i] < minAmplitude &&
    i < amplitudeOfInput.length - 1
  ) {
    i++
  }
  if (amplitudeOfInput[i] < minAmplitude) {
    return WHITE
  }

  switch (colorPalette) {
    case 'sunset':
      return sunset[i]
    case 'redBlue':
      return redBlue[i]
    case 'mermaid':
      return mermaid[i]
    default:
      return rainbow[i]
  }
}

//initial X and Y value to start breadth first search
export const getStartCoord = () => {
  for (let i = initialY; i < refImage.height; i++) {
    for (let j = 0; j < refImage.width; j++) {
      if (
        !coloredPix.has(`${i} ${j}`) &&
        refImage.getPixelXY(j, i)[0] >= minLightness
      ) {
        initialY = i
        return {newY: i, newX: j}
      }
    }
  }
  return null
}

//gets coordinates (x, y) of tempalte outlines to be colored
export const getOutline = template => {
  refImage = template.grey()
  const outlinePixels = []
  for (let i = 0; i < refImage.height; i++) {
    for (let j = 0; j < refImage.width; j++) {
      if (refImage.getPixelXY(j, i) < minLightness) {
        outlinePixels.push([i, j])
      }
    }
  }
  return outlinePixels
}

// returns object with array of coordinates to be painted
// and an array of edges (also coordinates), which will be
// highlighted to tell user which part is currenly being painted
export const getNeighbors = template => {
  const startCoord = getStartCoord()
  if (!startCoord) {
    return null
  }

  const queue = [[startCoord.newY, startCoord.newX]]
  // keeps track of all coord that were in queue
  const toPaintSet = new Set()
  const edges = new Set()
  while (queue.length) {
    const [nextY, nextX] = queue.shift()
    toPaintSet.add(`${nextY} ${nextX}`)
    const neighbors = [
      [nextY, nextX - 1],
      [nextY - 1, nextX],
      [nextY + 1, nextX],
      [nextY, nextX + 1]
    ]
    neighbors.forEach(([y, x]) => {
      if (
        y < template.height &&
        y >= 0 &&
        x < template.width &&
        x >= 0 &&
        refImage.getPixelXY(x, y)[0] >= minLightness
      ) {
        if (!toPaintSet.has(`${y} ${x}`)) {
          toPaintSet.add(`${y} ${x}`)
          queue.push([y, x])
        }
      } else {
        edges.add([nextY, nextX])
      }
    })
    coloredPix.add(`${nextY} ${nextX}`)
  }

  const toPaint = []
  toPaintSet.forEach(coordStr => {
    const coordArray = coordStr.split(' ').map(str => Number(str))
    toPaint.push(coordArray)
  })
  return {toPaint, edges}
}

export const clearTemplate = () => {
  coloredPix = new Set()
  initialY = 0
}
