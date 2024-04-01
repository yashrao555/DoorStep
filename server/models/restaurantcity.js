// models/restaurantCity.js

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

class RestaurantCity extends Model {}

RestaurantCity.init(
  {
    restaurantId: { type: DataTypes.INTEGER, allowNull: false },
    cityId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "RestaurantCity",
  }
);

module.exports = RestaurantCity;
