'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add restaurant_id column to Staff table
    await queryInterface.addColumn('Staff', 'restaurant_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Restaurants', // This should be the name of the table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove restaurant_id column from Staff table
    await queryInterface.removeColumn('Staff', 'restaurant_id');
  }
};
