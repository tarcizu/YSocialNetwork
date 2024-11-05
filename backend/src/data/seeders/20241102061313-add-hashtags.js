'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('hashtags', [
      {
        name: '#NextLevel',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '#Innovation',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '#TrueFreedom',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '#WakeUp',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '#HashTags',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '#YLiberdadeCantou',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '#NoMoreBS',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '#TaylorOnY',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '#TaylorXLambasaia',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '#NewMusic',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '#LibertadDeExpresión',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '#Y',
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hashtags', null, {});
  }
};
