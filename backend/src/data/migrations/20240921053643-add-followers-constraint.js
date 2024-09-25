'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('followers', {
      fields: ['followerID', 'followedID'],
      type: 'unique',
      name: 'unique_follower_followed_followers'

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('followers', 'unique_follower_followed_followers');
  }
};
