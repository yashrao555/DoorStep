'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add cityId column to Staff table
    await queryInterface.addColumn('Staffs', 'cityId', {
      type: Sequelize.TEXT,
      allowNull: true, // Modify as per your requirement
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove cityId column from Staff table
    await queryInterface.removeColumn('Staff', 'cityId');
  }
};
