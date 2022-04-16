const userService = require('../services/userService')

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

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id
    let user = await userService.getUserById(id)
    let userData = {}
    userData = user
    // if (user && user.length > 0) {
    //     userData = user[0]
    // }
    return res.render('user-update.ejs', { userData })
}

const handleUpdateUser = async (req, res) => {
    let id = req.body.id
    let email = req.body.email
    let username = req.body.username
    await userService.updateUserInfor(id, email, username)
    return res.redirect('/user')
}

module.exports = {
    index,
    handleUsersPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser
}