const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,                          // number
      allowNull: false,                                 // cannot be Empty
      primaryKey: true,                                 // primary key
      autoIncrement: true,                              // Increment by 1 each time a new row is added
    },
    product_id: {
      type: DataTypes.INTEGER,                         // number
      references: {
        model: 'product',                              // product table
        key: 'id',                                     // id field in the product table
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,                          // number
      references: {
        model: 'tag',                                   // tag table
        key: 'id',                                      // id field in the tag table
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
