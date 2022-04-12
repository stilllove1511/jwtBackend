const express = require('express')
require("dotenv").config()

const configViewEngine = require("./configs/viewEngine")
const initWebRoutes = require("./routes/web")

const app = express()
const PORT = process.env.PORT || 8080

//config view engine
configViewEngine(app)

//init web routes
initWebRoutes(app)

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running o the port = " + PORT)
})