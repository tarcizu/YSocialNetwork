'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('followers', [
      {
        followerID: 1,
        followedID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 1,
        followedID: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 2,
        followedID: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 2,
        followedID: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 2,
        followedID: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 3,
        followedID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 3,
        followedID: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 3,
        followedID: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 4,
        followedID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 4,
        followedID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 4,
        followedID: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 4,
        followedID: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 5,
        followedID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerID: 5,
        followedID: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }


    ], {});



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('followers', null, {});
  }
};
