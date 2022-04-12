userService = require('../services/userService')

const index = (req, res) => {
    return res.render('home.ejs')
}

const handelUsersPage = async (req, res) => {
    let userList = await userService.getUserList()

    console.log(userList)
    return res.render('users.ejs', { userList })
}

const handelCreateNewUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    userService.createNewUser(email, password, username)

    return res.send(req.body)
}

module.exports = {
    index,
    handelUsersPage,
    handelCreateNewUser
}