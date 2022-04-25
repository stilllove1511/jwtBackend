const express = require('express')
const { Router } = require('express')

const apiController = require('../controllers/apiController')
const userController = require('../controllers/userController')
const groupController = require('../controllers/groupController')
const router = express.Router()

/**
 * 
 * @param {*} app : express app
 */
const initApiRoutes = (app) => {
    //path handler
    router.get('/test-api', apiController.testApi)
    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)

    router.get('/users/read', userController.readFunc)
    router.post('/users/create', userController.createFunc)
    router.put('/users/update', userController.updateFunc)
    router.delete('/users/delete', userController.deleteFunc)

    router.get('/group/read', groupController.readFunc)

    return app.use("/api/v1/", router)
}

module.exports = initApiRoutes