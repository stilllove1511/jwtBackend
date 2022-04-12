const express = require('express')
const { Router } = require('express')

const router = express.Router()

/**
 * 
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("hello world")
    })

    return app.use("/", router)
}

module.exports = initWebRoutes