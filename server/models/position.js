const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

class ComponentPosition extends Model {}

ComponentPosition.init(
  {
    x: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    y: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    w: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    h: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    layout_id: {  // New layout_id column
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {  
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'ComponentPosition',
  }
);

module.exports = ComponentPosition;
