const express = require('express')
const { Router } = require('express')

const apiController = require('../controllers/apiController')
const router = express.Router()

/**
 * 
 * @param {*} app : express app
 */
const initApiRoutes = (app) => {
    //path handler
    router.get('/test-api', apiController.testApi)
    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handelLogin)
    return app.use("/api/v1/", router)
}

module.exports = initApiRoutes