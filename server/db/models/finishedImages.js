const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Images = db.define('images', {
  // guest users will not have userId
  userId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  canvas: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING,
    default: {
      true: 'Untitled'
    }
  },
  //   gif: {
  //     // not sure yet
  //   },
  default: 'There is no images here!'
})
