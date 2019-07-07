import {star, flower, heart, blank} from './templates/index'

export const templateInfo = {
  flower: {
    copy: flower.map(arr => [...arr]),
    numAlreadyColored: 8368,
    totalPix: 90000
  },
  star: {
    copy: star.map(arr => [...arr]),
    numAlreadyColored: 6089,
    totalPix: 90000
  },
  heart: {
    copy: heart.map(arr => [...arr]),
    numAlreadyColored: 2311,
    totalPix: 90000
  },
  blank: {
    copy: blank.map(arr => [...arr]),
    numAlreadyColored: 2000,
    totalPix: 90000
  }
}
