const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Restaurant = require('./restaurant');

class Staff extends Model {
  static associate(models) {
    Staff.belongsTo(Restaurant, {
        foreignKey: 'restaurant_id',
      });

    Restaurant.hasMany(Staff,{
        foreignKey:'restaurant_id',
    })  
  }
}

Staff.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    role: DataTypes.TEXT,
    restaurant_id:DataTypes.INTEGER,
    // cityId: DataTypes.TEXT
  },
  {
    sequelize,
    modelName: 'Staff',
  }
);

module.exports = Staff;
