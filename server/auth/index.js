const router = require('express').Router()
const User = require('../db/models/user')
const Images = require('../db/models/images')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findByPk(req.user.id, {
        attributes: ['email', 'fullName', 'id'],
        include: [
          {
            model: Images,
            attributes: ['id', 'name', 'imageUrl', 'createdAt']
          }
        ]
      })
      res.json(user)
    } else {
      res.json(req.user)
    }
  } catch (err) {
    next(err)
  }
})

router.use('/google', require('./google'))
