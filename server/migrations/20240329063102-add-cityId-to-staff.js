'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Staffs', 'cityId', {
      type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER),
      allowNull: true,
      defaultValue: [], // Adjust the options as needed
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Staffs', 'cityId');
  }
};
