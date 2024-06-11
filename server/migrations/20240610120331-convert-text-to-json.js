'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add code here to change the column from TEXT to JSON
    await queryInterface.changeColumn('ImageComponents', 'css', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the column back to TEXT in case of rollback
    await queryInterface.changeColumn('ImageComponents', 'css', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
};