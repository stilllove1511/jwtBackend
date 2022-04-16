const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs')
const bluebird = require('bluebird')

const db = require('../models/index')

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password)
    await db.User.create({
        username: username,
        email: email,
        password: hashPass
    })
}

const getUserList = async () => {
    let users = []
    users = await db.User.findAll()
    return users
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    })
}

const getUserById = async (id) => {
    let user = await db.User.findOne({
        where: { id }
    })
    return user
}

const updateUserInfor = async (id, email, username) => {
    await db.User.update(
        {
            email: email,
            username: username
        },
        {
            where: { id }
        }
    )
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor
}

