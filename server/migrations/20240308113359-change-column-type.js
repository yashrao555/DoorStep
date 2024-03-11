'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Carts', 'items', {
      type: Sequelize.JSON, // Set the new data type
      // Other options...
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, define the reverse changes in the down function
    // This is important for rolling back migrations
  },
};
