const router = require('express').Router()
const {User, Images} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/account', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findByPk(req.user.id, {
        attributes: ['name', 'email'],
        include: [
          {model: Images, attributes: ['name', 'imageUrl', 'createdAt']}
        ]
      })
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})
