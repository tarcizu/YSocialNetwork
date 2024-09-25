'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('users', 'verify_level', {
      type: Sequelize.SMALLINT,
      allowNull: false,
      defaultValue: '0'
    });

    await queryInterface.addColumn('users', 'bio', {
      type: Sequelize.STRING(300),
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('users', 'bio');
    await queryInterface.removeColumn('users', 'verify_level');



  }
};
