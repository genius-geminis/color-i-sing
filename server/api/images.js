const router = require('express').Router()
const {User, Images} = require('../db/models')
module.exports = router

//express gate checks:

//checks if user sending request is logged in
const isLoggedInGate = (req, res, next) =>
  req.user ? next() : res.send('Please log in!')

router.post('/', isLoggedInGate, async (req, res, next) => {
  try {
    let {userId, imageUrl, name} = req.body
    await Images.create({name, imageUrl, userId})
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})
