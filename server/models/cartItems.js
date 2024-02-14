const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../util/database");
const Restaurant = require('./restaurant')
const Customer = require('./customer')
const Cart = sequelize.define('Cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  items: {
    type:DataTypes.JSON,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

// Establish foreign key relationships
Cart.belongsTo(Customer, {
  foreignKey: 'customer_id',
});

Cart.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id',
});

module.exports = Cart;
