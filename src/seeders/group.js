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
            "Group",
            [
                {
                    name: "manager",
                    description: "all role"
                },
                {
                    name: "dev",
                    description: "somethings"
                },
                {
                    name: "test",
                    description: "somethings"
                },
                {
                    name: "guess",
                    description: "view only"
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
