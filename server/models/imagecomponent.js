const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const ComponentPosition = require('./position.js'); // Import the ComponentPosition model

class ImageComponent extends Model {}

ImageComponent.init(
  {
    FileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FileData: {
      type: DataTypes.BLOB('long'),
      allowNull: false
    },
    componentPositionId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    layout_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    css: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'ImageComponent',
  }
);

ImageComponent.belongsTo(ComponentPosition, {
  foreignKey: 'componentPositionId',
  as: 'position'
});

module.exports = ImageComponent;
