const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../util/database");

const Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
      },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    location_lat: DataTypes.FLOAT,
    location_long: DataTypes.FLOAT,
    otp: DataTypes.STRING,
    otp_expiration:DataTypes.DATE,
    is_verified:DataTypes.BOOLEAN
  });
  

  module.exports = Customer;