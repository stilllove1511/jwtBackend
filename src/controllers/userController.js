const userApiService = require('../services/userApiService')

const readFunc = async (req, res) => {
    try {
        let data = await userApiService.getAllUser(req.body)
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC,//error code
            DT: data.DT//data
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const createFunc = async (req, res) => {
    try {


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const updateFunc = async (req, res) => {
    try {


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const deleteFunc = async (req, res) => {
    try {


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}
module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc
}