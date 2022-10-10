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
            "Group_Role",
            [
                {
                    groupId: "1",
                    roleId: "1"
                },
                {
                    groupId: "1",
                    roleId: "2"
                },
                {
                    groupId: "1",
                    roleId: "3"
                },
                {
                    groupId: "1",
                    roleId: "4"
                },
                {
                    groupId: "1",
                    roleId: "5"
                },
                {
                    groupId: "4",
                    roleId: "2"
                },
                {
                    groupId: "4",
                    roleId: "5"
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
