// Import Sequelize and the DataTypes module
const {DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Restaurant = require ('./restaurant')

// Define the OperatingHours model
const OperatingHours = sequelize.define('operating_hours', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurant', // Name of the referenced table
      key: 'id' // Primary key of the referenced table
    }
  },
  weekday_opening_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  weekday_closing_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  weekend_opening_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  weekend_closing_time: {
    type: DataTypes.TIME,
    allowNull: false
  }
});

// Export the OperatingHours model
module.exports = OperatingHours;