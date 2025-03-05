const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const employerSchema = new mongoose.Schema({
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: Number, default: 1 }, // 0: job-seeker, 1: employer
    verified: { type: Boolean, default: false },
    date_of_birth: { type: Date, required: false },
    gender: { type: String, required: false },
    profile_picture: { type: String, default: 'default-employer.png' },
    company_name: { type: String, required: true, trim: true },
}, { timestamps: true });

employerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.SECREAT_KEY)
    return token;
};

employerSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

employerSchema.statics.hashPassword = async function (password) {
    if (!password) {
        throw new Error('Password is required for hashing');
    }
    return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Employer', employerSchema);