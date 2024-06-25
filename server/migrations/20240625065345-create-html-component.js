'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HTMLComponents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      html: {
        type: Sequelize.STRING,
        allowNull: false
      },
      css: {
        type: Sequelize.STRING,
        allowNull: true
      },
      script: {
        type: Sequelize.STRING,
        allowNull: true
      },
      componentPositionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ComponentPositions', // Ensure this matches your ComponentPosition table name
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      layout_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HTMLComponents');
  }
};
