const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

class TextComponent extends Model {
  static associate(models) {
    // Define associations here if needed
  }

  // You can add custom methods or configurations here if needed
}

TextComponent.init(
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    css: {
      type: DataTypes.JSON,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'TextComponent',
  }
);

module.exports = TextComponent;
