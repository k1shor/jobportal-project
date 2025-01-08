const Token = require('../models/TokenModel');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const sendEmailToUser = require('../middleware/emailSender');

exports.UserSighUp = async (req, res) => {
    const { first_name, last_name, username, email, password, date_of_birth, gender } = req.body;

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
        first_name,
        last_name,
        username,
        email,
        password: hashedPassword, // Use the hashed password
        date_of_birth,
        gender,
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
    // send token in e-mail

    const verificationUrl = `http://localhost:5000/verify-email?token=${token}`;

    const textContent = `Hello,\n\nPlease click the following link to verify your email address:\n${verificationUrl}`;
    const htmlContent = `
                    <p>Hello,</p>
                    <p>Please click the following link to verify your email address:</p>
                    <a href="${verificationUrl}">Verify Email</a>
                `;

    // Call the sendEmailToUser function to send the email
    sendEmailToUser("noreply@something.com", email, "Verification Email", textContent, htmlContent)


    // Example usage:
    // sendVerificationEmail(userEmail, generatedToken);
    return res.status(200).json({ success: "User registered successfully" });

};


// login to the user
exports.UserLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(username, password)

        // check the username exist or not
        let user = await User.findOne({ username: username })
        if (user) {
            // check the userpassword 
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    // save the user information to localstorage
                    return res.status(200).json({ success: "You are logged in!" })

                } else {
                    return res.status(400).json({ error: "password wrong!" })
                }
            })
        } else {
            return res.status(400).json({ error: "Username don't exists!" })
        }

    } catch (error) {
        return res.status(200).json({ error: "Internal server error!" })
    }
}
