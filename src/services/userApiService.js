const db = require('../models/index')


const createNewUser = async (email, password, username) => {
    try {
        await db.User.create({

        })
    } catch (error) {
        console.log(error)
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
            limit: limit
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
            DT: []
        }
    }
}

const updateUser = async (email, password, username) => {
    try {
        await db.User.update({

        })
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (email, password, username) => {
    try {
        await db.User.delete({

        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createNewUser,
    getAllUser,
    getUserWithPagination,
    updateUser,
    deleteUser,
}

