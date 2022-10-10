"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "User",
            [
                {
                    email: "admin1@mail.com",
                    password:
                        "$2a$10$BrV8oQpAlSk1rw/nNbj9puoRhcZBpeKYF36XwnGfD./pU9w4TkBIq", //1234
                    username: "adm1",
                    phone: 1234567890,
                    adress: "hanoi",
                    sex: "female",
                    groupId: 1
                },
                {
                    email: "huong1@mail.com",
                    password:
                        "$2a$10$BrV8oQpAlSk1rw/nNbj9puoRhcZBpeKYF36XwnGfD./pU9w4TkBIq", //1234
                    username: "falke1",
                    phone: 1234567891,
                    adress: "hanoi",
                    sex: "female",

                    groupId: 4
                },
                {
                    email: "huong2@mail.com",
                    password:
                        "$2a$10$BrV8oQpAlSk1rw/nNbj9puoRhcZBpeKYF36XwnGfD./pU9w4TkBIq", //1234
                    username: "falke2",
                    phone: 1234567891,
                    adress: "hanoi",
                    sex: "female",

                    groupId: 4
                },
                {
                    email: "huong3@mail.com",
                    password:
                        "$2a$10$BrV8oQpAlSk1rw/nNbj9puoRhcZBpeKYF36XwnGfD./pU9w4TkBIq", //1234
                    username: "falke3",
                    phone: 1234567893,
                    adress: "hanoi",
                    sex: "female",

                    groupId: 4
                }
            ],
            {}
        )
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
}
