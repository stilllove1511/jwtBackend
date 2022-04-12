const express = require('express')
const { Router } = require('express')

const homeController = require('../controllers/homeConrtroller')
const router = express.Router()

/**
 * 
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    //path handler
    router.get("/", homeController.index)
    router.get("/users", homeController.handelUsersPage)
    router.post('/users/create-user', homeController.handelCreateNewUser)
    return app.use("/", router)
}

module.exports = initWebRoutes