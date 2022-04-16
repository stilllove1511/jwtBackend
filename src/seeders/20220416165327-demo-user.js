'use strict';

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
    await queryInterface.bulkInsert('User', [
      {
        email: 'huong1@gail.com',
        password: '123',
        username: 'falke1'
      },
      {
        email: 'huong2@gail.com',
        password: '123',
        username: 'falke2'
      },
      {
        email: 'huong3@gail.com',
        password: '123',
        username: 'falke3'
      },
    ], {});
  },



  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
