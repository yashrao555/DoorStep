const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require("../util/database");
const Restaurant = require('./restaurant')
// Define the FoodItems model
const FoodItem = sequelize.define('FoodItem', {
  food_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  description: DataTypes.STRING,
  image_url: DataTypes.STRING,
  restaurant_id:DataTypes.INTEGER,
});

// Establish a one-to-many relationship between Restaurant and FoodItem
Restaurant.hasMany(FoodItem, {
  foreignKey: 'restaurant_id',
});

FoodItem.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id',
});

// To sync the models with the database
// This should be called once during the application initialization
sequelize.sync();

// Export the models
module.exports = FoodItem
