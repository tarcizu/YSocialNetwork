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
        avatar: 'https://i.ibb.co/DzMKfDj/Elon-Musk-Avatar.jpg',
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
        avatar: 'https://i.ibb.co/D5wmZfN/Donald-Trump-Avatar.jpg',
        access_level: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'JoaquinTeixeira',
        password: await createHash('delrey'),
        email: 'emilio_surita@jovempan.com.br',
        name: 'Joaquin',
        lastname: 'Teixeira',
        avatar: 'https://i.ibb.co/27Tz1rZ/Joaquim-Teixeira-Avatar.jpg',
        access_level: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'TaylorSwift',
        password: await createHash('ihatekanyewest'),
        email: 'taylorswift@taylorswift.com',
        name: 'Taylor',
        lastname: 'Alison Swift',
        avatar: 'https://i.ibb.co/4Jf9K4y/Taylor-Swift-Avatar.jpg',
        access_level: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'JMilei',
        password: await createHash('vivalalibertad'),
        email: 'jmilei@casarosada.gob.ar',
        name: 'Javier',
        lastname: 'Milei',
        avatar: 'https://i.ibb.co/sK6bPTx/Javier-Milei-Avatar.jpg',
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
