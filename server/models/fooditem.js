const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Restaurant = require('./restaurant');

class FoodItem extends Model {
  static associate(models) {
    // Define associations here
    FoodItem.belongsTo(models.Restaurant, {
      foreignKey: 'restaurant_id',
    });
    Restaurant.hasMany(models.FoodItem,{
      foreignKey:'restaurant_id',
    })
  }

  // You can add custom methods or configurations here if needed
}

FoodItem.init(
  {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    image_url: DataTypes.STRING,
    restaurant_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'FoodItem',
  }
);

module.exports = FoodItem;
