const Token = require('../models/TokenModel');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const sendEmailToUser = require('../middleware/emailSender');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const UserModel = require('../models/UserModel');
const fs = require('fs')


// user signup
exports.UserSignUp = async (req, res) => {
    const { first_name, last_name, username, email, password, date_of_birth, gender, role } = req.body;

    // console.log(first_name, last_name, username, email, password, date_of_birth, gender);

    // Check if username or email already exists
    let user = await User.findOne({ username: username });
    if (user) {
        return res.status(400).json({ error: "Username already exists" });
    }

    user = await User.findOne({ email: email });
    if (user) {
        return res.status(400).json({ error: "Email already registered!" });
    }

    // Check if saltRounds is a valid number
    const saltRounds = parseInt(process.env.SALTROUNDS);
    if (isNaN(saltRounds)) {
        console.log("Invalid SALTROUNDS value. Please check your environment variable.");
        return res.status(500).json({ error: "Internal server error. Invalid SALTROUNDS value." });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the user in the database
    user = await User.create({
        fullName: `${first_name} ${last_name}`,
        username,
        email,
        password: hashedPassword, // Use the hashed password
        date_of_birth,
        gender,
        role
    });

    const generatedToken = crypto.randomBytes(24).toString('hex')
    // generate verification token
    let token = await Token.create({
        user: user._id,
        token: generatedToken

    })
    if (!token) {
        return res.status(400).json({ error: "Can't generate token for you!" })
    }

    // send token in mail
    const verificationUrl = `${process.env.FRONTEND_DOMAIN}/verify-email/${generatedToken}`;

    const textContent = `Hello,\n\nPlease click the following link to verify your email address:\n${verificationUrl}`;
    const htmlContent = `
                    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .email-body {
            padding: 20px;
            text-align: center;
        }
        .email-body h2 {
            color: #333;
        }
        .email-body p {
            color: #555;
            line-height: 1.6;
        }
        .verify-button {
            display: inline-block;
            padding: 12px 20px;
            color: white;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
            font-size: 16px;
        }
        .verify-button:hover {
            background-color: #45a049;
        }
        .email-footer {
            background: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Email Verification</h1>
        </div>
        <div class="email-body">
            <h2>Hi sir/mam,</h2>
            <p>Thank you for signing up! Please verify your email address to complete your registration.</p>
            <a href=${verificationUrl} class="verify-button">Verify Email</a>
            <p>If you didn't sign up, you can safely ignore this email.</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 ${process.env.COMPANY_NAME}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

                `;

    // Call the sendEmailToUser function to send the email
    // sendEmailToUser("noreply@jobportal.com", email, "Verification Email", textContent, htmlContent)
    sendEmailToUser("info@indexithub.com", email, "Verification Email", textContent, htmlContent)


    // Example usage:
    // sendVerificationEmail(userEmail, generatedToken);
    return res.status(200).json({ success: "User registered successfully" });

};


// login to the user
exports.UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        // console.log(username, password)

        // check the username exist or not
        let user = await User.findOne({ email: email })
        if (user) {
            // check the userpassword 
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    // check the user is verified or not
                    if (!user.verified) {
                        return res.status(200).json({ error: "Please verify your account to continue" })
                    } else {
                        // save user details to the local storage
                        const token = jwt.sign({ _id: user._id, role: user.role, username: user.username }, process.env.SECRET_KEY, { expiresIn: '24h' })
                        res.cookie('user', token, { expire: Date.now() + 86400 })
                        res.json({ token, role: user.role, success: true })
                    }


                } else {
                    return res.status(400).json({ error: "password wrong!" })
                }
            })
        } else {
            return res.status(400).json({ error: "Username don't exists!" })
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error!" })
    }
}

exports.verifyUser = async (req, res) => {
    // console.log(req.params.verificationToken)
    try {
        // check if the token is valid or not
        const { verificationToken } = req.params
        // console.log(verificationToken)
        let token = await Token.findOne({ token: verificationToken })
        if (!token) {
            return res.status(400).json({ error: "Invalid token or token may be expired!" })
        }
        // find the user by token
        let user = await User.findById(token.user)
        if (!user) {
            return res.status(400).json({ error: "User not found!" })
        }
        // check if the user is already verified
        if (user.verified) {
            return res.status(400).json({ error: "User already verified. Login to continue" })
        } else {
            user.verified = true;
            user = await user.save()
        }
        if (!user) {
            return res.status(400).json({ error: "Some error occured, please try again later" })
        } else {
            return res.status(400).json({ success: "User verified successfully, Proceed to login!" })
        }


    } catch (error) {
        return res.status(500).json({ error: "internal server error while verifying email!" })
    }
}

// resend verification token
exports.resendVerification = async (req, res) => {
    // check email
    console.log(req.params.email)
    let user = await User.findOne({ email: req.params.email })
    if (!user) {
        return res.status(400).json({ error: "wrong creadentials!" })
    }
    if (user.verified) {
        return res.status(400).json({ error: "user already verified!" })
    }
    // 


    // generate token and send mail if the user is not verified
    let generatedToken = await Token.create({
        user: user._id,
        token: crypto.randomBytes(24).toString('hex')
    })
    // check if token can't generate
    if (!generatedToken) {
        return res.status(400).json({ error: "some error occured, please try again!" })
    }
    const verificationUrl = `${process.env.DOMAIN}/verify-email/${generatedToken.token}`
    // html content for beautiful UI in mail
    const textContent = `Hello,\n\nPlease click the following link to verify your email address:\n${verificationUrl}`;
    const htmlContent = `
                    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .email-body {
            padding: 20px;
            text-align: center;
        }
        .email-body h2 {
            color: #333;
        }
        .email-body p {
            color: #555;
            line-height: 1.6;
        }
        .verify-button {
            display: inline-block;
            padding: 12px 20px;
            color: white;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
            font-size: 16px;
        }
        .verify-button:hover {
            background-color: #45a049;
        }
        .email-footer {
            background: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Email Verification</h1>
        </div>
        <div class="email-body">
            <h2>Hi sir/mam,</h2>
            <p>Thank you for signing up! Please verify your email address to complete your registration.</p>
            <a href=${verificationUrl} class="verify-button">Verify Email</a>
            <p>If you didn't sign up, you can safely ignore this email.</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 ${process.env.COMPANY_NAME}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;


    // Call the sendEmailToUser function to send the email
    let email_send = sendEmailToUser("noreply@something.com", req.params.email, "Verification Email", textContent, htmlContent)

    if (email_send) {
        return res.status(200).json({ success: "verification token send to you mail" })
    }
}

// require admin
exports.requireAdmin = (req, res, next) => {
    expressjwt({
        secret: process.env.SECRET_KEY,
        algorithms: ['HS256'],
        userProperty: 'auth'
    })(req, res, err => {
        if (err) {
            return res.status(401).json({ error: "please log in!" })
        } else if (req.auth.role === 0) {
            return res.status(403).json({ error: "you don't have permission!" })
        } else {
            next()
        }
    })
}

// send token to reset  password
exports.sendTokenToResetPassword = async (req, res) => {
    let username = req.body.username
    // check if the user exists or not
    let user = await User.findOne({ username })
    if (!user) {
        return res.status(400).json({ error: "user not found!" })
    }
    // generate a token
    let token = await Token.create({
        user: user._id,
        token: crypto.randomBytes(24).toString('hex')
    })
    if (!token) {
        return res.status(400).json({ error: "token not created!" })
    }

    const verificationUrl = `${process.env.FRONTEND_DOMAIN}/resetpassword/${token.token}`
    // html content for beautiful UI in mail
    const textContent = `Hello,\n\nPlease click the following link to reset your password:\n${verificationUrl}`;
    const htmlContent = `
                      <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .email-header {
              background-color: #4CAF50;
              color: white;
              text-align: center;
              padding: 20px;
          }
          .email-body {
              padding: 20px;
              text-align: center;
          }
          .email-body h2 {
              color: #333;
          }
          .email-body p {
              color: #555;
              line-height: 1.6;
          }
          .verify-button {
              display: inline-block;
              padding: 12px 20px;
              color: white;
              background-color: #4CAF50;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 20px;
              font-size: 16px;
          }
          .verify-button:hover {
              background-color: #45a049;
          }
          .email-footer {
              background: #f4f4f4;
              text-align: center;
              padding: 10px;
              font-size: 14px;
              color: #888;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h1>Email Verification</h1>
          </div>
          <div class="email-body">
              <h2>Hi sir/mam,</h2>
              <p>Please click on the link below to to reset your password</p>
              <a href=${verificationUrl} class="verify-button">Reset Your Password</a>
              <p>If you didn't reset, you can safely ignore this email.</p>
          </div>
          <div class="email-footer">
              <p>&copy; 2024 ${process.env.COMPANY_NAME}. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;

    //   call the sendEmailToUser function to send the email
    let email_send = sendEmailToUser('noreply@something.com', user.email, "Reset Password", textContent, htmlContent)

    if (email_send) {
        return res.status(200).json({ success: "password-reset token send to your email address" })
    }

    return res.status(400).json({ error: "some error occur while sending the mail!" })
}

// forgot password
exports.verifyTokenForPasswordChange = async (req, res) => {

    // check if the token is valid or not
    let token = await Token.findOne({ token: req.params.token })

    // if the token is invalid or expire
    if (!token) {
        return res.status(400).json({ error: "Invalid token or token may be expired!" })
    }
    // find the user corresponding the the token
    let user = User.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "User not found!" })
    }
    return res.status(200).json({ success: "token and user verified" })
}

exports.changePassword = async (req, res) => {
    // check if the token is valid or not
    let token = await Token.findOne({ token: req.params.token })

    // if the token is invalid or expire
    if (!token) {
        return res.status(400).json({ error: "Invalid token or token may be expired!" })
    }
    // find the user corresponding the the token
    console.log(token)
    let user = await User.findById(token.user)
    // console.log(user._id)

    if (!user) {
        return res.status(400).json({ error: "User not found!" })
    }

    // password from the body 
    let password = req.body.password
    console.log(password)

    // check if saltRound is valid number
    const saltRounds = parseInt(process.env.SALTROUNDS)
    if (isNaN(saltRounds)) {
        console.log("Invalid saltrounds value. please check your environment variable")
        return res.status(400).json({ error: "Internal server error. Invalid SALTROUNDS value" })
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // store the user in database
    user = await User.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true })

    if (user) {
        return res.status(200).json({ success: "Password changed successfully" })
    }
    return res.status(400).json({ error: "Failed to change password" })
}

// delete the token from database
exports.deleteToken = async (req, res) => {
    const { token } = await req.body
    console.log(token)

    return res.status(200).json({ success: "Token deleted successfully" })
}

// get profile information
exports.getProfile = async (req, res) => {
    const { token } = req.body
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        let user = await User.findById(decoded._id)
        console.log(user)
        return res.send(user)
    } catch (err) {
        return res.status(400).json({ error: "Invalid token" })
    }
}

// get company Details
exports.getCompanyDetails = async (req, res) => {
    let company = await User.findById(req.params.id)
    if(!company){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(company)
}



// details: education, experience, language, reference, tranning, skillset,
// export as pdf



// is allow to post or not
exports.isCompany = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ error: "Access denied. No token provided." })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decoded._id)
        if (!user) {
            return res.status(400).json({ error: "No user found." })
        }
        if (user.role === 0) {
            return res.status(401).json({ error: "You don't have permission to perform this action." })
        }
        next()
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}

// is verified user
exports.isAuthorized = async (id, token) => {
    try {
        if (!token) {
            return res.status(400).json({ error: "Log in required." })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (id != decoded._id) {
            return res.status(400).json({ error: "Incorrect user credentials." })
        }
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

// is logged In
exports.isLoggedIn = async (token) => {
    try {
        if (!token) {
            return res.status(400).json({ error: "Log in required." })
        }
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}


// upload the user profile picture
exports.uploadProfilePicture = async (req, res) => {
    const backend = process.env.DOMAIN;
    let token = req.headers['authorization']?.split(' ')[1];


    if (!token) {
        return res.status(400).json({ error: "Access denied. No token provided." })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const id = decoded._id;


        let { profile_picture } = await User.findById(id)
            .select('profile_picture')
        console.log(profile_picture)

        if (profile_picture) {
            try {
                fs.unlinkSync(profile_picture)
            } catch (e) {
                if (e.code !== 'ENOENT') {
                    // execute if some other issue arise while deleting the file
                    console.log("ERROR: Failed to delete the profile picture")
                }
                // execute only if the file is not present in the directory
                console.log("Profile picture not found. Skip delete profile picture")
            }
        }
        const user = await User.findByIdAndUpdate(id, { profile_picture: req.file.path }, { new: true })
        if (!user) {
            return res.status(400).json({ error: "No user found." })
        }
        return res.status(200).json({ success: true, data: user })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

exports.updateProfile = async (req, res) => {
    console.log(req.body);
    const { skills, first_name, last_name, date_of_birth, gender, password, bio, phone, education, experience, company } = req.body;

    let token = await req.headers.authorization;
    token = await token.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    let user = await UserModel.findById(_id);

   
    user.first_name = first_name ? first_name : user.first_name;
    user.last_name = last_name ? last_name : user.last_name;
    user.date_of_birth = date_of_birth ? date_of_birth : user.date_of_birth;
    user.gender = gender ? gender : user.gender;
    user.bio = bio ? bio : user.bio;
    user.phone = phone ? phone : user.phone;
    user.company = company ? company : user.company;
        user.skills = skills? JSON.parse(skills) : user.skills;
    

    if (req.file) {
        if (user.profile_picture) {
            if(fs.existsSync(user.profile_picture))
            fs.unlinkSync(user.profile_picture);
        }
        user.profile_picture = req.file?.path;
    }

    if (password && password !== user.password) {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
    }

    if (education) {
        user.education = JSON.parse(education);
    }

    if (experience) {
        user.experience = JSON.parse(experience);
    }

    user = await user.save();
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" });
    }

    res.send({ message: "User Profile Updated Successfully" });
};


exports.returnCompanies = async (req, res) => {
    let companies = await User.find({
        role: 1
    })
    if (!companies) {
        return res.status(400).json({ error: "Companies not found" })
    }
    res.send({ success: true, data: companies })
}

exports.returnRole = async (req, res) => {
    let token = req.headers.authorization.toString().split(' ')[1]
    if (!token) {
        return res.status(400).jsom({ error: "User not logged in" })
    }
    try{
        let user = jwt.verify(token, process.env.SECRET_KEY)
        if (!user) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        res.send({ success: true, data: user.role })
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}