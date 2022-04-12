userService = require('../services/userService')

const index = (req, res) => {
    return res.render('home.ejs')
}

const handelUsersPage = (req, res) => {
    return res.render('users.ejs')
}

const handelCreateNewUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    // userService.createNewUser(email, password, username)
    userService.getUserList()

    return res.send(req.body)
}

module.exports = {
    index,
    handelUsersPage,
    handelCreateNewUser
}