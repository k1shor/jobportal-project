const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema


const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  qualification: { type: String, required: true },
  skills: [{ type: String, required: true }],
  otherSkills: { type: String },
  experience: { type: Number, required: true },
  category: { type: String, required: true },
  vacancies: { type: Number, required: true },
  employmentType: { type: String, required: true },
  salary: { type: String, required: true },
  responsibilities: { type: String, required: true },
  deadline: { type: Date, required: true },
  employerId: {type: ObjectId, ref: "User"},
  status : {type: Number, default: 1}, 
  image: {type: String}
});

module.exports = mongoose.model("Job", jobSchema);
