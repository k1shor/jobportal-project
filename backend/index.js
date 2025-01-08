const express = require("express")
// install and use dontenv package to access environment variables
require("dotenv").config()
// connecting to the database
require('./connections/connection')

// middleware import
const cors = require('cors')
const morgan = require('morgan')

// routes import
const UserRoute = require('./routes/UserRoutes')




const app = express()
const port = 5000

// use middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


// use routes
app.use(UserRoute)










app.listen(port, () => {
    console.log(`App is running on the port ${port}`)
})