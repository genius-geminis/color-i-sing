import {rainbow, sunset} from './colors'
import {star} from './templates'

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
    return 'rgb(0,255,255)'
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

let starCopy = [...star]

export const getNext = inQ => {
  Object.keys(inQ).forEach(coordStr => {
    let coordArr = coordStr.split(' ')
    let x = Number(coordArr[0])
    let y = Number(coordArr[1])
  })
  let newX = Math.round(Math.random() * WIDTH / PIX_WIDTH)
  let newY = Math.round(Math.random() * HEIGHT / PIX_HEIGHT)
  while (newX >= 80 || newY >= 80 || starCopy[newX][newY] === 1) {
    newX = Math.round(Math.random() * WIDTH / PIX_WIDTH)
    newY = Math.round(Math.random() * HEIGHT / PIX_HEIGHT)
  }
  return {newX, newY}
}
