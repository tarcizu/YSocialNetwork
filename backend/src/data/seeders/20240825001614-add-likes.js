'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('likes', [
      {
        userID: 1,
        postID: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 4,
        postID: 5,
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
        userID: 1,
        postID: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 6,
        postID: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 1,
        postID: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }




    ], {});



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('likes', null, {});
  }
};
