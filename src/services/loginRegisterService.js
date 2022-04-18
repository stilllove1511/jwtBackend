const db = require('../models/index')
const bcrypt = require('bcryptjs');
const raw = require('body-parser/lib/types/raw');

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
            phone: rawUserData.phone
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

module.exports = {
    registerNewUser
}