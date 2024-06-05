'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ComponentPositions', 'type', {
      type: Sequelize.STRING // Define the data type of the new column
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ComponentPositions', 'type');
  }
};

