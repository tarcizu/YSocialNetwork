'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('sources', [
      {
        name: 'Web Site',
        createdAt: new Date(),
        updatedAt: new Date()
      },
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


    await queryInterface.bulkDelete('sources', null, {});

  }
};
