const Token = require("../models/TokenModel")
const EmployerModel = require("../models/EmployerModel")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const sendEmailToEmployer = require("../middleware/emailSender")
const {expressjwt} = require("express-jwt");
const {validationResult} = require('express-validator')


// Register the user
module.exports.registerEmployer = async function (req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {first_name, last_name, email, username, password, date_of_birth, gender, company_name} = req.body;
        // console.log(first_name, last_name, email, password, date_of_birth, gender);

        let isUserRegistered = await EmployerModel.findOne({$or: [{email}, {username}]})

        if (isUserRegistered) {
            return res.status(400).json({error: "User already registered!"})
        }

        const hashPassword = await EmployerModel.hashPassword(password);
        console.log(hashPassword)

        const newUser = await EmployerModel.create({
            first_name,
            last_name,
            email,
            username,
            password: hashPassword,
            date_of_birth,
            gender,
            company_name
        })

        const token = await newUser.generateAuthToken()


        return res.status(201).json({token, newUser, success: "user registered successfully"})

    } catch (err) {
        console.log(err)
    }


}


module.exports.loginEmployer = async function (req, res) {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        const {username, password} = req.body;
        let isUserRegistered = await EmployerModel.findOne({username})
        
        if(!isUserRegistered) {
            return res.status(400).json({error: "wrong credentials!"})
        }
        
        let user = await isUserRegistered.comparePassword(password)
        console.log(user)
        
        if(!user) {
            return res.status(400).json({error: "wrong credentials!"})
        }
        
        const token = isUserRegistered.generateAuthToken()
        return res.status(200).json({token, user, success: "you are logged in"})
    }catch(err){
        console.log(err)
    }
}