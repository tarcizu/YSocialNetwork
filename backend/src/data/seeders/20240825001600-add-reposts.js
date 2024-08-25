'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reposts', [
      {
        userID: 1,
        postID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 1,
        postID: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 1,
        postID: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 2,
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
        postID: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 3,
        postID: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 3,
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
        userID: 4,
        postID: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 4,
        postID: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 6,
        postID: 4,
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
        userID: 6,
        postID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }



    ], {});



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reposts', null, {});
  }
};
