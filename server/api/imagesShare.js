const router = require('express').Router()
const {ImagesShare, Images} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const imageUrl = await ImagesShare.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['imageUrl']
    })
    res.send(`<img src=${imageUrl.imageUrl} />`)
    // res.json(imageUrl)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let {imageUrl} = req.body
    const {dataValues} = await ImagesShare.create({imageUrl}, {returning: true})
    res.json(dataValues.id)
  } catch (error) {
    next(error)
  }
})
