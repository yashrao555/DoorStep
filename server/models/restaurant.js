const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../util/database");

const Restaurant = sequelize.define('Restaurant', {
    restaurant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    opens_at:DataTypes.TIME,
    closes_at:DataTypes.TIME,
    email: {
        type: DataTypes.STRING,
        unique: true,
      },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    password: DataTypes.STRING,
    location_lat: DataTypes.FLOAT,
    location_long: DataTypes.FLOAT,
    otp: DataTypes.STRING,
    otp_expiration:DataTypes.DATE,
    is_verified:DataTypes.BOOLEAN
  });
  


  module.exports = Restaurant;