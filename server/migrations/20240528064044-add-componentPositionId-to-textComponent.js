'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('TextComponents', 'componentPositionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'ComponentPositions',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('TextComponents', 'componentPositionId');
  }
};
