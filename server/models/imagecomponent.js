'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageComponent extends Model {
    static associate(models) {
      // define association here if any
    }
  }
  ImageComponent.init({
    FileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FileData: {
      type: DataTypes.BLOB('long'),
      allowNull: false
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
    },
    css: {
      type: DataTypes.TEXT,
      allowNull: true // Allow null if you don't require this field to be mandatory
    }
  }, {
    sequelize,
    modelName: 'ImageComponent',
  });
  return ImageComponent;
};
