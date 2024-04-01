'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Carts', 'cityId', {
      type: Sequelize.INTEGER,
      allowNull: false, // Adjust the options as needed
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Carts', 'cityId');
  }
};
