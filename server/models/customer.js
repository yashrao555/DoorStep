
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

class Customer extends Model {
  static associate(models) {
    // Define associations here, if any
    // For example: Customer.hasMany(models.Order);
  }

  // You can add custom methods or configurations here if needed
}

Customer.init(
  {
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
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
    counter: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Customer',
  }
);

module.exports = Customer;
