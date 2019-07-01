const router = require('express').Router()
const {User, Images} = require('../db/models')
module.exports = router

//express gate checks:

//checks if user sending request is logged in
const isLoggedInGate = (req, res, next) =>
  req.user ? next() : res.send('Please log in!')

router.post('/', async (req, res, next) => {
  try {
    let {userId, imageUrl, name} = req.body
    let {imageEntry} = await Images.create(req.body)
    res.status(201).json(imageEntry)
  } catch (error) {
    next(error)
  }
})
