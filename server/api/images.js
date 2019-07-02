const router = require('express').Router()
const {User, Images} = require('../db/models')
module.exports = router

//express gate checks:

//checks if user sending request is logged in
const isLoggedInGate = (req, res, next) =>
  req.user ? next() : res.send('Please log in!')

router.post('/', isLoggedInGate, async (req, res, next) => {
  try {
    let {name, imageUrl, userId} = req.body
    await Images.create({name, imageUrl, userId})
    res.status(201).send(name)
  } catch (error) {
    next(error)
  }
})

router.delete('/', isLoggedInGate, async (req, res, next) => {
  try {
    await Images.destroy({
      where: {
        id: req.query.id
      }
    })
    res.status(204)
  } catch (error) {
    next(error)
  }
})
