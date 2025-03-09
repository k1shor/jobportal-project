const { UserSighUp, UserLogin, verifyUser, resendVerification, verifyTokenForPasswordChange, changePassword, sendTokenToResetPassword, deleteToken,
    getProfile,
    profileInfo
} = require('../controller/UserController')

const router = require('express').Router()

router.post('/register', UserSighUp)
router.post('/login', UserLogin)
router.get('/verify-email/:verificationToken', verifyUser)
router.post('/forgetpassword', sendTokenToResetPassword)
router.get('/resend-verification/:email', resendVerification)
router.get("/verify-password-reset-token/:token", verifyTokenForPasswordChange)
router.post("/change-password/:token", changePassword)
router.get("/get-profile/:id", getProfile)

// profile information
router.get('/profile-info/:id', profileInfo)

// delete the token from the database
router.post("/delete-token", deleteToken)

module.exports = router