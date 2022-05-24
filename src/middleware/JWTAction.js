require('dotenv').config()
const { cookie } = require('express/lib/response')
const jwt = require('jsonwebtoken')

const nonSecurePaths = ['/', '/login', '/register']

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
    } catch (err) {
        console.log(err)
    }

    return token
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let decoded = null

    try {
        decoded = jwt.verify(token, key)
    } catch (err) {
        console.log(err)
    }
    return decoded
}

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
    return null
}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path))
        return next()

    let cookies = req.cookies
    let tokenFromHeader = extractToken(req)

    // console.log('>>> check cookies: ', cookies.jwt)
    // console.log('>>> check bearer token: ', tokenFromHeader)

    if (cookies && cookies.jwt || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader
        // console.log('>>> check token: ', token)

        if (token) {
            let decoded = verifyToken(token)
            if (decoded) {
                req.user = decoded
                req.token = token
                next()
            } else {
                return res.status(401).json({
                    EC: -1,
                    DT: '',
                    EM: 'Not authenticated the user'
                })

            }
        } else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Not authenticated the user'
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path == '/account') {
        return next()
    }

    if (req.user) {
        let email = req.user.email
        let roles = req.user.groupWithRoles.Roles
        let currentUrl = req.path
        console.log(req.path)
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'You dont have permisson to this resource'
            })
        }


        let canAccess = roles.some(item => item.url === currentUrl)
        if (canAccess) {
            next()
        } else {
            console.log('You dont have permisson to this resource')
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'You dont have permisson to this resource'
            })
        }
    } else {
        return res.status(403).json({
            EC: -1,
            DT: '',
            EM: 'You dont have permisson to this resource'
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}