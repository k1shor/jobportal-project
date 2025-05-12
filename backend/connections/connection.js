const mongoose = require('mongoose')
const Skill = require('../models/Skill')

mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log("Database connected successfully.")
        seedSkills();

    })
    .catch((err) => { console.log("Some error occured while connecting to database: ", err) })

// Function to populate default skills
const seedSkills = async () => {
    try {
        const count = await Skill.countDocuments();
        if (count === 0) {
            const defaultSkills = [
                { name: "JavaScript" },
                { name: "HTML" },
                { name: "CSS" },
                { name: "React" },
                { name: "Node.js" }
            ];
            await Skill.insertMany(defaultSkills);
            console.log("Default skills added!");
        }
    } catch (error) {
        console.error("Error seeding skills:", error);
    }
};