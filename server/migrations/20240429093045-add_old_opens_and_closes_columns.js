'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Restaurants', 'old_opens_at', {
      type: Sequelize.TIME,
      allowNull: true,
    });
    await queryInterface.addColumn('Restaurants', 'old_closes_at', {
      type: Sequelize.TIME,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Restaurants', 'old_opens_at');
    await queryInterface.removeColumn('Restaurants', 'old_closes_at');
  }
};
