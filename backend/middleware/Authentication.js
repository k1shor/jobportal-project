const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
exports.isUserAuthenticated = async (req, res, next) => {
    //  get the user token from the headers
    const token = req.headers.authorization.split(' ')[1]
    // decrypt the user token using secret key to extract the user id
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userExists = await User.findById(decoded._id).select("role")
        // 0 for job seeker, he can apply && 1 for employer, he post the job vacancy
        if (!userExists.role) {
            req.user = decoded;
            next()
        } else {
            console.log("You are employer, you can' apply for the job")
        }
        console.log("can't find the user ", e.message)
s
    } catch (e) {
        console.log("some error while decrypting the token", e.message)
    }
}