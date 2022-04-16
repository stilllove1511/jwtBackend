const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs')
const bluebird = require('bluebird')

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password)
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird })
    const [rows, fields] = await connection.execute('INSERT INTO users (email, password, username) VALUES ( ?, ?, ?)', [email, hashPass, username])
}

const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird })
    const [rows, fields] = await connection.execute('Select * from users')
    return rows
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird })
    const [rows, fields] = await connection.execute('delete from users where id=?', [id])
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird })
    const [rows, fields] = await connection.execute('Select * from users where id=?', [id])
    return rows
}

const updateUserInfor = async (id, email, username) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird })
    try {
        const [rows, fields] = await connection.execute('update users set email = ?, username = ? where id = ?', [email, username, id])

    } catch (error) {
        console.log(">>> check error", error)
    }
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor
}

