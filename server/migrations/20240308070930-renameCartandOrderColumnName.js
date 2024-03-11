'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the column
    await queryInterface.renameColumn('Orders', 'id', 'order_id');
    await queryInterface.renameColumn('Carts', 'id', 'cart_id');
    
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, define the logic to revert the changes
    // This is useful for rolling back migrations
    // For renaming a column, reverting may involve renaming it back to the original name
    await queryInterface.renameColumn('Orders', 'id', 'order_id');
    await queryInterface.renameColumn('Carts', 'id', 'cart_id');
  }
};
