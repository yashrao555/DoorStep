const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = require("../util/database");
const Restaurant = require('./restaurant')
const Customer = require('./customer')


const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'customer_id',
      },
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Restaurants',
        key: 'restaurant_id',
      },
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Completed', 'Rejected'),
      defaultValue: 'Pending',
    }
    
  });

  Restaurant.hasMany(Order, {
    foreignKey: 'restaurant_id',
  });
  
  Order.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id',
  });

  Customer.hasMany(Order, {
    foreignKey: 'customer_id',
  });
  
  Order.belongsTo(Customer, {
    foreignKey: 'customer_id',
  });
  module.exports = Order