const { applyJob, getAllApplications, getMyApplications, getApplicationStatus } = require('../controller/ApplicationController')
const { isCompany } = require('../controller/UserController')

const router = require('express').Router()

router.post('/applyjob', applyJob)
router.get('/getallapplications', isCompany, getAllApplications)
router.get('/getmyapplications', getMyApplications)
router.get('/getapplicationstatus/:vacancyId', getApplicationStatus)

module.exports = router