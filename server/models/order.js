const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Restaurant = require('./restaurant');
const Customer = require('./customer');

class Order extends Model {
  static associate(models) {
    // Define associations here, if any
    // For example: Order.belongsTo(models.Customer);
    //               Order.belongsTo(models.Restaurant);
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
  }

  // You can add custom methods or configurations here if needed
}

Order.init(
  {
    customer_id: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER,
    items: DataTypes.TEXT,
    total_amount: DataTypes.FLOAT,
    status: DataTypes.STRING,
    cityId:DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'Order',
  }
);

module.exports = Order;
