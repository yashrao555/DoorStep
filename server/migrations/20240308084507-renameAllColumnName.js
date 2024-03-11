'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the column
    await queryInterface.renameColumn('Restaurants','restaurant_id', 'id');
    await queryInterface.renameColumn('FoodItems', 'food_item_id', 'id');
    await queryInterface.renameColumn('Orders', 'order_id', 'id');
    await queryInterface.renameColumn('Carts','cart_id', 'id', );
    
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, define the logic to revert the changes
    // This is useful for rolling back migrations
    // For renaming a column, reverting may involve renaming it back to the original name
    await queryInterface.renameColumn('Restaurants','restaurant_id', 'id');
    await queryInterface.renameColumn('FoodItems', 'food_item_id', 'id');
    await queryInterface.renameColumn('Orders', 'order_id', 'id');
    await queryInterface.renameColumn('Carts','cart_id', 'id', );
  }
};
