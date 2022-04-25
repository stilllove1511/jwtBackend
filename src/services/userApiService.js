const db = require('../models/index')
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) {
        return true
    }
    return false
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })

    if (user) {
        return true
    }
    return false
}

const createNewUser = async (data) => {
    try {
        let isEmailExist = await checkEmailExist(data.email)

        if (isEmailExist) {
            return {
                EM: 'the email is already exist',
                EC: 1
            }
        }

        let isPhoneExist = await checkPhoneExist(data.phone)

        if (isPhoneExist) {
            return {
                EM: 'the phone number is already exist',
                EC: 1
            }
        }

        let hashPassword = hashUserPassword(data.password)

        await db.User.create({ ...data, password: hashPassword })
        return {
            EM: 'create user success',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrong in service ...',
            EC: 0,
            DT: []
        }
    }
}

const getAllUser = async () => {
    let users = await db.User.findAll({
        attributes: ["id", "username", "email", "phone", "sex"],
        include: { model: db.Group, attributes: ["name", "description"] },
    })
    if (users) {
        return {
            EM: 'get data succes',
            EC: 0,
            DT: users
        }
    } else {
        return {
            EM: 'some thing wrong in service ...',
            EC: 1,
            DT: []
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
            order: [['id', 'DESC']]
        })

        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'some thing wrong in service ...',
            EC: 1,
            DT: 'email'
        }
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'empty group id',
                EC: 1,
                DT: 'group'
            }
        }
        await db.User.update(
            {
                ...data
            },
            {
                where: { id: data.id }
            }
        )
        return {
            EM: 'update ok',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'some thing wrong in service ...',
            EC: 1,
            DT: []
        }
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id }
        })
        if (user) {
            await user.destroy()
            return {
                EM: 'Delete user succeeds',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'User does not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    createNewUser,
    getAllUser,
    getUserWithPagination,
    updateUser,
    deleteUser,
}

