const Sequelize = require('sequelize')
const db = require('../db')

const ImagesShare = db.define('imagesShare', {
  imageUrl: {
    type: Sequelize.TEXT
  }
})

module.exports = ImagesShare
