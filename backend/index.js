const express = require("express")
require("dotenv").config()
require('./connections/connection')
const path = require("path")


const cors = require('cors')
const morgan = require('morgan')

const UserRoute = require('./routes/UserRoutes')
const vacancyRoute = require('./routes/vacancyRoutes');




const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


app.use(UserRoute)
app.use('/vacancy', vacancyRoute);

app.use('/profile', express.static(path.join(__dirname, 'public/profile'), {
    setHeaders: (res, path) => {
        res.setHeader('Access-Control-Allow-Origin',  process.env.FRONTEND_DOMAIN);
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        }
}));


app.use('/public/vacancy', express.static(path.join(__dirname, 'public/vacancy')));

app.use('/public/resume', express.static(path.join(__dirname, 'public/resume')))
app.use('/public/profile', express.static('public/profile'))



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});



app.listen(port, () => {
    console.log(`App is running on the port ${port}`)
})