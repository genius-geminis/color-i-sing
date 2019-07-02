import {rainbow, greenMonster} from './colors'

const WIDTH = 500
const HEIGHT = 500
const PIX_WIDTH = WIDTH / 100
const PIX_HEIGHT = HEIGHT / 100

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
    case 'greenMonster':
      return greenMonster[i]
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
    default: {
      const newX = x > WIDTH ? 0 : x + PIX_WIDTH
      const newY = x > WIDTH ? y + PIX_HEIGHT : y
      return {newX, newY}
    }
  }
}
