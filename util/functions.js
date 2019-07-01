import {rainbow, greenMonster} from './colors'

const WIDTH = 500
const HEIGHT = 500
const pixWidth = WIDTH / 100
const pixHeight = HEIGHT / 100

export const getColor = (analyser, dataArray, colorPalette) => {
  analyser.getByteFrequencyData(dataArray)
  const newArray = dataArray.slice(40, 199)
  let max = 0
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i] > newArray[max]) {
      max = i
    }
  }
  console.log('max bin: ', max)
  console.log('lower bins: ', newArray)
  switch (colorPalette) {
    case 'greenMonster':
      return greenMonster[max]
    default:
      // console.log('color:')
      return rainbow[max]
  }
}

export const makePath = (x, y, pathType) => {
  switch (pathType) {
    case 'random': {
      const newX = Math.round(Math.random() * WIDTH / pixWidth) * pixWidth
      const newY = Math.round(Math.random() * HEIGHT / pixHeight) * pixHeight
      return {newX, newY}
    }
    default: {
      const newX = x > WIDTH ? 0 : x + pixWidth
      const newY = x > WIDTH ? y + pixHeight : y
      return {newX, newY}
    }
  }
}
