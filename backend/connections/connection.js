const mongoose = require('mongoose')
// console.log(process.env.DATABASE)

mongoose.connect(process.env.DATABASE)
    .then(() => { console.log("Database connected successfully.") })
    .catch((err) => { console.log("Some error occured while connecting to database: ", err) })