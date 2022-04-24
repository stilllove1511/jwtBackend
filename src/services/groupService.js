const res = require('express/lib/response')
const db = require('../models/index')

const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']] //sort
        })
        return {
            EM: 'get groups success',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'error fom service',
            EC: 1,
            DT: ''
        }
    }
}

module.exports = {
    getGroups
}