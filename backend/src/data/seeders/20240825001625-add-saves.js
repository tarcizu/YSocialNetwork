'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('saves', [
      {
        userID: 1,
        postID: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 1,
        postID: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 2,
        postID: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 2,
        postID: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 4,
        postID: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 5,
        postID: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },





    ], {});



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('saves', null, {});
  }
};
