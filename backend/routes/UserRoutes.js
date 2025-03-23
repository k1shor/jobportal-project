const {  UserLogin, verifyUser, resendVerification, verifyTokenForPasswordChange, changePassword, sendTokenToResetPassword, deleteToken,
    getProfile,
    updateProfile,
    returnCompanies,
    UserSignUp,
    returnRole,
    getCompanyDetails
} = require('../controller/UserController')
const profileUpload = require('../middleware/profileUpload')

const router = require('express').Router()

router.post('/register', UserSignUp)
router.post('/login', UserLogin)
router.get('/verify-email/:verificationToken', verifyUser)
router.post('/forgetpassword', sendTokenToResetPassword)
router.get('/resend-verification/:email', resendVerification)
router.get("/verify-password-reset-token/:token", verifyTokenForPasswordChange)
router.post("/change-password/:token", changePassword)
router.post("/get-profile", getProfile)

router.put('/updateprofile', profileUpload.single('profile_picture'), updateProfile)


// delete the token from the database
router.post("/delete-token", deleteToken)

router.get('/getcompanies', returnCompanies)
router.get('/getcompanydetails/:id',getCompanyDetails)
router.get('/getRole', returnRole)

module.exports = router