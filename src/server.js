const express = require('express')
require("dotenv").config()
// const { connection } = require('./config/connectDB')

const configViewEngine = require("./config/viewEngine")
const initWebRoutes = require("./routes/web")

const app = express()
const PORT = process.env.PORT || 8080

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//config view engine
configViewEngine(app)

//body-parser
app.use(express.urlencoded())

//test connection
// connection()

//init web routes
initWebRoutes(app)

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running o the port = " + PORT)
})