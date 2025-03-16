const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const ApplicationSchema = new mongoose.Schema({
    jobSeekerId: { type: ObjectId, ref: 'User', required: true },
    vacancyId: { type: ObjectId, ref: 'Job', required: true },
    status: { type: String, enum: ['applied', 'shortlisted', 'rejected'], default: 'applied' },

}, { timestamps: true });

ApplicationSchema.index({ jobSeekerId: 1, vacancyId: 1 });


module.exports = mongoose.model('Application', ApplicationSchema);