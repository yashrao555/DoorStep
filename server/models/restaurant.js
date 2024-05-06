const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const City = require('./city');

class Restaurant extends Model {
  static associate(models) {
    Restaurant.associate = function(models) {
      Restaurant.belongsToMany(City, { through: 'RestaurantCity' });
    };
  }

  // You can add custom methods or configurations here if needed
}

Restaurant.init(
  {
    name: DataTypes.STRING,
    opens_at: DataTypes.TIME,
    closes_at: DataTypes.TIME,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    password: DataTypes.STRING,
    location_lat: DataTypes.FLOAT,
    location_long: DataTypes.FLOAT,
    otp: DataTypes.STRING,
    otp_expiration: DataTypes.DATE,
    is_verified: DataTypes.BOOLEAN,
    old_opens_at:DataTypes.TIME,
    old_closes_at:DataTypes.TIME
  },
  {
    sequelize,
    modelName: 'Restaurant',
  }
);

module.exports = Restaurant;
