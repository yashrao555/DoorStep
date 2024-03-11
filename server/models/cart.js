const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Customer = require('./customer');
const Restaurant = require('./restaurant');

class Cart extends Model {
  static associate(models) {
    // Define associations here, if any
    // For example: Cart.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    Cart.belongsTo(Customer, {
      foreignKey: 'customer_id',
    });
    
    Cart.belongsTo(Restaurant, {
      foreignKey: 'restaurant_id',
    });
  }

  // You can add custom methods or configurations here if needed
}

Cart.init(
  {
    customer_id: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER,
    items: DataTypes.TEXT,
    total_amount: DataTypes.FLOAT
  },
  {
    sequelize,
    modelName: 'Cart',
  }
);

module.exports = Cart;
