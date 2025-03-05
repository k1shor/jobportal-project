const express = require('express')
const {registerEmployer, loginEmployer} = require('../controller/EmployerController')

const router = express.Router()

router.post('/register',registerEmployer)
router.post('/login',loginEmployer)





module.exports = router