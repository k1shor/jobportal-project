const mongoose = require("mongoose");
const VacancySchema = new mongoose.Schema({
    title: String, // Job title
    description: String, // Job description
    skillsRequired: [String], // Skills required for the job
    salaryRange: String, // e.g., "50,000-70,000"
    location: String, // Job location
    type: String,
    company: String,
    photo: {
        type: String,
        default: 'job.jpeg'
    },
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to the employer
    userPhoto: {
      type: String,
      default: 'default.png',
    },
    createdAt: { type: Date, default: Date.now },
},{timestamps: true});

module.exports = mongoose.model('Vacancy', VacancySchema);