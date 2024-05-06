'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('operating_hours', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'restaurants',
          key: 'id'
        }
      },
      weekday_opening_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      weekday_closing_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      weekend_opening_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      weekend_closing_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('operating_hours');
  }
};
