const express = require('express')
require("dotenv").config()
// const { connection } = require('./config/connectDB')

const configViewEngine = require("./config/viewEngine")
const initWebRoutes = require("./routes/web")

const app = express()
const PORT = process.env.PORT || 8080

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