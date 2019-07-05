import {rainbow, sunset} from './colors'
import {star, flower, heart} from './templates'
import {templateInfo} from './template-info'

const WIDTH = 500
const HEIGHT = 500
const PIX_WIDTH = WIDTH / 100
const PIX_HEIGHT = HEIGHT / 100

let template = []
let templateCopy = []
let coloredPixCounter = 0
let totalPix = 0

export const getColor = (analyser, dataArray, colorPalette) => {
  analyser.getByteFrequencyData(dataArray)
  const newArray = dataArray.slice(0, 159)
  let i = 0
  while (newArray[i] < 100 && i < newArray.length - 1) {
    i++
  }
  if (newArray[i] < 100) {
    return 'rgb(255,255,255)'
  }
  switch (colorPalette) {
    case 'sunset':
      return sunset[i]
    default:
      return rainbow[i]
  }
}

export const makePath = (x, y, pathType) => {
  switch (pathType) {
    case 'random': {
      const newX = Math.round(Math.random() * WIDTH / PIX_WIDTH) * PIX_WIDTH
      const newY = Math.round(Math.random() * HEIGHT / PIX_HEIGHT) * PIX_HEIGHT
      return {newX, newY}
    }
    case 'vertical': {
      const newY = y > HEIGHT ? 0 : y + PIX_HEIGHT
      const newX = y > HEIGHT ? x + PIX_WIDTH : x
      return {newX, newY}
    }
    default: {
      const newX = x > WIDTH ? 0 : x + PIX_WIDTH
      const newY = x > WIDTH ? y + PIX_HEIGHT : y
      return {newX, newY}
    }
  }
}

export const getSeed = () => {
  for (let i = 0; i < templateCopy.length; i++) {
    for (let j = 0; j < templateCopy[0].length; j++) {
      if (templateCopy[i][j] === 0) {
        return {newY: i, newX: j}
      }
    }
  }
}

const getTemplate = name => {
  switch (name) {
    case 'flower':
      return flower
    case 'heart':
      return heart
    case 'star':
      return star
    default:
      return flower
  }
}

export const getNeighbors = temp => {
  if (!templateCopy.length) {
    templateCopy.push(...templateInfo[temp].copy)
    coloredPixCounter = templateInfo[temp].numAlreadyColored
    totalPix = templateInfo[temp].totalPix
  }

  template = getTemplate(temp)
  const startCoord = getSeed()
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
        coord[0] < template.length &&
        coord[0] >= 0 &&
        coord[1] < template[0].length &&
        coord[1] >= 0 &&
        template[coord[0]][coord[1]] === 0
      ) {
        if (!inQ[`${coord[0]} ${coord[1]}`]) {
          inQ[`${coord[0]} ${coord[1]}`] = true
          queue.push(coord)
        }
      } else {
        edges.add(nextCoord)
      }
    })
    templateCopy[nextCoord[0]][nextCoord[1]] = 1
    coloredPixCounter++
  }
  const toPaint = Object.keys(inQ).map(coordStr =>
    coordStr.split(' ').map(str => Number(str))
  )
  return {toPaint, done: coloredPixCounter >= totalPix, edges}
}

export const clearTemplate = () => {
  templateCopy = []
  coloredPixCounter = 0
}
