require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const { connection } = require('./config/connectDB')

const configViewEngine = require("./config/viewEngine")
const initWebRoutes = require("./routes/web")
const initApiRoutes = require('./routes/api')
const { configCors } = require('./config/cors')

const app = express()
const PORT = process.env.PORT || 8080

//config cors
configCors(app)

//config view engine
configViewEngine(app)

//body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//config cookie parser
app.use(cookieParser())

//test connection
// connection()

//init web routes
initWebRoutes(app)
initApiRoutes(app)

app.use((req, res) => {
    return res.send('404 not found')
})

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running o the port = " + PORT)
})