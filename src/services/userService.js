const mysql = require('mysql2');
const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10);

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

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

const getUserList = () => {
    let users = []
    connection.query(
        'select * from users',
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }
            console.log(results)
        }
    );
}

module.exports = {
    createNewUser,
    getUserList
}