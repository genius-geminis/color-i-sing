const Sequelize = require('sequelize')
const db = require('../db')

const Images = db.define('images', {
  // guest users will not have userId
  name: {
    type: Sequelize.STRING,
    defaultValue: 'image'
  },
  imageUrl: {
    type: Sequelize.TEXT
  }
})

module.exports = Images
