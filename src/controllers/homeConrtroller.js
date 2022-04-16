const { deleteUser } = require('../services/userService')

userService = require('../services/userService')

const index = (req, res) => {
    return res.render('home.ejs')
}

const handleUsersPage = async (req, res) => {
    let userList = await userService.getUserList()
    return res.render('users.ejs', { userList })
}

const handleCreateNewUser = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    await userService.createNewUser(email, password, username)

    return res.redirect('/user')
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return res.redirect('/user')
}

module.exports = {
    index,
    handleUsersPage,
    handleCreateNewUser,
    handleDeleteUser
}