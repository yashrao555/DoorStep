const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const ComponentPosition = require('./position.js'); // Import the ComponentPosition model

class TextComponent extends Model {}

TextComponent.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    css: {
      type: DataTypes.JSON,
      allowNull: true
    },
    componentPositionId: { // Foreign key for the relationship
      type: DataTypes.INTEGER,
      references: {
        model: ComponentPosition,
        key: 'id'
      }
    },
    layout_id:{
      type:DataTypes.INTEGER,
      allowNull:true
    }
  },
  {
    sequelize,
    modelName: 'TextComponent',
  }
);

TextComponent.belongsTo(ComponentPosition, {
  foreignKey: 'componentPositionId',
  as: 'position'
});

module.exports = TextComponent;
