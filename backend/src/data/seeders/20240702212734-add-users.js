'use strict';

const { createHash } = require('../../controllers/hashController');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('users', [
      {
        username: 'teste',
        password: await createHash('123'),
        email: 'teste@y.com',
        name: 'Jonh Test',
        lastname: 'Tester',
        avatar: null,
        access_level: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'elonmusk',
        password: await createHash('falcon9'),
        email: 'elon_musk@x.com',
        name: 'Elon',
        lastname: 'Musk',
        avatar: null,
        access_level: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'dtrump',
        password: await createHash('MakeAmericaGreatAgain'),
        email: 'donald_trump@gop.com',
        name: 'Donald',
        lastname: 'Trump',
        avatar: null,
        access_level: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});



  },

  async down(queryInterface, Sequelize) {


    await queryInterface.bulkDelete('users', null, {});

  }
};
