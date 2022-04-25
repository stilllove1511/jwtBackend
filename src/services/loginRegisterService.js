require('dotenv').config()

const db = require('../models/index')
const bcrypt = require('bcryptjs');
const raw = require('body-parser/lib/types/raw');
const { Op } = require('sequelize');
const { getGroupWithRoles } = require('./JWTService')
const { createJWT } = require('../middleware/JWTAction')

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

const registerNewUser = async (rawUserData) => {
    try {
        //check email/phone are exist
        let isEmailExist = await checkEmailExist(rawUserData.email)

        if (isEmailExist) {
            return {
                EM: 'the email is already exist',
                EC: 1
            }
        }

        let isPhoneExist = await checkPhoneExist(rawUserData.phone)

        if (isPhoneExist) {
            return {
                EM: 'the phone number is already exist',
                EC: 1
            }
        }

        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password)

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 4 //guess
        })

        return {
            EM: 'A user is created successfully',
            EC: 0
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service...',
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword)
}

const handelUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            console.log(">>> found uer with email/phone")
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if (isCorrectPassword) {

                //test roles
                let groupWithRoles = await getGroupWithRoles(user)
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
                let token = createJWT(payload)
                return {
                    EM: 'ok!',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles
                    }
                }
            }
        }
        console.log(">>> Input user with email/phone: ", rawData.valueLogin, "password: ", rawData.password)

        return {
            EM: 'your email/phone or password is not correct',
            EC: 1,
            DT: ''
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs in service...',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, handelUserLogin
}