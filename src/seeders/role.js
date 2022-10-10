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
            "Role",
            [
                {
                    url: "/users/create",
                    description: "somethings"
                },
                {
                    url: "/users/read",
                    description: "somethings"
                },
                {
                    url: "/users/update",
                    description: "somethings"
                },
                {
                    url: "/users/delete",
                    description: "somethings"
                },
                {
                    url: "/group/read",
                    description: "somethings"
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
