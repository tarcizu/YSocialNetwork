'use strict';

const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('sources', [
      {
        name: 'Android',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Iphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Windows',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mac OS X',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alexa',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});



  },

  async down(queryInterface, Sequelize) {


    await queryInterface.bulkDelete('sources', { name: { [Op.in]: ['Android', 'Iphone', 'Windows', 'Mac OS X', 'Alexa'] } }, {});

  }
};
