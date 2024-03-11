const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

class Restaurant extends Model {
  static associate(models) {
    // Define associations here, if any
    // For example: Restaurant.hasMany(models.Order);
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
  },
  {
    sequelize,
    modelName: 'Restaurant',
  }
);

module.exports = Restaurant;
