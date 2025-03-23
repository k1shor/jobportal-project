const vacancy = require('../models/VacencyModel')
const Application = require('../models/ApplicationModel')
const jwt = require('jsonwebtoken')

//  post the vacancy
exports.postVacancy = async (req, res) => {
    const { title, location, qualification, skills, experience, category, vacancies, employmentType, salary, responsibilities, deadline, otherSkills } = req.body;

    // extract the user id based on token
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const posted = await vacancy.create({
            title,
            location,
            qualification,
            skills: skills, // Since it's sent as a string from frontend
            otherSkills,
            experience,
            category,
            vacancies,
            employmentType,
            salary,
            responsibilities,
            deadline,
            employerId: decoded._id,
            image: req.file?.path
        });
        if (!posted) {
            return res.status(400).json({ error: 'Unable to upload your vacancy' })
        }
        return res.status(201).json({ success: "vacancy posted successfully!" })
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}

// Retrieve the vacancy from the database to display on the home page
exports.getVacancy = async (req, res) => {

    // get the latest and recent vacancies
    const vacancies = await vacancy.find()
        .populate('employerId', 'profile_picture username')
        .sort({ createdAt: -1 })          // sort by most recent

    return res.status(200).json({ success: true, data: vacancies })
}


// get the vacancy of the particular user
exports.getUserVacancies = async (req, res) => {
    const id = req.headers['authorization'].split(' ')[1];
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    console.log(page, limit)
    try {
        const recentVacancies = await vacancy.find()
            .populate('employerId', 'profile_picture username')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit); // Half sequential

        return res.status(200).json({ success: true, data: recentVacancies })
    } catch (e) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

// delete the vacancies
exports.deleteVacancy = async (req, res) => {
    console.log(req.query.id)

    const deletedUser = await vacancy.deleteOne({ _id: req.query.id })
    if (!deletedUser) {
        return res.status(404).json({ error: 'User does not exist', success: false })
    }
    return res.status(200).json({ success: true, data: deletedUser })
}


// get vacancies details
exports.getVacancyDetails = async (req, res) => {
    try {
        const vacancyDetails = await vacancy.findById(req.params.id);
        if (!vacancyDetails) {
            return res.status(404).json({ error: 'Vacancy not found', success: false });
        }

        return res.status(200).json({
            success: true,
            data: vacancyDetails
        });

    } catch (error) {
        return res.status(500).json({ error: 'Server error', success: false });
    }
};


// book the vacancy
exports.applyVacancy = async (req, res) => {
    const userId = req.user._id
    const vacancyId = req.params.vacancyId
    try {
        const applicationApplied = await Application.create({
            jobSeekerId: userId,
            vacancyId: vacancyId,
            resume: req.file.path,
            question_one: req.body.question1,
            question_two: req.body.question2
        })
        return res.status(200).json({ success: true, data: applicationApplied })
    } catch (error) {
        return res.status(400).json({ success: false, error: "Some error has occurred!" })
    }
}

// get the specific applied vacancy
exports.getUserAppliedVacancies = async (req, res) => {
    const userId = req.user._id

    try {
        const appliedVacancies = await Application.find({ jobSeekerId: userId })
            .populate('jobSeekerId')
            .populate('vacancyId')

        return res.status(200).json({ success: true, data: appliedVacancies })
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', success: false })
    }
}

// update 
exports.updateVacancy = async (req, res) => {
    const { title, location, qualification, skills, experience, category, vacancies, employmentType, salary, responsibilities, deadline, otherSkills } = req.body;

    let vacancyToUpdate = await vacancy.findByIdAndUpdate(req.params.jobId, {
        title,
        location,
        qualification,
        skills, // Since it's sent as a string from frontend
        otherSkills,
        experience,
        category,
        vacancies,
        employmentType,
        salary,
        responsibilities,
        deadline,
        image: req.file?.path
    })
    if(!vacancyToUpdate){
        return res.status(400).json({error:"Something went wrong"})
    } 
    res.send(vacancyToUpdate)
}

// GET VACANCY OF A COMPANY
exports.getVacancyOfACompany = async (req, res) => {
    let vacancies = await vacancy.find({employerId: req.params.employerId})
    if(!vacancies){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(vacancies)
}