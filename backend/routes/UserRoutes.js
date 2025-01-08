const { UserSighUp, UserLogin } = require('../controller/UserController')

const router = require('express').Router()

router.post('/register', UserSighUp)
router.post('/login', UserLogin)

module.exports = router