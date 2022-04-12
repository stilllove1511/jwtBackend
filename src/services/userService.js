const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs')
const bluebird = require('bluebird')


const salt = bcrypt.genSaltSync(10);

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt'
// });

const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = (email, password, username) => {
    let hashPass = hashPassword(password)

    connection.query(
        'INSERT INTO users (email, password, username) VALUES ( ?, ?, ?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }
        }
    );
}

const getUserList = async () => {
    let users = []
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird })

    // connection.query(
    //     'select * from users',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err)
    //             return users
    //         }

    //         users = results
    //         return users
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute('Select * from users')
        return rows
    } catch (e) {

    }
}

module.exports = {
    createNewUser,
    getUserList
}

