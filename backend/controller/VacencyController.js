const vacancy = require('../models/VacencyModel')
const Application = require('../models/ApplicationModel')
const jwt = require('jsonwebtoken')

//  post the vacancy
exports.postVacancy = async (req, res) => {
    console.log("i am inside the post vacancy")
    const {title, description, company, type, skillsRequired, salaryRange, location} = req.body;
    // extract the user id based on token
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1]
    const id = null;
    try {
        const decoded = jwt.verify(token, process.env.SECREAT_KEY)
        const posted = await vacancy.create({
            title,
            description,
            employerId: decoded._id,
            type: type,
            company: company,
            skillsRequired,
            salaryRange,
            photo: req.file.filename,
            location
        });
        if (!posted) {
            return res.status(400).json({error: 'Unable to upload your vacancy'})
        }
        return res.status(201).json({success: "vacancy posted successfully!", data: posted})
    } catch (e) {
        return res.status(400).json({error: e.message})
    }
}

// Retrieve the vacancy from the database to display on the home page
exports.getVacancy = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1]

    // get the latest and recent vacancies
    const recentVacancies = await vacancy.find()
        .populate('employerId', 'profile_picture username')
        .sort({createdAt: -1})          // sort by most recent
        .skip((page - 1) * limit)        // skip the previous records 
        .limit(limit); // Half sequential

    // get random vacancies
    const randomVacancies = await vacancy.aggregate([
        {$sample: {size: Math.floor(limit / 2)}},
        {
            $lookup: {
                from: 'users',
                localField: 'employerId',
                foreignField: '_id',
                as: 'employerId',
            }
        },
        {
            $unwind: '$employerId',
        },
        {
            $project: {
                title: 1,
                description: 1,
                skillsRequired: 1,
                salaryRange: 1,
                location: 1,
                type: 1,
                company: 1,
                photo: 1,
                createdAt: 1,
                "employerId.profile_picture": 1,
                "employerId.username": 1
            }
        }
    ])
    console.log(randomVacancies)

    //     combine both random and latest vacancies
    const combinedVacancies = [...randomVacancies, ...recentVacancies]
        .sort(() => Math.random() - 0.5)

    return res.status(200).json({success: true, data: combinedVacancies})
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
            .sort({createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit); // Half sequential

        return res.status(200).json({success: true, data: recentVacancies})
    } catch (e) {
        return res.status(500).json({error: "Internal server error"})
    }
}

// delete the vacancies
exports.deleteVacancy = async (req, res) => {
    console.log(req.query.id)

    const deletedUser = await vacancy.deleteOne({_id: req.query.id})
    if (!deletedUser) {
        return res.status(404).json({error: 'User does not exist', success: false})
    }
    return res.status(200).json({success: true, data: deletedUser})
}


// get vacancies details
exports.getVacancyDetails = async (req, res) => {
    const id = req.query.id;
    const userId = req.user._id;

    try {
        const vacancyDetails = await vacancy.findById(id);
        if (!vacancyDetails) {
            return res.status(404).json({error: 'Vacancy not found', success: false});
        }

        // Check if the user has applied
        const isApplied = await Application.findOne({jobSeekerId: userId, vacancyId: id});

        return res.status(200).json({
            success: true,
            data: vacancyDetails,
            isApplied: !!isApplied // Convert to boolean
        });

    } catch (error) {
        console.error('Error fetching vacancy details:', error);
        return res.status(500).json({error: 'Server error', success: false});
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
        return res.status(200).json({success: true, data: applicationApplied})
    } catch (error) {
        return res.status(400).json({success: false, error: "Some error has occurred!"})
    }
}

// get the specific applied vacancy
exports.getUserAppliedVacancies = async (req, res) => {
    const userId = req.user._id
    
    try{
        const appliedVacancies = await Application.find({jobSeekerId: userId})
            .populate('jobSeekerId')
            .populate('vacancyId')
        
        
        
        
        
        
        return res.status(200).json({success: true, data: appliedVacancies})
    }catch(error){
        return res.status(500).json({error: 'Internal server error',success: false})
    }
}