import {rainbow, sunset, redBlue} from './colors'

const WHITE = '#FAEDE5'
const frequencyBounds = [0, 159]
let refImage
let coloredPix = new Set()
let seedY = 0

export const getColor = (analyser, dataArray, colorPalette) => {
  analyser.getByteFrequencyData(dataArray)
  const newArray = dataArray.slice(...frequencyBounds)
  let i = 0
  while (newArray[i] < 100 && i < newArray.length - 1) {
    i++
  }
  if (newArray[i] < 100) {
    return WHITE
  }
  switch (colorPalette) {
    case 'sunset':
      return sunset[i]
    case 'redBlue':
      return redBlue[i]
    default:
      return rainbow[i]
  }
}

export const getSeed = () => {
  for (let i = seedY; i < refImage.height; i++) {
    for (let j = 0; j < refImage.width; j++) {
      if (!coloredPix.has(`${i} ${j}`) && refImage.getPixelXY(j, i)[0] >= 200) {
        seedY = i
        return {newY: i, newX: j}
      }
    }
  }
  return null
}

export const getOutline = template => {
  refImage = template.grey()
  const outlinePixels = []
  for (let i = 0; i < refImage.height; i++) {
    for (let j = 0; j < refImage.width; j++) {
      if (refImage.getPixelXY(j, i) < 200) {
        outlinePixels.push([i, j])
      }
    }
  }
  return outlinePixels
}

export const getNeighbors = template => {
  refImage = template.grey()

  const startCoord = getSeed()
  if (!startCoord) {
    return null
  }

  const queue = [[startCoord.newY, startCoord.newX]]
  const inQ = {}
  const edges = new Set()
  while (queue.length) {
    const nextCoord = queue.shift()
    inQ[`${nextCoord[0]} ${nextCoord[1]}`] = true
    const neighbors = [
      [nextCoord[0], nextCoord[1] - 1],
      [nextCoord[0] - 1, nextCoord[1]],
      [nextCoord[0] + 1, nextCoord[1]],
      [nextCoord[0], nextCoord[1] + 1]
    ]
    neighbors.forEach(coord => {
      if (
        coord[0] < template.height &&
        coord[0] >= 0 &&
        coord[1] < template.width &&
        coord[1] >= 0 &&
        refImage.getPixelXY(coord[1], coord[0])[0] >= 200
      ) {
        if (!inQ[`${coord[0]} ${coord[1]}`]) {
          inQ[`${coord[0]} ${coord[1]}`] = true
          queue.push(coord)
        }
      } else {
        edges.add(nextCoord)
      }
    })
    coloredPix.add(`${nextCoord[0]} ${nextCoord[1]}`)
  }
  const toPaint = Object.keys(inQ).map(coordStr =>
    coordStr.split(' ').map(str => Number(str))
  )
  return {toPaint, edges}
}

export const clearTemplate = () => {
  coloredPix = new Set()
  seedY = 0
}
