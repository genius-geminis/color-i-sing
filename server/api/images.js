const router = require('express').Router()
const {Images, User} = require('../db/models')
module.exports = router

//api for finished images

router.get('/:id', async (req, res, next) => {
  try {
    const images = await Images.findAll({
      where: {
        // +req.params.userId????
        id: req.params.id
      }
    })
    res.json(images)
  } catch (error) {
    next(error)
  }
})
