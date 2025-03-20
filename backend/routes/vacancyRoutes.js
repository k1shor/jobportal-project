const { postVacancy, getVacancy, getUserVacancies, deleteVacancy, getVacancyDetails, applyVacancy,
    getUserAppliedVacancies,
    updateVacancy
} = require("../controller/VacencyController");
const { isCompany } = require("../controller/UserController");
const router = require('express').Router()
const vacancyUpload = require("../middleware/vacancyUpload")
const { isUserAuthenticated } = require("../middleware/Authentication");
const resumeUpload = require("../middleware/AppliedVacancyResume")


// post the vacancy here
router.post('/post-vacancy', isCompany, vacancyUpload.single('image'), postVacancy)

// get the vacancy 
router.get('/getAllVacancies', getVacancy)

// get specific user vacancy to display it on profile page
router.get('/user-vacancies', getUserVacancies)

// delete the vancacy
router.delete('/delete-vacancy', deleteVacancy)

// get the vacancy details of specific vacancy
router.get('/get-vacancy-details/:id', getVacancyDetails)

// apply for the job vacancy
router.post('/apply/:vacancyId', isUserAuthenticated, resumeUpload.single('cv'), applyVacancy)

// get the use applied vacancy
router.get('/get-user-applied-vacancies', isUserAuthenticated, getUserAppliedVacancies)

router.put(`/update/:jobId`,vacancyUpload.single('image'), updateVacancy)










module.exports = router