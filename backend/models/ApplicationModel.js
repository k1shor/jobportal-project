const mongoose = require("mongoose");
const ApplicationSchema = new mongoose.Schema({
    jobSeekerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    vacancyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Vacancy'},
    status: {type: String, enum: ['applied', 'shortlisted', 'rejected'], default: 'applied'},
    question_one: {type: String},
    question_two: {type: String},
    resume: {type: String}
}, {timestamps: true});

ApplicationSchema.index({jobSeekerId: 1, vacancyId: 1});


module.exports = mongoose.model('Application', ApplicationSchema);