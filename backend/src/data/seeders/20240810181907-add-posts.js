'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('posts', [
      {
        userID: 2,
        content: 'Just tried Y and wow, it\'s a game changer. X could never keep up with this. #NextLevel',
        image: null,
        sourceID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 2,
        content: 'Loving Y\'s user experience. X should take notes on how to build a platform that actually works.',
        image: null,
        sourceID: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 2,
        content: 'Y\'s Alexa integration is a game changer! Posting with just a voice command is next level. X, take notes! #Innovation',
        image: null,
        sourceID: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 3,
        content: 'Y is a champion of free speech! Unlike other networks that censor, Y lets us speak our minds. #TrueFreedom',
        image: null,
        sourceID: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 3,
        content: 'The Democratic Party is failing America. They’re out of touch and only interested in their own agenda. Y is where real voices are heard. #WakeUp',
        image: null,
        sourceID: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 1,
        content: 'Testando as postagens em português',
        image: null,
        sourceID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 1,
        content: 'Testando outra postagem maior! Essa também tem #HashTags',
        image: null,
        sourceID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 1,
        content: 'Estou falando com a Alexa e isso vai virar uma postagem!',
        image: null,
        sourceID: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 4,
        content: 'O grande @DonaldTrump me segue! E aí, Nelipe Feto, vai me censurar aqui também? Boa sorte! Aqui é liberdade! #YLiberdadeCantou',
        image: null,
        sourceID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 4,
        content: 'Quero informar os amigos que não faço mais parte de outra rede social que não Y. Sou grato por tudo que aprendi e pelas amizades que fiz.',
        image: null,
        sourceID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 5,
        content: 'Tired of all the industry drama. Time to keep it real! Join me on Y for unfiltered Taylor. #NoMoreBS #TaylorOnY',
        image: null,
        sourceID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 5,
        content: 'Thrilled to announce my next release with the amazing Brazilian band Lambasaia! Get ready! #TaylorXLambasaia #NewMusic',
        image: null,
        sourceID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 6,
        content: '¡Y es un avance para la libertad! Aquí podemos hablar sin censura, a diferencia de otras plataformas. #LibertadDeExpresión #Y',
        image: null,
        sourceID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});



  },

  async down(queryInterface, Sequelize) {


    await queryInterface.bulkDelete('posts', null, {});

  }
};
