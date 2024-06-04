'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ImageComponents', 'layout_id', {
      type: Sequelize.INTEGER,
      allowNull: false // or allowNull: true, depending on your requirements
    });
    await queryInterface.addColumn('ImageComponents', 'componentPositionId', {
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
    await queryInterface.removeColumn('ImageComponents', 'layout_id');
  }
};
