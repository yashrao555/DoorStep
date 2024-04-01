// city.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Restaurant = require('./restaurant');

class City extends Model {
  static associate(models) {
    City.associate = function(models) {
      City.belongsToMany(Restaurant, { through: 'RestaurantCity' });
    };
  }
}

City.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'City'
  }
);

module.exports = City;
