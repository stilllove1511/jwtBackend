const loginRegisterService = require('../services/loginRegisterService')


const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    try {
        //validate
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'MIssing required parameters', //error message
                EC: '1',//error code
                DT: ''//data
            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Pass word must be long >=4 character', //error message
                EC: '1',//error code
                DT: ''//data
            })
        }

        //service: user create
        let data = await loginRegisterService.registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error fom server',
            EC: '-1',
            DT: ''
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handelUserLogin(req.body)
        //set cookie
        res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
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
module.exports = {
    testApi,
    handleRegister,
    handleLogin
}