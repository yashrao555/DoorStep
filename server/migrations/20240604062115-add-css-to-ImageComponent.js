'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ImageComponents', 'css', {
      type: Sequelize.TEXT,
      allowNull: true // Allow null if you don't require this field to be mandatory
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ImageComponents', 'css');
  }
};