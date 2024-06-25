const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const ComponentPosition = require('./position.js'); // Import the ComponentPosition model

class HTMLComponent extends Model {}

HTMLComponent.init(
  {
    html: {
      type: DataTypes.STRING,
      allowNull: false
    },
    css: {
      type: DataTypes.STRING,
      allowNull: true
    },
    script: {
      type: DataTypes.STRING,
      allowNull: true
    },
    componentPositionId: { // Foreign key for the relationship
      type: DataTypes.INTEGER,
      references: {
        model: ComponentPosition,
        key: 'id'
      }
    },
    layout_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'HTMLComponent',
  }
);

HTMLComponent.belongsTo(ComponentPosition, {
  foreignKey: 'componentPositionId',
  as: 'position'
});

module.exports = HTMLComponent;
