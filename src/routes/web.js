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
    router.get("/user", homeController.handleUsersPage)
    router.post('/users/create-user', homeController.handleCreateNewUser)
    router.post('/delete-user/:id', homeController.handleDeleteUser)
    router.get('/update-user/:id', homeController.getUpdateUserPage)
    router.post('/user/update-user/', homeController.handleUpdateUser)
    return app.use("/", router)
}

module.exports = initWebRoutes