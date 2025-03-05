const {postVacancy, getVacancy, getUserVacancies, deleteVacancy, getVacancyDetails, applyVacancy,
    getUserAppliedVacancies
} = require("../controller/VacencyController");
const {isEmployer} = require("../controller/UserController");
const router = require('express').Router()
const vacancyUpload = require("../middleware/vacancyUpload")
const {isUserAuthenticated} = require("../middleware/Authentication");
const resumeUpload = require("../middleware/AppliedVacancyResume")


// post the vacancy here
router.post('/post-vacancy', isEmployer, vacancyUpload.single('photo') ,postVacancy)

// get the vacancy 
router.get('/get-vacancy', getVacancy)

// get specific user vacancy to display it on profile page
router.get('/user-vacancies', getUserVacancies)

// delete the vancacy
router.delete('/delete-vacancy', deleteVacancy)

// get the vacancy details of specific vacancy
router.get('/get-vacancy-details', isUserAuthenticated ,getVacancyDetails)

// apply for the job vacancy
router.post('/apply/:vacancyId', isUserAuthenticated, resumeUpload.single('cv') ,applyVacancy)

// get the use applied vacancy
router.get('/get-user-applied-vacancies', isUserAuthenticated, getUserAppliedVacancies)












module.exports = router