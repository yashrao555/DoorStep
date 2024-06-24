const { Model, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

class LayoutItem extends Model {}
LayoutItem.init(
  {
    layout_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    css: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "LayoutItem",
  }
);

module.exports = LayoutItem;
