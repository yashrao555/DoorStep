// Import Sequelize and the DataTypes
const { DataTypes } = require('sequelize');
// Import the Sequelize instance (initialized sequelize object)
const sequelize = require('../util/database');
const Restaurant = require('./restaurant');

// Define the SpecialOperatingHours model
const SpecialOperatingHours = sequelize.define('special_operating_hours', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Restaurant', // Name of the referenced table
        key: 'id' // Primary key of the referenced table
      }
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  opening_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  closing_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});



// Export the SpecialOperatingHours model
module.exports = SpecialOperatingHours;
