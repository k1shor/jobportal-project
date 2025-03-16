const ApplicationModel = require('../models/ApplicationModel')
const { isAuthorized, isLoggedIn } = require('./UserController')
const jwt = require('jsonwebtoken')

exports.applyJob = async (req, res) => {
    let token = await req.headers["authorization"]
    token = token.toString().split(" ")[1]
    let user = jwt.verify(token, process.env.SECRET_KEY)
    isAuthorized(user._id, token)

    let application = await ApplicationModel.findOne({
            jobSeekerId: user._id,
            vacancyId: req.body.vacancyId
    })
    if (application) {
        return res.status(400).json({ error: `You have already applied to this position.Go to your <a href="/application/${application._id}">application</a>` })
    }
    let newApplication = await ApplicationModel.create({
        jobSeekerId: user._id,
        vacancyId: req.body.vacancyId
    })
    if (!newApplication) {
        return res.status(400).json({ error: "SOmething went wrong" })
    }
    res.send({ success: true, message: "Job Applied successfully." })
}

exports.getAllApplications = async (req, res) => {
    let applications = await ApplicationModel.find()
    if (!applications) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send({ succes: true, data: applications })
}

exports.getMyApplications = async (req, res) => {
    let token =  await req.headers["authorization"].toString().split(" ")[1]
    let user = jwt.verify(token, process.env.SECRET_KEY)
    let application = await ApplicationModel.find({ jobSeekerId: user._id }).populate({
        path:'vacancyId', populate: 'employerId'})
    if (!application) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send({ succes: true, data: application })
}

exports.getApplicationStatus = async (req, res) => {
    let token = await req.headers["authorization"]
    if(!token){
        return res.status(401).json({error:"Invalid credentials"})
    }
    token = token.toString().split(" ")[1]
    let user = jwt.verify(token, process.env.SECRET_KEY)
    let application = await ApplicationModel.findOne({jobSeekerId: user._id, vacancyId: req.params.vacancyId })
    if(!application){
        return res.status(400).json({error:"No Application found"})
    }
    res.send({success:true, status: application.status, id: application._id })
}