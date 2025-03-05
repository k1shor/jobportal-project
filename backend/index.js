const express = require("express")
// install and use dontenv package to access environment variables
require("dotenv").config()
// connecting to the database
require('./connections/connection')
const path = require("path")
// middleware import
const cors = require('cors')
const morgan = require('morgan')

// routes import
const UserRoute = require('./routes/UserRoutes')
const vacancyRoute = require('./routes/vacancyRoutes');
const ChatRoute = require("./routes/ChatRoutes")




const app = express()
const port = 5000

// use middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


// use routes
app.use(UserRoute)
app.use('/vacancy', vacancyRoute);
app.use('/chat',ChatRoute)

// serve static file
app.use('/profile', express.static(path.join(__dirname, 'public/profile'), {
    setHeaders: (res, path) => {
        res.setHeader('Access-Control-Allow-Origin',  process.env.FRONTEND_DOMAIN);
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        }
}));


// server static file for job vacancy photos
app.use('/public/vacancy', express.static(path.join(__dirname, 'public/vacancy')));

// server the static file resume.pdf
app.use('/public/resume', express.static(path.join(__dirname, 'public/resume')))



// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});



app.listen(port, () => {
    console.log(`App is running on the port ${port}`)
})